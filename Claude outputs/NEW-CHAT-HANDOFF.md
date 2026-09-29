# Handoff — paste this into a new Claude chat

Reply to me in short Roman Urdu. Anything meant for the developer, the company Pulse tool or GitHub must be in English.

## Who I am
Muheb, Isekai Digital. Project: "Hero Websites – Confidential" (Italy Tours Network).

## Project
- 13 tour sites in one Next.js monorepo (`apps/web`): Next.js 15.4 App Router, React 19, Tailwind with CSS-variable tokens, pnpm + Turborepo, Firestore, Vercel project `street-food-rome-web`.
- GitHub repo: `MuhammadMuheb/Hero-Websites-Confidential` (my account MuhammadMuheb, git email muhammadmuhebriaz@gmail.com).
- Local folder: `C:\Users\Lenovo\Downloads\Hero-Websites-Confidential-Staging`
- Master design is Street Food Rome (the root site "/"). The other 12 sites live at `/<slug>`.
- The repo root has `MASTER-CLONE-BLUEPRINT.md`, which explains the whole architecture. Read it first.

## What is DONE (week 22–28 Sep 2026)
- All 12 sites now use the master design, each with its own text, images and tours:
  - homepage
  - About page
  - all inner pages: tours, guides, FAQ, contact, legal, content pages
- Key files:
  - `src/lib/sites/home.ts`: `getHomeContent`, `getSiteAssets`, `getSiteExtras`
  - `src/lib/sites/about.ts`: `getAboutContent`
  - `src/components/master/MasterPages.tsx`
  - `src/app/[slug]/page.tsx`
  - `src/app/[slug]/about/page.tsx`
  - `src/app/[slug]/[...rest]/page.tsx`
  - Per-site data: `src/lib/<slug>.ts` and `src/lib/<slug>-content.ts`
- Other fixes:
  - Header site name now shows in proper case.
  - Fixed the `/street-food-rome` 404 (redirects to `/`).
  - Favicon red changed to `#0F7A4D`, so the CI red-palette-check passes.
  - Removed the nested git submodule that caused the Vercel warning.
  - `.gitignore` now blocks env files.
- tsc and eslint: 0 errors.
- Merged to main and live on production. Staging and main are in sync.
- Pulse update posted. Progress is set to 80%.

## Still PENDING
1. SECURITY: an env file with Firebase secrets was committed to git earlier.
   - Make sure it is removed from git: `git rm --cached "C*infraenv.env"`, then commit and push.
   - Rotate the Firebase service-account key: create a new key, put it in Vercel and the local env, then delete the old key.
   - Tell the senior about it.
2. Full QA of all 13 live sites on desktop and mobile.
3. The Amalfi and Tivoli content files have almost no page text. They need real long-form content.
4. The Colosseum, Pompeii and Vespa neighborhood pages are still the old bespoke pages. They need to be moved to the master design.
5. Check the Amalfi and Tivoli images. Some may be wrong.

## Rules (always follow)
- Never paste Firebase keys or PRIVATE_KEY in chat. Never push `.env` to GitHub.
- No force-push, and no reset of Staging.
- Workflow: work and test on Staging, get the senior's OK, then go live on main.
- No fake press names, reviews, ratings or awards.
- Don't copy any other company's website: no photos, text, reviews, team or phone.
- Status updates must only describe the work we did.
