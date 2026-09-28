import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { SITE_DOMAIN, getAllBlogPosts } from '@/lib/firestore';
import { HomePageBody } from '@/components/HomePageBody';
import { NetworkHomeTemplate } from '@/components/NetworkHomeTemplate';
import { getNetworkSite, NETWORK_SITES } from '@/lib/tours';
import { getSiteConfig } from '@/lib/sites';
import { getSiteData } from '@/lib/sites/loader';
import { PROPERTIES } from '@/app/[slug]/[...rest]/registry';

export const revalidate = 3600;

export function generateStaticParams() {
  return NETWORK_SITES.map((site) => ({ slug: site.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const site = getNetworkSite(slug);
  const def = PROPERTIES[slug];
  if (!site || !def) return {};

  const title = site.name;
  const description = `Curated ${site.name} tours and local experiences`;
  const ogImage = def.heroImage.src;

  return {
    title: { absolute: title },
    description,
    alternates: { canonical: `https://${SITE_DOMAIN}/${site.slug}` },
    openGraph: {
      title,
      description,
      url: `https://${SITE_DOMAIN}/${site.slug}`,
      images: [{ url: ogImage, width: 1200, height: 630, alt: title }],
    },
    twitter: { card: 'summary_large_image', images: [ogImage] },
  };
}

export default async function NetworkSitePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const site = getNetworkSite(slug);
  const config = getSiteConfig(slug);
  const def = PROPERTIES[slug];
  if (!site || !def) notFound();

  // Check if config has full homepage data (chips, categories, etc.)
  const hasFullConfig = config?.chips && config?.categories && config?.howWeChoose;

  // Use NetworkHomeTemplate for incomplete configs (Part C work in progress)
  if (!hasFullConfig) {
    const hubTours = def.tours.map((tour) => ({
      partner: tour.partner,
      slug: tour.slug,
      title: tour.title,
      meta: tour.meta,
      priceFrom: tour.priceFrom,
      badge: tour.badge,
      image: tour.image,
    }));

    return (
      <NetworkHomeTemplate
        siteName={site.name}
        heroImageUrl={def.heroImage.src}
        heroTitle={site.name}
        tours={hubTours}
        description={`Curated ${site.name} experiences`}
      />
    );
  }

  // Use HomePageBody for sites with complete config
  const siteData = await getSiteData(slug);
  const siteTours = siteData.FEATURED_TOURS ?? [];
  const allBlogPosts = await getAllBlogPosts().catch(() => []);

  return (
    <HomePageBody
      siteName={site.name}
      canonicalUrl={`https://${SITE_DOMAIN}/${slug}`}
      heroImageUrl={def.heroImage.src}
      tours={siteTours}
      allBlogPosts={allBlogPosts}
      config={config}
    />
  );
}
