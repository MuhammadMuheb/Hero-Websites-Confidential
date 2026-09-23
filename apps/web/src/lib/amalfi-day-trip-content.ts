/**
 * Content copy for Amalfi Day Trip — hero section, money-page hooks,
 * FAQ answers, and SEO metadata. All strings are production-ready from
 * the master network blueprint (MASTER-NETWORK-BLUEPRINT.md §3.12).
 */

export const HERO = {
  eyebrow: undefined,
  headline: 'Amalfi Coast Day Trips, By Road or By Boat',
  subheadline:
    "Positano, Amalfi, Ravello — every route and origin city here has been driven, ridden, and sailed in person, with honest notes on when the coast road beats the boat and when it doesn't.",
  primaryCta: { label: 'Find My Amalfi Day Trip', href: '#tours' },
  secondaryCta: { label: 'Boat or road — which is better?', href: '/boat-vs-road' },
  trustBullets: [
    'Every route driven, ridden and sailed first-hand',
    'Honest boat-vs-road comparison, not a booking push',
    'Summer-crowd timing that actually helps you plan',
    'Split cleanly from Pompeii and Capri — Amalfi towns only',
  ],
};

export const MONEY_PAGE_COPY = {
  amalfiFromRome: {
    hook: 'The long-day flagship from Rome — over 4 hours of one-way travel, which makes this the trip where "is it actually worth it" matters most.',
    highlights: [
      'Realistic one-way travel time',
      'Overnight-vs-day-trip tradeoff',
      'Which towns fit in a single long day',
    ],
  },
  amalfiFromNaplesSorrento: {
    hook: 'A short-hop origin that makes a proper Amalfi day genuinely realistic instead of an exhausting round-trip slog.',
    highlights: [
      'Sorrento-to-Amalfi transit time',
      'Which towns are reachable in a relaxed day',
      'Return-timing for an evening in Sorrento',
    ],
  },
  positanoAmalfiRavello: {
    hook: "The three-town classic — but the order and time budget per town make or break the day. Here's the routing that actually works.",
    highlights: [
      "Town-order logic by crowd pattern",
      "Time budget per town",
      "Ravello's clifftop-garden detour value",
    ],
  },
  amalfiBoatDayTrip: {
    hook: "Seeing the coast from the water solves the coast road's worst problem — the traffic and hairpin-turn queues that eat entire afternoons in summer.",
    highlights: [
      'Sea-route town stops',
      'Boat-vs-bus timing comparison',
      'Seasickness/weather considerations',
    ],
  },
};

export const FAQ_ITEMS = [
  {
    question: 'Is a day trip to the Amalfi Coast from Rome actually worth it?',
    answer:
      "It's a genuinely long day — over 4 hours one-way — so it's worth it if you want a taste of the coast on a Rome-based trip, but an overnight stay is the better call if the coast is a real priority rather than a box to check.",
  },
  {
    question: 'Should I book a boat or a road tour?',
    answer:
      "Boat avoids the coast road's summer traffic and hairpin-turn queues entirely and gives the classic postcard views; road tours let you actually stop and walk through Positano/Amalfi/Ravello rather than viewing from the water — the boat-vs-road page breaks down which suits your priorities.",
  },
  {
    question: "When are the Amalfi Coast's crowds worst?",
    answer:
      'July and August, especially midday in Positano — the summer-crowds-timing page covers shoulder-season alternatives (late May, September) that keep the views without the gridlock.',
  },
  {
    question: "Can I visit Positano, Amalfi, and Ravello all in one day?",
    answer:
      "Yes, but it's tight — budget realistic time per town rather than trying to linger in all three, and expect the day to run 10+ hours door to door from a Naples/Sorrento base.",
  },
  {
    question: 'Is the Amalfi Coast drivable, or should I take a tour?',
    answer:
      "The coast road is narrow, cliffside, and notoriously congested in summer — self-driving is doable outside peak season, but a guided tour or boat removes the stress entirely during July/August.",
  },
];

