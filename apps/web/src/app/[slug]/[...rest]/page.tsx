import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { UnderConstructionNotice } from '@/components/UnderConstructionNotice';
import { MoneyPageTemplate } from '@/components/underground-colosseum/MoneyPageTemplate';
import { SupportPageTemplate } from '@/components/underground-colosseum/SupportPageTemplate';
import { UCAboutPage } from '@/components/underground-colosseum/UCAboutPage';
import { UCContactPage } from '@/components/underground-colosseum/UCContactPage';
import { UCFAQPage } from '@/components/underground-colosseum/UCFAQPage';
import { UCPrivacyPolicyPage } from '@/components/underground-colosseum/UCPrivacyPolicyPage';
import { UCTermsOfServicePage } from '@/components/underground-colosseum/UCTermsOfServicePage';
import { UCCookiePolicyPage } from '@/components/underground-colosseum/UCCookiePolicyPage';
import { UCAffiliateDisclosurePage } from '@/components/underground-colosseum/UCAffiliateDisclosurePage';
import { UCToursPage } from '@/components/underground-colosseum/UCToursPage';
import { UCBlogPage } from '@/components/underground-colosseum/UCBlogPage';
import { UCNeighborhoodsPage } from '@/components/underground-colosseum/UCNeighborhoodsPage';
import { MoneyPageTemplate as PVMoneyPageTemplate } from '@/components/private-vatican/MoneyPageTemplate';
import { SupportPageTemplate as PVSupportPageTemplate } from '@/components/private-vatican/SupportPageTemplate';
import { PVAboutPage } from '@/components/private-vatican/PVAboutPage';
import { PVContactPage } from '@/components/private-vatican/PVContactPage';
import { PVFAQPage } from '@/components/private-vatican/PVFAQPage';
import { PVPrivacyPolicyPage } from '@/components/private-vatican/PVPrivacyPolicyPage';
import { PVTermsOfServicePage } from '@/components/private-vatican/PVTermsOfServicePage';
import { PVCookiePolicyPage } from '@/components/private-vatican/PVCookiePolicyPage';
import { PVAffiliateDisclosurePage } from '@/components/private-vatican/PVAffiliateDisclosurePage';
import { PVToursPage } from '@/components/private-vatican/PVToursPage';
import { PVBlogPage } from '@/components/private-vatican/PVBlogPage';
import { MoneyPageTemplate as PDTMoneyPageTemplate } from '@/components/pompeii-day-trip/MoneyPageTemplate';
import { SupportPageTemplate as PDTSupportPageTemplate } from '@/components/pompeii-day-trip/SupportPageTemplate';
import { PDTAboutPage } from '@/components/pompeii-day-trip/PDTAboutPage';
import { PDTContactPage } from '@/components/pompeii-day-trip/PDTContactPage';
import { PDTFAQPage } from '@/components/pompeii-day-trip/PDTFAQPage';
import { PDTPrivacyPolicyPage } from '@/components/pompeii-day-trip/PDTPrivacyPolicyPage';
import { PDTTermsOfServicePage } from '@/components/pompeii-day-trip/PDTTermsOfServicePage';
import { PDTCookiePolicyPage } from '@/components/pompeii-day-trip/PDTCookiePolicyPage';
import { PDTAffiliateDisclosurePage } from '@/components/pompeii-day-trip/PDTAffiliateDisclosurePage';
import { PDTToursPage } from '@/components/pompeii-day-trip/PDTToursPage';
import { PDTToursCategoryPage } from '@/components/pompeii-day-trip/PDTToursCategoryPage';
import { PDTBlogPage } from '@/components/pompeii-day-trip/PDTBlogPage';
import { PDTBlogPageFull } from '@/components/pompeii-day-trip/PDTBlogPageFull';
import { PDTBlogCategoryPage } from '@/components/pompeii-day-trip/PDTBlogCategoryPage';
import { PDTBlogPostPage } from '@/components/pompeii-day-trip/PDTBlogPostPage';
import { PDTNeighborhoodsPage } from '@/components/pompeii-day-trip/PDTNeighborhoodsPage';
import { PDTNeighborhoodDetailPage } from '@/components/pompeii-day-trip/PDTNeighborhoodDetailPage';
import { MoneyPageTemplate as RVMoneyPageTemplate } from '@/components/rome-vespa/MoneyPageTemplate';
import { SupportPageTemplate as RVSupportPageTemplate } from '@/components/rome-vespa/SupportPageTemplate';
import { RVAboutPage } from '@/components/rome-vespa/RVAboutPage';
import { RVContactPage } from '@/components/rome-vespa/RVContactPage';
import { RVFAQPage } from '@/components/rome-vespa/RVFAQPage';
import { RVPrivacyPolicyPage } from '@/components/rome-vespa/RVPrivacyPolicyPage';
import { RVTermsOfServicePage } from '@/components/rome-vespa/RVTermsOfServicePage';
import { RVCookiePolicyPage } from '@/components/rome-vespa/RVCookiePolicyPage';
import { RVAffiliateDisclosurePage } from '@/components/rome-vespa/RVAffiliateDisclosurePage';
import { RVToursPage } from '@/components/rome-vespa/RVToursPage';
import { RVBlogPage } from '@/components/rome-vespa/RVBlogPage';
import { RVNeighborhoodsPage } from '@/components/rome-vespa/RVNeighborhoodsPage';
import { MoneyPageTemplate as GCRMoneyPageTemplate } from '@/components/golf-cart-rome/MoneyPageTemplate';
import { SupportPageTemplate as GCRSupportPageTemplate } from '@/components/golf-cart-rome/SupportPageTemplate';
import { GCRAboutPage } from '@/components/golf-cart-rome/GCRAboutPage';
import { GCRContactPage } from '@/components/golf-cart-rome/GCRContactPage';
import { GCRFAQPage } from '@/components/golf-cart-rome/GCRFAQPage';
import { GCRPrivacyPolicyPage } from '@/components/golf-cart-rome/GCRPrivacyPolicyPage';
import { GCRTermsOfServicePage } from '@/components/golf-cart-rome/GCRTermsOfServicePage';
import { GCRCookiePolicyPage } from '@/components/golf-cart-rome/GCRCookiePolicyPage';
import { GCRAffiliateDisclosurePage } from '@/components/golf-cart-rome/GCRAffiliateDisclosurePage';
import { GCRToursPage } from '@/components/golf-cart-rome/GCRToursPage';
import { GCRBlogPage } from '@/components/golf-cart-rome/GCRBlogPage';
import { MoneyPageTemplate as CIRMoneyPageTemplate } from '@/components/cooking-in-rome/MoneyPageTemplate';
import { SupportPageTemplate as CIRSupportPageTemplate } from '@/components/cooking-in-rome/SupportPageTemplate';
import { CIRAboutPage } from '@/components/cooking-in-rome/CIRAboutPage';
import { CIRContactPage } from '@/components/cooking-in-rome/CIRContactPage';
import { CIRFAQPage } from '@/components/cooking-in-rome/CIRFAQPage';
import { CIRPrivacyPolicyPage } from '@/components/cooking-in-rome/CIRPrivacyPolicyPage';
import { CIRTermsOfServicePage } from '@/components/cooking-in-rome/CIRTermsOfServicePage';
import { CIRCookiePolicyPage } from '@/components/cooking-in-rome/CIRCookiePolicyPage';
import { CIRAffiliateDisclosurePage } from '@/components/cooking-in-rome/CIRAffiliateDisclosurePage';
import { CIRToursPage } from '@/components/cooking-in-rome/CIRToursPage';
import { CIRBlogPage } from '@/components/cooking-in-rome/CIRBlogPage';
import { MoneyPageTemplate as RPCMoneyPageTemplate } from '@/components/rome-pizza-class/MoneyPageTemplate';
import { SupportPageTemplate as RPCSupportPageTemplate } from '@/components/rome-pizza-class/SupportPageTemplate';
import { RPCAboutPage } from '@/components/rome-pizza-class/RPCAboutPage';
import { RPCContactPage } from '@/components/rome-pizza-class/RPCContactPage';
import { RPCFAQPage } from '@/components/rome-pizza-class/RPCFAQPage';
import { RPCPrivacyPolicyPage } from '@/components/rome-pizza-class/RPCPrivacyPolicyPage';
import { RPCTermsOfServicePage } from '@/components/rome-pizza-class/RPCTermsOfServicePage';
import { RPCCookiePolicyPage } from '@/components/rome-pizza-class/RPCCookiePolicyPage';
import { RPCAffiliateDisclosurePage } from '@/components/rome-pizza-class/RPCAffiliateDisclosurePage';
import { RPCToursPage } from '@/components/rome-pizza-class/RPCToursPage';
import { RPCBlogPage } from '@/components/rome-pizza-class/RPCBlogPage';
import { MoneyPageTemplate as TCMoneyPageTemplate } from '@/components/tiramisu-class/MoneyPageTemplate';
import { SupportPageTemplate as TCSupportPageTemplate } from '@/components/tiramisu-class/SupportPageTemplate';
import { TCAboutPage } from '@/components/tiramisu-class/TCAboutPage';
import { TCContactPage } from '@/components/tiramisu-class/TCContactPage';
import { MoneyPageTemplate as TDTMoneyPageTemplate } from '@/components/tuscany-day-trip/MoneyPageTemplate';
import { SupportPageTemplate as TDTSupportPageTemplate } from '@/components/tuscany-day-trip/SupportPageTemplate';
import { TDTAboutPage } from '@/components/tuscany-day-trip/TDTAboutPage';
import { TDTContactPage } from '@/components/tuscany-day-trip/TDTContactPage';
import { TDTFAQPage } from '@/components/tuscany-day-trip/TDTFAQPage';
import { TDTPrivacyPolicyPage } from '@/components/tuscany-day-trip/TDTPrivacyPolicyPage';
import { TDTTermsOfServicePage } from '@/components/tuscany-day-trip/TDTTermsOfServicePage';
import { TDTCookiePolicyPage } from '@/components/tuscany-day-trip/TDTCookiePolicyPage';
import { TDTAffiliateDisclosurePage } from '@/components/tuscany-day-trip/TDTAffiliateDisclosurePage';
import { TDTToursPage } from '@/components/tuscany-day-trip/TDTToursPage';
import { TDTBlogPage } from '@/components/tuscany-day-trip/TDTBlogPage';
import { MoneyPageTemplate as ADTMoneyPageTemplate } from '@/components/amalfi-day-trip/MoneyPageTemplate';
import { SupportPageTemplate as ADTSupportPageTemplate } from '@/components/amalfi-day-trip/SupportPageTemplate';
import { ADTAboutPage } from '@/components/amalfi-day-trip/ADTAboutPage';
import { ADTContactPage } from '@/components/amalfi-day-trip/ADTContactPage';
import { MoneyPageTemplate as TVDTMoneyPageTemplate } from '@/components/tivoli-day-trip/MoneyPageTemplate';
import { SupportPageTemplate as TVDTSupportPageTemplate } from '@/components/tivoli-day-trip/SupportPageTemplate';
import { TVDTAboutPage } from '@/components/tivoli-day-trip/TVDTAboutPage';
import { TVDTContactPage } from '@/components/tivoli-day-trip/TVDTContactPage';
import { MoneyPageTemplate as NSFMoneyPageTemplate } from '@/components/naples-street-food/MoneyPageTemplate';
import { SupportPageTemplate as NSFSupportPageTemplate } from '@/components/naples-street-food/SupportPageTemplate';
import { NSFAboutPage } from '@/components/naples-street-food/NSFAboutPage';
import { NSFContactPage } from '@/components/naples-street-food/NSFContactPage';
import { getNetworkSite } from '@/lib/tours';
import { getAllBlogPosts, getAllTours } from '@/lib/firestore';
import { BLOG_CATEGORIES } from '@/lib/blog';
import { getMoneyPageContent, getSupportPageContent } from '@/lib/underground-colosseum-content';
import { ARENA_FLOOR_PAGE, MONEY_PAGES, SUPPORT_PAGES, WORTH_IT_PAGE } from '@/lib/underground-colosseum';
import {
  getMoneyPageContent as getPVMoneyPageContent,
  getSupportPageContent as getPVSupportPageContent,
} from '@/lib/private-vatican-content';
import { MONEY_PAGES as PV_MONEY_PAGES, SUPPORT_PAGES as PV_SUPPORT_PAGES } from '@/lib/private-vatican';
import {
  getMoneyPageContent as getPDTMoneyPageContent,
  getSupportPageContent as getPDTSupportPageContent,
} from '@/lib/pompeii-day-trip-content';
import { MONEY_PAGES as PDT_MONEY_PAGES, SUPPORT_PAGES as PDT_SUPPORT_PAGES } from '@/lib/pompeii-day-trip';
import {
  getMoneyPageContent as getRVMoneyPageContent,
  getSupportPageContent as getRVSupportPageContent,
} from '@/lib/rome-vespa-content';
import { MONEY_PAGES as RV_MONEY_PAGES, SUPPORT_PAGES as RV_SUPPORT_PAGES } from '@/lib/rome-vespa';
import {
  getMoneyPageContent as getGCRMoneyPageContent,
  getSupportPageContent as getGCRSupportPageContent,
} from '@/lib/golf-cart-rome-content';
import { MONEY_PAGES as GCR_MONEY_PAGES, SUPPORT_PAGES as GCR_SUPPORT_PAGES } from '@/lib/golf-cart-rome';
import {
  getMoneyPageContent as getCIRMoneyPageContent,
  getSupportPageContent as getCIRSupportPageContent,
} from '@/lib/cooking-in-rome-content';
import { MONEY_PAGES as CIR_MONEY_PAGES, SUPPORT_PAGES as CIR_SUPPORT_PAGES } from '@/lib/cooking-in-rome';
import {
  getMoneyPageContent as getRPCMoneyPageContent,
  getSupportPageContent as getRPCSupportPageContent,
} from '@/lib/rome-pizza-class-content';
import { MONEY_PAGES as RPC_MONEY_PAGES, SUPPORT_PAGES as RPC_SUPPORT_PAGES } from '@/lib/rome-pizza-class';
import {
  getMoneyPageContent as getTCMoneyPageContent,
  getSupportPageContent as getTCSupportPageContent,
} from '@/lib/tiramisu-class-content';
import { MONEY_PAGES as TC_MONEY_PAGES, SUPPORT_PAGES as TC_SUPPORT_PAGES } from '@/lib/tiramisu-class';
import {
  getMoneyPageContent as getTDTMoneyPageContent,
  getSupportPageContent as getTDTSupportPageContent,
} from '@/lib/tuscany-day-trip-content';
import { MONEY_PAGES as TDT_MONEY_PAGES, SUPPORT_PAGES as TDT_SUPPORT_PAGES } from '@/lib/tuscany-day-trip';
import {
  getMoneyPageContent as getADTMoneyPageContent,
  getSupportPageContent as getADTSupportPageContent,
} from '@/lib/amalfi-day-trip-content';
import { MONEY_PAGES as ADT_MONEY_PAGES, SUPPORT_PAGES as ADT_SUPPORT_PAGES } from '@/lib/amalfi-day-trip';
import {
  getMoneyPageContent as getTVDTMoneyPageContent,
  getSupportPageContent as getTVDTSupportPageContent,
} from '@/lib/tivoli-day-trip-content';
import { MONEY_PAGES as TVDT_MONEY_PAGES, SUPPORT_PAGES as TVDT_SUPPORT_PAGES } from '@/lib/tivoli-day-trip';
import {
  getMoneyPageContent as getNSFMoneyPageContent,
  getSupportPageContent as getNSFSupportPageContent,
} from '@/lib/naples-street-food-content';
import { MONEY_PAGES as NSF_MONEY_PAGES, SUPPORT_PAGES as NSF_SUPPORT_PAGES } from '@/lib/naples-street-food';
import { SITE_DOMAIN } from '@/lib/firestore';

