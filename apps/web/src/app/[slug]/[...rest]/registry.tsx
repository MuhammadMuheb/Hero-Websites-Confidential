import type { ReactNode } from 'react';
import type { LegalDoc } from '@/components/network/NetworkLegalPage';
import type { HubTour } from '@/components/network/NetworkHubPages';

import { MoneyPageTemplate as UCMoney } from '@/components/underground-colosseum/MoneyPageTemplate';
import { SupportPageTemplate as UCSupport } from '@/components/underground-colosseum/SupportPageTemplate';
import { UCContactPage } from '@/components/underground-colosseum/UCContactPage';
import { UCFAQPage } from '@/components/underground-colosseum/UCFAQPage';
import { UCPrivacyPolicyPage } from '@/components/underground-colosseum/UCPrivacyPolicyPage';
import { UCNeighborhoodsPage } from '@/components/underground-colosseum/UCNeighborhoodsPage';
import * as UC from '@/lib/underground-colosseum';
import * as UCC from '@/lib/underground-colosseum-content';

import { MoneyPageTemplate as PVMoney } from '@/components/private-vatican/MoneyPageTemplate';
import { SupportPageTemplate as PVSupport } from '@/components/private-vatican/SupportPageTemplate';
import { PVContactPage } from '@/components/private-vatican/PVContactPage';
import { PVFAQPage } from '@/components/private-vatican/PVFAQPage';
import { PVPrivacyPolicyPage } from '@/components/private-vatican/PVPrivacyPolicyPage';
import * as PV from '@/lib/private-vatican';
import * as PVC from '@/lib/private-vatican-content';

import { MoneyPageTemplate as PDTMoney } from '@/components/pompeii-day-trip/MoneyPageTemplate';
import { SupportPageTemplate as PDTSupport } from '@/components/pompeii-day-trip/SupportPageTemplate';
import { PDTContactPage } from '@/components/pompeii-day-trip/PDTContactPage';
import { PDTFAQPage } from '@/components/pompeii-day-trip/PDTFAQPage';
import { PDTPrivacyPolicyPage } from '@/components/pompeii-day-trip/PDTPrivacyPolicyPage';
import { PDTNeighborhoodsPage } from '@/components/pompeii-day-trip/PDTNeighborhoodsPage';
import * as PDT from '@/lib/pompeii-day-trip';
import * as PDTC from '@/lib/pompeii-day-trip-content';

import { MoneyPageTemplate as RVMoney } from '@/components/rome-vespa/MoneyPageTemplate';
import { SupportPageTemplate as RVSupport } from '@/components/rome-vespa/SupportPageTemplate';
import { RVContactPage } from '@/components/rome-vespa/RVContactPage';
import { RVFAQPage } from '@/components/rome-vespa/RVFAQPage';
import { RVPrivacyPolicyPage } from '@/components/rome-vespa/RVPrivacyPolicyPage';
import { RVNeighborhoodsPage } from '@/components/rome-vespa/RVNeighborhoodsPage';
import * as RV from '@/lib/rome-vespa';
import * as RVC from '@/lib/rome-vespa-content';

import { MoneyPageTemplate as GCRMoney } from '@/components/golf-cart-rome/MoneyPageTemplate';
import { SupportPageTemplate as GCRSupport } from '@/components/golf-cart-rome/SupportPageTemplate';
import { GCRContactPage } from '@/components/golf-cart-rome/GCRContactPage';
import { GCRFAQPage } from '@/components/golf-cart-rome/GCRFAQPage';
import { GCRPrivacyPolicyPage } from '@/components/golf-cart-rome/GCRPrivacyPolicyPage';
import * as GCR from '@/lib/golf-cart-rome';
import * as GCRC from '@/lib/golf-cart-rome-content';

