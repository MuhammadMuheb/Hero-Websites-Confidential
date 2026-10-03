"use server";

import { revalidatePath } from "next/cache";
import { adminDb } from "@/lib/firebase/admin";
import { requirePermission } from "@/lib/auth/session";
import { writeAudit } from "@/lib/repo/audit";
import { getTourDoc, liveFields, newTourRef, slugTaken } from "@/lib/repo/tours";
import { isLiveDoc } from "@/lib/content/live";
import { clean } from "@/lib/repo/util";
import { gatePasses, runCardGate, type GateCheck } from "@/lib/publish/gate";
import { revalidateWeb } from "@/lib/publish/revalidate";
import { sanitizeRich } from "@/lib/sanitize";
import { cardDraftSchema, type CardDraftInput } from "@/lib/validation/schemas";
import { UserError, guard, ok } from "@/lib/actions-util";
import type { ActionResult, Taxonomies } from "@/lib/types";
import { taxonomiesSchema } from "@/lib/validation/schemas";

function parseCard(input: unknown): CardDraftInput {
  const c = cardDraftSchema.parse(input);
  return {
    ...c,
    description: sanitizeRich(c.description),
    images: c.images.map((i, n) => ({ ...i, order: n })),
  };
}

const done = (slug: string) => revalidatePath(`/projects/${slug}/listings/tours`);

/** Live publish checks for the card drawer. */
export async function checkCard(slug: string, input: unknown): Promise<ActionResult<GateCheck[]>> {
  return guard(async () => {
    await requirePermission("project:view", slug);
    const c = parseCard(input);
    return ok(runCardGate({ ...c, images: c.images.map((i) => ({ url: i.url, alt: i.alt ?? "" })), price: c.price }));
  });
}

/** Create (id = null) or update the draft of a card. A draft never touches the fields the public site reads. */
export async function saveCard(slug: string, id: string | null, input: unknown): Promise<ActionResult<{ id: string }>> {
  return guard(async () => {
    const user = await requirePermission("draft:write", slug);
    const card = parseCard(input);
    if (await slugTaken(slug, card.slug, id ?? undefined)) throw new UserError("Another card in this project already uses that slug.", ["slug: already used"]);

    if (!id) {
      const ref = newTourRef();
      await adminDb().runTransaction(async (tx) => {
        tx.create(ref, clean({ slug: card.slug, title: card.title, propertySlug: slug, status: "draft", draft: card, dirty: true, inReview: false, version: 0, createdBy: user.uid, updatedBy: user.uid, updatedAt: new Date() }));
        await writeAudit({ actor: user, propertySlug: slug, entityType: "card", entityId: ref.id, action: "create", summary: `Created card ${card.title}`, after: card }, tx);
      });
      done(slug);
      return ok({ id: ref.id });
    }

    const found = await getTourDoc(slug, id);
    if (!found) throw new UserError("Card not found.");
    if (found.data.status === "trashed") throw new UserError("Restore this card before editing it.");
    await adminDb().runTransaction(async (tx) => {
      tx.update(found.ref, clean({ draft: card, dirty: true, inReview: false, updatedBy: user.uid, updatedAt: new Date() }));
      await writeAudit({ actor: user, propertySlug: slug, entityType: "card", entityId: id, action: "update", summary: `Saved draft of ${card.title}`, before: found.data.draft ?? null, after: card }, tx);
    });
    done(slug);
    return ok({ id });
  });
}

export async function submitCard(slug: string, id: string): Promise<ActionResult> {
  return guard(async () => {
    const user = await requirePermission("draft:submit", slug);
    const found = await getTourDoc(slug, id);
    if (!found || !found.data.draft) throw new UserError("Save a draft first.");
    await adminDb().runTransaction(async (tx) => {
      tx.update(found.ref, { inReview: true, updatedBy: user.uid, updatedAt: new Date() });
      await writeAudit({ actor: user, propertySlug: slug, entityType: "card", entityId: id, action: "update", summary: `Submitted ${found.data.draft.title} for review` }, tx);
    });
    done(slug);
    return ok(undefined);
  });
}

