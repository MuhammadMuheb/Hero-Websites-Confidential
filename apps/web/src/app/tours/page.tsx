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

      <section className="bg-cream py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Filter Section */}
          <div className="mb-12">
            {/* Category Filters */}
            <div className="mb-10">
              <h3 className="text-xs font-bold uppercase tracking-wider text-ink/60 mb-4">Category</h3>
              <div className="flex gap-2 overflow-x-auto pb-2 -mx-4 px-4 sm:mx-0 sm:px-0 sm:overflow-visible">
                <Link
                  href="/tours"
                  className={`shrink-0 inline-flex items-center justify-center rounded-full px-4 py-2 text-sm font-semibold transition-all duration-200 whitespace-nowrap ${
                    !category && !neighborhood
                      ? 'bg-brand text-cream'
                      : 'border border-line bg-white text-ink hover:border-brand'
                  }`}
                >
                  All
                </Link>
                {CATEGORIES.map((cat) => {
                  const href = neighborhood
                    ? `/tours?category=${cat.slug}&neighborhood=${neighborhood}`
                    : `/tours?category=${cat.slug}`;
                  return (
                    <Link
                      key={cat.slug}
                      href={href}
                      className={`shrink-0 inline-flex items-center justify-center rounded-full px-4 py-2 text-sm font-semibold transition-all duration-200 whitespace-nowrap ${
                        activeCategory?.slug === cat.slug
                          ? 'bg-brand text-cream'
                          : 'border border-line bg-white text-ink hover:border-brand'
                      }`}
                    >
                      {cat.name}
                    </Link>
                  );
                })}
              </div>
            </div>

            {/* Neighborhood Filters */}
            <div>
              <h3 className="text-xs font-bold uppercase tracking-wider text-ink/60 mb-4">Area</h3>
              <div className="flex gap-2 overflow-x-auto pb-2 -mx-4 px-4 sm:mx-0 sm:px-0 sm:overflow-visible">
                <Link
                  href="/tours"
                  className={`shrink-0 inline-flex items-center justify-center rounded-full px-4 py-2 text-sm font-semibold transition-all duration-200 whitespace-nowrap ${
                    !neighborhood && !category
                      ? 'bg-brand text-cream'
                      : 'border border-line bg-white text-ink hover:border-brand'
                  }`}
                >
                  All
                </Link>
                {NEIGHBORHOODS.map((area) => {
                  const href = category
                    ? `/tours?category=${category}&neighborhood=${area.slug}`
                    : `/tours?neighborhood=${area.slug}`;
                  return (
                    <Link
                      key={area.slug}
                      href={href}
                      className={`shrink-0 inline-flex items-center justify-center rounded-full px-4 py-2 text-sm font-semibold transition-all duration-200 whitespace-nowrap ${
                        activeNeighborhood?.slug === area.slug
                          ? 'bg-brand text-cream'
                          : 'border border-line bg-white text-ink hover:border-brand'
                      }`}
                    >
                      {area.name}
                    </Link>
                  );
                })}
              </div>
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