import { MoneyPageTemplate as CIRMoney } from '@/components/cooking-in-rome/MoneyPageTemplate';
import { SupportPageTemplate as CIRSupport } from '@/components/cooking-in-rome/SupportPageTemplate';
import { CIRContactPage } from '@/components/cooking-in-rome/CIRContactPage';
import { CIRFAQPage } from '@/components/cooking-in-rome/CIRFAQPage';
import { CIRPrivacyPolicyPage } from '@/components/cooking-in-rome/CIRPrivacyPolicyPage';
import * as CIR from '@/lib/cooking-in-rome';
import * as CIRC from '@/lib/cooking-in-rome-content';

import { MoneyPageTemplate as RPCMoney } from '@/components/rome-pizza-class/MoneyPageTemplate';
import { SupportPageTemplate as RPCSupport } from '@/components/rome-pizza-class/SupportPageTemplate';
import { RPCContactPage } from '@/components/rome-pizza-class/RPCContactPage';
import { RPCFAQPage } from '@/components/rome-pizza-class/RPCFAQPage';
import { RPCPrivacyPolicyPage } from '@/components/rome-pizza-class/RPCPrivacyPolicyPage';
import * as RPC from '@/lib/rome-pizza-class';
import * as RPCC from '@/lib/rome-pizza-class-content';

import { MoneyPageTemplate as TCMoney } from '@/components/tiramisu-class/MoneyPageTemplate';
import { SupportPageTemplate as TCSupport } from '@/components/tiramisu-class/SupportPageTemplate';
import { TCContactPage } from '@/components/tiramisu-class/TCContactPage';
import { TCFAQPage } from '@/components/tiramisu-class/TCFAQPage';
import { TCPrivacyPolicyPage } from '@/components/tiramisu-class/TCPrivacyPolicyPage';
import * as TC from '@/lib/tiramisu-class';
import * as TCC from '@/lib/tiramisu-class-content';

import { MoneyPageTemplate as TDTMoney } from '@/components/tuscany-day-trip/MoneyPageTemplate';
import { SupportPageTemplate as TDTSupport } from '@/components/tuscany-day-trip/SupportPageTemplate';
import { TDTContactPage } from '@/components/tuscany-day-trip/TDTContactPage';
import { TDTFAQPage } from '@/components/tuscany-day-trip/TDTFAQPage';
import { TDTPrivacyPolicyPage } from '@/components/tuscany-day-trip/TDTPrivacyPolicyPage';
import * as TDT from '@/lib/tuscany-day-trip';
import * as TDTC from '@/lib/tuscany-day-trip-content';

import { MoneyPageTemplate as ADTMoney } from '@/components/amalfi-day-trip/MoneyPageTemplate';
import { SupportPageTemplate as ADTSupport } from '@/components/amalfi-day-trip/SupportPageTemplate';
import { ADTContactPage } from '@/components/amalfi-day-trip/ADTContactPage';
import { ADTFAQPage } from '@/components/amalfi-day-trip/ADTFAQPage';
import { ADTPrivacyPolicyPage } from '@/components/amalfi-day-trip/ADTPrivacyPolicyPage';
import * as ADT from '@/lib/amalfi-day-trip';
import * as ADTC from '@/lib/amalfi-day-trip-content';

import { MoneyPageTemplate as TVDTMoney } from '@/components/tivoli-day-trip/MoneyPageTemplate';
import { SupportPageTemplate as TVDTSupport } from '@/components/tivoli-day-trip/SupportPageTemplate';
import { TVDTContactPage } from '@/components/tivoli-day-trip/TVDTContactPage';
import { TVDTFAQPage } from '@/components/tivoli-day-trip/TVDTFAQPage';
import { TVDTPrivacyPolicyPage } from '@/components/tivoli-day-trip/TVDTPrivacyPolicyPage';
import * as TVDT from '@/lib/tivoli-day-trip';
import * as TVDTC from '@/lib/tivoli-day-trip-content';

