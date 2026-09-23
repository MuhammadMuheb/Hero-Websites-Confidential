/**
 * Content copy for Tivoli Day Trip — hero section, money-page hooks,
 * FAQ answers, and SEO metadata. All strings are production-ready from
 * the master network blueprint (MASTER-NETWORK-BLUEPRINT.md §3.13).
 */

export const HERO = {
  eyebrow: 'ESCAPE ROME FOR A DAY',
  headline: 'Renaissance Fountains & Imperial Ruins: The Ultimate Tivoli Guide',
  subheadline:
    "Discover Villa d'Este's breathtaking water features and Hadrian's Villa's ancient grandeur. Complete guide with expert comparisons, logistics, and insider tips for the perfect day trip.",
  primaryCta: { label: 'Explore Tivoli Tours', href: '#tours' },
  secondaryCta: { label: 'Start Planning Your Visit', href: '#plan-your-trip' },
  trustBullets: [
    'Expert recommendations from Italy-based guides',
    'Real photos and detailed site comparisons',
    'Easy-to-follow Rome transportation guide',
    'Best times to visit and skip the crowds',
  ],
};

export const MONEY_PAGE_COPY = {
  tivoliFromRome: {
    hook: 'The flagship half/full-day trip — close enough to Rome that a half-day is genuinely realistic, but full-day lets you properly see both villas without rushing.',
    highlights: [
      'Rome-to-Tivoli transit time',
      'Half-day vs full-day decision guide',
      'Both-villas-in-one-day feasibility',
    ],
  },
  villaDesteHadrians: {
    hook: 'The two-villa combo — Renaissance fountains against Roman imperial ruins, a genuine contrast most visitors don\'t expect from a single day trip.',
    highlights: [
      'Villa-order logic (gardens vs ruins first)',
      'Time budget per site',
      'Combined-ticket options',
    ],
  },
  privateTivoli: {
    hook: 'A private guide and transport removes the two-bus, one-transfer logistics that make independent Tivoli travel more of a hassle than it needs to be.',
    highlights: [
      'Door-to-door transport included',
      'Custom pacing between villas',
      'Price vs self-organized transit',
    ],
  },
  halfDayTivoli: {
    hook: 'The short option — enough time for Villa d\'Este\'s fountains alone, for travelers who can\'t spare a full day but still want to see Tivoli\'s headline site.',
    highlights: [
      'Single-villa focus (Villa d\'Este)',
      'Realistic round-trip timing',
      'What gets cut versus the full-day version',
    ],
  },
};

export const FAQ_ITEMS = [
  {
    question: 'Which villa should I prioritise if I only have time for one?',
    answer:
      "Villa d'Este, for most visitors — its terraced Renaissance fountain gardens are the more visually dramatic and widely photographed site; Hadrian's Villa rewards visitors specifically interested in Roman archaeology and ruins.",
  },
  {
    question: 'Can I do Tivoli as a half-day trip from Rome?',
    answer:
      "Yes, for Villa d'Este alone — round-trip transit plus a focused 2–2.5 hours at the gardens fits comfortably in a half day; adding Hadrian's Villa realistically needs a full day.",
  },
  {
    question: 'How do I get to Tivoli from Rome without a tour?',
    answer:
      'Regional trains and a local bus connection are the independent-travel route, with roughly 1–1.5 hours of one-way transit each way — the getting-there page breaks down the exact routing and timing.',
  },
  {
    question: "What's the best season to visit Villa d'Este's gardens?",
    answer:
      "Late spring (May) has the fountains at full flow and gardens in bloom; summer is hot with less shade than you'd expect, and the gardens-best-season page has month-by-month notes.",
  },
  {
    question: 'Is Tivoli suitable for a family day trip with kids?',
    answer:
      "Yes — Villa d'Este's fountains and garden paths are genuinely kid-engaging, though Hadrian's Villa's ruins-and-walking format suits older children better than toddlers.",
  },
];

