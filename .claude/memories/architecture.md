# Architecture — apps/web

## Network-of-sites model
One Next.js app serves ~13 branded "network properties" (tour affiliate sites)
off different domains, distinguished by root-path slug. Central registry:
[`lib/tours.ts`](../../apps/web/src/lib/tours.ts) → `NETWORK_SITES` (13 entries,
numbered 02–14, `slug` field is canonical id) and `ACTIVE_NETWORK_SLUG` (currently
`'street-food-rome'`, #05 — the one property using the shared/generic template
instead of a bespoke homepage).

## Routing
- `app/[slug]/page.tsx` — root page per property. Explicitly imports and
  branches (`site.slug === '...'`) to one of 8 bespoke Home components for the
  8 built heroes; anything else not matching `ACTIVE_NETWORK_SLUG` renders
  `UnderConstructionNotice`.
- `app/[slug]/[...rest]/page.tsx` — same branching pattern, needed because
  Next.js route files can only export specific recognized names, so the bespoke
  vs. placeholder logic is duplicated here rather than shared via a constant
  (see the long comment at the top of `app/[slug]/page.tsx` for the full
  rationale — read it before refactoring this routing pair).
- Other top-level routes (`app/tours`, `app/blog`, `app/about`, etc.) are the
  shared template pages, parameterized by whichever site is active.

## Built ("bespoke hero") properties — 8 of 13
Each has: `lib/<slug>.ts` (site config, HERO_IMAGE, etc.), `lib/<slug>-content.ts`
(large 16–48 KB content data file), `components/<slug>/` (bespoke components),
and a `components/<Slug>Home.tsx` entry component wired into both `[slug]/page.tsx`
files:
- `underground-colosseum` (02) — first bespoke build, has its own design blueprint PDF at root
- `private-vatican` (07)
- `pompeii-day-trip` (03)
- `rome-vespa` (04)
- `golf-cart-rome` (08)
- `cooking-in-rome` (09)
- `rome-pizza-class` (10)
- `tiramisu-class` (11)
- `street-food-rome` (05) is the **active/default** site but uses the generic
  `HomePageBody` template, not a bespoke `<Slug>Home` component — it was the
  reference build the shared platform modules were proven against.

## Not yet built (still "under construction" placeholder) — 4 of 13
`tuscany-day-trip` (06), `naples-street-food` (12), `amalfi-day-trip` (13),
`tivoli-day-trip` (14). **Note:** root `STATUS.md` and the latest commit message
("Build out 7 remaining network properties") imply all 13 are done — actual code
shows only 7 *new* bespoke heroes were added (bringing the total bespoke count to
8 incl. Underground Colosseum), not all 13. Verify against `NETWORK_SITES` /
`lib/*-content.ts` presence before trusting STATUS.md's numbers.

## Backend / data
- `lib/firestore.ts` — Firestore client, `getAllTours`, `getAllBlogPosts`,
  `getPageDoc`, `SITE_DOMAIN`
- `lib/analytics.ts`, `lib/blog.ts`, `lib/unsplash-image-loader.ts` — supporting
  shared modules
- Env vars: `FIREBASE_PROJECT_ID`, `FIREBASE_CLIENT_EMAIL`, `FIREBASE_PRIVATE_KEY`,
  `REVALIDATE_SECRET`, `VERCEL_URL` (see `turbo.json` globalEnv)

## Where to add new code
- New network property build → add `lib/<slug>.ts` + `lib/<slug>-content.ts` +
  `components/<slug>/` + `<Slug>Home.tsx`, then wire into **both**
  `app/[slug]/page.tsx` and `app/[slug]/[...rest]/page.tsx`
- Shared UI used across properties → `components/` root (not a per-site subfolder)
- Cross-network nav → `components/NetworkLink.tsx`, `components/Footer.tsx`
