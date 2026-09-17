/**
 * Shared data for the Amalfi Day Trip hero property — content arrays, nav
 * item lists, and the hero image constant. Mirrors the Tuscany Day Trip pattern.
 */

export { AUTHOR, FAQS, QUICK_FACTS, QUICK_LINKS } from './amalfi-day-trip-content';

export const HERO_IMAGE = {
  src: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e',
  alt: 'Colorful houses stacked on the cliffs of Positano overlooking the Mediterranean',
};

export interface NavItem {
  title: string;
  href: string;
  keyword: string;
}

export const MONEY_PAGES = [
  {
    title: 'Amalfi from Rome',
    href: '/money/amalfi-from-rome',
    blurb: 'The long-day flagship from Rome — over 4 hours of one-way travel, which makes this the trip where "is it actually worth it" matters most.',
    keyword: 'amalfi coast from rome',
    cta: 'Compare Rome day trips',
    badge: 'Long-Day Trip' as string | null,
    image: { src: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4', alt: 'A sunset view over the Amalfi Coast with sailboats dotting the calm summer sea' },
  },
  {
    title: 'Amalfi from Naples/Sorrento',
    href: '/money/amalfi-from-naples-sorrento',
    blurb: 'A short-hop origin that makes a proper Amalfi day genuinely realistic instead of an exhausting round-trip slog.',
    keyword: 'amalfi from sorrento',
    cta: 'Compare coastal day trips',
    badge: 'Shorter Transit' as string | null,
    image: { src: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34', alt: 'Clifftop view of Ravello with terraced gardens and Mediterranean landscape stretching to the horizon' },
  },
  {
    title: "Positano + Amalfi + Ravello",
    href: "/positano-amalfi-ravello",
    blurb: "The three-town classic — but the order and time budget per town make or break the day. Here's the routing that actually works.",
    keyword: "positano amalfi ravello tour",
    cta: "Compare three-town tours",
    badge: "Classic Trio" as string | null,
    image: { src: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e", alt: "Colorful houses stacked on the cliffs of Positano overlooking the Mediterranean" },
  },
  {
    title: "Amalfi Boat Day Trip",
    href: "/amalfi-boat-day-trip",
    blurb: "Seeing the coast from the water solves the coast road's worst problem — traffic and hairpin-turn queues that eat afternoons in summer.",
    keyword: "amalfi boat tour",
    cta: "Compare boat tours",
    badge: "Scenic Alternative" as string | null,
    image: { src: "https://images.unsplash.com/photo-1573070917719-cb3768c42634", alt: "Crystal-clear Mediterranean waters and coastal beauty" },
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
  coastaltastingIncluded?: boolean;
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
    image: { src: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4', alt: 'A sunset view over the Amalfi Coast with sailboats dotting the calm summer sea' },
    coastaltastingIncluded: false,
  },
  {
    partner: 'Viator',
    slug: 'amalfi-coast-boat-cruise-from-naples',
    title: 'Amalfi Coast Boat Cruise',
    meta: 'Sea-level routing',
    priceFrom: 75,
    badge: null,
    href: '/go/amalfi-coast-boat-cruise-from-naples',
    image: { src: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e', alt: 'Colorful houses stacked on the cliffs of Positano overlooking the Mediterranean' },
    coastaltastingIncluded: true,
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
    coastaltastingIncluded: false,
  },
];

export const NAV_ITEMS: NavItem[] = [
  { title: 'From Rome', href: '/money/amalfi-from-rome', keyword: 'amalfi coast from rome' },
  { title: 'From Naples/Sorrento', href: '/money/amalfi-from-naples-sorrento', keyword: 'amalfi from sorrento' },
  { title: 'Positano, Amalfi, Ravello', href: '/positano-amalfi-ravello', keyword: 'positano amalfi ravello tour' },
  { title: 'Boat Tours', href: '/money/amalfi-boat-day-trip', keyword: 'amalfi boat tour' },
  { title: 'Boat vs Road', href: '/boat-vs-road', keyword: 'amalfi boat vs road' },
  { title: 'Best Towns', href: '/best-towns-for-a-day', keyword: 'best amalfi coast towns' },
  { title: 'Timing & Crowds', href: '/summer-crowds-timing', keyword: 'amalfi coast summer crowds' },
];

export const SUPPORT_PAGES = [
  {
    title: 'Boat vs Road',
    href: '/boat-vs-road',
    keyword: 'amalfi boat vs road',
    image: { src: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34', alt: 'Clifftop view of Ravello with terraced gardens and Mediterranean landscape stretching to the horizon' },
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

export const EXPLORE_LINKS = MONEY_PAGES.map((p) => ({ label: p.title, href: p.href }));
export const LEARN_LINKS = SUPPORT_PAGES.map((p) => ({ label: p.title, href: p.href }));

export const TOURS_NAV_ITEMS: NavItem[] = MONEY_PAGES.map((p) => ({ title: p.title, href: p.href, keyword: p.keyword }));

export const PLAN_NAV_ITEMS: NavItem[] = SUPPORT_PAGES.map((p) => ({ title: p.title, href: p.href, keyword: p.keyword }));

export const Amalfi_DAY_TRIP_GALLERY = [
  { src: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4', alt: 'A sunset view over the Amalfi Coast with sailboats dotting the calm summer sea' },
  { src: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34', alt: 'Clifftop view of Ravello with terraced gardens and Mediterranean landscape stretching to the horizon' },
  { src: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e', alt: 'Colorful houses stacked on the cliffs of Positano overlooking the Mediterranean' },
  { src: 'https://images.unsplash.com/photo-1573070917719-cb3768c42634', alt: 'Visitors gathered around a fountain in an open Rome piazza' },
];

export function getFeaturedToursForPage(href: string, max = 4): FeaturedTour[] {
  return FEATURED_TOURS.filter((tour) => {
    const tourHref = tour.href.split('/go/')[1];
    return tourHref ? (tourHref.includes(href) || href.includes(tourHref)) : false;
  }).slice(0, max);
}

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
  contactEmail: 'hello@amalfi-day-trip.com',
};
