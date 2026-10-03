"use client";

/**
 * Public web config (not secret). Only used to obtain a Google ID token; the server decides access.
 * The Firebase SDK is imported on demand so it is not part of the login page's initial JavaScript.
 */
export function googleConfigured(): boolean {
  return Boolean(process.env.NEXT_PUBLIC_FIREBASE_API_KEY && process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID);
}

/** Opens the Google popup and returns a fresh Firebase ID token. The client session is discarded right away. */
export async function googleIdToken(): Promise<string> {
  const apiKey = process.env.NEXT_PUBLIC_FIREBASE_API_KEY;
  const projectId = process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID;
  if (!apiKey || !projectId) throw new Error("not-configured");

  const [{ getApp, getApps, initializeApp }, { GoogleAuthProvider, getAuth, signInWithPopup, signOut }] = await Promise.all([import("firebase/app"), import("firebase/auth")]);
  const app = getApps().length
    ? getApp()
    : initializeApp({ apiKey, projectId, authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN || `${projectId}.firebaseapp.com` });

  const auth = getAuth(app);
  const provider = new GoogleAuthProvider();
  provider.setCustomParameters({ prompt: "select_account" });
  const cred = await signInWithPopup(auth, provider);
  const token = await cred.user.getIdToken(true);
  await signOut(auth);
  return token;
}
