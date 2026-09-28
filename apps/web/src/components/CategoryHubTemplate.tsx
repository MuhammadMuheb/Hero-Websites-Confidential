'use client';

import type { TourDoc } from '@/lib/firestore';
import { Hero } from '@/components/Hero';
import { TourCard } from '@/components/cards/TourCard';
import { SectionHeader } from '@/components/SectionHeader';
import { useReveal } from '@/hooks/useReveal';

interface CategoryHubTemplateProps {
  categoryName: string;
  categoryDescription: string;
  tours: TourDoc[];
  heroImageUrl?: string;
}

export function CategoryHubTemplate({
  categoryName,
  categoryDescription,
  tours,
  heroImageUrl = 'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=1600&q=80',
}: CategoryHubTemplateProps) {
  useReveal();

  return (
    <>
      <Hero imageUrl={heroImageUrl} title={categoryName} subtitle={categoryDescription} accentWord="" />

      <section className="bg-cream py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader title={`${categoryName} Tours`} subtitle={`All available ${categoryName.toLowerCase()} experiences`} />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {tours.map((tour, i) => (
              <div key={tour.slug} data-reveal style={{ '--i': i } as React.CSSProperties}>
                <TourCard tour={tour} priority={i === 0} />
              </div>
            ))}
          </div>

          {tours.length === 0 && (
            <div className="py-20 text-center">
              <p className="text-ink/60 mb-4">No tours found in this category.</p>
            </div>
          )}
        </div>
      </section>
    </>
  );
}
