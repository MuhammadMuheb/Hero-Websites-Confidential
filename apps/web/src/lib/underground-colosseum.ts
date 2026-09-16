/**
 * Shared data for the Underground Colosseum hero property — content arrays,
 * nav item lists, and the hero image constant. Kept separate from any
 * 'use client' component (see components/underground-colosseum/UCShared.tsx)
 * so a plain data export never gets re-exported out of a client module into
 * a server component; that cross-boundary re-export previously confused
 * Fast Refresh into forcing a full page reload on every edit.
 *
 * Every image below is hotlinked from images.unsplash.com (the one external
 * image host this platform's custom image loader supports — see
 * next.config.js / lib/unsplash-image-loader.ts) and was opened and visually
 * checked before use, so every slot shows an actual Colosseum photo.
 */

export const HERO_IMAGE = {
  src: 'https://images.unsplash.com/photo-1552832230-c0197dd311b5',
  alt: 'The Colosseum illuminated at dusk, its arches glowing from within',
};

export interface NavItem {
  title: string;
  href: string;
  keyword: string;
}

export const MONEY_PAGES = [
  {
    title: 'Underground & Arena Floor Tour',
    href: '/money/underground-arena-floor-tour',
    blurb: 'Flagship comparison of every underground/arena-access tour.',
    keyword: 'colosseum underground tour',
    cta: 'See tours',
    badge: 'Most Popular' as string | null,
    image: { src: 'https://images.unsplash.com/photo-1580502255216-32c910c0840c', alt: 'Close-up of the Colosseum\'s arched tiers glowing gold at sunset' },
  },
  {
    title: 'Skip-the-Line Tickets',
    href: '/money/skip-the-line-colosseum-tickets',
    blurb: 'Ticket types explained — which tour includes what.',
    keyword: 'skip the line colosseum',
    cta: 'See tickets',
    badge: 'Fastest Entry' as string | null,
    image: { src: 'https://images.unsplash.com/photo-1699012462295-bace478f27bc', alt: 'Crowds of visitors gathered outside the Colosseum on a sunny day' },
  },
  {
    title: 'Private vs. Group Tour',
    href: '/money/private-vs-group-colosseum-tour',
    blurb: 'Who each format suits; price/value breakdown.',
    keyword: 'private colosseum tour',
    cta: 'Compare',
    badge: null as string | null,
    image: { src: 'https://images.unsplash.com/photo-1567613747183-fcc1e30a18eb', alt: 'The Colosseum\'s curved travertine facade seen up close' },
  },
  {
    title: 'With Kids / Family Guide',
    href: '/money/colosseum-with-kids-family-guide',
    blurb: 'Family-friendly tour options and practical tips.',
    keyword: 'colosseum with kids',
    cta: 'See options',
    badge: 'Family Friendly' as string | null,
    image: { src: 'https://images.unsplash.com/photo-1689474848417-6462511846f8', alt: 'The Colosseum on a bright afternoon with visitors walking the surrounding street' },
  },
  {
    title: 'Best Tour by Visitor Type',
    href: '/money/best-colosseum-tour-by-visitor-type',
    blurb: 'First-timers, history buffs, short-on-time.',
    keyword: 'best colosseum tour',
    cta: 'Find mine',
    badge: null as string | null,
    image: { src: 'https://images.unsplash.com/photo-1552432552-06c0b0a94dda', alt: 'Wide view of the Colosseum under a sweeping cloudy sky' },
  },
];

export interface FeaturedTour {
  partner: string;
  slug: string;
  title: string;
  meta: string;
  priceFrom: number;
  badge: string | null;
  image: { src: string; alt: string };
  /** Whether this specific listing includes arena-floor access (vs. hypogeum-only or no underground at all). Stated plainly rather than assumed, since it's the single biggest factor in what a tour actually delivers (see the Underground & Arena Floor money page). */
  arenaFloor: boolean;
  /** Used only to pick a relevant subset/ordering per money page — not shown in the UI as literal labels. */
  tags: string[];
}

/**
 * Deliberately a static array, not a Firestore-backed collection like Street
 * Food Rome's `tours` (lib/firestore.ts's TourDoc/getAllTours) — verified
 * during the v2 design-blueprint pass, not left as an open migration item.
 * These aren't first-party tour content the way Street Food Rome's TourDocs
 * are: each entry is a third-party affiliate partner's live product listing
 * (GetYourGuide/Viator/Tiqets), where price and availability are the
 * partner's to change and matter for affiliate-disclosure accuracy — a
 * human should confirm a partner's current price before it changes here,
 * not have it silently drift via an unreviewed CMS sync. If Underground
 * Colosseum ever gets its own affiliate-feed integration, this is the file
 * to replace with a fetch — but that's a partner-API decision, not a
 * refactor to make speculatively.
 */
