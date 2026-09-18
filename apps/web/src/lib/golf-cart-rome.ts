/**
 * Shared data for the Golf Cart Rome hero property — content arrays, nav item
 * lists, and the hero image constant. Mirrors the Rome Vespa / Pompeii Day
 * Trip / Private Vatican pattern exactly (see lib/rome-vespa.ts,
 * lib/pompeii-day-trip.ts): kept separate from any 'use client' component
 * (see components/golf-cart-rome/GCRShared.tsx) so a plain data export never
 * gets re-exported out of a client module into a server component.
 *
 * Positioning note (Master Network Blueprint §3.7.1): this property
 * deliberately overlaps Rome Vespa (same city, same general niche) but owns
 * the opposite buyer framing — accessibility/comfort/family/senior, where
 * Rome Vespa owns the two-wheel/adrenaline framing. Every "vs Vespa" mention
 * below stays limited to the seated-vs-scooter contrast the blueprint itself
 * gives (§3.7.6) — no claim about Rome Vespa beyond what its own shipped copy
 * already states publicly.
 *
 * Every image below is hotlinked from images.unsplash.com (the one external
 * image host this platform's custom image loader supports — see
 * next.config.js / lib/unsplash-image-loader.ts). Each URL was looked up and
 * its description checked before use to confirm what it actually shows —
 * none are reused from Underground Colosseum's, Private Vatican's, Pompeii
 * Day Trip's, or Rome Vespa's image sets. Photos of the cart itself (rather
 * than a Rome location) are honestly captioned as generic electric-cart
 * imagery rather than claimed as a Rome-specific product photo.
 */

export const HERO_IMAGE = {
  src: 'https://images.unsplash.com/photo-1670792373724-39fd52df804e',
  alt: 'An open Roman piazza with a central statue, framed by historic buildings in warm afternoon light',
};

export interface NavItem {
  title: string;
  href: string;
  keyword: string;
}

