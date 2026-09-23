import type { Metadata } from 'next';
import { notFound, permanentRedirect } from 'next/navigation';
import { PDTToursCategoryPage } from '@/components/pompeii-day-trip/PDTToursCategoryPage';
import { POMPEII_AREAS } from '@/components/pompeii-day-trip/PDTNeighborhoodsPage';
import { NetworkLegalPage, genericLegalDoc } from '@/components/network/NetworkLegalPage';
import { NetworkAreaPage, NetworkGuidesPage, NetworkToursPage, type HubGuide } from '@/components/network/NetworkHubPages';
import { getNetworkSite, SITE_DOMAIN } from '@/lib/tours';
import { NETWORK_PAGE_META } from '@/lib/network-page-meta';
import { PROPERTIES, allContent, findCanonicalContentPath, resolveContent, type PropertyDef, type StandardPage } from './registry';

/**
 * Every sub-path of the 12 bespoke network properties (Street Food Rome, the
 * ACTIVE_NETWORK_SLUG, is rewritten to the root site by middleware.ts, and
 * /{property}/about has its own route). Each property is one PROPERTIES entry
 * in ./registry: its money/support content, bespoke page components, and data
 * for the shared network pages that fill any gaps. Unknown paths get a real
 * 404 status; drifted content hrefs 308 to their canonical path.
 */

const STANDARD_PAGES: StandardPage[] = ['contact', 'faq', 'privacy', 'terms', 'cookie-policy', 'affiliate-disclosure', 'tours', 'blog', 'neighborhoods'];
const PDT_TOUR_CATEGORIES = ['rome', 'naples', 'vesuvius', 'herculaneum'];

type Resolution =
  | { type: 'content'; path: string }
  | { type: StandardPage }
  | { type: 'tour-category'; category: string }
  | { type: 'area'; area: { slug: string; name: string; description: string } }
  | { type: 'redirect'; to: string }
  | null;

function supportsPage(def: PropertyDef, page: StandardPage): boolean {
  // Area guides only exist where the property has real per-area content.
  return page !== 'neighborhoods' || Boolean(def.pages.neighborhoods);
}

function resolve(slug: string, def: PropertyDef, path: string): Resolution {
  if (resolveContent(def, path)) return { type: 'content', path };

  const page = path.slice(1) as StandardPage;
  if (STANDARD_PAGES.includes(page) && supportsPage(def, page)) return { type: page };

  if (slug === 'pompeii-day-trip') {
    const category = path.match(/^\/tours\/category\/([a-z-]+)$/)?.[1];
    if (category && PDT_TOUR_CATEGORIES.includes(category)) return { type: 'tour-category', category };
    const areaSlug = path.match(/^\/neighborhoods\/([a-z-]+)$/)?.[1];
    const area = POMPEII_AREAS.find((a) => a.slug === areaSlug);
    if (area) return { type: 'area', area };
  }

  const canonical = findCanonicalContentPath(def, path);
  if (canonical) return { type: 'redirect', to: `/${slug}${canonical}` };

  return null;
}

function toGuide(item: ReturnType<typeof allContent>[number]): HubGuide {
  const c = item.content;
  return {
    href: item.path,
    title: c.h1 || c.navTitle || c.metaTitle,
    description: c.metaDescription,
    image: c.heroImage,
    kind: item.kind,
  };
}

function contactEmail(slug: string): string {
  return `hello@${slug.replace(/-/g, '')}.com`;
}

export async function generateStaticParams() {
  return Object.entries(PROPERTIES).flatMap(([slug, def]) => {
    const paths = [
      ...allContent(def).map((c) => c.path),
      ...STANDARD_PAGES.filter((p) => supportsPage(def, p)).map((p) => `/${p}`),
      ...(slug === 'pompeii-day-trip'
        ? [...PDT_TOUR_CATEGORIES.map((c) => `/tours/category/${c}`), ...POMPEII_AREAS.map((a) => `/neighborhoods/${a.slug}`)]
        : []),
    ];
    return paths.map((p) => ({ slug, rest: p.slice(1).split('/') }));
  });
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string; rest: string[] }> }): Promise<Metadata> {
  const { slug, rest } = await params;
  const site = getNetworkSite(slug);
  const def = PROPERTIES[slug];
  if (!site || !def) return {};

  const path = `/${rest.join('/')}`;
  const resolved = resolve(slug, def, path);
  if (!resolved || resolved.type === 'redirect') return { robots: { index: false, follow: true } };

  const canonical = `https://${SITE_DOMAIN}/${slug}${path}`;
  const brand = NETWORK_PAGE_META[slug]?.brand ?? site.name;
  let title: string;
  let description: string;
  let image: string | undefined;

  if (resolved.type === 'content') {
    const { content } = resolveContent(def, path)!;
    title = content.metaTitle;
    description = content.metaDescription;
    image = content.heroImage?.src;
  } else if (resolved.type === 'tour-category') {
    const label = resolved.category.charAt(0).toUpperCase() + resolved.category.slice(1);
    title = `${label} Pompeii Tours | ${brand}`;
    description = `Pompeii tours that include or start from ${label}, compared on transit time, time on site and price.`;
  } else if (resolved.type === 'area') {
    title = `${resolved.area.name}, Pompeii — What to See | ${brand}`;
    description = `${resolved.area.description}. Where it sits on the site and how to fit it into a Pompeii day trip.`;
  } else {
    const meta = NETWORK_PAGE_META[slug]?.pages[resolved.type];
    title = meta?.title ?? `${site.name}`;
    description = meta?.description ?? '';
  }

  image ??= def.heroImage.src;
  const images = image ? [{ url: `${image}?w=1200&h=630&fit=crop&q=80&auto=format`, width: 1200, height: 630 }] : undefined;
  return {
    title: { absolute: title },
    description,
    alternates: { canonical },
    openGraph: { title, description, url: canonical, siteName: brand, type: 'website', ...(images ? { images } : {}) },
    twitter: { card: 'summary_large_image', title, description },
  };
}

