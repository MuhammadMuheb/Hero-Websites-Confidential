import type { Metadata } from 'next';
import { getAllBlogPosts, getAllTours, getPageDoc, SITE_DOMAIN } from '@/lib/firestore';
import { HomePageBody } from '@/components/HomePageBody';

export const revalidate = 3600;

export async function generateMetadata(): Promise<Metadata> {
  const page = await getPageDoc('home');
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
  const [page, tours, blogPosts] = await Promise.all([
    getPageDoc('home'),
    getAllTours(),
    getAllBlogPosts(),
  ]);

  return (
    <HomePageBody
      siteName="Street Food Rome"
      canonicalUrl={`https://${SITE_DOMAIN}/`}
      heroImageUrl={page?.heroImageUrl ?? HOME_HERO_IMAGE_URL}
      tours={tours}
      allBlogPosts={blogPosts}
    />
  );
}
