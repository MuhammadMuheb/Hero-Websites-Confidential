/**
 * Shared data for the Tivoli Day Trip hero property — content arrays, nav
 * item lists, and the hero image constant. Mirrors the Amalfi Day Trip pattern.
 */

export { AUTHOR, FAQS, QUICK_FACTS, QUICK_LINKS } from './tivoli-day-trip-content';

export const HERO_IMAGE = {
  src: 'https://images.unsplash.com/photo-1654612533611-d4f18261d444?w=1600&q=80',
  alt: 'The villa building of Villa d\'Este in Tivoli with a fountain in front',
};


export interface NavItem {
  title: string;
  href: string;
  keyword: string;
}

export const MONEY_PAGES = [
  {
    title: 'Full-Day Both Villas',
    href: '/villa-d-este-hadrian-s-villa',
    blurb: 'Experience the complete Tivoli masterpiece: Renaissance fountains at Villa d\'Este and ancient imperial ruins at Hadrian\'s Villa. The ultimate cultural immersion without feeling rushed.',
    keyword: 'full day tivoli tour both villas',
    cta: 'Explore Full-Day Tours',
    badge: 'Most Popular' as string | null,
    image: { src: 'https://images.unsplash.com/photo-1613002999620-f586001ee027', alt: 'An ancient statue beside the water at Hadrian\'s Villa near Tivoli' },
  },
  {
    title: 'Half-Day Villa d\'Este',
    href: '/half-day-tivoli',
    blurb: 'Perfect for limited time. Discover the breathtaking fountains and Renaissance gardens of Villa d\'Este. Fast, focused, and thoroughly rewarding for art and history lovers.',
    keyword: 'half day villa d este tour',
    cta: 'View Half-Day Options',
    badge: 'Quick Escape' as string | null,
    image: { src: 'https://images.unsplash.com/photo-1664461890788-5c7d689cda56', alt: 'A row of water fountains in the gardens of Villa d\'Este, Tivoli' },
  },
  {
    title: 'Private Expert Guide',
    href: '/private-tivoli-tour',
    blurb: 'Personalized experience with an English-speaking guide who knows every corner of both sites. Skip the crowds, set your own pace, and get insider stories you won\'t find anywhere else.',
    keyword: 'private tivoli tour with guide',
    cta: 'Book Private Tour',
    badge: 'Premium' as string | null,
    image: { src: 'https://images.unsplash.com/photo-1664461892055-a073051e3c2c', alt: 'A courtyard with a fountain and statues at Villa d\'Este, Tivoli' },
  },
  {
    title: 'Self-Guided Essentials',
    href: '/support/getting-to-tivoli-train-vs-tour',
    blurb: 'Independent travelers: get the complete route, timing tips, transport hacks, and must-see highlights. Save money while still seeing everything that matters.',
    keyword: 'self guided tivoli day trip',
    cta: 'Plan Your Route',
    badge: 'Budget-Friendly' as string | null,
    image: { src: 'https://images.unsplash.com/photo-1550683402-b269d8d0304f', alt: 'Tall trees in the gardens of Tivoli near Rome' },
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
    slug: 'full-day-tivoli-both-villas',
    title: 'Full-Day Both Villas Experience',
    meta: 'Complete tour with expert guidance',
    priceFrom: 69,
    badge: '⭐ Top Rated',
    href: '/go/full-day-tivoli-both-villas',
    image: { src: 'https://images.unsplash.com/photo-1654612533611-d4f18261d444', alt: 'The villa building of Villa d\'Este in Tivoli with a fountain in front' },
  },
  {
    partner: 'Viator',
    slug: 'half-day-villa-este-fountains',
    title: 'Half-Day Villa d\'Este Focus',
    meta: 'Quick & beautiful fountains tour',
    priceFrom: 45,
    badge: '🚀 Quick Tour',
    href: '/go/half-day-villa-este-fountains',
    image: { src: 'https://images.unsplash.com/photo-1664461890788-5c7d689cda56', alt: 'A row of water fountains in the gardens of Villa d\'Este, Tivoli' },
  },
  {
    partner: 'Civitatis',
    slug: 'private-tivoli-expert-guide',
    title: 'Private Tour with Expert Guide',
    meta: 'Personalized & all-inclusive experience',
    priceFrom: 195,
    badge: '👑 Premium',
    href: '/go/private-tivoli-expert-guide',
    image: { src: 'https://images.unsplash.com/photo-1664461892055-a073051e3c2c', alt: 'A courtyard with a fountain and statues at Villa d\'Este, Tivoli' },
  },
  {
    partner: 'GetYourGuide',
    slug: 'hadrians-villa-archaeology-focus',
    title: 'Hadrian\'s Villa Archaeology Deep Dive',
    meta: 'In-depth ancient Roman history & ruins',
    priceFrom: 55,
    badge: '🏛️ History',
    href: '/go/hadrians-villa-archaeology-focus',
    image: { src: 'https://images.unsplash.com/photo-1613002999620-f586001ee027', alt: 'An ancient statue beside the water at Hadrian\'s Villa near Tivoli' },
  },
  {
    partner: 'Viator',
    slug: 'tivoli-gardens-photography-tour',
    title: 'Tivoli Gardens Photography Tour',
    meta: 'Capture stunning light & landscape moments',
    priceFrom: 89,
    badge: '📸 Photo Tour',
    href: '/go/tivoli-gardens-photography-tour',
    image: { src: 'https://images.unsplash.com/photo-1654533596848-5c1bd2393cae', alt: 'A fountain with a statue in the gardens of Villa d\'Este' },
  },
  {
    partner: 'Civitatis',
    slug: 'villa-este-skip-line-early-access',
    title: 'Villa d\'Este Skip-the-Line Early Access',
    meta: 'Beat the crowds with early morning entry',
    priceFrom: 65,
    badge: '⏰ Skip-Line',
    href: '/go/villa-este-skip-line-early-access',
    image: { src: 'https://images.unsplash.com/photo-1664461891582-bc909249a508', alt: 'A fountain among the trees in the gardens of Villa d\'Este' },
  },
  {
    partner: 'GetYourGuide',
    slug: 'tivoli-villages-countryside-tour',
    title: 'Tivoli & Countryside Villages Tour',
    meta: 'Medieval towns & local village experiences',
    priceFrom: 79,
    badge: '🏘️ Villages',
    href: '/go/tivoli-villages-countryside-tour',
    image: { src: 'https://images.unsplash.com/photo-1550683402-b269d8d0304f', alt: 'Tall trees in the gardens of Tivoli near Rome' },
  },
  {
    partner: 'Viator',
    slug: 'tivoli-sunset-dinner-experience',
    title: 'Tivoli Sunset & Traditional Italian Dinner',
    meta: 'Evening tour with authentic local cuisine',
    priceFrom: 125,
    badge: '🍽️ Dinner',
    href: '/go/tivoli-sunset-dinner-experience',
    image: { src: 'https://images.unsplash.com/photo-1664461892275-f29d4ba7897f', alt: 'A fountain in front of the villa at Villa d\'Este, Tivoli' },
  },
];

