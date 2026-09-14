import type { Metadata } from 'next';
import Link from '@/components/NetworkLink';
import { getAllTours, SITE_DOMAIN, type TourDoc } from '@/lib/firestore';
import { InnerHero } from '@/components/InnerHero';
import { TourCard } from '@/components/TourCard';
import { CATEGORIES, NEIGHBORHOODS, getTourEntryByRealSlug, tourHref } from '@/lib/tours';

export const revalidate = 3600;

export const metadata: Metadata = {
  title: 'Rome Food Tours — Every Tour, One Place',
  description:
    'Every Street Food Rome tour in one index — filter by food category (pizza, pasta, gelato, beer & wine, street food classics) or by neighbourhood.',
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

  let tours = allTours;
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

      <InnerHero
        eyebrow="All Tours"
        title="Rome Food Tours"
        subtitle="Every tour we recommend, in one place — filter by food category or by the neighbourhood you're staying in."
        breadcrumb={{ label: 'Home', href: '/' }}
      />

      <section className="py-10">
        <div className="mx-auto max-w-[1440px] px-6 sm:px-14">
          <div className="flex flex-wrap gap-2">
            <Link
              href="/tours"
              className={`rounded-full border px-4 py-2 text-sm font-semibold transition-colors ${
                !category && !neighborhood
                  ? 'border-accent bg-accent text-white'
                  : 'border-line bg-white text-ink-muted hover:border-accent hover:text-accent'
              }`}
            >
              All Tours
            </Link>
            {CATEGORIES.map((c) => (
              <Link
                key={c.slug}
                href={`/tours?category=${c.slug}`}
                className={`rounded-full border px-4 py-2 text-sm font-semibold transition-colors ${
                  category === c.slug
                    ? 'border-accent bg-accent text-white'
                    : 'border-line bg-white text-ink-muted hover:border-accent hover:text-accent'
                }`}
              >
                {c.name}
              </Link>
            ))}
          </div>

          <div className="mt-3 flex flex-wrap gap-2">
            {NEIGHBORHOODS.map((n) => (
              <Link
                key={n.slug}
                href={`/tours?neighborhood=${n.slug}`}
                className={`rounded-full border px-3 py-1.5 text-xs font-semibold transition-colors ${
                  neighborhood === n.slug
                    ? 'border-accent bg-accent text-white'
                    : 'border-line bg-white text-ink-muted hover:border-accent hover:text-accent'
                }`}
              >
                {n.name}
              </Link>
            ))}
          </div>

          {(activeCategory || activeNeighborhood) && (
            <p className="mt-6 text-sm text-ink-muted">
              Showing {tours.length} tour{tours.length === 1 ? '' : 's'}
              {activeCategory ? <> in <strong className="text-ink">{activeCategory.name}</strong></> : null}
              {activeNeighborhood ? (
                <>
                  {' '}
                  in <strong className="text-ink">{activeNeighborhood.name}</strong>
                </>
              ) : null}
              .
            </p>
          )}

          {tours.length === 0 ? (
            <p className="mt-10 text-sm text-ink-muted">
              No tours match that filter yet.{' '}
              <Link href="/tours" className="font-bold text-accent hover:underline">
                View all tours
              </Link>
              .
            </p>
          ) : (
            <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4">
              {tours.map((tour, i) => (
                <TourCard key={tour.slug} tour={tour} priority={i < 4} />
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
}
