import "server-only";
import { adminDb } from "@/lib/firebase/admin";
import { emptyDraft, metaFor } from "@/lib/content/pages";
import { runPageGate, type GateContext } from "@/lib/publish/gate";
import { sanitizeRich } from "@/lib/sanitize";
import type { ContentStatus, LayoutItem, PageDraft, PageState, Project } from "@/lib/types";
import { clean, toIso } from "./util";

/** Where a content document lives. The public site reads `published` (or legacy top-level fields). */
export function contentRef(project: Pick<Project, "slug" | "domain">, slug: string): FirebaseFirestore.DocumentReference {
  const db = adminDb();
  if (slug === "home") return db.collection("siteContent").doc(project.slug);
  if (slug === "navigation") return db.collection("navigation").doc(project.slug);
  if (!project.domain) throw new Error("Set the project domain before editing pages.");
  return db.collection("sites").doc(project.domain).collection("pages").doc(slug);
}

function normalizeDraft(slug: string, raw: unknown): PageDraft {
  const base = emptyDraft(slug);
  const d = (raw ?? {}) as Partial<PageDraft>;
  const layoutIds = new Set((d.layout ?? []).map((l) => l.id));
  return {
    meta: { ...base.meta, ...(d.meta ?? {}) },
    // Keep stored order; append any section added to the definition later.
    layout: [...(d.layout ?? []), ...base.layout.filter((l) => !layoutIds.has(l.id))],
    data: { ...base.data, ...(d.data ?? {}) },
  };
}

export async function getPageState(project: Pick<Project, "slug" | "domain">, slug: string): Promise<PageState> {
  const snap = await contentRef(project, slug).get();
  const d = snap.data();
  if (!d) {
    return { status: "draft", version: 0, draft: emptyDraft(slug), hasPublished: false, updatedAt: null };
  }
  const status: ContentStatus = d.inReview ? "in_review" : ((d.status as ContentStatus) ?? "draft");
  return {
    status,
    version: d.version ?? 0,
    draft: normalizeDraft(slug, d.draft ?? d.published),
    hasPublished: Boolean(d.published),
    updatedAt: toIso(d.updatedAt),
  };
}

/** Strings in the legal page may carry rich text; sanitise on save. */
export function sanitizeDraft(slug: string, draft: PageDraft): PageDraft {
  if (slug !== "legal") return draft;
  const data = { ...draft.data };
  for (const k of ["privacy", "terms", "cookie", "affiliate"]) {
    if (typeof data[k] === "string") data[k] = sanitizeRich(data[k] as string);
  }
  return { ...draft, data };
}

/** Gate context: tour slugs and the other pages' meta titles for this project. */
export async function gateContext(project: Pick<Project, "slug" | "domain">, slug: string): Promise<GateContext> {
  const db = adminDb();
  const tours = await db.collection("tours").where("propertySlug", "==", project.slug).select("slug", "status").get();
  const tourSlugs = new Set(tours.docs.filter((t) => t.data().status !== "trashed").map((t) => t.data().slug as string));

  const pageSlugs = ["home", "about", "contact", "faq", "legal"].filter((s) => s !== slug && (s === "home" || project.domain));
  const docs = await Promise.all(pageSlugs.map(async (s) => ({ s, d: (await contentRef(project, s).get()).data() })));
  const others = docs.filter((x) => x.d?.draft).map((x) => metaFor(x.s, normalizeDraft(x.s, x.d!.draft)).metaTitle);
  return { tourSlugs, otherMetaTitles: others.filter(Boolean) };
}

export async function gateFor(project: Pick<Project, "slug" | "domain">, slug: string, draft: PageDraft) {
  return runPageGate(slug, draft, await gateContext(project, slug));
}

interface WriteCtx {
  uid: string;
}

export async function writeDraft(
  project: Pick<Project, "slug" | "domain">,
  slug: string,
  draft: PageDraft,
  by: WriteCtx,
  audit: (tx: FirebaseFirestore.Transaction, before: unknown) => void,
): Promise<void> {
  const ref = contentRef(project, slug);
  await adminDb().runTransaction(async (tx) => {
    const snap = await tx.get(ref);
    const cur = snap.data();
    tx.set(
      ref,
      clean({
        slug,
        propertySlug: project.slug,
        draft,
        // Never touch published fields or the legacy top-level fields the site reads.
        status: cur?.status ?? "draft",
        dirty: true,
        inReview: false,
        version: cur?.version ?? 0,
        updatedBy: by.uid,
        updatedAt: new Date(),
      }),
      { merge: true },
    );
    audit(tx, cur?.draft ?? null);
  });
}

export async function setInReview(project: Pick<Project, "slug" | "domain">, slug: string, by: WriteCtx, audit: (tx: FirebaseFirestore.Transaction) => void) {
  const ref = contentRef(project, slug);
  await adminDb().runTransaction(async (tx) => {
    const snap = await tx.get(ref);
    if (!snap.exists) throw new Error("Save a draft first.");
    tx.update(ref, { inReview: true, updatedBy: by.uid, updatedAt: new Date() });
    audit(tx);
  });
}

/**
 * Copy draft to published, increment the version, in one transaction together with the
 * audit entry. Legacy page docs also get their top-level fields refreshed so the public
 * site's existing reads keep working.
 */
export async function publishDraft(
  project: Pick<Project, "slug" | "domain">,
  slug: string,
  by: WriteCtx,
  audit: (tx: FirebaseFirestore.Transaction, version: number) => void,
): Promise<number> {
  const ref = contentRef(project, slug);
  return adminDb().runTransaction(async (tx) => {
    const snap = await tx.get(ref);
    const d = snap.data();
    if (!d?.draft) throw new Error("There is no draft to publish.");
    const draft = normalizeDraft(slug, d.draft);
    const version = (d.version ?? 0) + 1;
    const legacy: Record<string, unknown> = {};
    if (slug !== "home" && slug !== "navigation") {
      legacy.title = draft.meta.title;
      legacy.metaTitle = draft.meta.metaTitle;
      legacy.metaDesc = draft.meta.metaDesc;
      if (slug === "faq") {
        const blocks = (draft.data.blocks ?? []) as { title: string; questions: { question: string; answer: string }[] }[];
        legacy.faqs = blocks.flatMap((b) => b.questions.map((q) => ({ question: q.question, answer: q.answer })));
      }
    }
    tx.set(
      ref,
      clean({
        ...legacy,
        published: draft,
        status: "published",
        dirty: false,
        inReview: false,
        version,
        updatedBy: by.uid,
        updatedAt: new Date(),
      }),
      { merge: true },
    );
    audit(tx, version);
    return version;
  });
}

export type { LayoutItem };
