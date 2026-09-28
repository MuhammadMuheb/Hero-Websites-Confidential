import type { Metadata } from 'next';
import { notFound, permanentRedirect } from 'next/navigation';
import { POMPEII_AREAS, PDT_TOUR_CATEGORIES, getAreaHub, pompeiiCategoryTourSlugs } from '@/lib/sites/areas';
import { NetworkLegalPage, genericLegalDoc } from '@/components/network/NetworkLegalPage';
import { NetworkToursPage, type HubGuide } from '@/components/network/NetworkHubPages';
import { getNetworkSite, SITE_DOMAIN } from '@/lib/tours';
import { NETWORK_PAGE_META } from '@/lib/network-page-meta';
import { getHomeContent, getSiteAssets, getSiteExtras } from '@/lib/sites/home';
import type { TourDoc } from '@/lib/firestore';
import {
  MasterAreaPage,
  MasterAreasPage,
  MasterContactPage,
  MasterContentPage,
  MasterFAQPage,
  MasterGuidesPage,
  MasterToursPage,
  normalizeContent,
} from '@/components/master/MasterPages';
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
const PDT_CATEGORY_SLUGS = PDT_TOUR_CATEGORIES.map((c) => c.slug);

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
    if (category && PDT_CATEGORY_SLUGS.includes(category)) return { type: 'tour-category', category };
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

export const dynamic = 'force-dynamic';

export async function generateStaticParams() {
  return Object.entries(PROPERTIES).flatMap(([slug, def]) => {
    const paths = [
      ...allContent(def).map((c) => c.path),
      ...STANDARD_PAGES.filter((p) => supportsPage(def, p)).map((p) => `/${p}`),
      ...(slug === 'pompeii-day-trip'
        ? [...PDT_CATEGORY_SLUGS.map((c) => `/tours/category/${c}`), ...POMPEII_AREAS.map((a) => `/neighborhoods/${a.slug}`)]
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
    const cat = PDT_TOUR_CATEGORIES.find((c) => c.slug === resolved.category);
    title = `${cat?.title ?? 'Pompeii'} Tours | ${brand}`;
    description = cat?.description ?? 'Pompeii tours compared on transit time, time on site and price.';
  } else if (resolved.type === 'area') {
    title = `${resolved.area.name}, Pompeii — What to See | ${brand}`;
    description = `${resolved.area.description.replace(/\.$/, '')}. Where it sits on the site and how to fit it into a Pompeii day trip.`;
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
  if (resolved.type === 'tour-category') return PDT_TOUR_CATEGORIES.find((c) => c.slug === resolved.category)?.title ?? 'Tours';
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
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbs) }} />
      {renderPage(slug, def, resolved, brand)}
    </>
  );
}

/** Tours for a content page: the ones the homepage shows for that page, else the first 4. */
function toursForPath(slug: string, path: string): TourDoc[] {
  const home = getHomeContent(slug);
  if (!home) return [];
  const bySlug = new Map(home.tours.map((t) => [t.slug, t]));
  const category = home.categories.find((c) => c.href === path);
  const picked = category ? category.tourSlugs.map((s) => bySlug.get(s)).filter((t): t is TourDoc => Boolean(t)) : [];
  const rest = home.tours.filter((t) => !picked.includes(t));
  return [...picked, ...rest].slice(0, 4);
}

/**
 * Every network sub-page renders the Street Food Rome master design
 * (src/components/master/MasterPages.tsx). Only text, images and tours change.
 */
