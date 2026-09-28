# Italy Tours Network — Blueprint v3 (FINAL)

**Owner:** Isekai Digital · **Date:** 28 September 2026 · **Version:** 3.0 (final)
**Applies to:** all 13 sites in `apps/web` (Next.js 15, React 19, Tailwind, Firestore) · branch **Staging** only
**Supersedes:** v1 and v2. Move `ITALY-TOURS-NETWORK-REBUILD-BLUEPRINT.md` and `NETWORK-BLUEPRINT-V2-SHOWMEITALY-STYLE.md` to `docs/archive/`. **If anything conflicts, v3 wins.**
**Visual reference for the homepage:** `docs/homepage-layout-v3.png` (sections A–J).

---

## 0. The whole brief in 6 lines

1. **Structure, pages, sections, links = our original Street Food Rome site** (the pre-v2 site on `main`), copied exactly to all 13 sites.
2. **Look and feel = the office site showmeitaly.com**: colors, cream backgrounds, fonts, card style, buttons, animations (the v2 tokens already on Staging).
3. **Homepage = layout v3 (§4)** and **About = the original About page (§5)**, exactly the same on all 13 sites. Only the text, tours and images change per site.
4. **Every link from the original site comes back**, in the navbar, dropdowns, footer, cards, chips, tabs and About page, and every link goes to a real page.
5. **Professional, simple, fast, SEO/CTR-ready.** No red anywhere, no fake content, no broken images, no hidden content.
6. **3 steps only** (§11). Work only on **Staging**. Never touch `main`.

---

## 1. Non-negotiable rules

1. **One template per page type**, shared by all 13 sites (`HomeTemplate`, `AboutTemplate`, `ToursIndexTemplate`, `TourDetailTemplate`, `CategoryTemplate`, `AreaTemplate`, `GuidesTemplate`, `GuideArticleTemplate`, `FAQTemplate`, `ContactTemplate`, `LegalTemplate`, `SearchTemplate`, `NotFoundTemplate`). Delete `NetworkHomeTemplate` and any other per-site fork. Site differences come **only** from `sites/{slug}/config.ts` (zod-validated).
2. **Design tokens only.** No hardcoded colors. **No red**: keep the CI "no red" check, and extend the banned list with `#9B1B1B`, `#6d0000`, `#e11d48`, `#ef4444`, `red-`, `rose-`.
3. **Truthful content only.** No fake press names, ratings, reviews, awards, counters or discount prices. Badges and chips come only from real data. Claims like "written by one person" or "12-year resident" appear on a site **only if true for that site**.
4. **Never invent image URLs.** Every image must exist and load (0 broken images on every page).
5. **Never hide content.** Scroll animations are an enhancement only. Content must be visible even if JS fails.
6. **Every card, chip, tab item, dropdown item and footer link goes to a real page.** 0 broken links, 0 `#` links.

---

## 2. Design system (keep what's on Staging, fix what's broken)

