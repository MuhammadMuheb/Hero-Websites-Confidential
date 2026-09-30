import type { Metadata } from 'next';
import Link from '@/components/NetworkLink';
import { getAllTours, SITE_DOMAIN, type TourDoc } from '@/lib/firestore';
import { Hero } from '@/components/Hero';
import { TourCard } from '@/components/cards/TourCard';
import { CATEGORIES, NEIGHBORHOODS, getTourEntryByRealSlug, tourHref } from '@/lib/tours';

export const revalidate = 3600;

export const metadata: Metadata = {
  title: 'Rome Food Tours — Every Tour, One Place',
  description: 'Every Street Food Rome tour in one index — filter by food category or by neighbourhood.',
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

export default async function ToursIndexPage({
  searchParams,
}: {
  searchParams: Promise<{ category?: string; neighborhood?: string }>;
}) {
  const { category, neighborhood } = await searchParams;
  const allTours = await getAllTours();

  // STRICT FILTERING: Only Street Food Rome tours
  let tours = allTours.filter((t) => (t.propertySlug || 'street-food-rome') === 'street-food-rome');
  if (category) tours = tours.filter((t) => matchesCategory(t, category));
  if (neighborhood) tours = tours.filter((t) => matchesNeighborhood(t, neighborhood));

  const activeCategory = category ? CATEGORIES.find((c) => c.slug === category) : undefined;
  const activeNeighborhood = neighborhood ? NEIGHBORHOODS.find((n) => n.slug === neighborhood) : undefined;

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

      <section className="bg-cream py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Filters */}
          <div className="mb-16">
            <h2 className="font-display text-2xl font-bold text-ink mb-8">Filter by Category</h2>
            <div className="flex flex-wrap gap-3 mb-12">
              <Link
                href="/tours"
                className={`inline-flex items-center justify-center rounded-full px-5 py-2.5 text-sm font-semibold transition-all duration-200 ${
                  !category && !neighborhood
                    ? 'bg-brand text-cream shadow-md hover:shadow-lg'
                    : 'border border-line bg-white text-ink hover:border-brand hover:bg-brand/5'
                }`}
              >
                All Tours
              </Link>
              {CATEGORIES.map((cat) => (
                <Link
                  key={cat.slug}
                  href={`/tours?category=${cat.slug}`}
                  className={`inline-flex items-center justify-center rounded-full px-5 py-2.5 text-sm font-semibold transition-all duration-200 ${
                    activeCategory?.slug === cat.slug
                      ? 'bg-brand text-cream shadow-md hover:shadow-lg'
                      : 'border border-line bg-white text-ink hover:border-brand hover:bg-brand/5'
                  }`}
                >
                  {cat.name}
                </Link>
              ))}
            </div>

            <h2 className="font-display text-2xl font-bold text-ink mb-8">Filter by Neighborhood</h2>
            <div className="flex flex-wrap gap-3">
              <Link
                href="/tours"
                className={`inline-flex items-center justify-center rounded-full px-5 py-2.5 text-sm font-semibold transition-all duration-200 ${
                  !neighborhood && !category
                    ? 'bg-brand text-cream shadow-md hover:shadow-lg'
                    : 'border border-line bg-white text-ink hover:border-brand hover:bg-brand/5'
                }`}
              >
                All Areas
              </Link>
              {NEIGHBORHOODS.slice(0, 8).map((area) => (
                <Link
                  key={area.slug}
                  href={`/tours?neighborhood=${area.slug}`}
                  className={`inline-flex items-center justify-center rounded-full px-5 py-2.5 text-sm font-semibold transition-all duration-200 ${
                    activeNeighborhood?.slug === area.slug
                      ? 'bg-brand text-cream shadow-md hover:shadow-lg'
                      : 'border border-line bg-white text-ink hover:border-brand hover:bg-brand/5'
                  }`}
                >
                  {area.name}
                </Link>
              ))}
            </div>
          </div>

          {/* Results */}
          <div className="mb-8">
            <p className="text-ink/70">
              {activeCategory && `Category: ${activeCategory.name}`}
              {activeNeighborhood && `${activeCategory ? ' • ' : ''}Area: ${activeNeighborhood.name}`}
              {!activeCategory && !activeNeighborhood && `All ${tours.length} tours`}
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
              <Link href="/tours" className="text-brand hover:underline">
                View all tours
              </Link>
            </div>
          )}
        </div>
      </section>
    </>
  );
}
