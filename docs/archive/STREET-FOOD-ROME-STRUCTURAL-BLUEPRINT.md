# Street Food Rome — Master Structural & Design Blueprint

**Reference build:** Street Food Rome (`streetfoodrome.com`, `ACTIVE_NETWORK_SLUG` in `apps/web/src/lib/tours.ts`)
**Source analyzed:** `apps/web/src/app/**`, `apps/web/src/components/**`, `apps/web/src/lib/tours.ts`, `apps/web/src/app/globals.css`, `apps/web/tailwind.config.ts`
**Status of source:** shipped, live reference implementation — every spec below is transcribed from the actual code, not inferred from screenshots.
**Purpose:** the exact, component-by-component standard every other network property (Underground Colosseum, Tuscany Day Trip, and the 11 remaining builds) must structurally and visually match, so the network reads as one professional system.

---

## 0. Scope & exclusions

**In scope:** every route Street Food Rome renders, every section inside each route, and every shared component those sections are built from — layout, color, type, spacing, states, and behavior, transcribed exactly as implemented.

**Explicitly excluded from this blueprint:** the "Our Network" section/list — the cross-links to sibling network properties (Underground Colosseum, Pompeii Day Trip, Rome Vespa, etc.), driven by the `NETWORK_SITES` registry in `lib/tours.ts`. Per instruction, this content and its list of sibling sites is deliberately left out of what follows. For transparency, it currently appears in **four** places in the reference build, each noted inline below with an `[EXCLUDED — Our Network]` marker so a future audit can find and handle them consistently, without their content being reproduced here:

1. `Footer.tsx` — a dedicated "Our Network" column in the four-column footer grid.
2. `AllDestinationsSection.tsx` — a dedicated full-width section titled "Our Network," placed at the bottom of both the Home and About pages.
3. `ViewToursMenu.tsx` — the header's "View Tours" mega-menu's third column, headed "Our Network."
4. `app/blog/category/[slug]/page.tsx` — a small "Our Network" link list in the two-column cross-link block at the bottom of each blog category page.

