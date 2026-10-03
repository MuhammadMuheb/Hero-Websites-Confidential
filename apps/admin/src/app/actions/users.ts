"use server";

import { randomBytes } from "node:crypto";
import { revalidatePath } from "next/cache";
import { adminAuth, adminDb } from "@/lib/firebase/admin";
import { assignableRoles, canAccessProject, canManageUser } from "@/lib/auth/permissions";
import { requirePermission } from "@/lib/auth/session";
import { rateLimit } from "@/lib/auth/rate-limit";
import { writeAudit } from "@/lib/repo/audit";
import { inviteSchema, passwordSchema, userProfileSchema } from "@/lib/validation/schemas";
import { UserError, guard, ok } from "@/lib/actions-util";
import type { ActionResult, Role } from "@/lib/types";

/**
 * Invite-only onboarding. Creates the Auth user with a random password nobody sees, sets the
 * role claims and the users/{uid} document, and returns a one-time password-setup link for the
 * inviter to pass on. There is no public sign-up.
 */
export async function inviteUser(input: unknown): Promise<ActionResult<{ setupLink: string }>> {
  return guard(async () => {
    const actor = await requirePermission("user:manage");
    if (!(await rateLimit("invite", actor.uid, 20, 3600))) throw new UserError("Too many invitations. Try again later.");
    const data = inviteSchema.parse(input);
    if (!assignableRoles(actor).includes(data.role)) throw new UserError("You cannot assign that role.");
    const propertyIds = data.role === "super_admin" ? [] : data.propertyIds;
    if (actor.role !== "super_admin" && !propertyIds.every((p) => canAccessProject(actor, p))) throw new UserError("You can only assign projects you have access to.");

    const auth = adminAuth();
    const created = await auth
      .createUser({ email: data.email, displayName: data.displayName, password: randomBytes(24).toString("base64url"), emailVerified: false })
      .catch((e: { code?: string }) => {
        if (e.code === "auth/email-already-exists") throw new UserError("A user with that email already exists.");
        throw e;
      });
    await auth.setCustomUserClaims(created.uid, { role: data.role, propertyIds });
    await adminDb().collection("users").doc(created.uid).set({ email: data.email, displayName: data.displayName, role: data.role, propertyIds, status: "active", mfaEnabled: false, lastLoginAt: null, createdAt: new Date(), createdBy: actor.uid });
    await writeAudit({ actor, propertySlug: "-", entityType: "user", entityId: created.uid, action: "create", summary: `Invited ${data.email} as ${data.role}`, after: { role: data.role, propertyIds } });
    const setupLink = await auth.generatePasswordResetLink(data.email);
    revalidatePath("/settings");
    return ok({ setupLink });
  });
}

async function target(uid: string) {
  const actor = await requirePermission("user:manage");
  if (uid === actor.uid) throw new UserError("You cannot change your own account here.");
  const snap = await adminDb().collection("users").doc(uid).get();
  const doc = snap.data();
  if (!doc) throw new UserError("User not found.");
  const targetIds = Array.isArray(doc.propertyIds) ? (doc.propertyIds as string[]) : [];
  if (!canManageUser(actor, { role: doc.role as Role, propertyIds: targetIds })) throw new UserError("You cannot manage that user.");
  return { actor, doc };
}

async function lastSuperAdminGuard(uid: string) {
  const supers = await adminDb().collection("users").where("role", "==", "super_admin").where("status", "==", "active").get();
  if (supers.docs.length <= 1 && supers.docs[0]?.id === uid) throw new UserError("This is the last active Super Admin and cannot be changed.");
}

/** Role change takes effect at once: the refresh tokens are revoked so the old claims stop working. */
export async function changeRole(uid: string, role: Role, propertyIdsInput: string[]): Promise<ActionResult> {
  return guard(async () => {
    const { actor, doc } = await target(uid);
    if (!assignableRoles(actor).includes(role)) throw new UserError("You cannot assign that role.");
    const propertyIds = role === "super_admin" ? [] : propertyIdsInput.slice(0, 50);
    if (actor.role !== "super_admin" && !propertyIds.every((p) => canAccessProject(actor, p))) throw new UserError("You can only assign projects you have access to.");
    if (doc.role === "super_admin" && role !== "super_admin") await lastSuperAdminGuard(uid);

    await adminAuth().setCustomUserClaims(uid, { role, propertyIds });
    await adminDb().collection("users").doc(uid).update({ role, propertyIds });
    await adminAuth().revokeRefreshTokens(uid);
    await writeAudit({ actor, propertySlug: "-", entityType: "user", entityId: uid, action: "role_change", summary: `${doc.email}: ${doc.role} to ${role}`, before: { role: doc.role, propertyIds: doc.propertyIds }, after: { role, propertyIds } });
    revalidatePath("/settings");
    return ok(undefined);
  });
}

