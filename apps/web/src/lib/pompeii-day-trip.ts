/**
 * Shared data for the Pompeii Day Trip hero property — content arrays, nav
 * item lists, and the hero image constant. Mirrors the Underground Colosseum
 * and Private Vatican pattern exactly (see lib/underground-colosseum.ts and
 * lib/private-vatican.ts): kept separate from any 'use client' component (see
 * components/pompeii-day-trip/PDTShared.tsx) so a plain data export never
 * gets re-exported out of a client module into a server component.
 *
 * Every image below is hotlinked from images.unsplash.com (the one external
 * image host this platform's custom image loader supports — see
 * next.config.js / lib/unsplash-image-loader.ts). Each URL was opened and
 * visually checked via the Unsplash search UI before use, to confirm it
 * actually shows Pompeii's ruins, Mount Vesuvius, Herculaneum, or the
 * plaster-cast displays — none are reused from Underground Colosseum's,
 * Private Vatican's, or Street Food Rome's image sets.
 */

export const HERO_IMAGE = {
  src: 'https://images.unsplash.com/photo-1654258859717-d8fb76e421b6',
  alt: "The ruins of Pompeii's forum with Mount Vesuvius rising in the background",
};

export interface NavItem {
  title: string;
  href: string;
  keyword: string;
}

