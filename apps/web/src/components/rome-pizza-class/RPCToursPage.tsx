'use client';

import Link from '@/components/NetworkLink';
import { SafeImage } from '@/components/SafeImage';
import { FEATURED_TOURS } from '@/lib/rome-pizza-class';

export function RPCToursPage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: 'Rome Pizza Classes',
    description: 'Featured Rome pizza-making classes — hands-on, wood-fired oven, family-friendly and private options',
    url: 'https://romepizzaclass.com/tours',
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
    <div className="rpc-scope bg-white">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      {/* Hero Section */}
      <section className="border-b border-line">
        <div className="mx-auto max-w-[1440px] px-6 pt-6 sm:px-14">
          <nav aria-label="Breadcrumb" className="text-sm text-faint">
            <Link href="/" className="hover:text-accent">
              Home
            </Link>
            <span className="mx-2">/</span>
            <span className="text-ink-muted">All Classes</span>
          </nav>
        </div>
        <div className="mx-auto max-w-[1440px] px-6 py-14 text-center sm:px-14 sm:py-16">
          <h1 className="font-display text-3xl font-semibold text-ink sm:text-4xl">Featured Pizza-Making Classes</h1>
          <p className="mt-4 text-ink-muted">Hands-on Rome pizza classes — wood-fired oven technique, family-friendly, and private options</p>
        </div>
      </section>

      {/* Classes Grid */}
      <section className="py-14">
        <div className="mx-auto max-w-[1440px] px-6 sm:px-14">
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {FEATURED_TOURS.map((tour) => {
              let moneyPageHref = '/rome-pizza-class/rome-pizza-making-class';
              if (tour.tags.includes('combo')) moneyPageHref = '/rome-pizza-class/money/pizza-gelato-combo';
              if (tour.tags.includes('family')) moneyPageHref = '/rome-pizza-class/family-pizza-class';
              if (tour.tags.includes('private')) moneyPageHref = '/rome-pizza-class/private-pizza-class';

              return (
                <a
                  key={tour.slug}
                  href={moneyPageHref}
                  className="group flex flex-col overflow-hidden rounded-media border border-line bg-white transition-all duration-300 hover:-translate-y-1 hover:shadow-card-hover"
                >
                  <div className="relative aspect-[4/3] overflow-hidden bg-media">
                    <SafeImage
                      src={tour.image.src}
                      alt={tour.image.alt}
                      fill
                      sizes="(min-width: 1024px) 280px, (min-width: 640px) 45vw, 90vw"
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    {tour.badge ? (
                      <div className="absolute right-3 top-3 rounded-full bg-accent px-3 py-1 text-xs font-bold text-white shadow-card">
                        {tour.badge}
                      </div>
                    ) : null}
                  </div>
                  <div className="flex flex-1 flex-col p-4">
                    <p className="text-xs font-semibold uppercase tracking-[0.1em] text-faint">{tour.partner}</p>
                    <h3 className="mt-2 font-display text-[17px] font-bold leading-snug text-ink">{tour.title}</h3>
                    <p className="mt-2 flex-1 text-[14.5px] leading-relaxed text-ink-muted">{tour.meta}</p>
                    <div className="mt-4">
                      <p className="text-sm font-bold text-accent">From €{tour.priceFrom}</p>
                    </div>
                  </div>
                </a>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
}
