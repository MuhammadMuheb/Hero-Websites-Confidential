#!/usr/bin/env node
/**
 * One-off script that creates the first Super Admin (there is no public sign-up).
 *
 *   ADMIN_BOOTSTRAP_EMAIL=you@example.com node --env-file=apps/admin/.env.local apps/admin/scripts/bootstrap-super-admin.mjs
 *
 * Password handling: nothing is ever written to disk or stored in the repository.
 *  - Without ADMIN_BOOTSTRAP_PASSWORD the account gets a random password and the script prints a
 *    one-time "set your password" link (recommended).
 *  - With ADMIN_BOOTSTRAP_PASSWORD it must be at least 12 characters.
 *
 * The script is idempotent: an existing user keeps their password and just gets the claims.
 */
import { randomBytes } from "node:crypto";
import { cert, initializeApp } from "firebase-admin/app";
import { getAuth } from "firebase-admin/auth";
import { getFirestore } from "firebase-admin/firestore";

const need = (n) => {
  const v = process.env[n];
  if (!v) {
    console.error(`Missing ${n}. Load your env file with --env-file=apps/admin/.env.local`);
    process.exit(1);
  }
  return v;
};

const email = need("ADMIN_BOOTSTRAP_EMAIL").trim().toLowerCase();
const password = process.env.ADMIN_BOOTSTRAP_PASSWORD;
if (password !== undefined && password.length < 12) {
  console.error("ADMIN_BOOTSTRAP_PASSWORD must be at least 12 characters. Omit it to get a one-time setup link instead.");
  process.exit(1);
}

const projectId = need("FIREBASE_PROJECT_ID");
initializeApp({
  credential: cert({ projectId, clientEmail: need("FIREBASE_CLIENT_EMAIL"), privateKey: need("FIREBASE_PRIVATE_KEY").replace(/\\n/g, "\n") }),
});
const auth = getAuth();
const db = getFirestore();

console.log(`Firebase project: ${projectId}`);
console.log(`Super Admin:      ${email}`);

let user;
let created = false;
try {
  user = await auth.getUserByEmail(email);
} catch (e) {
  if (e.code !== "auth/user-not-found") throw e;
  user = await auth.createUser({ email, displayName: "Super Admin", password: password ?? randomBytes(24).toString("base64url"), emailVerified: true });
  created = true;
}

await auth.setCustomUserClaims(user.uid, { role: "super_admin", propertyIds: [] });
await auth.revokeRefreshTokens(user.uid);
await db.collection("users").doc(user.uid).set(
  { email, displayName: user.displayName || "Super Admin", role: "super_admin", propertyIds: [], status: "active", mfaEnabled: false, lastLoginAt: null, createdAt: new Date(), createdBy: "bootstrap" },
  { merge: true },
);
await db.collection("auditLogs").doc().create({
  ts: new Date(),
  actorUid: "bootstrap",
  actorEmail: "bootstrap",
  actorRole: "system",
  propertySlug: "-",
  entityType: "user",
  entityId: user.uid,
  action: "role_change",
  summary: `${created ? "Created" : "Updated"} Super Admin ${email}`,
  before: null,
  after: JSON.stringify({ role: "super_admin" }),
  requestId: "bootstrap",
});

console.log(created ? "User created." : "User already existed: password unchanged, claims updated.");
if (created && password === undefined) {
  console.log("\nOne-time link to set the password (share only with the account owner):");
  console.log(await auth.generatePasswordResetLink(email));
}
console.log("\nDone. Sign in at /login.");
