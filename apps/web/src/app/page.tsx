import type { Metadata } from 'next';
import { getAllBlogPosts, getAllTours, getPageDoc, SITE_DOMAIN } from '@/lib/firestore';
import { HomePageBody } from '@/components/HomePageBody';

export const dynamic = 'force-dynamic';

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

export default async function HomePage() {
  const [page, tours, allBlogPosts] = await Promise.all([getPageDoc('home'), getAllTours(), getAllBlogPosts()]);

  return (
    <HomePageBody
      siteName="Street Food Rome"
      canonicalUrl={`https://${SITE_DOMAIN}/`}
      heroImageUrl={page?.heroImageUrl ?? null}
      tours={tours}
      allBlogPosts={allBlogPosts}
    />
  );
}
