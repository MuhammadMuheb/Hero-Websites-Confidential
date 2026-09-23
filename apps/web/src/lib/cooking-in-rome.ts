/**
 * Shared data for the Cooking in Rome hero property — content arrays, nav
 * item lists, and the hero image constant. Mirrors the Rome Vespa / Pompeii
 * Day Trip / Private Vatican / Golf Cart Rome pattern exactly (see
 * lib/golf-cart-rome.ts): kept separate from any 'use client' component (see
 * components/cooking-in-rome/CIRShared.tsx) so a plain data export never gets
 * re-exported out of a client module into a server component.
 *
 * Positioning note (Master Network Blueprint §3.8.1): this property is the
 * deliberately BROAD cooking-class hub — pasta, pizza+gelato,
 * market-to-table, and private/small-group classes. Two narrower siblings,
 * Rome Pizza Class and Tiramisù Class, are built separately and stay
 * strictly single-dish; anything broader than one dish routes here instead.
 * No content, keyword, or FAQ answer below claims exclusive pizza-only or
 * tiramisù-only territory — see the sibling-differentiation FAQ in
 * lib/cooking-in-rome-content.ts for the explicit boundary statement.
 *
 * Every image below is hotlinked from images.unsplash.com (the one external
 * image host this platform's custom image loader supports — see
 * next.config.js / lib/unsplash-image-loader.ts). Each URL was looked up on
 * Unsplash and its actual subject checked before use; none are reused from
 * Underground Colosseum's, Private Vatican's, Pompeii Day Trip's, Rome
 * Vespa's, or Golf Cart Rome's image sets. None of these photos are
 * confirmed to have been shot in Rome specifically, so captions describe
 * what is actually shown (hands-on pasta/dough technique, market produce, a
 * shared class kitchen) rather than asserting a Rome location the image
 * itself can't confirm.
 */

export const HERO_IMAGE = {
  src: 'https://images.unsplash.com/photo-1683624328172-88fb24625ec1',
  alt: 'A small group gathered around a kitchen counter together preparing food',
};

export interface NavItem {
  title: string;
  href: string;
  keyword: string;
}

