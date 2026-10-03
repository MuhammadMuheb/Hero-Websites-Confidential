#!/usr/bin/env node
/**
 * Sets the password of an existing Firebase user.
 *
 *   $env:SET_PASSWORD_EMAIL="you@example.com"; $env:SET_PASSWORD_VALUE="at-least-12-chars"
 *   node --env-file=apps/admin/.env.local apps/admin/scripts/set-password.mjs
 *
 * Nothing is written to disk or stored in the repository.
 */
import { cert, initializeApp } from "firebase-admin/app";
import { getAuth } from "firebase-admin/auth";

const need = (n) => {
  const v = process.env[n];
  if (!v) {
    console.error(`Missing ${n}.`);
    process.exit(1);
  }
  return v;
};

const email = need("SET_PASSWORD_EMAIL").trim().toLowerCase();
const password = need("SET_PASSWORD_VALUE");
if (password.length < 12) {
  console.error("SET_PASSWORD_VALUE must be at least 12 characters.");
  process.exit(1);
}

initializeApp({
  credential: cert({
    projectId: need("FIREBASE_PROJECT_ID"),
    clientEmail: need("FIREBASE_CLIENT_EMAIL"),
    privateKey: need("FIREBASE_PRIVATE_KEY").replace(/\\n/g, "\n"),
  }),
});

const auth = getAuth();
const user = await auth.getUserByEmail(email);
await auth.updateUser(user.uid, { password });
await auth.revokeRefreshTokens(user.uid);
console.log(`Password updated for ${email}.`);
