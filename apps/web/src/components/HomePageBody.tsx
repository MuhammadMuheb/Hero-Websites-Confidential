import { Hero } from '@/components/Hero';
import { TrustPointsSection } from '@/components/TrustPointsSection';
import { HowWeChooseDark } from '@/components/HowWeChooseDark';
import { ExploreLinksSection } from '@/components/ExploreLinksSection';
import { TourCarouselSection } from '@/components/TourCarouselSection';
import { CategoryToursSection } from '@/components/CategoryToursSection';
import { AllDestinationsSection } from '@/components/AllDestinationsSection';
import type { BlogPostDoc, TourDoc } from '@/lib/firestore';
import type { SiteConfig } from '@/lib/sites/config';
import { tourHref } from '@/lib/tours';

interface HomePageBodyProps {
  siteName: string;
  canonicalUrl: string;
  heroImageUrl: string | null;
  tours: TourDoc[];
  allBlogPosts?: BlogPostDoc[];
  config?: SiteConfig;
}

/**
 * Shared homepage template: §4 blueprint layout A-I with section IDs.
 * A: Navbar (handled in layout)
 * B: Hero (§4-B)
 * C: Trust strip (§4-C)
 * D: Top tours slider (§4-D)
 * G: Top items to try (§4-G)
 * E: How we choose (§4-E)
 * H: Places to plan next trip (§4-H)
 * I: Explore our Italy collection (§4-I)
 * J: Footer (handled in layout)
 */
export function HomePageBody({ siteName, canonicalUrl, heroImageUrl, tours, allBlogPosts = [], config }: HomePageBodyProps) {
  const jsonLd = [
    {
      '@context': 'https://schema.org',
      '@type': 'WebSite',
      name: siteName,
      url: canonicalUrl,
    },
    {
      '@context': 'https://schema.org',
      '@type': 'Organization',
      name: siteName,
      url: canonicalUrl,
    },
    {
      '@context': 'https://schema.org',
      '@type': 'ItemList',
      itemListElement: tours.slice(0, 19).map((tour, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        url: `${canonicalUrl.replace(/\/$/, '')}${tourHref(tour.slug)}`,
        name: tour.title,
      })),
    },
  ];

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      {/* 1-3: Hero + search bar on its edge + one chips row (id="hero" is on the section) */}
      <Hero imageUrl={heroImageUrl} />

      {/* 4: Names strip - real booking platforms only */}
      <div id="partners">
        <TrustPointsSection items={config?.namesStrip} />
      </div>

      {/* 5: Top Food Tours slider - 4 full cards */}
      <div id="popular">
        <TourCarouselSection tours={tours} />
      </div>

      {/* 6: Top Food Items to Try - 5 rows (1 big + 3 small) */}
      <div id="categories">
        <CategoryToursSection tours={tours} categories={config?.categories?.map(c => ({ name: c.name, slug: c.slug, imageUrl: c.imageUrl, tourSlugs: c.tourSlugs }))} />
      </div>

      {/* 7: How We Choose - dark section, 4 gold icons */}
      <div id="how-we-choose">
        <HowWeChooseDark items={config?.howWeChoose} />
      </div>

      {/* 8: Places You Can Plan Your Next Trip - 3 tabs */}
      <div id="places">
        <ExploreLinksSection tours={tours} allBlogPosts={allBlogPosts} />
      </div>

      {/* 9: Our Network - all sites */}
      <div id="network">
        <AllDestinationsSection />
      </div>
    </>
  );
}