export const NAV_ITEMS: NavItem[] = [
  { title: 'From Rome', href: '/money/tivoli-from-rome', keyword: 'tivoli day trip from rome' },
  { title: 'Both Villas', href: '/villa-d-este-hadrian-s-villa', keyword: 'villa d\'este hadrian\'s villa tour' },
  { title: 'Private Tours', href: '/private-tivoli-tour', keyword: 'private tivoli tour' },
  { title: 'Half-Day', href: '/half-day-tivoli', keyword: 'half day tivoli tour' },
  { title: 'Getting There', href: '/support/getting-to-tivoli-train-vs-tour', keyword: 'how to get to tivoli' },
  { title: 'Which Villa', href: '/which-villa-to-prioritise', keyword: 'villa d\'este or hadrian\'s villa' },
  { title: 'Best Season', href: '/gardens-best-season', keyword: 'best time to visit tivoli' },
  { title: 'With Kids', href: '/tivoli-with-kids', keyword: 'tivoli day trip with children' },
];

export const SUPPORT_PAGES = [
  {
    title: 'Getting to Tivoli',
    href: '/support/getting-to-tivoli-train-vs-tour',
    keyword: 'how to get to tivoli from rome',
    image: { src: 'https://images.unsplash.com/photo-1550683402-b269d8d0304f', alt: 'Tall trees in the gardens of Tivoli near Rome' },
  },
  {
    title: 'Which Villa',
    href: '/which-villa-to-prioritise',
    keyword: 'villa d\'este or hadrian\'s villa',
    image: { src: 'https://images.unsplash.com/photo-1664461891582-bc909249a508', alt: 'A fountain among the trees in the gardens of Villa d\'Este' },
  },
  {
    title: 'Best Season',
    href: '/gardens-best-season',
    keyword: 'best time to visit villa d\'este',
    image: { src: 'https://images.unsplash.com/photo-1654533596848-5c1bd2393cae', alt: 'A fountain with a statue in the gardens of Villa d\'Este' },
  },
  {
    title: 'With Kids',
    href: '/tivoli-with-kids',
    keyword: 'tivoli day trip with children',
    image: { src: 'https://images.unsplash.com/photo-1664461890405-fe44f7c879f7', alt: 'Visitors walking around a water fountain at Villa d\'Este' },
  },
];

export const EXPLORE_LINKS = MONEY_PAGES.map((p) => ({ label: p.title, href: p.href }));
export const LEARN_LINKS = SUPPORT_PAGES.map((p) => ({ label: p.title, href: p.href }));

export const TOURS_NAV_ITEMS: NavItem[] = MONEY_PAGES.map((p) => ({ title: p.title, href: p.href, keyword: p.keyword }));

export const PLAN_NAV_ITEMS: NavItem[] = SUPPORT_PAGES.map((p) => ({ title: p.title, href: p.href, keyword: p.keyword }));

export const Tivoli_DAY_TRIP_GALLERY = [
  { src: 'https://images.unsplash.com/photo-1654612533611-d4f18261d444', alt: 'The villa building of Villa d\'Este in Tivoli with a fountain in front' },
  { src: 'https://images.unsplash.com/photo-1613002999620-f586001ee027', alt: 'An ancient statue beside the water at Hadrian\'s Villa near Tivoli' },
  { src: 'https://images.unsplash.com/photo-1664461890788-5c7d689cda56', alt: 'A row of water fountains in the gardens of Villa d\'Este, Tivoli' },
  { src: 'https://images.unsplash.com/photo-1664461892055-a073051e3c2c', alt: 'A courtyard with a fountain and statues at Villa d\'Este, Tivoli' },
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
  contactEmail: 'hello@tivoli-day-trip.com',
};
