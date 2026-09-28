'use client';

import type { TourDoc } from '@/lib/firestore';
import { Hero } from '@/components/Hero';
import { TourCard } from '@/components/cards/TourCard';
import { useReveal } from '@/hooks/useReveal';

interface AreaHubTemplateProps {
  areaName: string;
  areaDescription: string;
  tours: TourDoc[];
  heroImageUrl?: string;
}

export function AreaHubTemplate({
  areaName,
  areaDescription,
  tours,
  heroImageUrl = 'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=1600&q=80',
}: AreaHubTemplateProps) {
  useReveal();

  return (
    <>
      <Hero imageUrl={heroImageUrl} title={areaName} subtitle={areaDescription} accentWord="" />

      <section className="bg-cream py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-12">
            <h2 className="font-display text-4xl font-bold text-ink mb-4">Tours in {areaName}</h2>
            <p className="text-ink/70">{areaDescription}</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {tours.map((tour, i) => (
              <div key={tour.slug} data-reveal style={{ '--i': i } as React.CSSProperties}>
                <TourCard tour={tour} priority={i === 0} />
              </div>
            ))}
          </div>

          {tours.length === 0 && (
            <div className="py-20 text-center">
              <p className="text-ink/60">No tours available for this area yet.</p>
            </div>
          )}
        </div>
      </section>
    </>
  );
}