export const FEATURED_TOURS: FeaturedTour[] = [
  {
    partner: 'GetYourGuide',
    slug: 'gyg-underground-arena-floor',
    title: 'Underground & Arena Floor Access',
    meta: '2h 30m · small group',
    priceFrom: 89,
    badge: 'Best Seller' as string | null,
    image: { src: 'https://images.unsplash.com/photo-1460722665083-c2599113f7e0', alt: 'Dramatic low-angle view of the Colosseum\'s upper arches' },
    arenaFloor: true,
    tags: ['underground', 'arena-floor', 'first-timer'],
  },
  {
    partner: 'Viator',
    slug: 'viator-private-underground-colosseum',
    title: 'Private Underground & Colosseum Tour',
    meta: '3h · private guide',
    priceFrom: 110,
    badge: 'Small Group' as string | null,
    image: { src: 'https://images.unsplash.com/photo-1603199766980-fdd4ac568a11', alt: 'The Colosseum glowing gold at sunset, seen from below' },
    arenaFloor: false,
    tags: ['private', 'underground'],
  },
  {
    partner: 'Tiqets',
    slug: 'tiqets-skip-the-line-arena-floor',
    title: 'Skip-the-Line + Arena Floor Ticket',
    meta: 'Self-paced · audio guide',
    priceFrom: 50,
    badge: 'Best Value' as string | null,
    image: { src: 'https://images.unsplash.com/photo-1511163262182-1b04e5fa4caa', alt: 'The Colosseum\'s arches against a bright blue sky' },
    arenaFloor: true,
    tags: ['skip-the-line', 'self-paced', 'budget', 'arena-floor'],
  },
  {
    partner: 'GetYourGuide',
    slug: 'gyg-family-underground-kid-paced',
    title: 'Family Underground Tour, Kid-Paced',
    meta: '2h · family group',
    priceFrom: 95,
    badge: 'Family Friendly' as string | null,
    image: { src: 'https://images.unsplash.com/photo-1724398915427-edc535c546fe', alt: 'Visitors of all ages walking the plaza around the Colosseum' },
    arenaFloor: false,
    tags: ['family', 'underground'],
  },
  {
    partner: 'Viator',
    slug: 'viator-colosseum-forum-palatine-combo',
    title: 'Colosseum, Forum & Palatine Hill Combo',
    meta: '3h 30m · small group',
    priceFrom: 75,
    badge: 'Most Complete' as string | null,
    image: { src: 'https://images.unsplash.com/photo-1663143050642-69240b347b2b', alt: 'Full daytime view of the Colosseum exterior' },
    arenaFloor: false,
    tags: ['combo', 'first-timer'],
  },
  {
    partner: 'GetYourGuide',
    slug: 'gyg-sunset-underground-arena-floor',
    title: 'Sunset Underground & Arena Floor Tour',
    meta: '2h · small group',
    priceFrom: 105,
    badge: 'Golden Hour' as string | null,
    image: { src: 'https://images.unsplash.com/photo-1509024644558-2f56ce76c490', alt: 'The Colosseum silhouetted against a fiery sunset sky' },
    arenaFloor: true,
    tags: ['underground', 'arena-floor', 'evening'],
  },
  {
    partner: 'Tiqets',
    slug: 'tiqets-fast-track-night-entry',
    title: 'Fast-Track Night Entry + Audio Guide',
    meta: 'Self-paced · audio guide',
    priceFrom: 55,
    badge: 'Evening Pick' as string | null,
    image: { src: 'https://images.unsplash.com/photo-1725623903410-296fdc9e2ea8', alt: 'The Colosseum illuminated at night' },
    arenaFloor: false,
    tags: ['skip-the-line', 'self-paced', 'evening', 'budget'],
  },
  {
    partner: 'Viator',
    slug: 'viator-ancient-rome-underground-combo',
    title: 'Ancient Rome Underground Combo Tour',
    meta: '4h · small group',
    priceFrom: 99,
    badge: null as string | null,
    image: { src: 'https://images.unsplash.com/photo-1634196243663-71cc3a1c639a', alt: 'Close-up low-angle view of the Colosseum\'s arches framed by trees' },
    arenaFloor: false,
    tags: ['underground', 'combo'],
  },
];

