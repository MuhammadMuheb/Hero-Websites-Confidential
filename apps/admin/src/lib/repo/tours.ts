import "server-only";
import { adminDb } from "@/lib/firebase/admin";
import type { ContentStatus, Tour } from "@/lib/types";
import type { CardDraftInput } from "@/lib/validation/schemas";
import { clean, toIso } from "./util";

const col = () => adminDb().collection("tours");

/** Existing tours that predate propertySlug can be claimed by one project via env (kept explicit, never implicit). */
const LEGACY_SLUG = () => process.env.LEGACY_PROPERTY_SLUG || "";

export function belongsTo(d: FirebaseFirestore.DocumentData, propertySlug: string): boolean {
  if (d.propertySlug) return d.propertySlug === propertySlug;
  return LEGACY_SLUG() === propertySlug;
}

/** What the editor shows: the draft when there is one, otherwise the live fields. */
function effective(d: FirebaseFirestore.DocumentData): CardDraftInput {
  if (d.draft) return d.draft as CardDraftInput;
  const images = Array.isArray(d.images)
    ? (d.images as { url: string; alt?: string; order?: number }[]).map((i, n) => ({ url: i.url, alt: i.alt ?? "", order: i.order ?? n }))
    : d.imageUrl
      ? [{ url: d.imageUrl as string, alt: "", order: 0 }]
      : [];
  return {
    title: d.title ?? "",
    slug: d.slug ?? "",
    shortDescription: d.shortDescription ?? "",
    description: d.description ?? "",
    price: d.price ?? null,
    rating: d.rating ?? null,
    images,
    category: d.category ?? (Array.isArray(d.niche) ? (d.niche[0] ?? "") : ""),
    neighbourhood: d.neighbourhood ?? d.neighborhood ?? "",
    city: d.city ?? "",
    duration: d.duration ?? "",
    affiliateUrl: d.affiliateUrl ?? "",
  };
}

export function uiStatus(d: FirebaseFirestore.DocumentData): ContentStatus {
  if (d.status === "trashed") return "trashed";
  // Missing status means published (existing tours).
  const base: ContentStatus = d.status ?? "published";
  if (d.inReview && base !== "published") return "in_review";
  if (d.inReview) return "in_review";
  return base === "in_review" ? "in_review" : base;
}

export function toTour(id: string, d: FirebaseFirestore.DocumentData): Tour {
  const e = effective(d);
  return {
    id,
    title: e.title,
    slug: e.slug,
    shortDescription: e.shortDescription ?? "",
    description: e.description ?? "",
    priceCurrent: e.price?.current ?? null,
    priceOriginal: e.price?.original ?? null,
    priceOriginalSince: e.price?.originalSince ?? "",
    currency: e.price?.currency ?? "EUR",
    ratingValue: e.rating?.value ?? null,
    ratingCount: e.rating?.count ?? null,
    ratingSource: e.rating?.source ?? "partner",
    images: [...(e.images ?? [])].sort((a, b) => a.order - b.order).map((i, n) => ({ url: i.url, alt: i.alt ?? "", order: n })),
    category: e.category ?? "",
    neighbourhood: e.neighbourhood ?? "",
    city: e.city ?? "",
    duration: e.duration ?? "",
    affiliateUrl: e.affiliateUrl ?? "",
    status: uiStatus(d),
    version: d.version ?? 0,
    createdBy: d.createdBy ?? "",
    updatedAt: toIso(d.updatedAt),
  };
}

export async function listTours(propertySlug: string): Promise<Tour[]> {
  const snaps = [await col().where("propertySlug", "==", propertySlug).get()];
  const docs = [...snaps[0].docs];
  if (LEGACY_SLUG() === propertySlug) {
    // Firestore cannot query for a missing field; filter in code.
    const all = await col().get();
    docs.push(...all.docs.filter((d) => !d.data().propertySlug));
  }
  return docs.map((d) => toTour(d.id, d.data())).sort((a, b) => a.title.localeCompare(b.title));
}

export async function countByStatus(propertySlugs: string[] | "all") {
  let q: FirebaseFirestore.Query = col();
  if (propertySlugs !== "all") {
    if (propertySlugs.length === 0) return { tours: 0, waiting: 0 };
    q = q.where("propertySlug", "in", propertySlugs.slice(0, 30));
  }
  const [total, waiting] = await Promise.all([
    q.count().get(),
    q.where("dirty", "==", true).count().get(),
  ]);
  return { tours: total.data().count, waiting: waiting.data().count };
}

export async function getTourDoc(propertySlug: string, id: string) {
  const ref = col().doc(id);
  const snap = await ref.get();
  const d = snap.data();
  // Tenancy: a card id from another project is treated as missing.
  if (!d || !belongsTo(d, propertySlug)) return null;
  return { ref, data: d };
}

export async function slugTaken(propertySlug: string, slug: string, exceptId?: string): Promise<boolean> {
  const snap = await col().where("propertySlug", "==", propertySlug).where("slug", "==", slug).get();
  const live = await col().where("propertySlug", "==", propertySlug).get();
  const drafts = live.docs.filter((d) => d.data().draft?.slug === slug && d.id !== exceptId);
  return snap.docs.some((d) => d.id !== exceptId && d.data().status !== "trashed") || drafts.some((d) => d.data().status !== "trashed");
}

export function newTourRef() {
  return col().doc();
}

/** Fields copied from draft to the top level on publish (the shape the public site reads). */
export function liveFields(draft: CardDraftInput) {
  const images = [...draft.images].sort((a, b) => a.order - b.order);
  return clean({
    title: draft.title,
    slug: draft.slug,
    shortDescription: draft.shortDescription,
    description: draft.description,
    price: draft.price,
    rating: draft.rating,
    images,
    imageUrl: images[0]?.url ?? "",
    category: draft.category,
    niche: draft.category ? [draft.category] : [],
    neighborhood: draft.neighbourhood,
    neighbourhood: draft.neighbourhood,
    city: draft.city,
    duration: draft.duration,
    affiliateUrl: draft.affiliateUrl,
  });
}