*(Not marked, but structurally related: `ExploreLinksSection.tsx`'s "Top Destinations" tab also renders the same sibling-site list under a different label, without the words "Our Network." Flagging this so the same exclusion can be applied there if intended — it isn't stripped out below since it isn't literally named "Our Network," but it draws from the same registry.)*

Every other section, page, and component below is documented in full and is fair game to replicate.

---

## 1. Shared design system

This is the literal token set every page and component consumes — from `globals.css` (`:root`) and `tailwind.config.ts`. Nothing here is approximated.

### 1.1 Color tokens

CSS custom properties are stored as RGB triples (not hex) so Tailwind can apply opacity via `rgb(var(--x) / <alpha>)`. Hex equivalents given for direct use in design tools.

| Token | RGB | Hex | Role |
|---|---|---|---|
| `--paper` | `255 255 255` | `#FFFFFF` | Page background |
| `--paper-tint` | `249 250 250` | `#F9FAFA` | Alternating section background (used sparingly, never as dominant color) |
| `--ink` | `17 18 20` | `#111214` | Primary headline/body text color, footer background |
| `--ink-soft` | `30 30 32` | `#1E1E20` | Card titles, secondary headings |
| `--ink-muted` | `92 97 102` | `#5C6166` | Body copy, descriptions |
| `--faint` | `110 115 120` | `#6E7378` | Meta text, placeholder icons, secondary labels |
| `--accent` | `255 0 34` | `#FF0022` | Primary CTA, links, active states, focus ring |
| `--accent-hover` | `224 0 29` | `#E0001D` | Hover/active state of accent (accent gradient's second stop) |
| `--accent-soft` | `255 236 238` | `#FFECEE` | Icon chip backgrounds, active pill fills, subtle highlight washes |
| `--gold` | `184 134 46` | `#B8862E` | Secondary accent only — badges/ratings (present in tokens, not used on any Street Food Rome page directly) |
| `--success` | `76 140 74` | `#4C8C4A` | Trust checkmarks (token defined; not directly rendered on SFR pages audited) |
| `--line` | `232 235 237` | `#E8EBED` | Default borders/dividers |
| `--line-strong` | `216 220 222` | `#D8DCDE` | Heavier borders |
| `--media` | `244 244 244` | `#F4F4F4` | Image placeholder/loading fill, neutral tag chip background |

**Rule:** only `--accent` / `--accent-hover` / `--accent-soft` ever change per property (via a scoped CSS class such as `.pv-scope`). Every other token — `--ink`, `--paper`, radius, shadow, spacing, typography — is identical across the network. Street Food Rome uses the unscoped `:root` default red (`#FF0022`) directly; it is the platform's baseline theme, not an override.

### 1.2 Typography

- **Font loading** (`app/layout.tsx`): three Google fonts loaded via `next/font/google`, each bound to a CSS variable and exposed as a Tailwind font family:
  - `Fraunces` → `--font-fraunces` → `font-display` — variable serif, axes `['opsz','SOFT','WONK']`, `display: swap`.
  - `Public Sans` → `--font-public-sans` → `font-sans` — the workhorse sans, `display: swap`.
  - `Playfair Display` → `--font-playfair` → `font-playfair` — used in exactly one place (MediaBar's outlet-name treatments), never for real UI text.
- **Global rule (`globals.css`):** `h1, h2, h3, .font-display` are forced to `font-family: var(--font-fraunces)`, with `font-feature-settings: 'ss01' 1`, `text-wrap: balance`, `letter-spacing: -0.01em`. This is a base-level override — any `<h1>`/`<h2>`/`<h3>` renders in Fraunces by default even without an explicit class.
- **Practical split observed across pages:** money/marketing sections (Hero, homepage section headings, About page section headings) explicitly set `font-sans` extrabold for H1/H2 — overriding the base-serif rule — for a punchier, energetic register. Editorial/inner pages (InnerHero title, FAQ question text, blog post H1, tour page H1, legal page headings) use the **default** `font-display` (Fraunces) serif register for a calmer, editorial tone. This H1 split (sans-extrabold on marketing sections vs. serif on content/inner pages) is a deliberate, consistent pattern to preserve when replicating.
- **Body copy:** Public Sans (inherited from `body`), 14–16px (`text-sm`/`text-base`), `leading-relaxed` (1.625) or explicit `1.5–1.75` line-height on rich content, always `text-ink-muted`.
- **Numerals:** `.tabular-nums` (`font-variant-numeric: tabular-nums`) applied to every price and position-number figure.
- **Rich content (`.rich-content`, for Firestore-authored HTML on legal/blog pages):** its own scoped typography — `h2` at `1.5rem`/`font-weight:800`, `h3` at `1.15rem`/`font-weight:800`, both Public Sans (not Fraunces); `p`/`li` at `1rem`/`line-height:1.75`/`text-ink-muted`; `ul` disc, `ol` decimal, `1.25em` left padding; `a` in accent color, underlined, `2px` underline offset; `strong` in `text-ink`, `font-weight:600`; vertical rhythm via `> * + * { margin-top: 1.25em }`.

### 1.3 Radius, shadow, spacing, motion

- **Radius scale (named, never ad hoc):** `rounded-control` 10px (buttons, inputs, small chips) · `rounded-panel` 20px · `rounded-card` 24px (cards, FAQ container, legal-content cards) · `rounded-media` 28px (all photography — hero images, tour cards, category cards, blog cover images).
- **Shadow scale (named, `tailwind.config.ts`):**
  - `card`: `0 1px 2px rgba(20,20,22,.04), 0 18px 40px -12px rgba(20,20,22,.10)`
  - `card-soft`: `0 1px 2px rgba(20,20,22,.04), 0 14px 32px -10px rgba(20,20,22,.08)`
  - `card-hover`: `0 8px 16px -4px rgba(20,20,22,.10), 0 28px 56px -16px rgba(20,20,22,.18)`
  - `dropdown`: `0 24px 48px -12px rgba(20,20,22,.22)`
  - `popover`: `0 20px 56px -8px rgba(20,20,22,.24)`
  - `bar-up`: `0 -8px 24px rgba(20,20,22,.08)`
  - `aside`: `0 4px 16px -4px rgba(20,20,22,.06), 0 20px 40px -12px rgba(20,20,22,.10)` — sticky booking aside on tour pages
  - `search`: `0 12px 24px -8px rgba(20,20,22,.12), 0 32px 64px -16px rgba(20,20,22,.20)` — the floating hero/header search bars
  - `tab`: `0 1px 3px rgba(20,20,22,.15)` — active pill/tab state
  - `glow`: `0 8px 24px -4px rgba(255,0,34,.35)` — accent-tinted glow under every primary CTA and the brand-mark badge
- **Backgrounds:** `bg-accent-gradient` = `linear-gradient(135deg, var(--accent) 0%, var(--accent-hover) 100%)` on every primary CTA and brand mark; `bg-ink-gradient` = `linear-gradient(180deg, transparent 0%, rgba(20,20,22,.92) 100%)` as the scrim on category-card and hero photography.
- **Container widths (observed, consistent across pages):** `1440px` (header/footer, homepage/about section outer wrap), `1200px` (most homepage/about section inner content), `1100px` (About "How We Choose," tour page content, tour-page hero band), `1000px` (blog index/category, neighborhoods index), `960px`/`896px` (Hero H1 column / search bar), `760px` (FAQ list, neighborhood article column), `720px` (legal page content — Privacy/Terms/Contact/Cookie/Affiliate).
- **Spacing rhythm:** section vertical padding `py-10` to `py-20` depending on section weight; header fixed at `72px` (`h-[72px]`); page gutter `px-6` mobile / `px-14` ≥ small.
- **Motion:** `200–300ms` with `ease-out` (`cubic-bezier(0.16, 1, 0.3, 1)`, exposed as Tailwind's `ease-out` timing function) on essentially every interactive element. Specific patterns:
  - `.lift-on-hover` (global utility class): `translateY(-4px)` + shadow transition on hover — used on TourCard and other card-like links.
  - Buttons: `hover:scale-[1.02]`, `active:scale-[0.98]`.
  - Card/category images: `group-hover:scale-105` on the `<Image>` inside an `overflow-hidden` wrapper.
  - Chevron icons in accordions/dropdowns: `rotate-180` on open state.
  - Header: hides on scroll-down past 80px, reveals on scroll-up, via a 300ms `translateY(-100%)` transition.
- **Focus system:** default browser outline removed sitewide and replaced — never just deleted — with a single consistent `:focus-visible` treatment: `outline: 2px solid rgb(var(--accent))`, `outline-offset: 2px`, `border-radius: 4px`. Applies uniformly to `a, button, input, textarea, select, summary, [tabindex]`.

---

## 2. Global chrome (present on every page except 404-placeholder routes)

### 2.1 `<Header>` (`components/Header.tsx`)

- **Structure:** `sticky top-0 z-40`, fixed `h-[72px]`, `bg-white/85 backdrop-blur-md` (glass), `border-b border-line/80`. Inner row is `max-w-[1440px]` centered, `px-6 sm:px-14`, `flex items-center justify-between`.
- **Left cluster:** brand mark (a `h-8 w-8` circular `bg-accent-gradient` badge containing a small custom fork/knife-style SVG glyph, with `shadow-glow`, scales to 105% on hover) + lowercase wordmark text (`street food rome`) + the `<ViewToursMenu>` trigger button immediately to its right.
- **Center:** a search form — `hidden` on the homepage (the Hero below already owns a search bar), visible only `lg:flex` on all inner pages. Rounded-control input pill with a search icon, placeholder `"Rome, Trastevere, Testaccio…"`, and an outlined "Search Tours" button that inverts to filled accent on hover.
- **Right cluster:** `<AccountMenu>` (person icon, opens a sign-in popover) and a bag/cart icon button (static, no menu wired).
- **Scroll behavior:** JS scroll listener — header stays visible until 80px scrolled; past that, hides on any 4px+ downward delta, reveals on any 4px+ upward delta. 300ms transform transition.
- **Brand/route awareness:** reads the current path's first segment against `NETWORK_SITES`; if it matches a sibling property's slug, the wordmark and all internal links rebrand to that property (handled generically — Street Food Rome itself is the unprefixed/default case, since it's `ACTIVE_NETWORK_SLUG`).

### 2.2 `<ViewToursMenu>` (`components/ViewToursMenu.tsx`)

A three-column mega-menu, opened by the header's pill-shaped "View Tours" button (`bg-accent-gradient`, `shadow-glow`, chevron rotates 180° open). Panel: `rounded-media border border-line bg-white shadow-popover`, full-width sheet on mobile (`fixed inset-x-4 top-[73px]`), floating `560px`-max panel anchored under the trigger on desktop. Closes on outside click.

- **Column 1 — "Pages":** Home, About Us, Contact Us, FAQ, Privacy Policy, Terms of Service.
- **Column 2 — "Tours & Blog":** All Tours, one link per `CATEGORIES` entry ("Pizza Tours," "Pasta Tours," "Beer & Wine Tours," "Gelato Tours," "Street Food Classics Tours"), Blog.
- **Column 3 — "Our Network"** — `[EXCLUDED — Our Network, see §0]`.

Each column is a small-caps `text-xs font-semibold uppercase tracking-[0.1em] text-faint` label over a `space-y-2.5` link list (`text-sm text-ink-muted`, hovers to accent).

### 2.3 `<AccountMenu>` (`components/AccountMenu.tsx`)

Icon-only trigger (person glyph). Popover panel (`rounded-media border shadow-popover`, `w-72` on desktop, full-width sheet on mobile): "Welcome to Street Food Rome" heading, subtext, then four stacked full-width buttons — "Continue With Google" (full-color Google "G" glyph), "Continue With Phone," "Sign In With Email" (all three secondary/outlined style), and "Create Account" (primary `bg-accent-gradient`). Footer microcopy: "Sign-in isn't connected yet — coming soon." This is a UI shell only — no auth is wired.

### 2.4 `<Footer>` (`components/Footer.tsx`)

`bg-ink text-white/70` (charcoal), `max-w-[1440px]` inner, `py-16`.

- **Top row:** brand mark + lowercase wordmark (left) and a one-line tagline paragraph ("A first-hand guide to unforgettable experiences…") beneath it; a row of three social icon buttons (Instagram/Facebook/Pinterest, all placeholder `href="#"`) on the right, `h-10 w-10` circular outline buttons that lift and tint accent on hover.
- **Four-column link grid** (`grid-cols-2 sm:grid-cols-4`), each column headed by a `text-xs font-bold uppercase tracking-[0.14em] text-white/40` label:
  1. **Company:** Home, About, Contact, Blog, Rome Food Tours, Top Attractions, All Destinations.
  2. **Our Network** — `[EXCLUDED — Our Network, see §0]`.
  3. **Privacy & Terms:** Privacy Policy, Terms of Service, Cookie Policy, Affiliate Disclosure, FAQ.
  4. **Contact Us:** mailto link (`hello@streetfoodrome.com`), "Based in Rome, Italy," "We usually reply within 24 hours," plus a small pill badge: "Bookings powered by GetYourGuide."
- **Bottom bar:** `border-t border-white/10`, copyright line (`© {year} Street Food Rome. All rights reserved.`) left, one-line affiliate-commission disclosure right — both `text-xs text-white/40`.

### 2.5 Cross-cutting routing/link behavior — `<NetworkLink>` (`components/NetworkLink.tsx`)

A drop-in replacement for `next/link` used **everywhere** in place of the framework default. When the current route sits under a sibling network property's prefix (e.g. `/rome-vespa/...`), any relative internal href gets that same prefix automatically (so "About" resolves to `/rome-vespa/about`, not `/about`) — except an href that already targets another network property's own root, which passes through untouched as a deliberate cross-property jump. On Street Food Rome itself (unprefixed root) this is a no-op passthrough. External links, `mailto:`, hashes, and non-string hrefs are untouched.

### 2.6 `<SafeImage>` (`components/SafeImage.tsx`)

Thin wrapper around `next/image`: on a failed image load, swaps to a plain `bg-media` div with the same `alt` as an `aria-label`, instead of a broken-image icon. Used for every photographic image on the site.

---

## 3. Shared content-page primitive — `<InnerHero>` (`components/InnerHero.tsx`)

The standard banner used to open **every** non-homepage, non-tour, non-blog-post page (About uses its own bespoke hero instead — see §5). Section is `bg-paper-tint`.

- **Optional image band:** if `imageUrl` is passed, a full-bleed `h-[220px] sm:h-[300px]` photo renders above the text block (used on blog category pages and neighborhood pages when a hero image exists; omitted → plain text banner, as on FAQ, Cookie Policy, Affiliate Disclosure, About-adjacent legal pages, Tours index, Neighborhoods index).
- **Text block:** `max-w-[1440px]` centered, `text-center`, `py-14 sm:py-16`. Optional breadcrumb (`Home / {Page Title}`, `text-sm text-faint`, hover-accent link). Optional eyebrow (`text-xs uppercase tracking-[0.14em] text-faint`). Title as `<h1>` in `font-display text-3xl sm:text-4xl font-semibold`. Optional subtitle paragraph (`max-w-2xl`, centered, `text-ink-muted`).

---

## 4. Home page (`/`) — `app/page.tsx` → `<HomePageBody>`

Assembled in this exact order (`components/HomePageBody.tsx`); the same body is reused verbatim for any network property's own home, only the JSON-LD name/URL and Header wordmark vary by brand.

**Structured data:** `WebSite`, `Organization`, and `ItemList` (first 19 tours) JSON-LD schema blocks emitted inline before the visible content.

1. **`<Hero>`** — full-bleed image band + search + category chip scroller. See §4.1.
2. **`<TrustPointsSection>`** — "Why Book Rome Food Tours With Us?" 4-up trust grid.
3. **`<MediaBar>`** — "as seen in"–style press-mention row.
4. **`<TourCarouselSection>`** — "Top Food Tours in Rome" horizontally-scrolling tour card rail.
5. **`<CategoryToursSection>`** — "Top Food Items to Try in Rome" — 5 stacked category rows, each a large category tile + 3 tour cards.
6. **`<ExploreLinksSection>`** — "Places You Can Plan Your Next Trip" — tabbed 4-column link index (Attractions / Destinations / Tours).
7. **`<AllDestinationsSection>`** — `[EXCLUDED — Our Network, see §0]`.

### 4.1 `<Hero>` (`components/Hero.tsx`)

- **Photo band:** `h-[400px] sm:h-[480px]`, full-bleed `object-cover` image, `bg-gradient-to-t from-black/75 via-black/25 to-black/10` scrim. Inner content `max-w-[960px]`, bottom-aligned (`justify-center` within a tall flex column, text sits low): small-caps eyebrow "Rome, Italy" (`text-white/70`), then H1 "Rome's Ultimate Street Food & Culinary Experiences" — `font-sans` (not Fraunces) `text-[40px] sm:text-[60px] font-extrabold leading-[1.1]/[1.05]`, white.
- **Search bar:** floats half over the photo / half over the section below via `-mt-8` negative margin — `max-w-[896px]`, `rounded-card border bg-white shadow-search`, search icon + text input (placeholder "Trastevere, Testaccio, Suppli, Pizza al Taglio…." ) + filled accent-gradient "Search Tours" button with glow.
- **Category chip scroller:** separate white-background strip below the photo (deliberately same white as the section above it so no seam shows against the gray TrustPoints section that follows). Horizontally scrollable pill row (`overflow-x-auto`, scrollbar hidden) of ~19 chips (neighbourhoods, dish types, specific tour anchors), each a `rounded-full border` pill that fills `accent-soft`/turns accent-colored text on hover. Flanked by two circular prev/next scroll-nudge buttons.

### 4.2 `<TrustPointsSection>` (`components/TrustPointsSection.tsx`)

`bg-paper-tint py-12`. Centered H2 ("Why Book Rome Food Tours With Us?"). Below it, a responsive 1/2/4-column grid (`max-w-[1312px]`) of 4 trust items, each: a `44px` circular `bg-accent-soft` icon chip (custom line-icon), bold `text-ink-soft` label, and a one-sentence `text-ink-muted` body line. Items: "Trusted Rome Food Guide," "Curated Rome Food Walks," "Flexible Booking," "Local, Direct Support."

### 4.3 `<MediaBar>` (`components/MediaBar.tsx`)

`bg-white py-16`. A responsive 2/3/5-column grid of 10 deliberately fictional, differently-typeset "as seen in" masthead-style names (each with its own font-family/weight/case/italic combination to read as distinct real publications) — grayscale, `text-faint`, tinting to `text-ink-muted` on hover. Explicitly documented in-code as placeholder names (no real press mentions exist yet) — **swap for genuine press mentions once available; never fabricate real outlet names.**

### 4.4 `<TourCarouselSection>` (`components/TourCarouselSection.tsx`)

`bg-paper-tint py-20`. Header row: small-caps eyebrow "Our best selling tours at a glance" + H2 "Top Food Tours in Rome" (left), two circular prev/next buttons (right). Below: a horizontally-scrolling, scroll-snap track of `<TourCard>`s — 1 visible on mobile, 2 on tablet, 4 on desktop (`auto-cols` fractional width calc), advancing exactly one card per click (measured, not viewport-width jump) with wraparound looping at either end.

### 4.5 `<CategoryToursSection>` (`components/CategoryToursSection.tsx`)

`bg-white py-20`. Centered eyebrow "Things you must taste in Rome" + H2 "Top Food Items to Try in Rome." Then 5 stacked rows (Pizza, Pasta, Beer & Wine, Gelato, "Suppli & Street Food Classics"), each row a `grid-cols-[1.1fr_1fr_1fr_1fr]` layout: one large `<CategoryCard>` (full-bleed photo, `rounded-media`, `ink-gradient` scrim, white category name + white "Explore X Tours" pill button overlaid bottom-left) followed by 3 standard `<TourCard>`s from that category.

### 4.6 `<ExploreLinksSection>` (`components/ExploreLinksSection.tsx`)

`bg-paper-tint py-14`. Centered H2 "Places You Can Plan Your Next Trip," under it a pill-group tab switcher (`bg-line/70` track, active tab `bg-white shadow-tab`) with three tabs: **Top Attractions**, **Top Destinations** *(sibling-network list — see §0 note)*, **Top Tours**. Selected tab's list renders as a 2/4-column grid of numbered links (`1. Label`) below, `max-w-[1100px]`.

### 4.7 `<AllDestinationsSection>` (`components/AllDestinationsSection.tsx`)

`[EXCLUDED — Our Network, see §0]`. (Reused verbatim, in the same position, at the bottom of the About page too.)

---

## 5. About page (`/about`) — `app/about/page.tsx`

Section order:

1. **`<AboutHero>`**
2. **`<OurTravelMantraSection>`**
3. **`<ExperiencesBannerSection>`**
4. **`<WhoWritesThisSection>`**
5. **`<HowItStartedSection>`**
6. **`<HowWeChooseSection>`**
7. **`<ExploreLinksSection>`** (same shared component as Home §4.6)
8. **`<AllDestinationsSection>`** — `[EXCLUDED — Our Network, see §0]`

### 5.1 `<AboutHero>` (`components/AboutHero.tsx`)

Bespoke hero (not `<InnerHero>`): `min-h-[360px] sm:min-h-[440px]`, bottom-aligned content over a full-bleed photo with the same dark top-to-bottom scrim as the Hero. Breadcrumb ("Home / About Us"), H1 "Rome Street Food, Walked and Written by One Person" (`font-sans` extrabold, white, `text-[32px] sm:text-[44px]`), a supporting paragraph, and an accent-gradient CTA button ("Read Our Story") anchor-linking to `#our-story`.

### 5.2 `<OurTravelMantraSection>` (`components/OurTravelMantraSection.tsx`)

`bg-white py-16 sm:py-20`, with a large soft decorative `accent-soft` blurred circle centered behind the content (`blur-3xl`, `pointer-events-none`). Centered H2 "Our Travel 'Mantra'." Below: a 2×2-ish content grid mixing two photos (`aspect-[4/3]`, `rounded-media`) with three numbered mantra points ("1. Go With People Who Actually Want to Eat," "2. Pick a Neighbourhood, Not Just a Landmark," "3. Let a Local Lead the Way" — the third with two body paragraphs instead of one), each point titled in `text-accent`.

### 5.3 `<ExperiencesBannerSection>` (`components/ExperiencesBannerSection.tsx`)

Two-part banner: a `bg-media py-16 sm:py-20` text band (centered H2 "What Could Your Next Rome Food Day Taste Like?", supporting paragraph, accent-gradient CTA "See Our Top Rome Food Tours" → `/`), followed immediately by a full-bleed photo band (`h-[440px] sm:h-[560px] lg:h-[640px]`, no overlay).

### 5.4 `<WhoWritesThisSection>` (`components/WhoWritesThisSection.tsx`)

`bg-white py-16 sm:py-20`. Two-column layout (text left, `aspect-[4/3]` photo right on desktop): small eyebrow ("Something people often ask… okay, but…"), H2 in accent color ("Who Writes Street Food Rome?"), and four short paragraphs establishing the single-author, first-hand-experience voice (bold inline emphasis on key claims via `<strong>`).

### 5.5 `<HowItStartedSection>` (`components/HowItStartedSection.tsx`)

`bg-paper-tint py-16 sm:py-20`. H2 "How It Started," then a 3-column grid of origin-story cards, each with a `64px` rounded-square accent-gradient icon tile, an accent-colored bold title, and a body paragraph: "Moved for a Semester, Stayed for a Decade" → "Got Tired of Sending the Same Three Names" → "Street Food Rome Was Born."

### 5.6 `<HowWeChooseSection>` (`components/HowWeChooseSection.tsx`)

`bg-white py-16 sm:py-20`. Asymmetric layout: a `320px`-fixed H2 column ("How We Choose Our Tours") beside a 2×2 grid of 4 numbered method steps (circular accent-gradient number badge + accent-colored bold title + body line): "Walk it first" → "Stay off the tourist track" → "Judge it honestly" → "Keep it personal."

---

## 6. Contact page (`/contact`) — `app/contact/page.tsx`

Thinnest page in the site: renders `<PageDocContent slug="contact" />` only — no bespoke sections. See §9 for the shared template. Content (title + rich-text body) is entirely CMS-driven (Firestore `pages/contact` doc); there is no hardcoded contact form, map, or address block in the component itself beyond what the Footer already carries (§2.4).

---

## 7. FAQ page (`/faq`) — `app/faq/page.tsx`

- **`<InnerHero>`** — no image, title from CMS doc, subtitle "Booking, cancellations, and what this site actually covers.", breadcrumb "Home."
- **FAQ list section** — `py-14`, `max-w-[760px]` centered column. A single `rounded-card border border-line` container with `divide-y` rows; each row is a native `<details>/<summary>` accordion (no JS state — pure HTML disclosure), question in `font-display text-base font-semibold`, a chevron icon that rotates 180° on open (`group-open:rotate-180`), and the answer paragraph revealed below in `text-sm text-ink-muted`.
- **Structured data:** `FAQPage` JSON-LD with one `Question`/`acceptedAnswer` pair per FAQ item, generated automatically from the same data feeding the visible accordion.
- A shared, prop-driven twin of this exact page exists as `<FAQPageTemplate>` (`components/FAQPageTemplate.tsx`) for reuse by other properties — identical markup, parameterized by `title`/`subtitle`/`faqs`/breadcrumb.

---

## 8. Privacy Policy (`/privacy`) and Terms of Service (`/terms`)

Both route files (`app/privacy/page.tsx`, `app/terms/page.tsx`) are one-liners rendering `<PageDocContent slug="privacy" | "terms" />` — see §9's shared template. Both are fully CMS-driven; there is no hardcoded legal copy in these route files.

A separate, richer, structured template also exists in the codebase for this exact page type — `<PrivacyPolicyTemplate>` (`components/PrivacyPolicyTemplate.tsx`) — not currently wired to the live `/privacy` route, but available and worth standardizing on for new properties: `<InnerHero>`, an intro paragraph, an arbitrary array of `{heading, content}` sections each rendered as its own `<h2>`/paragraph block, and a closing "Contacting us about this policy" block with a `mailto:` link and a plain-language disclaimer line. All inside the same `max-w-[720px] py-14 space-y-8` column used by every legal page.

---

## 9. Shared content-doc template — `<PageDocContent>` (`components/PageDocContent.tsx`)

The single shared shell behind Contact, Privacy, and Terms. Fetches a Firestore `pages/{slug}` document; 404s (`notFound()`) if missing.

- **`<InnerHero>`** — title from the doc, breadcrumb "Home," no image, no subtitle, no eyebrow.
- **Body:** `py-14`, `max-w-[720px]` centered column, doc's `bodyHtml` rendered into a `.rich-content` div (typography per §1.2) via `dangerouslySetInnerHTML` — the only page type that renders raw CMS HTML directly rather than JSX-authored sections.

---

## 10. Cookie Policy (`/cookie-policy`) and Affiliate Disclosure (`/affiliate-disclosure`)

Structurally identical to each other and to §9's pattern, but implemented as their own route files (not `<PageDocContent>`) because each carries a **hardcoded fallback HTML body** used until a CMS doc exists for that slug:

- **`<InnerHero>`** — title (CMS or fallback: "Cookie Policy" / "Affiliate Disclosure"), breadcrumb "Home," no image.
- **Body:** identical `py-14`, `max-w-[720px]`, `.rich-content` block, sourced from `page?.bodyHtml ?? FALLBACK_HTML`.
- **Cookie Policy fallback content structure:** intro paragraph, then H2 sections "What cookies we use," "Third-party cookies," "Managing cookies," "Changes to this policy," "Contact" (mailto).
- **Affiliate Disclosure fallback content structure:** intro paragraph, then H2 sections "How we earn money," "How this affects our recommendations," "Who runs this site," "Questions" (mailto).

---

## 11. Blog

### 11.1 Blog index (`/blog`) — `app/blog/page.tsx`

- **`<InnerHero>`** — eyebrow "Street Food Rome Blog," title "Notes on Rome Street Food," subtitle, breadcrumb "Home."
- **Category filter row** (`pt-10`, `max-w-[1000px]`): flat wrap of pill links, one per `BLOG_CATEGORIES` entry, routing to `/blog/category/{slug}`.
- **Post grid** (`py-14`, `max-w-[1000px]`): 2-column grid (`sm:grid-cols-2`) of post cards — `aspect-[16/10] rounded-media` cover image (scales 105% on hover), formatted publish date (`text-xs uppercase tracking-[0.1em] text-faint`), H2 title (`font-display text-xl font-semibold`), excerpt paragraph.

### 11.2 Blog post (`/blog/[slug]`) — `app/blog/[slug]/page.tsx`

- **Header band:** `bg-paper-tint py-10 sm:py-14`, `max-w-[720px]` — breadcrumb ("Blog / {Post Title}"), H1 (`font-display text-3xl sm:text-4xl font-semibold`), meta line (formatted date · author name if present).
- **Body:** `py-10`, `max-w-[720px]` — optional `aspect-[16/9] rounded-media` cover image, then the post's `.rich-content` HTML body, then (if an author is attached) an author card: `rounded-card border` box with a `48px` circular avatar, name, and bio paragraph.
- **Structured data:** `BlogPosting` JSON-LD (headline, datePublished, image, author).

### 11.3 Blog category (`/blog/category/[slug]`) — `app/blog/category/[slug]/page.tsx`

- **`<InnerHero>`** — eyebrow "Blog Category," title = category name, subtitle = category intro, breadcrumb "Blog," optional hero image.
- **Intro rich-content block**, then either an empty-state message (with a link back to `/blog`) or the same 2-column post-card grid as §11.1, filtered to that category.
- **Bottom cross-link block** (`mt-14`, `border-t`, 2-column grid): "Explore by category" (links to each `CATEGORIES` tour-category hub) and "Our Network" — `[EXCLUDED — Our Network, see §0]`.
- **Structured data:** `CollectionPage` JSON-LD.

---

## 12. Neighbourhoods

### 12.1 Neighbourhoods index (`/neighborhoods`) — `app/neighborhoods/page.tsx`

- **`<InnerHero>`** — eyebrow "Neighbourhood Guides," title "Where to Eat in Rome, By Neighbourhood," subtitle, breadcrumb "Home."
- **List:** `py-10`, `max-w-[1000px]`, 2-column grid of large tappable row-cards (`rounded-card border`, name in `font-display text-xl font-semibold`, trailing arrow that tints accent on hover) — one per `NEIGHBORHOODS` entry (10 total: Trastevere, Testaccio, Jewish Ghetto, Campo de' Fiori, Monti, Prati, San Lorenzo, Pigneto, Trionfale, Garbatella).
- **Structured data:** `CollectionPage` + `ItemList` JSON-LD.

### 12.2 Neighbourhood detail (`/neighborhoods/[slug]`) — `app/neighborhoods/[slug]/page.tsx`

- **`<InnerHero>`** — eyebrow "Neighbourhood Guide," title "Eating in {Name}, Rome," breadcrumb "Home," optional hero image from CMS.
- **Article body:** `py-10`, outer `max-w-[1440px]` with an inner `max-w-[760px]` reading column — long-form `.rich-content` editorial copy (CMS-driven, with a genuine ~150–250-word hardcoded fallback essay per neighbourhood covering its food identity and best time to visit, never templated filler).
- **Tours-in-this-neighbourhood grid:** if any tours are tagged to the neighbourhood, an H2 "Tours in {Name}" followed by a `1/2/4`-column `<TourCard>` grid (back to the wider `1440px` frame); otherwise a plain-text fallback linking to the full `/tours` index.
- **Structured data:** `Article` JSON-LD.

---

## 13. Tours

### 13.1 Tours index (`/tours`) — `app/tours/page.tsx`

- **`<InnerHero>`** — eyebrow "All Tours," title "Rome Food Tours," subtitle, breadcrumb "Home."
- **Filter bar** (`py-10`, `max-w-[1440px]`): a row of category pills ("All Tours" + one per `CATEGORIES`) — active pill filled `bg-accent`/white text, inactive outlined — followed by a second, smaller row of neighbourhood pills, same active/inactive treatment at a reduced size. Both filters are query-param driven (`?category=`, `?neighborhood=`) and combine.
- **Result count line** (conditional): "Showing N tours in **{category}** in **{neighbourhood}**."
- **Grid:** `1/2/4`-column `<TourCard>` grid, or an empty-state message with a "View all tours" link.
- **Structured data:** `CollectionPage` + `ItemList` JSON-LD.

### 13.2 Tour category hub (`/tours/category/[slug]`) — `app/tours/category/[slug]/page.tsx`

- **`<InnerHero>`** — eyebrow "Food Category," title "{Category} Tours in Rome," optional hero image.
- **Editorial intro:** `py-10`, outer `1440px`/inner `760px` `.rich-content` block — CMS-driven with a genuine, long-form hardcoded fallback essay per category (Pizza, Pasta, Beer & Wine, Gelato, Street Food Classics) explaining what actually distinguishes that category in Rome, not generic copy.
- **Tour grid:** same `1/2/4`-column `<TourCard>` grid pattern as §13.1, back at the `1440px` frame.
- **Cross-link line:** "Find {Category} tours in: {neighbourhood links}" — only rendered when tours in this category have known neighbourhoods.
- **Structured data:** `CollectionPage` + `ItemList` JSON-LD.

### 13.3 Tour detail page (`/tours/[slug]`) — `app/tours/[slug]/page.tsx` → `<TourPageContent>`

- **Breadcrumb/header band:** `bg-paper-tint py-10 sm:py-14`, `max-w-[1100px]` — breadcrumb ("Home / {Category} / {Tour Title}"), H1 (`font-display text-3xl sm:text-4xl font-semibold`), a meta chip row: duration (clock icon), "Free Cancellation" tag, "Small Group" tag, and (if applicable) a "Set in {Neighbourhood}" link chip — all `bg-white rounded-md` pills.
- **Main content grid:** `py-10 sm:py-14`, `max-w-[1100px]`, `lg:grid-cols-[1.6fr_1fr]` split:
  - **Left (content):** large `aspect-[16/10] rounded-media` hero photo, then (if present) a "What to expect" H2 + the tour's first-hand-notes paragraph.
  - **Right (booking aside):** `rounded-media border shadow-aside`, sticky at `top-24` on desktop — price (`font-display text-3xl font-semibold` + "/adult"), a full-width accent-gradient "Check Availability" button (`target="_blank"`, `rel="noopener noreferrer sponsored"`, links to the GetYourGuide affiliate URL), and a small disclosure line explaining GetYourGuide handles booking with free cancellation up to 24 hours before.
- **"You might also like" rail** (conditional, `bg-paper-tint py-14`): H2 + a simple bold-link list (not cards) of 2–4 related tours, matched first by same category+neighbourhood, falling back to a weighted category/neighbourhood score, never left empty.
- **Structured data:** `TouristTrip` JSON-LD (name, description, image, touristType "Food and culinary tourists," itinerary place) — deliberately not `Product`/`Offer` schema, since price is a free-text range rather than structured min/max data.

---

## 14. 404 / Not Found (`app/not-found.tsx`)

Full Header + Footer chrome still renders (this is the standard app-level not-found, distinct from the network-placeholder 404 in §15). Centered content column, `max-w-xl`, `py-32`: H1 "Page not found," one-line body copy, and an accent-gradient "Back to the homepage" button. `robots: { index: false, follow: true }`.

*(Not a Street Food Rome-specific page, but documented for completeness: `<UnderConstructionNotice>` — `components/UnderConstructionNotice.tsx` — is a separate, chrome-less full-screen 404 variant rendered only on sibling network properties that haven't been built yet. It has no Header/Footer at all, just a centered site-name eyebrow, "404" label in accent color, H1 "Page not found," and "This page hasn't been built yet." It does not apply to Street Food Rome, which is the one fully built/active property.)*

---

## 15. Shared components appendix — prop contracts

For quick reference when wiring a new property to the same component set.

| Component | Key props | Notes |
|---|---|---|
| `<Header>` | none (reads route via `usePathname`) | Rebrands automatically per network-site prefix |
| `<Footer>` | none | Rebrands automatically per network-site prefix |
| `<Hero>` | `imageUrl: string \| null` | Homepage-only; CHIPS array is currently hardcoded in-component, not prop-driven |
| `<InnerHero>` | `eyebrow?, title, subtitle?, breadcrumb?: {label, href}, imageUrl?, imageAlt?` | Universal inner-page banner |
| `<AboutHero>` | none (fixed content + exported `ABOUT_HERO_IMAGE_URL`/`_ALT`) | About-only bespoke hero |
| `<TourCard>` | `tour: TourDoc, priority?: boolean, href?: string` | Used on Home, category hubs, neighbourhood pages, tours index, "you might also like" is a plain link list, not this card |
| `<TourCarouselSection>` | `tours: TourDoc[]` | Homepage only |
| `<CategoryToursSection>` | `tours: TourDoc[]` | Homepage only; CATEGORIES/imagery hardcoded in-component |
| `<TrustPointsSection>` | none | Fixed 4-point content |
| `<MediaBar>` | none | Fixed 10-outlet content (placeholder) |
| `<ExploreLinksSection>` | `tours: TourDoc[], allBlogPosts: BlogPostDoc[]` | Home + About |
| `<AllDestinationsSection>` | none | `[EXCLUDED — Our Network]` |
| `<FAQPageTemplate>` | `title, subtitle, faqs: {question, answer}[], breadcrumbLabel?, breadcrumbHref?` | Reusable twin of the live `/faq` route |
| `<PrivacyPolicyTemplate>` | `data: {title, intro, sections: {heading, content}[], contactEmail}` | Not yet wired to `/privacy`; recommended standard for new properties |
| `<PageDocContent>` | `slug: string` | Firestore-driven shell behind Contact/Privacy/Terms |
| `<TourPageContent>` | `tour: TourDoc, otherTours, category?: {label, href}, neighborhood?: {name, href}` | Full tour detail page |
| `<SafeImage>` | passthrough `next/image` props | Universal image wrapper with graceful failure |
| `NetworkLink` (default export) | passthrough `next/link` props | Universal link wrapper — always import this, never raw `next/link`, for any internal href |

---

## 16. Replication checklist for new/updated network properties

1. Reuse every component in §15 unchanged; only content props and the scoped `--accent`/`--accent-hover`/`--accent-soft` trio may vary per property (via a `.{prefix}-scope` class, per §1.1).
2. Keep the exact page set documented in §§4–14 (Home, About, Contact, FAQ, Privacy, Terms, Cookie Policy, Affiliate Disclosure, Blog index/post/category, Neighbourhoods index/detail, Tours index/detail/category hub, 404) — do not drop or reorder sections within a page type.
3. Preserve the H1 register split: sans-extrabold for marketing/homepage sections, Fraunces serif for editorial/inner-page titles (§1.2).
4. Preserve the named radius/shadow/spacing scales exactly (§1.3) — never introduce a one-off `shadow-sm` or arbitrary border-radius value.
5. Every internal link uses `NetworkLink`, never raw `next/link`, so cross-property prefixing keeps working.
6. Structured data (JSON-LD) patterns per page type (WebSite/Organization/ItemList on Home, FAQPage on FAQ, BlogPosting on posts, TouristTrip on tour pages, CollectionPage on index/hub pages, Article on neighbourhood pages) should be replicated identically for SEO/AI-citation consistency across the network.
7. Wherever the reference build currently surfaces sibling-property cross-links (the four `[EXCLUDED — Our Network]` locations in §0), decide deliberately per property whether/how to include that list — it was out of scope for this blueprint and needs its own explicit design decision, not a silent copy-paste.
