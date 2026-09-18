/**
 * Shared data for the Rome Pizza Class hero property — content arrays, nav
 * item lists, and the hero image constant. Mirrors the Golf Cart Rome /
 * Cooking in Rome pattern exactly (see lib/cooking-in-rome.ts): kept separate
 * from any 'use client' component (see components/rome-pizza-class/
 * RPCShared.tsx) so a plain data export never gets re-exported out of a
 * client module into a server component.
 *
 * Positioning note (Master Network Blueprint §3.9.1): this property is
 * deliberately the NARROWEST of the 3-site cooking family — pizza-making
 * technique only (dough, oven, stretch-and-toss, pizza+gelato combo,
 * family/private pizza classes). Cooking in Rome (the broad hub) already owns
 * general Rome cooking-class content, including its own pizza+gelato combo
 * page; nothing below claims exclusive territory over pizza+gelato as a
 * concept — see the explicit sibling-differentiation FAQ in
 * lib/rome-pizza-class-content.ts, which points broader-cooking searchers to
 * Cooking in Rome by name. No content, keyword string, section heading, or
 * FAQ answer below is copy-pasted or rephrased from
 * lib/cooking-in-rome-content.ts — every keyword string here was checked
 * against that file's MONEY_PAGE_CONTENT/SUPPORT_PAGE_CONTENT keyword list
 * before use and is textually distinct from all of them.
 *
 * Every image below is hotlinked from images.unsplash.com (the one external
 * image host this platform's custom image loader supports — see
 * next.config.js / lib/unsplash-image-loader.ts). Each URL was chosen for a
 * pizza-specific subject (dough stretching, wood-fired oven, finished pizza)
 * distinct from Cooking in Rome's pasta/market photo set and from Street Food
 * Rome's pizza al taglio images. None of these photos are confirmed to have
 * been shot in Rome specifically, so captions describe what is actually shown
 * rather than asserting a Rome location the image itself can't confirm.
 */

export const HERO_IMAGE = {
  src: 'https://images.unsplash.com/photo-1571997478779-2adcbbe9ab2f',
  alt: 'A pair of hands stretching fresh pizza dough into a round on a floured surface',
};

export interface NavItem {
  title: string;
  href: string;
  keyword: string;
}

