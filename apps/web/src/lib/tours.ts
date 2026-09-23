import type { BlogPostDoc, TourDoc } from './firestore';

export const SITE_DOMAIN = 'italy-tours.example.com';

/**
 * apps/web/src/lib/tours.ts — canonical tour/category/neighbourhood registry.
 *
 * Single source of truth for the 19 known tours (3 with a curated legacy SEO
 * slug, 16 that were only referenced from Firestore before this blueprint —
 * including 2 discovered by a live Firestore audit after the initial 17-tour
 * pass: aperitivo-evening-experience and prati-neighborhood-food-crawl).
 * Anything that needs to link to a tour page, group tours by food category,
 * or group tours by neighbourhood should import from here instead of
 * duplicating the list (ViewToursMenu, sitemap.ts, the /tours hub, the
 * category hubs, and the neighbourhood hubs all consume this).
 */

export interface CategoryDef {
  slug: string;
  name: string;
}

export interface NeighborhoodDef {
  slug: string;
  name: string;
}

export interface TourRegistryEntry {
  /** The URL segment under /tours/{seoSlug}. */
  seoSlug: string;
  /** The real Firestore `tours` collection doc id. */
  realSlug: string;
  /** One of CATEGORIES' slugs. */
  category: string;
  /** One of NEIGHBORHOODS' slugs, or null when a tour isn't tied to one place. */
  neighborhood: string | null;
}

export const CATEGORIES: CategoryDef[] = [
  { slug: 'pizza', name: 'Pizza' },
  { slug: 'pasta', name: 'Pasta' },
  { slug: 'beer-and-wine', name: 'Beer & Wine' },
  { slug: 'gelato', name: 'Gelato' },
  { slug: 'street-food-classics', name: 'Street Food Classics' },
];

export const NEIGHBORHOODS: NeighborhoodDef[] = [
  { slug: 'trastevere', name: 'Trastevere' },
  { slug: 'testaccio', name: 'Testaccio' },
  { slug: 'jewish-ghetto', name: 'Jewish Ghetto' },
  { slug: 'campo-de-fiori', name: "Campo de' Fiori" },
  { slug: 'monti', name: 'Monti' },
  { slug: 'prati', name: 'Prati' },
  { slug: 'san-lorenzo', name: 'San Lorenzo' },
  { slug: 'pigneto', name: 'Pigneto' },
  { slug: 'trionfale', name: 'Trionfale' },
  { slug: 'garbatella', name: 'Garbatella' },
];

/**
 * All 19 tours. The 3 with a hand-picked SEO slug (kept for backwards
 * compatibility with whatever is already indexed) come first; the 16
 * orphaned tours use their already-clean Firestore slug as the SEO slug too.
 */
