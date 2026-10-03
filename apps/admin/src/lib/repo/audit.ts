import "server-only";
import { randomUUID } from "node:crypto";
import { adminDb } from "@/lib/firebase/admin";
import type { SessionUser } from "@/lib/auth/permissions";
import type { AuditAction } from "@/lib/types";

interface AuditInput {
  actor: Pick<SessionUser, "uid" | "email" | "role"> | "system";
  propertySlug: string;
  entityType: string;
  entityId: string;
  action: AuditAction;
  summary: string;
  before?: unknown;
  after?: unknown;
}

/** Cap stored snapshots so one huge page cannot bloat the log. */
function snapshot(v: unknown): string | null {
  if (v === undefined) return null;
  const s = JSON.stringify(v);
  return s.length > 20_000 ? s.slice(0, 20_000) : s;
}

/**
 * The only write path to auditLogs. It uses create() so an existing entry can
 * never be overwritten, and no update or delete helper exists (blueprint D-rules).
 */
export async function writeAudit(input: AuditInput, writer?: FirebaseFirestore.Transaction | FirebaseFirestore.WriteBatch): Promise<void> {
  const id = randomUUID();
  const actor = input.actor === "system" ? { uid: "system", email: "system", role: "system" as const } : input.actor;
  const ref = adminDb().collection("auditLogs").doc(id);
  const data = {
    ts: new Date(),
    actorUid: actor.uid,
    actorEmail: actor.email,
    actorRole: actor.role,
    propertySlug: input.propertySlug,
    entityType: input.entityType,
    entityId: input.entityId,
    action: input.action,
    summary: input.summary.slice(0, 500),
    before: snapshot(input.before),
    after: snapshot(input.after),
    requestId: id,
  };
  if (writer) writer.create(ref, data);
  else await ref.create(data);
}