import { MoneyPageTemplate as NSFMoney } from '@/components/naples-street-food/MoneyPageTemplate';
import { SupportPageTemplate as NSFSupport } from '@/components/naples-street-food/SupportPageTemplate';
import { NSFContactPage } from '@/components/naples-street-food/NSFContactPage';
import { NSFFAQPage } from '@/components/naples-street-food/NSFFAQPage';
import { NSFPrivacyPolicyPage } from '@/components/naples-street-food/NSFPrivacyPolicyPage';
import * as NSF from '@/lib/naples-street-food';
import * as NSFC from '@/lib/naples-street-food-content';

/** The fields every property's money/support content shares — enough for metadata and guide cards. */
export interface ContentSummary {
  href: string;
  navTitle?: string;
  h1?: string;
  metaTitle: string;
  metaDescription: string;
  heroImage?: { src: string; alt: string };
}

export interface ResolvedContent {
  kind: 'compare' | 'plan';
  content: ContentSummary;
  node: ReactNode;
}

/** A page type every property can serve. `about` lives in its own route (app/[slug]/about). */
export type StandardPage = 'contact' | 'faq' | 'privacy' | 'terms' | 'cookie-policy' | 'affiliate-disclosure' | 'tours' | 'blog' | 'neighborhoods';

export interface PropertyDef {
  /** Theme scope class from globals.css (only accent tokens vary per property). */
  scope: string;
  /** Property hero image; the social-share fallback for pages without their own. */
  heroImage: { src: string; alt: string };
  /** Every content href the property's own nav/cards reference (may include drifted ones). */
  hrefs: string[];
  tours: HubTour[];
  money: (href: string) => ResolvedContent | null;
  support: (href: string) => ResolvedContent | null;
  /** Bespoke components; anything missing falls back to a shared network page. */
  pages: Partial<Record<StandardPage, () => ReactNode>>;
  legal: Partial<Record<'terms' | 'cookie-policy' | 'affiliate-disclosure', LegalDoc>>;
  toursSubtitle: string;
}

function hrefsOf(...lists: { href: string }[][]): string[] {
  return lists.flat().map((l) => l.href).filter((h) => h.startsWith('/') && !h.startsWith('/go/'));
}