/**
 * Catches every sub-path under a network property that isn't the platform's
 * ACTIVE_NETWORK_SLUG test site. Underground Colosseum, Private Vatican,
 * Pompeii Day Trip, Rome Vespa, Golf Cart Rome, Cooking in Rome, Rome Pizza
 * Class, Tiramisù Class, and Tuscany Day Trip are all special-cased here too
 * (alongside their root page.tsx, which exports BESPOKE_HERO_SLUGS): each
 * property's money pages, support pages, /about, and /contact are real,
 * indexable content — built from the site's own blueprint — so those
 * specific paths render their real templates. Anything else under any of the
 * five (e.g.
 * /go/:slug, the affiliate redirect handler, which is a separate
 * infrastructure feature, not a content page) still falls through to the
 * "under construction" placeholder below, same as every other not-yet-built
 * network property's sub-paths.
 */

// Pre-renders each bespoke property's real sub-paths at build time, matching
// the pattern the root [slug] page and /tours/[slug] already use
// (generateStaticParams off a static registry). Everything else this
// catch-all handles (other network sites' placeholder sub-paths, /go/:slug,
// etc.) is intentionally left out — dynamicParams defaults to true, so those
// still render on-demand exactly as before; this only removes the
// per-request render cost for pages that are actually real, indexable
// content (doc 00's "SSG/ISR" baseline).
export async function generateStaticParams() {
  const ucHrefs = [
    ...MONEY_PAGES.map((p) => p.href),
    ...SUPPORT_PAGES.map((p) => p.href),
    ARENA_FLOOR_PAGE.href,
    WORTH_IT_PAGE.href,
    '/about',
    '/contact',
    '/faq',
    '/privacy',
    '/terms',
    '/cookie-policy',
    '/affiliate-disclosure',
    '/tours',
    '/blog',
    '/neighborhoods',
  ];
  const pvHrefs = [
    ...PV_MONEY_PAGES.map((p) => p.href),
    ...PV_SUPPORT_PAGES.map((p) => p.href),
    '/about',
    '/contact',
    '/faq',
    '/privacy',
    '/terms',
    '/cookie-policy',
    '/affiliate-disclosure',
    '/tours',
    '/blog',
  ];
  const pdtTourCategories = ['rome', 'naples', 'vesuvius', 'herculaneum'];
  const pdtBlogCategories = BLOG_CATEGORIES.map((c) => `/blog/category/${c.slug}`);
  const pdtHrefs = [
    ...PDT_MONEY_PAGES.map((p) => p.href),
    ...PDT_SUPPORT_PAGES.map((p) => p.href),
    '/about',
    '/contact',
    '/faq',
    '/privacy',
    '/terms',
    '/cookie-policy',
    '/affiliate-disclosure',
    '/tours',
    ...pdtTourCategories.map((cat) => `/tours/category/${cat}`),
    '/blog',
    ...pdtBlogCategories,
    '/neighborhoods',
  ];
  const rvHrefs = [...RV_MONEY_PAGES.map((p) => p.href), ...RV_SUPPORT_PAGES.map((p) => p.href), '/about', '/contact', '/faq', '/privacy', '/terms', '/cookie-policy', '/affiliate-disclosure', '/tours', '/blog', '/neighborhoods'];
  const gcrHrefs = [...GCR_MONEY_PAGES.map((p) => p.href), ...GCR_SUPPORT_PAGES.map((p) => p.href), '/about', '/contact', '/faq', '/privacy', '/terms', '/cookie-policy', '/affiliate-disclosure', '/tours', '/blog'];
  const cirHrefs = [...CIR_MONEY_PAGES.map((p) => p.href), ...CIR_SUPPORT_PAGES.map((p) => p.href), '/about', '/contact', '/faq', '/privacy', '/terms', '/cookie-policy', '/affiliate-disclosure', '/tours', '/blog'];
  const rpcHrefs = [...RPC_MONEY_PAGES.map((p) => p.href), ...RPC_SUPPORT_PAGES.map((p) => p.href), '/about', '/contact', '/faq', '/privacy', '/terms', '/cookie-policy', '/affiliate-disclosure', '/tours', '/blog'];
  const tcHrefs = [...TC_MONEY_PAGES.map((p) => p.href), ...TC_SUPPORT_PAGES.map((p) => p.href), '/about', '/contact'];
  const tdtHrefs = [...TDT_MONEY_PAGES.map((p) => p.href), ...TDT_SUPPORT_PAGES.map((p) => p.href), '/about', '/contact', '/faq', '/privacy', '/terms', '/cookie-policy', '/affiliate-disclosure', '/tours', '/blog'];
  const adtHrefs = [...ADT_MONEY_PAGES.map((p) => p.href), ...ADT_SUPPORT_PAGES.map((p) => p.href), '/about', '/contact'];
  const tvdtHrefs = [...TVDT_MONEY_PAGES.map((p) => p.href), ...TVDT_SUPPORT_PAGES.map((p) => p.href), '/about', '/contact'];
  const nsfHrefs = [...NSF_MONEY_PAGES.map((p) => p.href), ...NSF_SUPPORT_PAGES.map((p) => p.href), '/about', '/contact'];

  return [
    ...ucHrefs.map((href) => ({ slug: 'underground-colosseum', rest: [href.replace(/^\//, '')] })),
    ...pvHrefs.map((href) => ({ slug: 'private-vatican', rest: [href.replace(/^\//, '')] })),
    ...pdtHrefs.map((href) => ({ slug: 'pompeii-day-trip', rest: [href.replace(/^\//, '')] })),
    ...rvHrefs.map((href) => ({ slug: 'rome-vespa', rest: [href.replace(/^\//, '')] })),
    ...gcrHrefs.map((href) => ({ slug: 'golf-cart-rome', rest: [href.replace(/^\//, '')] })),
    ...cirHrefs.map((href) => ({ slug: 'cooking-in-rome', rest: [href.replace(/^\//, '')] })),
    ...rpcHrefs.map((href) => ({ slug: 'rome-pizza-class', rest: [href.replace(/^\//, '')] })),
    ...tcHrefs.map((href) => ({ slug: 'tiramisu-class', rest: [href.replace(/^\//, '')] })),
    ...tdtHrefs.map((href) => ({ slug: 'tuscany-day-trip', rest: [href.replace(/^\//, '')] })),
    ...adtHrefs.map((href) => ({ slug: 'amalfi-day-trip', rest: [href.replace(/^\//, '')] })),
    ...tvdtHrefs.map((href) => ({ slug: 'tivoli-day-trip', rest: [href.replace(/^\//, '')] })),
    ...nsfHrefs.map((href) => ({ slug: 'naples-street-food', rest: [href.replace(/^\//, '')] })),
  ];
}

function resolveUndergroundColosseumPage(path: string) {
  const money = getMoneyPageContent(path);
  if (money) return { type: 'money' as const, content: money };

  const support = getSupportPageContent(path);
  if (support) return { type: 'support' as const, content: support };

  if (path === '/about') return { type: 'about' as const };
  if (path === '/contact') return { type: 'contact' as const };
  if (path === '/faq') return { type: 'faq' as const };
  if (path === '/privacy') return { type: 'privacy' as const };
  if (path === '/terms') return { type: 'terms' as const };
  if (path === '/cookie-policy') return { type: 'cookie-policy' as const };
  if (path === '/affiliate-disclosure') return { type: 'affiliate-disclosure' as const };
  if (path === '/tours') return { type: 'tours' as const };
  if (path === '/blog') return { type: 'blog' as const };
  if (path === '/neighborhoods') return { type: 'neighborhoods' as const };

  return null;
}

function resolvePrivateVaticanPage(path: string) {
  const money = getPVMoneyPageContent(path);
  if (money) return { type: 'money' as const, content: money };

  const support = getPVSupportPageContent(path);
  if (support) return { type: 'support' as const, content: support };

  if (path === '/about') return { type: 'about' as const };
  if (path === '/contact') return { type: 'contact' as const };
  if (path === '/faq') return { type: 'faq' as const };
  if (path === '/privacy') return { type: 'privacy' as const };
  if (path === '/terms') return { type: 'terms' as const };
  if (path === '/cookie-policy') return { type: 'cookie-policy' as const };
  if (path === '/affiliate-disclosure') return { type: 'affiliate-disclosure' as const };
  if (path === '/tours') return { type: 'tours' as const };
  if (path === '/blog') return { type: 'blog' as const };

  return null;
}

function resolvePompeiiDayTripPage(path: string) {
  const money = getPDTMoneyPageContent(path);
  if (money) return { type: 'money' as const, content: money };

  const support = getPDTSupportPageContent(path);
  if (support) return { type: 'support' as const, content: support };

  if (path === '/about') return { type: 'about' as const };
  if (path === '/contact') return { type: 'contact' as const };
  if (path === '/faq') return { type: 'faq' as const };
  if (path === '/privacy') return { type: 'privacy' as const };
  if (path === '/terms') return { type: 'terms' as const };
  if (path === '/cookie-policy') return { type: 'cookie-policy' as const };
  if (path === '/affiliate-disclosure') return { type: 'affiliate-disclosure' as const };
  if (path === '/tours') return { type: 'tours' as const };
  if (path === '/blog') return { type: 'blog' as const };
  if (path === '/neighborhoods') return { type: 'neighborhoods' as const };

  return null;
}

function resolveRomeVespaPage(path: string) {
  const money = getRVMoneyPageContent(path);
  if (money) return { type: 'money' as const, content: money };

  const support = getRVSupportPageContent(path);
  if (support) return { type: 'support' as const, content: support };

  if (path === '/about') return { type: 'about' as const };
  if (path === '/contact') return { type: 'contact' as const };
  if (path === '/faq') return { type: 'faq' as const };
  if (path === '/privacy') return { type: 'privacy' as const };
  if (path === '/terms') return { type: 'terms' as const };
  if (path === '/cookie-policy') return { type: 'cookie-policy' as const };
  if (path === '/affiliate-disclosure') return { type: 'affiliate-disclosure' as const };
  if (path === '/tours') return { type: 'tours' as const };
  if (path === '/blog') return { type: 'blog' as const };
  if (path === '/neighborhoods') return { type: 'neighborhoods' as const };

  return null;
}

function resolveGolfCartRomePage(path: string) {
  const money = getGCRMoneyPageContent(path);
  if (money) return { type: 'money' as const, content: money };

  const support = getGCRSupportPageContent(path);
  if (support) return { type: 'support' as const, content: support };

  if (path === '/about') return { type: 'about' as const };
  if (path === '/contact') return { type: 'contact' as const };
  if (path === '/faq') return { type: 'faq' as const };
  if (path === '/privacy') return { type: 'privacy' as const };
  if (path === '/terms') return { type: 'terms' as const };
  if (path === '/cookie-policy') return { type: 'cookie-policy' as const };
  if (path === '/affiliate-disclosure') return { type: 'affiliate-disclosure' as const };
  if (path === '/tours') return { type: 'tours' as const };
  if (path === '/blog') return { type: 'blog' as const };

  return null;
}

function resolveCookingInRomePage(path: string) {
  const money = getCIRMoneyPageContent(path);
  if (money) return { type: 'money' as const, content: money };

  const support = getCIRSupportPageContent(path);
  if (support) return { type: 'support' as const, content: support };

  if (path === '/about') return { type: 'about' as const };
  if (path === '/contact') return { type: 'contact' as const };
  if (path === '/faq') return { type: 'faq' as const };
  if (path === '/privacy') return { type: 'privacy' as const };
  if (path === '/terms') return { type: 'terms' as const };
  if (path === '/cookie-policy') return { type: 'cookie-policy' as const };
  if (path === '/affiliate-disclosure') return { type: 'affiliate-disclosure' as const };
  if (path === '/tours') return { type: 'tours' as const };
  if (path === '/blog') return { type: 'blog' as const };

  return null;
}

function resolveRomePizzaClassPage(path: string) {
  const money = getRPCMoneyPageContent(path);
  if (money) return { type: 'money' as const, content: money };

  const support = getRPCSupportPageContent(path);
  if (support) return { type: 'support' as const, content: support };

  if (path === '/about') return { type: 'about' as const };
  if (path === '/contact') return { type: 'contact' as const };
  if (path === '/faq') return { type: 'faq' as const };
  if (path === '/privacy') return { type: 'privacy' as const };
  if (path === '/terms') return { type: 'terms' as const };
  if (path === '/cookie-policy') return { type: 'cookie-policy' as const };
  if (path === '/affiliate-disclosure') return { type: 'affiliate-disclosure' as const };
  if (path === '/tours') return { type: 'tours' as const };
  if (path === '/blog') return { type: 'blog' as const };

  return null;
}

function resolveTiramisuClassPage(path: string) {
  const money = getTCMoneyPageContent(path);
  if (money) return { type: 'money' as const, content: money };

  const support = getTCSupportPageContent(path);
  if (support) return { type: 'support' as const, content: support };

  if (path === '/about') return { type: 'about' as const };
  if (path === '/contact') return { type: 'contact' as const };

  return null;
}

function resolveTuscanyDayTripPage(path: string) {
  const money = getTDTMoneyPageContent(path);
  if (money) return { type: 'money' as const, content: money };

  const support = getTDTSupportPageContent(path);
  if (support) return { type: 'support' as const, content: support };

  if (path === '/about') return { type: 'about' as const };
  if (path === '/contact') return { type: 'contact' as const };
  if (path === '/faq') return { type: 'faq' as const };
  if (path === '/privacy') return { type: 'privacy' as const };
  if (path === '/terms') return { type: 'terms' as const };
  if (path === '/cookie-policy') return { type: 'cookie-policy' as const };
  if (path === '/affiliate-disclosure') return { type: 'affiliate-disclosure' as const };
  if (path === '/tours') return { type: 'tours' as const };
  if (path === '/blog') return { type: 'blog' as const };

  return null;
}

function resolveAmalfiDayTripPage(path: string) {
  const money = getADTMoneyPageContent(path);
  if (money) return { type: 'money' as const, content: money };

  const support = getADTSupportPageContent(path);
  if (support) return { type: 'support' as const, content: support };

  if (path === '/about') return { type: 'about' as const };
  if (path === '/contact') return { type: 'contact' as const };

  return null;
}

function resolveTivoliDayTripPage(path: string) {
  const money = getTVDTMoneyPageContent(path);
  if (money) return { type: 'money' as const, content: money };

  const support = getTVDTSupportPageContent(path);
  if (support) return { type: 'support' as const, content: support };

  if (path === '/about') return { type: 'about' as const };
  if (path === '/contact') return { type: 'contact' as const };

  return null;
}

function resolveNaplesStreetFoodPage(path: string) {
  const money = getNSFMoneyPageContent(path);
  if (money) return { type: 'money' as const, content: money };

  const support = getNSFSupportPageContent(path);
  if (support) return { type: 'support' as const, content: support };

  if (path === '/about') return { type: 'about' as const };
  if (path === '/contact') return { type: 'contact' as const };

  return null;
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string; rest: string[] }> }): Promise<Metadata> {
  const { slug, rest } = await params;
  const site = getNetworkSite(slug);
  if (!site) return {};

  if (site.slug === 'underground-colosseum') {
    const path = `/${rest.join('/')}`;
    const resolved = resolveUndergroundColosseumPage(path);
    const canonical = `https://${SITE_DOMAIN}/${site.slug}${path}`;

    if (resolved?.type === 'money') {
      return {
        title: { absolute: resolved.content.metaTitle },
        description: resolved.content.metaDescription,
        alternates: { canonical },
        openGraph: { title: resolved.content.metaTitle, description: resolved.content.metaDescription, url: canonical },
      };
    }
    if (resolved?.type === 'support') {
      return {
        title: { absolute: resolved.content.metaTitle },
        description: resolved.content.metaDescription,
        alternates: { canonical },
        openGraph: { title: resolved.content.metaTitle, description: resolved.content.metaDescription, url: canonical },
      };
    }
    if (resolved?.type === 'about') {
      return {
        title: { absolute: 'About Underground Colosseum — First-Hand, Independent Tour Research' },
        description:
          'Every Colosseum underground tour comparison here is written by someone who walked the routes and cross-checked GetYourGuide, Viator, and Tiqets in person — zero sponsored placements.',
        alternates: { canonical },
      };
    }
    if (resolved?.type === 'contact') {
      return {
        title: { absolute: 'Contact | Underground Colosseum' },
        description: 'Get in touch with Underground Colosseum, plus our full affiliate disclosure.',
        alternates: { canonical },
      };
    }
    if (resolved?.type === 'faq') {
      return {
        title: { absolute: 'FAQ | Underground Colosseum' },
        description: 'Frequently asked questions about Colosseum underground access, booking, and tour planning.',
        alternates: { canonical },
      };
    }
    if (resolved?.type === 'privacy') {
      return {
        title: { absolute: 'Privacy Policy | Underground Colosseum' },
        description: 'How Underground Colosseum handles your data and privacy.',
        alternates: { canonical },
      };
    }
    if (resolved?.type === 'terms') {
      return {
        title: { absolute: 'Terms of Service | Underground Colosseum' },
        description: 'Terms of service and conditions for using Underground Colosseum.',
        alternates: { canonical },
      };
    }
    if (resolved?.type === 'cookie-policy') {
      return {
        title: { absolute: 'Cookie Policy | Underground Colosseum' },
        description: 'How Underground Colosseum uses cookies and similar technologies.',
        alternates: { canonical },
      };
    }
    if (resolved?.type === 'affiliate-disclosure') {
      return {
        title: { absolute: 'Affiliate Disclosure | Underground Colosseum' },
        description: 'Full transparency about how Underground Colosseum works and earns money.',
        alternates: { canonical },
      };
    }
    if (resolved?.type === 'tours') {
      return {
        title: { absolute: 'Featured Underground & Arena Tours | Underground Colosseum' },
        description: 'Colosseum underground and arena-floor access options compared',
        alternates: { canonical },
      };
    }
    if (resolved?.type === 'blog') {
      return {
        title: { absolute: 'Underground Colosseum Blog' },
        description: 'Travel tips, history, and planning guides for the Colosseum',
        alternates: { canonical },
      };
    }
    if (resolved?.type === 'neighborhoods') {
      return {
        title: { absolute: 'Explore the Colosseum by Area | Underground Colosseum' },
        description: 'Guide to different zones and sections within the Colosseum',
        alternates: { canonical },
      };
    }

    return { title: `${site.name} | Page Not Found`, robots: { index: false, follow: false } };
  }

  if (site.slug === 'private-vatican') {
    const path = `/${rest.join('/')}`;
    const resolved = resolvePrivateVaticanPage(path);
    const canonical = `https://${SITE_DOMAIN}/${site.slug}${path}`;

    if (resolved?.type === 'money') {
      return {
        title: { absolute: resolved.content.metaTitle },
        description: resolved.content.metaDescription,
        alternates: { canonical },
        openGraph: { title: resolved.content.metaTitle, description: resolved.content.metaDescription, url: canonical },
      };
    }
    if (resolved?.type === 'support') {
      return {
        title: { absolute: resolved.content.metaTitle },
        description: resolved.content.metaDescription,
        alternates: { canonical },
        openGraph: { title: resolved.content.metaTitle, description: resolved.content.metaDescription, url: canonical },
      };
    }
    if (resolved?.type === 'about') {
      return {
        title: { absolute: 'About Private Vatican — First-Hand, Independent Tour Research' },
        description:
          'Every Vatican early-access and private tour comparison here is written by a licensed Rome guide who took the tours and cross-checked GetYourGuide, Viator, and Tiqets in person — not affiliated with the Vatican Museums.',
        alternates: { canonical },
      };
    }
    if (resolved?.type === 'contact') {
      return {
        title: { absolute: 'Contact | Private Vatican' },
        description: 'Get in touch with Private Vatican, plus our full affiliate disclosure and non-affiliation statement.',
        alternates: { canonical },
      };
    }
    if (resolved?.type === 'faq') {
      return {
        title: { absolute: 'FAQ | Private Vatican' },
        description: 'Frequently asked questions about Vatican tours, early access, and private guides.',
        alternates: { canonical },
      };
    }
    if (resolved?.type === 'privacy') {
      return {
        title: { absolute: 'Privacy Policy | Private Vatican' },
        description: 'How Private Vatican handles your data and privacy.',
        alternates: { canonical },
      };
    }
    if (resolved?.type === 'terms') {
      return {
        title: { absolute: 'Terms of Service | Private Vatican' },
        description: 'Terms of service and conditions for using Private Vatican.',
        alternates: { canonical },
      };
    }
    if (resolved?.type === 'cookie-policy') {
      return {
        title: { absolute: 'Cookie Policy | Private Vatican' },
        description: 'Cookie policy and how Private Vatican uses cookies.',
        alternates: { canonical },
      };
    }
    if (resolved?.type === 'affiliate-disclosure') {
      return {
        title: { absolute: 'Affiliate Disclosure | Private Vatican' },
        description: 'How we earn money and our affiliate partnerships with tour booking platforms.',
        alternates: { canonical },
      };
    }
    if (resolved?.type === 'tours') {
      return {
        title: { absolute: 'Featured Vatican Tours | Private Vatican' },
        description: 'Curated Vatican early-access, private, and skip-the-line tours compared.',
        alternates: { canonical },
      };
    }
    if (resolved?.type === 'blog') {
      return {
        title: { absolute: 'Private Vatican Blog' },
        description: 'Travel tips, Vatican guides, and planning advice.',
        alternates: { canonical },
      };
    }

    return { title: `${site.name} | Page Not Found`, robots: { index: false, follow: false } };
  }

  if (site.slug === 'pompeii-day-trip') {
    const path = `/${rest.join('/')}`;
    const resolved = resolvePompeiiDayTripPage(path);
    const canonical = `https://${SITE_DOMAIN}/${site.slug}${path}`;

    if (resolved?.type === 'money') {
      return {
        title: { absolute: resolved.content.metaTitle },
        description: resolved.content.metaDescription,
        alternates: { canonical },
        openGraph: { title: resolved.content.metaTitle, description: resolved.content.metaDescription, url: canonical },
      };
    }
    if (resolved?.type === 'support') {
      return {
        title: { absolute: resolved.content.metaTitle },
        description: resolved.content.metaDescription,
        alternates: { canonical },
        openGraph: { title: resolved.content.metaTitle, description: resolved.content.metaDescription, url: canonical },
      };
    }
    if (resolved?.type === 'about') {
      return {
        title: { absolute: 'About Pompeii Day Trip — First-Hand, Independent Trip Planning' },
        description:
          'Every Pompeii day-trip comparison here is written by a Bay of Naples regional guide who has run the trip from Rome, Naples, and Sorrento in person — zero sponsored placements.',
        alternates: { canonical },
      };
    }
    if (resolved?.type === 'contact') {
      return {
        title: { absolute: 'Contact | Pompeii Day Trip' },
        description: 'Get in touch with Pompeii Day Trip, plus our full affiliate disclosure.',
        alternates: { canonical },
      };
    }
    if (resolved?.type === 'faq') {
      return {
        title: { absolute: 'FAQ | Pompeii Day Trip' },
        description: 'Frequently asked questions about Pompeii day trips — planning, timing, and logistics.',
        alternates: { canonical },
      };
    }
    if (resolved?.type === 'privacy') {
      return {
        title: { absolute: 'Privacy Policy | Pompeii Day Trip' },
        description: 'How Pompeii Day Trip handles your data and privacy.',
        alternates: { canonical },
      };
    }
    if (resolved?.type === 'terms') {
      return {
        title: { absolute: 'Terms of Service | Pompeii Day Trip' },
        description: 'Terms of service and conditions for using Pompeii Day Trip.',
        alternates: { canonical },
      };
    }
    if (resolved?.type === 'cookie-policy') {
      return {
        title: { absolute: 'Cookie Policy | Pompeii Day Trip' },
        description: 'How Pompeii Day Trip uses cookies and similar technologies.',
        alternates: { canonical },
      };
    }
    if (resolved?.type === 'affiliate-disclosure') {
      return {
        title: { absolute: 'Affiliate Disclosure | Pompeii Day Trip' },
        description: 'Full transparency about how Pompeii Day Trip works and earns money.',
        alternates: { canonical },
      };
    }
    if (resolved?.type === 'tours') {
      return {
        title: { absolute: 'Featured Pompeii Tours | Pompeii Day Trip' },
        description: 'Curated Pompeii day trips from Rome, Naples, Sorrento, and the Amalfi Coast',
        alternates: { canonical },
      };
    }
    if (resolved?.type === 'blog') {
      return {
        title: { absolute: 'Pompeii Day Trip Blog' },
        description: 'Travel tips, history, and planning guides for Pompeii',
        alternates: { canonical },
      };
    }
    if (resolved?.type === 'neighborhoods') {
      return {
        title: { absolute: 'Explore Pompeii by Area | Pompeii Day Trip' },
        description: 'Guide to different zones and landmarks within the Pompeii archaeological site',
        alternates: { canonical },
      };
    }

    return { title: `${site.name} | Page Not Found`, robots: { index: false, follow: false } };
  }

  if (site.slug === 'rome-vespa') {
    const path = `/${rest.join('/')}`;
    const resolved = resolveRomeVespaPage(path);
    const canonical = `https://${SITE_DOMAIN}/${site.slug}${path}`;

    if (resolved?.type === 'money') {
      return {
        title: { absolute: resolved.content.metaTitle },
        description: resolved.content.metaDescription,
        alternates: { canonical },
        openGraph: { title: resolved.content.metaTitle, description: resolved.content.metaDescription, url: canonical },
      };
    }
    if (resolved?.type === 'support') {
      return {
        title: { absolute: resolved.content.metaTitle },
        description: resolved.content.metaDescription,
        alternates: { canonical },
        openGraph: { title: resolved.content.metaTitle, description: resolved.content.metaDescription, url: canonical },
      };
    }
    if (resolved?.type === 'about') {
      return {
        title: { absolute: 'About Rome Scooter Tours — First-Hand, Independent Tour Research' },
        description:
          'Every Rome Vespa and sidecar tour comparison here is written by a licensed motorcycle instructor who rode the routes and cross-checked GetYourGuide and Viator in person — zero sponsored placements.',
        alternates: { canonical },
      };
    }
    if (resolved?.type === 'contact') {
      return {
        title: { absolute: 'Contact | Rome Scooter Tours' },
        description: 'Get in touch with Rome Scooter Tours, plus our full affiliate disclosure.',
        alternates: { canonical },
      };
    }
    if (resolved?.type === 'faq') {
      return {
        title: { absolute: 'FAQ | Rome Scooter Tours' },
        description: 'Frequently asked questions about Vespa tours, licences, and safety in Rome traffic.',
        alternates: { canonical },
      };
    }
    if (resolved?.type === 'privacy') {
      return {
        title: { absolute: 'Privacy Policy | Rome Scooter Tours' },
        description: 'How Rome Scooter Tours handles your data and privacy.',
        alternates: { canonical },
      };
    }
    if (resolved?.type === 'terms') {
      return {
        title: { absolute: 'Terms of Service | Rome Scooter Tours' },
        description: 'Terms of service and conditions for using Rome Scooter Tours.',
        alternates: { canonical },
      };
    }
    if (resolved?.type === 'cookie-policy') {
      return {
        title: { absolute: 'Cookie Policy | Rome Scooter Tours' },
        description: 'How Rome Scooter Tours uses cookies and similar technologies.',
        alternates: { canonical },
      };
    }
    if (resolved?.type === 'affiliate-disclosure') {
      return {
        title: { absolute: 'Affiliate Disclosure | Rome Scooter Tours' },
        description: 'Full transparency about how Rome Scooter Tours works and earns money.',
        alternates: { canonical },
      };
    }
    if (resolved?.type === 'tours') {
      return {
        title: { absolute: 'Featured Vespa Tours in Rome | Rome Scooter Tours' },
        description: 'Guided, self-drive, sidecar, and private Vespa tour options in Rome',
        alternates: { canonical },
      };
    }
    if (resolved?.type === 'blog') {
      return {
        title: { absolute: 'Rome Scooter Tours Blog' },
        description: 'Travel tips, riding guides, and Vespa tour planning articles',
        alternates: { canonical },
      };
    }
    if (resolved?.type === 'neighborhoods') {
      return {
        title: { absolute: 'Ride Rome by Neighborhood | Rome Scooter Tours' },
        description: 'Guide to different neighborhoods where Vespa tours thrive',
        alternates: { canonical },
      };
    }

    return { title: `${site.name} | Page Not Found`, robots: { index: false, follow: false } };
  }

  if (site.slug === 'golf-cart-rome') {
    const path = `/${rest.join('/')}`;
    const resolved = resolveGolfCartRomePage(path);
    const canonical = `https://${SITE_DOMAIN}/${site.slug}${path}`;

    if (resolved?.type === 'money') {
      return {
        title: { absolute: resolved.content.metaTitle },
        description: resolved.content.metaDescription,
        alternates: { canonical },
        openGraph: { title: resolved.content.metaTitle, description: resolved.content.metaDescription, url: canonical },
      };
    }
    if (resolved?.type === 'support') {
      return {
        title: { absolute: resolved.content.metaTitle },
        description: resolved.content.metaDescription,
        alternates: { canonical },
        openGraph: { title: resolved.content.metaTitle, description: resolved.content.metaDescription, url: canonical },
      };
    }
    if (resolved?.type === 'about') {
      return {
        title: { absolute: 'About Golf Cart Rome — First-Hand, Independent Accessibility Research' },
        description:
          'Every Golf Cart Rome tour comparison here is written by a certified accessible-travel consultant who checked boarding, mobility, and comfort in person — zero sponsored placements.',
        alternates: { canonical },
      };
    }
    if (resolved?.type === 'contact') {
      return {
        title: { absolute: 'Contact | Golf Cart Rome' },
        description: 'Get in touch with Golf Cart Rome, plus our full affiliate disclosure.',
        alternates: { canonical },
      };
    }

    return { title: `${site.name} | Page Not Found`, robots: { index: false, follow: false } };
  }

  if (site.slug === 'cooking-in-rome') {
    const path = `/${rest.join('/')}`;
    const resolved = resolveCookingInRomePage(path);
    const canonical = `https://${SITE_DOMAIN}/${site.slug}${path}`;

    if (resolved?.type === 'money') {
      return {
        title: { absolute: resolved.content.metaTitle },
        description: resolved.content.metaDescription,
        alternates: { canonical },
        openGraph: { title: resolved.content.metaTitle, description: resolved.content.metaDescription, url: canonical },
      };
    }
    if (resolved?.type === 'support') {
      return {
        title: { absolute: resolved.content.metaTitle },
        description: resolved.content.metaDescription,
        alternates: { canonical },
        openGraph: { title: resolved.content.metaTitle, description: resolved.content.metaDescription, url: canonical },
      };
    }
    if (resolved?.type === 'about') {
      return {
        title: { absolute: 'About Cooking in Rome — First-Hand, Independent Class Research' },
        description:
          'Every Rome cooking class comparison here is written by a Rome-based culinary instructor who has taken the classes and cross-checked GetYourGuide, Viator, and Civitatis in person — zero sponsored placements.',
        alternates: { canonical },
      };
    }
    if (resolved?.type === 'contact') {
      return {
        title: { absolute: 'Contact | Cooking in Rome' },
        description: 'Get in touch with Cooking in Rome, plus our full affiliate disclosure.',
        alternates: { canonical },
      };
    }
    if (resolved?.type === 'faq') {
      return {
        title: { absolute: 'FAQ | Cooking in Rome' },
        description: 'Frequently asked questions about cooking classes, bookings, and what this site covers.',
        alternates: { canonical },
      };
    }
    if (resolved?.type === 'privacy') {
      return {
        title: { absolute: 'Privacy Policy | Cooking in Rome' },
        description: 'How Cooking in Rome handles your information and cookies.',
        alternates: { canonical },
      };
    }
    if (resolved?.type === 'terms') {
      return {
        title: { absolute: 'Terms of Service | Cooking in Rome' },
        description: 'Terms and conditions for using Cooking in Rome.',
        alternates: { canonical },
      };
    }
    if (resolved?.type === 'cookie-policy') {
      return {
        title: { absolute: 'Cookie Policy | Cooking in Rome' },
        description: 'How Cooking in Rome uses cookies.',
        alternates: { canonical },
      };
    }
    if (resolved?.type === 'affiliate-disclosure') {
      return {
        title: { absolute: 'Affiliate Disclosure | Cooking in Rome' },
        description: 'How Cooking in Rome earns money and how it affects our recommendations.',
        alternates: { canonical },
      };
    }
    if (resolved?.type === 'tours') {
      return {
        title: { absolute: 'Cooking Classes in Rome | Cooking in Rome' },
        description: 'Featured cooking classes in Rome — pasta-making, pizza, gelato, and market-to-table experiences.',
        alternates: { canonical },
      };
    }
    if (resolved?.type === 'blog') {
      return {
        title: { absolute: 'Blog | Cooking in Rome' },
        description: 'Articles about cooking techniques, Roman ingredients, and local food culture.',
        alternates: { canonical },
      };
    }

    return { title: `${site.name} | Page Not Found`, robots: { index: false, follow: false } };
  }

  if (site.slug === 'rome-pizza-class') {
    const path = `/${rest.join('/')}`;
    const resolved = resolveRomePizzaClassPage(path);
    const canonical = `https://${SITE_DOMAIN}/${site.slug}${path}`;

    if (resolved?.type === 'money') {
      return {
        title: { absolute: resolved.content.metaTitle },
        description: resolved.content.metaDescription,
        alternates: { canonical },
        openGraph: { title: resolved.content.metaTitle, description: resolved.content.metaDescription, url: canonical },
      };
    }
    if (resolved?.type === 'support') {
      return {
        title: { absolute: resolved.content.metaTitle },
        description: resolved.content.metaDescription,
        alternates: { canonical },
        openGraph: { title: resolved.content.metaTitle, description: resolved.content.metaDescription, url: canonical },
      };
    }
    if (resolved?.type === 'about') {
      return {
        title: { absolute: 'About Rome Pizza Class — First-Hand, Independent Class Research' },
        description:
          'Every Rome pizza-making class comparison here is written by a Rome-based pizzaiolo who has taken the classes and cross-checked GetYourGuide and Viator in person — zero sponsored placements.',
        alternates: { canonical },
      };
    }
    if (resolved?.type === 'contact') {
      return {
        title: { absolute: 'Contact | Rome Pizza Class' },
        description: 'Get in touch with Rome Pizza Class, plus our full affiliate disclosure.',
        alternates: { canonical },
      };
    }
    if (resolved?.type === 'faq') {
      return {
        title: { absolute: 'Pizza Class FAQ | Rome Pizza Class' },
        description: 'Common questions about Rome pizza-making classes, wood-fired ovens, and class bookings.',
        alternates: { canonical },
      };
    }
    if (resolved?.type === 'privacy') {
      return {
        title: { absolute: 'Privacy Policy | Rome Pizza Class' },
        description: 'Privacy Policy for Rome Pizza Class.',
        alternates: { canonical },
      };
    }
    if (resolved?.type === 'terms') {
      return {
        title: { absolute: 'Terms of Service | Rome Pizza Class' },
        description: 'Terms of Service for Rome Pizza Class.',
        alternates: { canonical },
      };
    }
    if (resolved?.type === 'cookie-policy') {
      return {
        title: { absolute: 'Cookie Policy | Rome Pizza Class' },
        description: 'Cookie Policy for Rome Pizza Class.',
        alternates: { canonical },
      };
    }
    if (resolved?.type === 'affiliate-disclosure') {
      return {
        title: { absolute: 'Affiliate Disclosure | Rome Pizza Class' },
        description: 'How Rome Pizza Class works and how we make money — full transparency.',
        alternates: { canonical },
      };
    }
    if (resolved?.type === 'tours') {
      return {
        title: { absolute: 'Featured Pizza-Making Classes | Rome Pizza Class' },
        description: 'Featured Rome pizza-making classes — hands-on, wood-fired oven, family-friendly and private options.',
        alternates: { canonical },
      };
    }
    if (resolved?.type === 'blog') {
      return {
        title: { absolute: 'Blog | Rome Pizza Class' },
        description: 'Pizza technique guides, dough hydration notes, and Rome cooking class planning.',
        alternates: { canonical },
      };
    }

    return { title: `${site.name} | Page Not Found`, robots: { index: false, follow: false } };
  }

  if (site.slug === 'tiramisu-class') {
    const path = `/${rest.join('/')}`;
    const resolved = resolveTiramisuClassPage(path);
    const canonical = `https://${SITE_DOMAIN}/${site.slug}${path}`;

    if (resolved?.type === 'money') {
      return {
        title: { absolute: resolved.content.metaTitle },
        description: resolved.content.metaDescription,
        alternates: { canonical },
        openGraph: { title: resolved.content.metaTitle, description: resolved.content.metaDescription, url: canonical },
      };
    }
    if (resolved?.type === 'support') {
      return {
        title: { absolute: resolved.content.metaTitle },
        description: resolved.content.metaDescription,
        alternates: { canonical },
        openGraph: { title: resolved.content.metaTitle, description: resolved.content.metaDescription, url: canonical },
      };
    }
    if (resolved?.type === 'about') {
      return {
        title: { absolute: 'About Tiramisù Class — First-Hand, Independent Class Research' },
        description:
          'Every Rome tiramisù class comparison here is written by a Rome-based pastry chef who has taken the classes and cross-checked GetYourGuide and Viator in person — zero sponsored placements.',
        alternates: { canonical },
      };
    }
    if (resolved?.type === 'contact') {
      return {
        title: { absolute: 'Contact | Tiramisù Class' },
        description: 'Get in touch with Tiramisù Class, plus our full affiliate disclosure.',
        alternates: { canonical },
      };
    }

    return { title: `${site.name} | Page Not Found`, robots: { index: false, follow: false } };
  }

  if (site.slug === 'tuscany-day-trip') {
    const path = `/${rest.join('/')}`;
    const resolved = resolveTuscanyDayTripPage(path);
    const canonical = `https://${SITE_DOMAIN}/${site.slug}${path}`;

    if (resolved?.type === 'money') {
      return {
        title: { absolute: resolved.content.metaTitle },
        description: resolved.content.metaDescription,
        alternates: { canonical },
        openGraph: { title: resolved.content.metaTitle, description: resolved.content.metaDescription, url: canonical },
      };
    }
    if (resolved?.type === 'support') {
      return {
        title: { absolute: resolved.content.metaTitle },
        description: resolved.content.metaDescription,
        alternates: { canonical },
        openGraph: { title: resolved.content.metaTitle, description: resolved.content.metaDescription, url: canonical },
      };
    }
    if (resolved?.type === 'about') {
      return {
        title: { absolute: 'About Tuscany Day Trip — First-Hand, Independent Trip Planning' },
        description:
          'Every Tuscany day-trip comparison here is written by a Florence-based licensed regional guide who has driven and walked the routes in person — zero sponsored placements.',
        alternates: { canonical },
      };
    }
    if (resolved?.type === 'contact') {
      return {
        title: { absolute: 'Contact | Tuscany Day Trip' },
        description: 'Get in touch with Tuscany Day Trip, plus our full affiliate disclosure.',
        alternates: { canonical },
      };
    }
    if (resolved?.type === 'faq') {
      return {
        title: { absolute: 'FAQ | Tuscany Day Trip' },
        description: 'Frequently asked questions about Tuscany day trips, wine tours, and planning.',
        alternates: { canonical },
      };
    }
    if (resolved?.type === 'privacy') {
      return {
        title: { absolute: 'Privacy Policy | Tuscany Day Trip' },
        description: 'Our privacy policy and how we handle your data.',
        alternates: { canonical },
      };
    }
    if (resolved?.type === 'terms') {
      return {
        title: { absolute: 'Terms of Service | Tuscany Day Trip' },
        description: 'Terms and conditions for using Tuscany Day Trip.',
        alternates: { canonical },
      };
    }
    if (resolved?.type === 'cookie-policy') {
      return {
        title: { absolute: 'Cookie Policy | Tuscany Day Trip' },
        description: 'How Tuscany Day Trip uses cookies and tracking technologies.',
        alternates: { canonical },
      };
    }
    if (resolved?.type === 'affiliate-disclosure') {
      return {
        title: { absolute: 'Affiliate Disclosure | Tuscany Day Trip' },
        description: 'Full transparency about how this site works and how we make money.',
        alternates: { canonical },
      };
    }
    if (resolved?.type === 'tours') {
      return {
        title: { absolute: 'Featured Tuscany Tours | Tuscany Day Trip' },
        description: 'Curated Tuscany day trips from Florence — wine tours, hill towns, and countryside routes.',
        alternates: { canonical },
      };
    }
    if (resolved?.type === 'blog') {
      return {
        title: { absolute: 'Blog | Tuscany Day Trip' },
        description: 'Travel tips, wine guides, and planning advice for Tuscany.',
        alternates: { canonical },
      };
    }

    return { title: `${site.name} | Page Not Found`, robots: { index: false, follow: false } };
  }

  if (site.slug === 'amalfi-day-trip') {
    const path = `/${rest.join('/')}`;
    const resolved = resolveAmalfiDayTripPage(path);
    const canonical = `https://${SITE_DOMAIN}/${site.slug}${path}`;

    if (resolved?.type === 'money') {
      return {
        title: { absolute: resolved.content.metaTitle },
        description: resolved.content.metaDescription,
        alternates: { canonical },
        openGraph: { title: resolved.content.metaTitle, description: resolved.content.metaDescription, url: canonical },
      };
    }
    if (resolved?.type === 'support') {
      return {
        title: { absolute: resolved.content.metaTitle },
        description: resolved.content.metaDescription,
        alternates: { canonical },
        openGraph: { title: resolved.content.metaTitle, description: resolved.content.metaDescription, url: canonical },
      };
    }
    if (resolved?.type === 'about') {
      return {
        title: { absolute: 'About Amalfi Day Trip — First-Hand, Independent Tour Research' },
        description:
          'Every Amalfi Coast day trip comparison here is written by someone who drove, sailed, and walked the routes in person — zero sponsored placements.',
        alternates: { canonical },
      };
    }
    if (resolved?.type === 'contact') {
      return {
        title: { absolute: 'Contact | Amalfi Day Trip' },
        description: 'Get in touch with Amalfi Day Trip, plus our full affiliate disclosure.',
        alternates: { canonical },
      };
    }

    return { title: `${site.name} | Page Not Found`, robots: { index: false, follow: false } };
  }

  if (site.slug === 'tivoli-day-trip') {
    const path = `/${rest.join('/')}`;
    const resolved = resolveTivoliDayTripPage(path);
    const canonical = `https://${SITE_DOMAIN}/${site.slug}${path}`;

    if (resolved?.type === 'money') {
      return {
        title: { absolute: resolved.content.metaTitle },
        description: resolved.content.metaDescription,
        alternates: { canonical },
        openGraph: { title: resolved.content.metaTitle, description: resolved.content.metaDescription, url: canonical },
      };
    }
    if (resolved?.type === 'support') {
      return {
        title: { absolute: resolved.content.metaTitle },
        description: resolved.content.metaDescription,
        alternates: { canonical },
        openGraph: { title: resolved.content.metaTitle, description: resolved.content.metaDescription, url: canonical },
      };
    }
    if (resolved?.type === 'about') {
      return {
        title: { absolute: 'About Tivoli Day Trip — First-Hand, Independent Tour Research' },
        description:
          'Every Tivoli day trip comparison here is written by someone who walked both villas and cross-checked GetYourGuide, Viator, and Tiqets in person — zero sponsored placements.',
        alternates: { canonical },
      };
    }
    if (resolved?.type === 'contact') {
      return {
        title: { absolute: 'Contact | Tivoli Day Trip' },
        description: 'Get in touch with Tivoli Day Trip, plus our full affiliate disclosure.',
        alternates: { canonical },
      };
    }

    return { title: `${site.name} | Page Not Found`, robots: { index: false, follow: false } };
  }

  if (site.slug === 'naples-street-food') {
    const path = `/${rest.join('/')}`;
    const resolved = resolveNaplesStreetFoodPage(path);
    const canonical = `https://${SITE_DOMAIN}/${site.slug}${path}`;

    if (resolved?.type === 'money') {
      return {
        title: { absolute: resolved.content.metaTitle },
        description: resolved.content.metaDescription,
        alternates: { canonical },
        openGraph: { title: resolved.content.metaTitle, description: resolved.content.metaDescription, url: canonical },
      };
    }
    if (resolved?.type === 'support') {
      return {
        title: { absolute: resolved.content.metaTitle },
        description: resolved.content.metaDescription,
        alternates: { canonical },
        openGraph: { title: resolved.content.metaTitle, description: resolved.content.metaDescription, url: canonical },
      };
    }
    if (resolved?.type === 'about') {
      return {
        title: { absolute: 'About Naples Street Food — First-Hand, Independent Food Tour Research' },
        description:
          'Every Naples food tour comparison here is written by a guide who actually visits Naples — honest recommendations, no sponsored placements.',
        alternates: { canonical },
      };
    }
    if (resolved?.type === 'contact') {
      return {
        title: { absolute: 'Contact | Naples Street Food' },
        description: 'Get in touch with Naples Street Food, plus our full affiliate disclosure.',
        alternates: { canonical },
      };
    }

    return { title: `${site.name} | Page Not Found`, robots: { index: false, follow: false } };
  }

  // All 13 network properties now generate metadata (multi-tenancy enabled)
  return {};
}

export default async function NetworkSiteSubPage({ params }: { params: Promise<{ slug: string; rest: string[] }> }) {
  const { slug, rest } = await params;
  const site = getNetworkSite(slug);
  if (!site) notFound();

  if (site.slug === 'underground-colosseum') {
    const path = `/${rest.join('/')}`;
    const resolved = resolveUndergroundColosseumPage(path);

    if (resolved?.type === 'money') return <MoneyPageTemplate content={resolved.content} />;
    if (resolved?.type === 'support') return <SupportPageTemplate content={resolved.content} />;
    if (resolved?.type === 'about') return <UCAboutPage />;
    if (resolved?.type === 'contact') return <UCContactPage />;
    if (resolved?.type === 'faq') return <UCFAQPage />;
    if (resolved?.type === 'privacy') return <UCPrivacyPolicyPage />;
    if (resolved?.type === 'terms') return <UCTermsOfServicePage />;
    if (resolved?.type === 'cookie-policy') return <UCCookiePolicyPage />;
    if (resolved?.type === 'affiliate-disclosure') return <UCAffiliateDisclosurePage />;
    if (resolved?.type === 'tours') return <UCToursPage />;
    if (resolved?.type === 'blog') return <UCBlogPage />;
    if (resolved?.type === 'neighborhoods') return <UCNeighborhoodsPage />;

    return <UnderConstructionNotice siteName={site.name} />;
  }

  if (site.slug === 'private-vatican') {
    const path = `/${rest.join('/')}`;
    const resolved = resolvePrivateVaticanPage(path);

    if (resolved?.type === 'money') return <PVMoneyPageTemplate content={resolved.content} />;
    if (resolved?.type === 'support') return <PVSupportPageTemplate content={resolved.content} />;
    if (resolved?.type === 'about') return <PVAboutPage />;
    if (resolved?.type === 'contact') return <PVContactPage />;
    if (resolved?.type === 'faq') return <PVFAQPage />;
    if (resolved?.type === 'privacy') return <PVPrivacyPolicyPage />;
    if (resolved?.type === 'terms') return <PVTermsOfServicePage />;
    if (resolved?.type === 'cookie-policy') return <PVCookiePolicyPage />;
    if (resolved?.type === 'affiliate-disclosure') return <PVAffiliateDisclosurePage />;
    if (resolved?.type === 'tours') return <PVToursPage />;
    if (resolved?.type === 'blog') return <PVBlogPage />;

    return <UnderConstructionNotice siteName={site.name} />;
  }

  if (site.slug === 'pompeii-day-trip') {
    const path = `/${rest.join('/')}`;

    // Handle tours category pages
    if (path.startsWith('/tours/category/')) {
      const category = path.replace('/tours/category/', '');
      return <PDTToursCategoryPage category={category} />;
    }

    // Handle blog post pages
    if (path.startsWith('/blog/') && !path.startsWith('/blog/category/')) {
      try {
        const allPosts = await getAllBlogPosts();
        const postSlug = path.replace('/blog/', '');
        const post = allPosts.find((p) => p.slug === postSlug);
        if (post) return <PDTBlogPostPage post={post} />;
      } catch (error) {
        console.error('Error fetching blog post:', error);
      }
    }

    // Handle blog category pages
    if (path.startsWith('/blog/category/')) {
      try {
        const allPosts = await getAllBlogPosts();
        const category = path.replace('/blog/category/', '');
        const categoryPosts = allPosts.filter((p) => p.categorySlug === category);
        return <PDTBlogCategoryPage category={category} posts={categoryPosts} />;
      } catch (error) {
        console.error('Error fetching blog posts:', error);
      }
    }

    // Handle neighborhood detail pages
    if (path.startsWith('/neighborhoods/') && path !== '/neighborhoods') {
      try {
        const allTours = await getAllTours();
        const neighborhoodSlug = path.replace('/neighborhoods/', '');
        // For PDT, neighborhoods are actually Pompeii areas, so we pass a simplified structure
        const tours = allTours.filter((t) => t.neighborhood === neighborhoodSlug);
        const areaNames: Record<string, string> = {
          'forum': 'The Forum',
          'house-of-the-faun': 'House of the Faun',
          'house-of-mysteries': 'House of the Mysteries',
          'amphitheater': 'Amphitheater',
          'theaters': 'Theaters',
          'street-of-tombs': 'Street of Tombs',
          'bakery-thermopolium': 'Bakery & Thermopolium',
          'lupanare': 'The Lupanare',
          'herculaneum-gate': 'Herculaneum Gate',
          'garden-houses': 'Garden Houses',
        };
        const areaName = areaNames[neighborhoodSlug] || neighborhoodSlug;
        return <PDTNeighborhoodDetailPage name={areaName} description="" tours={tours} />;
      } catch (error) {
        console.error('Error fetching neighborhood:', error);
      }
    }

    // Handle blog index page (now with full content)
    if (path === '/blog') {
      try {
        const allPosts = await getAllBlogPosts();
        return <PDTBlogPageFull posts={allPosts} />;
      } catch (error) {
        console.error('Error fetching blog posts:', error);
        return <PDTBlogPage />;
      }
    }

    const resolved = resolvePompeiiDayTripPage(path);

    if (resolved?.type === 'money') return <PDTMoneyPageTemplate content={resolved.content} />;
    if (resolved?.type === 'support') return <PDTSupportPageTemplate content={resolved.content} />;
    if (resolved?.type === 'about') return <PDTAboutPage />;
    if (resolved?.type === 'contact') return <PDTContactPage />;
    if (resolved?.type === 'faq') return <PDTFAQPage />;
    if (resolved?.type === 'privacy') return <PDTPrivacyPolicyPage />;
    if (resolved?.type === 'terms') return <PDTTermsOfServicePage />;
    if (resolved?.type === 'cookie-policy') return <PDTCookiePolicyPage />;
    if (resolved?.type === 'affiliate-disclosure') return <PDTAffiliateDisclosurePage />;
    if (resolved?.type === 'tours') return <PDTToursPage />;
    if (resolved?.type === 'neighborhoods') return <PDTNeighborhoodsPage />;

    return <UnderConstructionNotice siteName={site.name} />;
  }

  if (site.slug === 'rome-vespa') {
    const path = `/${rest.join('/')}`;
    const resolved = resolveRomeVespaPage(path);

    if (resolved?.type === 'money') return <RVMoneyPageTemplate content={resolved.content} />;
    if (resolved?.type === 'support') return <RVSupportPageTemplate content={resolved.content} />;
    if (resolved?.type === 'about') return <RVAboutPage />;
    if (resolved?.type === 'contact') return <RVContactPage />;
    if (resolved?.type === 'faq') return <RVFAQPage />;
    if (resolved?.type === 'privacy') return <RVPrivacyPolicyPage />;
    if (resolved?.type === 'terms') return <RVTermsOfServicePage />;
    if (resolved?.type === 'cookie-policy') return <RVCookiePolicyPage />;
    if (resolved?.type === 'affiliate-disclosure') return <RVAffiliateDisclosurePage />;
    if (resolved?.type === 'tours') return <RVToursPage />;
    if (resolved?.type === 'blog') return <RVBlogPage />;
    if (resolved?.type === 'neighborhoods') return <RVNeighborhoodsPage />;

    return <UnderConstructionNotice siteName={site.name} />;
  }

  if (site.slug === 'golf-cart-rome') {
    const path = `/${rest.join('/')}`;
    const resolved = resolveGolfCartRomePage(path);

    if (resolved?.type === 'money') return <GCRMoneyPageTemplate content={resolved.content} />;
    if (resolved?.type === 'support') return <GCRSupportPageTemplate content={resolved.content} />;
    if (resolved?.type === 'about') return <GCRAboutPage />;
    if (resolved?.type === 'contact') return <GCRContactPage />;
    if (resolved?.type === 'faq') return <GCRFAQPage />;
    if (resolved?.type === 'privacy') return <GCRPrivacyPolicyPage />;
    if (resolved?.type === 'terms') return <GCRTermsOfServicePage />;
    if (resolved?.type === 'cookie-policy') return <GCRCookiePolicyPage />;
    if (resolved?.type === 'affiliate-disclosure') return <GCRAffiliateDisclosurePage />;
    if (resolved?.type === 'tours') return <GCRToursPage />;
    if (resolved?.type === 'blog') return <GCRBlogPage />;

    return <UnderConstructionNotice siteName={site.name} />;
  }

  if (site.slug === 'cooking-in-rome') {
    const path = `/${rest.join('/')}`;
    const resolved = resolveCookingInRomePage(path);

    if (resolved?.type === 'money') return <CIRMoneyPageTemplate content={resolved.content} />;
    if (resolved?.type === 'support') return <CIRSupportPageTemplate content={resolved.content} />;
    if (resolved?.type === 'about') return <CIRAboutPage />;
    if (resolved?.type === 'contact') return <CIRContactPage />;
    if (resolved?.type === 'faq') return <CIRFAQPage />;
    if (resolved?.type === 'privacy') return <CIRPrivacyPolicyPage />;
    if (resolved?.type === 'terms') return <CIRTermsOfServicePage />;
    if (resolved?.type === 'cookie-policy') return <CIRCookiePolicyPage />;
    if (resolved?.type === 'affiliate-disclosure') return <CIRAffiliateDisclosurePage />;
    if (resolved?.type === 'tours') return <CIRToursPage />;
    if (resolved?.type === 'blog') return <CIRBlogPage />;

    return <UnderConstructionNotice siteName={site.name} />;
  }

  if (site.slug === 'rome-pizza-class') {
    const path = `/${rest.join('/')}`;
    const resolved = resolveRomePizzaClassPage(path);

    if (resolved?.type === 'money') return <RPCMoneyPageTemplate content={resolved.content} />;
    if (resolved?.type === 'support') return <RPCSupportPageTemplate content={resolved.content} />;
    if (resolved?.type === 'about') return <RPCAboutPage />;
    if (resolved?.type === 'contact') return <RPCContactPage />;
    if (resolved?.type === 'faq') return <RPCFAQPage />;
    if (resolved?.type === 'privacy') return <RPCPrivacyPolicyPage />;
    if (resolved?.type === 'terms') return <RPCTermsOfServicePage />;
    if (resolved?.type === 'cookie-policy') return <RPCCookiePolicyPage />;
    if (resolved?.type === 'affiliate-disclosure') return <RPCAffiliateDisclosurePage />;
    if (resolved?.type === 'tours') return <RPCToursPage />;
    if (resolved?.type === 'blog') return <RPCBlogPage />;

    return <UnderConstructionNotice siteName={site.name} />;
  }

  if (site.slug === 'tiramisu-class') {
    const path = `/${rest.join('/')}`;
    const resolved = resolveTiramisuClassPage(path);

    if (resolved?.type === 'money') return <TCMoneyPageTemplate content={resolved.content} />;
    if (resolved?.type === 'support') return <TCSupportPageTemplate content={resolved.content} />;
    if (resolved?.type === 'about') return <TCAboutPage />;
    if (resolved?.type === 'contact') return <TCContactPage />;

    return <UnderConstructionNotice siteName={site.name} />;
  }

  if (site.slug === 'tuscany-day-trip') {
    const path = `/${rest.join('/')}`;
    const resolved = resolveTuscanyDayTripPage(path);

    if (resolved?.type === 'money') return <TDTMoneyPageTemplate content={resolved.content} />;
    if (resolved?.type === 'support') return <TDTSupportPageTemplate content={resolved.content} />;
    if (resolved?.type === 'about') return <TDTAboutPage />;
    if (resolved?.type === 'contact') return <TDTContactPage />;
    if (resolved?.type === 'faq') return <TDTFAQPage />;
    if (resolved?.type === 'privacy') return <TDTPrivacyPolicyPage />;
    if (resolved?.type === 'terms') return <TDTTermsOfServicePage />;
    if (resolved?.type === 'cookie-policy') return <TDTCookiePolicyPage />;
    if (resolved?.type === 'affiliate-disclosure') return <TDTAffiliateDisclosurePage />;
    if (resolved?.type === 'tours') return <TDTToursPage />;
    if (resolved?.type === 'blog') return <TDTBlogPage />;

    return <UnderConstructionNotice siteName={site.name} />;
  }

  if (site.slug === 'amalfi-day-trip') {
    const path = `/${rest.join('/')}`;
    const resolved = resolveAmalfiDayTripPage(path);

    if (resolved?.type === 'money') return <ADTMoneyPageTemplate content={resolved.content} />;
    if (resolved?.type === 'support') return <ADTSupportPageTemplate content={resolved.content} />;
    if (resolved?.type === 'about') return <ADTAboutPage />;
    if (resolved?.type === 'contact') return <ADTContactPage />;

    return <UnderConstructionNotice siteName={site.name} />;
  }

  if (site.slug === 'tivoli-day-trip') {
    const path = `/${rest.join('/')}`;
    const resolved = resolveTivoliDayTripPage(path);

    if (resolved?.type === 'money') return <TVDTMoneyPageTemplate content={resolved.content} />;
    if (resolved?.type === 'support') return <TVDTSupportPageTemplate content={resolved.content} />;
    if (resolved?.type === 'about') return <TVDTAboutPage />;
    if (resolved?.type === 'contact') return <TVDTContactPage />;

    return <UnderConstructionNotice siteName={site.name} />;
  }

  if (site.slug === 'naples-street-food') {
    const path = `/${rest.join('/')}`;
    const resolved = resolveNaplesStreetFoodPage(path);

    if (resolved?.type === 'money') return <NSFMoneyPageTemplate content={resolved.content} />;
    if (resolved?.type === 'support') return <NSFSupportPageTemplate content={resolved.content} />;
    if (resolved?.type === 'about') return <NSFAboutPage />;
    if (resolved?.type === 'contact') return <NSFContactPage />;

    return <UnderConstructionNotice siteName={site.name} />;
  }

  // Fallback for any unresolved sub-paths
  return <UnderConstructionNotice siteName={site.name} />;
}