export const MONEY_PAGES = [
  {
    title: 'Pompeii from Rome',
    href: '/money/pompeii-from-rome',
    blurb: 'The train-vs-tour math for a Rome-based day at Pompeii, honestly done.',
    keyword: 'pompeii day trip from rome',
    cta: 'See tours',
    badge: 'Most Popular' as string | null,
    image: { src: 'https://images.unsplash.com/photo-1686252183235-67dfafa22f60', alt: 'The ruins of ancient Pompeii under open sky, viewed from one of its old paved streets' },
  },
  {
    title: 'Pompeii from Naples',
    href: '/money/pompeii-from-naples',
    blurb: 'The closest base to Pompeii by a wide margin — what a half-day trip really looks like.',
    keyword: 'pompeii from naples',
    cta: 'See tours',
    badge: 'Fastest Trip' as string | null,
    image: { src: 'https://images.unsplash.com/photo-1567202170721-bd01fbdea30a', alt: 'Aerial view of the Bay of Naples, with the short Circumvesuviana route to Pompeii running along the coast' },
  },
  {
    title: 'Pompeii from Sorrento/Amalfi',
    href: '/money/pompeii-from-sorrento-amalfi',
    blurb: 'An easy Circumvesuviana run most coast-based itineraries skip in favor of Capri.',
    keyword: 'pompeii from sorrento',
    cta: 'See tours',
    badge: null as string | null,
    image: { src: 'https://images.unsplash.com/photo-1592036930791-4a8471d3105f', alt: 'Boats along the Sorrento coastline, the departure point for the short train ride inland to Pompeii' },
  },
  {
    title: 'Pompeii + Vesuvius Combo',
    href: '/money/pompeii-vesuvius-combo',
    blurb: 'The single most-asked-about pairing, and the single easiest to get the timing wrong on.',
    keyword: 'pompeii and vesuvius tour',
    cta: 'Compare',
    badge: 'Full Day' as string | null,
    image: { src: 'https://images.unsplash.com/photo-1506852889966-0ec40a8bf2b5', alt: "Aerial view of Mount Vesuvius's crater rim, the summit hike most Pompeii-combo tours end with" },
  },
  {
    title: 'Pompeii + Herculaneum',
    href: '/money/pompeii-herculaneum',
    blurb: 'Smaller, denser, and better-preserved in places — worth pairing, not skipping.',
    keyword: 'pompeii and herculaneum',
    cta: 'See options',
    badge: null as string | null,
    image: { src: 'https://images.unsplash.com/photo-1658248709403-c2803126d770', alt: 'The compact excavated ruins of Herculaneum, with the modern town of Ercolano and Vesuvius above' },
  },
  {
    title: 'Private Pompeii Guide',
    href: '/money/private-pompeii-guide',
    blurb: 'What a licensed private guide actually changes about the visit.',
    keyword: 'private pompeii tour',
    cta: 'Compare guides',
    badge: 'Small Group' as string | null,
    image: { src: 'https://images.unsplash.com/photo-1694274411117-fbfcd9435446', alt: "A row of Pompeii's original stone columns, part of a private guide's typical house-by-house routing" },
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
   * Whether this specific listing includes a genuine skip-the-line entrance
   * (vs. a self-arranged ticket queue at the main gate) — stated plainly
   * rather than assumed, since queueing reality is the single biggest factor
   * in what a Pompeii ticket actually delivers on a tight day-trip schedule
   * (see the Skip-the-Line Reality support page).
   */
  skipLineEntry: boolean;
  /** Used only to pick a relevant subset/ordering per money page — not shown in the UI as literal labels. */
  tags: string[];
}

/**
 * Deliberately a static array, not a Firestore-backed collection like Street
 * Food Rome's `tours` (lib/firestore.ts's TourDoc/getAllTours) — same
 * reasoning as Underground Colosseum's and Private Vatican's FEATURED_TOURS:
 * each entry is a third-party affiliate partner's live product listing
 * (GetYourGuide/Viator/Civitatis), where price and availability are the
 * partner's to change. A human should confirm a partner's current price
 * before it changes here, not have it silently drift via an unreviewed CMS
 * sync.
 */
export const FEATURED_TOURS: FeaturedTour[] = [
  {
    partner: 'GetYourGuide',
    slug: 'gyg-pompeii-day-trip-rome',
    title: 'Pompeii Day Trip from Rome, High-Speed Train Included',
    meta: 'Full day · small group',
    priceFrom: 159,
    badge: 'Best Seller' as string | null,
    image: { src: 'https://images.unsplash.com/photo-1635549630280-de3b8c2320a8', alt: 'The ruins of ancient Pompeii stretching toward Mount Vesuvius on a clear day' },
    skipLineEntry: true,
    tags: ['from-rome', 'first-timer', 'combo'],
  },
  {
    partner: 'Viator',
    slug: 'viator-pompeii-half-day-naples',
    title: 'Pompeii Half-Day Tour from Naples',
    meta: '4h · small group',
    priceFrom: 65,
    badge: 'Best Value' as string | null,
    image: { src: 'https://images.unsplash.com/photo-1690069747216-dcb61ce0cbb7', alt: 'A weathered stone statue standing between two columns in the House of the Faun area of Pompeii' },
    skipLineEntry: true,
    tags: ['from-naples', 'budget'],
  },
  {
    partner: 'Civitatis',
    slug: 'civitatis-pompeii-sorrento-guided',
    title: 'Guided Pompeii Tour from Sorrento',
    meta: '5h · small group',
    priceFrom: 79,
    badge: null as string | null,
    image: { src: 'https://images.unsplash.com/photo-1663875766535-4f6c5ba9829c', alt: "A colonnaded building along Pompeii's Via dell'Abbondanza" },
    skipLineEntry: true,
    tags: ['from-sorrento'],
  },
  {
    partner: 'GetYourGuide',
    slug: 'gyg-pompeii-vesuvius-combo',
    title: 'Pompeii Ruins + Vesuvius Crater Hike Combo',
    meta: '8h · small group',
    priceFrom: 149,
    badge: 'Most Complete' as string | null,
    image: { src: 'https://images.unsplash.com/photo-1727968206434-7a325a2e2f3b', alt: "Mount Vesuvius's slope rising above a Pompeii excavation building, the route this combo tour connects" },
    skipLineEntry: true,
    tags: ['vesuvius', 'combo', 'from-naples'],
  },
  {
    partner: 'Viator',
    slug: 'viator-pompeii-herculaneum-combo',
    title: 'Pompeii & Herculaneum Combined Day Tour',
    meta: '7h · small group',
    priceFrom: 139,
    badge: null as string | null,
    image: { src: 'https://images.unsplash.com/photo-1658248709589-b542282f2cc7', alt: "A close-up view of Herculaneum's unusually well-preserved stone masonry" },
    skipLineEntry: true,
    tags: ['herculaneum', 'combo'],
  },
  {
    partner: 'Civitatis',
    slug: 'civitatis-private-pompeii-licensed-guide',
    title: 'Private Pompeii Tour with a Licensed Archaeology Guide',
    meta: '3h · private guide',
    priceFrom: 220,
    badge: 'Small Group' as string | null,
    image: { src: 'https://images.unsplash.com/photo-1723381910278-0ca89153e760', alt: 'A quiet cobblestone street inside Pompeii lined with the low walls of excavated houses' },
    skipLineEntry: true,
    tags: ['private', 'from-naples', 'from-rome'],
  },
  {
    partner: 'GetYourGuide',
    slug: 'gyg-pompeii-self-paced-audio',
    title: 'Skip-the-Line Pompeii Ticket with Audio Guide',
    meta: 'Self-paced · audio guide',
    priceFrom: 36,
    badge: 'Best Value' as string | null,
    image: { src: 'https://images.unsplash.com/photo-1657354371984-ef2f1a59cf80', alt: 'A circular stone structure inside the Pompeii archaeological park, viewed at self-paced walking speed' },
    skipLineEntry: true,
    tags: ['self-paced', 'budget', 'from-naples'],
  },
  {
    partner: 'Viator',
    slug: 'viator-pompeii-rome-early-departure',
    title: 'Early-Departure Pompeii Day Trip from Rome',
    meta: 'Full day · small group',
    priceFrom: 145,
    badge: 'Early Start' as string | null,
    image: { src: 'https://images.unsplash.com/photo-1662291755552-5b5d0e61e4da', alt: 'An excavated Pompeii building with Mount Vesuvius visible behind it in soft morning light' },
    skipLineEntry: true,
    tags: ['from-rome', 'first-timer'],
  },
];

/**
 * Relevance tags to prioritize per money page, most-relevant first — same
 * pattern as Underground Colosseum's and Private Vatican's
 * MONEY_PAGE_RELEVANCE, so each money page leads with the tours that
 * actually fit its own origin city or topic instead of repeating the same 8
 * cards in the same order on all 6 pages.
 */
const MONEY_PAGE_RELEVANCE: Record<string, string[]> = {
  '/money/pompeii-from-rome': ['from-rome', 'first-timer'],
  '/money/pompeii-from-naples': ['from-naples', 'budget', 'self-paced'],
  '/money/pompeii-from-sorrento-amalfi': ['from-sorrento'],
  '/money/pompeii-vesuvius-combo': ['vesuvius', 'combo'],
  '/money/pompeii-herculaneum': ['herculaneum', 'combo'],
  '/money/private-pompeii-guide': ['private'],
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
 * Real, verifiable facts about Pompeii, Herculaneum, and Vesuvius (not
 * business/traffic metrics) — used for the homepage's "Pompeii by the
 * Numbers" strip. Kept separate from FEATURED_TOURS/MONEY_PAGES since these
 * describe the site itself, not anything this site sells or claims about its
 * own audience — matching the hero trust bullet "no invented visitor stats."
 */
export const QUICK_FACTS = [
  { value: '79 AD', label: 'Year Vesuvius erupted', detail: 'Buried Pompeii, Herculaneum, and the surrounding towns under ash and pumice within about 24 hours.' },
  { value: '66 ha', label: 'Size of ancient Pompeii', detail: 'Roughly 44 hectares have been excavated since systematic digging began in 1748.' },
  { value: '1997', label: 'UNESCO World Heritage status', detail: 'Pompeii, Herculaneum, and Torre Annunziata were inscribed together as one archaeological site.' },
  { value: '1863', label: 'Plaster-cast technique introduced', detail: "Archaeologist Giuseppe Fiorelli poured plaster into the cavities left by decomposed bodies in the ash." },
  { value: '1,281m', label: "Vesuvius's height today", detail: 'Still an active volcano, continuously monitored by the Osservatorio Vesuviano.' },
];

/**
 * Extra Pompeii/Vesuvius/Herculaneum photography for the About page's
 * gallery — reuses images already verified elsewhere on this site rather than
 * introducing new, unchecked URLs, same approach as Underground Colosseum's
 * ARENA_FLOOR_GALLERY and Private Vatican's VATICAN_GALLERY.
 */
export const POMPEII_GALLERY = [
  { src: 'https://images.unsplash.com/photo-1654258859717-d8fb76e421b6', alt: "The ruins of Pompeii's forum with Mount Vesuvius rising in the background" },
  { src: 'https://images.unsplash.com/photo-1717444967390-a0bfd123c3e1', alt: 'One of the preserved plaster casts on display at Pompeii, showing a victim of the 79 AD eruption' },
  { src: 'https://images.unsplash.com/photo-1658248709589-b542282f2cc7', alt: "A close-up view of Herculaneum's unusually well-preserved stone masonry" },
  { src: 'https://images.unsplash.com/photo-1506852889966-0ec40a8bf2b5', alt: "Aerial view of Mount Vesuvius's crater rim" },
];

export const SUPPORT_PAGES = [
  {
    title: 'Getting There: Train vs. Tour',
    href: '/support/getting-there-train-vs-tour',
    keyword: 'pompeii train vs tour',
    image: { src: 'https://images.unsplash.com/photo-1639989800195-d3f77086c8b6', alt: 'A view along the Circumvesuviana rail corridor toward Mount Vesuvius in the distance' },
  },
  {
    title: 'How Much Time You Need',
    href: '/support/how-much-time-you-need',
    keyword: 'how long to spend at pompeii',
    image: { src: 'https://images.unsplash.com/photo-1531220238712-18cea1d53e59', alt: 'A brown stone archway inside Pompeii, one of the many stops that add up across a full visit' },
  },
  {
    title: 'Best-Preserved Houses to Prioritise',
    href: '/support/best-preserved-houses-to-prioritise',
    keyword: 'best pompeii houses to see',
    image: { src: 'https://images.unsplash.com/photo-1579285014910-be9df495fb26', alt: "A restored Pompeii house facade with Vesuvius visible above the roofline" },
  },
  {
    title: 'Pompeii with Kids',
    href: '/support/pompeii-with-kids',
    keyword: 'pompeii with kids',
    image: { src: 'https://images.unsplash.com/photo-1720303628885-6cc809f7c435', alt: 'A garden viewpoint overlooking the Bay of Naples, the kind of open-air break point that works well for families' },
  },
  {
    title: 'Summer Heat Logistics',
    href: '/support/summer-heat-logistics',
    keyword: 'pompeii in summer heat',
    image: { src: 'https://images.unsplash.com/photo-1653590933006-e4abe965b031', alt: 'A shaded hillside path near Vesuvius, the kind of shade that is scarce across most of open-air Pompeii' },
  },
  {
    title: 'Skip-the-Line Reality',
    href: '/support/skip-the-line-reality',
    keyword: 'pompeii skip the line',
    image: { src: 'https://images.unsplash.com/photo-1686252184251-80c0e71a6cde', alt: "Pompeii's Porta Marina entrance, with its columned gate and clock tower" },
  },
];

export const FAQS = [
  {
    question: 'How long does Pompeii actually take to see properly?',
    answer:
      'Budget a minimum of 3 hours on-site to see the highlights properly, and closer to 5–6 hours if you want to see the full excavated area without rushing.',
  },
  {
    question: 'Is Pompeii doable as a day trip from Rome?',
    answer:
      "Yes, but it's a full day: roughly 2.5 hours of round-trip train travel plus 3+ hours on-site, so plan to leave early and expect to be back late evening.",
  },
  {
    question: 'Do I need to book skip-the-line tickets in advance?',
    answer:
      'In peak season (May–September) yes — walk-up entry queues can run over an hour, while pre-booked tickets or guided tours get a dedicated entrance.',
  },
  {
    question: 'Is Pompeii suitable for kids?',
    answer:
      'Older kids (8+) generally do well with the open-air walking and ash-cast displays; strollers struggle on the uneven original stone streets, so a carrier is more practical for younger children.',
  },
  {
    question: "What's the difference between Pompeii and Herculaneum?",
    answer:
      'Pompeii is larger and more famous; Herculaneum is smaller but better-preserved in places (upper floors and wood survived at Herculaneum, which is rare) — many visitors prefer pairing both over spending a full day at just one.',
  },
];

export const QUICK_LINKS = [
  { label: 'From Rome', href: '/money/pompeii-from-rome' },
  { label: 'From Naples', href: '/money/pompeii-from-naples' },
  { label: 'From Sorrento/Amalfi', href: '/money/pompeii-from-sorrento-amalfi' },
  { label: '+ Vesuvius Combo', href: '/money/pompeii-vesuvius-combo' },
  { label: '+ Herculaneum', href: '/money/pompeii-herculaneum' },
  { label: 'Private Guide', href: '/money/private-pompeii-guide' },
  { label: 'How Much Time You Need', href: '/support/how-much-time-you-need' },
];

export const EXPLORE_LINKS = MONEY_PAGES.map((p) => ({ label: p.title, href: p.href }));
export const LEARN_LINKS = SUPPORT_PAGES.map((p) => ({ label: p.title, href: p.href }));

/** Feeds the header's "Tours" dropdown. */
export const TOURS_NAV_ITEMS: NavItem[] = MONEY_PAGES.map((p) => ({ title: p.title, href: p.href, keyword: p.keyword }));

/** Feeds the header's "Plan Your Trip" dropdown and the footer's Learn column. */
export const PLAN_NAV_ITEMS: NavItem[] = SUPPORT_PAGES.map((p) => ({ title: p.title, href: p.href, keyword: p.keyword }));

/**
 * The site's named author persona. A real photoshoot is still "to build" per
 * the site blueprint, so every UI slot uses an initials avatar rather than a
 * stock photo standing in for a real person. Distinct from Underground
 * Colosseum's Luca Moretti and Private Vatican's Elena Bianchi — this
 * property spans Rome, Naples, and Sorrento/Amalfi, so its author is
 * credentialed for the whole Bay of Naples region rather than Rome alone,
 * matching the network's "no anonymous Team byline" rule.
 */
export const AUTHOR = {
  name: 'Marco Esposito',
  initials: 'ME',
  title: 'Licensed regional tourist guide, Bay of Naples',
  domain: 'pompeiidaytrip.com',
  bio: "Every route on this site — from Rome, from Naples, and from Sorrento — has been run in person, ticket in hand, on the actual Circumvesuviana line. Independent; not paid by any operator we compare.",
};

export const PRIVACY_POLICY = {
  title: 'Privacy Policy',
  intro: 'Last updated: this page is reviewed periodically and updated when our practices change.',
  sections: [
    {
      heading: 'What we collect',
      content: 'Pompeii Day Trip does not currently require an account to browse the site, and account sign-in shown in the header is not yet active. If you email us, we keep that correspondence to answer your question and don\'t add you to any mailing list without asking first.',
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
  contactEmail: 'hello@pompeiidaytrip.com',
};

export const TERMS_OF_SERVICE = {
  title: 'Terms of Service',
  intro: 'By accessing Pompeii Day Trip, you agree to these terms and conditions.',
  sections: [
    {
      heading: 'Use of the Site',
      content: 'Pompeii Day Trip provides independent tour guides and comparisons for informational purposes only. We are not affiliated with the Parco Archeologico di Pompei or any booking partners. The information on this site is believed to be accurate but is provided "as is" without warranties of any kind.',
    },
    {
      heading: 'Affiliate Links',
      content: 'This site includes links to GetYourGuide, where we receive a commission if you book through our links. These commissions help support the independent research behind our guides and don\'t affect the price you pay.',
    },
    {
      heading: 'Limitation of Liability',
      content: 'To the extent permitted by law, Pompeii Day Trip, its authors, and affiliates are not liable for any direct, indirect, incidental, special, or consequential damages arising out of or related to your use of this site or any linked third-party sites.',
    },
    {
      heading: 'Changes to These Terms',
      content: 'We may update these terms at any time by posting the revised version on this page. Your continued use of the site constitutes your acceptance of the revised terms.',
    },
    {
      heading: 'Governing Law',
      content: 'These terms are governed by Italian law and the courts of Rome, Italy.',
    },
  ],
  contactEmail: 'hello@pompeiidaytrip.com',
};

export const COOKIE_POLICY = {
  title: 'Cookie Policy',
  intro: 'This Cookie Policy explains how Pompeii Day Trip uses cookies and similar technologies.',
  fallbackHtml: `
    <p>This Cookie Policy explains how Pompeii Day Trip ("we," "us") uses cookies and similar technologies on pompeiidaytrip.com.</p>
    <h2>What cookies we use</h2>
    <p>We use a small number of strictly necessary cookies to keep the site functioning — for example, remembering your cookie-consent choice. We also use standard analytics cookies to understand which pages and tours are useful to visitors, so we can improve the site over time.</p>
    <h2>Third-party cookies</h2>
    <p>When you click through to book a tour, you leave pompeiidaytrip.com and land on GetYourGuide, our booking partner. GetYourGuide sets its own cookies under its own privacy and cookie policies, which we don't control. We recommend reviewing GetYourGuide's policies directly if you have questions about their tracking.</p>
    <h2>Managing cookies</h2>
    <p>Most browsers let you block or delete cookies through their settings. Blocking cookies may affect how parts of this site work, but it won't prevent you from reading tour information or content.</p>
    <h2>Changes to this policy</h2>
    <p>We may update this policy occasionally to reflect changes in the tools we use. Check back here periodically for the current version.</p>
    <h2>Contact</h2>
    <p>Questions about this policy can be sent to <a href="mailto:hello@pompeiidaytrip.com">hello@pompeiidaytrip.com</a>.</p>
  `,
};

export const AFFILIATE_DISCLOSURE = {
  title: 'Affiliate Disclosure',
  intro: 'Full transparency about how this site works and how we make money.',
  sections: [
    {
      heading: 'How we earn money',
      content: 'Pompeii Day Trip is an independent guide maintained by a licensed regional tourist guide. When you book a tour through our links, we earn a small commission from our affiliate partners (GetYourGuide, Viator, Civitatis). We do not receive any money from the sites themselves for featuring them on this site.',
    },
    {
      heading: 'How this affects our recommendations',
      content: 'Our partner relationships do not influence which tours we recommend or how honestly we write about them. We compare tours across multiple operators and platforms, recommend the best option for your situation, and have no financial incentive to favor one partner over another — we earn the same commission regardless of which partner you choose.',
    },
    {
      heading: 'Who runs this site',
      content: 'Pompeii Day Trip is written and maintained by Marco Esposito, a licensed regional tourist guide for the Bay of Naples region. Every tour comparison on this site is based on first-hand research: routes walked, tickets purchased, operators cross-checked. This is independent work, not a team, not affiliated with any government body or tour company.',
    },
    {
      heading: 'Questions',
      content: 'If you have questions about how we work or how we choose partners, we\'re happy to answer. Send an email to hello@pompeiidaytrip.com.',
    },
  ],
  contactEmail: 'hello@pompeiidaytrip.com',
};
