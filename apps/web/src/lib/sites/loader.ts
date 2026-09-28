import type { FeaturedTour } from '@/lib/underground-colosseum';

/**
 * Dynamically load site-specific data (FEATURED_TOURS, etc.) by slug.
 * All 13 sites export the same interface; this avoids hardcoding imports.
 */

type SiteDataModule = {
  FEATURED_TOURS?: Array<any>;
  HERO_IMAGE?: { src: string; alt: string };
  AUTHOR?: any;
  QUICK_FACTS?: Array<any>;
  FAQS?: Array<any>;
  SUPPORT_PAGES?: Array<any>;
  PRIVACY_POLICY?: string;
  TERMS_OF_SERVICE?: string;
  COOKIE_POLICY?: string;
  AFFILIATE_DISCLOSURE?: string;
};

const siteModules: Record<string, () => Promise<SiteDataModule>> = {
  'underground-colosseum': () => import('@/lib/underground-colosseum').then((m) => m as any),
  'private-vatican': () => import('@/lib/private-vatican').then((m) => m as any),
  'pompeii-day-trip': () => import('@/lib/pompeii-day-trip').then((m) => m as any),
  'rome-vespa': () => import('@/lib/rome-vespa').then((m) => m as any),
  'golf-cart-rome': () => import('@/lib/golf-cart-rome').then((m) => m as any),
  'cooking-in-rome': () => import('@/lib/cooking-in-rome').then((m) => m as any),
  'rome-pizza-class': () => import('@/lib/rome-pizza-class').then((m) => m as any),
  'tiramisu-class': () => import('@/lib/tiramisu-class').then((m) => m as any),
  'tuscany-day-trip': () => import('@/lib/tuscany-day-trip').then((m) => m as any),
  'amalfi-day-trip': () => import('@/lib/amalfi-day-trip').then((m) => m as any),
  'tivoli-day-trip': () => import('@/lib/tivoli-day-trip').then((m) => m as any),
  'naples-street-food': () => import('@/lib/naples-street-food').then((m) => m as any),
};

export async function getSiteData(slug: string): Promise<SiteDataModule> {
  const loader = siteModules[slug];
  if (!loader) {
    return {};
  }
  return loader();
}
