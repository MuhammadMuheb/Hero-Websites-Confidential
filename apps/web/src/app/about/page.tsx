import type { Metadata } from 'next';
import { getAllBlogPosts, getAllTours, getPageDoc, SITE_DOMAIN } from '@/lib/firestore';
import { AboutHero, ABOUT_HERO_IMAGE_ALT, ABOUT_HERO_IMAGE_URL } from '@/components/AboutHero';
import { OurTravelMantraSection } from '@/components/OurTravelMantraSection';
import { ExperiencesBannerSection } from '@/components/ExperiencesBannerSection';
import { WhoWritesThisSection } from '@/components/WhoWritesThisSection';
import { HowItStartedSection } from '@/components/HowItStartedSection';
import { HowWeChooseSection } from '@/components/HowWeChooseSection';
import { ExploreLinksSection } from '@/components/ExploreLinksSection';
import { AllDestinationsSection } from '@/components/AllDestinationsSection';

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
  const page = await safeGetPageDoc('about');
  if (!page) return {};
  return {
    title: page.metaTitle,
    description: page.metaDesc,
    alternates: { canonical: `https://${SITE_DOMAIN}/about` },
    openGraph: {
      title: page.metaTitle,
      description: page.metaDesc,
      url: `https://${SITE_DOMAIN}/about`,
      images: [{ url: ABOUT_HERO_IMAGE_URL, alt: ABOUT_HERO_IMAGE_ALT }],
    },
    twitter: { card: 'summary_large_image', images: [ABOUT_HERO_IMAGE_URL] },
  };
}

export default async function AboutPage() {
  const [tours, allBlogPosts] = await Promise.all([safeGetAllTours(), safeGetAllBlogPosts()]);

  return (
    <>
      <AboutHero />
      <OurTravelMantraSection />
      <ExperiencesBannerSection />
      <WhoWritesThisSection />
      <HowItStartedSection />
      <HowWeChooseSection />
      <ExploreLinksSection tours={tours} allBlogPosts={allBlogPosts} />
    </>
  );
}
