import type { Metadata } from 'next';
import { getAllBlogPosts, getAllTours, getPageDoc, SITE_DOMAIN } from '@/lib/firestore';
import { HomePageBody } from '@/components/HomePageBody';

export const dynamic = 'force-dynamic';

async function safeGetPageDoc(slug: string) {
  try {
    return await getPageDoc(slug);
  } catch (error) {
    console.error(`Error fetching page doc for ${slug}:`, error);
    return null;
  }
}

async function safeGetAllTours() {
  try {
    return await getAllTours();
  } catch (error) {
    console.error('Error fetching tours:', error);
    return [];
  }
}

async function safeGetAllBlogPosts() {
  try {
    return await getAllBlogPosts();
  } catch (error) {
    console.error('Error fetching blog posts:', error);
    return [];
  }
}

export async function generateMetadata(): Promise<Metadata> {
  const page = await safeGetPageDoc('home');
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

// Fallback hero image for the homepage if Firestore doc doesn't have one
const HOME_HERO_IMAGE_URL = 'https://images.unsplash.com/photo-1555939594-58d7cb561552';

export default async function HomePage() {
  const [page, tours, allBlogPosts] = await Promise.all([
    safeGetPageDoc('home'),
    safeGetAllTours(),
    safeGetAllBlogPosts(),
  ]);

  return (
    <HomePageBody
      siteName="Street Food Rome"
      canonicalUrl={`https://${SITE_DOMAIN}/`}
      heroImageUrl={page?.heroImageUrl ?? HOME_HERO_IMAGE_URL}
      tours={tours}
      allBlogPosts={allBlogPosts}
    />
  );
}
