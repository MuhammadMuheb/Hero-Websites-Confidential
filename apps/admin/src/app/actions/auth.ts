"use server";

import { cookies, headers } from "next/headers";
import { z } from "zod";
import { adminAuth, adminDb, firebaseConfigured } from "@/lib/firebase/admin";
import { SESSION_COOKIE, SESSION_MAX_AGE_MS, getSessionUser, isRole } from "@/lib/auth/session";
import { rateLimit } from "@/lib/auth/rate-limit";
import { writeAudit } from "@/lib/repo/audit";
import { emailSchema } from "@/lib/validation/schemas";
import { fail, guard, ok } from "@/lib/actions-util";
import type { ActionResult } from "@/lib/types";

const loginSchema = z.object({ email: emailSchema, password: z.string().min(1).max(256) });

const GENERIC = "Invalid email or password, or this account has no access.";

/**
 * Verifies the password with Firebase Auth (server side, via the Identity Toolkit REST API),
 * checks the invite (users/{uid} + role claim) and sets the httpOnly session cookie.
 * Every failure returns the same message so accounts cannot be enumerated.
 */
export async function login(input: { email: string; password: string }): Promise<ActionResult> {
  return guard(async () => {
    if (!firebaseConfigured() || !process.env.FIREBASE_WEB_API_KEY) return fail("Sign-in is not configured on this server yet.");
    const parsed = loginSchema.safeParse(input);
    if (!parsed.success) return fail(GENERIC);
    const { email, password } = parsed.data;

    const h = await headers();
    const ip = h.get("x-forwarded-for")?.split(",")[0]?.trim() || h.get("x-real-ip") || "unknown";
    const [byIp, byEmail] = await Promise.all([rateLimit("login-ip", ip, 20, 900), rateLimit("login-email", email, 8, 900)]);
    if (!byIp || !byEmail) return fail("Too many sign-in attempts. Please wait 15 minutes and try again.");

    const res = await fetch(`https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${process.env.FIREBASE_WEB_API_KEY}`, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ email, password, returnSecureToken: true }),
      cache: "no-store",
    });
    if (!res.ok) return fail(GENERIC);
    const { idToken } = (await res.json()) as { idToken: string };
    return finishLogin(idToken, "Signed in");
  });
}

/**
 * Google sign-in: the browser signs in with the Firebase client SDK and sends the resulting ID token.
 * Access stays invite-only: the account must already carry a role claim and an active users/{uid} doc,
 * exactly like password sign-in. A Google account without an invite is rejected.
 */
export async function loginWithGoogle(input: { idToken: string }): Promise<ActionResult> {
  return guard(async () => {
    if (!firebaseConfigured()) return fail("Sign-in is not configured on this server yet.");
    const idToken = z.string().min(20).max(8192).safeParse(input?.idToken);
    if (!idToken.success) return fail(GENERIC);

    const h = await headers();
    const ip = h.get("x-forwarded-for")?.split(",")[0]?.trim() || h.get("x-real-ip") || "unknown";
    if (!(await rateLimit("login-ip", ip, 20, 900))) return fail("Too many sign-in attempts. Please wait 15 minutes and try again.");

    return finishLogin(idToken.data, "Signed in with Google", true);
  });
}

async function finishLogin(idToken: string, summary: string, requireGoogle = false): Promise<ActionResult> {
  const auth = adminAuth();
  const decoded = await auth.verifyIdToken(idToken, true).catch(() => null);
  if (!decoded) return fail(GENERIC);
  if (requireGoogle && (decoded.firebase?.sign_in_provider !== "google.com" || decoded.email_verified !== true)) return fail(GENERIC);
  if (!isRole(decoded.role)) return fail(GENERIC);

  const userRef = adminDb().collection("users").doc(decoded.uid);
  const doc = (await userRef.get()).data();
  if (!doc || doc.status !== "active") return fail(GENERIC);

  const cookie = await auth.createSessionCookie(idToken, { expiresIn: SESSION_MAX_AGE_MS });
  (await cookies()).set(SESSION_COOKIE, cookie, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: SESSION_MAX_AGE_MS / 1000,
    path: "/",
  });

  await userRef.update({ lastLoginAt: new Date() });
  await writeAudit({
    actor: { uid: decoded.uid, email: decoded.email ?? doc.email ?? "", role: decoded.role },
    propertySlug: "-",
    entityType: "user",
    entityId: decoded.uid,
    action: "login",
    summary,
  });
  return ok(undefined);
}

export async function logout(): Promise<void> {
  const user = await getSessionUser().catch(() => null);
  (await cookies()).delete(SESSION_COOKIE);
  if (user) await adminAuth().revokeRefreshTokens(user.uid).catch(() => undefined);
}