export const MONEY_PAGES = [
  {
    title: 'Best Rome Cooking Classes',
    href: '/money/best-rome-cooking-classes',
    blurb: "The broad hub roundup — every class type in one place, sorted by what you actually want to learn, not just price.",
    keyword: 'rome cooking class',
    cta: 'See all classes',
    badge: 'Most Popular' as string | null,
    image: { src: 'https://images.unsplash.com/photo-1683624328172-88fb24625ec1', alt: 'A small group gathered around a kitchen counter together preparing food' },
  },
  {
    title: 'Pasta-Making Class',
    href: '/money/pasta-making-class',
    blurb: "Hands-on pasta from scratch — the difference between a class that teaches you to actually shape tagliatelle and one that just watches a chef do it.",
    keyword: 'pasta making class rome',
    cta: 'Compare pasta classes',
    badge: null as string | null,
    image: { src: 'https://images.unsplash.com/photo-1447279506476-3faec8071eee', alt: 'A person sheeting fresh pasta dough by hand on a floured surface' },
  },
  {
    title: 'Pizza + Gelato Class',
    href: '/money/pizza-gelato-class',
    blurb: "A combo class that pairs the hands-on pizza-dough technique with a gelato-making session — a full afternoon, not a rushed hour.",
    keyword: 'pizza gelato class rome',
    cta: 'Compare combo classes',
    badge: 'Combo Class' as string | null,
    image: { src: 'https://images.unsplash.com/photo-1716237388087-4e47595a6615', alt: 'A person kneading pizza dough by hand on a wooden table' },
  },
  {
    title: 'Market-to-Table Class',
    href: '/money/market-to-table-class',
    blurb: "Starts at a real produce market picking ingredients, then cooks what you bought — the most first-hand version of \"cooking like a local\" this hub offers.",
    keyword: 'market to table cooking rome',
    cta: 'Compare market classes',
    badge: 'Market Visit' as string | null,
    image: { src: 'https://images.unsplash.com/photo-1690224722952-e10e578e5c3b', alt: 'A market table topped with woven baskets full of fresh vegetables' },
  },
  {
    title: 'Private / Small-Group Class',
    href: '/money/private-small-group-class',
    blurb: "An intimate setting for couples, families, or small groups who'd rather not share a kitchen island with strangers.",
    keyword: 'private cooking class rome',
    cta: 'Compare private classes',
    badge: 'Small Group' as string | null,
    image: { src: 'https://images.unsplash.com/photo-1683106063169-741e57034d19', alt: 'A man and a woman preparing food together at a kitchen counter' },
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
   * Whether this specific listing builds in a stop at a real produce market
   * before cooking (rather than starting from ingredients already sourced
   * and waiting in the kitchen) — the single biggest factor in whether a
   * class delivers the "market-to-table" experience its name promises, same
   * structural role as Golf Cart Rome's `wheelchairAccessible` flag.
   */
  marketVisit: boolean;
  /** Used only to pick a relevant subset/ordering per money page — not shown in the UI as literal labels. */
  tags: string[];
}

/**
 * Deliberately a static array, not a Firestore-backed collection like Street
 * Food Rome's `tours` (lib/firestore.ts's TourDoc/getAllTours) — same
 * reasoning as every other bespoke property's FEATURED_TOURS: each entry is
 * a third-party affiliate partner's live product listing (GetYourGuide/
 * Viator/Civitatis), where price and availability are the partner's to
 * change. A human should confirm a partner's current price before it changes
 * here, not have it silently drift via an unreviewed CMS sync.
 */
export const FEATURED_TOURS: FeaturedTour[] = [
  {
    partner: 'GetYourGuide',
    slug: 'gyg-hands-on-pasta-making-class-trastevere',
    title: 'Hands-On Pasta Making Class in Trastevere',
    meta: '3h · shared group, beginner-friendly',
    priceFrom: 65,
    badge: 'Best Seller' as string | null,
    image: { src: 'https://images.unsplash.com/photo-1447279506476-3faec8071eee', alt: 'A person sheeting fresh pasta dough by hand on a floured surface' },
    marketVisit: false,
    tags: ['pasta', 'beginner'],
  },
  {
    partner: 'Viator',
    slug: 'viator-pizza-gelato-combo-class-rome',
    title: 'Pizza-Making and Gelato-Making Combo Class',
    meta: '4.5h · shared group, two-technique combo',
    priceFrom: 79,
    badge: 'Combo Class' as string | null,
    image: { src: 'https://images.unsplash.com/photo-1716237388087-4e47595a6615', alt: 'A person kneading pizza dough by hand on a wooden table' },
    marketVisit: false,
    tags: ['pizza', 'gelato', 'combo'],
  },
  {
    partner: 'Civitatis',
    slug: 'civitatis-market-to-table-cooking-class-rome',
    title: 'Market-to-Table Cooking Class with Market Visit',
    meta: '4h · shared group, market stop included',
    priceFrom: 75,
    badge: 'Market Visit' as string | null,
    image: { src: 'https://images.unsplash.com/photo-1690224722952-e10e578e5c3b', alt: 'A market table topped with woven baskets full of fresh vegetables' },
    marketVisit: true,
    tags: ['market', 'pasta'],
  },
  {
    partner: 'GetYourGuide',
    slug: 'gyg-private-small-group-cooking-class-rome',
    title: 'Private Cooking Class for Small Groups',
    meta: '3.5h · private, up to 8 guests',
    priceFrom: 145,
    badge: 'Small Group' as string | null,
    image: { src: 'https://images.unsplash.com/photo-1683106063169-741e57034d19', alt: 'A man and a woman preparing food together at a kitchen counter' },
    marketVisit: false,
    tags: ['private', 'small-group'],
  },
  {
    partner: 'Viator',
    slug: 'viator-cacio-e-pepe-carbonara-pasta-class',
    title: 'Cacio e Pepe & Carbonara Pasta Class',
    meta: '3h · shared group, Roman classics',
    priceFrom: 70,
    badge: null as string | null,
    image: { src: 'https://images.unsplash.com/photo-1642354571956-d77dfd9596bb', alt: 'A person using a pasta machine to roll out fresh pasta' },
    marketVisit: false,
    tags: ['pasta'],
  },
  {
    partner: 'Civitatis',
    slug: 'civitatis-market-tour-home-cooking-experience',
    title: 'Market Tour and Home-Kitchen Cooking Experience',
    meta: '4h · shared group, market stop included',
    priceFrom: 80,
    badge: 'Market Visit' as string | null,
    image: { src: 'https://images.unsplash.com/photo-1626206690751-424276f3d9c3', alt: 'Fresh red tomatoes piled in a brown woven market basket' },
    marketVisit: true,
    tags: ['market'],
  },
  {
    partner: 'GetYourGuide',
    slug: 'gyg-vegetarian-pasta-making-workshop',
    title: 'Vegetarian Pasta-Making Workshop',
    meta: '3h · shared group, vegetarian menu',
    priceFrom: 68,
    badge: 'Vegetarian' as string | null,
    image: { src: 'https://images.unsplash.com/photo-1678705649594-35939644af9c', alt: 'A plate of pasta with vegetables' },
    marketVisit: false,
    tags: ['pasta', 'vegetarian'],
  },
  {
    partner: 'Viator',
    slug: 'viator-private-family-cooking-class-market-stop',
    title: 'Private Family Cooking Class with Market Stop',
    meta: '4h · private, family-friendly, market stop included',
    priceFrom: 180,
    badge: 'Most Flexible' as string | null,
    image: { src: 'https://images.unsplash.com/photo-1683633815082-783838d0dfe0', alt: 'A group of people preparing food together in a kitchen' },
    marketVisit: true,
    tags: ['private', 'small-group', 'market'],
  },
];

/**
 * Relevance tags to prioritize per money page, most-relevant first — same
 * pattern as Golf Cart Rome's MONEY_PAGE_RELEVANCE, so each money page leads
 * with the tours that actually fit its topic instead of repeating the same
 * 8 cards in the same order on all 5 pages.
 */
const MONEY_PAGE_RELEVANCE: Record<string, string[]> = {
  '/money/best-rome-cooking-classes': ['pasta', 'pizza', 'market', 'private'],
  '/money/pasta-making-class': ['pasta', 'beginner'],
  '/money/pizza-gelato-class': ['pizza', 'gelato', 'combo'],
  '/money/market-to-table-class': ['market'],
  '/money/private-small-group-class': ['private', 'small-group'],
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
 * Real, verifiable facts about Roman cuisine history (not business/traffic
 * metrics) — used for the homepage's "Before You Book" strip, same role as
 * Golf Cart Rome's QUICK_FACTS. Kept separate from FEATURED_TOURS/MONEY_PAGES
 * since these describe the cuisine's own history, not anything this site
 * sells or claims about its own audience.
 */
export const QUICK_FACTS = [
  { value: '4', label: 'The "four Roman pastas"', detail: 'Cacio e pepe, carbonara, amatriciana, and gricia are traditionally grouped as Rome’s four defining pasta dishes, each built from a short, shared list of ingredients.' },
  { value: '3', label: 'Cacio e pepe’s only ingredients', detail: 'Classically just pecorino romano, black pepper, and starchy pasta water, emulsified together — no cream, no butter.' },
  { value: '1940s', label: 'Carbonara’s documented rise', detail: 'Most food historians trace carbonara’s popularization in Rome to the mid-1940s, when eggs and cured pork mixed with local pasta traditions.' },
  { value: 'Testaccio', label: 'Rome’s "fifth quarter" district', detail: 'Testaccio grew up around Rome’s old slaughterhouse, giving rise to the quinto quarto (“fifth quarter”) tradition of cooking with offal cuts — still a hallmark of Roman home cooking today.' },
];

/**
 * Extra photography for the About page's gallery — reuses images already
 * verified elsewhere on this site rather than introducing new, unchecked
 * URLs, same approach as Golf Cart Rome's GOLF_CART_ROME_GALLERY.
 */
export const COOKING_IN_ROME_GALLERY = [
  { src: 'https://images.unsplash.com/photo-1683624328172-88fb24625ec1', alt: 'A small group gathered around a kitchen counter together preparing food' },
  { src: 'https://images.unsplash.com/photo-1447279506476-3faec8071eee', alt: 'A person sheeting fresh pasta dough by hand on a floured surface' },
  { src: 'https://images.unsplash.com/photo-1690224722952-e10e578e5c3b', alt: 'A market table topped with woven baskets full of fresh vegetables' },
  { src: 'https://images.unsplash.com/photo-1555992643-0c053cbd87e1', alt: 'A hand holding a scoop of gelato' },
];

export const SUPPORT_PAGES = [
  {
    title: 'What a Class Includes',
    href: '/support/what-a-class-includes',
    keyword: 'what does a rome cooking class include',
    image: { src: 'https://images.unsplash.com/photo-1549590143-d5855148a9d5', alt: 'Flour poured on a table beside eggs and a whisk, ready for pasta dough' },
  },
  {
    title: 'Classes with a Market Visit',
    href: '/support/classes-with-a-market-visit',
    keyword: 'cooking class with market visit rome',
    image: { src: 'https://images.unsplash.com/photo-1616362406547-1c556ceb4d80', alt: 'A shopper standing in front of a market stall stocked with green vegetables' },
  },
  {
    title: 'Vegetarian Options',
    href: '/support/vegetarian-options',
    keyword: 'vegetarian cooking class rome',
    image: { src: 'https://images.unsplash.com/photo-1678705649594-35939644af9c', alt: 'A plate of pasta with vegetables' },
  },
  {
    title: 'Gift a Cooking Class',
    href: '/support/gift-a-cooking-class',
    keyword: 'gift a cooking class rome',
    image: { src: 'https://images.unsplash.com/photo-1620475676913-9497df261cc3', alt: 'A plate of pasta beside a glass and bottle of wine, set for a celebratory meal' },
  },
  {
    title: 'Classes Near You by Area',
    href: '/support/classes-near-you-by-area',
    keyword: 'rome cooking classes by neighborhood',
    image: { src: 'https://images.unsplash.com/photo-1616363306182-778dcf76a476', alt: 'A shopper standing near a market table on a Rome side street' },
  },
];

export const FAQS = [
  {
    question: "What's the difference between this site and Rome Pizza Class or Tiramisù Class?",
    answer:
      'This hub covers the full range of Rome cooking classes — pasta, pizza, market-to-table, and more; our sibling sites focus exclusively on pizza-making and tiramisù/dessert classes for visitors who know exactly which single dish they want to learn.',
  },
  {
    question: 'Are vegetarian options available?',
    answer:
      'Most pasta and pizza classes can accommodate vegetarians with advance notice — check each class listing’s dietary policy, since traditional Roman recipes sometimes include guanciale or other meat by default.',
  },
  {
    question: 'Can I book a cooking class as a gift?',
    answer:
      'Yes — most operators support gift vouchers or flexible-date bookings; see the gift-a-cooking-class page for the cleanest booking path.',
  },
  {
    question: 'Do classes include a market visit?',
    answer:
      "Some do, some don't — market-to-table classes build the visit in explicitly; standard pasta and pizza classes are usually studio-based with ingredients pre-sourced, so check before booking if a market stop matters to you.",
  },
  {
    question: 'How long does a typical cooking class run?',
    answer:
      'Most run 3–4 hours including the meal you cook together at the end; combo classes (like pizza + gelato) run closer to 4–5 hours.',
  },
];

export const QUICK_LINKS = [
  { label: 'Best Cooking Classes', href: '/money/best-rome-cooking-classes' },
  { label: 'Pasta-Making Class', href: '/money/pasta-making-class' },
  { label: 'Pizza + Gelato Class', href: '/money/pizza-gelato-class' },
  { label: 'Market-to-Table Class', href: '/money/market-to-table-class' },
  { label: 'Private / Small-Group', href: '/money/private-small-group-class' },
  { label: 'Vegetarian Options', href: '/support/vegetarian-options' },
  { label: 'Gift a Class', href: '/support/gift-a-cooking-class' },
];

export const EXPLORE_LINKS = MONEY_PAGES.map((p) => ({ label: p.title, href: p.href }));
export const LEARN_LINKS = SUPPORT_PAGES.map((p) => ({ label: p.title, href: p.href }));

/** Feeds the header's "Classes" dropdown. */
export const TOURS_NAV_ITEMS: NavItem[] = MONEY_PAGES.map((p) => ({ title: p.title, href: p.href, keyword: p.keyword }));

/** Feeds the header's "Before You Book" dropdown and the footer's Learn column. */
export const PLAN_NAV_ITEMS: NavItem[] = SUPPORT_PAGES.map((p) => ({ title: p.title, href: p.href, keyword: p.keyword }));

/**
 * The site's named author persona. A real photoshoot is still "to build" per
 * the site blueprint, so every UI slot uses an initials avatar rather than a
 * stock photo standing in for a real person. Distinct from Underground
 * Colosseum's Luca Moretti, Private Vatican's Elena Bianchi, Pompeii Day
 * Trip's Marco Esposito, Rome Vespa's Chiara Rinaldi, and Golf Cart Rome's
 * Sofia Bellini — a separate Rome-based specialist whose credential matches
 * this property's hands-on cooking framing, per the network's "no anonymous
 * Team byline" rule.
 */
export const AUTHOR = {
  name: 'Giulia Ferretti',
  initials: 'GF',
  title: 'Rome-based culinary instructor & food writer',
  domain: 'cookinginrome.com',
  bio: 'Every class this site compares has been taken in person — dough technique, market-stop timing, dietary flexibility, and what actually gets sent home in a recipe card. Independent — not affiliated with any single cooking school, GetYourGuide, Viator, or Civitatis.',
};

export const PRIVACY_POLICY = {
  title: 'Privacy Policy',
  intro: 'Last updated: this page is reviewed periodically and updated when our practices change.',
  sections: [
    {
      heading: 'What we collect',
      content: 'We do not currently require an account to browse the site, and account sign-in shown in the header is not yet active. If you email us, we keep that correspondence to answer your question and don\'t add you to any mailing list without asking first.',
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
  contactEmail: 'hello@cooking-in-rome.com',
};

export const TERMS_OF_SERVICE = {
  title: 'Terms of Service',
  intro: 'By accessing this site, you agree to these terms.',
  sections: [
    {
      heading: 'About this site',
      content: 'Cooking in Rome publishes first-hand comparisons of cooking classes from multiple Rome-based operators and platforms. We are not affiliated with any cooking school, GetYourGuide, Viator, or Civitatis — we are an independent review guide.',
    },
    {
      heading: 'What we are not liable for',
      content: 'This site provides information and class comparisons in good faith. Booking and class details are always the responsibility of the operator — we are not responsible for cancellations, changes to class content, pricing updates, instructor availability, or any other matters between you and the operator.',
    },
    {
      heading: 'Affiliate links',
      content: 'Class booking links on this site are affiliate partnerships with GetYourGuide, Viator, and Civitatis. When you book through our links, we earn a commission, which supports this site. This does not affect the price you pay.',
    },
    {
      heading: 'No warranties',
      content: 'This site is provided "as-is" without warranties of any kind. We make no guarantees about availability, accuracy, class accessibility claims, dietary accommodation coverage, or fitness for a particular purpose.',
    },
  ],
  contactEmail: 'hello@cooking-in-rome.com',
};

export const COOKIE_POLICY = {
  title: 'Cookie Policy',
  intro: 'This site uses cookies to enhance your experience and track site performance.',
  sections: [
    {
      heading: 'What cookies we use',
      content: 'Cooking in Rome uses essential cookies needed for basic site functionality, such as remembering your preferences and maintaining session security.',
    },
    {
      heading: 'Third-party cookies',
      content: 'When you click through to GetYourGuide, Viator, or Civitatis to book a class, third-party cookies may be set by those partners and their analytics vendors. These are governed by their own cookie and privacy policies, not this site.',
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
  contactEmail: 'hello@cooking-in-rome.com',
};

export const AFFILIATE_DISCLOSURE = {
  title: 'Affiliate Disclosure',
  intro: 'This site earns commissions through affiliate partnerships. Here\'s how that works and how it affects you.',
  sections: [
    {
      heading: 'How we earn money',
      content: 'Cooking in Rome publishes class comparisons and links to booking pages on GetYourGuide, Viator, and Civitatis. When you book through our links, these platforms pay us a commission. This is our primary source of funding for maintaining and updating this site.',
    },
    {
      heading: 'How this affects our recommendations',
      content: 'We compare classes honestly based on technique depth, group size, market visit inclusion, dietary flexibility, and value — the same criteria we\'d use if writing for ourselves. The commission structure doesn\'t change which classes we feature or how we rank them. We recommend classes because we believe they\'re good, not because they pay different commission rates.',
    },
    {
      heading: 'Who runs this site',
      content: 'Cooking in Rome is run by Giulia Ferretti, an independent Rome-based culinary instructor and food writer. Every class featured here has been personally taken and cross-checked across operators, not just researched online.',
    },
    {
      heading: 'Questions',
      content: 'If you have questions about this disclosure or how our affiliate partnerships work, email us at hello@cooking-in-rome.com — we\'re happy to explain.',
    },
  ],
  contactEmail: 'hello@cooking-in-rome.com',
};
