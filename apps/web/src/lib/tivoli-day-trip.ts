/**
 * Shared data for the Tivoli Day Trip hero property — content arrays, nav
 * item lists, and the hero image constant. Mirrors the Amalfi Day Trip pattern.
 */

export { AUTHOR, FAQS, QUICK_FACTS, QUICK_LINKS } from './tivoli-day-trip-content';

export const HERO_IMAGE = {
  src: 'https://images.unsplash.com/photo-1552832860-cfb67165eaf0',
  alt: 'Cascading fountains of Villa d\'Este at Tivoli, with terraced Renaissance gardens and tall cypress trees framing the water features',
};

export interface NavItem {
  title: string;
  href: string;
  keyword: string;
}

export const MONEY_PAGES = [
  {
    title: 'Tivoli from Rome',
    href: '/money/tivoli-from-rome',
    blurb: 'The flagship half/full-day trip — close enough to Rome that a half-day is genuinely realistic, but full-day lets you properly see both villas without rushing.',
    keyword: 'tivoli day trip from rome',
    cta: 'Compare Tivoli tours',
    badge: 'Half or Full-Day' as string | null,
    image: { src: 'https://images.unsplash.com/photo-1547471080-7cc2caa01a7e', alt: 'Cascading water fountains in the elaborate garden of Villa d\'Este' },
  },
  {
    title: 'Villa d\'Este + Hadrian\'s Villa',
    href: '/villa-d-este-hadrian-s-villa',
    blurb: 'The two-villa combo — Renaissance fountains against Roman imperial ruins, a genuine contrast most visitors don\'t expect from a single day trip.',
    keyword: 'villa d\'este hadrian\'s villa tour',
    cta: 'Compare two-villa tours',
    badge: 'Full-Day Classic' as string | null,
    image: { src: 'https://images.unsplash.com/photo-1566073771259-6a8506099945', alt: 'Ancient Roman columns and ruins at Hadrian\'s Villa, surrounded by cypress trees' },
  },
  {
    title: 'Private Tivoli Tour',
    href: '/private-tivoli-tour',
    blurb: 'A private guide and transport removes the two-bus, one-transfer logistics that make independent Tivoli travel more of a hassle than it needs to be.',
    keyword: 'private tivoli tour',
    cta: 'Compare private tours',
    badge: 'Private' as string | null,
    image: { src: 'https://images.unsplash.com/photo-1544551763-92ab472cad5d', alt: 'Intimate garden pathway lined with Mediterranean vegetation and stone walls' },
  },
  {
    title: 'Half-Day Tivoli',
    href: '/half-day-tivoli',
    blurb: 'The short option — enough time for Villa d\'Este\'s fountains alone, for travelers who can\'t spare a full day but still want to see Tivoli\'s headline site.',
    keyword: 'half day tivoli tour',
    cta: 'Compare half-day tours',
    badge: 'Quick Option' as string | null,
    image: { src: 'https://images.unsplash.com/photo-1552832860-cfb67165eaf0', alt: 'Sunset light over Villa d\'Este fountains with golden-hour glow on the water features' },
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
    slug: 'tivoli-villa-d-este-hadrian-s-villa-full-day',
    title: 'Tivoli Full-Day Tour',
    meta: 'Both villas, from Rome',
    priceFrom: 65,
    badge: 'Most Popular',
    href: '/go/tivoli-villa-d-este-hadrian-s-villa-full-day',
    image: { src: 'https://images.unsplash.com/photo-1547471080-7cc2caa01a7e', alt: 'Cascading water fountains in the elaborate garden of Villa d\'Este' },
  },
  {
    partner: 'Viator',
    slug: 'tivoli-villa-d-este-half-day-tour',
    title: 'Villa d\'Este Half-Day',
    meta: 'Fountains only',
    priceFrom: 50,
    badge: null,
    href: '/go/tivoli-villa-d-este-half-day-tour',
    image: { src: 'https://images.unsplash.com/photo-1552832860-cfb67165eaf0', alt: 'Cascading fountains of Villa d\'Este at Tivoli, with terraced Renaissance gardens and tall cypress trees' },
  },
  {
    partner: 'Tiqets',
    slug: 'private-tivoli-tour-with-driver',
    title: 'Private Tivoli Tour',
    meta: 'Custom pacing',
    priceFrom: 180,
    badge: 'Private',
    href: '/go/private-tivoli-tour-with-driver',
    image: { src: 'https://images.unsplash.com/photo-1566073771259-6a8506099945', alt: 'Ancient Roman columns and ruins at Hadrian\'s Villa, surrounded by cypress trees' },
  },
];

