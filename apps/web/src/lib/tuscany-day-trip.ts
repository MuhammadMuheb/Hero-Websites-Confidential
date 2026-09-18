/**
 * Shared data for the Tuscany Day Trip hero property — content arrays, nav
 * item lists, and the hero image constant. Mirrors the Tiramisù Class /
 * Pompeii Day Trip pattern exactly (see lib/tiramisu-class.ts and
 * lib/pompeii-day-trip.ts): kept separate from any 'use client' component
 * (see components/tuscany-day-trip/TDTShared.tsx) so a plain data export
 * never gets re-exported out of a client module into a server component.
 *
 * This is the 9th bespoke hero property and, per the project's own planning
 * notes, sits alongside Pompeii Day Trip in the "day-trip-family" grouping
 * (Amalfi and Tivoli Day Trip are the other two planned siblings in that
 * family) — a full-day countryside/hill-town trip out of a single home base
 * (Florence), rather than a single-city or single-activity property.
 *
 * Every image below is hotlinked from images.unsplash.com (the one external
 * image host this platform's custom image loader supports — see
 * next.config.js / lib/unsplash-image-loader.ts). Each URL was opened and
 * visually inspected in the Browser pane before use to confirm it actually
 * shows Tuscan vineyards, hill towns, or countryside roads — none are reused
 * from any other property's image set (checked by grepping every other
 * lib/*.ts file's photo IDs before picking these).
 */

export const HERO_IMAGE = {
  src: 'https://images.unsplash.com/photo-1784824137876-9282a4c51535',
  alt: 'A gravel road winding up to a cypress-ringed Tuscan farmhouse across rolling countryside',
};

export interface NavItem {
  title: string;
  href: string;
  keyword: string;
}