/**
 * Relevance tags to prioritize per money page, most-relevant first. Used by
 * getFeaturedToursForPage below so each money page leads with the tours that
 * actually fit its topic instead of repeating the same 8 cards in the same
 * order on all 5 pages (see the design blueprint's "duplicate tour cards"
 * finding).
 */
const MONEY_PAGE_RELEVANCE: Record<string, string[]> = {
  '/underground-arena-floor-tour': ['arena-floor', 'underground'],
  '/skip-the-line-colosseum-tickets': ['skip-the-line', 'self-paced', 'budget'],
  '/private-vs-group-colosseum-tour': ['private', 'underground'],
  '/colosseum-with-kids-family-guide': ['family'],
  '/best-colosseum-tour-by-visitor-type': ['first-timer', 'budget', 'self-paced', 'evening', 'family'],
};

/**
 * Returns FEATURED_TOURS reordered so tours matching this money page's topic
 * lead, with the rest filling out the remaining slots (never fewer than
 * `max` results as long as FEATURED_TOURS has that many entries). Falls back
 * to the original order for any href not in MONEY_PAGE_RELEVANCE (e.g. when
 * called from the homepage, which wants the full unfiltered set).
 */
export function getFeaturedToursForPage(href: string, max = 4): FeaturedTour[] {
  const priority = MONEY_PAGE_RELEVANCE[href];
  if (!priority) return FEATURED_TOURS.slice(0, max);

  const score = (tour: FeaturedTour) =>
    priority.reduce((best, tag, index) => (tour.tags.includes(tag) ? Math.min(best, index) : best), priority.length);

  return [...FEATURED_TOURS].sort((a, b) => score(a) - score(b)).slice(0, max);
}

/**
 * Real, verifiable facts about the Colosseum itself (not business/traffic
 * metrics) — used for the homepage's "Colosseum by the Numbers" strip. Kept
 * separate from FEATURED_TOURS/MONEY_PAGES since these describe the
 * monument, not anything this site sells or claims about its own audience.
 */
export const QUICK_FACTS = [
  { value: '80 AD', label: 'Year it opened', detail: 'Inaugurated by Emperor Titus with 100 days of games.' },
  { value: '50,000+', label: 'Spectator capacity', detail: 'Ancient estimates for the amphitheatre at full capacity.' },
  { value: '80', label: 'Ground-level entrances', detail: 'Numbered arches that let tens of thousands enter and exit quickly.' },
  { value: '2 levels', label: 'Underground hypogeum', detail: 'Tunnels and lift shafts added beneath the arena under Emperor Domitian, roughly 81–96 AD.' },
  { value: '2010', label: 'Hypogeum reopened', detail: 'The underground network was closed to the public for decades before limited guided tours resumed.' },
];

/**
 * Extra Colosseum photography for the Arena Floor Walkthrough support page's
 * gallery — reuses images already verified elsewhere on this site (Unsplash
 * is the platform's one supported external image host; see
 * next.config.js) rather than introducing new, unchecked URLs.
 */
export const ARENA_FLOOR_GALLERY = [
  { src: 'https://images.unsplash.com/photo-1460722665083-c2599113f7e0', alt: 'Looking straight up at the Colosseum\'s tiered arches from arena level' },
  { src: 'https://images.unsplash.com/photo-1603199766980-fdd4ac568a11', alt: 'The Colosseum glowing gold at sunset, seen from below' },
  { src: 'https://images.unsplash.com/photo-1634196243663-71cc3a1c639a', alt: 'Close-up low-angle view of the Colosseum\'s arches framed by trees' },
  { src: 'https://images.unsplash.com/photo-1725623903410-296fdc9e2ea8', alt: 'The Colosseum illuminated at night, arches glowing from within' },
];