export const SEO_META = {
  home: {
    title: 'Amalfi Coast Day Trips — By Road or By Boat, Honestly Compared',
    description:
      'First-hand Amalfi Coast day-trip guide. Positano, Ravello, and Amalfi routing, boat-vs-road comparisons, and honest crowd timing.',
  },
  amalfiBoatDayTrip: {
    title: 'Amalfi Boat Day Trip: Avoiding the Coast Road\'s Traffic',
    description:
      "Why a boat day trip along the Amalfi Coast beats the coast road in summer — sea-route stops, timing, and what to expect.",
  },
};

export const AUTHOR = {
  name: 'Marco Rossi',
  initials: 'MR',
  title: 'Amalfi Coast guide, 8 years',
  domain: 'amalficoastguide.com',
  bio: 'A guide who has driven every switchback and sailed every cove along the Amalfi Coast — writes from real experience, not travel blogs.',
};

export const FAQS = FAQ_ITEMS;

export const QUICK_FACTS = [
  { label: 'Distance from Rome', value: 'Positano: ~260 km', detail: 'Long-day trip from Rome base' },
  { label: 'Distance from Naples', value: 'Positano: ~60 km', detail: 'Realistic day trip from Naples base' },
  { label: 'Driving time (Naples base)', value: '1.5–2 hours to Positano', detail: 'Coast road travel time one-way' },
  { label: 'Coast road condition', value: 'Narrow, cliffside, winding', detail: 'Requires careful driving in summer traffic' },
  { label: 'Best months', value: 'May–June, Sept–Oct', detail: 'Shoulder season for crowds and weather' },
  { label: 'Peak crowds', value: 'July–August', detail: 'Summer vacation brings largest crowds' },
];

export interface QuickLink {
  label: string;
  href: string;
}

