'use client';

import Link from '@/components/NetworkLink';
import { SafeImage } from '@/components/SafeImage';
import type { TourDoc } from '@/lib/firestore';

export function PDTNeighborhoodDetailPage({
  name,
  description,
  heroImageUrl,
  tours,
}: {
  name: string;
  description: string;
  heroImageUrl?: string;
  tours: TourDoc[];
}) {
  return (
    <div className="pdt-scope bg-white">
      <section className="border-b border-line">
        <div className="mx-auto max-w-[1440px] px-6 pt-6 sm:px-14">
          <nav aria-label="Breadcrumb" className="text-sm text-faint">
            <Link href="/pompeii-day-trip" className="hover:text-accent">
              Home
            </Link>
            <span className="mx-2">/</span>
            <Link href="/pompeii-day-trip/neighborhoods" className="hover:text-accent">
              Neighborhoods
            </Link>
            <span className="mx-2">/</span>
            <span className="text-ink-muted">Eating in {name}</span>
          </nav>
        </div>

        {heroImageUrl && (
          <div className="relative h-[220px] w-full overflow-hidden bg-media sm:h-[300px]">
            <SafeImage src={heroImageUrl} alt={name} fill className="object-cover" />
          </div>
        )}

        <div className="mx-auto max-w-[1440px] px-6 py-14 text-center sm:px-14 sm:py-16">
          <h1 className="font-display text-3xl font-semibold text-ink sm:text-4xl">Exploring {name}, Pompeii</h1>
        </div>
      </section>

      <section className="py-10 sm:py-14">
        <div className="mx-auto max-w-[1440px] px-6 sm:px-14">
          <div className="mx-auto max-w-[760px]">
            <div
              className="rich-content prose prose-sm max-w-none"
              dangerouslySetInnerHTML={{ __html: description }}
            />
          </div>
        </div>
      </section>

      {tours.length > 0 && (
        <section className="py-14 sm:py-16">
          <div className="mx-auto max-w-[1440px] px-6 sm:px-14">
            <h2 className="mb-8 font-display text-2xl font-semibold text-ink">Tours in {name}</h2>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {tours.map((tour) => (
                <Link key={tour.slug} href={`/pompeii-day-trip/tours/${tour.slug}`} className="group">
                  <div className="flex flex-col overflow-hidden rounded-media border border-line bg-white transition-all duration-300 hover:-translate-y-1 hover:shadow-card-hover">
                    {tour.imageUrl && (
                      <div className="relative aspect-[4/3] overflow-hidden bg-media">
                        <SafeImage
                          src={tour.imageUrl}
                          alt={tour.title}
                          fill
                          sizes="(min-width: 1024px) 280px, (min-width: 640px) 45vw, 90vw"
                          className="object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                      </div>
                    )}
                    <div className="flex flex-1 flex-col p-4">
                      <h3 className="font-display text-[17px] font-bold leading-snug text-ink">{tour.title}</h3>
                      <p className="mt-2 flex-1 text-[14.5px] leading-relaxed text-ink-muted">{tour.firstHandNotes || tour.niche.join(', ')}</p>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
