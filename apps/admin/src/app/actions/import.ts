"use server";

import { revalidatePath } from "next/cache";
import { adminDb } from "@/lib/firebase/admin";
import { requirePermission } from "@/lib/auth/session";
import { rateLimit } from "@/lib/auth/rate-limit";
import { getProject } from "@/lib/repo/properties";
import { contentRef, getPageState } from "@/lib/repo/content";
import { writeAudit } from "@/lib/repo/audit";
import { listTours } from "@/lib/repo/tours";
import { clean } from "@/lib/repo/util";
import { diffRows, parseImport, type PreviewRow } from "@/lib/import/build";
import { UserError, guard, ok } from "@/lib/actions-util";
import type { ActionResult, PageDraft } from "@/lib/types";

export interface ImportPreview {
  rows: PreviewRow[];
  truncated: boolean;
  summary: { pages: string[]; newCards: number; updatedCards: number };
}

async function prepare(slug: string, text: string) {
  const user = await requirePermission("draft:write", slug);
  if (!(await rateLimit("import", user.uid, 10, 600))) throw new UserError("Too many imports. Please wait a few minutes.");
  const project = await getProject(user, slug);
  if (!project) throw new UserError("Project not found.");
  const result = parseImport(text, slug);
  if (!result.ok) throw new UserError("The file was rejected. Nothing was saved.", result.issues);
  if (!project.domain && Object.keys(result.plan.pages).some((p) => p !== "home")) {
    throw new UserError("Set the project domain in Settings before importing pages other than Home.");
  }
  return { user, project, plan: result.plan };
}

/** Parse, validate and show field-by-field differences. Saves nothing. */
export async function previewImport(slug: string, text: string): Promise<ActionResult<ImportPreview>> {
  return guard(async () => {
    const { project, plan } = await prepare(slug, text);
    const rows: PreviewRow[] = [];
    for (const [pageSlug, data] of Object.entries(plan.pages)) {
      const state = await getPageState(project, pageSlug);
      rows.push(...diffRows(pageSlug, state.draft.data, { ...state.draft.data, ...data }));
    }
    const existing = await listTours(slug);
    const bySlug = new Map(existing.map((t) => [t.slug, t]));
    let newCards = 0;
    let updatedCards = 0;
    for (const c of plan.cards) {
      const cur = bySlug.get(c.slug);
      if (cur) {
        updatedCards++;
        rows.push(...diffRows(`card:${c.slug}`, { title: cur.title, shortDescription: cur.shortDescription, category: cur.category, neighbourhood: cur.neighbourhood, city: cur.city }, { title: c.title, shortDescription: c.shortDescription, category: c.category, neighbourhood: c.neighbourhood, city: c.city }));
      } else {
        newCards++;
        rows.push({ target: `card:${c.slug}`, path: "(new card)", current: "", next: c.title });
      }
    }
    return ok({ rows: rows.slice(0, 500), truncated: rows.length > 500, summary: { pages: Object.keys(plan.pages), newCards, updatedCards } });
  });
}

/**
 * Re-validates the same text server side (the preview is never trusted) and writes DRAFTS only.
 * Nothing is published and nothing touches the fields the public site reads.
 */
export async function confirmImport(slug: string, text: string): Promise<ActionResult<{ pages: number; cards: number }>> {
  return guard(async () => {
    const { user, project, plan } = await prepare(slug, text);
    const db = adminDb();
    const batch = db.batch();

    for (const [pageSlug, data] of Object.entries(plan.pages)) {
      const state = await getPageState(project, pageSlug);
      const draft: PageDraft = { ...state.draft, data: { ...state.draft.data, ...data } };
      const cur = (await contentRef(project, pageSlug).get()).data();
      batch.set(
        contentRef(project, pageSlug),
        clean({ slug: pageSlug, propertySlug: slug, draft, status: cur?.status ?? "draft", dirty: true, inReview: false, version: cur?.version ?? 0, updatedBy: user.uid, updatedAt: new Date() }),
        { merge: true },
      );
    }

    const existing = await listTours(slug);
    const bySlug = new Map(existing.map((t) => [t.slug, t.id]));
    for (const c of plan.cards) {
      const id = bySlug.get(c.slug);
      if (id) {
        batch.update(db.collection("tours").doc(id), clean({ draft: c, dirty: true, inReview: false, updatedBy: user.uid, updatedAt: new Date() }));
      } else {
        batch.create(db.collection("tours").doc(), clean({ slug: c.slug, title: c.title, propertySlug: slug, status: "draft", draft: c, dirty: true, inReview: false, version: 0, createdBy: user.uid, updatedBy: user.uid, updatedAt: new Date() }));
      }
    }
    await writeAudit(
      { actor: user, propertySlug: slug, entityType: "import", entityId: slug, action: "import", summary: `Imported content file as drafts: ${Object.keys(plan.pages).length} pages, ${plan.cards.length} cards` },
      batch,
    );
    await batch.commit();
    revalidatePath(`/projects/${slug}`, "layout");
    return ok({ pages: Object.keys(plan.pages).length, cards: plan.cards.length });
  });
}
