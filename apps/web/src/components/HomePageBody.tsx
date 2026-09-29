'use client';

import { useRef } from 'react';
import { Hero } from '@/components/Hero';
import { TrustPointsSection } from '@/components/TrustPointsSection';
import { HowWeChooseDark } from '@/components/HowWeChooseDark';
import { ExploreLinksSection } from '@/components/ExploreLinksSection';
import { TourCarouselSection } from '@/components/TourCarouselSection';
import { TourCard } from '@/components/cards/TourCard';
import { CategoryToursSection } from '@/components/CategoryToursSection';
import { AllDestinationsSection } from '@/components/AllDestinationsSection';
import type { BlogPostDoc, TourDoc } from '@/lib/firestore';
import type { SiteConfig } from '@/lib/sites/config';
import type { HomeContent } from '@/lib/sites/home';
import { tourHref } from '@/lib/tours';

interface HomePageBodyProps {
  siteName: string;
  canonicalUrl: string;
  heroImageUrl: string | null;
  tours: TourDoc[];
  allBlogPosts?: BlogPostDoc[];
  config?: SiteConfig;
  /** Network sites: full homepage copy + own tours. Omitted = Street Food Rome (master). */
  home?: HomeContent;
}

function AmalfiCarousel({ tours, home }: { tours: TourDoc[]; home?: HomeContent }) {
  const trackRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: -1 | 1) => {
    if (trackRef.current) {
      const cardWidth = trackRef.current.querySelector('a')?.offsetWidth || 0;
      const gap = 24;
      trackRef.current.scrollBy({ left: direction * (cardWidth + gap) * 4, behavior: 'smooth' });
    }
  };

  return (
    <section className="bg-cream-deep py-16 sm:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-wrap items-end justify-between gap-y-4 mb-12">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.24em] text-gold-deep">{home?.sliderEyebrow}</p>
            <h2 className="mt-3 font-hero text-[32px] font-black leading-tight tracking-[-0.02em] text-ink sm:text-[44px]">
              {home?.sliderTitle?.[0]} <span className="text-brand">{home?.sliderTitle?.[1]}</span> {home?.sliderTitle?.[2]}
            </h2>
          </div>
          <div className="flex gap-2">
            <button
              type="button"
              aria-label="Previous tours"
              onClick={() => scroll(-1)}
              className="flex h-10 w-10 items-center justify-center rounded-full border border-line bg-paper text-ink shadow-card hover:border-brand hover:text-brand transition-all duration-200 ease-out sm:h-11 sm:w-11"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <path d="M15 5 8 12l7 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
            <button
              type="button"
              aria-label="Next tours"
              onClick={() => scroll(1)}
              className="flex h-10 w-10 items-center justify-center rounded-full border border-line bg-paper text-ink shadow-card hover:border-brand hover:text-brand transition-all duration-200 ease-out sm:h-11 sm:w-11"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <path d="m9 5 7 7-7 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
          </div>
        </div>
        <div
          ref={trackRef}
          className="grid auto-cols-[calc((100%-3rem)/4)] grid-flow-col gap-6 overflow-x-auto scroll-smooth pb-4 pt-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        >
          {tours.map((tour) => (
            <TourCard key={tour.slug} tour={tour} href={home?.tourHrefs?.[tour.slug]} />
          ))}
        </div>
      </div>
    </section>
  );
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
export function HomePageBody({ siteName, canonicalUrl, heroImageUrl, tours, allBlogPosts = [], config, home }: HomePageBodyProps) {
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
        url: `${canonicalUrl.replace(/\/$/, '')}${home?.tourHrefs[tour.slug] ?? tourHref(tour.slug)}`,
        name: tour.title,
      })),
    },
  ];

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      {/* 1-3: Hero + search bar on its edge + one chips row (id="hero" is on the section) */}
      <Hero
        imageUrl={heroImageUrl}
        home={
          home
            ? {
                eyebrow: home.heroEyebrow,
                title: home.heroTitle,
                placeholder: home.searchPlaceholder,
                chips: home.chips,
                imageAlt: home.heroImage.alt,
              }
            : undefined
        }
      />

      {/* 4: Names strip - real booking platforms only */}
      <div id="partners">
        <TrustPointsSection
          items={home ? home.names.map((n) => ({ name: n.label, href: n.href })) : config?.namesStrip}
          label={home?.namesLabel}
        />
      </div>

      {/* 5: Top Food Tours slider - 4 full cards */}
      <div id="popular">
        {siteName === 'Amalfi Day Trip' ? (
          <AmalfiCarousel tours={tours} home={home} />
        ) : (
          <TourCarouselSection
            tours={tours}
            eyebrow={home?.sliderEyebrow}
            title={home?.sliderTitle}
            hrefs={home?.tourHrefs}
          />
        )}
      </div>

      {/* 6: Top Food Items to Try - 5 rows (1 big + 3 small) */}
      <div id="categories">
        <CategoryToursSection
          tours={tours}
          categories={
            home
              ? home.categories
              : config?.categories?.map((c) => ({ name: c.name, slug: c.slug, imageUrl: c.imageUrl, tourSlugs: c.tourSlugs }))
          }
          eyebrow={home?.categoryEyebrow}
          title={home?.categoryTitle}
          city={home?.city}
        />
      </div>

      {/* 7: How We Choose - dark section, 4 gold icons */}
      <div id="how-we-choose">
        <HowWeChooseDark
          items={home ? home.how : config?.howWeChoose}
          eyebrow={home?.howEyebrow}
          title={home?.howTitle}
          subtitle={home?.howSubtitle}
        />
      </div>

      {/* 8: Places You Can Plan Your Next Trip - 3 tabs */}
      <div id="places">
        <ExploreLinksSection
          tours={tours}
          allBlogPosts={allBlogPosts}
          title={home?.placesTitle}
          attractions={home?.attractions}
          topTours={home?.topTours}
        />
      </div>

      {/* 9: Our Network - all sites */}
      <div id="network">
        <AllDestinationsSection />
      </div>
    </>
  );
}