export const TOURS: TourRegistryEntry[] = [
  // --- previously "KEPT_TOURS" — keep these exact SEO slugs ---
  { seoSlug: 'trastevere-food-tour', realSlug: 'trastevere-food-wine-walk', category: 'beer-and-wine', neighborhood: 'trastevere' },
  { seoSlug: 'jewish-ghetto-tour', realSlug: 'jewish-ghetto-food-tour', category: 'street-food-classics', neighborhood: 'jewish-ghetto' },
  { seoSlug: 'street-food-market-tour', realSlug: 'testaccio-market-food-tour', category: 'street-food-classics', neighborhood: 'testaccio' },

  // --- pizza ---
  { seoSlug: 'pizza-al-taglio-suppli-tasting-tour', realSlug: 'pizza-al-taglio-suppli-tasting-tour', category: 'pizza', neighborhood: null },
  { seoSlug: 'trastevere-pizza-craft-beer-crawl', realSlug: 'trastevere-pizza-craft-beer-crawl', category: 'pizza', neighborhood: 'trastevere' },
  { seoSlug: 'roman-pizza-bianca-bakery-tour', realSlug: 'roman-pizza-bianca-bakery-tour', category: 'pizza', neighborhood: null },

  // --- pasta ---
  { seoSlug: 'pasta-making-class-trastevere', realSlug: 'pasta-making-class-trastevere', category: 'pasta', neighborhood: 'trastevere' },
  { seoSlug: 'cacio-e-pepe-carbonara-tasting-walk', realSlug: 'cacio-e-pepe-carbonara-tasting-walk', category: 'pasta', neighborhood: null },
  { seoSlug: 'roman-pasta-four-ways-dinner', realSlug: 'roman-pasta-four-ways-dinner', category: 'pasta', neighborhood: null },

  // --- beer & wine ---
  { seoSlug: 'rome-food-wine-tasting', realSlug: 'rome-food-wine-tasting', category: 'beer-and-wine', neighborhood: null },
  { seoSlug: 'monti-food-wine-evening', realSlug: 'monti-food-wine-evening', category: 'beer-and-wine', neighborhood: 'monti' },
  // trastevere-food-wine-walk is already covered above as trastevere-food-tour — not re-listed.

  // --- gelato ---
  { seoSlug: 'roman-gelato-tasting-walk', realSlug: 'roman-gelato-tasting-walk', category: 'gelato', neighborhood: null },
  { seoSlug: 'best-gelaterias-of-rome-tour', realSlug: 'best-gelaterias-of-rome-tour', category: 'gelato', neighborhood: null },
  { seoSlug: 'gelato-espresso-crawl', realSlug: 'gelato-espresso-crawl', category: 'gelato', neighborhood: null },

  // --- street food classics ---
  { seoSlug: 'suppli-roman-street-snacks-tour', realSlug: 'suppli-roman-street-snacks-tour', category: 'street-food-classics', neighborhood: null },
  { seoSlug: 'trapizzino-fried-classics-walk', realSlug: 'trapizzino-fried-classics-walk', category: 'street-food-classics', neighborhood: null },
  { seoSlug: 'testaccio-fried-food-crawl', realSlug: 'testaccio-fried-food-crawl', category: 'street-food-classics', neighborhood: 'testaccio' },

  // --- discovered in Firestore but missing from the blueprint's original 17-tour count ---
  { seoSlug: 'aperitivo-evening-experience', realSlug: 'aperitivo-evening-experience', category: 'beer-and-wine', neighborhood: null },
  { seoSlug: 'prati-neighborhood-food-crawl', realSlug: 'prati-neighborhood-food-crawl', category: 'street-food-classics', neighborhood: 'prati' },
];

export interface NetworkSiteDef {
  /** Two-digit display number, as given (starts at 02, not 01). */
  number: string;
  name: string;
  /** URL segment at /{slug} (top-level) — an internal placeholder page, not an external .com link. */
  slug: string;
}

/**
 * Sister properties in the same affiliate network. Each gets its own internal
 * placeholder page at /{slug} — no external .com links.
 */
export const NETWORK_SITES: NetworkSiteDef[] = [
  { number: '02', name: 'Underground Colosseum', slug: 'underground-colosseum' },
  { number: '03', name: 'Pompeii Day Trip', slug: 'pompeii-day-trip' },
  { number: '04', name: 'Rome Vespa', slug: 'rome-vespa' },
  { number: '05', name: 'Street Food Rome', slug: 'street-food-rome' },
  { number: '06', name: 'Tuscany Day Trip', slug: 'tuscany-day-trip' },
  { number: '07', name: 'Private Vatican', slug: 'private-vatican' },
  { number: '08', name: 'Golf Cart Rome', slug: 'golf-cart-rome' },
  { number: '09', name: 'Cooking in Rome', slug: 'cooking-in-rome' },
  { number: '10', name: 'Rome Pizza Class', slug: 'rome-pizza-class' },
  { number: '11', name: 'Tiramisu Class', slug: 'tiramisu-class' },
  { number: '12', name: 'Naples Street Food', slug: 'naples-street-food' },
  { number: '13', name: 'Amalfi Day Trip', slug: 'amalfi-day-trip' },
  { number: '14', name: 'Tivoli Day Trip', slug: 'tivoli-day-trip' },
];

/**
 * Property-specific tours and products for each network site. Each property
 * has its own unique offerings reflected in the Tours & Blog menu section.
 */
export interface PropertyTourItem {
  label: string;
  href: string;
}