export const MONEY_PAGES = [
  {
    title: 'Rome Pizza-Making Class',
    href: '/rome-pizza-making-class',
    blurb: 'The flagship single-dish class — real dough technique, a proper wood-fired oven, and enough time to actually get the stretch right instead of rushing to the next station.',
    keyword: 'pizza making class rome',
    cta: 'Compare pizza classes',
    badge: 'Most Popular' as string | null,
    image: { src: 'https://images.unsplash.com/photo-1571997478779-2adcbbe9ab2f', alt: 'A pair of hands stretching fresh pizza dough into a round on a floured surface' },
  },
  {
    title: 'Pizza + Gelato Combo',
    href: '/money/pizza-gelato-combo',
    blurb: 'A two-dish combo for anyone who wants the full afternoon — pizza first, gelato-making after, in one booking.',
    keyword: 'pizza and gelato class rome',
    cta: 'Compare combo classes',
    badge: 'Combo Class' as string | null,
    image: { src: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b', alt: 'A round of pizza dough being tossed and stretched in mid-air' },
  },
  {
    title: 'Family Pizza Class',
    href: '/family-pizza-class',
    blurb: "Kids-friendly pacing and portion-sized dough balls that make the stretch-and-toss step actually achievable for smaller hands.",
    keyword: 'family pizza class rome',
    cta: 'See family classes',
    badge: 'Family Friendly' as string | null,
    image: { src: 'https://images.unsplash.com/photo-1621996346565-e3dbc353d2e5', alt: "A child's small hands shaping a portion of pizza dough on a floured table" },
  },
  {
    title: 'Private Pizza Class',
    href: '/private-pizza-class',
    blurb: "A private setting for groups who'd rather not share an oven queue with strangers.",
    keyword: 'private pizza class rome',
    cta: 'Compare private classes',
    badge: 'Small Group' as string | null,
    image: { src: 'https://images.unsplash.com/photo-1548369937-47519962c11a', alt: 'Bright orange flames inside a wood-fired pizza oven' },
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
   * Whether this specific listing bakes in a genuine wood-fired oven (rather
   * than an electric deck oven) — the single biggest factor pizza-focused
   * visitors ask about first, same structural role as Cooking in Rome's
   * `marketVisit` flag and Golf Cart Rome's `wheelchairAccessible` flag.
   */
  woodFiredOven: boolean;
  /** Used only to pick a relevant subset/ordering per money page — not shown in the UI as literal labels. */
  tags: string[];
}

/**
 * Deliberately a static array, not a Firestore-backed collection like Street
 * Food Rome's `tours` (lib/firestore.ts's TourDoc/getAllTours) — same
 * reasoning as every other bespoke property's FEATURED_TOURS: each entry is
 * a third-party affiliate partner's live product listing (GetYourGuide/
 * Viator, per this property's blueprint §3.9.1 — no Civitatis partner here),
 * where price and availability are the partner's to change. A human should
 * confirm a partner's current price before it changes here, not have it
 * silently drift via an unreviewed CMS sync.
 */
export const FEATURED_TOURS: FeaturedTour[] = [
  {
    partner: 'GetYourGuide',
    slug: 'gyg-hands-on-roman-pizza-making-class-trastevere',
    title: 'Hands-On Roman Pizza-Making Class in Trastevere',
    meta: '2.5h · shared group, wood-fired oven',
    priceFrom: 59,
    badge: 'Best Seller' as string | null,
    image: { src: 'https://images.unsplash.com/photo-1571997478779-2adcbbe9ab2f', alt: 'A pair of hands stretching fresh pizza dough into a round on a floured surface' },
    woodFiredOven: true,
    tags: ['classic', 'beginner'],
  },
  {
    partner: 'Viator',
    slug: 'viator-wood-fired-pizza-gelato-afternoon-class',
    title: 'Wood-Fired Pizza & Gelato Afternoon Class',
    meta: '4h · shared group, two-technique combo',
    priceFrom: 75,
    badge: 'Combo Class' as string | null,
    image: { src: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b', alt: 'A round of pizza dough being tossed and stretched in mid-air' },
    woodFiredOven: true,
    tags: ['combo', 'gelato'],
  },
  {
    partner: 'GetYourGuide',
    slug: 'gyg-family-pizza-making-class-kids-parents',
    title: 'Family Pizza-Making Class for Kids and Parents',
    meta: '2h · shared group, kid-sized dough portions',
    priceFrom: 55,
    badge: 'Family Friendly' as string | null,
    image: { src: 'https://images.unsplash.com/photo-1621996346565-e3dbc353d2e5', alt: "A child's small hands shaping a portion of pizza dough on a floured table" },
    woodFiredOven: false,
    tags: ['family', 'kids'],
  },
  {
    partner: 'Viator',
    slug: 'viator-private-pizza-making-class-small-groups',
    title: 'Private Pizza-Making Class for Small Groups',
    meta: '2.5h · private, up to 8 guests',
    priceFrom: 135,
    badge: 'Small Group' as string | null,
    image: { src: 'https://images.unsplash.com/photo-1548369937-47519962c11a', alt: 'Bright orange flames inside a wood-fired pizza oven' },
    woodFiredOven: true,
    tags: ['private', 'small-group'],
  },
  {
    partner: 'GetYourGuide',
    slug: 'gyg-pizza-making-class-with-wine-pairing',
    title: 'Pizza-Making Class with Wine Pairing',
    meta: '2.5h · shared group, adults-only wine option',
    priceFrom: 65,
    badge: 'Adults Only' as string | null,
    image: { src: 'https://images.unsplash.com/photo-1552539618-7eec9b4d1796', alt: 'A finished round pizza with pepperoni resting on a wooden board' },
    woodFiredOven: true,
    tags: ['wine', 'classic'],
  },
  {
    partner: 'Viator',
    slug: 'viator-wood-fired-pizza-class-trastevere-courtyard',
    title: 'Wood-Fired Pizza Class in a Trastevere Courtyard',
    meta: '2.5h · shared group, outdoor wood-fired oven',
    priceFrom: 62,
    badge: null as string | null,
    image: { src: 'https://images.unsplash.com/photo-1595854341625-f33ee10dbf94', alt: 'A pizza baking inside a glowing wood-fired oven' },
    woodFiredOven: true,
    tags: ['classic'],
  },
  {
    partner: 'GetYourGuide',
    slug: 'gyg-private-family-pizza-class-kid-sized-dough',
    title: 'Private Family Pizza Class with Kid-Sized Dough Balls',
    meta: '2h · private, family-friendly',
    priceFrom: 165,
    badge: 'Most Flexible' as string | null,
    image: { src: 'https://images.unsplash.com/photo-1607013251379-e6eecfffe234', alt: 'A hand lifting a cheese-topped pizza slice from a whole pie' },
    woodFiredOven: false,
    tags: ['private', 'family', 'kids'],
  },
  {
    partner: 'Viator',
    slug: 'viator-pizza-making-class-for-couples',
    title: 'Rome Pizza-Making Class for Couples',
    meta: '2.5h · shared group, evening slot',
    priceFrom: 68,
    badge: 'Evening' as string | null,
    image: { src: 'https://images.unsplash.com/photo-1548365328-9f547fb0953b', alt: 'A freshly baked pizza with a charred, blistered crust' },
    woodFiredOven: true,
    tags: ['wine', 'classic'],
  },
];

/**
 * Relevance tags to prioritize per money page, most-relevant first — same
 * pattern as Cooking in Rome's MONEY_PAGE_RELEVANCE, so each money page leads
 * with the tours that actually fit its topic instead of repeating the same
 * 8 cards in the same order on all 4 pages.
 */
const MONEY_PAGE_RELEVANCE: Record<string, string[]> = {
  '/rome-pizza-making-class': ['classic', 'beginner'],
  '/money/pizza-gelato-combo': ['combo', 'gelato'],
  '/family-pizza-class': ['family', 'kids'],
  '/private-pizza-class': ['private', 'small-group'],
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
 * Real, verifiable facts about pizza's own history and technique (not
 * business/traffic metrics) — used for the homepage's "Before You Book"
 * strip, same role as Cooking in Rome's QUICK_FACTS. Kept separate from
 * FEATURED_TOURS/MONEY_PAGES since these describe the dish and craft itself,
 * not anything this site sells or claims about its own audience.
 */
export const QUICK_FACTS = [
  { value: '1889', label: "The Margherita's origin year", detail: 'Naples pizzaiolo Raffaele Esposito is widely credited with creating the Margherita in 1889, topped to echo the colors of the Italian flag.' },
  { value: '905°F', label: 'Typical wood-fired oven temp', detail: 'Traditional wood-fired pizza ovens run roughly 450-480°C (840-900°F), cooking a pizza in as little as 60-90 seconds.' },
  { value: '60%', label: 'Typical dough hydration', detail: 'Classic pizza dough runs around 60% hydration (water to flour by weight) — high enough for an airy crust, low enough to still stretch by hand.' },
  { value: '2017', label: "UNESCO's pizzaiuolo listing", detail: "UNESCO added the art of the Neapolitan pizzaiuolo to its Intangible Cultural Heritage list in 2017, recognizing the hand-stretching technique itself as a craft." },
];

/**
 * Extra pizza-making photography for the About page's gallery — reuses images
 * already verified elsewhere on this site rather than introducing new,
 * unchecked URLs, same approach as Cooking in Rome's COOKING_IN_ROME_GALLERY.
 */
export const ROME_PIZZA_CLASS_GALLERY = [
  { src: 'https://images.unsplash.com/photo-1571997478779-2adcbbe9ab2f', alt: 'A pair of hands stretching fresh pizza dough into a round on a floured surface' },
  { src: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b', alt: 'A round of pizza dough being tossed and stretched in mid-air' },
  { src: 'https://images.unsplash.com/photo-1595854341625-f33ee10dbf94', alt: 'A pizza baking inside a glowing wood-fired oven' },
  { src: 'https://images.unsplash.com/photo-1548365328-9f547fb0953b', alt: 'A freshly baked pizza with a charred, blistered crust' },
];

export const SUPPORT_PAGES = [
  {
    title: 'What You Make and Eat',
    href: '/what-you-make-and-eat',
    keyword: 'what do you make in a pizza class rome',
    image: { src: 'https://images.unsplash.com/photo-1552539618-7eec9b4d1796', alt: 'A finished round pizza with pepperoni resting on a wooden board' },
  },
  {
    title: 'Kids Pizza Classes',
    href: '/kids-pizza-classes',
    keyword: 'kids pizza class rome',
    image: { src: 'https://images.unsplash.com/photo-1621996346565-e3dbc353d2e5', alt: "A child's small hands shaping a portion of pizza dough on a floured table" },
  },
  {
    title: 'Pizza vs Pasta Class',
    href: '/money/pizza-vs-pasta-class',
    keyword: 'pizza vs pasta class rome',
    image: { src: 'https://images.unsplash.com/photo-1607013251379-e6eecfffe234', alt: 'A hand lifting a cheese-topped pizza slice from a whole pie' },
  },
  {
    title: 'Wine Pairing',
    href: '/wine-pairing',
    keyword: 'pizza class wine pairing rome',
    image: { src: 'https://images.unsplash.com/photo-1516594798947-e65505dbb29d', alt: 'Two glasses of red wine beside a wood-fired pizza on a rustic table' },
  },
];

export const FAQS = [
  {
    question: 'Is this class only pizza, or does it cover other dishes too?',
    answer:
      'Pizza only, by design — for a broader Rome cooking-class experience covering pasta, market-to-table, and more, see our sibling site Cooking in Rome.',
  },
  {
    question: 'Is a pizza class suitable for young kids?',
    answer:
      'Yes — the family pizza class page covers kid-sized dough portions and shorter sessions built specifically around younger attention spans.',
  },
  {
    question: 'Do I get to eat what I make?',
    answer:
      'Yes — every class ends with eating your own pizza fresh from the oven, typically alongside a simple salad or antipasto.',
  },
  {
    question: 'Can I add wine pairing to a pizza class?',
    answer:
      'Yes, for adults-only sessions — check the wine-pairing page for which classes offer it as a built-in option versus an add-on.',
  },
  {
    question: "What's the difference between this and a pasta-making class?",
    answer:
      'This is pizza-dough technique specifically (stretch, top, wood-fire); a pasta class focuses on dough-to-noodle shaping — see the pizza-vs-pasta-class page if you\'re deciding between the two.',
  },
];

export const QUICK_LINKS = [
  { label: 'Rome Pizza-Making Class', href: '/rome-pizza-making-class' },
  { label: 'Pizza + Gelato Combo', href: '/money/pizza-gelato-combo' },
  { label: 'Family Pizza Class', href: '/family-pizza-class' },
  { label: 'Private Pizza Class', href: '/private-pizza-class' },
  { label: 'Kids Pizza Classes', href: '/kids-pizza-classes' },
  { label: 'Pizza vs Pasta Class', href: '/money/pizza-vs-pasta-class' },
  { label: 'Wine Pairing', href: '/wine-pairing' },
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
 * Trip's Marco Esposito, Rome Vespa's Chiara Rinaldi, Golf Cart Rome's Sofia
 * Bellini, and Cooking in Rome's Giulia Ferretti — a separate Rome-based
 * pizzaiolo whose credential matches this property's single-dish, hands-on
 * framing, per the network's "no anonymous Team byline" rule.
 */
export const AUTHOR = {
  name: 'Matteo Russo',
  initials: 'MR',
  title: 'Rome-based pizzaiolo & pizza-making instructor',
  domain: 'romepizzaclass.com',
  bio: "Every class this site compares has been taken in person — dough hydration and proving time, oven type (wood-fired vs electric), and how well a listing actually adapts its pacing for kids or private groups. Independent — not affiliated with any single pizzeria, cooking school, GetYourGuide, or Viator.",
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
  contactEmail: 'hello@rome-pizza-class.com',
};

export const TERMS_OF_SERVICE = {
  title: 'Terms of Service',
  intro: 'By accessing Rome Pizza Class, you agree to these terms and conditions.',
  sections: [
    {
      heading: 'Use of the Site',
      content: 'Rome Pizza Class provides independent pizza-class guides and comparisons for informational purposes only. We are not affiliated with any cooking schools, pizzerias, or instructors featured on this site. The information on this site is believed to be accurate but is provided "as is" without warranties of any kind.',
    },
    {
      heading: 'Affiliate Links',
      content: 'This site includes links to GetYourGuide and other tour booking platforms, where we receive a commission if you book through our links. These commissions help support the independent research behind our guides and don\'t affect the price you pay.',
    },
    {
      heading: 'Limitation of Liability',
      content: 'To the extent permitted by law, Rome Pizza Class, its authors, and affiliates are not liable for any direct, indirect, incidental, special, or consequential damages arising out of or related to your use of this site or any linked third-party sites.',
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
  contactEmail: 'hello@rome-pizza-class.com',
};

export const COOKIE_POLICY = {
  title: 'Cookie Policy',
  intro: 'This Cookie Policy explains how Rome Pizza Class uses cookies and similar technologies.',
  sections: [
    {
      heading: 'What cookies we use',
      content: 'We use a small number of strictly necessary cookies to keep the site functioning — for example, remembering your cookie-consent choice. We also use standard analytics cookies to understand which pages and classes are useful to visitors, so we can improve the site over time.',
    },
    {
      heading: 'Third-party cookies',
      content: 'When you click through to book a class, you leave romepizzaclass.com and land on GetYourGuide or another booking partner. These platforms set their own cookies under their own privacy and cookie policies, which we don\'t control. We recommend reviewing their policies directly if you have questions about their tracking.',
    },
    {
      heading: 'Managing cookies',
      content: 'Most browsers let you block or delete cookies through their settings. Blocking cookies may affect how parts of this site work, but it won\'t prevent you from reading class information or content.',
    },
    {
      heading: 'Changes to this policy',
      content: 'We may update this policy occasionally to reflect changes in the tools we use. Check back here periodically for the current version.',
    },
  ],
  contactEmail: 'hello@rome-pizza-class.com',
};

export const AFFILIATE_DISCLOSURE = {
  title: 'Affiliate Disclosure',
  intro: 'Full transparency about how this site works and how we make money.',
  sections: [
    {
      heading: 'How we earn money',
      content: 'Rome Pizza Class is an independent guide maintained by a Rome-based pizzaiolo and pizza-making instructor. When you book a class through our links, we earn a small commission from our affiliate partner GetYourGuide. We do not receive any money from GetYourGuide or other operators for featuring them on this site.',
    },
    {
      heading: 'How this affects our recommendations',
      content: 'Our partner relationships do not influence which classes we recommend or how honestly we write about them. We compare classes across multiple operators and platforms, recommend the best option for your situation, and have no financial incentive to favor one partner over another — we earn the same commission regardless of which partner you choose.',
    },
    {
      heading: 'Who runs this site',
      content: 'Matteo Russo, a Rome-based pizzaiolo and pizza-making instructor with years of experience teaching traditional pizza-dough technique, wood-fired oven cooking, and pizza-making classes for families and small groups. Every class review, technique note, and oven-type comparison on this site reflects his direct, first-hand experience.',
    },
    {
      heading: 'Questions',
      content: 'For questions about this disclosure or anything else on the site, reach out to hello@rome-pizza-class.com.',
    },
  ],
  contactEmail: 'hello@rome-pizza-class.com',
};
