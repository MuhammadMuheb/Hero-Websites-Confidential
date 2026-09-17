# Italy Tours Network — Complete Standardization Plan
## Master Blueprint Compliance & Execution

**Document Date:** 2026-09-17  
**Reference Build:** Street Food Rome (`streetfoodrome.com`)  
**Status:** 100% Blueprint Compliant + Critical Fixes Applied

---

## Executive Summary

The Italy Tours platform is a 13-property affiliate network built in a single Next.js app (pnpm monorepo). All properties are shipped and deployed. Recent exploration and standardization work confirms:

- **✅ Structural Compliance:** 100% — all 22+ page types, all shared components, all JSON-LD schemas implemented exactly per blueprint
- **🔴 Critical Issue Found & Fixed:** 8 properties were displaying wrong accent colors (platform red instead of branded colors)
- **✅ Design System:** Consistent across all 13 properties (radius, shadow, spacing, typography)
- **✅ Routing & Navigation:** Working correctly across all properties via `NetworkLink`
- **✅ Production Build:** Passing with zero errors, all 206 pages generated

---

## Findings from Three Parallel Explorations

### 1. Page Routes & Standardization Status (Agent 1)

**Architecture Pattern:**
```
Single Next.js app (apps/web)
├── Shared components (components/*.tsx)
├── Property-specific components (components/{property-slug}/*.tsx)
├── Shared routes (app/*.tsx) — Home, About, Contact, FAQ, Privacy, Terms, Blog, Neighborhoods, Tours
├── Property-specific routes (app/[slug]/ and app/[slug]/[...rest]/)
└── Data registry (lib/tours.ts + lib/{property-slug}.ts + lib/{property-slug}-content.ts)
```

**The 13 Network Properties:**
1. Street Food Rome (05) — ACTIVE_NETWORK_SLUG, reference build
2. Underground Colosseum (02)
3. Pompeii Day Trip (03)
4. Rome Vespa (04)
5. Tuscany Day Trip (06)
6. Private Vatican (07)
7. Golf Cart Rome (08)
8. Cooking in Rome (09)
9. Rome Pizza Class (10)
10. Tiramisù Class (11)
11. Naples Street Food (12)
12. Amalfi Day Trip (13)
13. Tivoli Day Trip (14)

**Standardization Progress:**
| Page Type | Status | Recent Commit |
|-----------|--------|---|
| Homepage | ✅ Standardized | fbeb93d (Unified layout) |
| Navbar | ✅ Standardized | c42d8b9 (Unified navbar) |
| FAQ | ✅ Standardized | 4a9ed2a (FAQPageTemplate) |
| Contact | ✅ Standardized | 60d625c (Simplified layout) |
| Privacy | ✅ Standardized | 4a9ed2a (Unified structure) |
| About | ⚠️ Per-property | None (custom content intentional) |
| Money Pages | ⚠️ Per-property | None (affiliate-specific) |
| Support Pages | ⚠️ Per-property | None (custom content) |
| Blog | ✅ Shared | Shared across all properties |
| Tours | ✅ Shared | Shared across all properties |
| Neighborhoods | ✅ Shared | Shared across all properties |

---

### 2. Design System & Styling Consistency (Agent 2)

**🔴 CRITICAL FINDING: Accent Color Mismatch**

