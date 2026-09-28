'use client';

import type { TourDoc } from '@/lib/firestore';
import { Hero } from '@/components/Hero';
import { useReveal } from '@/hooks/useReveal';

interface TourDetailTemplateProps {
  tour: TourDoc;
  bookingUrl: string;
}

export function TourDetailTemplate({ tour, bookingUrl }: TourDetailTemplateProps) {
  useReveal();

  const duration = tour.duration || 'Contact for details';

  return (
    <main className="bg-white">
      {/* Hero */}
      <Hero
        imageUrl={tour.imageUrl || 'https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=1600&q=80'}
        title={tour.title}
        subtitle={`Offered by ${tour.partner}`}
        accentWord=""
      />

      {/* Content */}
      <div className="max-w-3xl mx-auto px-6 py-16 sm:px-14 sm:py-20">
        {/* Overview */}
        <div className="mb-16">
          <h2 className="font-display text-3xl font-bold text-ink mb-6">About This Tour</h2>
          <p className="text-lg text-ink/80 leading-relaxed">{tour.firstHandNotes || 'Tour details coming soon.'}</p>
        </div>

        {/* Quick Facts */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16 py-8 border-t border-b border-line">
          <div>
            <span className="text-sm text-ink/60 uppercase font-semibold">Duration</span>
            <p className="text-2xl font-bold text-ink mt-2">{duration}</p>
          </div>
          <div>
            <span className="text-sm text-ink/60 uppercase font-semibold">Price Band</span>
            <p className="text-2xl font-bold text-ink mt-2">{tour.priceBand || 'Varies'}</p>
          </div>
          <div>
            <span className="text-sm text-ink/60 uppercase font-semibold">Operator</span>
            <p className="text-2xl font-bold text-ink mt-2">{tour.partner}</p>
          </div>
        </div>

        {/* What's Included */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-16">
          <div>
            <h3 className="font-display text-2xl font-bold text-ink mb-6">What&apos;s Included</h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <span className="text-brand text-xl font-bold flex-shrink-0">✓</span>
                <span className="text-ink/80">Professional guide</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-brand text-xl font-bold flex-shrink-0">✓</span>
                <span className="text-ink/80">Transportation</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-brand text-xl font-bold flex-shrink-0">✓</span>
                <span className="text-ink/80">Entrance fees</span>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="font-display text-2xl font-bold text-ink mb-6">What&apos;s Not Included</h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <span className="text-ink/40 text-xl font-bold flex-shrink-0">✕</span>
                <span className="text-ink/80">Meals</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-ink/40 text-xl font-bold flex-shrink-0">✕</span>
                <span className="text-ink/80">Tips</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-ink/40 text-xl font-bold flex-shrink-0">✕</span>
                <span className="text-ink/80">Personal expenses</span>
              </li>
            </ul>
          </div>
        </div>

        {/* CTA */}
        <div className="bg-brand rounded-card p-8 text-center">
          <h3 className="font-display text-2xl font-bold text-cream mb-4">Ready to Book?</h3>
          <p className="text-cream/90 mb-6">Check availability and book on {tour.partner}</p>
          <a
            href={bookingUrl}
            rel="sponsored nofollow"
            className="inline-block px-8 py-3 bg-cream text-brand font-bold rounded-control hover:shadow-lg transition-shadow"
          >
            Check Availability
          </a>
        </div>
      </div>
    </main>
  );
}
