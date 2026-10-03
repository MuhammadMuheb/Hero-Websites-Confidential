import "server-only";
import { cache } from "react";
import { adminDb } from "@/lib/firebase/admin";
import type { SessionUser } from "@/lib/auth/permissions";
import type { AdminUser, Taxonomies } from "@/lib/types";
import { toIso } from "./util";

/* ---------- users ---------- */

export function toAdminUser(id: string, d: FirebaseFirestore.DocumentData): AdminUser {
  return {
    id,
    email: d.email ?? "",
    displayName: d.displayName ?? d.email ?? "",
    role: d.role,
    propertyIds: Array.isArray(d.propertyIds) ? d.propertyIds : [],
    status: d.status === "suspended" ? "suspended" : "active",
    mfaEnabled: Boolean(d.mfaEnabled),
    lastLoginAt: toIso(d.lastLoginAt),
  };
}

/** Only the fields the list needs: keeps the Firestore payload small as the user count grows. */
const USER_FIELDS = ["email", "displayName", "role", "propertyIds", "status", "mfaEnabled", "lastLoginAt"] as const;

/** Super Admin sees everyone; Admin sees contributors; others see only themselves. Once per request. */
export const listUsers = cache(async (actor: SessionUser): Promise<AdminUser[]> => {
  const col = adminDb().collection("users");
  const fields = () => col.select(...USER_FIELDS);
  if (actor.role === "super_admin") return (await fields().orderBy("email").get()).docs.map((d) => toAdminUser(d.id, d.data()));
  if (actor.role === "admin") {
    // The two reads are independent: run them together.
    const [contributors, self] = await Promise.all([fields().where("role", "==", "contributor").get(), col.doc(actor.uid).get()]);
    const rows = contributors.docs.map((d) => toAdminUser(d.id, d.data()));
    return [...(self.exists ? [toAdminUser(self.id, self.data()!)] : []), ...rows];
  }
  const self = await col.doc(actor.uid).get();
  return self.exists ? [toAdminUser(self.id, self.data()!)] : [];
});

/* ---------- taxonomies ---------- */

export const EMPTY_TAXONOMIES: Taxonomies = { categories: [], neighbourhoods: [], cities: [], blogCategories: [] };

export async function getTaxonomies(propertySlug: string): Promise<Taxonomies> {
  const d = (await adminDb().collection("taxonomies").doc(propertySlug).get()).data();
  return { ...EMPTY_TAXONOMIES, ...(d ?? {}) } as Taxonomies;
}

/* ---------- redirects ---------- */

export interface RedirectRow {
  from: string;
  to: string;
  createdAt: string | null;
}

export async function listRedirects(propertySlug: string): Promise<RedirectRow[]> {
  const snap = await adminDb().collection("redirects").where("propertySlug", "==", propertySlug).get();
  return snap.docs
    .map((d) => ({ from: d.data().from as string, to: d.data().to as string, createdAt: toIso(d.data().createdAt) }))
    .sort((a, b) => a.from.localeCompare(b.from));
}