/** Only Admin and Super Admin can publish. Server-checked, so a direct call by a Contributor is rejected. */
export async function publishCard(slug: string, id: string): Promise<ActionResult<{ revalidateError?: string }>> {
  return guard(async () => {
    const user = await requirePermission("publish", slug);
    const found = await getTourDoc(slug, id);
    if (!found) throw new UserError("Card not found.");
    if (found.data.status === "trashed") throw new UserError("Restore this card before publishing it.");
    if (!found.data.draft) throw new UserError("There is nothing to publish.");
    const draft = found.data.draft as CardDraftInput;

    const checks = runCardGate({ ...draft, images: draft.images.map((i) => ({ url: i.url, alt: i.alt ?? "" })) });
    if (!gatePasses(checks)) throw new UserError("Publish checks failed.", checks.filter((c) => !c.ok).map((c) => `${c.label}${c.detail ? `: ${c.detail}` : ""}`));
    if (await slugTaken(slug, draft.slug, id)) throw new UserError("Another card in this project already uses that slug.");

    const oldSlug = found.data.status === "published" || found.data.status === undefined ? (found.data.slug as string | undefined) : undefined;
    await adminDb().runTransaction(async (tx) => {
      tx.update(found.ref, {
        ...liveFields(draft),
        status: "published",
        dirty: false,
        inReview: false,
        version: (found.data.version ?? 0) + 1,
        updatedBy: user.uid,
        updatedAt: new Date(),
        propertySlug: slug,
      });
      if (oldSlug && oldSlug !== draft.slug) {
        // Slug changed after publish: keep the old URL working with a 301 entry.
        tx.set(adminDb().collection("redirects").doc(`${slug}__${oldSlug}`), { propertySlug: slug, from: `/tours/${oldSlug}`, to: `/tours/${draft.slug}`, createdAt: new Date() });
      }
      await writeAudit({ actor: user, propertySlug: slug, entityType: "card", entityId: id, action: "publish", summary: `Published ${draft.title} v${(found.data.version ?? 0) + 1}`, after: draft }, tx);
    });

    const r = await revalidateWeb(["tours"]);
    if (!r.ok) await writeAudit({ actor: user, propertySlug: slug, entityType: "revalidate", entityId: id, action: "publish", summary: `Revalidation FAILED (tours): ${r.error}` });
    done(slug);
    return ok({ revalidateError: r.ok ? undefined : r.error });
  });
}

/** Soft delete. Contributors may only delete their own drafts. */
export async function trashCard(slug: string, id: string): Promise<ActionResult> {
  return guard(async () => {
    await requirePermission("project:view", slug);
    const found = await getTourDoc(slug, id);
    if (!found) throw new UserError("Card not found.");
    const wasLive = isLiveDoc(found.data);
    const user = await requirePermission("delete", slug, { ownerUid: found.data.createdBy, isDraft: !wasLive });
    const title = found.data.draft?.title ?? found.data.title;
    await adminDb().runTransaction(async (tx) => {
      tx.update(found.ref, { statusBeforeTrash: found.data.status ?? "published", status: "trashed", trashedAt: new Date(), updatedBy: user.uid, updatedAt: new Date() });
      await writeAudit({ actor: user, propertySlug: slug, entityType: "card", entityId: id, action: "delete", summary: `Moved ${title} to trash` }, tx);
    });
    if (wasLive) await revalidateWeb(["tours"]);
    done(slug);
    return ok(undefined);
  });
}

/** Undo for the 10 second toast after delete. */
export async function restoreCard(slug: string, id: string): Promise<ActionResult> {
  return guard(async () => {
    await requirePermission("project:view", slug);
    const found = await getTourDoc(slug, id);
    if (!found || found.data.status !== "trashed") throw new UserError("Card not found.");
    const wasLive = found.data.statusBeforeTrash === "published";
    const user = await requirePermission("delete", slug, { ownerUid: found.data.createdBy, isDraft: !wasLive });
    const title = found.data.draft?.title ?? found.data.title;
    await adminDb().runTransaction(async (tx) => {
      tx.update(found.ref, { status: found.data.statusBeforeTrash ?? "draft", updatedBy: user.uid, updatedAt: new Date() });
      await writeAudit({ actor: user, propertySlug: slug, entityType: "card", entityId: id, action: "restore", summary: `Restored ${title}` }, tx);
    });
    if (wasLive) await revalidateWeb(["tours"]);
    done(slug);
    return ok(undefined);
  });
}

/** Managed lists (categories, neighbourhoods, cities) that cards point to. */
export async function saveTaxonomies(slug: string, input: unknown): Promise<ActionResult<Taxonomies>> {
  return guard(async () => {
    const user = await requirePermission("nav:edit", slug);
    const t = taxonomiesSchema.parse(input);
    const dedupe = (a: string[]) => Array.from(new Set(a.map((s) => s.trim()).filter(Boolean)));
    const next: Taxonomies = { categories: dedupe(t.categories), neighbourhoods: dedupe(t.neighbourhoods), cities: dedupe(t.cities), blogCategories: dedupe(t.blogCategories) };
    await adminDb().collection("taxonomies").doc(slug).set({ ...next, propertySlug: slug, updatedAt: new Date(), updatedBy: user.uid });
    await writeAudit({ actor: user, propertySlug: slug, entityType: "taxonomy", entityId: slug, action: "update", summary: "Updated managed lists", after: next });
    revalidatePath(`/projects/${slug}`, "layout");
    return ok(next);
  });
}
