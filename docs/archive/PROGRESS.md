# Config-Driven Refactor Progress (MASTER-CLONE-BLUEPRINT)

**Scope:** Full 12-site config-driven refactor. All 13 sites = same structure, same 9 homepage sections, same 19 page types (4 legal, 5 category tour pages). Only text/images differ per site. Data from src/lib/<slug>.ts + config.

## MASTER-CLONE-BLUEPRINT Status

### ✅ DONE (commit 0cce945)
- **§1 Fix #1**: Created `src/lib/sites/loader.ts` → dynamically load FEATURED_TOURS per site
- **§1 Fix #2**: Updated `app/[slug]/page.tsx` → uses site-specific tours, not getAllTours()
- **§1 Fix #3**: Extended `SiteConfig` schema with all homepage text fields (heroEyebrow, sliderEyebrow, categoryEyebrow, etc.)
- **§3 Architecture**: Loader function + type-safe site data imports
- **2/13 Configs**: street-food-rome (updated), underground-colosseum, private-vatican (full)

### 🔄 IN PROGRESS (10/13 sites need configs)
**Remaining sites:** pompeii-day-trip, rome-vespa, tuscany-day-trip, amalfi-day-trip, tivoli-day-trip, naples-street-food, golf-cart-rome, cooking-in-rome, rome-pizza-class, tiramisu-class

**Pattern per site:**
```typescript
{
  slug, name, domain, description,
  heroImage, heroEyebrow, heroTitle, heroGoldWord, heroSubtitle,
  chips: [20 items],
  namesStrip: [10 items] + namesStripLabel,
  sliderEyebrow, sliderTitle,
  categoryEyebrow, categoryTitle, categories: [5 items with 3 tourSlugs each],
  howWeChooseEyebrow, howWeChooseTitle, howWeChooseSubtitle, howWeChoose: [4 items],
  placesTitle, placesTabs: [3 tabs × 20 items],
  metaTitle, metaDescription, contactEmail
}
```

### ⏳ NOT YET STARTED
- **§2 Data**: Map FEATURED_TOURS/GALLERY/FAQS/AUTHOR from src/lib/<slug>.ts to each config
- **§1 Fix #2b**: Update components to accept config props (Hero, TourCarouselSection, CategoryToursSection, TrustPointsSection, HowWeChooseDark all need config.heroEyebrow, etc.)
- **§4 Pages**: Create/update 19 page types for each site (about, contact, faq, tours, blog, legal, etc.)
- **§7 Validator**: Full validation at build time (counts, images, text checks)

## SiteConfig Extension Needed
```typescript
{
  // Existing
  slug, name, domain, description, heroImage, heroTitle, heroSubtitle, accentWord,
  metaDescription, contactEmail,
  
  // New: Homepage sections
  chips: string[]  // e.g., ['Authentic', 'Local Guides', 'Small Groups']
  namesStrip: Array<{name: string, href: string}>  // Real food/places links
  sliderTitle: string  // "Top Food Items to Try in Rome"
  categories: Array<{  // 5 categories
    name: string
    slug: string
    description: string
    imageUrl: string
    tourSlugs: string[]  // Which tours belong to this category
  }>
  howWeChoose: Array<{  // 3-4 items
    title: string
    description: string
    icon?: string
  }>
  placesTabs: Array<{  // Neighborhoods/places
    name: string
    href: string
    description?: string
  }>
  
  // SEO & JSON-LD
  jsonLd?: any  // Per-site structured data
}
```

## 4 Parts (Sequential with build+commit+push after each)

### Part A: Type Extension + Street Food Rome Config ✅ DONE
- [x] Extend SiteConfig schema in `config.ts` with all fields above
- [x] Create `apps/web/src/config/sites/street-food-rome.ts` with full homepage content
- [x] HomePageBody stays unchanged (still hardcoded, Street Food Rome will use config)
- [x] TypeScript compilation passes (0 type errors)
- [x] Commit 54626c4 + push to Staging

**Next**: Part B - Refactor HomePageBody to accept `config: SiteConfig` prop and read all content from it instead of hardcoded data

### Part B: HomePageBody Config-Driven + [slug] Uses It ✅ DONE
- [x] Refactor HomePageBody.tsx to accept `config: SiteConfig` prop
- [x] Updated TrustPointsSection, CategoryToursSection, HowWeChooseDark to accept data props from config
- [x] HomePageBody reads all content from config instead of hardcoded
- [x] Update `app/page.tsx` to import Street Food Rome config and pass to HomePageBody
- [x] Update `app/[slug]/page.tsx` to load site config and use HomePageBody (retired NetworkHomeTemplate for these pages)
- [x] TypeScript compilation passes (0 type errors)
- [x] Created validateSiteConfig.ts validator
- [x] Street Food Rome config now has all required counts: 20 chips, 10 names, 5 categories (3 tours each), 4 how-we-choose, 20 places
- [x] Commit 2eba2e7 + push to Staging

**Next**: Part C - Create full configs for 12 other sites (with validation enforcing exact counts)

### Part C: Per-Site Configs for 12 Other Sites
- [ ] Create individual config files for: underground-colosseum, private-vatican, pompeii-day-trip, rome-vespa, golf-cart-rome, cooking-in-rome, rome-pizza-class, tiramisu-class, tuscany-day-trip, amalfi-day-trip, tivoli-day-trip, naples-street-food
- [ ] Real tours only (no fake content), real images with alt text
- [ ] Unique meta/JSON-LD per site
- [ ] Build passes
- [ ] Commit + push, update PROGRESS.md

### Part D: One About Template for All 13 Sites
- [ ] Create single About template using same config pattern
- [ ] Each site's About page uses its own config
- [ ] Build passes
- [ ] Commit + push, update PROGRESS.md

## Testing & Final Push
- Run dev server locally, test all 13 sites at 1440px and 375px
- Verify no visual changes, real tours only, images load
- Report: 13-row table (site | homepage OK | about OK | real tours count | broken images | issues)

## Rules
- ✅ Zero visual change on Street Food Rome during refactor
- ✅ Real tours only, no fake reviews/ratings/press
- ✅ Do NOT touch Header.tsx, Footer.tsx, card designs
- ✅ Staging branch only (never main, no force-push)
- ✅ Build must pass: 0 type/lint errors

---

**Current Task**: Part A (Type Extension + Street Food Rome Config)
**Blocked By**: None
**Next**: Extend SiteConfig schema, create street-food-rome.ts config, build & test, commit
