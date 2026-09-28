# Config-Driven Refactor Progress

## Current State
- **SiteConfig**: Basic type at `apps/web/src/lib/sites/config.ts` with hero/meta properties
- **13 Sites**: All defined in `apps/web/src/lib/sites/index.ts` with slug, name, domain, heroImage, etc.
- **Homepage**: `apps/web/src/app/page.tsx` renders hardcoded HomePageBody + NetworkHomeTemplate
- **[slug]/page**: `apps/web/src/app/[slug]/page.tsx` renders NetworkHomeTemplate
- **HomePageBody**: `apps/web/src/components/HomePageBody.tsx` hardcodes CATEGORIES, chips, names, places, etc.
- **NetworkHomeTemplate**: Legacy component for [slug] pages — to be retired

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

### Part B: HomePageBody Config-Driven + [slug] Uses It
- [ ] Refactor HomePageBody.tsx to accept `config: SiteConfig` prop
- [ ] HomePageBody reads CATEGORIES, chips, namesStrip, etc. from config instead of hardcoded
- [ ] Update `app/page.tsx` to import Street Food Rome config and pass to HomePageBody
- [ ] Update `app/[slug]/page.tsx` to load site config and pass to HomePageBody (retire NetworkHomeTemplate)
- [ ] Build passes, all sites use same component, zero visual change
- [ ] Commit + push, update PROGRESS.md

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
