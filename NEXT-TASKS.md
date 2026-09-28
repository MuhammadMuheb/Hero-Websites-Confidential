# NEXT TASKS — Street Food Rome homepage (Staging) · v2 (final order)

Context: Next.js 15 monorepo, app in `apps/web`, branch **Staging** only (never `main`, no force-push).
Design reference (colors, fonts, cards, feel): https://www.showmeitaly.com
Layout reference: the ORIGINAL Street Food Rome homepage (structure below).
Before every push: `pnpm install --frozen-lockfile && pnpm turbo run build --filter=@italy-tours/web`.
Verify on the LIVE Staging URL: https://street-food-rome-web-git-staging-isekai-digital.vercel.app

**Rule: the homepage LAYOUT = the original site. The LOOK = showmeitaly.com.**
One session at a time. Read only the files you need. Short replies. Commit + push at the end.

---

## Session A — Homepage structure (exact order)

1. **Navbar**: the original items (Home, About Us, Contact Us, FAQ, Privacy Policy, Terms of Service, Tours & Blog ▾, Our Network ▾), styled like showmeitaly's navbar (cream background, Montserrat 600 links, gold underline on hover, clean spacing). Site name as text only: no red logo circle, no user/bag icons, no search icon.
2. **Hero** (original layout): photo with the new dark-green overlay, eyebrow "ROME, ITALY" (letter-spaced), big bold H1 left-aligned inside the centered container, no subline. The big white **search bar sits on the bottom edge of the hero**, centered, half over the photo and half below.
3. **Chips row**: ONE row directly under the search bar, with ‹ › arrows. No chips inside the hero, no duplicate row.
4. **Names strip** (2 rows of styled names), directly under the chips. Real names only (booking platforms we link to), labeled "Book with trusted platforms".
5. **Top Food Tours in Rome** slider (original style): 4 full cards visible on desktop, ‹ › arrows.
6. **Top Food Items to Try in Rome**: 5 rows. Each row = 1 BIG category card + 3 small tour cards. The big card must clearly look BIGGER: grid `lg:grid-cols-[1.5fr_1fr_1fr_1fr]`, the big card is taller than the small cards (stretches to the row height) with a larger title (28–32px), and the small cards are compact.
7. **How We Choose**: the dark ink section with 4 gold icons (Authentic, Local-Led, Neighborhood-Based, Intimate Groups). Directly under the 5 rows.
8. **Places You Can Plan Your Next Trip** (3 tabs).
9. **Our Network**: all 13 sites.
10. **Footer**: REMOVE the top brand block (logo, blurb, "Compare tours" button, social icons row). Show only the 4 link columns (Company, Our Network, Privacy & Terms, Contact Us) and the bottom © / disclosure row.

**Delete** the "Why Book Rome Food Tours With Us?" section.

## Session B — Look & feel (match showmeitaly.com)
1. Tokens everywhere: page bg cream `#FAF6EF`, alternate sections cream-deep `#EFE7D7`, dark sections ink `#132A1E`, buttons brand `#0F7A4D`, accents gold `#E8A93D`, eyebrows gold-deep `#8A5A0B`, footer cream-deep. No red, no plain grey sections.
2. Typography: Montserrat 800–900 headings with tight line-height, clean body text; H2s with one accent word.
3. Premium cards: paper `#FFFDF8`, border `ink/5`, soft shadow, radius 22px, 4:3 image with zoom on hover, lift on hover, bold title, "FROM" label + big price.
4. Speed: first slider images eager/priority, blur placeholders, correct `sizes`. No reveal animation on slider cards or above the fold. Nothing loads late or stays hidden.

## Session C — About page + continue
1. Build the About page per `NETWORK-BLUEPRINT-V3-FINAL.md` §5 (same look).
2. Then continue with blueprint Step 2, one area per session.

## Done check (every session)
Live Staging at 1440px and 375px: order correct, 0 broken images, 0 hidden content, no horizontal scroll, no console errors. Send 2 screenshots, max 5 lines.
