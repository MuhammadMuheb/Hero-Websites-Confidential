import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { SITE_DOMAIN, getAllBlogPosts } from '@/lib/firestore';
import { getNetworkSite } from '@/lib/tours';
import { getAboutContent } from '@/lib/sites/about';
import { getHomeContent } from '@/lib/sites/home';
import { AboutHero } from '@/components/AboutHero';
import { OurTravelMantraSection } from '@/components/OurTravelMantraSection';
import { ExperiencesBannerSection } from '@/components/ExperiencesBannerSection';
import { WhoWritesThisSection } from '@/components/WhoWritesThisSection';
import { HowItStartedSection } from '@/components/HowItStartedSection';
import { HowWeChooseSection } from '@/components/HowWeChooseSection';
import { ExploreLinksSection } from '@/components/ExploreLinksSection';

interface Props {
  params: Promise<{ slug: string }>;
}

export const revalidate = 3600;

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const site = getNetworkSite(slug);
  const about = getAboutContent(slug);
  if (!site || !about) return {};

  const url = `https://${SITE_DOMAIN}/${slug}/about`;
  return {
    title: { absolute: about.metaTitle },
    description: about.metaDescription,
    alternates: { canonical: url },
    openGraph: {
      title: about.metaTitle,
      description: about.metaDescription,
      url,
      images: [{ url: about.hero.image.src, width: 1200, height: 630, alt: about.hero.image.alt }],
    },
    twitter: { card: 'summary_large_image', images: [about.hero.image.src] },
  };
}

/**
 * Same sections, same order, same components as the Street Food Rome /about
 * page. Only text and images change (see src/lib/sites/about.ts).
 */
export default async function PropertyAboutPage({ params }: Props) {
  const { slug } = await params;
  const site = getNetworkSite(slug);
  const about = getAboutContent(slug);
  const home = getHomeContent(slug);
  if (!site || !about || !home) notFound();

  const allBlogPosts = await getAllBlogPosts().catch(() => []);

  return (
    <>
      <AboutHero
        title={about.hero.title}
        description={about.hero.description}
        imageUrl={about.hero.image.src}
        imageAlt={about.hero.image.alt}
        homeHref={`/${slug}`}
      />
      <OurTravelMantraSection
        points={about.mantra.points}
        thirdTitle={about.mantra.thirdTitle}
        thirdParagraphs={about.mantra.thirdParagraphs}
        images={about.mantra.images}
      />
      <ExperiencesBannerSection
        title={about.banner.title}
        description={about.banner.description}
        ctaLabel={about.banner.ctaLabel}
        ctaHref={about.banner.ctaHref}
        imageUrl={about.banner.image.src}
        imageAlt={about.banner.image.alt}
      />
      <WhoWritesThisSection
        name={about.whoWrites.name}
        bio={about.whoWrites.bio}
        closingLine={about.whoWrites.closingLine}
        imageUrl={about.whoWrites.image.src}
        imageAlt={about.whoWrites.image.alt}
      />
      <HowItStartedSection subtitle={about.howItStarted.subtitle} cards={about.howItStarted.cards} />
      <HowWeChooseSection subtitle={about.howWeChoose.subtitle} steps={about.howWeChoose.steps} />
      <ExploreLinksSection
        tours={home.tours}
        allBlogPosts={allBlogPosts}
        title={about.places.title}
        attractions={about.places.attractions}
        topTours={about.places.topTours}
      />
    </>
  );
}