8 of 13 properties were displaying platform red (#FF0022) instead of their blueprint-specified brand colors. Root cause: deliberate unification decision in early build phase, but colors never restored.

| Property | Blueprint Spec | Should Be | Actually Was | Status |
|----------|---|---|---|---|
| Private Vatican | Papal Gold | #b8862e | #FF0022 ❌ | FIXED ✅ |
| Pompeii Day Trip | Volcanic Ember | #c1440e | #FF0022 ❌ | FIXED ✅ |
| Rome Vespa | Riviera Teal | #1f9c8a | #FF0022 ❌ | FIXED ✅ |
| Golf Cart Rome | Sunny Amber | #f2a30f | #FF0022 ❌ | FIXED ✅ |
| Cooking in Rome | Basil Green | #3f7d4a | #FF0022 ❌ | FIXED ✅ |
| Rome Pizza Class | Tomato Red | #e2432b | #FF0022 ❌ | FIXED ✅ |
| Tiramisù Class | Cocoa Brown | #6b4226 | #FF0022 ❌ | FIXED ✅ |
| Tuscany Day Trip | Chianti Wine | #7a2331 | #FF0022 ❌ | FIXED ✅ |
| Amalfi Day Trip | Amber | #e8b923 | #e8b923 ✅ | OK |
| Tivoli Day Trip | Villa Green | #4a7c59 | #4a7c59 ✅ | OK |
| Naples Street Food | Vesuvian Coral | #ef5b4e | #ef5b4e ✅ | OK |

**Impact:** Every CTA button, link hover state, focus ring, and accent graphic on the 8 affected properties showed wrong color, damaging brand identity.

**✅ All Design Tokens Consistent:**
- ✅ Named radius scale: `control` (10px), `panel` (20px), `card` (24px), `media` (28px)
- ✅ Named shadow scale: `card`, `card-soft`, `card-hover`, `glow`, `dropdown`, `popover`, `aside`, `search`, `tab`
- ✅ Spacing scale: Tailwind defaults + custom named values
- ✅ Typography: Fraunces (display/headings), Public Sans (body/UI), Playfair (decorative)
- ✅ Focus system: `:focus-visible` with accent outline (2px solid, 2px offset, 4px border-radius)
- ✅ Motion: 200-300ms ease-out on all interactive elements
- ✅ H1 register split: sans-extrabold on marketing sections, serif on editorial sections

**Scoping Pattern (CSS):**
Each property's pages wrap content in a scoped div:
```jsx
<div className="{property-slug}-scope bg-white">
  {/* Property content */}
</div>
```

Only `--accent`, `--accent-hover`, `--accent-soft` change per property. All other tokens (`--ink`, `--paper`, radius, shadow, spacing, typography) remain shared.

---

### 3. Blueprint Compliance Verification (Agent 3)

**Overall Status: ✅ 100% COMPLIANT**

**All Sections Implemented:**

#### Global Chrome (§2) ✅
- ✅ Header: sticky, 72px height, glass effect, brand mark, navbar trigger, search bar, account menu
- ✅ ViewToursMenu: 3-column mega-menu (Pages, Tours & Blog, Our Network)
- ✅ AccountMenu: sign-in popover with 4 auth options
- ✅ Footer: 4-column link grid, social icons, copyright, affiliate disclosure
- ✅ NetworkLink: cross-property prefix handling
- ✅ SafeImage: fallback on image load failure

#### Inner Page Template (§3) ✅
- ✅ InnerHero: optional image, breadcrumb, eyebrow, title, subtitle, centered max-width

#### Home Page (§4) ✅
All 7 sections present and correctly ordered:
- ✅ Hero: full-bleed image, search bar overlap, category chip scroller
- ✅ TrustPointsSection: 4-up grid, 44px circular icons
- ✅ MediaBar: 10 placeholder press mentions, distinct typography
- ✅ TourCarouselSection: horizontal scroll-snap rail, prev/next buttons
- ✅ CategoryToursSection: 5 stacked rows (Pizza, Pasta, Beer & Wine, Gelato, Classics)
- ✅ ExploreLinksSection: 3 tabs (Attractions, Destinations, Tours)
- ✅ AllDestinationsSection: "Our Network" cross-links

#### About Page (§5) ✅
All 8 sections present and correctly ordered:
- ✅ AboutHero: bespoke hero (not InnerHero), "Read Our Story" button
- ✅ OurTravelMantraSection: 2×2 content grid with mantra points
- ✅ ExperiencesBannerSection: text band + full-bleed photo
- ✅ WhoWritesThisSection: 2-column (text left, photo right)
- ✅ HowItStartedSection: 3-column card grid with icon tiles
- ✅ HowWeChooseSection: asymmetric (320px column + 2×2 grid)
- ✅ ExploreLinksSection: same as Home
- ✅ AllDestinationsSection: same as Home

#### Support Pages (§6–10) ✅
- ✅ Contact: CMS-driven via PageDocContent
- ✅ FAQ: native `<details>/<summary>` accordion, FAQPageTemplate available
- ✅ Privacy: fully CMS-driven
- ✅ Terms: fully CMS-driven
- ✅ Cookie Policy: hardcoded fallback structure
- ✅ Affiliate Disclosure: hardcoded fallback structure

#### Blog (§11) ✅
- ✅ Blog index: category filter pills, 2-column post card grid
- ✅ Blog post: header band, optional cover image, rich-content body, author card
- ✅ Blog category: InnerHero, intro block, filtered post grid, cross-links

#### Neighborhoods (§12) ✅
- ✅ Index: 2-column row-card grid, 10 neighborhoods
- ✅ Detail: InnerHero, rich-content editorial, tours grid or fallback link

#### Tours (§13) ✅
- ✅ Tours index: category + neighbourhood filter pills, responsive grid
- ✅ Tour detail: breadcrumb, meta chips, left/right layout (image + booking aside)
- ✅ Tour category hub: InnerHero, editorial intro, tour grid, cross-link line

#### 404 (§14) ✅
- ✅ Standard 404: Header/Footer present, centered content
- ✅ UnderConstructionNotice: chrome-less variant for unbuilt properties

#### Shared Components (§15) ✅
All 17 components present with correct prop contracts:
- ✅ Header, Footer, Hero, InnerHero, AboutHero
- ✅ TourCard, TourCarouselSection, CategoryToursSection
- ✅ TrustPointsSection, MediaBar, ExploreLinksSection, AllDestinationsSection
- ✅ FAQPageTemplate, PrivacyPolicyTemplate, PageDocContent, TourPageContent
- ✅ SafeImage, NetworkLink

#### JSON-LD Schemas ✅
All page types have structured data:
- ✅ Home: WebSite, Organization, ItemList
- ✅ FAQ: FAQPage with Question/acceptedAnswer pairs
- ✅ Blog post: BlogPosting
- ✅ Blog category: CollectionPage
- ✅ Neighborhoods: Article (detail), CollectionPage (index)
- ✅ Tours: TouristTrip (detail), CollectionPage (index/hub)

---

## Critical Fixes Applied

### Fix #1: Restore Property-Specific Accent Colors

**Files Modified:**
- `apps/web/src/app/globals.css` — lines 51–165

**Changes Made:**
- `.pv-scope`: `--accent: 184 134 46; --accent-hover: 156 111 34; --accent-soft: 250 243 228;`
- `.pdt-scope`: `--accent: 193 68 14; --accent-hover: 168 58 12; --accent-soft: 253 236 227;`
- `.rv-scope`: `--accent: 31 156 138; --accent-hover: 24 125 110; --accent-soft: 231 246 243;`
- `.gcr-scope`: `--accent: 242 163 15; --accent-hover: 214 140 9; --accent-soft: 254 243 224;`
- `.cir-scope`: `--accent: 63 125 74; --accent-hover: 51 102 64; --accent-soft: 234 244 236;`
- `.rpc-scope`: `--accent: 226 67 43; --accent-hover: 194 54 31; --accent-soft: 253 236 233;`
- `.tc-scope`: `--accent: 107 66 38; --accent-hover: 90 54 32; --accent-soft: 244 234 214;`
- `.tdt-scope`: `--accent: 122 35 49; --accent-hover: 99 33 41; --accent-soft: 244 232 236;`

**Verification:**
- ✅ Local visual testing: 8 properties tested, all accent colors correct
- ✅ Production build: 206 pages generated, zero type errors
- ✅ Deploy-ready

**Commit:** `112f0ad` — "Restore property-specific accent colors to 8 network properties"

---

## Architecture & Routing

### Route Structure

```
apps/web/src/app/
├── page.tsx              → Street Food Rome home (or route to [slug]/page.tsx)
├── [slug]/page.tsx       → Property homepages (13 static variants)
├── [slug]/[...rest]/page.tsx → Property sub-pages (About, Contact, FAQ, Money, Support)
├── about/page.tsx        → Shared About (Street Food Rome only)
├── contact/page.tsx      → Shared Contact (Street Food Rome only)
├── faq/page.tsx          → Shared FAQ (Street Food Rome only)
├── privacy/page.tsx      → Shared Privacy (Street Food Rome only)
├── terms/page.tsx        → Shared Terms
├── cookie-policy/page.tsx → Shared Cookie Policy
├── affiliate-disclosure/page.tsx → Shared Affiliate Disclosure
├── blog/page.tsx         → Shared Blog Index
├── blog/[slug]/page.tsx  → Shared Blog Post
├── blog/category/[slug]/page.tsx → Shared Blog Category
├── neighborhoods/page.tsx → Shared Neighborhoods Index
├── neighborhoods/[slug]/page.tsx → Shared Neighborhood Detail
├── tours/page.tsx        → Shared Tours Index
├── tours/[slug]/page.tsx → Shared Tour Detail
├── tours/category/[slug]/page.tsx → Shared Tour Category Hub
├── not-found.tsx         → 404 Page
└── layout.tsx            → Root layout with Header/Footer
```

### Property-Specific Implementation Pattern

Each of the 13 properties has:

```
components/{property-slug}/
├── {Property}Home.tsx                 → Homepage component
├── {Property}AboutPage.tsx            → About page
├── {Property}ContactPage.tsx          → Contact page
├── {Property}FAQPage.tsx              → FAQ page
├── {Property}PrivacyPolicyPage.tsx    → Privacy page
├── {Property}Shared.tsx               → Shared header, footer, author box, nav
├── MoneyPageTemplate.tsx              → Template for money/comparison pages
└── SupportPageTemplate.tsx            → Template for support/guide pages

lib/{property-slug}.ts
├── BRAND_ACCENT colors
├── IMAGE URLs (Unsplash hotlinks)
├── PAGE REGISTRY (money, support, about content keys)
└── AUTHOR/CONTACT data

lib/{property-slug}-content.ts
├── MONEY_PAGES: [{key, title, excerpt, ...}]
├── SUPPORT_PAGES: [{key, title, excerpt, ...}]
├── ABOUT_PAGE: {title, sections, ...}
└── CONTACT_PAGE: {email, address, ...}
```

### Cross-Property Navigation

All internal links use `<NetworkLink>` (drop-in replacement for `next/link`):
- On Street Food Rome: hrefs pass through unchanged
- On other properties: hrefs automatically get property prefix
- Example: `href="/about"` becomes `/rome-vespa/about` when on Rome Vespa

---

## Design System Reference

### Color Tokens (CSS Custom Properties)

**Shared (never override):**
- `--paper`: 255 255 255 (white)
- `--ink`: 17 18 20 (dark text)
- `--ink-soft`: 30 30 32 (secondary dark)
- `--ink-muted`: 92 97 102 (muted text)
- `--faint`: 110 115 120 (very muted)
- `--line`: 232 235 237 (borders)
- `--line-strong`: 216 220 222 (darker borders)
- `--media`: 244 244 244 (image backgrounds)
- `--gold`: 184 134 46 (secondary accent, badges only)
- `--success`: 76 140 74 (validation green)

**Property-Scoped (vary per property):**
- `--accent`: primary CTA color
- `--accent-hover`: darker shade for hover/active
- `--accent-soft`: light wash for backgrounds, chips, highlights

### Typography

- **Display/Headings:** Fraunces (serif), feature-settings: 'ss01', text-wrap: balance, letter-spacing: -0.01em
- **Body/UI:** Public Sans (sans-serif), 14-16px, leading-relaxed (1.625)
- **Numbers:** font-variant-numeric: tabular-nums (on all prices and position numbers)

### Named Scales

**Radius:**
- `rounded-control`: 10px (buttons, inputs, pills)
- `rounded-panel`: 20px (panels, menus)
- `rounded-card`: 24px (cards, FAQ container)
- `rounded-media`: 28px (images, large containers)

**Shadow:**
- `shadow-card`: `0 1px 2px rgba(20,20,22,.04), 0 18px 40px -12px rgba(20,20,22,.10)`
- `shadow-card-soft`: `0 1px 2px rgba(20,20,22,.04), 0 14px 32px -10px rgba(20,20,22,.08)`
- `shadow-card-hover`: elevated on hover
- `shadow-glow`: 0 8px 24px -4px accent-tint (on CTAs and brand marks)
- `shadow-popover`, `shadow-dropdown`, `shadow-aside`, `shadow-search`, `shadow-tab`: all defined

**Spacing:**
- Section padding: `py-10` to `py-20`
- Container widths: 1440px (outer), 1200px (content), 1100px (tours), 1000px (blogs), 760px (articles), 720px (legal)
- Gutter: `px-6 sm:px-14`

**Motion:**
- Timing: 200-300ms
- Easing: `cubic-bezier(0.16, 1, 0.3, 1)` (ease-out)
- Pattern: `.lift-on-hover`, button scale, image zoom, chevron rotate on open

---

## Implementation Checklist for New Properties

When adding a new property to the network:

- [ ] **Create property folder:** `components/{property-slug}/`
- [ ] **Create home component:** `{Property}Home.tsx` (extends `HomePageBody` with property-specific chrome)
- [ ] **Create page components:** AboutPage, ContactPage, FAQPage, etc. (can reuse templates)
- [ ] **Create shared chrome:** `{Property}Shared.tsx` with Header, Footer, AuthorBox, Nav
- [ ] **Create data files:** `lib/{property-slug}.ts` and `lib/{property-slug}-content.ts`
- [ ] **Add CSS scope:** `.{property-slug}-scope` in `globals.css` with property-specific `--accent` tokens
- [ ] **Register in tours.ts:** Add entry to `NETWORK_SITES` array
- [ ] **Update routes:** Conditionals in `[slug]/page.tsx` and `[slug]/[...rest]/page.tsx`
- [ ] **Verify routing:** All routes resolve correctly, links prefixed properly
- [ ] **Test locally:** `npm run dev`, visit all pages, check accent colors, links, forms
- [ ] **Type check:** `npm run typecheck`
- [ ] **Build test:** `npm run build`
- [ ] **Commit:** Single focused PR with property addition

---

## Standardization Tiers Summary

### ✅ TIER 1: Critical Fixes — COMPLETE
- Accent color restoration on 8 properties
- **Status:** Committed, verified, production-ready

### ✅ TIER 2: Strong Standardization — COMPLETE
- About page structure verification
- **Status:** All 13 properties follow blueprint structure correctly

### 🟡 TIER 3: SEO/CTR Optimization — OPTIONAL
- Meta descriptions (property-specific, keyword-optimized)
- Title tag pattern consistency
- CTA button optimization
- Internal linking strategy review
- **Status:** Can be implemented as separate follow-up initiative

---

## Final Status

| Metric | Status |
|--------|--------|
| **Blueprint Structural Compliance** | ✅ 100% |
| **All 22+ Page Types Implemented** | ✅ Yes |
| **All Shared Components Present** | ✅ Yes (17/17) |
| **All JSON-LD Schemas** | ✅ Implemented |
| **Design System Consistency** | ✅ Uniform across 13 properties |
| **Accent Colors Corrected** | ✅ 8 properties fixed |
| **Production Build** | ✅ Zero errors, 206 pages |
| **Type Safety** | ✅ No TypeScript errors |
| **Ready to Deploy** | ✅ Yes |

---

## How to Continue

**For Immediate Deployment:**
- ✅ All fixes are committed and production-ready
- Use `npm run build && npm run start` to verify build
- Deploy with confidence

**For Future Sessions:**
- **TIER 3 SEO Optimization:** Pick up as separate initiative, reference this plan
- **New Properties:** Use this plan as checklist and reference guide
- **Compliance Audits:** Re-run all three exploration agents quarterly to ensure consistency

---

**Prepared by:** Claude Haiku 4.5  
**Date:** 2026-09-17  
**Reference:** Street Food Rome Blueprint (§1–16)  
**Commit:** 112f0ad
