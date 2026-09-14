import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { UnderConstructionNotice } from '@/components/UnderConstructionNotice';
import { MoneyPageTemplate } from '@/components/underground-colosseum/MoneyPageTemplate';
import { SupportPageTemplate } from '@/components/underground-colosseum/SupportPageTemplate';
import { UCAboutPage } from '@/components/underground-colosseum/UCAboutPage';
import { UCContactPage } from '@/components/underground-colosseum/UCContactPage';
import { ACTIVE_NETWORK_SLUG, getNetworkSite } from '@/lib/tours';
import { getMoneyPageContent, getSupportPageContent } from '@/lib/underground-colosseum-content';
import { ARENA_FLOOR_PAGE, MONEY_PAGES, SUPPORT_PAGES, WORTH_IT_PAGE } from '@/lib/underground-colosseum';
import { SITE_DOMAIN } from '@/lib/firestore';

/**
 * Catches every sub-path under a network property that isn't the platform's
 * ACTIVE_NETWORK_SLUG test site. Underground Colosseum is special-cased
 * here too (alongside its root page.tsx): its 5 money pages, 6 support
 * pages, /about, and /contact are real, indexable content — built from the
 * site's blueprint — so those specific paths render their real templates.
 * Anything else under this property (e.g. /go/:slug, the affiliate redirect
 * handler, which is a separate infrastructure feature, not a content page)
 * still falls through to the "under construction" placeholder below, same
 * as every other not-yet-built network property's sub-paths.
 */
const BESPOKE_HERO_SLUG = 'underground-colosseum';

// Pre-renders Underground Colosseum's 13 real sub-paths (5 money + 6 support
// + about + contact) at build time, matching the pattern the root [slug]
// page and /tours/[slug] already use (generateStaticParams off a static
// registry). Everything else this catch-all handles (other network sites'
// placeholder sub-paths, /go/:slug, etc.) is intentionally left out —
// dynamicParams defaults to true, so those still render on-demand exactly as
// before; this only removes the per-request render cost for the pages that
// are actually real, indexable content (doc 00's "SSG/ISR" baseline).
export async function generateStaticParams() {
  const hrefs = [
    ...MONEY_PAGES.map((p) => p.href),
    ...SUPPORT_PAGES.map((p) => p.href),
    ARENA_FLOOR_PAGE.href,
    WORTH_IT_PAGE.href,
    '/about',
    '/contact',
  ];
  return hrefs.map((href) => ({ slug: 'underground-colosseum', rest: [href.replace(/^\//, '')] }));
}

function resolveUndergroundColosseumPage(path: string) {
  const money = getMoneyPageContent(path);
  if (money) return { type: 'money' as const, content: money };

  const support = getSupportPageContent(path);
  if (support) return { type: 'support' as const, content: support };

  if (path === '/about') return { type: 'about' as const };
  if (path === '/contact') return { type: 'contact' as const };

  return null;
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string; rest: string[] }> }): Promise<Metadata> {
  const { slug, rest } = await params;
  const site = getNetworkSite(slug);
  if (!site) return {};

  if (site.slug === BESPOKE_HERO_SLUG) {
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

    return { title: `${site.name} | Page Not Found`, robots: { index: false, follow: false } };
  }

  if (site.slug === ACTIVE_NETWORK_SLUG) return {};
  return { title: `${site.name} | Page Not Found`, robots: { index: false, follow: false } };
}

export default async function NetworkSiteSubPage({ params }: { params: Promise<{ slug: string; rest: string[] }> }) {
  const { slug, rest } = await params;
  const site = getNetworkSite(slug);
  if (!site) notFound();

  if (site.slug === BESPOKE_HERO_SLUG) {
    const path = `/${rest.join('/')}`;
    const resolved = resolveUndergroundColosseumPage(path);

    if (resolved?.type === 'money') return <MoneyPageTemplate content={resolved.content} />;
    if (resolved?.type === 'support') return <SupportPageTemplate content={resolved.content} />;
    if (resolved?.type === 'about') return <UCAboutPage />;
    if (resolved?.type === 'contact') return <UCContactPage />;

    return <UnderConstructionNotice siteName={site.name} />;
  }

  if (site.slug === ACTIVE_NETWORK_SLUG) notFound();

  return <UnderConstructionNotice siteName={site.name} />;
}
