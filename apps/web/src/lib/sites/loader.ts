/**
 * Dynamically load site-specific data (FEATURED_TOURS, etc.) by slug.
 * All 12 sites export the same interface; this avoids hardcoding imports.
 */

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type SiteDataModule = {
  FEATURED_TOURS?: any[];
  HERO_IMAGE?: { src: string; alt: string };
  AUTHOR?: Record<string, unknown>;
  QUICK_FACTS?: any[];
  FAQS?: any[];
  SUPPORT_PAGES?: any[];
  PRIVACY_POLICY?: string;
  TERMS_OF_SERVICE?: string;
  COOKIE_POLICY?: string;
  AFFILIATE_DISCLOSURE?: string;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const siteModules: Record<string, () => Promise<SiteDataModule>> = {
  'underground-colosseum': () => import('@/lib/underground-colosseum').then((m) => m as SiteDataModule),
  'private-vatican': () => import('@/lib/private-vatican').then((m) => m as SiteDataModule),
  'pompeii-day-trip': () => import('@/lib/pompeii-day-trip').then((m) => m as SiteDataModule),
  'rome-vespa': () => import('@/lib/rome-vespa').then((m) => m as SiteDataModule),
  'golf-cart-rome': () => import('@/lib/golf-cart-rome').then((m) => m as SiteDataModule),
  'cooking-in-rome': () => import('@/lib/cooking-in-rome').then((m) => m as SiteDataModule),
  'rome-pizza-class': () => import('@/lib/rome-pizza-class').then((m) => m as SiteDataModule),
  'tiramisu-class': () => import('@/lib/tiramisu-class').then((m) => m as SiteDataModule),
  'tuscany-day-trip': () => import('@/lib/tuscany-day-trip').then((m) => m as SiteDataModule),
  'amalfi-day-trip': () => import('@/lib/amalfi-day-trip').then((m) => m as SiteDataModule),
  'tivoli-day-trip': () => import('@/lib/tivoli-day-trip').then((m) => m as SiteDataModule),
  'naples-street-food': () => import('@/lib/naples-street-food').then((m) => m as SiteDataModule),
};

export async function getSiteData(slug: string): Promise<SiteDataModule> {
  const loader = siteModules[slug];
  if (!loader) {
    return {};
  }
  return loader();
}
