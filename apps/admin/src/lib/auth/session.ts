import "server-only";
import { cache } from "react";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { adminAuth, adminDb } from "@/lib/firebase/admin";
import type { Role } from "@/lib/types";
import { PermissionError, can, type Action, type SessionUser } from "./permissions";
import { writeAudit } from "@/lib/repo/audit";

export const SESSION_COOKIE = "admin_session";
export const SESSION_MAX_AGE_MS = 5 * 24 * 60 * 60 * 1000;

const ROLES: Role[] = ["super_admin", "admin", "contributor"];

export function isRole(v: unknown): v is Role {
  return typeof v === "string" && (ROLES as string[]).includes(v);
}

/**
 * Verifies the session cookie (checking revocation) and requires an active
 * users/{uid} document. Returns null when the visitor is not allowed in.
 */
export const getSessionUser = cache(async (): Promise<SessionUser | null> => {
  const cookie = (await cookies()).get(SESSION_COOKIE)?.value;
  if (!cookie) return null;
  try {
    const claims = await adminAuth().verifySessionCookie(cookie, true);
    if (!isRole(claims.role)) return null;
    const snap = await adminDb().collection("users").doc(claims.uid).get();
    const doc = snap.data();
    if (!doc || doc.status !== "active") return null;
    return {
      uid: claims.uid,
      email: claims.email ?? doc.email ?? "",
      displayName: doc.displayName ?? claims.email ?? "",
      role: claims.role,
      propertyIds: Array.isArray(claims.propertyIds) ? (claims.propertyIds as string[]) : [],
    };
  } catch {
    return null;
  }
});

/** For pages and layouts: send anonymous visitors to the sign-in screen. */
export async function requireUser(): Promise<SessionUser> {
  const user = await getSessionUser();
  if (!user) redirect("/login");
  return user;
}

/**
 * First line of every Server Action and Route Handler (blueprint section 6).
 * Throws PermissionError on failure and records the failure in the audit log.
 */
export async function requirePermission(
  action: Action,
  propertySlug?: string,
  ctx?: { ownerUid?: string; isDraft?: boolean },
): Promise<SessionUser> {
  const user = await getSessionUser();
  if (!user) throw new PermissionError("Your session has expired. Please sign in again.");
  if (!can(user, action, propertySlug, ctx)) {
    await writeAudit({
      actor: user,
      propertySlug: propertySlug ?? "-",
      entityType: "permission",
      entityId: action,
      action: "update",
      summary: `DENIED ${action}`,
    }).catch(() => undefined);
    throw new PermissionError();
  }
  return user;
}
