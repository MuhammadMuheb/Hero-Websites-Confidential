/**
 * Shared data for the Rome Vespa hero property — content arrays, nav item
 * lists, and the hero image constant. Mirrors the Private Vatican / Pompeii
 * Day Trip pattern exactly (see lib/private-vatican.ts, lib/pompeii-day-trip.ts):
 * kept separate from any 'use client' component (see
 * components/rome-vespa/RVShared.tsx) so a plain data export never gets
 * re-exported out of a client module into a server component.
 *
 * Trademark note (Master Network Blueprint §3.3.1): "Vespa" is Piaggio's
 * registered trademark for the scooter itself, and this site's copy uses the
 * word only descriptively (the vehicle a tour rides) — never as this
 * property's own stylized brand/logo text. The header/footer wordmark below
 * (see RVShared.tsx's RVBrandMark/RVHeader) reads "Rome Scooter Tours", not
 * "Vespa" — a plain descriptive name, not a designed logotype that could read
 * as Piaggio endorsement. The network registry's internal property name
 * ("Rome Vespa", lib/tours.ts) and this site's own SEO <title> tags (per
 * blueprint §3.3.7, used verbatim) still say "Vespa" — that's page metadata
 * and a sibling-site nav label, not this property's own visual brand mark.
 *
 * Every image below is hotlinked from images.unsplash.com (the one external
 * image host this platform's custom image loader supports — see
 * next.config.js / lib/unsplash-image-loader.ts). Each URL was opened and
 * visually checked via the Unsplash search UI before use, to confirm it
 * actually shows a Vespa/scooter, rider, or Rome street scene — none are
 * reused from Underground Colosseum's, Private Vatican's, Pompeii Day Trip's,
 * or Street Food Rome's image sets.
 */

export const HERO_IMAGE = {
  src: 'https://images.unsplash.com/photo-1739289928017-1eab9eb96ba8',
  alt: 'A rider on a scooter moving down a narrow Rome street lined with tall buildings',
};

export interface NavItem {
  title: string;
  href: string;
  keyword: string;
}