export const PROPERTY_TOURS: Record<string, PropertyTourItem[]> = {
  'street-food-rome': [
    { label: 'All Tours', href: '/tours' },
    { label: 'Pizza Tours', href: '/tours/category/pizza' },
    { label: 'Pasta Tours', href: '/tours/category/pasta' },
    { label: 'Beer & Wine Tours', href: '/tours/category/beer-and-wine' },
    { label: 'Gelato Tours', href: '/tours/category/gelato' },
    { label: 'Street Food Classics', href: '/tours/category/street-food-classics' },
    { label: 'Blog', href: '/blog' },
  ],
  'underground-colosseum': [
    { label: 'All Tours', href: '/tours' },
    { label: 'Underground & Arena Floor Tour', href: '/money/underground-arena-floor-tour' },
    { label: 'Skip-the-Line Tickets', href: '/money/skip-the-line-colosseum-tickets' },
    { label: 'Private vs. Group Tour', href: '/money/private-vs-group-colosseum-tour' },
    { label: 'Family Guide', href: '/money/colosseum-with-kids-family-guide' },
    { label: 'Blog', href: '/blog' },
  ],
  'pompeii-day-trip': [
    { label: 'All Day Trips', href: '/tours' },
    { label: 'Pompeii from Rome', href: '/money/pompeii-from-rome' },
    { label: 'Pompeii from Naples', href: '/money/pompeii-from-naples' },
    { label: 'Pompeii + Vesuvius Combo', href: '/money/pompeii-vesuvius-combo' },
    { label: 'Pompeii + Herculaneum', href: '/money/pompeii-herculaneum' },
    { label: 'Blog', href: '/blog' },
  ],
  'rome-vespa': [
    { label: 'All Tours', href: '/tours' },
    { label: 'Vespa Tour of Rome', href: '/money/vespa-tour-of-rome' },
    { label: 'Sidecar Tour of Rome', href: '/money/sidecar-tour-of-rome' },
    { label: 'Self-Drive vs Guided Vespa', href: '/money/self-drive-vs-guided-vespa' },
    { label: 'Vespa at Sunset', href: '/money/vespa-at-sunset' },
    { label: 'Private Vespa Tour', href: '/money/private-vespa-tour' },
    { label: 'Blog', href: '/blog' },
  ],
  'tuscany-day-trip': [
    { label: 'All Day Trips', href: '/tours' },
    { label: 'Tuscany from Florence', href: '/money/tuscany-from-florence' },
    { label: 'Tuscany Wine Day Trip', href: '/money/tuscany-wine-day-trip' },
    { label: 'Siena + San Gimignano + Chianti', href: '/money/siena-san-gimignano-chianti' },
    { label: 'Florence-Base Day Trips', href: '/money/florence-base-day-trips' },
    { label: 'Blog', href: '/blog' },
  ],
  'private-vatican': [
    { label: 'All Tours', href: '/tours' },
    { label: 'Early-Entry Vatican & Sistine', href: '/money/early-entry-vatican-sistine' },
    { label: 'Private Vatican Guide', href: '/money/private-vatican-guide' },
    { label: "Vatican + St Peter's Dome", href: '/money/vatican-st-peter-s-dome' },
    { label: 'Vatican with Kids / Family', href: '/money/vatican-with-kids-family' },
    { label: 'Skip-the-Line Explained', href: '/money/skip-the-line-explained' },
    { label: 'Blog', href: '/blog' },
  ],
  'golf-cart-rome': [
    { label: 'All Tours', href: '/tours' },
    { label: 'Golf-Cart Tour of Rome', href: '/money/golf-cart-tour-of-rome' },
    { label: 'Private Cart Tour', href: '/money/private-cart-tour' },
    { label: 'Cart Tour for Families & Seniors', href: '/money/cart-tour-for-families-seniors' },
    { label: 'Night Cart Tour', href: '/money/night-cart-tour' },
    { label: 'Cart vs Walking Tour', href: '/money/cart-vs-walking-tour' },
    { label: 'Blog', href: '/blog' },
  ],
  'cooking-in-rome': [
    { label: 'All Classes', href: '/tours' },
    { label: 'Best Rome Cooking Classes', href: '/money/best-rome-cooking-classes' },
    { label: 'Pasta-Making Class', href: '/money/pasta-making-class' },
    { label: 'Pizza + Gelato Class', href: '/money/pizza-gelato-class' },
    { label: 'Market-to-Table Class', href: '/money/market-to-table-class' },
    { label: 'Private / Small-Group Class', href: '/money/private-small-group-class' },
    { label: 'Blog', href: '/blog' },
  ],
  'rome-pizza-class': [
    { label: 'All Classes', href: '/tours' },
    { label: 'Rome Pizza-Making Class', href: '/rome-pizza-making-class' },
    { label: 'Pizza + Gelato Combo', href: '/money/pizza-gelato-combo' },
    { label: 'Family Pizza Class', href: '/family-pizza-class' },
    { label: 'Private Pizza Class', href: '/private-pizza-class' },
    { label: 'Blog', href: '/blog' },
  ],
  'tiramisu-class': [
    { label: 'All Classes', href: '/tours' },
    { label: 'Rome Tiramisù Class', href: '/rome-tiramisu-class' },
    { label: 'Dessert-Making Class', href: '/dessert-making-class' },
    { label: 'Tiramisù + Gelato Combo', href: '/tiramisu-gelato-combo' },
    { label: 'Private Dessert Class', href: '/private-dessert-class' },
    { label: 'Blog', href: '/blog' },
  ],
  'naples-street-food': [
    { label: 'All Tours', href: '/tours' },
    { label: 'Naples Street-Food Tour', href: '/naples-street-food-tour' },
    { label: 'Pizza-Focused Food Tour', href: '/pizza-focused-food-tour' },
    { label: 'Naples Market Tour', href: '/naples-market-tour' },
    { label: 'Spaccanapoli Food Walk', href: '/spaccanapoli-food-walk' },
    { label: 'Blog', href: '/blog' },
  ],
  'amalfi-day-trip': [
    { label: 'All Day Trips', href: '/tours' },
    { label: 'Amalfi from Rome', href: '/amalfi-from-rome' },
    { label: 'Amalfi from Sorrento', href: '/amalfi-from-naples-sorrento' },
    { label: 'Positano, Amalfi & Ravello', href: '/positano-amalfi-ravello' },
    { label: 'Amalfi Boat Day Trip', href: '/amalfi-boat-day-trip' },
    { label: 'Blog', href: '/blog' },
  ],
  'tivoli-day-trip': [
    { label: 'All Day Trips', href: '/tours' },
    { label: 'Tivoli from Rome', href: '/money/tivoli-from-rome' },
    { label: "Villa d'Este & Hadrian's Villa", href: '/villa-d-este-hadrian-s-villa' },
    { label: 'Private Tivoli Tour', href: '/private-tivoli-tour' },
    { label: 'Half-Day Tivoli', href: '/half-day-tivoli' },
    { label: 'Blog', href: '/blog' },
  ],
};

