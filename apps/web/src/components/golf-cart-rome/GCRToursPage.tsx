'use client';

import Link from '@/components/NetworkLink';
import { SafeImage } from '@/components/SafeImage';
import { FEATURED_TOURS } from '@/lib/golf-cart-rome';

export function GCRToursPage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: 'Golf Cart Rome Tours',
    description: 'Featured golf cart tours of Rome',
    url: 'https://golfcartrome.com/tours',
    mainEntity: {
      '@type': 'ItemList',
      itemListElement: FEATURED_TOURS.map((tour, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        item: {
          '@type': 'TouristTrip',
          name: tour.title,
          description: tour.meta,
          image: tour.image.src,
        },
      })),
    },
  };

  return (
    <div className="gcr-scope bg-white">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      {/* Hero Section */}
      <section className="border-b border-line">
        <div className="mx-auto max-w-[1440px] px-6 pt-6 sm:px-14">
          <nav aria-label="Breadcrumb" className="text-sm text-faint">
            <Link href="/" className="hover:text-accent">
              Home
            </Link>
            <span className="mx-2">/</span>
            <span className="text-ink-muted">Tours</span>
          </nav>
        </div>
        <div className="mx-auto max-w-[1440px] px-6 py-14 text-center sm:px-14 sm:py-16">
          <h1 className="font-display text-3xl font-semibold text-ink sm:text-4xl">Golf Cart Tours of Rome</h1>
          <p className="mt-4 text-ink-muted">Explore Rome&apos;s major sights from a comfortable, shaded cart</p>
        </div>
      </section>

      {/* Tours Grid */}
      <section className="py-14">
        <div className="mx-auto max-w-[1440px] px-6 sm:px-14">
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {FEATURED_TOURS.map((tour) => (
              <Link
                key={tour.slug}
                href={`/money/${tour.slug}`}
                className="group flex flex-col overflow-hidden rounded-card border border-line bg-white transition-all duration-300 ease-out hover:border-accent hover:shadow-card-hover"
              >
                <div className="relative overflow-hidden bg-media">
                  <SafeImage
                    src={tour.image.src}
                    alt={tour.image.alt}
                    width={400}
                    height={250}
                    className="aspect-[16/10] w-full object-cover transition-transform duration-300 ease-out group-hover:scale-105"
                  />
                </div>
                <div className="flex flex-1 flex-col justify-between p-4">
                  <h3 className="font-display text-sm font-semibold text-ink-soft line-clamp-2">{tour.title}</h3>
                  <p className="mt-2 text-xs text-ink-muted line-clamp-2">{tour.meta}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
