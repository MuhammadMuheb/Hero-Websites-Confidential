import "server-only";
import { cache } from "react";
import { adminDb } from "@/lib/firebase/admin";
import { canAccessProject, type SessionUser } from "@/lib/auth/permissions";
import type { NetworkEntry, Project, Theme } from "@/lib/types";
import { DEFAULT_THEME } from "@/lib/validation/schemas";
import { toIso } from "./util";

const col = () => adminDb().collection("properties");

function toProject(id: string, d: FirebaseFirestore.DocumentData, cards = 0): Project {
  return {
    id,
    slug: id,
    name: d.name ?? id,
    domain: d.domain ?? "",
    publicUrl: d.publicUrl ?? "",
    status: d.status ?? "coming_soon",
    contactEmail: d.contactEmail ?? "",
    logoUrl: d.logoUrl ?? "",
    theme: { ...DEFAULT_THEME, ...(d.theme ?? {}) } as Theme,
    cards,
    lastEdit: toIso(d.updatedAt) ?? toIso(d.createdAt),
  };
}

async function countCards(slug: string): Promise<number> {
  const snap = await adminDb().collection("tours").where("propertySlug", "==", slug).count().get();
  return snap.data().count;
}

/**
 * One read of the projects collection per request, shared by the layout and the page.
 * `user` is the request-cached session object, so React's cache() dedupes on its identity.
 */
const accessibleDocs = cache(async (user: SessionUser) => {
  const snap = await col()
    .select("name", "domain", "publicUrl", "status", "contactEmail", "logoUrl", "theme", "updatedAt", "createdAt")
    .orderBy("name")
    .get();
  return snap.docs.filter((d) => canAccessProject(user, d.id));
});

/** Projects the user may see, without card counts (no per-project queries). Use for navigation and lists. */
export const listProjectSummaries = cache(async (user: SessionUser): Promise<Project[]> => {
  return (await accessibleDocs(user)).map((d) => toProject(d.id, d.data()));
});

/** Same as listProjectSummaries plus the card count per project (one count query each, run in parallel). */
export const listProjects = cache(async (user: SessionUser): Promise<Project[]> => {
  const docs = await accessibleDocs(user);
  return Promise.all(docs.map(async (d) => toProject(d.id, d.data(), await countCards(d.id))));
});

export const getProject = cache(async (user: SessionUser, slug: string): Promise<Project | null> => {
  if (!canAccessProject(user, slug)) return null;
  const snap = await col().doc(slug).get();
  return snap.exists ? toProject(snap.id, snap.data()!, await countCards(slug)) : null;
});

export async function slugExists(slug: string): Promise<boolean> {
  return (await col().doc(slug).get()).exists;
}

/** Our Network: projects with status live and a public URL (blueprint section 11). */
export async function getNetwork(): Promise<NetworkEntry[]> {
  const snap = await col().where("status", "==", "live").get();
  return snap.docs
    .map((d) => ({ name: d.data().name as string, publicUrl: d.data().publicUrl as string }))
    .filter((n) => n.publicUrl?.startsWith("https://"))
    .sort((a, b) => a.name.localeCompare(b.name));
}