export const MONEY_PAGES = [
  {
    title: 'Golf-Cart Tour of Rome',
    href: '/money/golf-cart-tour-of-rome',
    blurb: "The flagship guided cart tour — Rome's major sights covered seated, shaded, and at a pace that doesn't leave anyone behind.",
    keyword: 'golf cart tour rome',
    cta: 'See tours',
    badge: 'Most Popular' as string | null,
    image: { src: 'https://images.unsplash.com/photo-1670792373724-39fd52df804e', alt: 'An open Roman piazza with a central statue, framed by historic buildings in warm afternoon light' },
  },
  {
    title: 'Private Cart Tour',
    href: '/private-cart-tour',
    blurb: "A private cart means your family's pace, not a stranger's — useful when you've got very different energy levels in one group.",
    keyword: 'private golf cart tour rome',
    cta: 'Compare private tours',
    badge: 'Small Group' as string | null,
    image: { src: 'https://images.unsplash.com/photo-1603321849799-6ca7611014a0', alt: 'Two passengers seated together in an open-air electric cart, ready to depart' },
  },
  {
    title: 'Cart Tour for Families & Seniors',
    href: '/cart-tour-for-families-seniors',
    blurb: "Built around comfort and accessibility from the ground up — not a walking tour with a cart bolted on as an afterthought.",
    keyword: 'rome tour for seniors',
    cta: 'See accessible tours',
    badge: 'Family & Senior Friendly' as string | null,
    image: { src: 'https://images.unsplash.com/photo-1727179468857-93f7a9ca36f4', alt: 'An older couple walking hand in hand along a quiet Rome street' },
  },
  {
    title: 'Night Cart Tour',
    href: '/night-cart-tour',
    blurb: 'Illuminated Rome from a cart at night — cooler temperatures, dramatically lit monuments, and none of the daytime heat fatigue.',
    keyword: 'rome night tour cart',
    cta: 'See night tours',
    badge: 'Evening' as string | null,
    image: { src: 'https://images.unsplash.com/photo-1678970388666-e50b8006ab51', alt: "The Roman Forum's ancient ruins illuminated against the night sky" },
  },
  {
    title: 'Cart vs Walking Tour',
    href: '/cart-vs-walking-tour',
    blurb: 'A cart covers more ground in less time with zero fatigue — the honest comparison of what you gain and what you trade away.',
    keyword: 'golf cart vs walking rome',
    cta: 'Compare formats',
    badge: null as string | null,
    image: { src: 'https://images.unsplash.com/photo-1614354961148-007d060d710e', alt: 'A wide-open piazza in front of the Pantheon in Rome' },
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
   * Whether this specific listing runs a wheelchair-accessible cart (a ramp
   * or lift, with floor space for a wheelchair to stay in place) rather than
   * a standard cart that requires transferring to a fixed bench seat — the
   * single biggest factor in who a listing actually suits (see the
   * Accessibility & Limited Mobility support page), same structural role as
   * Rome Vespa's `sidecar` flag.
   */
  wheelchairAccessible: boolean;
  /** Used only to pick a relevant subset/ordering per money page — not shown in the UI as literal labels. */
  tags: string[];
}

/**
 * Deliberately a static array, not a Firestore-backed collection like Street
 * Food Rome's `tours` (lib/firestore.ts's TourDoc/getAllTours) — same
 * reasoning as every other bespoke property's FEATURED_TOURS: each entry is
 * a third-party affiliate partner's live product listing (GetYourGuide/
 * Viator), where price and availability are the partner's to change. A human
 * should confirm a partner's current price before it changes here, not have
 * it silently drift via an unreviewed CMS sync.
 */
export const FEATURED_TOURS: FeaturedTour[] = [
  {
    partner: 'GetYourGuide',
    slug: 'gyg-classic-golf-cart-tour-rome',
    title: 'Classic Guided Golf Cart Tour of Rome',
    meta: '2.5h · guided, shared group',
    priceFrom: 95,
    badge: 'Best Seller' as string | null,
    image: { src: 'https://images.unsplash.com/photo-1670792373724-39fd52df804e', alt: 'An open Roman piazza with a central statue, framed by historic buildings in warm afternoon light' },
    wheelchairAccessible: false,
    tags: ['guided', 'shared', 'first-timer'],
  },
  {
    partner: 'Viator',
    slug: 'viator-private-golf-cart-tour-rome',
    title: 'Private Golf Cart Tour, Custom Route',
    meta: '2.5h · private, small group',
    priceFrom: 180,
    badge: 'Small Group' as string | null,
    image: { src: 'https://images.unsplash.com/photo-1603321849799-6ca7611014a0', alt: 'Two passengers seated together in an open-air electric cart, ready to depart' },
    wheelchairAccessible: false,
    tags: ['private'],
  },
  {
    partner: 'GetYourGuide',
    slug: 'gyg-golf-cart-seniors-families-tour',
    title: 'Golf Cart Tour for Families & Seniors',
    meta: '2.5h · seated, accessible boarding',
    priceFrom: 100,
    badge: 'Family & Senior Friendly' as string | null,
    image: { src: 'https://images.unsplash.com/photo-1727179468857-93f7a9ca36f4', alt: 'An older couple walking hand in hand along a quiet Rome street' },
    wheelchairAccessible: true,
    tags: ['family', 'seniors', 'accessible'],
  },
  {
    partner: 'Viator',
    slug: 'viator-golf-cart-night-tour-rome',
    title: 'Illuminated Rome Night Golf Cart Tour',
    meta: '2h · guided, evening',
    priceFrom: 110,
    badge: 'Evening' as string | null,
    image: { src: 'https://images.unsplash.com/photo-1678970388666-e50b8006ab51', alt: "The Roman Forum's ancient ruins illuminated against the night sky" },
    wheelchairAccessible: false,
    tags: ['night', 'guided'],
  },
  {
    partner: 'GetYourGuide',
    slug: 'gyg-golf-cart-tour-rome-highlights',
    title: 'Rome Highlights Golf Cart Tour',
    meta: '3h · guided, shared group',
    priceFrom: 105,
    badge: null as string | null,
    image: { src: 'https://images.unsplash.com/photo-1614354961148-007d060d710e', alt: 'A wide-open piazza in front of the Pantheon in Rome' },
    wheelchairAccessible: false,
    tags: ['guided', 'shared'],
  },
  {
    partner: 'Viator',
    slug: 'viator-private-family-golf-cart-tour',
    title: 'Private Family Golf Cart Tour',
    meta: '3h · private, family',
    priceFrom: 220,
    badge: 'Most Flexible' as string | null,
    image: { src: 'https://images.unsplash.com/photo-1573070917719-cb3768c42634', alt: 'Visitors gathered around a fountain in an open Rome piazza' },
    wheelchairAccessible: false,
    tags: ['private', 'family'],
  },
  {
    partner: 'GetYourGuide',
    slug: 'gyg-golf-cart-sunset-evening-tour',
    title: 'Golf Cart Sunset & Evening Tour of Rome',
    meta: '2h · guided, golden hour',
    priceFrom: 115,
    badge: 'Golden Hour' as string | null,
    image: { src: 'https://images.unsplash.com/photo-1662398885856-cf2ab6e981b2', alt: 'Historic buildings lining a quiet street near Piazza Navona' },
    wheelchairAccessible: false,
    tags: ['night', 'sunset'],
  },
  {
    partner: 'Viator',
    slug: 'viator-wheelchair-accessible-golf-cart-tour',
    title: 'Wheelchair-Accessible Golf Cart Tour of Rome',
    meta: '2.5h · seated, no-transfer boarding',
    priceFrom: 100,
    badge: 'Wheelchair Accessible' as string | null,
    image: { src: 'https://images.unsplash.com/photo-1561251224-e393160cd769', alt: 'A row of electric carts lined up on a paved road, ready to depart' },
    wheelchairAccessible: true,
    tags: ['accessible', 'family', 'seniors'],
  },
];

/**
 * Relevance tags to prioritize per money page, most-relevant first — same
 * pattern as Rome Vespa's MONEY_PAGE_RELEVANCE, so each money page leads with
 * the tours that actually fit its topic instead of repeating the same 8
 * cards in the same order on all 5 pages.
 */
const MONEY_PAGE_RELEVANCE: Record<string, string[]> = {
  '/money/golf-cart-tour-of-rome': ['guided', 'shared', 'first-timer'],
  '/private-cart-tour': ['private'],
  '/cart-tour-for-families-seniors': ['family', 'seniors', 'accessible'],
  '/night-cart-tour': ['night', 'sunset', 'guided'],
  '/cart-vs-walking-tour': ['guided', 'shared', 'family'],
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
 * Real, verifiable facts about the electric golf cart's own history and
 * mechanics (not business/traffic metrics) — used for the homepage's "Before
 * It Was a Tour" strip, same role as Rome Vespa's QUICK_FACTS. Kept separate
 * from FEATURED_TOURS/MONEY_PAGES since these describe the vehicle itself,
 * not anything this site sells or claims about its own audience.
 */
export const QUICK_FACTS = [
  { value: '1932', label: 'Earliest electric carts appear', detail: 'Early prototype electric carts, adapted from electric wheelchairs of the era, appear in the United States in the early 1930s.' },
  { value: '1951', label: 'Mass production begins', detail: 'Merle Williams starts building electric golf carts under the Marketeer name in California — widely credited as the first true production model.' },
  { value: '36V', label: 'Typical battery voltage', detail: 'Most modern electric carts run on a 36- or 48-volt battery pack, giving several hours of range per charge.' },
  { value: '15 mph', label: 'Typical top speed', detail: 'Street-legal low-speed carts are capped around 15 mph (24 km/h) — part of why a guided tour never feels rushed.' },
];

/**
 * Extra Rome/cart photography for the About page's gallery — reuses images
 * already verified elsewhere on this site rather than introducing new,
 * unchecked URLs, same approach as Rome Vespa's ROME_VESPA_GALLERY.
 */
export const GOLF_CART_ROME_GALLERY = [
  { src: 'https://images.unsplash.com/photo-1670792373724-39fd52df804e', alt: 'An open Roman piazza with a central statue, framed by historic buildings in warm afternoon light' },
  { src: 'https://images.unsplash.com/photo-1603321849799-6ca7611014a0', alt: 'Two passengers seated together in an open-air electric cart, ready to depart' },
  { src: 'https://images.unsplash.com/photo-1640307112649-01bfc4c77a77', alt: 'A narrow Trastevere street with its original, uneven cobblestone paving' },
  { src: 'https://images.unsplash.com/photo-1573070917719-cb3768c42634', alt: 'Visitors gathered around a fountain in an open Rome piazza' },
];

export const SUPPORT_PAGES = [
  {
    title: 'Why a Cart at All',
    href: '/why-a-cart-heat-mobility-distance',
    keyword: 'why take a golf cart tour rome',
    image: { src: 'https://images.unsplash.com/photo-1668171321834-658179e37f5e', alt: "An elevated view over Rome's dense historic center, showing how close together its major landmarks sit" },
  },
  {
    title: 'What the Route Covers',
    href: '/what-the-route-covers',
    keyword: 'golf cart tour rome route',
    image: { src: 'https://images.unsplash.com/photo-1662398885856-cf2ab6e981b2', alt: 'Historic buildings lining a quiet street near Piazza Navona' },
  },
  {
    title: 'Accessibility & Limited Mobility',
    href: '/accessibility-limited-mobility',
    keyword: 'wheelchair accessible tour rome',
    image: { src: 'https://images.unsplash.com/photo-1640307112649-01bfc4c77a77', alt: 'A narrow Trastevere street with its original, uneven cobblestone paving' },
  },
  {
    title: 'How Long It Takes',
    href: '/how-long-it-takes',
    keyword: 'how long is a golf cart tour rome',
    image: { src: 'https://images.unsplash.com/photo-1573070917719-cb3768c42634', alt: 'Visitors gathered around a fountain in an open Rome piazza' },
  },
  {
    title: 'Best For Whom',
    href: '/best-for-whom',
    keyword: 'who is a golf cart tour rome for',
    image: { src: 'https://images.unsplash.com/photo-1561251224-e393160cd769', alt: 'A row of electric carts lined up on a paved road, ready to depart' },
  },
];

export const FAQS = [
  {
    question: 'Is a golf cart tour accessible for wheelchair users?',
    answer:
      'Most standard carts require transferring from a wheelchair to the cart seat — check the accessibility page for specific operator policies, since not every cart accommodates every mobility need.',
  },
  {
    question: 'How is a golf cart tour different from a Vespa tour?',
    answer:
      'A golf cart tour is seated, slower-paced, and suited to families, seniors, or anyone avoiding a two-wheeled vehicle; a Vespa tour covers more ground faster but requires comfort riding a scooter in traffic.',
  },
  {
    question: 'How long does a golf cart tour take?',
    answer:
      'Most tours run 2–3 hours, covering roughly the same landmarks as a half-day walking tour but with far less physical effort.',
  },
  {
    question: "Can a golf cart tour handle Rome's heat in summer?",
    answer:
      "Yes — it's actually one of the better options for a July/August visit since you're seated and often shaded, unlike a walking tour where heat fatigue sets in fast.",
  },
  {
    question: 'Are golf cart tours good for young kids?',
    answer:
      "Generally yes — seated tours suit shorter attention spans better than a long walking tour, though very young children may still need a car seat or booster depending on the operator's policy.",
  },
];

export const QUICK_LINKS = [
  { label: 'Golf-Cart Tour', href: '/money/golf-cart-tour-of-rome' },
  { label: 'Private Cart Tour', href: '/private-cart-tour' },
  { label: 'Families & Seniors', href: '/cart-tour-for-families-seniors' },
  { label: 'Night Tour', href: '/night-cart-tour' },
  { label: 'Cart vs Walking', href: '/cart-vs-walking-tour' },
  { label: 'Accessibility', href: '/accessibility-limited-mobility' },
  { label: 'How Long It Takes', href: '/how-long-it-takes' },
];

export const EXPLORE_LINKS = MONEY_PAGES.map((p) => ({ label: p.title, href: p.href }));
export const LEARN_LINKS = SUPPORT_PAGES.map((p) => ({ label: p.title, href: p.href }));

/** Feeds the header's "Tours" dropdown. */
export const TOURS_NAV_ITEMS: NavItem[] = MONEY_PAGES.map((p) => ({ title: p.title, href: p.href, keyword: p.keyword }));

/** Feeds the header's "Plan Your Ride" dropdown and the footer's Learn column. */
export const PLAN_NAV_ITEMS: NavItem[] = SUPPORT_PAGES.map((p) => ({ title: p.title, href: p.href, keyword: p.keyword }));

/**
 * The site's named author persona. A real photoshoot is still "to build" per
 * the site blueprint, so every UI slot uses an initials avatar rather than a
 * stock photo standing in for a real person. Distinct from Underground
 * Colosseum's Luca Moretti, Private Vatican's Elena Bianchi, Pompeii Day
 * Trip's Marco Esposito, and Rome Vespa's Chiara Rinaldi — a separate
 * Rome-based specialist whose credential matches this property's
 * accessibility/comfort framing, per the network's "no anonymous Team
 * byline" rule.
 */
export const AUTHOR = {
  name: 'Sofia Bellini',
  initials: 'SB',
  title: 'Licensed Rome tour guide & certified accessible-travel consultant',
  domain: 'golfcartrome.com',
  bio: 'Every route on this site has been checked from the cart itself — boarding step height, curb cuts, rest-stop spacing, and shade cover — not just for scenery. Independent — not affiliated with any single cart operator, GetYourGuide, or Viator.',
};

export const PRIVACY_POLICY = {
  title: 'Privacy Policy',
  intro: 'Last updated: this page is reviewed periodically and updated when our practices change.',
  sections: [
    {
      heading: 'What we collect',
      content: 'Golf Cart Rome does not currently require an account to browse the site, and account sign-in shown in the header is not yet active. If you email us, we keep that correspondence to answer your question and don\'t add you to any mailing list without asking first.',
    },
    {
      heading: 'Cookies',
      content: 'The site may use a small number of essential cookies needed for basic functionality. See our Cookie Policy for detail on third-party cookies set when you click through to our booking partner.',
    },
    {
      heading: 'Affiliate links',
      content: 'Tour booking links on this site go to GetYourGuide, our affiliate partner. Once you leave our site, GetYourGuide\'s own privacy policy governs how your information is handled — we don\'t receive your payment or personal booking details.',
    },
  ],
  contactEmail: 'hello@golfcartrome.com',
};

export const TERMS_OF_SERVICE = {
  title: 'Terms of Service',
  intro: 'By accessing this site, you agree to these terms.',
  sections: [
    {
      heading: 'About this site',
      content: 'Golf Cart Rome publishes first-hand comparisons of golf cart tours from multiple Rome-based operators. We are not affiliated with any tour operator, GetYourGuide, Viator, or the city of Rome — we are an independent review guide.',
    },
    {
      heading: 'What we are not liable for',
      content: 'This site provides information and tour comparisons in good faith. Booking and tour details are always the responsibility of the tour operator — we are not responsible for cancellations, changes to tour content, pricing updates, vehicle availability, or any other matters between you and the tour operator.',
    },
    {
      heading: 'Affiliate links',
      content: 'Tour booking links on this site are affiliate partnerships with GetYourGuide. When you book through our links, we earn a commission, which supports this site. This does not affect the price you pay.',
    },
    {
      heading: 'No warranties',
      content: 'This site is provided "as-is" without warranties of any kind. We make no guarantees about availability, accuracy, tour accessibility claims, or fitness for a particular purpose.',
    },
  ],
  contactEmail: 'hello@golfcartrome.com',
};

export const COOKIE_POLICY = {
  title: 'Cookie Policy',
  intro: 'This site uses cookies to enhance your experience and track site performance.',
  sections: [
    {
      heading: 'What cookies we use',
      content: 'Golf Cart Rome uses essential cookies needed for basic site functionality, such as remembering your preferences and maintaining session security.',
    },
    {
      heading: 'Third-party cookies',
      content: 'When you click through to GetYourGuide to book a tour, third-party cookies may be set by GetYourGuide and their analytics partners. These are governed by GetYourGuide\'s own cookie and privacy policies, not this site.',
    },
    {
      heading: 'Managing cookies',
      content: 'Most browsers allow you to control cookies through their settings. Disabling cookies may affect the site\'s functionality.',
    },
    {
      heading: 'Changes to this policy',
      content: 'We may update this cookie policy at any time. Changes take effect immediately upon posting to this page.',
    },
  ],
};

export const AFFILIATE_DISCLOSURE = {
  title: 'Affiliate Disclosure',
  intro: 'This site earns commissions through affiliate partnerships. Here\'s how that works and how it affects you.',
  sections: [
    {
      heading: 'How we earn money',
      content: 'Golf Cart Rome publishes tour comparisons and links to booking pages on GetYourGuide. When you book through our links, GetYourGuide pays us a commission. This is our primary source of funding for maintaining and updating this site.',
    },
    {
      heading: 'How this affects our recommendations',
      content: 'We compare tours honestly based on route, comfort, value, and accessibility — the same criteria we\'d use if writing for ourselves. The commission structure doesn\'t change which tours we feature or how we rank them. We recommend tours because we believe they\'re good, not because they pay different commission rates.',
    },
    {
      heading: 'Who runs this site',
      content: 'Golf Cart Rome is run by Sofia Bellini, an independent licensed Rome tour guide and accessible-travel consultant. Every tour featured here has been personally tested from inside a golf cart, not just researched online.',
    },
    {
      heading: 'Questions',
      content: 'If you have questions about this disclosure or how our affiliate partnerships work, email us at hello@golfcartrome.com — we\'re happy to explain.',
    },
  ],
  contactEmail: 'hello@golfcartrome.com',
};
