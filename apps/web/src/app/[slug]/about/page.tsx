import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getNetworkSite, SITE_DOMAIN } from '@/lib/tours';
import { NETWORK_PAGE_META } from '@/lib/network-page-meta';
import { AboutHero, ABOUT_HERO_IMAGE_URL, ABOUT_HERO_IMAGE_ALT } from '@/components/AboutHero';
import { OurTravelMantraSection } from '@/components/OurTravelMantraSection';
import { ExperiencesBannerSection } from '@/components/ExperiencesBannerSection';
import { WhoWritesThisSection } from '@/components/WhoWritesThisSection';
import { HowItStartedSection } from '@/components/HowItStartedSection';
import { HowWeChooseSection } from '@/components/HowWeChooseSection';
import { ExploreLinksSection } from '@/components/ExploreLinksSection';
import { getAllTours, getAllBlogPosts, type TourDoc, type BlogPostDoc } from '@/lib/firestore';
import { getAboutContent } from '@/lib/sites/about';

interface Props {
  params: Promise<{ slug: string }>;
}

export const dynamic = 'force-dynamic';

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const site = getNetworkSite(slug);
  if (!site) return {};

  const meta = NETWORK_PAGE_META[slug]?.pages.about;
  const title = meta?.title ?? `About ${site.name}`;
  const description = meta?.description ?? `Learn about ${site.name} — our story, values, and commitment to authentic experiences.`;

  return {
    title: { absolute: title },
    description,
    alternates: { canonical: `https://${SITE_DOMAIN}/${slug}/about` },
    openGraph: {
      title,
      description,
      url: `https://${SITE_DOMAIN}/${slug}/about`,
      images: [{ url: 'https://images.unsplash.com/photo-1668171321834-658179e37f5e?w=1200&h=630&fit=crop&q=80&auto=format', width: 1200, height: 630 }],
    },
  };
}

export default async function PropertyAboutPage({ params }: Props) {
  const { slug } = await params;
  const site = getNetworkSite(slug);

  if (!site) {
    notFound();
  }

  // Temporary: fetch tours and blog for ExploreLinksSection
  let tours: TourDoc[] = [];
  let allBlogPosts: BlogPostDoc[] = [];
  try {
    [tours, allBlogPosts] = await Promise.all([getAllTours(), getAllBlogPosts()]);
  } catch (e) {
    console.error('Error fetching tours/blogs for about page:', e);
  }

  // Site-specific about content - for now, Private Vatican
  const aboutContent = {
    'private-vatican': {
      title: 'Private & Early-Entry Vatican, Walked and Understood by Local Guides',
      description: 'Honest comparisons of Vatican Museums, Sistine Chapel, and St. Peter\'s — skip-the-line options, private guides, and what each choice actually includes.',
      imageUrl: 'https://images.unsplash.com/photo-1576016770956-debb63d92058?w=1600&q=80',
      imageAlt: 'The Sistine Chapel ceiling frescoes during a quiet early-entry visit',
      homeHref: `/${slug}`,
    },
  }[slug] || {
    title: `About ${site.name}`,
    description: `Our story, values, and commitment to authentic, first-hand experiences across ${site.name.toLowerCase()}.`,
    imageUrl: ABOUT_HERO_IMAGE_URL,
    imageAlt: ABOUT_HERO_IMAGE_ALT,
    homeHref: `/${slug}`,
  };

  return (
    <>
      <AboutHero
        title={aboutContent.title}
        description={aboutContent.description}
        imageUrl={aboutContent.imageUrl}
        imageAlt={aboutContent.imageAlt}
        homeHref={aboutContent.homeHref}
      />
      <OurTravelMantraSection />
      <ExperiencesBannerSection />
      <WhoWritesThisSection />
      <HowItStartedSection />
      <HowWeChooseSection />
      <ExploreLinksSection tours={tours} allBlogPosts={allBlogPosts} />
    </>
  );
}
