/**
 * Content copy for Naples Street Food — hero section, money-page hooks,
 * FAQ answers, SEO metadata, and author info. All strings from MASTER-NETWORK-BLUEPRINT.md §3.11.
 */

export const HERO = {
  eyebrow: undefined,
  headline: 'Naples Street Food, Where Pizza Was Actually Invented',
  subheadline:
    "First-hand food tours through Naples' markets, fry stalls, and the Spaccanapoli backstreets — written by a guide who visits Naples specifically for this, not a Rome writer phoning it in.",
  primaryCta: { label: 'See Our Top Naples Food Tours', href: '#tours' },
  secondaryCta: { label: 'Where do locals actually eat?', href: '/where-locals-eat' },
  trustBullets: [
    'Naples-specific — no recycled Rome content',
    'Birthplace-of-pizza tastings from the actual source',
    'Fried-food specialities explained, not just listed',
    'Independent, no restaurant kickbacks for placement',
  ],
};

export const MONEY_PAGE_COPY = {
  naplesStreetFoodTour: {
    hook: "The flagship guided food walk through Naples' historic center — pizza, fried snacks, and the market stalls that define the city's food identity.",
    highlights: [
      '4–6 tasting stops',
      'Historic-center routing',
      'Small-group format',
    ],
  },
  pizzaFocusedFoodTour: {
    hook: 'Naples invented pizza — this tour tastes it at the source, comparing the classic pizzerie against the newer wood-fired spots locals actually queue for.',
    highlights: [
      'Classic vs modern pizzeria comparison',
      'Margherita/Marinara tasting focus',
      'Queue-time reality at famous spots',
    ],
  },
  naplesMarketTour: {
    hook: "Naples' markets are louder, denser, and more theatrical than Rome's — this tour uses them as a tasting counter for the city's fried-food specialities.",
    highlights: [
      'Market-stall tastings',
      'Fried-food sampling (cuoppo, frittatine)',
      'Market hours and best visit windows',
    ],
  },
  spaccanapoli: {
    hook: "The old-town route straight down Naples' famous Spaccanapoli street — food stops threaded through the historic center's narrowest, most atmospheric alleys.",
    highlights: [
      'Spaccanapoli routing logic',
      'Historic-center food stops',
      'Photo-worthy alley detours',
    ],
  },
};

export const SEO_META = {
  home: {
    title: 'Naples Street Food Tours — Pizza, Markets & Spaccanapoli',
    description: 'First-hand Naples food tours from a guide who actually visits Naples. Pizza at the source, market tastings, and honest routing.',
  },
  pizzaFocused: {
    title: 'Naples Pizza Tour: Tasting Pizza at Its Actual Birthplace',
    description: 'Naples invented pizza — this tour compares classic and modern pizzerie, with honest notes on queue times and what's worth it.',
  },
};

export const AUTHOR = {
  name: 'Marco Giordano',
  credentials: 'Naples food guide, 8 years',
  bio: 'Marco has lived in Naples his entire life and specializes in Neapolitan street food, markets, and the city's culinary history. He visits Naples food stalls weekly to stay current on what locals are actually eating.',
  photoOrInitials: 'MG',
  aboutHref: '/about',
};

export const QUICK_FACTS_DETAILED = [
  {
    label: 'Pizza Origin',
    stat: '1738',
    detail: 'Year Neapolitan pizza was first documented as a street food',
  },
  {
    label: 'Tour Duration',
    stat: '3–4h',
    detail: 'Typical street food walk with 4–6 tasting stops',
  },
  {
    label: 'Price Band',
    stat: '€35–70',
    detail: 'Range for street food tours across all partners',
  },
  {
    label: 'Best Tasting Time',
    stat: '5–6 PM',
    detail: 'Evening window before dinner service clears market stalls',
  },
];

export interface MoneyPageContent {
  href: string;
  navTitle: string;
  metaTitle: string;
  metaDescription: string;
  hook: string;
  highlights: string[];
  faqs: Array<{ question: string; answer: string }>;
}