**Keep (from v2, already built):** cream `#FAF6EF` page background (the owner's favorite part), cream-deep `#EFE7D7` alternating sections, paper `#FFFDF8` cards, brand green `#0F7A4D` / `#0A5C3A`, ink `#132A1E` dark sections, gold `#E8A93D` accents, gold-deep `#8A5A0B` eyebrows on light backgrounds. Montserrat for headings, system Helvetica/Arial stack for body. Card radius 22px, soft shadows, card-lift and image-zoom hovers, Ken Burns on the home hero only.

**Replace every red from the original site** (old accent `#FF0022`) with:
| Original red element | New |
|---|---|
| Buttons ("Read Our Story", "Compare tours", "See Our Top…") | brand green pill, white text |
| Red headings and links (About page "1. Go With People…", "Who Writes…", "Learn More →", "Discover →") | brand green (headings), gold-deep (small labels/links) |
| Red number badges (How We Choose 1–4) | brand green circle, white number |
| Red logo circle | brand green circle |
| Pink radial glow behind About "Mantra" | very soft cream-deep glow (no pink) |

**Typography rules:** H1 900, H2 800, H3 700 (Montserrat). Body 16px/1.6. Eyebrows 11–12px uppercase, 0.28em tracking. Only one accent word per heading (green on light, gold on dark).

**Animations:** reveal-on-scroll (fade + 28px up), line-reveal on the hero H1, card-lift, image-zoom, nav underline on hover, Ken Burns on the home hero. All respect `prefers-reduced-motion`.

---

## 3. Global chrome (same on all 13 sites)

### 3.1 Navbar (original items, new design)
Sticky, cream background (`#FAF6EF`, turns to glass `cream 85% + blur` after scroll), height 72px desktop, bottom border `ink/10`. **Never transparent over the hero**, which removes all the current overlay glitches.

Left → right:
1. **Logo:** brand-green circle mark + site name (e.g. "street food rome"), links to the site home.
2. **Links (exact original order):** Home · About Us · Contact Us · FAQ · Privacy Policy · Terms of Service · **Tours & Blog ▾** · **Our Network ▾**
3. **Right side:** search icon (opens the network search, §8) + green pill **"See Tours"** → `/{slug}/tours`. (The original user/bag icons are removed: there is no login or cart.)

**Dropdowns** (click or hover with 150ms delay; close on Esc/outside click; keyboard accessible; a smooth fade + 8px slide down; the ▾ arrow rotates 180° when open):
- **Tours & Blog ▾:** a 3-column panel. Column 1 "Tours by category" (every category → `/tours/category/{slug}`), column 2 "Top tours" (6–8 tour links → `/tours/{slug}`) + "All tours →", column 3 "Guides" (blog categories → `/blog/category/{slug}`) + "All guides →". Content comes from config for each site.
- **Our Network ▾:** a 2-column panel listing **all 13 sites** (name + one-line niche), current site marked "You are here". **No inner scroll box**: the panel is tall enough to show all 13 at once.

**Mobile (<1024px):** logo + search icon + menu button → full-screen drawer with the same links. Tours & Blog and Our Network become accordions (▾ expands, all items visible). A "See Tours" button sits at the bottom.

### 3.2 Footer (new design + all original columns and links)
Background cream-deep, text `ink/70`, headings `ink`.
- **Top row:** logo + short blurb (config) + green "Compare tours" button; social icons on the right (only real profiles).
- **4 columns (original):**
  - **Company:** Home, About, Contact, Blog, {Site} Tours, Top Attractions
  - **Our Network:** all 13 sites, full list, **no scroll box**
  - **Privacy & Terms:** Privacy Policy, Terms of Service, Cookie Policy, Affiliate Disclosure, FAQ
  - **Contact Us:** email, "Based in Italy", "We usually reply within 24 hours", "Bookings via trusted partners" pill
- **Bottom row:** © 2026 {Site} · affiliate disclosure sentence.

---

## 4. Homepage (identical on all 13 sites) — see `docs/homepage-layout-v3.png`

Each section has a fixed `id` in this order:

| # | Section | `id` | Spec |
|---|---|---|---|
| A | Navbar | — | §3.1 |
| B | **Hero** | `hero` | Dark hero (photo + dark green overlay, **image and overlay are the same box**: `absolute inset-0`, no gaps, no horizontal overflow). **All content centered horizontally and vertically.** Eyebrow "{CITY}, ITALY" (gold) → H1 with one gold word (line-reveal, **spaces between words preserved**) → one-line subline (config, specific) → **big white search bar** (rounded-full, 760px wide desktop, placeholder from config, e.g. "Trastevere, Testaccio, Suppli, Pizza al Taglio…") → **chips row** below with ‹ › arrows (original chips; each chip links to its most specific real page). Remove the dashed line and the stray arrow shape. |
| C | Trust strip | `partners` | White section with one row of names. **Only real names** of the booking platforms we link to (e.g. Viator, GetYourGuide, Tripadvisor) as styled text, labeled "Book with trusted platforms". Never invented publications. Hide the section if a site has none. |
| D | **Top Tours slider** | `popular` | Eyebrow "OUR BEST SELLING TOURS AT A GLANCE", H2 "Top {Niche} in {City}". **Horizontal slider** like the original: 4 cards visible desktop, 2 tablet, 1.15 mobile, ‹ › buttons, scroll-snap, loops. 9 tour cards (new card design). All cards visible (see §9 bug 1). |
| E | **How We Choose** | `how-we-choose` | Keep exactly as now: dark ink section, 4 gold icons (Authentic, Local-Led, Neighborhood-Based, Intimate Groups) with one line each. Text from config. |
| F | Guides & Stories | `guides` | 3 guide cards (real dates, no raw HTML in excerpts) + "All guides →". |
| G | **Top Items to Try** | `categories` | Original section, 5 rows. Each row = **1 big category card** (tall image, name, "N experiences", white pill CTA) + **3 tour cards**. Big card → `/tours/category/{slug}` (a big category page listing all its tours). Small cards → `/tours/{slug}` (tour detail with booking). Heading: eyebrow "THINGS YOU MUST TASTE IN {CITY}", H2 "Top {Items} to Try in {City}". |
| H | **Places You Can Plan Your Next Trip** | `places` | Original section: 3 pill tabs (Top Attractions / Top Destinations / Top Tours), a 4-column numbered list of up to 20 items per tab. **Every item is a link** (area, landmark guide, network site, or tour). |
| I | **Explore Our Italy Collection** | `network` | Replaces the old "Part of the Italy Tours Network / 13 cities" strip. **Pure white background, no colored band or gap above it.** Eyebrow "13 WEBSITES · ONE TRUSTED TEAM", H2 "Explore Our Italy Collection", a 4-column grid of 13 site cards (small image, name, niche, "Visit →"), current site marked. |
| J | Footer | — | §3.2 |

**Removed from the current Staging homepage:** Top Neighborhoods tiles, "Browse by Type", "Ready to Explore?", the dark "Experience Rome Like a Local" CTA, and the old network strip.

---

## 5. About page (identical structure on all 13 sites)

Exact copy of the original Street Food Rome About page, in the new design, with content per site:

1. **Hero:** full-width photo with a dark overlay (not full-screen, ~420px), breadcrumb "Home / About Us", H1 (e.g. "Rome Street Food, Walked and Written by One Person"), subline, green "Read Our Story" button (scrolls to #4).
2. **Our Travel "Mantra":** centered H2 + 3 points in alternating rows (image left/text right, then text left/image right). Point titles in brand green, soft cream glow behind.
3. **"What Could Your Next {City} {Niche} Day {Taste/Look} Like?":** cream-deep band, centered H2 + one line + green button "See Our Top {City} {Niche} Tours" → `/tours`, followed by a **full-width image** (site-relevant; no generic salad bowl).
4. **"Who Writes {Site}?":** small eyebrow line, H2 in green, 4 short paragraphs (bold key phrases), image on the right.
5. **How It Started:** eyebrow "OUR JOURNEY", H2, subline, 4 cards (image, title, 2-line text, "Learn More →" to a real page).
6. **How We Choose Our Tours:** eyebrow "OUR PHILOSOPHY", H2, subline, 4 cards with green number badges 1–4 and "Discover →" links.
7. **Places You Can Plan Your Next Trip** (same component as home §4-H).
8. Footer.

All text, images and links come from `sites/{slug}/config.ts → about`.

---

## 6. All other pages (original structure, new design, all 13 sites)

Rebuild every route the original site had, for every site, through the shared templates:
- `/tours` (all tours + category/area filters + sort), `/tours/[slug]` (tour detail: breadcrumbs, gallery, facts grid Duration/Type/Group size/Languages, sticky booking card with "Check availability" → `/go/{slug}` with `rel="sponsored nofollow"`, highlights, itinerary, included/not included, meeting point, first-hand notes, FAQ, "You might also like", mobile book bar), `/tours/category/[slug]` (big category page: header, all tours in that category, what to expect, FAQ).
- `/neighborhoods` + `/neighborhoods/[slug]` (areas; the label can differ per site via config, e.g. "Villas" for Tivoli).
- `/blog` + `/blog/[slug]` + `/blog/category/[slug]` (guides).
- `/about` (§5), `/contact` (contact cards + form or email + FAQs), `/faq` (grouped accordions), `/privacy`, `/terms`, `/cookie-policy`, `/affiliate-disclosure`, `/search`, 404.
- Every site's money/support pages from its old content files (e.g. Tivoli's "Train vs Tour", "Which villa to prioritise") are moved under that site's prefix with **301 redirects** from old URLs.

**Inner pages do NOT use the full-screen home hero.** They use a compact page header (breadcrumb + H1 + one line, optional image band ~320px). No "See Tours" button on the tours page itself.

---

## 7. Per-site configuration

`sites/{slug}/config.ts` (13 files, zod-validated) holds: name, city, niche, logo text, hero (eyebrow, H1 + accent word, subline, image, search placeholder, chips with links), trust strip names, popular tours, how-we-choose points, guides, 5 category rows, places tabs, network blurb, about content (all 7 sections), tours-and-blog dropdown content, footer blurb and links, contact info, SEO fields, image manifest. **The build fails if a required field is empty.** No "Lorem", "TBD", "Coming soon" or placeholder images.

Street Food Rome's config = the original site's content. The other 12 configs are written from their `lib/{site}-content.ts` facts, rewritten to fit these sections.

---

## 8. Network search

Header search icon + hero search bar open the same search. It uses a static MiniSearch index across all 13 sites (tours, categories, areas, guides, pages, homepage sections), is typo-tolerant and shows results as "Site › Page › Section" with the current site first. Clicking opens the page and scrolls to the card/section (by `id`), highlighting it briefly. The index is lazy-loaded when search opens.

---

## 9. Known bugs on Staging (all must be fixed in Step 1)

1. 12 of 22 `[data-reveal]` elements stay invisible (tour cards in the slider, "Prati" tile). Reveal whole rows, not cards inside horizontal scrollers, and add a no-JS/timeout fallback so nothing stays hidden.
2. Fake Unsplash IDs (`photo-1500000000…`) → broken images. Use only real, verified images.
3. Empty "Browse by Type" section (now removed per §4).
4. Raw `<p>` in guide excerpts. Strip HTML.
5. Hero: dashed line, stray arrow, missing word spaces ("CulinaryExperiences").
6. The hero image and overlay are different sizes → pink strip, broken header background, **horizontal scrollbar**. Must be `scrollWidth === clientWidth` at 375/768/1280/1440/1920.
7. Header text unreadable over the hero; gold nav underline always visible; white strip above the header (all solved by the solid cream navbar in §3.1, underline only on hover).
8. Help tab cut off at the right edge. Hide it unless it has a real link.
9. Journal dates show today's date. Use real publish dates.
10. "13 cities" copy → "13 websites".
11. Footer network list in a scroll box (removed per §3.2).

---

## 10. SEO, CTR and speed (must-haves)

- **Rendering:** static/ISR (already done), Firestore reads cached, fail-safe (throw, never cache empty pages).
- **Per page:** unique `<title>` (keyword first, ≤60 chars, e.g. "Rome Food Tours (2026): 19 Tested & Compared | Street Food Rome"), unique meta description (140–155 chars: benefit + proof + soft CTA), canonical, one H1, logical H2/H3, OG/Twitter image.
- **JSON-LD:** Organization, WebSite + SearchAction, BreadcrumbList on every page; TouristTrip + Offer on tour pages; FAQPage on FAQ blocks; Article on guides; ItemList on tours/category pages. AggregateRating only with real ratings.
- **Sitemaps** per site + index, robots.txt, 301s for moved URLs, 0 broken links.
- **Internal links:** every tour links to its category, area, 2+ guides and 4 related tours; every guide links to 3+ tours.
- **CTR on page:** one clear green CTA per screen, sticky booking card + mobile book bar on tour pages, "from €X" prices, true trust signals next to CTAs, `affiliate_click` GA4 event.
- **Speed targets (mobile):** Lighthouse ≥ 95 on all four categories, LCP ≤ 2.0s, CLS ≤ 0.05. `next/image` with correct `sizes`, only the hero has `priority`, lazy-load the rest, only Montserrat as a web font, no heavy libraries (lucide icons imported individually).
- **Images:** real, licensed, subject-accurate, no reuse across sites, alt text on all. If an approved image doesn't exist yet, use a tasteful solid brand-color block with the section's icon, **never a broken image**.

---

## 11. The 3 steps

Work only on **Staging**. Normal commits and pushes only (no force-push, no rebase, never `main`). Before every push, run exactly what Vercel runs:
`pnpm install --frozen-lockfile && pnpm turbo run build --filter=@italy-tours/web` — push only if it fully passes.

| Step | Scope | Done when |
|---|---|---|
| **1 · Chrome + Home + About + bug fixes** | Fix every bug in §9. Build the navbar with both dropdowns (§3.1), the footer (§3.2), the homepage (§4) and the About page (§5) as shared templates, filled for Street Food Rome. Delete removed sections and `NetworkHomeTemplate`. | Staging home + about look like `docs/homepage-layout-v3.png` and §5 at 375/1440px, with 0 hidden content, 0 broken images, 0 console errors and no horizontal scroll |
| **2 · All pages + all 13 sites** | All §6 pages as shared templates, network search (§8), the 13 site configs (§7), all links restored, SEO/CTR (§10), redirects, image manifests. Every site renders only through the templates. | Every route of every site works; link crawl shows 0 broken links; build passes |
| **3 · Test, fix, deliver** | Run §12, fix every failure, re-test, push to Staging, send the report. | Report 100% PASS; the owner approves Staging. **Only then**, and only when the owner says so, merge Staging → main |

After each step, send **max 10 lines + screenshots** (home desktop + mobile, and one inner page), then continue to the next step without waiting, except at the end of Step 3.

**Save usage:** read each file once; use targeted search instead of reading big files; don't re-read files you just edited; no long reports or new .md files; generate the 12 configs from one pattern; run the full build once per step, not after every edit; compact the conversation when it gets long and continue from this blueprint + the last commit.

---

## 12. Final test list (Step 3)

1. Build passes exactly like Vercel; the Vercel Staging deployment is green.
2. No-red check = 0; no hardcoded colors.
3. On every site's home, about, tours, a tour page, a category page, contact and FAQ at 375, 768, 1440 and 1920px: 0 invisible content, 0 broken images, 0 console errors, 0 raw HTML, no horizontal scroll.
4. Navbar: both dropdowns open/close with mouse, keyboard and touch; all items link correctly; the mobile drawer works.
5. Homepage section order A–J is identical on all 13 sites (automated check by section `id`).
6. About structure (§5) identical on all 13 sites.
7. Link crawl over all 13 sites: 0 broken links, 0 `#` links.
8. Search finds items from other sites and deep-links to the right card/section.
9. Tour pages: sticky booking card, mobile book bar, affiliate links with `rel="sponsored nofollow"`.
10. Lighthouse mobile ≥ 95 ×4 on home, a tour page and contact of 4 different sites.
11. JSON-LD valid (Rich Results Test); titles and descriptions unique.
12. Honesty check: no fake names, ratings, reviews, awards, dates or claims.

---

## 13. Defaults (used unless the owner says otherwise)

| Question | Default |
|---|---|
| Guides section on home | Kept (section F) |
| Trust strip names | Only real booking-platform names as text; hidden if none |
| Navbar right side | Search icon + "See Tours" (no user/bag icons) |
| Network section title | "Explore Our Italy Collection" |
| Contact form | Real email provider if configured; otherwise show the email address |
| Images not yet approved | Solid brand-color block with icon (never broken or fake) |