export const SEO_META = {
  home: {
    title: "Tivoli Day Trips — Villa d'Este & Hadrian's Villa Guide",
    description:
      "First-hand Tivoli day-trip guide from Rome. Villa d'Este vs Hadrian's Villa, half-day vs full-day, and honest transit logistics.",
  },
  villaDesteHadrians: {
    title: "Villa d'Este and Hadrian's Villa: Which to See First",
    description:
      "Combining Villa d'Este's fountains with Hadrian's Villa's ruins in one day — routing, timing, and which site to prioritise.",
  },
};

export const AUTHOR = {
  name: 'Marco Rossi',
  initials: 'MR',
  title: 'Tivoli & Roman Villas guide, 10 years',
  domain: 'tivolivillas.com',
  bio: 'A guide who has explored every fountain at Villa d\'Este and walked every ruin at Hadrian\'s Villa — writes from deep first-hand knowledge, not guidebooks.',
};

export const FAQS = FAQ_ITEMS;

export const QUICK_FACTS = [
  { label: 'Distance from Rome', value: 'Tivoli: ~28 km', detail: 'About 30 kilometers northeast of Rome' },
  { label: 'Travel time (from Rome)', value: '45 min – 1 hour by train + bus', detail: 'Regional train plus local bus to both villas' },
  { label: 'Villa d\'Este visit time', value: '1.5–2.5 hours', detail: 'Fountains and garden tour duration' },
  { label: "Hadrian's Villa visit time", value: '2–3 hours', detail: 'Ruins and archaeological site tour duration' },
  { label: 'Best months', value: 'May–June, Sept–Oct', detail: 'Mild weather and lower crowds' },
  { label: 'Peak season', value: 'July–August', detail: 'Summer brings larger crowds and heat' },
];

export interface QuickLink {
  label: string;
  href: string;
}

export const QUICK_LINKS: QuickLink[] = [
  { label: 'From Rome', href: '/money/tivoli-from-rome' },
  { label: 'Both Villas', href: '/villa-d-este-hadrian-s-villa' },
  { label: 'Getting There', href: '/support/getting-to-tivoli-train-vs-tour' },
  { label: 'Which Villa', href: '/which-villa-to-prioritise' },
  { label: 'Best Season', href: '/gardens-best-season' },
];

export interface PageMetadata {
  title: string;
  description: string;
  ogImage?: string;
}

export interface MoneyPageContent {
  href: string;
  navTitle?: string;
  h1?: string;
  keyword?: string;
  metaTitle: string;
  metaDescription: string;
  heroImage: { src: string; alt: string };
  intro: string[];
  atAGlance: Array<{ label: string; value: string }>;
  sections: Array<{ title: string; body: string }>;
  verdict?: { heading: string; body: string };
  faqs: Array<{ question: string; answer: string }>;
  relatedSupportHref: string;
  relatedSupportLabel: string;
}

export interface SupportPageContent {
  href: string;
  navTitle?: string;
  metaTitle: string;
  metaDescription: string;
  h1?: string;
  keyword?: string;
  heroImage?: { src: string; alt: string };
  sections?: Array<{ heading?: string; title?: string; body: string[] }>;
  faqs?: Array<{ question: string; answer: string }>;
  relatedMoneyHref?: string;
  relatedMoneyLabel?: string;
}

