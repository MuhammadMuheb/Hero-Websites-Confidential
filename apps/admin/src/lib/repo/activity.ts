import "server-only";
import { adminDb } from "@/lib/firebase/admin";
import type { SessionUser } from "@/lib/auth/permissions";
import { toIso } from "./util";

export interface ActivityRow {
  id: string;
  when: string | null;
  who: string;
  /** What kind of change: publish, update, delete, restore, ... */
  action: string;
  entityType: string;
  summary: string;
}

/**
 * The change log of one project, newest first. Read only. A Contributor sees only their own entries; Admin and
 * Super Admin see the whole project (access to the project itself is checked by the caller).
 * Sorted here, not in the query, so no extra index is needed.
 */
export async function listActivity(user: SessionUser, propertySlug: string, limit = 100): Promise<ActivityRow[]> {
  const snap = await adminDb().collection("auditLogs").where("propertySlug", "==", propertySlug).get();
  return snap.docs
    .map((d) => ({ d: d.data(), id: d.id }))
    .filter(({ d }) => user.role !== "contributor" || d.actorUid === user.uid)
    .map(({ d, id }) => ({ id, when: toIso(d.ts), who: String(d.actorEmail ?? "system"), action: String(d.action ?? ""), entityType: String(d.entityType ?? ""), summary: String(d.summary ?? "") }))
    .sort((a, b) => (b.when ?? "").localeCompare(a.when ?? ""))
    .slice(0, limit);
}