export const QUICK_LINKS: QuickLink[] = [
  { label: 'From Rome', href: '/amalfi-from-rome' },
  { label: 'From Naples/Sorrento', href: '/amalfi-from-naples-sorrento' },
  { label: 'Boat Tours', href: '/amalfi-boat-day-trip' },
  { label: 'Boat vs Road', href: '/boat-vs-road' },
  { label: 'Best Season', href: '/summer-crowds-timing' },
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
    href: "/amalfi-from-rome",
    h1: "Amalfi Coast Day Trip From Rome",
    keyword: "amalfi coast from rome",
    metaTitle: "Amalfi Coast Day Trip From Rome: Is It Worth the Travel Time?",
    metaDescription:
      "Over 4 hours of one-way travel from Rome to the Amalfi Coast — here's whether a day trip makes sense, and which towns fit in one day.",
    heroImage: { src: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4', alt: 'A sunset view over the Amalfi Coast with sailboats dotting the calm summer sea' },
    intro: [],
    atAGlance: [],
    sections: [],
    faqs: [],
    relatedSupportHref: "/boat-vs-road",
    relatedSupportLabel: "Boat vs Road",
  },
  {
    href: "/amalfi-from-naples-sorrento",
    h1: "Amalfi Coast Day Trip From Sorrento",
    keyword: "amalfi from sorrento",
    metaTitle: "Amalfi Coast Day Trip From Sorrento: Timing and Town Selection",
    metaDescription:
      "From Sorrento or Naples, a proper Amalfi day is genuinely realistic — here's the routing, timing, and which towns to prioritize.",
    heroImage: { src: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34', alt: "Clifftop view of Ravello with terraced gardens and Mediterranean landscape stretching to the horizon" },
    intro: [],
    atAGlance: [],
    sections: [],
    faqs: [],
    relatedSupportHref: "/best-towns-for-a-day",
    relatedSupportLabel: "Best Towns",
  },
  {
    href: "/positano-amalfi-ravello",
    h1: "Positano, Amalfi, and Ravello: Routing That Actually Works",
    keyword: "positano amalfi ravello tour",
    metaTitle: "Positano, Amalfi, and Ravello: Routing That Actually Works",
    metaDescription:
      "The three-town classic — but the order and time budget per town make or break the day. Here's the routing that works in one day.",
    heroImage: { src: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e', alt: 'Colorful houses stacked on the cliffs of Positano overlooking the Mediterranean' },
    intro: [],
    atAGlance: [],
    sections: [],
    faqs: [],
    relatedSupportHref: "/summer-crowds-timing",
    relatedSupportLabel: "Summer Crowds",
  },
  {
    href: "/amalfi-boat-day-trip",
    h1: "Amalfi Boat Day Trip",
    keyword: "amalfi boat tour",
    metaTitle: "Amalfi Boat Day Trip: Avoiding the Coast Road's Traffic",
    metaDescription:
      "Why a boat day trip along the Amalfi Coast beats the coast road in summer — sea-route stops, timing, and what to expect.",
    heroImage: { src: 'https://images.unsplash.com/photo-1573070917719-cb3768c42634', alt: 'Mediterranean coastal beauty with crystal waters' },
    intro: [],
    atAGlance: [],
    sections: [],
    faqs: [],
    relatedSupportHref: "/boat-vs-road",
    relatedSupportLabel: "Boat vs Road",
  },
];

const SUPPORT_PAGE_CONTENT: SupportPageContent[] = [
  {
    href: "/boat-vs-road",
    metaTitle: "Boat vs Road: Which is Better for an Amalfi Coast Day Trip?",
    metaDescription:
      "Honest comparison of boat and road options for the Amalfi Coast — traffic reality, views, pacing, and when each option wins.",
  },
  {
    href: "/best-towns-for-a-day",
    metaTitle: "Best Towns for an Amalfi Coast Day Trip: Positano, Ravello, or Amalfi?",
    metaDescription:
      "A day limits you to 2–3 towns max. Here's which combination gives you the coast at its best without the exhaustion.",
  },
  {
    href: "/summer-crowds-timing",
    metaTitle: "Amalfi Coast Summer Crowds: When to Go and How to Avoid the Peak",
    metaDescription:
      "July–August are stunning but packed. Here's the real timing breakdown by town and shoulder-season alternatives that keep the light.",
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
    title: "Amalfi Coast Day Trips — By Road or By Boat, Honestly Compared",
    description:
      "First-hand Amalfi Coast day-trip guide. Positano, Ravello, and Amalfi routing, boat-vs-road comparisons, and honest crowd timing.",
  },
  amalfiFromRome: {
    title: "Amalfi Coast Day Trip From Rome: Is It Worth the Travel Time?",
    description:
      "Over 4 hours of one-way travel from Rome to the Amalfi Coast — here's whether a day trip makes sense, and which towns fit in one day.",
  },
  amalfiFromNaplesSorrento: {
    title: "Amalfi Coast Day Trip From Sorrento: Timing and Town Selection",
    description:
      "From Sorrento or Naples, a proper Amalfi day is genuinely realistic — here's the routing, timing, and which towns to prioritize.",
  },
  positanoAmalfiRavello: {
    title: "Positano, Amalfi, and Ravello: Routing That Actually Works",
    description:
      "The three-town classic — but the order and time budget per town make or break the day. Here's the routing that works in one day.",
  },
  amalfiBoatDayTrip: {
    title: "Amalfi Boat Day Trip: Avoiding the Coast Road's Traffic",
    description:
      "Why a boat day trip along the Amalfi Coast beats the coast road in summer — sea-route stops, timing, and what to expect.",
  },
  boatVsRoad: {
    title: "Boat vs Road: Which is Better for an Amalfi Coast Day Trip?",
    description:
      "Honest comparison of boat and road options for the Amalfi Coast — traffic reality, views, pacing, and when each option wins.",
  },
  bestTownsForADay: {
    title: "Best Towns for an Amalfi Coast Day Trip: Positano, Ravello, or Amalfi?",
    description:
      "A day limits you to 2–3 towns max. Here's which combination gives you the coast at its best without the exhaustion.",
  },
  summerCrowdsTiming: {
    title: "Amalfi Coast Summer Crowds: When to Go and How to Avoid the Peak",
    description:
      "July–August are stunning but packed. Here's the real timing breakdown by town and shoulder-season alternatives that keep the light.",
  },
};
