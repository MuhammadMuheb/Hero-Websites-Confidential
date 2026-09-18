'use client';

import Link from '@/components/NetworkLink';
import { SafeImage } from '@/components/SafeImage';
import { FEATURED_TOURS } from '@/lib/pompeii-day-trip';

const CATEGORY_DESCRIPTIONS: Record<string, string> = {
  rome: 'Pompeii day trips starting from Rome — exploring how to make the train journey work on a tight schedule.',
  naples: 'Pompeii from Naples — the closest base and fastest route to the ruins.',
  vesuvius: 'Combining Pompeii with Mount Vesuvius — timing the volcanic crater visit and the archaeological site visit correctly.',
  herculaneum: 'Pompeii paired with Herculaneum — why the smaller, denser site deserves a dedicated look.',
};

const CATEGORY_TITLES: Record<string, string> = {
  rome: 'Pompeii from Rome',
  naples: 'Pompeii from Naples',
  vesuvius: 'Pompeii + Vesuvius Combo',
  herculaneum: 'Pompeii + Herculaneum',
};

export function PDTToursCategoryPage({ category }: { category: string }) {
  const title = CATEGORY_TITLES[category] || category;
  const description = CATEGORY_DESCRIPTIONS[category] || '';

  const filteredTours = FEATURED_TOURS.filter((tour) => {
    if (category === 'rome') return tour.tags.includes('from-rome');
    if (category === 'naples') return tour.tags.includes('from-naples');
    if (category === 'vesuvius') return tour.tags.includes('vesuvius');
    if (category === 'herculaneum') return tour.tags.includes('herculaneum');
    return false;
  });

  return (
    <div className="pdt-scope bg-white">
      <section className="border-b border-line">
        <div className="mx-auto max-w-[1440px] px-6 pt-6 sm:px-14">
          <nav aria-label="Breadcrumb" className="text-sm text-faint">
            <Link href="/pompeii-day-trip" className="hover:text-accent">
              Home
            </Link>
            <span className="mx-2">/</span>
            <Link href="/pompeii-day-trip/tours" className="hover:text-accent">
              Tours
            </Link>
            <span className="mx-2">/</span>
            <span className="text-ink-muted">{title}</span>
          </nav>
        </div>
        <div className="mx-auto max-w-[1440px] px-6 py-14 text-center sm:px-14 sm:py-16">
          <h1 className="font-display text-3xl font-semibold text-ink sm:text-4xl">{title} Tours in Pompeii</h1>
          {description && <p className="mt-4 text-ink-muted">{description}</p>}
        </div>
      </section>

      {/* Tours Grid */}
      <section className="py-14">
        <div className="mx-auto max-w-[1440px] px-6 sm:px-14">
          {filteredTours.length > 0 ? (
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {filteredTours.map((tour) => (
                <a
                  key={tour.slug}
                  href={tour.slug}
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
              ))}
            </div>
          ) : (
            <div className="text-center">
              <p className="text-ink-muted">No tours found in this category.</p>
              <Link
                href="/pompeii-day-trip/tours"
                className="mt-6 inline-flex h-11 items-center justify-center rounded-control bg-accent-gradient px-6 text-sm font-bold text-white shadow-glow transition-transform duration-200 ease-out hover:scale-[1.02] active:scale-[0.98]"
              >
                View All Tours
              </Link>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
