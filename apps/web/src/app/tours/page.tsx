import type { Metadata } from 'next';
import { getAllTours, SITE_DOMAIN, type TourDoc } from '@/lib/firestore';
import { Hero } from '@/components/Hero';
import { TourCard } from '@/components/cards/TourCard';
import { CATEGORIES, NEIGHBORHOODS, CITIES, getTourEntryByRealSlug, tourHref } from '@/lib/tours';
import { ToursFilterClient } from './tours-filter-client';

export const revalidate = 3600;

export const metadata: Metadata = {
  title: 'Rome Food Tours — Every Tour, One Place',
  description: 'Every Street Food Rome tour in one index — filter by food category, neighbourhood, or city.',
  alternates: { canonical: `https://${SITE_DOMAIN}/tours` },
};

function matchesCategory(tour: TourDoc, categorySlug: string): boolean {
  const entry = getTourEntryByRealSlug(tour.slug);
  return entry?.category === categorySlug;
}

function matchesNeighborhood(tour: TourDoc, neighborhoodSlug: string): boolean {
  const entry = getTourEntryByRealSlug(tour.slug);
  return (tour.neighborhood ?? entry?.neighborhood) === neighborhoodSlug;
}

function matchesCity(tour: TourDoc, citySlug: string): boolean {
  const entry = getTourEntryByRealSlug(tour.slug);
  return entry?.city === citySlug;
}

export default async function ToursIndexPage({
  searchParams,
}: {
  searchParams: Promise<{ category?: string; neighborhood?: string; city?: string }>;
}) {
  const { category, neighborhood, city } = await searchParams;
  const allTours = await getAllTours();

  // STRICT FILTERING: Only Street Food Rome tours
  let tours = allTours.filter((t) => (t.propertySlug || 'street-food-rome') === 'street-food-rome');

  // Apply 3-way filtering: category AND neighborhood AND city
  if (category) tours = tours.filter((t) => matchesCategory(t, category));
  if (neighborhood) tours = tours.filter((t) => matchesNeighborhood(t, neighborhood));
  if (city) tours = tours.filter((t) => matchesCity(t, city));

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: 'Rome Food Tours',
    description: metadata.description,
    url: `https://${SITE_DOMAIN}/tours`,
    mainEntity: {
      '@type': 'ItemList',
      itemListElement: tours.map((tour, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        url: `https://${SITE_DOMAIN}${tourHref(tour.slug)}`,
        name: tour.title,
      })),
    },
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <Hero
        imageUrl="https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=1600&q=80"
        title="Rome Food Tours"
        subtitle="Every tour we recommend, in one place"
        accentWord="tour"
      />

      <section className="bg-cream py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Filter Section - Client Component for Interactivity */}
          <ToursFilterClient
            categories={CATEGORIES}
            neighborhoods={NEIGHBORHOODS}
            cities={CITIES}
            initialCategory={category}
            initialNeighborhood={neighborhood}
            initialCity={city}
          />

          {/* Results Summary */}
          <div className="mb-8">
            <p className="text-ink/70">
              {category && neighborhood && city && `${CATEGORIES.find(c => c.slug === category)?.name} in ${NEIGHBORHOODS.find(n => n.slug === neighborhood)?.name}, ${CITIES.find(c => c.slug === city)?.name}`}
              {category && neighborhood && !city && `${CATEGORIES.find(c => c.slug === category)?.name} in ${NEIGHBORHOODS.find(n => n.slug === neighborhood)?.name}`}
              {category && !neighborhood && city && `${CATEGORIES.find(c => c.slug === category)?.name} in ${CITIES.find(c => c.slug === city)?.name}`}
              {category && !neighborhood && !city && `${CATEGORIES.find(c => c.slug === category)?.name} tours`}
              {!category && neighborhood && city && `Tours in ${NEIGHBORHOODS.find(n => n.slug === neighborhood)?.name}, ${CITIES.find(c => c.slug === city)?.name}`}
              {!category && neighborhood && !city && `Tours in ${NEIGHBORHOODS.find(n => n.slug === neighborhood)?.name}`}
              {!category && !neighborhood && city && `Tours in ${CITIES.find(c => c.slug === city)?.name}`}
              {!category && !neighborhood && !city && `All ${tours.length} tours`}
            </p>
          </div>

          {/* Tour Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {tours.map((tour, i) => (
              <div key={tour.slug} data-reveal style={{ '--i': i } as React.CSSProperties}>
                <TourCard tour={tour} priority={i === 0} />
              </div>
            ))}
          </div>

          {tours.length === 0 && (
            <div className="py-20 text-center">
              <p className="text-ink/60 mb-4">No tours found matching your filters.</p>
              <a href="/tours" className="text-brand hover:underline">
                View all tours
              </a>
            </div>
          )}
        </div>
      </section>
    </>
  );
}