export const MONEY_PAGES = [
  {
    title: "Tuscany from Florence",
    href: "/money/tuscany-from-florence",
    blurb: "The flagship full-day trip from Florence — what’s realistic to see, and what gets cut when the day runs long.",
    keyword: "tuscany day trip from florence",
    cta: "Compare Florence day trips",
    badge: "Most Popular" as string | null,
    image: { src: "https://images.unsplash.com/photo-1596142332133-327e2a0ff006", alt: "Vineyard rows climbing a Tuscan hillside toward a distant hill town at golden hour" },
  },
  {
    title: "Tuscany Wine Day Trip",
    href: "/money/tuscany-wine-day-trip",
    blurb: "A Chianti tasting day done properly means 2-3 wineries, not a rushed five-stop marathon.",
    keyword: "tuscany wine tour",
    cta: "Compare wine day trips",
    badge: "Wine Tasting" as string | null,
    image: { src: "https://images.unsplash.com/photo-1726741827090-0b5a52b45686", alt: "A hand pressing dark grapes over a wine glass between rows of vines in a sunlit vineyard" },
  },
  {
    title: "Siena + San Gimignano + Chianti",
    href: "/money/siena-san-gimignano-chianti",
    blurb: "The classic trio — but the order you visit them in changes the whole day’s energy.",
    keyword: "siena san gimignano chianti tour",
    cta: "Compare trio tours",
    badge: "Classic Trio" as string | null,
    image: { src: "https://images.unsplash.com/photo-1653228239729-f7cc50704951", alt: "San Gimignano’s medieval stone towers rising above a foreground vineyard, seen from a nearby hillside" },
  },
  {
    title: "Florence-Base Day Trips",
    href: "/money/florence-base-day-trips",
    blurb: "A hub roundup of every realistic day trip from a Florence base, ranked by how much transit eats your day.",
    keyword: "day trips from florence",
    cta: "See all Florence day trips",
    badge: null as string | null,
    image: { src: "https://images.unsplash.com/photo-1578262634053-eead874052be", alt: "A rooftop view over Florence’s terracotta roofs and a bell tower, with green hills visible in the distance" },
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
   * Whether this specific listing includes a proper seated wine-tasting stop
   * (as opposed to a sightseeing-only itinerary that skips wine entirely) —
   * this property's equivalent of Tiramisù Class's eatInClass and Pompeii
   * Day Trip's skipLineEntry flag: the single biggest factor visitors ask
   * about first, since "does this actually include wine tasting" is the
   * number-one filter question on a Tuscany day trip.
   */
  winetastingIncluded: boolean;
  /** Used only to pick a relevant subset/ordering per money page — not shown in the UI as literal labels. */
  tags: string[];
}

/**
 * Deliberately a static array, not a Firestore-backed collection — same
 * reasoning as every other bespoke property's FEATURED_TOURS: each entry is
 * a third-party affiliate partner's live product listing (GetYourGuide/
 * Viator/Civitatis, per this property's blueprint §3.5), where price and
 * availability are the partner's to change. A human should confirm a
 * partner's current price before it changes here, not have it silently
 * drift via an unreviewed CMS sync.
 */
export const FEATURED_TOURS: FeaturedTour[] = [
  {
    partner: 'GetYourGuide',
    slug: 'gyg-tuscany-day-trip-siena-san-gimignano-florence',
    title: 'Tuscany Day Trip from Florence: Siena & San Gimignano',
    meta: 'Full day · small group',
    priceFrom: 139,
    badge: 'Best Seller' as string | null,
    image: { src: 'https://images.unsplash.com/photo-1596142332133-327e2a0ff006', alt: 'Vineyard rows climbing a Tuscan hillside toward a distant hill town at golden hour' },
    winetastingIncluded: false,
    tags: ['from-florence', 'first-timer', 'siena-sg'],
  },
  {
    partner: 'Viator',
    slug: 'viator-chianti-wine-tasting-day-trip-3-wineries',
    title: 'Chianti Wine-Tasting Day Trip: 3 Wineries & Lunch',
    meta: '8h · small group',
    priceFrom: 159,
    badge: 'Best Value' as string | null,
    image: { src: 'https://images.unsplash.com/photo-1726741827090-0b5a52b45686', alt: 'A hand pressing dark grapes over a wine glass between rows of vines in a sunlit vineyard' },
    winetastingIncluded: true,
    tags: ['wine', 'tasting'],
  },
  {
    partner: 'Civitatis',
    slug: 'civitatis-siena-san-gimignano-chianti-full-day',
    title: 'Siena, San Gimignano & Chianti Full-Day Tour',
    meta: '9h · small group',
    priceFrom: 145,
    badge: null as string | null,
    image: { src: 'https://images.unsplash.com/photo-1653228239729-f7cc50704951', alt: "San Gimignano's medieval stone towers rising above a foreground vineyard, seen from a nearby hillside" },
    winetastingIncluded: true,
    tags: ['siena-sg', 'wine'],
  },
  {
    partner: 'GetYourGuide',
    slug: 'gyg-private-tuscany-day-trip-driver-guide',
    title: 'Private Tuscany Day Trip with Driver-Guide',
    meta: '8h · private, up to 7',
    priceFrom: 195,
    badge: 'Small Group' as string | null,
    image: { src: 'https://images.unsplash.com/photo-1783443799503-e1587f423bd0', alt: 'An arched brick wine cellar lined with large aging wooden barrels' },
    winetastingIncluded: true,
    tags: ['from-florence', 'wine', 'siena-sg', 'private'],
  },
  {
    partner: 'Viator',
    slug: 'viator-tuscany-highlights-large-group-coach',
    title: 'Tuscany Highlights Day Trip by Coach',
    meta: '10h · large group',
    priceFrom: 135,
    badge: 'Best Value' as string | null,
    image: { src: 'https://images.unsplash.com/photo-1578262634053-eead874052be', alt: "A rooftop view over Florence's terracotta roofs and a bell tower, with green hills visible in the distance" },
    winetastingIncluded: false,
    tags: ['from-florence', 'multi-destination'],
  },
  {
    partner: 'GetYourGuide',
    slug: 'gyg-chianti-countryside-bike-and-wine-tour',
    title: 'Chianti Countryside Bike & Wine-Tasting Tour',
    meta: '6h · small group',
    priceFrom: 149,
    badge: null as string | null,
    image: { src: 'https://images.unsplash.com/photo-1567072629554-20e689de2400', alt: 'Sunset light breaking over vineyard rows on a Tuscan hillside' },
    winetastingIncluded: true,
    tags: ['wine', 'tasting'],
  },
  {
    partner: 'Civitatis',
    slug: 'civitatis-florence-siena-san-gimignano-day-trip',
    title: 'Florence to Siena & San Gimignano Day Trip',
    meta: 'Full day · small group',
    priceFrom: 132,
    badge: 'Best Value' as string | null,
    image: { src: 'https://images.unsplash.com/photo-1744139056941-6200ae72e7cb', alt: 'Olive trees framing a stone Tuscan farmhouse and tower' },
    winetastingIncluded: false,
    tags: ['siena-sg', 'from-florence'],
  },
  {
    partner: 'Viator',
    slug: 'viator-private-wine-tasting-tuscan-countryside',
    title: 'Private Wine-Tasting Tour in the Tuscan Countryside',
    meta: '7h · private, up to 6',
    priceFrom: 189,
    badge: 'Celebration Friendly' as string | null,
    image: { src: 'https://images.unsplash.com/photo-1770453572726-f51592710ca6', alt: 'A small group tasting wine at an outdoor table beside large wooden barrels at golden hour' },
    winetastingIncluded: true,
    tags: ['wine', 'private'],
  },
];

/**
 * Relevance tags to prioritize per money page, most-relevant first — same
 * pattern as every other bespoke property's MONEY_PAGE_RELEVANCE, so each
 * money page leads with the tours that actually fit its own topic instead of
 * repeating the same 8 cards in the same order on all 4 pages.
 */
const MONEY_PAGE_RELEVANCE: Record<string, string[]> = {
  '/money/tuscany-from-florence': ['from-florence', 'first-timer'],
  '/money/tuscany-wine-day-trip': ['wine', 'tasting'],
  '/siena-san-gimignano-chianti': ['siena-sg'],
  '/florence-base-day-trips': ['from-florence', 'multi-destination'],
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
 * Real, verifiable facts about Tuscany/Chianti and Florence day-trip
 * logistics (not business/traffic metrics) — used for the homepage's
 * "Before You Book" strip, same role as every sibling property's
 * QUICK_FACTS.
 */
export const QUICK_FACTS = [
  { value: '1716', label: "Year Chianti's wine zone was first defined", detail: 'Grand Duke Cosimo III de’ Medici issued an edict delineating the Chianti production area — one of the earliest official wine-region boundaries anywhere.' },
  { value: '~1h15', label: 'Drive time, Florence to Siena', detail: 'The direct Firenze–Siena raccordo covers roughly 70km (43 miles), typically about 1 hour 15 minutes without traffic.' },
  { value: '14', label: 'Medieval towers still standing in San Gimignano', detail: 'Of the roughly 72 tower-houses rival families once built for status and defense, only 14 survive today.' },
  { value: '7', label: 'UNESCO World Heritage Sites across Tuscany', detail: 'Including the historic centres of Florence, Siena, and San Gimignano, and the Val d’Orcia cultural landscape — among the highest concentrations of any region in Italy.' },
];

/**
 * Extra Tuscany/vineyard/hill-town photography for the About page's
 * gallery — reuses images already verified elsewhere on this site rather
 * than introducing new, unchecked URLs, same approach as every sibling
 * property's own gallery constant.
 */
export const TUSCANY_DAY_TRIP_GALLERY = [
  { src: 'https://images.unsplash.com/photo-1784824137876-9282a4c51535', alt: 'A gravel road winding up to a cypress-ringed Tuscan farmhouse across rolling countryside' },
  { src: 'https://images.unsplash.com/photo-1596142332133-327e2a0ff006', alt: 'Vineyard rows climbing a Tuscan hillside toward a distant hill town at golden hour' },
  { src: 'https://images.unsplash.com/photo-1653228239729-f7cc50704951', alt: "San Gimignano's medieval stone towers rising above a foreground vineyard, seen from a nearby hillside" },
  { src: 'https://images.unsplash.com/photo-1496886357681-bb985aa5e4c6', alt: "A high rooftop view over Siena, with the Torre del Mangia visible among the terracotta roofs" },
];

export const SUPPORT_PAGES = [
  {
    title: 'Which Tuscany Trip to Pick',
    href: '/which-tuscany-trip-to-pick',
    keyword: 'which tuscany day trip to pick',
    image: { src: 'https://images.unsplash.com/photo-1496886357681-bb985aa5e4c6', alt: "A high rooftop view over Siena, with the Torre del Mangia visible among the terracotta roofs" },
  },
  {
    title: 'Wine Tour Logistics',
    href: '/wine-tour-logistics',
    keyword: 'tuscany wine tour logistics',
    image: { src: 'https://images.unsplash.com/photo-1783443799503-e1587f423bd0', alt: 'An arched brick wine cellar lined with large aging wooden barrels' },
  },
  {
    title: 'With or Without a Car',
    href: '/with-or-without-a-car',
    keyword: 'tuscany day trip with or without a car',
    image: { src: 'https://images.unsplash.com/photo-1593270187915-d7a91b726610', alt: 'An open two-lane road running straight through Tuscan countryside farmland' },
  },
  {
    title: 'Best Season for Tuscany',
    href: '/best-season-for-tuscany',
    keyword: 'best season for tuscany day trip',
    image: { src: 'https://images.unsplash.com/photo-1567072629554-20e689de2400', alt: 'Sunset light breaking over vineyard rows on a Tuscan hillside' },
  },
  {
    title: "What's Included",
    href: '/what-s-included',
    keyword: 'what is included in a tuscany day trip',
    image: { src: 'https://images.unsplash.com/photo-1744139056941-6200ae72e7cb', alt: 'Olive trees framing a stone Tuscan farmhouse and tower' },
  },
];

export const FAQS = [
  {
    question: 'Is a Tuscany day trip from Florence worth it, or should I stay overnight?',
    answer:
      'A day trip works well for one region (Chianti, or Siena/San Gimignano) — trying to cover both in a single day means rushing every stop, so overnight is worth considering if you want more than a taste.',
  },
  {
    question: 'Should I drive myself or take a guided tour?',
    answer:
      'Self-driving gives flexibility but means a designated non-drinker on a wine day; a guided tour removes that tradeoff entirely and handles Tuscany’s winding rural roads for you.',
  },
  {
    question: "What's the best season for a Tuscany day trip?",
    answer:
      'Late spring (May–June) and early autumn (September–October) give the best light and mildest weather; July–August is beautiful but hot and crowded, and harvest season (September) adds vineyard activity worth timing for.',
  },
  {
    question: 'How many wineries can I realistically visit in one day?',
    answer:
      'Two to three, with proper tasting time at each — more than that turns into rushed pours and no real appreciation of what makes each producer different.',
  },
  {
    question: 'Is Siena or San Gimignano better if I can only pick one?',
    answer:
      'Siena has more historic depth (the Duomo, Piazza del Campo); San Gimignano is smaller and more photogenic with its medieval towers — pair both if the day allows, but Siena wins on substance alone.',
  },
];

export const QUICK_LINKS = [
  { label: 'Tuscany from Florence', href: '/money/tuscany-from-florence' },
  { label: 'Tuscany Wine Day Trip', href: '/money/tuscany-wine-day-trip' },
  { label: 'Siena + San Gimignano + Chianti', href: '/siena-san-gimignano-chianti' },
  { label: 'Florence-Base Day Trips', href: '/florence-base-day-trips' },
  { label: 'Which Tuscany Trip to Pick', href: '/which-tuscany-trip-to-pick' },
  { label: 'With or Without a Car', href: '/with-or-without-a-car' },
  { label: 'Best Season for Tuscany', href: '/best-season-for-tuscany' },
];

export const EXPLORE_LINKS = MONEY_PAGES.map((p) => ({ label: p.title, href: p.href }));
export const LEARN_LINKS = SUPPORT_PAGES.map((p) => ({ label: p.title, href: p.href }));

/** Feeds the header's "Day Trips" dropdown. */
export const TOURS_NAV_ITEMS: NavItem[] = MONEY_PAGES.map((p) => ({ title: p.title, href: p.href, keyword: p.keyword }));

/** Feeds the header's "Before You Book" dropdown and the footer's Learn column. */
export const PLAN_NAV_ITEMS: NavItem[] = SUPPORT_PAGES.map((p) => ({ title: p.title, href: p.href, keyword: p.keyword }));

/**
 * The site's named author persona. A real photoshoot is still "to build" per
 * the site blueprint, so every UI slot uses an initials avatar rather than a
 * stock photo standing in for a real person. Distinct from Underground
 * Colosseum's Luca Moretti, Private Vatican's Elena Bianchi, Pompeii Day
 * Trip's Marco Esposito, Rome Vespa's Chiara Rinaldi, Golf Cart Rome's Sofia
 * Bellini, Cooking in Rome's Giulia Ferretti, Rome Pizza Class's Matteo
 * Russo, and Tiramisù Class's Bianca Conti — a Florence-based regional guide
 * credentialed for the Tuscan countryside and wine-route logistics this
 * property is built around, matching the network's "no anonymous Team
 * byline" rule.
 */
export const AUTHOR = {
  name: 'Caterina Salvestrini',
  initials: 'CS',
  title: 'Florence-based licensed regional guide, Tuscany wine routes',
  domain: 'tuscanydaytrip.com',
  bio: 'Every route on this site — Chianti wine stops, the Siena/San Gimignano trio, and the drive-vs-tour math — has been driven and walked in person, season by season. Independent; not owned by any winery or tour operator we compare.',
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
  contactEmail: 'hello@tuscany-day-trip.com',
};

export const TERMS_OF_SERVICE = {
  title: 'Terms of Service',
  intro: 'By accessing Tuscany Day Trip, you agree to these terms and conditions.',
  sections: [
    {
      heading: 'Use of the Site',
      content: 'Tuscany Day Trip provides independent day-trip guides and comparisons for informational purposes only. We are not affiliated with any tour operators, hotels, or wineries featured on this site. The information on this site is believed to be accurate but is provided "as is" without warranties of any kind.',
    },
    {
      heading: 'Affiliate Links',
      content: 'This site includes links to GetYourGuide, Viator, and other tour booking platforms, where we receive a commission if you book through our links. These commissions help support the independent research behind our guides and don\'t affect the price you pay.',
    },
    {
      heading: 'Limitation of Liability',
      content: 'To the extent permitted by law, Tuscany Day Trip, its authors, and affiliates are not liable for any direct, indirect, incidental, special, or consequential damages arising out of or related to your use of this site or any linked third-party sites.',
    },
    {
      heading: 'Changes to These Terms',
      content: 'We may update these terms at any time by posting the revised version on this page. Your continued use of the site constitutes your acceptance of the revised terms.',
    },
    {
      heading: 'Governing Law',
      content: 'These terms are governed by Italian law and the courts of Florence, Italy.',
    },
  ],
  contactEmail: 'hello@tuscany-day-trip.com',
};

export const COOKIE_POLICY = {
  title: 'Cookie Policy',
  intro: 'This Cookie Policy explains how Tuscany Day Trip uses cookies and similar technologies.',
  fallbackHtml: `
    <p>This Cookie Policy explains how Tuscany Day Trip ("we," "us") uses cookies and similar technologies on tuscanydaytrip.com.</p>
    <h2>What cookies we use</h2>
    <p>We use a small number of strictly necessary cookies to keep the site functioning — for example, remembering your cookie-consent choice. We also use standard analytics cookies to understand which pages and tours are useful to visitors, so we can improve the site over time.</p>
    <h2>Third-party cookies</h2>
    <p>When you click through to book a tour, you leave tuscanydaytrip.com and land on GetYourGuide, Viator, or Civitatis, our booking partners. These platforms set their own cookies under their own privacy and cookie policies, which we don't control. We recommend reviewing their policies directly if you have questions about their tracking.</p>
    <h2>Managing cookies</h2>
    <p>Most browsers let you block or delete cookies through their settings. Blocking cookies may affect how parts of this site work, but it won't prevent you from reading tour information or content.</p>
    <h2>Changes to this policy</h2>
    <p>We may update this policy occasionally to reflect changes in the tools we use. Check back here periodically for the current version.</p>
    <h2>Contact</h2>
    <p>Questions about this policy can be sent to <a href="mailto:hello@tuscany-day-trip.com">hello@tuscany-day-trip.com</a>.</p>
  `,
};

export const AFFILIATE_DISCLOSURE = {
  title: 'Affiliate Disclosure',
  intro: 'Full transparency about how this site works and how we make money.',
  sections: [
    {
      heading: 'How we earn money',
      content: 'Tuscany Day Trip is an independent guide maintained by a Florence-based licensed regional guide. When you book a tour through our links, we earn a small commission from our affiliate partners (GetYourGuide, Viator, Civitatis). We do not receive any money from the sites themselves for featuring them on this site.',
    },
    {
      heading: 'How this affects our recommendations',
      content: 'Our partner relationships do not influence which tours we recommend or how honestly we write about them. We compare tours across multiple operators and platforms, recommend the best option for your situation, and have no financial incentive to favor one partner over another — we earn the same commission regardless of which partner you choose.',
    },
    {
      heading: 'Who runs this site',
      content: 'Caterina Salvestrini, a Florence-based licensed regional guide with years of experience guiding day trips through Chianti, Siena, San Gimignano, and surrounding Tuscan countryside. Every route, wine stop, and timing note on this site reflects her direct, first-hand experience.',
    },
    {
      heading: 'Questions',
      content: 'For questions about this disclosure or anything else on the site, reach out to hello@tuscany-day-trip.com.',
    },
  ],
  contactEmail: 'hello@tuscany-day-trip.com',
};
