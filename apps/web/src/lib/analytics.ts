/**
 * apps/web/src/lib/analytics.ts — GA4 + search-console verification wiring.
 *
 * This closes the "GA4 + GSC + Bing verification wired to this property
 * specifically — not found in the inspected files" gap noted in the
 * Underground Colosseum design blueprint (v2 §6). That finding was true of
 * the whole platform, not just this property: before this file, nothing in
 * italy-tours-platform read a GA4 measurement ID or a search-console
 * verification code from anywhere.
 *
 * What this file does NOT do: invent a measurement ID or a verification
 * code. Both are real credentials — a GA4 property ID from the user's own
 * Google Analytics account, and ownership-proof tokens from Google Search
 * Console / Bing Webmaster Tools — that only the account owner can generate.
 * A placeholder value checked into source would either silently report to
 * nobody or fail the ownership check outright, so every export below is
 * `undefined` unless the corresponding env var is actually set.
 *
 * To activate once real credentials exist: set NEXT_PUBLIC_GA_MEASUREMENT_ID,
 * GOOGLE_SITE_VERIFICATION and/or BING_SITE_VERIFICATION in Vercel's project
 * env vars (same mechanism already used for FIREBASE_* / REVALIDATE_SECRET —
 * see infra/env/.env.example). No code change needed; layout.tsx and
 * generateMetadata already read these at build/request time.
 *
 * Single Next.js app serving all 13 properties (doc 00's architecture) means
 * one shared root layout, so today this is one platform-wide measurement ID
 * rather than a distinct one per hero site. If/when each property gets its
 * own GA4 property, extend GA_MEASUREMENT_ID to a per-slug lookup here
 * (keyed off NETWORK_SITES' `slug`) rather than changing every call site.
 */

/** GA4 measurement ID, e.g. "G-XXXXXXXXXX" — unset until a real one is configured. */
export const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID || undefined;

/** Google Search Console HTML-tag verification content value. */
export const GOOGLE_SITE_VERIFICATION = process.env.GOOGLE_SITE_VERIFICATION || undefined;

/** Bing Webmaster Tools meta-tag verification content value. */
export const BING_SITE_VERIFICATION = process.env.BING_SITE_VERIFICATION || undefined;
