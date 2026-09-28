import { Hero } from '@/components/Hero';
import { TrustPointsSection } from '@/components/TrustPointsSection';
import { MediaBar } from '@/components/MediaBar';
import { TourCarouselSection } from '@/components/TourCarouselSection';
import { CategoryToursSection } from '@/components/CategoryToursSection';
import { AllDestinationsSection } from '@/components/AllDestinationsSection';
import type { TourDoc } from '@/lib/firestore';
import { tourHref } from '@/lib/tours';

interface HomePageBodyProps {
  siteName: string;
  canonicalUrl: string;
  heroImageUrl: string | null;
  tours: TourDoc[];
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
export function HomePageBody({ siteName, canonicalUrl, heroImageUrl, tours }: HomePageBodyProps) {
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

      {/* §4-B: Hero */}
      <Hero imageUrl={heroImageUrl} />

      {/* §4-C: Trust strip - booking platforms only */}
      <section id="partners">
        <TrustPointsSection />
      </section>

      {/* §4-D: Top tours slider */}
      <section id="popular">
        <TourCarouselSection tours={tours} />
      </section>

      {/* §4-G: Top items to try - 5 rows of category + 3 tour cards */}
      <section id="categories">
        <CategoryToursSection tours={tours} />
      </section>

      {/* §4-E: How we choose - dark section with 4 icons */}
      <section id="how-we-choose">
        <MediaBar />
      </section>

      {/* §4-H: Places you can plan next trip - 3 tabs, numbered list */}
      <section id="places">
        <AllDestinationsSection />
      </section>

      {/* §4-I: Explore our Italy collection - white background, 4-column grid of 13 sites */}
      <section id="network" className="bg-white">
        {/* Network collection grid - to be implemented with site cards */}
      </section>
    </>
  );
}
