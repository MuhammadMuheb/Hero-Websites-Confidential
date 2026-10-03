import type { Metadata } from 'next';
import { getAllBlogPosts, getAllTours, getPageDoc, PROPERTY_SLUG, SITE_DOMAIN } from '@/lib/firestore';
import { getHomeContent } from '@/lib/home-content';
import { HomePageBody } from '@/components/HomePageBody';

export const dynamic = 'force-dynamic';

/** A Firestore failure must degrade the page, never break it. */
async function safe<T>(read: Promise<T>, fallback: T, what: string): Promise<T> {
  try {
    return await read;
  } catch (error) {
    console.error(`[home] ${what} failed, using fallback:`, error instanceof Error ? error.message : error);
    return fallback;
  }
}

export async function generateMetadata(): Promise<Metadata> {
  const page = await safe(getPageDoc('home'), null, 'page doc (metadata)');
  if (!page) return {};

  return {
    title: page.metaTitle,
    description: page.metaDesc,
    alternates: { canonical: `https://${SITE_DOMAIN}/` },
    openGraph: page.heroImageUrl
      ? {
          title: page.metaTitle,
          description: page.metaDesc,
          url: `https://${SITE_DOMAIN}/`,
          images: [{ url: page.heroImageUrl, alt: page.title }],
        }
      : undefined,
    twitter: page.heroImageUrl ? { card: 'summary_large_image', images: [page.heroImageUrl] } : undefined,
  };
}

const HOME_HERO_IMAGE_URL = 'https://images.unsplash.com/photo-1708628934823-a37e3fe0bb4e';

export default async function HomePage() {
  const [page, allTours, allBlogPosts, config] = await Promise.all([
    safe(getPageDoc('home'), null, 'page doc'),
    safe(getAllTours(), [], 'tours'),
    safe(getAllBlogPosts(), [], 'blog posts'),
    getHomeContent(), // never throws: falls back to the static config
  ]);

  // STRICT FILTERING: only this property's tours
  const tours = allTours.filter((t) => (t.propertySlug || PROPERTY_SLUG) === PROPERTY_SLUG);

  return (
    <HomePageBody
      siteName={config.name}
      canonicalUrl={`https://${SITE_DOMAIN}/`}
      heroImageUrl={page?.heroImageUrl ?? HOME_HERO_IMAGE_URL}
      tours={tours}
      allBlogPosts={allBlogPosts}
      config={config}
    />
  );
}
