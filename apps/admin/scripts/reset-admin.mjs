#!/usr/bin/env node
/**
 * Deletes one Firebase Auth user and recreates a Super Admin.
 *
 * Dry run (default, changes nothing):
 *   $env:RESET_OLD_EMAIL="old@example.com"
 *   node --env-file=apps/admin/.env.local apps/admin/scripts/reset-admin.mjs
 *
 * Real run (permanent):
 *   $env:RESET_OLD_EMAIL="old@example.com"; $env:RESET_NEW_EMAIL="new@example.com"; $env:RESET_NEW_PASSWORD="at-least-12-chars"
 *   node --env-file=apps/admin/.env.local apps/admin/scripts/reset-admin.mjs --confirm
 *
 * RESET_NEW_EMAIL defaults to RESET_OLD_EMAIL. The password is never printed or stored.
 */
import { cert, initializeApp } from "firebase-admin/app";
import { getAuth } from "firebase-admin/auth";
import { getFirestore } from "firebase-admin/firestore";

const need = (n) => {
  const v = process.env[n];
  if (!v) {
    console.error(`Missing ${n}.`);
    process.exit(1);
  }
  return v;
};

const confirm = process.argv.includes("--confirm");
const oldEmail = need("RESET_OLD_EMAIL").trim().toLowerCase();
const newEmail = (process.env.RESET_NEW_EMAIL || oldEmail).trim().toLowerCase();

const projectId = need("FIREBASE_PROJECT_ID");
initializeApp({
  credential: cert({ projectId, clientEmail: need("FIREBASE_CLIENT_EMAIL"), privateKey: need("FIREBASE_PRIVATE_KEY").replace(/\\n/g, "\n") }),
});
const auth = getAuth();
const db = getFirestore();

console.log(`Firebase project: ${projectId}`);

let oldUser = null;
try {
  oldUser = await auth.getUserByEmail(oldEmail);
} catch (e) {
  if (e.code !== "auth/user-not-found") throw e;
}

if (oldUser) {
  const doc = await db.collection("users").doc(oldUser.uid).get();
  console.log(`Existing user:    ${oldEmail}`);
  console.log(`  uid:            ${oldUser.uid}`);
  console.log(`  claims:         ${JSON.stringify(oldUser.customClaims ?? {})}`);
  console.log(`  users/{uid}:    ${doc.exists ? "exists" : "missing"}`);
} else {
  console.log(`No existing user with email ${oldEmail}.`);
}
console.log(`Would create:     ${newEmail} (super_admin)`);

if (!confirm) {
  console.log("\nDry run only. Nothing was changed. Re-run with --confirm to apply.");
  process.exit(0);
}

const password = need("RESET_NEW_PASSWORD");
if (password.length < 12) {
  console.error("RESET_NEW_PASSWORD must be at least 12 characters.");
  process.exit(1);
}

if (oldUser) {
  await auth.deleteUser(oldUser.uid);
  await db.collection("users").doc(oldUser.uid).delete();
  console.log("Old user deleted.");
}

let existing = null;
try {
  existing = await auth.getUserByEmail(newEmail);
} catch (e) {
  if (e.code !== "auth/user-not-found") throw e;
}
if (existing) {
  console.error(`${newEmail} already exists (uid ${existing.uid}); refusing to overwrite it. Choose a different RESET_NEW_EMAIL.`);
  process.exit(1);
}

const user = await auth.createUser({ email: newEmail, displayName: "Super Admin", password, emailVerified: true });
await auth.setCustomUserClaims(user.uid, { role: "super_admin", propertyIds: [] });
await db.collection("users").doc(user.uid).set({
  email: newEmail, displayName: "Super Admin", role: "super_admin", propertyIds: [], status: "active",
  mfaEnabled: false, lastLoginAt: null, createdAt: new Date(), createdBy: "reset-admin",
});
await db.collection("auditLogs").doc().create({
  ts: new Date(), actorUid: "reset-admin", actorEmail: "reset-admin", actorRole: "system", propertySlug: "-",
  entityType: "user", entityId: user.uid, action: "role_change",
  summary: `Reset admin: removed ${oldEmail}, created Super Admin ${newEmail}`,
  before: null, after: JSON.stringify({ role: "super_admin" }), requestId: "reset-admin",
});
console.log(`New Super Admin created: ${newEmail} (uid ${user.uid}). Sign in at /login.`);