export interface SupportPageContent {
  href: string;
  navTitle: string;
  metaTitle: string;
  metaDescription: string;
  body: string;
}

export function getMoneyPageContent(href: string): MoneyPageContent | null {
  const pages: Record<string, MoneyPageContent> = {
    '/naples-street-food-tour': {
      href: '/naples-street-food-tour',
      navTitle: 'Naples Street-Food Tour',
      metaTitle: 'Naples Street Food Tour: Historic Center Routing',
      metaDescription: 'Naples street food tour through the historic center — pizza, fried snacks, market stalls.',
      hook: MONEY_PAGE_COPY.naplesStreetFoodTour.hook,
      highlights: MONEY_PAGE_COPY.naplesStreetFoodTour.highlights,
      faqs: FAQS,
    },
    '/pizza-focused-food-tour': {
      href: '/pizza-focused-food-tour',
      navTitle: 'Pizza-Focused Food Tour',
      metaTitle: 'Naples Pizza Tour: Tasting Pizza at Its Actual Birthplace',
      metaDescription: 'Naples pizza tour comparing classic and modern pizzerie — where pizza was actually invented.',
      hook: MONEY_PAGE_COPY.pizzaFocusedFoodTour.hook,
      highlights: MONEY_PAGE_COPY.pizzaFocusedFoodTour.highlights,
      faqs: FAQS,
    },
    '/naples-market-tour': {
      href: '/naples-market-tour',
      navTitle: 'Naples Market Tour',
      metaTitle: 'Naples Food Market Tour: Tasting Counter for Local Specialities',
      metaDescription: 'Naples market tour tasting fried-food specialities directly from market stalls.',
      hook: MONEY_PAGE_COPY.naplesMarketTour.hook,
      highlights: MONEY_PAGE_COPY.naplesMarketTour.highlights,
      faqs: FAQS,
    },
    '/spaccanapoli-food-walk': {
      href: '/spaccanapoli-food-walk',
      navTitle: 'Spaccanapoli Food Walk',
      metaTitle: 'Spaccanapoli Food Tour: Historic Center Street Alley Walk',
      metaDescription: 'Spaccanapoli street food walk through Naples historic center with food stops along the way.',
      hook: MONEY_PAGE_COPY.spaccanapoli.hook,
      highlights: MONEY_PAGE_COPY.spaccanapoli.highlights,
      faqs: FAQS,
    },
  };
  return pages[href] || null;
}

export function getSupportPageContent(href: string): SupportPageContent | null {
  const pages: Record<string, SupportPageContent> = {
    '/real-neapolitan-pizza-guide': {
      href: '/real-neapolitan-pizza-guide',
      navTitle: 'Real Neapolitan Pizza Guide',
      metaTitle: 'Real Neapolitan Pizza Guide: Authentic Techniques & Where to Try',
      metaDescription: 'Guide to authentic Neapolitan pizza — techniques, history, and best places to try the real thing.',
      body: 'A comprehensive guide to authentic Neapolitan pizza, from dough techniques to the best pizzerie.',
    },
    '/fried-food-specialities': {
      href: '/fried-food-specialities',
      navTitle: 'Fried Food Specialities',
      metaTitle: 'Naples Fried Food: Cuoppo, Frittatine & Local Specialities',
      metaDescription: 'Guide to Naples fried-food specialities — what cuoppo and frittatine are and where to find them.',
      body: 'Naples street food is defined by fried specialities like cuoppo and frittatine — here\'s what they are.',
    },
    '/where-locals-eat': {
      href: '/where-locals-eat',
      navTitle: 'Where Locals Eat',
      metaTitle: 'Where Locals Actually Eat in Naples: Honest Recommendations',
      metaDescription: 'Guide to where actual Neapolitans eat — beyond tourist areas, into neighborhood spots.',
      body: 'The best food in Naples isn\'t in the guidebooks — it\'s where locals actually eat.',
    },
  };
  return pages[href] || null;
}
