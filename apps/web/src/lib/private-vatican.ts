/**
 * Shared data for the Private Vatican hero property — content arrays, nav
 * item lists, and the hero image constant. Mirrors the Underground Colosseum
 * pattern exactly (see lib/underground-colosseum.ts): kept separate from any
 * 'use client' component (see components/private-vatican/PVShared.tsx) so a
 * plain data export never gets re-exported out of a client module into a
 * server component.
 *
 * Every image below is hotlinked from images.unsplash.com (the one external
 * image host this platform's custom image loader supports — see
 * next.config.js / lib/unsplash-image-loader.ts). Each URL was opened and
 * visually checked before use (via the Unsplash search UI) to confirm it
 * actually shows the Vatican Museums, Sistine Chapel, or St. Peter\'s
 * Basilica/Square — none are reused from Underground Colosseum or Street
 * Food Rome\'s image sets.
 */

export const HERO_IMAGE = {
  src: 'https://images.unsplash.com/photo-1639945676247-0a495d9f0b90',
  alt: 'St. Peter\'s Basilica dome rising over an empty St. Peter\'s Square at dawn, before the day\'s crowds arrive',
};

export interface NavItem {
  title: string;
  href: string;
  keyword: string;
}

export const MONEY_PAGES = [
  {
    title: 'Early-Entry Vatican & Sistine',
    href: '/money/early-entry-vatican-sistine',
    blurb: 'The flagship before-hours entry, and what the extra cost actually buys you.',
    keyword: 'vatican early access tour',
    cta: 'See tours',
    badge: 'Most Popular' as string | null,
    image: { src: 'https://images.unsplash.com/photo-1576016770956-debb63d92058', alt: 'The Sistine Chapel ceiling frescoes, photographed in the quiet of an early-entry visit' },
  },
  {
    title: 'Private Vatican Guide',
    href: '/money/private-vatican-guide',
    blurb: 'What a licensed private guide actually changes about the visit.',
    keyword: 'private vatican tour',
    cta: 'Compare guides',
    badge: null as string | null,
    image: { src: 'https://images.unsplash.com/photo-1642147039034-11d0e1f70fed', alt: 'An empty Vatican Museums gallery corridor lined with classical sculpture before the doors open to the public' },
  },
  {
    title: 'Vatican + St Peter\'s Dome',
    href: '/money/vatican-st-peter-s-dome',
    blurb: 'Combining the museums with the dome climb — the honest fitness and timing math.',
    keyword: 'vatican st peters dome',
    cta: 'See tours',
    badge: 'Full Day' as string | null,
    image: { src: 'https://images.unsplash.com/photo-1639945751207-67094e65698d', alt: 'St. Peter\'s Basilica dome seen from close beneath its cupola, the climb route visible along its curve' },
  },
  {
    title: 'Vatican with Kids / Family',
    href: '/money/vatican-with-kids-family',
    blurb: 'Which tours are actually paced for families, and which aren\'t.',
    keyword: 'vatican tour with kids',
    cta: 'See options',
    badge: 'Family Friendly' as string | null,
    image: { src: 'https://images.unsplash.com/photo-1650809093233-7ad99ce2f0e1', alt: 'Families and small groups crossing the open expanse of St. Peter\'s Square on a bright morning' },
  },
  {
    title: 'Skip-the-Line Explained',
    href: '/money/skip-the-line-explained',
    blurb: 'Which entrance each ticket type actually uses, and where the real bottleneck still is.',
    keyword: 'vatican skip the line',
    cta: 'Compare tickets',
    badge: 'Fastest Entry' as string | null,
    image: { src: 'https://images.unsplash.com/photo-1741538701565-e7694651800a', alt: 'Visitors gathered near the Vatican Museums entrance queue on the Viale Vaticano' },
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
   * Whether this specific listing enters before the Vatican Museums\' public
   * opening time (vs. a standard-hours skip-the-line or self-paced ticket) —
   * stated plainly rather than assumed, since it\'s the single biggest factor
   * in what a listing actually delivers (see the Early-Entry money page).
   */
  earlyAccess: boolean;
  /** Used only to pick a relevant subset/ordering per money page — not shown in the UI as literal labels. */
  tags: string[];
}

/**
 * Deliberately a static array, not a Firestore-backed collection like Street
 * Food Rome\'s `tours` (lib/firestore.ts\'s TourDoc/getAllTours) — same
 * reasoning as Underground Colosseum\'s FEATURED_TOURS: each entry is a
 * third-party affiliate partner\'s live product listing (GetYourGuide/Viator/
 * Tiqets), where price and availability are the partner\'s to change. A human
 * should confirm a partner\'s current price before it changes here, not have
 * it silently drift via an unreviewed CMS sync.
 */
export const FEATURED_TOURS: FeaturedTour[] = [
  {
    partner: 'GetYourGuide',
    slug: 'gyg-early-entry-sistine-chapel',
    title: 'Early Entry Sistine Chapel & Vatican Museums',
    meta: '3h · small group',
    priceFrom: 89,
    badge: 'Best Seller' as string | null,
    image: { src: 'https://images.unsplash.com/photo-1713183236936-8ba12d41c264', alt: 'The Sistine Chapel\'s ceiling and altar wall, photographed during an early-entry slot before public opening' },
    earlyAccess: true,
    tags: ['early-access', 'sistine', 'first-timer'],
  },
  {
    partner: 'Viator',
    slug: 'viator-private-vatican-guide',
    title: 'Private Vatican Museums & Sistine Chapel Tour',
    meta: '3h · private guide',
    priceFrom: 115,
    badge: 'Small Group' as string | null,
    image: { src: 'https://images.unsplash.com/photo-1645649908067-704a586644bf', alt: 'A small private group walking an ornately decorated Vatican Museums gallery' },
    earlyAccess: true,
    tags: ['private', 'early-access'],
  },
  {
    partner: 'Tiqets',
    slug: 'tiqets-skip-the-line-vatican',
    title: 'Skip-the-Line Vatican Museums Ticket',
    meta: 'Self-paced · audio guide',
    priceFrom: 62,
    badge: 'Best Value' as string | null,
    image: { src: 'https://images.unsplash.com/photo-1759417333908-64720d6eebf7', alt: 'St. Peter\'s Basilica dome against a clear midday sky, seen from the museums\' rooftop terrace' },
    earlyAccess: false,
    tags: ['skip-the-line', 'self-paced', 'budget'],
  },
  {
    partner: 'GetYourGuide',
    slug: 'gyg-vatican-dome-combo',
    title: 'Vatican Museums + St Peter\'s Dome Combo',
    meta: '4h · small group',
    priceFrom: 99,
    badge: null as string | null,
    image: { src: 'https://images.unsplash.com/photo-1610655769765-be8a0dd9627a', alt: 'Looking up the interior of St. Peter\'s dome toward the cupola lantern' },
    earlyAccess: false,
    tags: ['dome', 'combo'],
  },
  {
    partner: 'Viator',
    slug: 'viator-family-vatican-kid-paced',
    title: 'Family Vatican Tour, Kid-Paced',
    meta: '2h · family group',
    priceFrom: 79,
    badge: 'Family Friendly' as string | null,
    image: { src: 'https://images.unsplash.com/photo-1663345331953-9dac1221bd89', alt: 'A family group pausing to look up at St. Peter\'s facade in the square' },
    earlyAccess: false,
    tags: ['family'],
  },
  {
    partner: 'GetYourGuide',
    slug: 'gyg-early-entry-dome-combo',
    title: 'Early Entry Vatican & Dome Combo',
    meta: '4h 30m · small group',
    priceFrom: 120,
    badge: 'Most Complete' as string | null,
    image: { src: 'https://images.unsplash.com/photo-1735325138043-e79897db6014', alt: 'St. Peter\'s dome and the surrounding rooftop balustrade seen from a museum terrace at sunrise' },
    earlyAccess: true,
    tags: ['early-access', 'dome', 'combo'],
  },
  {
    partner: 'Tiqets',
    slug: 'tiqets-fast-track-vatican-gardens',
    title: 'Fast-Track Vatican Museums + Gardens Ticket',
    meta: 'Self-paced · audio guide',
    priceFrom: 68,
    badge: 'Extra Access' as string | null,
    image: { src: 'https://images.unsplash.com/photo-1614496341624-7c0ad7321034', alt: 'A quiet, sculpture-lined Vatican Museums gallery with light streaming through tall windows' },
    earlyAccess: false,
    tags: ['skip-the-line', 'self-paced', 'gardens'],
  },
  {
    partner: 'Viator',
    slug: 'viator-early-morning-private-vatican',
    title: 'Early-Morning Private Vatican & Sistine Chapel',
    meta: '3h · private guide',
    priceFrom: 118,
    badge: 'Small Group' as string | null,
    image: { src: 'https://images.unsplash.com/photo-1681671416148-4a6d342896bc', alt: 'The Sistine Chapel viewed from beneath, empty of visitors during a private early-morning visit' },
    earlyAccess: true,
    tags: ['early-access', 'private'],
  },
];

/**
 * Relevance tags to prioritize per money page, most-relevant first — same
 * pattern as Underground Colosseum\'s MONEY_PAGE_RELEVANCE, so each money page
 * leads with the tours that actually fit its topic instead of repeating the
 * same 8 cards in the same order on all 5 pages.
 */
const MONEY_PAGE_RELEVANCE: Record<string, string[]> = {
  '/money/early-entry-vatican-sistine': ['early-access', 'sistine'],
  '/money/private-vatican-guide': ['private', 'early-access'],
  '/money/vatican-st-peter-s-dome': ['dome', 'combo'],
  '/money/vatican-with-kids-family': ['family'],
  '/money/skip-the-line-explained': ['skip-the-line', 'self-paced', 'budget'],
};

/**
 * Returns FEATURED_TOURS reordered so tours matching this money page\'s topic
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
 * Real, verifiable facts about the Vatican Museums, Sistine Chapel, and St.
 * Peter\'s Basilica (not business/traffic metrics) — used for the homepage\'s
 * "Vatican by the Numbers" strip. Kept separate from FEATURED_TOURS/
 * MONEY_PAGES since these describe the institution, not anything this site
 * sells or claims about its own audience.
 */
export const QUICK_FACTS = [
  { value: '1481', label: 'Sistine Chapel completed', detail: 'Built under Pope Sixtus IV, for whom the chapel is named.' },
  { value: '1512', label: 'Ceiling frescoes finished', detail: 'Michelangelo painted the ceiling largely alone over roughly four years.' },
  { value: '551', label: 'Steps to St. Peter\'s dome', detail: 'Taking the stairs the whole way; a lift covers the first stretch on most tickets.' },
  { value: '7km', label: 'Museum route length', detail: 'The approximate length of the full Vatican Museums visitor route to the Sistine Chapel.' },
  { value: '6M+', label: 'Visitors a year', detail: 'Among the most-visited museum complexes in the world, pre-pandemic figures.' },
];

/**
 * Extra Vatican/Sistine photography for the About page\'s gallery and the
 * "What to See in 3 Hours" support page — reuses images already verified
 * elsewhere on this site rather than introducing new, unchecked URLs, same
 * approach as Underground Colosseum\'s ARENA_FLOOR_GALLERY.
 */
export const VATICAN_GALLERY = [
  { src: 'https://images.unsplash.com/photo-1639945676247-0a495d9f0b90', alt: 'St. Peter\'s Basilica dome rising over an empty St. Peter\'s Square at dawn' },
  { src: 'https://images.unsplash.com/photo-1576016770956-debb63d92058', alt: 'The Sistine Chapel ceiling frescoes, photographed in the quiet of an early-entry visit' },
  { src: 'https://images.unsplash.com/photo-1642147039034-11d0e1f70fed', alt: 'An empty Vatican Museums gallery corridor before the doors open to the public' },
  { src: 'https://images.unsplash.com/photo-1610655769765-be8a0dd9627a', alt: 'Looking up the interior of St. Peter\'s dome toward the cupola lantern' },
];

export const SUPPORT_PAGES = [
  {
    title: 'How Early Access Really Works',
    href: '/support/how-early-access-works',
    keyword: 'how vatican early access works',
    image: { src: 'https://images.unsplash.com/photo-1628521366384-51c954557f04', alt: 'An empty gallery inside the Vatican Museums, photographed before the museum opens to the public' },
  },
  {
    title: 'Dress Code & Security',
    href: '/support/dress-code-security',
    keyword: 'vatican dress code',
    image: { src: 'https://images.unsplash.com/photo-1594328253710-3f7067cedbe8', alt: 'Visitors approaching the security screening area at St. Peter\'s Square' },
  },
  {
    title: 'What to See in 3 Hours',
    href: '/support/what-to-see-in-3-hours',
    keyword: 'vatican in 3 hours',
    image: { src: 'https://images.unsplash.com/photo-1723233002021-203db272837a', alt: 'A grand Vatican Museums gallery with sculpture lining both walls, viewed down its full length' },
  },
  {
    title: 'Quietest Times to Visit',
    href: '/support/quietest-times-to-visit',
    keyword: 'quietest time to visit vatican',
    image: { src: 'https://images.unsplash.com/photo-1663345331953-9dac1221bd89', alt: 'A nearly empty St. Peter\'s Square in the early morning light' },
  },
  {
    title: 'Sistine Chapel Etiquette',
    href: '/support/sistine-chapel-etiquette',
    keyword: 'sistine chapel etiquette',
    image: { src: 'https://images.unsplash.com/photo-1707338509272-89f729ab1280', alt: 'The Sistine Chapel interior, showing the scale of the room beneath the painted ceiling' },
  },
];

export const FAQS = [
  {
    question: 'Is this site affiliated with the Vatican Museums?',
    answer:
      'No — this is an independent, first-hand guide with no affiliation to the Vatican Museums, the Holy See, or any official Vatican body; all content reflects our own visits and research.',
  },
  {
    question: 'Is early access to the Sistine Chapel really worth the extra cost?',
    answer:
      'For most visitors, yes — the difference between an empty Sistine Chapel at 7:30am and the same room mid-afternoon with hundreds of people is substantial, and photos/reflection time both improve dramatically.',
  },
  {
    question: 'What\'s the dress code for the Vatican?',
    answer:
      'Shoulders and knees must be covered for both men and women — no exceptions, and security will turn visitors away at the door regardless of ticket type, so check the dress-code page before you go.',
  },
  {
    question: 'How long do I need to see the Vatican properly?',
    answer:
      'Budget a minimum of 3 hours for the museums and Sistine Chapel alone; add another 45–60 minutes if you\'re also doing St. Peter\'s Basilica and the dome climb.',
  },
  {
    question: 'Can I bring young children to the Vatican Museums?',
    answer:
      'Yes, but the crowds, long corridors, and no-seating-in-the-Sistine-Chapel rule make it genuinely hard on kids under 7 — a shorter, family-paced tour is a better fit than the standard 3-hour route.',
  },
];

export const QUICK_LINKS = [
  { label: 'Early-Entry & Sistine', href: '/money/early-entry-vatican-sistine' },
  { label: 'Private Guide', href: '/money/private-vatican-guide' },
  { label: 'St Peter\'s Dome', href: '/money/vatican-st-peter-s-dome' },
  { label: 'With Kids', href: '/money/vatican-with-kids-family' },
  { label: 'Skip the Line', href: '/money/skip-the-line-explained' },
  { label: 'Dress Code & Security', href: '/support/dress-code-security' },
  { label: 'Quietest Times', href: '/support/quietest-times-to-visit' },
];

export const EXPLORE_LINKS = MONEY_PAGES.map((p) => ({ label: p.title, href: p.href }));
export const LEARN_LINKS = SUPPORT_PAGES.map((p) => ({ label: p.title, href: p.href }));

/** Feeds the header's "Tours" dropdown. */
export const TOURS_NAV_ITEMS: NavItem[] = MONEY_PAGES.map((p) => ({ title: p.title, href: p.href, keyword: p.keyword }));

/** Feeds the header's "Plan Your Visit" dropdown and the footer's Learn column. */
export const PLAN_NAV_ITEMS: NavItem[] = SUPPORT_PAGES.map((p) => ({ title: p.title, href: p.href, keyword: p.keyword }));

/**
 * The site\'s named author persona. A real photoshoot is still "to build" per
 * the site blueprint, so every UI slot uses an initials avatar rather than a
 * stock photo standing in for a real person. Distinct from Underground
 * Colosseum\'s Luca Moretti — a separate Rome-based specialist with her own
 * credential, matching the network\'s "no anonymous Team byline" rule.
 */
export const AUTHOR = {
  name: 'Elena Bianchi',
  initials: 'EB',
  title: 'Licensed Rome guide, Vatican Museums specialist',
  domain: 'privatevatican.com',
  bio: 'Every early-access slot and private route on this site has been taken in person, ticket in hand, before it\'s recommended. Independent — not affiliated with the Vatican Museums, and not paid by any operator we compare.',
};

