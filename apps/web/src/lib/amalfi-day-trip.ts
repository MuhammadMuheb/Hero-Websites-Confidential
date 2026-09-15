/**
 * Shared data for the Amalfi Day Trip hero property — content arrays, nav
 * item lists, and the hero image constant. Mirrors the Tuscany Day Trip pattern.
 */

export const HERO_IMAGE = {
  src: 'https://images.unsplash.com/photo-1592864506206-52c4fb4ab5a5',
  alt: 'Pastel-colored houses clinging to the cliffsides of Positano, overlooking the turquoise Tyrrhenian Sea',
};

export interface NavItem {
  title: string;
  href: string;
  keyword: string;
}

export const MONEY_PAGES = [
  {
    title: 'Amalfi from Rome',
    href: '/amalfi-from-rome',
    blurb: 'The long-day flagship from Rome — over 4 hours of one-way travel, which makes this the trip where "is it actually worth it" matters most.',
    keyword: 'amalfi coast from rome',
    cta: 'Compare Rome day trips',
    badge: 'Long-Day Trip' as string | null,
    image: { src: 'https://images.unsplash.com/photo-1599050642881-cdeae5abac2e', alt: 'A yacht sailing along the dramatic cliffside towns of the Amalfi Coast' },
  },
  {
    title: 'Amalfi from Naples/Sorrento',
    href: '/amalfi-from-naples-sorrento',
    blurb: 'A short-hop origin that makes a proper Amalfi day genuinely realistic instead of an exhausting round-trip slog.',
    keyword: 'amalfi from sorrento',
    cta: 'Compare coastal day trips',
    badge: 'Shorter Transit' as string | null,
    image: { src: 'https://images.unsplash.com/photo-1580077614312-94b1b0e6fe78', alt: 'Winding coastal roads with switchback turns overlooking pastel villages and the Mediterranean' },
  },
  {
    title: 'Positano + Amalfi + Ravello',
    href: '/positano-amalfi-ravello',
    blurb: 'The three-town classic — but the order and time budget per town make or break the day. Here's the routing that actually works.',
    keyword: 'positano amalfi ravello tour',
    cta: 'Compare three-town tours',
    badge: 'Classic Trio' as string | null,
    image: { src: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34', alt: 'Clifftop view of Ravello with terraced gardens and Mediterranean landscape stretching to the horizon' },
  },
  {
    title: 'Amalfi Boat Day Trip',
    href: '/amalfi-boat-day-trip',
    blurb: 'Seeing the coast from the water solves the coast road\'s worst problem — traffic and hairpin-turn queues that eat afternoons in summer.',
    keyword: 'amalfi boat tour',
    cta: 'Compare boat tours',
    badge: 'Scenic Alternative' as string | null,
    image: { src: 'https://images.unsplash.com/photo-1612080626919-c3400ca199e7', alt: 'Crystal-clear Mediterranean waters lapping against lemon-colored cliffs in full summer sun' },
  },
];

export interface FeaturedTour {
  partner: string;
  slug: string;
  title: string;
  meta: string;
  priceFrom: number;
  badge: string | null;
  href: string;
  image: { src: string; alt: string };
}

export const FEATURED_TOURS: FeaturedTour[] = [
  {
    partner: 'GetYourGuide',
    slug: 'amalfi-coast-full-day-tour-naples',
    title: 'Amalfi Coast Full-Day Tour',
    meta: 'From Naples or Sorrento',
    priceFrom: 65,
    badge: 'Most Popular',
    href: '/go/amalfi-coast-full-day-tour-naples',
    image: { src: 'https://images.unsplash.com/photo-1599050642881-cdeae5abac2e', alt: 'A yacht sailing along the dramatic cliffside towns of the Amalfi Coast' },
  },
  {
    partner: 'Viator',
    slug: 'amalfi-coast-boat-cruise-from-naples',
    title: 'Amalfi Coast Boat Cruise',
    meta: 'Sea-level routing',
    priceFrom: 75,
    badge: null,
    href: '/go/amalfi-coast-boat-cruise-from-naples',
    image: { src: 'https://images.unsplash.com/photo-1580077614312-94b1b0e6fe78', alt: 'Winding coastal roads with switchback turns overlooking pastel villages and the Mediterranean' },
  },
  {
    partner: 'Civitatis',
    slug: 'private-amalfi-coast-tour-from-naples',
    title: 'Private Amalfi Tour',
    meta: 'Custom pacing & stops',
    priceFrom: 250,
    badge: 'Private',
    href: '/go/private-amalfi-coast-tour-from-naples',
    image: { src: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34', alt: 'Clifftop view of Ravello with terraced gardens and Mediterranean landscape stretching to the horizon' },
  },
];

export const NAV_ITEMS: NavItem[] = [
  { title: 'From Rome', href: '/amalfi-from-rome', keyword: 'amalfi coast from rome' },
  { title: 'From Naples/Sorrento', href: '/amalfi-from-naples-sorrento', keyword: 'amalfi from sorrento' },
  { title: 'Positano, Amalfi, Ravello', href: '/positano-amalfi-ravello', keyword: 'positano amalfi ravello tour' },
  { title: 'Boat Tours', href: '/amalfi-boat-day-trip', keyword: 'amalfi boat tour' },
  { title: 'Boat vs Road', href: '/boat-vs-road', keyword: 'amalfi boat vs road' },
  { title: 'Best Towns', href: '/best-towns-for-a-day', keyword: 'best amalfi coast towns' },
  { title: 'Timing & Crowds', href: '/summer-crowds-timing', keyword: 'amalfi coast summer crowds' },
];

export const SUPPORT_PAGES = [
  {
    title: 'Boat vs Road',
    href: '/boat-vs-road',
    keyword: 'amalfi boat vs road',
    image: { src: 'https://images.unsplash.com/photo-1581973947576-a01b71b8a3eb', alt: 'Aerial view of a luxury yacht anchored near the turquoise waters off the Amalfi Coast' },
  },
  {
    title: 'Best Towns',
    href: '/best-towns-for-a-day',
    keyword: 'best amalfi towns',
    image: { src: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e', alt: 'Colorful houses stacked on the cliffs of Positano overlooking the Mediterranean' },
  },
  {
    title: 'Summer Timing',
    href: '/summer-crowds-timing',
    keyword: 'amalfi summer crowds',
    image: { src: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4', alt: 'A sunset view over the Amalfi Coast with sailboats dotting the calm summer sea' },
  },
];