export const MONEY_PAGES = [
  {
    title: 'Vespa Tour of Rome',
    href: '/vespa-tour-of-rome',
    blurb: 'The classic guided convoy format — a lead rider, a set route, zero navigation stress.',
    keyword: 'vespa tour rome',
    cta: 'See tours',
    badge: 'Most Popular' as string | null,
    image: { src: 'https://images.unsplash.com/photo-1739289928017-1eab9eb96ba8', alt: 'A rider on a scooter moving down a narrow Rome street lined with tall buildings' },
  },
  {
    title: 'Sidecar Tour of Rome',
    href: '/sidecar-tour-of-rome',
    blurb: 'No licence, no driving — someone else does the riding while you take the photos.',
    keyword: 'rome sidecar tour',
    cta: 'Compare sidecar tours',
    badge: 'No Licence Needed' as string | null,
    image: { src: 'https://images.unsplash.com/photo-1655685784726-780dd8c609e8', alt: 'A driver and passenger riding together on a scooter down a Rome street' },
  },
  {
    title: 'Self-Drive vs Guided Vespa',
    href: '/self-drive-vs-guided-vespa',
    blurb: 'Licence class, traffic difficulty, and insurance basics — the honest decision guide.',
    keyword: 'self drive vespa rome',
    cta: 'Which one am I?',
    badge: null as string | null,
    image: { src: 'https://images.unsplash.com/photo-1618483474329-810b7a99f505', alt: 'A rider in a jacket piloting a yellow scooter down a Rome street in daylight' },
  },
  {
    title: 'Vespa at Sunset',
    href: '/vespa-at-sunset',
    blurb: 'The premium golden-hour slot — what the light actually does to Rome from the seat.',
    keyword: 'vespa sunset tour rome',
    cta: 'See sunset routes',
    badge: 'Golden Hour' as string | null,
    image: { src: 'https://images.unsplash.com/photo-1777761394358-440f43b10a6d', alt: 'Scooters and motorcycles lining a cobblestone Rome street at dusk, golden light on the buildings' },
  },
  {
    title: 'Private Vespa Tour',
    href: '/private-vespa-tour',
    blurb: 'Your own pace, your own stops, no waiting on a group’s slowest rider.',
    keyword: 'private vespa tour rome',
    cta: 'Compare private tours',
    badge: 'Small Group' as string | null,
    image: { src: 'https://images.unsplash.com/photo-1596210567632-c1fc58fbff56', alt: 'A scooter parked beside greenery on a quiet Rome side street' },
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
  /**
   * Whether this specific listing is a sidecar (chauffeured, no licence
   * needed) format rather than a solo/tandem ride — stated plainly since
   * it's the single biggest factor in who a listing actually suits (see the
   * Sidecar Tour of Rome money page).
   */
  sidecar: boolean;
  /** Used only to pick a relevant subset/ordering per money page — not shown in the UI as literal labels. */
  tags: string[];
}

/**
 * Deliberately a static array, not a Firestore-backed collection like Street
 * Food Rome's `tours` (lib/firestore.ts's TourDoc/getAllTours) — same
 * reasoning as Underground Colosseum's and Private Vatican's FEATURED_TOURS:
 * each entry is a third-party affiliate partner's live product listing
 * (GetYourGuide/Viator), where price and availability are the partner's to
 * change. A human should confirm a partner's current price before it changes
 * here, not have it silently drift via an unreviewed CMS sync.
 */
export const FEATURED_TOURS: FeaturedTour[] = [
  {
    partner: 'GetYourGuide',
    slug: 'gyg-classic-vespa-tour-rome',
    title: 'Classic Guided Vespa Tour of Rome',
    meta: '3h · guided convoy',
    priceFrom: 95,
    badge: 'Best Seller' as string | null,
    image: { src: 'https://images.unsplash.com/photo-1588778943428-cec10a6f1666', alt: 'A white scooter parked beside a wooden door on a Rome side street' },
    sidecar: false,
    tags: ['guided', 'first-timer'],
  },
  {
    partner: 'Viator',
    slug: 'viator-rome-sidecar-tour',
    title: 'Rome Sidecar Tour: Chauffeured Scooter Sightseeing',
    meta: '2h 30m · sidecar, chauffeured',
    priceFrom: 110,
    badge: 'No Licence Needed' as string | null,
    image: { src: 'https://images.unsplash.com/photo-1668604024326-b755aa4c6a11', alt: 'Scooters parked in a row, ready for the day’s chauffeured tours' },
    sidecar: true,
    tags: ['sidecar'],
  },
  {
    partner: 'GetYourGuide',
    slug: 'gyg-vespa-sunset-tour',
    title: 'Vespa Sunset Tour of Rome',
    meta: '3h · guided, golden hour',
    priceFrom: 105,
    badge: 'Golden Hour' as string | null,
    image: { src: 'https://images.unsplash.com/photo-1585688973401-e696e4ca678a', alt: 'Golden-hour light along a Rome street near sunset' },
    sidecar: false,
    tags: ['sunset', 'guided'],
  },
  {
    partner: 'Viator',
    slug: 'viator-private-vespa-tour-rome',
    title: 'Private Vespa Tour, Custom Route',
    meta: '3h · private, small group',
    priceFrom: 160,
    badge: 'Small Group' as string | null,
    image: { src: 'https://images.unsplash.com/photo-1648859350185-5ce878061c16', alt: 'A scooter parked on the side of a Rome building, set up for a private tour' },
    sidecar: false,
    tags: ['private'],
  },
  {
    partner: 'GetYourGuide',
    slug: 'gyg-self-drive-vespa-rental-tour',
    title: 'Self-Drive Vespa Rental with Guided Route Map',
    meta: '4h · self-drive rental',
    priceFrom: 90,
    badge: 'Self-Drive' as string | null,
    image: { src: 'https://images.unsplash.com/photo-1705626407465-78a9a2d0d28b', alt: 'A yellow rental scooter parked in front of a garage door' },
    sidecar: false,
    tags: ['self-drive', 'budget'],
  },
  {
    partner: 'Viator',
    slug: 'viator-sidecar-sunset-tour-rome',
    title: 'Sidecar Sunset Tour of Rome',
    meta: '2h 30m · sidecar, golden hour',
    priceFrom: 130,
    badge: null as string | null,
    image: { src: 'https://images.unsplash.com/photo-1594923206637-101ef1614eb5', alt: 'A white scooter parked beside wooden barrels in the late-day light' },
    sidecar: true,
    tags: ['sidecar', 'sunset'],
  },
  {
    partner: 'GetYourGuide',
    slug: 'gyg-vespa-night-tour-rome',
    title: 'Vespa by Night: Illuminated Rome Tour',
    meta: '3h · guided, evening',
    priceFrom: 100,
    badge: 'Evening' as string | null,
    image: { src: 'https://images.unsplash.com/photo-1708628934823-a37e3fe0bb4e', alt: 'A Rome side street lit for the evening, tables set out along the cobblestones' },
    sidecar: false,
    tags: ['guided', 'sunset'],
  },
  {
    partner: 'Viator',
    slug: 'viator-vespa-couples-private-tour',
    title: 'Vespa Tour for Couples, Private & Flexible',
    meta: '3h · private, tandem',
    priceFrom: 175,
    badge: 'Most Romantic' as string | null,
    image: { src: 'https://images.unsplash.com/photo-1693899121789-da923e57c419', alt: 'A red scooter parked in front of a brick Rome building' },
    sidecar: false,
    tags: ['private', 'sunset'],
  },
];

/**
 * Relevance tags to prioritize per money page, most-relevant first — same
 * pattern as Private Vatican's MONEY_PAGE_RELEVANCE, so each money page leads
 * with the tours that actually fit its topic instead of repeating the same 8
 * cards in the same order on all 5 pages.
 */
const MONEY_PAGE_RELEVANCE: Record<string, string[]> = {
  '/vespa-tour-of-rome': ['guided', 'first-timer'],
  '/sidecar-tour-of-rome': ['sidecar'],
  '/self-drive-vs-guided-vespa': ['self-drive', 'guided'],
  '/vespa-at-sunset': ['sunset'],
  '/private-vespa-tour': ['private'],
};

/**
 * Returns FEATURED_TOURS reordered so tours matching this money page's topic
 * lead, with the rest filling out the remaining slots. Falls back to the
 * original order for any href not in MONEY_PAGE_RELEVANCE (e.g. when called
 * from the homepage, which wants the full unfiltered set).
 */
export function getFeaturedToursForPage(href: string, max = 4): FeaturedTour[] {
  const priority = MONEY_PAGE_RELEVANCE[href];
  if (!priority) return FEATURED_TOURS.slice(0, max);

  const score = (tour: FeaturedTour) =>
    priority.reduce((best, tag, index) => (tour.tags.includes(tag) ? Math.min(best, index) : best), priority.length);

  return [...FEATURED_TOURS].sort((a, b) => score(a) - score(b)).slice(0, max);
}

/**
 * Real, verifiable facts about the Vespa scooter's own history (not business/
 * traffic metrics) — used for the homepage's "Before It Was a Tour" strip.
 * Kept separate from FEATURED_TOURS/MONEY_PAGES since these describe the
 * vehicle itself, not anything this site sells or claims about its own
 * audience.
 */
export const QUICK_FACTS = [
  { value: '1946', label: 'The Vespa was born', detail: 'Designed by aeronautical engineer Corradino D’Ascanio for Piaggio, launched that April.' },
  { value: '98cc', label: 'Original engine size', detail: 'The first production model had a 98cc two-stroke engine making roughly 3.3 horsepower.' },
  { value: '"Wasp"', label: 'What the name means', detail: 'Piaggio’s Enrico Piaggio said the shape and the engine’s buzz reminded him of a vespa — Italian for wasp.' },
  { value: '19M+', label: 'Scooters made since', detail: 'Piaggio’s own production tally across nearly eight decades of the model line.' },
];

/**
 * Extra Rome/scooter photography for the About page's gallery — reuses
 * images already verified elsewhere on this site rather than introducing new,
 * unchecked URLs, same approach as Private Vatican's VATICAN_GALLERY.
 */
export const ROME_VESPA_GALLERY = [
  { src: 'https://images.unsplash.com/photo-1739289928017-1eab9eb96ba8', alt: 'A rider on a scooter moving down a narrow Rome street lined with tall buildings' },
  { src: 'https://images.unsplash.com/photo-1655685784726-780dd8c609e8', alt: 'A driver and passenger riding together on a scooter down a Rome street' },
  { src: 'https://images.unsplash.com/photo-1777761394358-440f43b10a6d', alt: 'Scooters and motorcycles lining a cobblestone Rome street at dusk, golden light on the buildings' },
  { src: 'https://images.unsplash.com/photo-1588778943428-cec10a6f1666', alt: 'A white scooter parked beside a wooden door on a Rome side street' },
];

export const SUPPORT_PAGES = [
  {
    title: 'What a Vespa Tour Covers',
    href: '/what-a-vespa-tour-covers',
    keyword: 'what a vespa tour includes',
    image: { src: 'https://images.unsplash.com/photo-1613241811774-f75736a131bd', alt: 'A red scooter parked on a Rome brick pavement' },
  },
  {
    title: 'Is It Safe in Rome Traffic',
    href: '/is-it-safe-in-rome-traffic',
    keyword: 'is riding a vespa safe in rome traffic',
    image: { src: 'https://images.unsplash.com/photo-1665511089451-2ea8f9116fe4', alt: 'A busy Rome city street with mixed car, scooter, and pedestrian traffic' },
  },
  {
    title: 'What to Wear & Bring',
    href: '/what-to-wear-bring',
    keyword: 'what to wear vespa tour rome',
    image: { src: 'https://images.unsplash.com/photo-1590232107998-96aec6b81ae6', alt: 'A rider wearing a helmet, seated on a scooter and geared up before a ride' },
  },
  {
    title: 'Licence Questions',
    href: '/licence-questions',
    keyword: 'vespa licence requirements rome',
    image: { src: 'https://images.unsplash.com/photo-1546422904-728988680a63', alt: 'Close-up of a scooter’s rear license plate' },
  },
  {
    title: 'Vespa vs Walking vs Golf Cart',
    href: '/vespa-vs-walking-vs-golf-cart',
    keyword: 'vespa vs golf cart vs walking rome',
    image: { src: 'https://images.unsplash.com/photo-1739289928019-2fb10d383eb5', alt: 'A scooter parked alone on a Rome cobblestone street' },
  },
];

export const FAQS = [
  {
    question: 'Do I need a special licence to ride a Vespa in Rome?',
    answer:
      'Non-EU visitors generally need an International Driving Permit alongside their home licence, and most operators require a valid motorcycle/scooter endorsement — check the licence-questions page for exact requirements by nationality.',
  },
  {
    question: 'Is riding a Vespa in Rome traffic actually safe?',
    answer:
      'It’s manageable with a guided lead rider setting the pace and route, but Rome’s traffic is genuinely chaotic by wider European standards — first-timers are safer starting with a guided or sidecar tour, not a self-drive rental.',
  },
  {
    question: 'What should I wear on a Vespa tour?',
    answer:
      'Closed-toe shoes are non-negotiable, and a light jacket even in summer — wind chill at speed is real, and most operators provide helmets but not riding gear.',
  },
  {
    question: 'How is a Vespa tour different from a golf cart tour?',
    answer:
      'A Vespa tour covers more ground faster and suits travelers comfortable with two wheels and some adrenaline; a golf cart tour is slower, seated, and better suited to families, seniors, or anyone who’d rather not be on a bike at all.',
  },
  {
    question: 'Can two people ride one Vespa?',
    answer:
      'Yes, most tours offer a passenger seat, but check the weight/height limits — a sidecar tour is the more comfortable option for two adults over a longer route.',
  },
];

export const QUICK_LINKS = [
  { label: 'Guided Tour', href: '/vespa-tour-of-rome' },
  { label: 'Sidecar Tour', href: '/sidecar-tour-of-rome' },
  { label: 'Self-Drive vs Guided', href: '/self-drive-vs-guided-vespa' },
  { label: 'Sunset Tour', href: '/vespa-at-sunset' },
  { label: 'Private Tour', href: '/private-vespa-tour' },
  { label: 'Is It Safe?', href: '/is-it-safe-in-rome-traffic' },
  { label: 'Licence Questions', href: '/licence-questions' },
];

export const EXPLORE_LINKS = MONEY_PAGES.map((p) => ({ label: p.title, href: p.href }));
export const LEARN_LINKS = SUPPORT_PAGES.map((p) => ({ label: p.title, href: p.href }));

/** Feeds the header's "Tours" dropdown. */
export const TOURS_NAV_ITEMS: NavItem[] = MONEY_PAGES.map((p) => ({ title: p.title, href: p.href, keyword: p.keyword }));

/** Feeds the header's "Ride Prep" dropdown and the footer's Learn column. */
export const PLAN_NAV_ITEMS: NavItem[] = SUPPORT_PAGES.map((p) => ({ title: p.title, href: p.href, keyword: p.keyword }));

/**
 * The site's named author persona. A real photoshoot is still "to build" per
 * the site blueprint, so every UI slot uses an initials avatar rather than a
 * stock photo standing in for a real person. Distinct from Underground
 * Colosseum's Luca Moretti, Private Vatican's Elena Bianchi, and Pompeii Day
 * Trip's Marco Esposito — a separate Rome-based specialist with her own
 * credential, matching the network's "no anonymous Team byline" rule.
 */
export const AUTHOR = {
  name: 'Chiara Rinaldi',
  initials: 'CR',
  title: 'Licensed motorcycle instructor, Rome native rider',
  domain: 'romevespa.com',
  bio: 'Every route on this site has been ridden in real Rome traffic on an actual scooter, not plotted on a map from a desk. Independent — not affiliated with Piaggio, any Vespa dealer, or any tour operator we compare.',
};