/**
 * Only this one network property is wired up to actually render the full
 * site — a single live test case while the other 12 are separate, not-yet-
 * built projects. Their routes (root and any sub-path) show a plain
 * "under construction" placeholder instead of loading this site's content.
 */
export const ACTIVE_NETWORK_SLUG = 'street-food-rome';

export function getNetworkSite(slug: string): NetworkSiteDef | undefined {
  return NETWORK_SITES.find((s) => s.slug === slug);
}

export interface LandmarkDef {
  slug: string;
  name: string;
}

/**
 * The 10 pure Rome landmarks that aren't tied to any of the 10 NEIGHBORHOODS
 * hubs above (no dedicated hub page exists or is planned for them, per the
 * no-new-routes constraint). Used only to look up a blog post to link to from
 * ExploreLinksSection's "Top Attractions" tab, so these items are never
 * inert unlinked text.
 */
export const LANDMARKS: LandmarkDef[] = [
  { slug: 'trevi-fountain', name: 'Trevi Fountain' },
  { slug: 'pantheon', name: 'Pantheon' },
  { slug: 'piazza-navona', name: 'Piazza Navona' },
  { slug: 'colosseum', name: 'Colosseum' },
  { slug: 'vatican-museums', name: 'Vatican Museums' },
  { slug: 'spanish-steps', name: 'Spanish Steps' },
  { slug: 'villa-borghese', name: 'Villa Borghese' },
  { slug: 'circus-maximus', name: 'Circus Maximus' },
  { slug: 'piazza-del-popolo', name: 'Piazza del Popolo' },
  { slug: 'via-del-corso', name: 'Via del Corso' },
];


/** First published blog post tagged with this landmark's slug, if any. */
export function getBlogPostForLandmark(posts: BlogPostDoc[], landmarkSlug: string): BlogPostDoc | undefined {
  return posts.find((p) => p.landmarkSlug === landmarkSlug);
}

export function getCategory(slug: string): CategoryDef | undefined {
  return CATEGORIES.find((c) => c.slug === slug);
}

export function getNeighborhood(slug: string): NeighborhoodDef | undefined {
  return NEIGHBORHOODS.find((n) => n.slug === slug);
}

export function getTourEntryBySeoSlug(seoSlug: string): TourRegistryEntry | undefined {
  return TOURS.find((t) => t.seoSlug === seoSlug);
}

export function getTourEntryByRealSlug(realSlug: string): TourRegistryEntry | undefined {
  return TOURS.find((t) => t.realSlug === realSlug);
}