const MONEY_PAGE_CONTENT: MoneyPageContent[] = [
  {
    href: '/money/tivoli-from-rome',
    heroImage: { src: 'https://images.unsplash.com/photo-1547471080-7cc2caa01a7e', alt: "Cascading water fountains in the elaborate garden of Villa d'Este" },
    h1: 'Tivoli Day Trip from Rome: Half-Day vs Full-Day',
    keyword: 'tivoli day trip from rome',
    metaTitle: 'Tivoli Day Trip from Rome: Half-Day vs Full-Day Guide',
    metaDescription:
      'Close enough for a half-day trip, full-day lets you see both villas properly — timing, routing, and honest transit logistics from Rome.',
    intro: [],
    atAGlance: [],
    sections: [],
    faqs: [],
    relatedSupportHref: '/getting-to-tivoli-train-vs-tour',
    relatedSupportLabel: 'Getting to Tivoli',
  },
  {
    href: '/villa-d-este-hadrian-s-villa',
    heroImage: { src: 'https://images.unsplash.com/photo-1566073771259-6a8506099945', alt: "Ancient Roman columns and ruins at Hadrian's Villa, surrounded by cypress trees" },
    h1: "Villa d'Este and Hadrian's Villa: Which to See First",
    keyword: "villa d'este hadrian's villa tour",
    metaTitle: "Villa d'Este and Hadrian's Villa: Which to See First",
    metaDescription:
      "Combining Villa d'Este's fountains with Hadrian's Villa's ruins in one day — routing, timing, and which site to prioritise.",
    intro: [],
    atAGlance: [],
    sections: [],
    faqs: [],
    relatedSupportHref: '/which-villa-to-prioritise',
    relatedSupportLabel: 'Which Villa',
  },
  {
    href: '/private-tivoli-tour',
    heroImage: { src: 'https://images.unsplash.com/photo-1552832860-cfb67165eaf0', alt: "Sunset light over Villa d'Este fountains with golden-hour glow on the water features" },
    h1: 'Private Tivoli Tour: Door-to-Door Transport & Pacing',
    keyword: 'private tivoli tour',
    metaTitle: 'Private Tivoli Tour: Door-to-Door Transport & Pacing',
    metaDescription:
      'Skip the bus transfers — private tour removes the logistics hassle and lets you customize your day between the two villas.',
    intro: [],
    atAGlance: [],
    sections: [],
    faqs: [],
    relatedSupportHref: '/getting-to-tivoli-train-vs-tour',
    relatedSupportLabel: 'Getting to Tivoli',
  },
  {
    href: '/half-day-tivoli',
    heroImage: { src: 'https://images.unsplash.com/photo-1549144611-11a278e1e57a', alt: "Aerial view of Villa d'Este's terraced gardens with fountains and symmetrical landscaping" },
    h1: "Half-Day Tivoli: Villa d'Este Fountains Only",
    keyword: 'half day tivoli tour',
    metaTitle: "Half-Day Tivoli: Villa d'Este Fountains Only",
    metaDescription:
      "Enough time for Villa d'Este's fountain gardens without the full-day commitment — realistic round-trip timing from Rome.",
    intro: [],
    atAGlance: [],
    sections: [],
    faqs: [],
    relatedSupportHref: '/gardens-best-season',
    relatedSupportLabel: 'Best Season',
  },
];

const SUPPORT_PAGE_CONTENT: SupportPageContent[] = [
  {
    href: '/support/getting-to-tivoli-train-vs-tour',
    metaTitle: 'Getting to Tivoli from Rome: Train, Bus & Tour Options',
    metaDescription:
      'Independent train-and-bus routing with exact timing, or tour convenience — here\'s what actually works for a Tivoli day trip.',
  },
  {
    href: '/which-villa-to-prioritise',
    metaTitle: "Villa d'Este or Hadrian's Villa: Which Should You Visit?",
    metaDescription:
      "Renaissance fountains vs Roman imperial ruins — which villa suits your interests, and which should you pick if time is tight.",
  },
  {
    href: '/gardens-best-season',
    metaTitle: "Villa d'Este's Gardens: Best Season & Month-by-Month Timing",
    metaDescription:
      'May has the fountains at full flow and blooming gardens; summer is hot and crowded — here\'s the real breakdown by month.',
  },
  {
    href: '/tivoli-with-kids',
    metaTitle: 'Tivoli with Kids: Family-Friendly Gardens & Ruins',
    metaDescription:
      "Villa d'Este's fountains are genuinely kid-engaging — here's how to plan a Tivoli day trip that works for all ages.",
  },
];

export function getMoneyPageContent(href: string): MoneyPageContent | undefined {
  return MONEY_PAGE_CONTENT.find((p) => p.href === href);
}

export function getSupportPageContent(href: string): SupportPageContent | undefined {
  return SUPPORT_PAGE_CONTENT.find((p) => p.href === href);
}

export const PAGE_META: Record<string, PageMetadata> = {
  home: {
    title: "Tivoli Day Trips — Villa d'Este & Hadrian's Villa Guide",
    description:
      "First-hand Tivoli day-trip guide from Rome. Villa d'Este vs Hadrian's Villa, half-day vs full-day, and honest transit logistics.",
  },
};
