import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { SITE_DOMAIN, getAllBlogPosts } from '@/lib/firestore';
import { HomePageBody } from '@/components/HomePageBody';
import { getNetworkSite, NETWORK_SITES } from '@/lib/tours';
import { getHomeContent } from '@/lib/sites/home';

export const revalidate = 3600;

export function generateStaticParams() {
  // Street Food Rome is the root site ("/"); /street-food-rome redirects there.
  return NETWORK_SITES.filter((site) => site.slug !== 'street-food-rome').map((site) => ({ slug: site.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const site = getNetworkSite(slug);
  const home = getHomeContent(slug);
  if (!site || !home) return {};

  const url = `https://${SITE_DOMAIN}/${site.slug}`;
  return {
    title: { absolute: home.metaTitle },
    description: home.metaDescription,
    alternates: { canonical: url },
    openGraph: {
      title: home.metaTitle,
      description: home.metaDescription,
      url,
      images: [{ url: home.heroImage.src, width: 1200, height: 630, alt: home.heroImage.alt }],
    },
    twitter: { card: 'summary_large_image', images: [home.heroImage.src] },
  };
}

/**
 * Every network site renders the SAME homepage as Street Food Rome (the master):
 * same sections, same order, same components. Only the text, images and tours
 * change, and they come from the site's own data (see src/lib/sites/home.ts).
 */
export default async function NetworkSitePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const site = getNetworkSite(slug);
  const home = getHomeContent(slug);
  if (!site || !home) notFound();

  const allBlogPosts = await getAllBlogPosts().catch(() => []);

  return (
    <HomePageBody
      siteName={home.siteName}
      canonicalUrl={`https://${SITE_DOMAIN}/${slug}`}
      heroImageUrl={home.heroImage.src}
      tours={home.tours}
      allBlogPosts={allBlogPosts}
      home={home}
    />
  );
}