/** SEO URL (/tours/{seoSlug}) for a Firestore tour doc, given its real slug. */
export function tourHref(realSlug: string): string {
  const entry = getTourEntryByRealSlug(realSlug);
  return entry ? `/tours/${entry.seoSlug}` : '/tours';
}

/**
 * "You might also like" — 2-4 tours sharing the current tour's niche or
 * neighbourhood, sourced from the full Firestore tour list rather than a
 * hardcoded trio. Falls back to any other tours if nothing matches so a
 * page never ships with an empty rail.
 */
export function getRelatedTours(allTours: TourDoc[], current: TourDoc, max = 4): { title: string; href: string }[] {
  const currentEntry = getTourEntryByRealSlug(current.slug);
  const others = allTours.filter((t) => t.slug !== current.slug);

  // Tier 1: strict AND — same category AND same neighbourhood. This is the
  // most relevant possible match, but only ~7 of 19 tours have a neighbourhood
  // populated at all, so requiring both would starve most tour pages down to
  // 0-1 results. Try it first; only fall back to the weighted OR scoring
  // below when it can't fill out a useful rail (< 2 results).
  const strictMatches = currentEntry?.neighborhood
    ? others.filter((t) => {
        const entry = getTourEntryByRealSlug(t.slug);
        return entry?.category === currentEntry.category && entry?.neighborhood === currentEntry.neighborhood;
      })
    : [];

  if (strictMatches.length >= 2) {
    return strictMatches.slice(0, max).map((tour) => ({ title: tour.title, href: tourHref(tour.slug) }));
  }

  const scored = others
    .map((t) => {
      const entry = getTourEntryByRealSlug(t.slug);
      let score = 0;
      if (currentEntry && entry) {
        if (currentEntry.neighborhood && entry.neighborhood === currentEntry.neighborhood) score += 2;
        if (entry.category === currentEntry.category) score += 1;
      }
      return { tour: t, score };
    })
    .filter((entry) => entry.score > 0)
    .sort((a, b) => b.score - a.score);

  const chosen = scored.length > 0 ? scored : others.map((tour) => ({ tour, score: 0 }));

  return chosen.slice(0, Math.max(2, Math.min(max, chosen.length))).map(({ tour }) => ({
    title: tour.title,
    href: tourHref(tour.slug),
  }));
}

/** Keyword aliases used only as a fallback for neighbourhood matching, below. */
const NEIGHBORHOOD_KEYWORDS: Record<string, string[]> = {
  trastevere: ['trastevere'],
  testaccio: ['testaccio'],
  'jewish-ghetto': ['jewish ghetto', 'ghetto'],
  'campo-de-fiori': ["campo de' fiori", 'campo de fiori'],
  monti: ['monti'],
  prati: ['prati'],
  'san-lorenzo': ['san lorenzo'],
  pigneto: ['pigneto'],
  trionfale: ['trionfale'],
  garbatella: ['garbatella'],
};

/**
 * Tours set in a given neighbourhood. Most Firestore tour docs don't have
 * `neighborhood` populated yet, so this checks (in order): the doc's own
 * `neighborhood` field, this registry's `neighborhood` for the tour, and —
 * as a last resort — a keyword match against the tour's title/niche. That
 * fallback is why a neighbourhood with no tours mentioning it by name (e.g.
 * Prati, San Lorenzo, Pigneto, Trionfale, Garbatella today) can legitimately
 * come back empty until real data or copy fills the gap.
 */
export function getToursForNeighborhood(allTours: TourDoc[], neighborhoodSlug: string, max = 4): TourDoc[] {
  const keywords = NEIGHBORHOOD_KEYWORDS[neighborhoodSlug] ?? [];

  const matches = allTours.filter((tour) => {
    const entry = getTourEntryByRealSlug(tour.slug);
    if (tour.neighborhood === neighborhoodSlug) return true;
    if (entry?.neighborhood === neighborhoodSlug) return true;
    const haystack = tour.title.toLowerCase();
    return keywords.some((kw) => haystack.includes(kw));
  });

  return matches.slice(0, max);
}

/**
 * Get property-specific tours and blog items for a network site.
 * Each property has its own unique offerings in the Tours & Blog menu.
 */
export function getPropertyToursAndBlog(networkSiteSlug: string): PropertyTourItem[] {
  return PROPERTY_TOURS[networkSiteSlug] ?? PROPERTY_TOURS['street-food-rome']!;
}
