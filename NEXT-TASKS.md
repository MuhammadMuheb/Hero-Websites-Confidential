# NEXT TASKS — Street Food Rome homepage (Staging)

Context: Next.js 15 monorepo, app in `apps/web`, branch **Staging** only (never `main`, no force-push).
Full spec: `NETWORK-BLUEPRINT-V3-FINAL.md` (repo root). Layout image: `docs/homepage-layout-v3.png`.
Design reference: https://www.showmeitaly.com (colors, cards, spacing).
Before every push: `pnpm install --frozen-lockfile && pnpm turbo run build --filter=@italy-tours/web`.
Verify every item on the LIVE Staging URL: https://street-food-rome-web-git-staging-isekai-digital.vercel.app

Work rule: do ONE session at a time. Read only the files you need. No long reports. Commit + push at the end of each session.

---

## Session A — Hero, chips, navbar, section order
1. Navbar: keep items (Home, About Us, Contact Us, FAQ, Privacy Policy, Terms of Service, Tours & Blog ▾, Our Network ▾). **Remove the search icon.**
2. Hero = the ORIGINAL site's hero layout: eyebrow "ROME, ITALY" (letter-spaced), big bold H1 left-aligned inside the centered container, **no subline**. The big white search bar sits on the **bottom edge** of the hero, centered, half over the photo and half below. New colors: dark green overlay, cream text, gold accent word. Better, sharper Rome street-food photo. H1: Montserrat 800–900, line-height ~1.05. **Remove chips from inside the hero.**
3. Chips: **one** row only, directly below the hero, with ‹ › arrows. Delete the duplicate row.
4. **Delete** the "Why Book Rome Food Tours With Us?" section. Put the names strip in its place: same visual style (2 rows of styled names), **real names only** (booking platforms we link to: Viator, GetYourGuide, Tripadvisor…), label "Book with trusted platforms".
5. Final homepage order: navbar → hero (+ search bar) → chips → names strip → Top Food Tours slider → Top Food Items to Try (5 rows) → **How We Choose** (dark, 4 gold icons; restore it) → Places You Can Plan Your Next Trip (3 tabs) → Explore Our Italy Collection → footer.

## Session B — Colors, cards, speed
1. Apply the showmeitaly tokens everywhere: page bg cream `#FAF6EF`, alternate sections cream-deep `#EFE7D7`, dark sections ink `#132A1E`, buttons brand `#0F7A4D`, accents gold `#E8A93D`, eyebrows gold-deep `#8A5A0B`. **Footer bg cream-deep** with ink headings. No plain white/grey sections, no red.
2. Top Food Tours slider: exactly **4 full cards** on desktop (no cut-off card), 2 on tablet, 1.15 on mobile.
3. Premium cards (like showmeitaly): paper `#FFFDF8`, `border ink/5`, soft shadow, radius 22px, image 4:3 with zoom on hover, lift on hover, Montserrat bold title, "FROM" label + big price.
4. Speed: first 4 slider images `priority`/eager with correct `sizes` and blur placeholder. **No reveal animation on slider cards or above-the-fold content.** Nothing may appear late or stay hidden.

## Session C — Network section, About page, then continue
1. Replace the plain "Our Network" list with **Explore Our Italy Collection**: pure white bg, eyebrow "13 WEBSITES · ONE TRUSTED TEAM", 4-column grid of 13 site cards (image, name, niche, "Visit →"), current site marked.
2. Build the About page exactly per blueprint §5.
3. Then continue with blueprint Step 2 (§6–§10), one area per session.

## Done check (every session)
Live Staging at 1440px and 375px: order correct, 0 broken images, 0 hidden content, no horizontal scroll, no console errors. Send 2 screenshots (desktop + mobile), max 5 lines of text.