function renderPage(slug: string, def: PropertyDef, resolved: Exclude<Resolution, null | { type: 'redirect' }>, brand: string) {
  const home = getHomeContent(slug);
  const extras = getSiteExtras(slug);
  const siteName = home?.siteName ?? brand;
  const heroImage = home?.heroImage.src ?? def.heroImage.src;
  const guides = allContent(def).map(toGuide);

  switch (resolved.type) {
    case 'content': {
      const found = resolveContent(def, resolved.path)!;
      const content = normalizeContent(found.content, found.kind, resolved.path);
      // Some sites (Amalfi, Tivoli) only have short page data: never render an empty page.
      if (content.intro.length === 0 && content.sections.length === 0 && content.description) content.intro = [content.description];
      if (content.faqs.length === 0 && extras) content.faqs = extras.faqs.slice(0, 5);
      return (
        <MasterContentPage
          content={content}
          siteName={siteName}
          tours={toursForPath(slug, resolved.path)}
          moreLinks={(home?.chips ?? []).slice(0, 12)}
        />
      );
    }
    case 'tour-category': {
      const cat = PDT_TOUR_CATEGORIES.find((c) => c.slug === resolved.category);
      const wanted = pompeiiCategoryTourSlugs(resolved.category);
      const tours = (home?.tours ?? []).filter((t) => wanted.includes(t.slug));
      return (
        <MasterToursPage
          siteName={siteName}
          heroImage={heroImage}
          title={`${cat?.title ?? 'Pompeii'} Tours`}
          subtitle={cat?.description ?? def.toursSubtitle}
          tours={tours}
          categories={PDT_TOUR_CATEGORIES.map((c) => ({ label: c.title, href: `/tours/category/${c.slug}` }))}
          guides={guides.filter((g) => g.kind === 'plan').map((g) => ({ label: g.title, href: g.href }))}
        />
      );
    }
    case 'area': {
      const others = POMPEII_AREAS.filter((a) => a.slug !== resolved.area.slug).map((a) => ({ label: a.name, href: `/neighborhoods/${a.slug}` }));
      return (
        <MasterAreaPage
          siteName={siteName}
          heroImage={heroImage}
          place="Pompeii"
          area={resolved.area}
          tours={(home?.tours ?? []).slice(0, 4)}
          otherAreas={[{ label: 'All areas', href: '/neighborhoods' }, ...others]}
          guides={guides.filter((g) => g.kind === 'plan').map((g) => ({ label: g.title, href: g.href }))}
        />
      );
    }
    case 'neighborhoods': {
      const hub = getAreaHub(slug);
      if (!hub) return def.pages.neighborhoods?.() ?? notFound();
      const gallery = getSiteAssets(slug)?.gallery ?? [];
      return (
        <MasterAreasPage
          siteName={siteName}
          heroImage={heroImage}
          title={hub.title}
          subtitle={hub.subtitle}
          eyebrow={hub.eyebrow}
          sectionTitle={hub.sectionTitle}
          areas={hub.areas.map((a, i) => ({
            name: a.name,
            description: a.description,
            href: a.href ?? `/neighborhoods/${a.slug}`,
            image: gallery.length > 0 ? gallery[i % gallery.length] : undefined,
          }))}
          tours={(home?.tours ?? []).slice(0, 4)}
          guides={guides.filter((g) => g.kind === 'plan').map((g) => ({ label: g.title, href: g.href }))}
        />
      );
    }
    case 'tours':
      return home ? (
        <MasterToursPage
          siteName={siteName}
          heroImage={heroImage}
          title={(NETWORK_PAGE_META[slug]?.pages.tours?.title ?? `${siteName} Tours`).split(' | ')[0] ?? `${siteName} Tours`}
          subtitle={def.toursSubtitle}
          tours={home.tours}
          categories={home.categories.filter((c) => c.href !== '/tours').map((c) => ({ label: c.name, href: c.href }))}
          guides={guides.filter((g) => g.kind === 'plan').map((g) => ({ label: g.title, href: g.href }))}
        />
      ) : (
        <NetworkToursPage siteName={brand} title="Featured Tours" subtitle={def.toursSubtitle} tours={def.tours} guides={guides} />
      );
    case 'blog':
      return <MasterGuidesPage siteName={siteName} heroImage={heroImage} guides={guides} />;
    case 'faq':
      return extras ? (
        <MasterFAQPage siteName={siteName} city={extras.city} heroImage={heroImage} faqs={extras.faqs} />
      ) : (
        def.pages.faq?.() ?? notFound()
      );
    case 'contact':
      return extras ? (
        <MasterContactPage siteName={siteName} city={extras.city} heroImage={heroImage} email={extras.contactEmail} faqs={extras.faqs} />
      ) : (
        def.pages.contact?.() ?? notFound()
      );
    case 'privacy': {
      if (extras?.privacy) return <NetworkLegalPage doc={extras.privacy} />;
      const page = def.pages.privacy?.();
      if (!page) notFound();
      return page;
    }
    case 'terms':
    case 'cookie-policy':
    case 'affiliate-disclosure': {
      const doc = def.legal[resolved.type] ?? genericLegalDoc(resolved.type, siteName, extras?.contactEmail ?? contactEmail(slug));
      return <NetworkLegalPage doc={doc} />;
    }
    default:
      notFound();
  }
}
