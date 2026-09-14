# Conventions observed

- **Per-property naming**: kebab-case slug everywhere in file/dir names
  (`underground-colosseum`), PascalCase + slug-derived prefix for components
  (`UndergroundColosseumHome`, `UCShared.tsx` using an acronym for brevity in
  that property's own subfolder).
- **`lib/<slug>.ts` vs `lib/<slug>-content.ts` split**: `<slug>.ts` holds small
  structured config (HERO_IMAGE, nav item lists, MONEY_PAGES, etc.); the much
  larger `<slug>-content.ts` holds the bulk long-form content. Keep this split
  when adding a new property rather than merging into one file.
- **Server/client boundary discipline**: plain data modules (`lib/*.ts`) are
  deliberately kept separate from `'use client'` components so data never gets
  re-exported out of a client module into a server component — this caused Fast
  Refresh to force full page reloads before the split (see comment atop
  `lib/underground-colosseum.ts`). Preserve this separation for new properties.
- **Images**: only `images.unsplash.com` is supported as an external image host
  (custom loader in `lib/unsplash-image-loader.ts` + `next.config.js`) — every
  hero/content image must be an Unsplash URL, and per the code comments each one
  was manually opened and visually verified as relevant before use. Don't assume
  a photo id is right without checking it renders the right subject.
- **Comments are load-bearing here**: several files (e.g. `app/[slug]/page.tsx`,
  `lib/underground-colosseum.ts`) carry multi-paragraph comments explaining a
  non-obvious constraint (Next.js route export restrictions, Fast Refresh
  behavior). Read these before refactoring the file they're attached to — they
  usually document a real gotcha, not filler.
- **No test suite exists yet** in `apps/web` despite `turbo run test` being wired
  up in `turbo.json` — don't assume tests exist for any given module; verify
  with a search rather than pattern-matching from `tests_for` style tooling
  (which isn't actually installed here — see [ai-tooling.md](ai-tooling.md)).