export const PROPERTIES: Record<string, PropertyDef> = {
  'underground-colosseum': {
    scope: '',
    heroImage: UC.HERO_IMAGE,
    hrefs: [...hrefsOf(UC.MONEY_PAGES, UC.SUPPORT_PAGES), UC.ARENA_FLOOR_PAGE.href, UC.WORTH_IT_PAGE.href],
    tours: UC.FEATURED_TOURS,
    money: (h) => { const c = UCC.getMoneyPageContent(h); return c ? { kind: 'compare', content: c, node: <UCMoney content={c} /> } : null; },
    support: (h) => { const c = UCC.getSupportPageContent(h); return c ? { kind: 'plan', content: c, node: <UCSupport content={c} /> } : null; },
    pages: { contact: () => <UCContactPage />, faq: () => <UCFAQPage />, privacy: () => <UCPrivacyPolicyPage />, neighborhoods: () => <UCNeighborhoodsPage /> },
    legal: { terms: UC.TERMS_OF_SERVICE, 'cookie-policy': UC.COOKIE_POLICY, 'affiliate-disclosure': UC.AFFILIATE_DISCLOSURE },
    toursSubtitle: 'Every underground and arena-floor ticket compared, with honest notes on what each one actually unlocks.',
  },
  'private-vatican': {
    scope: 'pv-scope',
    heroImage: PV.HERO_IMAGE,
    hrefs: hrefsOf(PV.MONEY_PAGES, PV.SUPPORT_PAGES),
    tours: PV.FEATURED_TOURS,
    money: (h) => { const c = PVC.getMoneyPageContent(h); return c ? { kind: 'compare', content: c, node: <PVMoney content={c} /> } : null; },
    support: (h) => { const c = PVC.getSupportPageContent(h); return c ? { kind: 'plan', content: c, node: <PVSupport content={c} /> } : null; },
    pages: { contact: () => <PVContactPage />, faq: () => <PVFAQPage />, privacy: () => <PVPrivacyPolicyPage /> },
    legal: { terms: PV.TERMS_OF_SERVICE, 'cookie-policy': PV.COOKIE_POLICY, 'affiliate-disclosure': PV.AFFILIATE_DISCLOSURE },
    toursSubtitle: 'Early-entry, private and skip-the-line Vatican tours compared by crowd level, route and value.',
  },
  'pompeii-day-trip': {
    scope: 'pdt-scope',
    heroImage: PDT.HERO_IMAGE,
    hrefs: hrefsOf(PDT.MONEY_PAGES, PDT.SUPPORT_PAGES),
    tours: PDT.FEATURED_TOURS,
    money: (h) => { const c = PDTC.getMoneyPageContent(h); return c ? { kind: 'compare', content: c, node: <PDTMoney content={c} /> } : null; },
    support: (h) => { const c = PDTC.getSupportPageContent(h); return c ? { kind: 'plan', content: c, node: <PDTSupport content={c} /> } : null; },
    pages: { contact: () => <PDTContactPage />, faq: () => <PDTFAQPage />, privacy: () => <PDTPrivacyPolicyPage />, neighborhoods: () => <PDTNeighborhoodsPage /> },
    legal: { terms: PDT.TERMS_OF_SERVICE, 'cookie-policy': PDT.COOKIE_POLICY, 'affiliate-disclosure': PDT.AFFILIATE_DISCLOSURE },
    toursSubtitle: 'Pompeii day trips from Rome, Naples, Sorrento and the Amalfi Coast, compared on transit time and time on site.',
  },
  'rome-vespa': {
    scope: 'rv-scope',
    heroImage: RV.HERO_IMAGE,
    hrefs: hrefsOf(RV.MONEY_PAGES, RV.SUPPORT_PAGES),
    tours: RV.FEATURED_TOURS,
    money: (h) => { const c = RVC.getMoneyPageContent(h); return c ? { kind: 'compare', content: c, node: <RVMoney content={c} /> } : null; },
    support: (h) => { const c = RVC.getSupportPageContent(h); return c ? { kind: 'plan', content: c, node: <RVSupport content={c} /> } : null; },
    pages: { contact: () => <RVContactPage />, faq: () => <RVFAQPage />, privacy: () => <RVPrivacyPolicyPage />, neighborhoods: () => <RVNeighborhoodsPage /> },
    legal: { terms: RV.TERMS_OF_SERVICE, 'cookie-policy': RV.COOKIE_POLICY, 'affiliate-disclosure': RV.AFFILIATE_DISCLOSURE },
    toursSubtitle: 'Guided, sidecar, sunset and self-drive Vespa tours of Rome compared on route, licence rules and price.',
  },
  'golf-cart-rome': {
    scope: 'gcr-scope',
    heroImage: GCR.HERO_IMAGE,
    hrefs: hrefsOf(GCR.MONEY_PAGES, GCR.SUPPORT_PAGES),
    tours: GCR.FEATURED_TOURS,
    money: (h) => { const c = GCRC.getMoneyPageContent(h); return c ? { kind: 'compare', content: c, node: <GCRMoney content={c} /> } : null; },
    support: (h) => { const c = GCRC.getSupportPageContent(h); return c ? { kind: 'plan', content: c, node: <GCRSupport content={c} /> } : null; },
    pages: { contact: () => <GCRContactPage />, faq: () => <GCRFAQPage />, privacy: () => <GCRPrivacyPolicyPage /> },
    legal: { terms: GCR.TERMS_OF_SERVICE, 'cookie-policy': GCR.COOKIE_POLICY, 'affiliate-disclosure': GCR.AFFILIATE_DISCLOSURE },
    toursSubtitle: 'Seated, shaded golf cart tours of Rome compared on route, accessibility and price.',
  },
  'cooking-in-rome': {
    scope: 'cir-scope',
    heroImage: CIR.HERO_IMAGE,
    hrefs: hrefsOf(CIR.MONEY_PAGES, CIR.SUPPORT_PAGES),
    tours: CIR.FEATURED_TOURS,
    money: (h) => { const c = CIRC.getMoneyPageContent(h); return c ? { kind: 'compare', content: c, node: <CIRMoney content={c} /> } : null; },
    support: (h) => { const c = CIRC.getSupportPageContent(h); return c ? { kind: 'plan', content: c, node: <CIRSupport content={c} /> } : null; },
    pages: { contact: () => <CIRContactPage />, faq: () => <CIRFAQPage />, privacy: () => <CIRPrivacyPolicyPage /> },
    legal: { terms: CIR.TERMS_OF_SERVICE, 'cookie-policy': CIR.COOKIE_POLICY, 'affiliate-disclosure': CIR.AFFILIATE_DISCLOSURE },
    toursSubtitle: 'Pasta, pizza, gelato and market-to-table cooking classes in Rome compared on group size, menu and value.',
  },
  'rome-pizza-class': {
    scope: 'rpc-scope',
    heroImage: RPC.HERO_IMAGE,
    hrefs: hrefsOf(RPC.MONEY_PAGES, RPC.SUPPORT_PAGES),
    tours: RPC.FEATURED_TOURS,
    money: (h) => { const c = RPCC.getMoneyPageContent(h); return c ? { kind: 'compare', content: c, node: <RPCMoney content={c} /> } : null; },
    support: (h) => { const c = RPCC.getSupportPageContent(h); return c ? { kind: 'plan', content: c, node: <RPCSupport content={c} /> } : null; },
    pages: { contact: () => <RPCContactPage />, faq: () => <RPCFAQPage />, privacy: () => <RPCPrivacyPolicyPage /> },
    legal: { terms: RPC.TERMS_OF_SERVICE, 'cookie-policy': RPC.COOKIE_POLICY, 'affiliate-disclosure': RPC.AFFILIATE_DISCLOSURE },
    toursSubtitle: 'Hands-on pizza-making classes in Rome compared: wood-fired ovens, family and private options.',
  },
  'tiramisu-class': {
    scope: 'tc-scope',
    heroImage: TC.HERO_IMAGE,
    hrefs: hrefsOf(TC.MONEY_PAGES, TC.SUPPORT_PAGES),
    tours: TC.FEATURED_TOURS,
    money: (h) => { const c = TCC.getMoneyPageContent(h); return c ? { kind: 'compare', content: c, node: <TCMoney content={c} /> } : null; },
    support: (h) => { const c = TCC.getSupportPageContent(h); return c ? { kind: 'plan', content: c, node: <TCSupport content={c} /> } : null; },
    pages: { contact: () => <TCContactPage />, faq: () => <TCFAQPage />, privacy: () => <TCPrivacyPolicyPage /> },
    legal: {},
    toursSubtitle: 'Tiramisù and Italian dessert classes in Rome compared on what you make, group size and price.',
  },
  'tuscany-day-trip': {
    scope: 'tdt-scope',
    heroImage: TDT.HERO_IMAGE,
    hrefs: hrefsOf(TDT.MONEY_PAGES, TDT.SUPPORT_PAGES),
    tours: TDT.FEATURED_TOURS,
    money: (h) => { const c = TDTC.getMoneyPageContent(h); return c ? { kind: 'compare', content: c, node: <TDTMoney content={c} /> } : null; },
    support: (h) => { const c = TDTC.getSupportPageContent(h); return c ? { kind: 'plan', content: c, node: <TDTSupport content={c} /> } : null; },
    pages: { contact: () => <TDTContactPage />, faq: () => <TDTFAQPage />, privacy: () => <TDTPrivacyPolicyPage /> },
    legal: { terms: TDT.TERMS_OF_SERVICE, 'cookie-policy': TDT.COOKIE_POLICY, 'affiliate-disclosure': TDT.AFFILIATE_DISCLOSURE },
    toursSubtitle: 'Tuscany day trips from Florence compared: wine tours, hill towns and countryside routes.',
  },
  'amalfi-day-trip': {
    scope: 'adt-scope',
    heroImage: ADT.HERO_IMAGE,
    hrefs: hrefsOf(ADT.MONEY_PAGES, ADT.SUPPORT_PAGES),
    tours: ADT.FEATURED_TOURS,
    money: (h) => { const c = ADTC.getMoneyPageContent(h); return c ? { kind: 'compare', content: c, node: <ADTMoney content={c} /> } : null; },
    support: (h) => { const c = ADTC.getSupportPageContent(h); return c ? { kind: 'plan', content: c, node: <ADTSupport content={c} /> } : null; },
    pages: { contact: () => <ADTContactPage />, faq: () => <ADTFAQPage />, privacy: () => <ADTPrivacyPolicyPage /> },
    legal: {},
    toursSubtitle: 'Amalfi Coast day trips from Rome, Naples and Sorrento compared — by road or by boat.',
  },
  'tivoli-day-trip': {
    scope: 'tvdt-scope',
    heroImage: TVDT.HERO_IMAGE,
    hrefs: hrefsOf(TVDT.MONEY_PAGES, TVDT.SUPPORT_PAGES),
    tours: TVDT.FEATURED_TOURS,
    money: (h) => { const c = TVDTC.getMoneyPageContent(h); return c ? { kind: 'compare', content: c, node: <TVDTMoney content={c} /> } : null; },
    support: (h) => { const c = TVDTC.getSupportPageContent(h); return c ? { kind: 'plan', content: c, node: <TVDTSupport content={c} /> } : null; },
    pages: { contact: () => <TVDTContactPage />, faq: () => <TVDTFAQPage />, privacy: () => <TVDTPrivacyPolicyPage /> },
    legal: {},
    toursSubtitle: 'Villa d’Este and Hadrian’s Villa day trips from Rome compared: full-day, half-day, private and self-guided.',
  },
  'naples-street-food': {
    scope: 'nsf-scope',
    heroImage: NSF.HERO_IMAGE,
    hrefs: hrefsOf(NSF.MONEY_PAGES, NSF.SUPPORT_PAGES),
    tours: NSF.FEATURED_TOURS,
    money: (h) => { const c = NSFC.getMoneyPageContent(h); return c ? { kind: 'compare', content: c, node: <NSFMoney content={c} /> } : null; },
    support: (h) => { const c = NSFC.getSupportPageContent(h); return c ? { kind: 'plan', content: c, node: <NSFSupport content={c} /> } : null; },
    pages: { contact: () => <NSFContactPage />, faq: () => <NSFFAQPage />, privacy: () => <NSFPrivacyPolicyPage /> },
    legal: {},
    toursSubtitle: 'Naples street food, pizza and market tours compared on route, tastings and price.',
  },
};

