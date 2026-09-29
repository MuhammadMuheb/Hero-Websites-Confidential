/**
 * Shared data for the Amalfi Day Trip hero property — content arrays, nav
 * item lists, and the hero image constant. Mirrors the Tuscany Day Trip pattern.
 */

export { AUTHOR, FAQS, QUICK_FACTS, QUICK_LINKS } from './amalfi-day-trip-content';

export const HERO_IMAGE = {
  src: 'https://images.unsplash.com/photo-1612698093158-e07ac200d44e?w=1600&q=80',
  alt: 'Colourful buildings of Amalfi town on the rocky cliffs above turquoise water',
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
    image: { src: 'https://images.unsplash.com/photo-1561956021-947f09ae0101', alt: 'Colourful houses stacked on the steep cliffside of Positano above the sea' },
  },
  {
    title: 'Amalfi from Naples/Sorrento',
    href: '/amalfi-from-naples-sorrento',
    blurb: 'A short-hop origin that makes a proper Amalfi day genuinely realistic instead of an exhausting round-trip slog.',
    keyword: 'amalfi from sorrento',
    cta: 'Compare coastal day trips',
    badge: 'Shorter Transit' as string | null,
    image: { src: 'https://images.unsplash.com/photo-1638431123093-4fb8d880542f', alt: 'View from Ravello over the mountains and the sea' },
  },
  {
    title: "Positano + Amalfi + Ravello",
    href: "/positano-amalfi-ravello",
    blurb: "The three-town classic — but the order and time budget per town make or break the day. Here's the routing that actually works.",
    keyword: "positano amalfi ravello tour",
    cta: "Compare three-town tours",
    badge: "Classic Trio" as string | null,
    image: { src: 'https://images.unsplash.com/photo-1612698093158-e07ac200d44e', alt: 'Colourful buildings of Amalfi town on the rocky cliffs above turquoise water' },
  },
  {
    title: "Amalfi Boat Day Trip",
    href: "/amalfi-boat-day-trip",
    blurb: "Seeing the coast from the water solves the coast road's worst problem — traffic and hairpin-turn queues that eat afternoons in summer.",
    keyword: "amalfi boat tour",
    cta: "Compare boat tours",
    badge: "Scenic Alternative" as string | null,
    image: { src: 'https://images.unsplash.com/photo-1724003750929-5eb8dee320ab', alt: 'A small group on a sailboat off the Amalfi Coast' },
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
    image: { src: 'https://images.unsplash.com/photo-1569314516237-411aa03c2a44', alt: 'Buildings climbing the hillside above the sea on the Amalfi Coast' },
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
    image: { src: 'https://images.unsplash.com/photo-1596736743518-eef8c49026b7', alt: 'Boats moored off the beach below Positano' },
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
    image: { src: 'https://images.unsplash.com/photo-1612277262334-257287134cc4', alt: 'A villa in Ravello high above the sea on the Amalfi Coast' },
    coastaltastingIncluded: false,
  },
  {
    partner: 'GetYourGuide',
    slug: 'positano-amalfi-ravello-from-naples',
    title: 'Positano + Amalfi + Ravello',
    meta: '3-town classic route',
    priceFrom: 70,
    badge: 'Classic Route',
    href: '/go/positano-amalfi-ravello-from-naples',
    image: { src: 'https://images.unsplash.com/photo-1612698093158-e07ac200d44e', alt: 'Colorful buildings of Amalfi town on the rocky cliffs above turquoise water' },
    coastaltastingIncluded: false,
  },
  {
    partner: 'Viator',
    slug: 'amalfi-coast-tour-from-rome',
    title: 'Amalfi Coast Day Trip from Rome',
    meta: 'Long-day journey',
    priceFrom: 85,
    badge: 'Long Day',
    href: '/go/amalfi-coast-tour-from-rome',
    image: { src: 'https://images.unsplash.com/photo-1561956021-947f09ae0101', alt: 'Colorful houses stacked on the steep cliffside of Positano above the sea' },
    coastaltastingIncluded: false,
  },
  {
    partner: 'GetYourGuide',
    slug: 'amalfi-sunset-tour-from-sorrento',
    title: 'Amalfi Sunset Tour',
    meta: '3h · golden hour drive',
    priceFrom: 55,
    badge: 'Sunset Views',
    href: '/go/amalfi-sunset-tour-sorrento',
    image: { src: 'https://images.unsplash.com/photo-1583844056361-4418a8f2a985', alt: 'Positano lit up at night on the Amalfi Coast' },
    coastaltastingIncluded: false,
  },
  {
    partner: 'Civitatis',
    slug: 'amalfi-food-wine-tour-from-naples',
    title: 'Amalfi Food & Wine Tasting',
    meta: 'Culinary experience',
    priceFrom: 95,
    badge: 'Gourmet',
    href: '/go/amalfi-food-wine-tour-naples',
    image: { src: 'https://images.unsplash.com/photo-1638431123093-4fb8d880542f', alt: 'Lemons on the Amalfi Coast, famous for limoncello' },
    coastaltastingIncluded: true,
  },
  {
    partner: 'Viator',
    slug: 'path-gods-hiking-amalfi',
    title: 'Path of the Gods Hiking Tour',
    meta: 'Scenic mountain trail',
    priceFrom: 60,
    badge: 'Active Hike',
    href: '/go/path-of-gods-hiking-amalfi',
    image: { src: 'https://images.unsplash.com/photo-1724003750929-5eb8dee320ab', alt: 'A scenic mountain path overlooking the Amalfi Coast' },
    coastaltastingIncluded: false,
  },
];

