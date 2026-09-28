/**
 * Dynamically load site-specific data (FEATURED_TOURS, etc.) by slug.
 * Each site module exports its own typed data: FeaturedTour[], TourDoc[], HERO_IMAGE, etc.
 * SiteDataModule is flexible to accommodate both Firestore-backed (TourDoc[]) and
 * static affiliate (FeaturedTour[]) sites.
 */

type TourLike = {
  slug: string;
  title: string;
  image?: { src: string; alt: string };
  [key: string]: unknown;
};

type SiteDataModule = {
  FEATURED_TOURS?: TourLike[];
  HERO_IMAGE?: { src: string; alt: string };
  AUTHOR?: { name?: string; bio?: string; [key: string]: unknown };
  QUICK_FACTS?: Array<{ title: string; description: string; [key: string]: unknown }>;
  FAQS?: Array<{ question: string; answer: string; [key: string]: unknown }>;
  SUPPORT_PAGES?: Array<{ title: string; href: string; [key: string]: unknown }>;
  PRIVACY_POLICY?: string;
  TERMS_OF_SERVICE?: string;
  COOKIE_POLICY?: string;
  AFFILIATE_DISCLOSURE?: string;
};

const siteModules: Record<string, () => Promise<unknown>> = {
  'underground-colosseum': () => import('@/lib/underground-colosseum'),
  'private-vatican': () => import('@/lib/private-vatican'),
  'pompeii-day-trip': () => import('@/lib/pompeii-day-trip'),
  'rome-vespa': () => import('@/lib/rome-vespa'),
  'golf-cart-rome': () => import('@/lib/golf-cart-rome'),
  'cooking-in-rome': () => import('@/lib/cooking-in-rome'),
  'rome-pizza-class': () => import('@/lib/rome-pizza-class'),
  'tiramisu-class': () => import('@/lib/tiramisu-class'),
  'tuscany-day-trip': () => import('@/lib/tuscany-day-trip'),
  'amalfi-day-trip': () => import('@/lib/amalfi-day-trip'),
  'tivoli-day-trip': () => import('@/lib/tivoli-day-trip'),
  'naples-street-food': () => import('@/lib/naples-street-food'),
};

export async function getSiteData(slug: string): Promise<SiteDataModule> {
  const loader = siteModules[slug];
  if (!loader) {
    return {};
  }
  const moduleExports = await loader();
  return (moduleExports as unknown as SiteDataModule) || {};
}