/** Exact content match for a path, or null. */
export function resolveContent(def: PropertyDef, path: string): ResolvedContent | null {
  return def.money(path) ?? def.support(path);
}

/**
 * Nav hrefs and content hrefs drifted apart in several properties (e.g. the
 * nav links /private-cart-tour while the page lives at /money/private-cart-tour).
 * Returns the canonical path a drifted href should permanently redirect to.
 */
export function findCanonicalContentPath(def: PropertyDef, path: string): string | null {
  const bare = path.replace(/^\/(money|support)(?=\/)/, '');
  const candidates = [bare, `/money${bare}`, `/support${bare}`].filter((c) => c !== path);
  return candidates.find((c) => resolveContent(def, c)) ?? null;
}

/** Every content page the property actually has, keyed by its canonical path. */
export function allContent(def: PropertyDef): (ResolvedContent & { path: string })[] {
  const seen = new Set<string>();
  const out: (ResolvedContent & { path: string })[] = [];
  for (const href of def.hrefs) {
    const canonical = resolveContent(def, href) ? href : findCanonicalContentPath(def, href);
    if (!canonical || seen.has(canonical)) continue;
    const resolved = resolveContent(def, canonical);
    if (resolved) {
      seen.add(canonical);
      out.push({ ...resolved, path: canonical });
    }
  }
  return out;
}