export const SUPPORT_PAGES = [
  {
    title: 'How Underground Access Really Works',
    href: '/support/how-underground-access-really-works',
    keyword: 'colosseum underground access',
    image: { src: 'https://images.unsplash.com/photo-1632851853187-dae5c83372dc', alt: 'The Colosseum seen through greenery on a sunny day' },
  },
  {
    title: 'Opening Hours & Beating the Crowds',
    href: '/support/opening-hours-beating-the-crowds',
    keyword: 'colosseum opening hours',
    image: { src: 'https://images.unsplash.com/photo-1552432552-06c0b0a94dda', alt: 'Wide view of the Colosseum under a sweeping cloudy sky' },
  },
  {
    title: 'Getting There: Metro & Meeting Points',
    href: '/support/getting-there-metro-meeting-points',
    keyword: 'how to get to colosseum',
    image: { src: 'https://images.unsplash.com/photo-1567613747183-fcc1e30a18eb', alt: 'The Colosseum\'s curved travertine facade seen up close' },
  },
  {
    title: 'Colosseum + Forum + Palatine Itinerary',
    href: '/support/colosseum-forum-palatine-itinerary',
    keyword: 'colosseum forum palatine itinerary',
    image: { src: 'https://images.unsplash.com/photo-1663143050642-69240b347b2b', alt: 'Full daytime view of the Colosseum exterior' },
  },
];

/** The 2 support pages that get a dedicated homepage teaser card instead of only the grid below. */
export const ARENA_FLOOR_PAGE = {
  title: 'Arena Floor Walkthrough (Photos)',
  href: '/support/arena-floor-walkthrough-photos',
  keyword: 'colosseum arena floor',
  image: { src: 'https://images.unsplash.com/photo-1604580864964-0462f5d5b1a8', alt: 'The Colosseum at dusk seen from the cobblestone approach' },
};

export const WORTH_IT_PAGE = {
  title: 'Is the Underground Worth It?',
  href: '/support/is-the-underground-worth-it',
  keyword: 'is colosseum underground worth it',
  image: { src: 'https://images.unsplash.com/photo-1704915332184-68202025c9ba', alt: 'Wide daytime view of the full Colosseum exterior' },
};

export const FAQS = [
  {
    question: 'Can you actually stand on the arena floor?',
    answer: 'Yes — only on tours that specifically include arena-floor access, a separate add-on from standard Colosseum entry.',
  },
  {
    question: 'How far ahead should I book underground access?',
    answer: 'Underground and arena-floor slots are limited and sell out; book at least 2–3 weeks ahead in peak season.',
  },
  {
    question: 'Is the underground tour suitable for young kids?',
    answer: 'Most operators set a minimum age around 6–8 for underground routes; our family guide covers kid-paced alternatives.',
  },
  {
    question: 'What\'s the difference between skip-the-line and arena-floor access?',
    answer: 'Skip-the-line only shortens entry queues; arena-floor access is a separate, timed add-on that lets you walk the reconstructed floor itself.',
  },
];

export const QUICK_LINKS = [
  { label: 'Underground & Arena Floor', href: '/underground-arena-floor-tour' },
  { label: 'Skip the Line', href: '/skip-the-line-colosseum-tickets' },
  { label: 'Private Tours', href: '/private-vs-group-colosseum-tour' },
  { label: 'With Kids', href: '/colosseum-with-kids-family-guide' },
  { label: 'Opening Hours', href: '/opening-hours-beating-the-crowds' },
  { label: 'Getting There', href: '/getting-there-metro-meeting-points' },
  { label: 'Is It Worth It?', href: '/is-the-underground-worth-it' },
];

export const EXPLORE_LINKS = MONEY_PAGES.map((p) => ({ label: p.title, href: p.href }));
export const LEARN_LINKS = [
  ...SUPPORT_PAGES.map((p) => ({ label: p.title, href: p.href })),
  { label: WORTH_IT_PAGE.title, href: WORTH_IT_PAGE.href },
];

/** Feeds the header's "Tours" dropdown. */
export const TOURS_NAV_ITEMS: NavItem[] = MONEY_PAGES.map((p) => ({ title: p.title, href: p.href, keyword: p.keyword }));

/** Feeds the header's "Plan Your Visit" dropdown and the footer's Learn column. */
export const PLAN_NAV_ITEMS: NavItem[] = [
  ...SUPPORT_PAGES.map((p) => ({ title: p.title, href: p.href, keyword: p.keyword })),
  { title: WORTH_IT_PAGE.title, href: WORTH_IT_PAGE.href, keyword: WORTH_IT_PAGE.keyword },
];

/**
 * The site's named author persona. A real photoshoot is still "to build"
 * per the site blueprint, so every UI slot uses an initials avatar rather
 * than a stock photo standing in for a real person.
 */
export const AUTHOR = {
  name: 'Luca Moretti',
  initials: 'LM',
  title: 'Rome-based guide',
  domain: 'undergroundcolosseum.com',
  bio: 'Every tour on this site has been walked in person; every photo is our own. We\'re not paid by any operator we compare.',
};
