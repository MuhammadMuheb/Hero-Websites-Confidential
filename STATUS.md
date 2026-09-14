# Italy Tours Platform — Network Build Status

Tracks build status per network property (see `apps/web/src/lib/tours.ts` →
`NETWORK_SITES` for the canonical registry). Numbering matches that
registry's `number` field, not build order.

## Status log

### 2026-09-14
- **06 · Tuscany Day Trip — bespoke hero homepage + full page set built.**
  Custom-designed homepage (not the shared template), all 4 money pages and
  5 support pages from the site's own build brief, About, Contact, navbar
  with dropdown mega-menus + mobile menu, and cross-network footer/nav
  links. Accent unified to the same network-wide red as every other shipped
  property. Not yet the platform's active/default site; reachable directly
  at `/tuscany-day-trip`. This is the 9th of 13 network properties built.

### 2026-09-12
- **05 · Street Food Rome — hero site build complete.** The platform's
  first hero implementation (`ACTIVE_NETWORK_SLUG`), fully built end-to-end:
  homepage, tour pages, category/neighbourhood hubs, blog, About/Contact/
  Privacy/Terms/FAQ, SEO/schema, and image audit. This is the reference
  build the shared platform modules (site registry, content model,
  affiliate cloaking, SEO engine) were proven out against, ahead of any
  other hero rolling out.
- **02 · Underground Colosseum — bespoke hero homepage + full page set
  built.** Custom-designed homepage (not the shared template), all 5 money
  pages and 6 support pages from the site's own blueprint, About, Contact,
  navbar with dropdown mega-menus + mobile menu, and cross-network footer/
  nav links. Not yet the platform's active/default site; reachable directly
  at `/underground-colosseum`.
- All other network properties (03, 04, 06–14) remain **not started** —
  each still resolves to the "under construction" placeholder
  (`UnderConstructionNotice`) at its root and every sub-path.

## Per-property status

| # | Property | Slug | Status |
|---|---|---|---|
| 02 | Underground Colosseum | `underground-colosseum` | Bespoke hero built (homepage + 13 pages) |
| 03 | Pompeii Day Trip | `pompeii-day-trip` | Not started |
| 04 | Rome Vespa | `rome-vespa` | Not started |
| 05 | Street Food Rome | `street-food-rome` | **Built — active/default site** |
| 06 | Tuscany Day Trip | `tuscany-day-trip` | Bespoke hero built (homepage + 11 pages) |
| 07 | Private Vatican | `private-vatican` | Not started |
| 08 | Golf Cart Rome | `golf-cart-rome` | Not started |
| 09 | Cooking in Rome | `cooking-in-rome` | Not started |
| 10 | Rome Pizza Class | `rome-pizza-class` | Not started |
| 11 | Tiramisu Class | `tiramisu-class` | Not started |
| 12 | Naples Street Food | `naples-street-food` | Not started |
| 13 | Amalfi Day Trip | `amalfi-day-trip` | Not started |
| 14 | Tivoli Day Trip | `tivoli-day-trip` | Not started |