function pageLabel(slug: string, def: PropertyDef, resolved: Exclude<Resolution, null | { type: 'redirect' }>): string {
  if (resolved.type === 'content') {
    const { content } = resolveContent(def, resolved.path)!;
    return content.navTitle || content.h1 || content.metaTitle;
  }
  if (resolved.type === 'tour-category') return `${resolved.category.charAt(0).toUpperCase()}${resolved.category.slice(1)} tours`;
  if (resolved.type === 'area') return resolved.area.name;
  return (NETWORK_PAGE_META[slug]?.pages[resolved.type]?.title ?? resolved.type).split(' | ')[0] ?? resolved.type;
}

export default async function NetworkSiteSubPage({ params }: { params: Promise<{ slug: string; rest: string[] }> }) {
  const { slug, rest } = await params;
  const site = getNetworkSite(slug);
  const def = PROPERTIES[slug];
  if (!site || !def) notFound();

  const path = `/${rest.join('/')}`;
  const resolved = resolve(slug, def, path);
  if (!resolved) notFound();
  if (resolved.type === 'redirect') permanentRedirect(resolved.to);

  const brand = NETWORK_PAGE_META[slug]?.brand ?? site.name;
  const base = `https://${SITE_DOMAIN}/${slug}`;
  const breadcrumbs = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: brand, item: base },
      { '@type': 'ListItem', position: 2, name: pageLabel(slug, def, resolved), item: `${base}${path}` },
    ],
  };

  return (
    <>
      {/* Money/support templates already emit their own BreadcrumbList. */}
      {resolved.type !== 'content' ? (
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbs) }} />
      ) : null}
      {renderPage(slug, def, resolved, brand)}
    </>
  );
}

function renderPage(slug: string, def: PropertyDef, resolved: Exclude<Resolution, null | { type: 'redirect' }>, brand: string) {
  switch (resolved.type) {
    case 'content':
      return resolveContent(def, resolved.path)!.node;
    case 'tour-category':
      return <PDTToursCategoryPage category={resolved.category} />;
    case 'area':
      return (
        <NetworkAreaPage
          scope={def.scope}
          area={resolved.area}
          guides={allContent(def).filter((c) => c.kind === 'plan').map(toGuide)}
        />
      );
    case 'tours':
      return (
        def.pages.tours?.() ?? (
          <NetworkToursPage
            scope={def.scope}
            siteName={brand}
            title={(NETWORK_PAGE_META[slug]?.pages.tours?.title ?? 'Featured Tours').split(' | ')[0] ?? 'Featured Tours'}
            subtitle={def.toursSubtitle}
            tours={def.tours}
            guides={allContent(def).map(toGuide)}
          />
        )
      );
    case 'blog':
      return (
        def.pages.blog?.() ?? (
          <NetworkGuidesPage
            scope={def.scope}
            siteName={brand}
            title="Guides & planning tips"
            subtitle={`Everything we’ve written for ${brand}: honest comparisons and first-hand planning advice.`}
            guides={allContent(def).map(toGuide)}
          />
        )
      );
    case 'terms':
    case 'cookie-policy':
    case 'affiliate-disclosure': {
      const bespoke = def.pages[resolved.type]?.();
      if (bespoke) return bespoke;
      const doc = def.legal[resolved.type] ?? genericLegalDoc(resolved.type, brand, contactEmail(slug));
      return <NetworkLegalPage scope={def.scope} doc={doc} />;
    }
    default: {
      const page = def.pages[resolved.type]?.();
      if (!page) notFound();
      return page;
    }
  }
}