export const NAV_ITEMS: NavItem[] = [
  { title: 'From Rome', href: '/amalfi-from-rome', keyword: 'amalfi coast from rome' },
  { title: 'From Naples/Sorrento', href: '/amalfi-from-naples-sorrento', keyword: 'amalfi from sorrento' },
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
    image: { src: 'https://images.unsplash.com/photo-1596736743518-eef8c49026b7', alt: 'Boats moored off the beach below Positano' },
  },
  {
    title: 'Best Towns',
    href: '/best-towns-for-a-day',
    keyword: 'best amalfi towns',
    image: { src: 'https://images.unsplash.com/photo-1612277262334-257287134cc4', alt: 'A villa in Ravello high above the sea on the Amalfi Coast' },
  },
  {
    title: 'Summer Timing',
    href: '/summer-crowds-timing',
    keyword: 'amalfi summer crowds',
    image: { src: 'https://images.unsplash.com/photo-1583844056361-4418a8f2a985', alt: 'Positano lit up at night on the Amalfi Coast' },
  },
];

export const EXPLORE_LINKS = MONEY_PAGES.map((p) => ({ label: p.title, href: p.href }));
export const LEARN_LINKS = SUPPORT_PAGES.map((p) => ({ label: p.title, href: p.href }));

export const TOURS_NAV_ITEMS: NavItem[] = MONEY_PAGES.map((p) => ({ title: p.title, href: p.href, keyword: p.keyword }));

export const PLAN_NAV_ITEMS: NavItem[] = SUPPORT_PAGES.map((p) => ({ title: p.title, href: p.href, keyword: p.keyword }));

export const Amalfi_DAY_TRIP_GALLERY = [
  { src: 'https://images.unsplash.com/photo-1561956021-947f09ae0101', alt: 'Colourful houses stacked on the steep cliffside of Positano above the sea' },
  { src: 'https://images.unsplash.com/photo-1638431123093-4fb8d880542f', alt: 'View from Ravello over the mountains and the sea' },
  { src: 'https://images.unsplash.com/photo-1612698093158-e07ac200d44e', alt: 'Colourful buildings of Amalfi town on the rocky cliffs above turquoise water' },
  { src: 'https://images.unsplash.com/photo-1724003750929-5eb8dee320ab', alt: 'A small group on a sailboat off the Amalfi Coast' },
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