export const NAV_ITEMS: NavItem[] = [
  { title: 'From Rome', href: '/money/tivoli-from-rome', keyword: 'tivoli day trip from rome' },
  { title: 'Both Villas', href: '/villa-d-este-hadrian-s-villa', keyword: 'villa d\'este hadrian\'s villa tour' },
  { title: 'Private Tours', href: '/private-tivoli-tour', keyword: 'private tivoli tour' },
  { title: 'Half-Day', href: '/half-day-tivoli', keyword: 'half day tivoli tour' },
  { title: 'Getting There', href: '/getting-to-tivoli-train-vs-tour', keyword: 'how to get to tivoli' },
  { title: 'Which Villa', href: '/which-villa-to-prioritise', keyword: 'villa d\'este or hadrian\'s villa' },
  { title: 'Best Season', href: '/gardens-best-season', keyword: 'best time to visit tivoli' },
  { title: 'With Kids', href: '/money/tivoli-with-kids', keyword: 'tivoli day trip with children' },
];

export const SUPPORT_PAGES = [
  {
    title: 'Getting to Tivoli',
    href: '/getting-to-tivoli-train-vs-tour',
    keyword: 'how to get to tivoli from rome',
    image: { src: 'https://images.unsplash.com/photo-1567581935884-eadf19dd995a', alt: 'Italian regional train window view of countryside heading toward Tivoli' },
  },
  {
    title: 'Which Villa',
    href: '/which-villa-to-prioritise',
    keyword: 'villa d\'este or hadrian\'s villa',
    image: { src: 'https://images.unsplash.com/photo-1549144611-11a278e1e57a', alt: 'Aerial view of Villa d\'Este\'s terraced gardens with fountains and symmetrical landscaping' },
  },
  {
    title: 'Best Season',
    href: '/gardens-best-season',
    keyword: 'best time to visit villa d\'este',
    image: { src: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d', alt: 'Late spring gardens of Villa d\'Este in full bloom with fresh green foliage' },
  },
  {
    title: 'With Kids',
    href: '/money/tivoli-with-kids',
    keyword: 'tivoli day trip with children',
    image: { src: 'https://images.unsplash.com/photo-1552832860-cfb67165eaf0', alt: 'Family-friendly fountain pathway at Villa d\'Este, safe and accessible for all ages' },
  },
];

export const EXPLORE_LINKS = MONEY_PAGES.map((p) => ({ label: p.title, href: p.href }));
export const LEARN_LINKS = SUPPORT_PAGES.map((p) => ({ label: p.title, href: p.href }));

export const TOURS_NAV_ITEMS: NavItem[] = MONEY_PAGES.map((p) => ({ title: p.title, href: p.href, keyword: p.keyword }));

export const PLAN_NAV_ITEMS: NavItem[] = SUPPORT_PAGES.map((p) => ({ title: p.title, href: p.href, keyword: p.keyword }));

export const Tivoli_DAY_TRIP_GALLERY = [
  { src: 'https://images.unsplash.com/photo-1547471080-7cc2caa01a7e', alt: 'Cascading water fountains in the elaborate garden of Villa d\'Este' },
  { src: 'https://images.unsplash.com/photo-1566073771259-6a8506099945', alt: 'Ancient Roman columns and ruins at Hadrian\'s Villa, surrounded by cypress trees' },
  { src: 'https://images.unsplash.com/photo-1552832860-cfb67165eaf0', alt: 'Sunset light over Villa d\'Este fountains with golden-hour glow on the water features' },
  { src: 'https://images.unsplash.com/photo-1549144611-11a278e1e57a', alt: 'Aerial view of Villa d\'Este\'s terraced gardens with fountains and symmetrical landscaping' },
];

export function getFeaturedToursForPage(href: string, max = 4): FeaturedTour[] {
  return FEATURED_TOURS.filter((tour) => {
    const tourHref = tour.href.split('/go/')[1];
    return tourHref ? (tourHref.includes(href) || href.includes(tourHref)) : false;
  }).slice(0, max);
}
