/**
 * Shared data for the Tivoli Day Trip hero property — content arrays, nav
 * item lists, and the hero image constant. Mirrors the Amalfi Day Trip pattern.
 */

export { AUTHOR, FAQS, QUICK_FACTS, QUICK_LINKS } from './tivoli-day-trip-content';

export const HERO_IMAGE = {
  src: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4',
  alt: 'Panoramic view of Tivoli landscape with Villa d\'Este and Hadrian\'s Villa nestled in the rolling Lazio countryside, ancient history meets Renaissance beauty',
};

export interface NavItem {
  title: string;
  href: string;
  keyword: string;
}

export const MONEY_PAGES = [
  {
    title: 'Full-Day Both Villas',
    href: '/money/full-day-tivoli',
    blurb: 'Experience the complete Tivoli masterpiece: Renaissance fountains at Villa d\'Este and ancient imperial ruins at Hadrian\'s Villa. The ultimate cultural immersion without feeling rushed.',
    keyword: 'full day tivoli tour both villas',
    cta: 'Explore Full-Day Tours',
    badge: 'Most Popular' as string | null,
    image: { src: 'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=600&h=450&fit=crop', alt: 'Spectacular water features and terraced gardens at Villa d\'Este' },
  },
  {
    title: 'Half-Day Villa d\'Este',
    href: '/money/half-day-villa-este',
    blurb: 'Perfect for limited time. Discover the breathtaking fountains and Renaissance gardens of Villa d\'Este. Fast, focused, and thoroughly rewarding for art and history lovers.',
    keyword: 'half day villa d este tour',
    cta: 'View Half-Day Options',
    badge: 'Quick Escape' as string | null,
    image: { src: 'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=600&h=450&fit=crop', alt: 'Golden hour light dancing across Villa d\'Este fountains' },
  },
  {
    title: 'Private Expert Guide',
    href: '/money/private-tivoli-guide',
    blurb: 'Personalized experience with an English-speaking guide who knows every corner of both sites. Skip the crowds, set your own pace, and get insider stories you won\'t find anywhere else.',
    keyword: 'private tivoli tour with guide',
    cta: 'Book Private Tour',
    badge: 'Premium' as string | null,
    image: { src: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600&h=450&fit=crop', alt: 'Ancient Roman architecture and columns at Hadrian\'s Villa' },
  },
  {
    title: 'Self-Guided Essentials',
    href: '/money/self-guided-tivoli',
    blurb: 'Independent travelers: get the complete route, timing tips, transport hacks, and must-see highlights. Save money while still seeing everything that matters.',
    keyword: 'self guided tivoli day trip',
    cta: 'Plan Your Route',
    badge: 'Budget-Friendly' as string | null,
    image: { src: 'https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=600&h=450&fit=crop', alt: 'Serene garden pathways and Mediterranean landscape at Tivoli' },
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
    image: { src: 'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=800&h=500&fit=crop', alt: 'Stunning water features cascading through terraced gardens at Villa d\'Este' },
  },
  {
    partner: 'Viator',
    slug: 'half-day-villa-este-fountains',
    title: 'Half-Day Villa d\'Este Focus',
    meta: 'Quick & beautiful fountains tour',
    priceFrom: 45,
    badge: '🚀 Quick Tour',
    href: '/go/half-day-villa-este-fountains',
    image: { src: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=500&fit=crop', alt: 'Renaissance fountain architecture and water features at Villa d\'Este' },
  },
  {
    partner: 'Civitatis',
    slug: 'private-tivoli-expert-guide',
    title: 'Private Tour with Expert Guide',
    meta: 'Personalized & all-inclusive experience',
    priceFrom: 195,
    badge: '👑 Premium',
    href: '/go/private-tivoli-expert-guide',
    image: { src: 'https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=800&h=500&fit=crop', alt: 'Serene garden pathways through ancient Tivoli ruins' },
  },
  {
    partner: 'GetYourGuide',
    slug: 'hadrians-villa-archaeology-focus',
    title: 'Hadrian\'s Villa Archaeology Deep Dive',
    meta: 'In-depth ancient Roman history & ruins',
    priceFrom: 55,
    badge: '🏛️ History',
    href: '/go/hadrians-villa-archaeology-focus',
    image: { src: 'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=800&h=500&fit=crop', alt: 'Ancient Roman columns and archaeological ruins at Hadrian\'s Villa' },
  },
  {
    partner: 'Viator',
    slug: 'tivoli-gardens-photography-tour',
    title: 'Tivoli Gardens Photography Tour',
    meta: 'Capture stunning light & landscape moments',
    priceFrom: 89,
    badge: '📸 Photo Tour',
    href: '/go/tivoli-gardens-photography-tour',
    image: { src: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=500&fit=crop', alt: 'Golden hour sunset illuminating Villa d\'Este fountains and gardens' },
  },
  {
    partner: 'Civitatis',
    slug: 'villa-este-skip-line-early-access',
    title: 'Villa d\'Este Skip-the-Line Early Access',
    meta: 'Beat the crowds with early morning entry',
    priceFrom: 65,
    badge: '⏰ Skip-Line',
    href: '/go/villa-este-skip-line-early-access',
    image: { src: 'https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=800&h=500&fit=crop', alt: 'Early morning mist rising from Villa d\'Este terraced gardens' },
  },
  {
    partner: 'GetYourGuide',
    slug: 'tivoli-villages-countryside-tour',
    title: 'Tivoli & Countryside Villages Tour',
    meta: 'Medieval towns & local village experiences',
    priceFrom: 79,
    badge: '🏘️ Villages',
    href: '/go/tivoli-villages-countryside-tour',
    image: { src: 'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=800&h=500&fit=crop', alt: 'Charming hilltop village overlooking Tivoli countryside landscape' },
  },
  {
    partner: 'Viator',
    slug: 'tivoli-sunset-dinner-experience',
    title: 'Tivoli Sunset & Traditional Italian Dinner',
    meta: 'Evening tour with authentic local cuisine',
    priceFrom: 125,
    badge: '🍽️ Dinner',
    href: '/go/tivoli-sunset-dinner-experience',
    image: { src: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=500&fit=crop', alt: 'Sunset dinner table overlooking Tivoli villas and Italian landscape' },
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
    image: { src: 'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=400&h=300&fit=crop', alt: 'Italian regional train window view of countryside heading toward Tivoli' },
  },
  {
    title: 'Which Villa',
    href: '/which-villa-to-prioritise',
    keyword: 'villa d\'este or hadrian\'s villa',
    image: { src: 'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=400&h=300&fit=crop', alt: 'Aerial view of Villa d\'Este\'s terraced gardens with fountains and symmetrical landscaping' },
  },
  {
    title: 'Best Season',
    href: '/gardens-best-season',
    keyword: 'best time to visit villa d\'este',
    image: { src: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=300&fit=crop', alt: 'Late spring gardens of Villa d\'Este in full bloom with fresh green foliage' },
  },
  {
    title: 'With Kids',
    href: '/money/tivoli-with-kids',
    keyword: 'tivoli day trip with children',
    image: { src: 'https://images.unsplash.com/photo-1518156677180-95a2893f3e9f', alt: 'Family-friendly fountain pathway at Villa d\'Este, safe and accessible for all ages' },
  },
];

export const EXPLORE_LINKS = MONEY_PAGES.map((p) => ({ label: p.title, href: p.href }));
export const LEARN_LINKS = SUPPORT_PAGES.map((p) => ({ label: p.title, href: p.href }));

export const TOURS_NAV_ITEMS: NavItem[] = MONEY_PAGES.map((p) => ({ title: p.title, href: p.href, keyword: p.keyword }));

export const PLAN_NAV_ITEMS: NavItem[] = SUPPORT_PAGES.map((p) => ({ title: p.title, href: p.href, keyword: p.keyword }));

export const Tivoli_DAY_TRIP_GALLERY = [
  { src: 'https://images.unsplash.com/photo-1532619675605-1ede6c2e7b94', alt: 'Cascading water fountains in the elaborate garden of Villa d\'Este' },
  { src: 'https://images.unsplash.com/photo-1470114716159-e389f8712fda', alt: 'Ancient Roman columns and ruins at Hadrian\'s Villa, surrounded by cypress trees' },
  { src: 'https://images.unsplash.com/photo-1495483277328-e3f5e6c20619', alt: 'Sunset light over Villa d\'Este fountains with golden-hour glow on the water features' },
  { src: 'https://images.unsplash.com/photo-1518156677180-95a2893f3e9f', alt: 'Aerial view of Villa d\'Este\'s terraced gardens with fountains and symmetrical landscaping' },
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