/**
 * Edit name and email. Only a Super Admin may change an email (it is the sign-in identity).
 * An email change revokes sessions because the old token still carries the previous address.
 */
export async function updateUserProfile(uid: string, input: unknown): Promise<ActionResult> {
  return guard(async () => {
    const { actor, doc } = await target(uid);
    const data = userProfileSchema.parse(input);
    const emailChanged = data.email !== doc.email;
    if (emailChanged && actor.role !== "super_admin") throw new UserError("Only a Super Admin can change an email address.");
    if (!emailChanged && data.displayName === doc.displayName) return ok(undefined);

    await adminAuth()
      .updateUser(uid, { displayName: data.displayName, ...(emailChanged ? { email: data.email } : {}) })
      .catch((e: { code?: string }) => {
        if (e.code === "auth/email-already-exists") throw new UserError("A user with that email already exists.");
        throw e;
      });
    await adminDb().collection("users").doc(uid).update({ displayName: data.displayName, email: data.email });
    if (emailChanged) await adminAuth().revokeRefreshTokens(uid);
    await writeAudit({
      actor,
      propertySlug: "-",
      entityType: "user",
      entityId: uid,
      action: "update",
      summary: `Edited ${doc.email}${emailChanged ? ` (email now ${data.email})` : ""}`,
      before: { displayName: doc.displayName, email: doc.email },
      after: { displayName: data.displayName, email: data.email },
    });
    revalidatePath("/settings");
    return ok(undefined);
  });
}

/**
 * Sets a new password in Firebase Auth and signs the user out everywhere. The password is never
 * stored, logged or written to the audit trail.
 */
export async function setUserPassword(uid: string, passwordInput: unknown): Promise<ActionResult> {
  return guard(async () => {
    const { actor, doc } = await target(uid);
    if (!(await rateLimit("set-password", actor.uid, 20, 3600))) throw new UserError("Too many password changes. Try again later.");
    const password = passwordSchema.parse(passwordInput);
    if (password.toLowerCase() === String(doc.email).toLowerCase()) throw new UserError("The password cannot be the same as the email.");

    await adminAuth().updateUser(uid, { password });
    await adminAuth().revokeRefreshTokens(uid);
    await writeAudit({ actor, propertySlug: "-", entityType: "user", entityId: uid, action: "update", summary: `Password changed for ${doc.email}` });
    return ok(undefined);
  });
}

/**
 * Permanent. Revokes sessions first, then removes the Firebase Auth account and the users/{uid}
 * document. The caller must type the user's email to confirm. The last active Super Admin is protected.
 */
export async function deleteUser(uid: string, confirmEmail: string): Promise<ActionResult> {
  return guard(async () => {
    const { actor, doc } = await target(uid);
    if (String(confirmEmail).trim().toLowerCase() !== String(doc.email).toLowerCase()) throw new UserError("The email you typed does not match.");
    if (doc.role === "super_admin") await lastSuperAdminGuard(uid);

    const auth = adminAuth();
    await auth.revokeRefreshTokens(uid).catch((e: { code?: string }) => {
      if (e.code !== "auth/user-not-found") throw e;
    });
    await auth.deleteUser(uid).catch((e: { code?: string }) => {
      if (e.code !== "auth/user-not-found") throw e;
    });
    await adminDb().collection("users").doc(uid).delete();
    await writeAudit({
      actor,
      propertySlug: "-",
      entityType: "user",
      entityId: uid,
      action: "delete",
      summary: `Deleted ${doc.email} (${doc.role})`,
      before: { role: doc.role, propertyIds: doc.propertyIds },
    });
    revalidatePath("/settings");
    return ok(undefined);
  });
}

/** Suspending revokes sessions immediately. */
export async function setUserSuspended(uid: string, suspended: boolean): Promise<ActionResult> {
  return guard(async () => {
    const { actor, doc } = await target(uid);
    if (suspended && doc.role === "super_admin") await lastSuperAdminGuard(uid);
    await adminAuth().updateUser(uid, { disabled: suspended });
    await adminDb().collection("users").doc(uid).update({ status: suspended ? "suspended" : "active" });
    if (suspended) await adminAuth().revokeRefreshTokens(uid);
    await writeAudit({ actor, propertySlug: "-", entityType: "user", entityId: uid, action: "role_change", summary: `${suspended ? "Suspended" : "Reactivated"} ${doc.email}` });
    revalidatePath("/settings");
    return ok(undefined);
  });
}
