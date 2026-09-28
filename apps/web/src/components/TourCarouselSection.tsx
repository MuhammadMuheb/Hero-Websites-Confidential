'use client';

import { useRef } from 'react';
import type { TourDoc } from '@/lib/firestore';
import { TourCard } from '@/components/cards/TourCard';

export function TourCarouselSection({ tours }: { tours: TourDoc[] }) {
  const trackRef = useRef<HTMLDivElement>(null);

  function scrollByOneCard(direction: 1 | -1) {
    const track = trackRef.current;
    if (!track) return;
    const firstCard = track.firstElementChild as HTMLElement | null;
    if (!firstCard) return;
    // Card width + the track's own gap — moves exactly one card per click,
    // regardless of viewport width or how many cards are visible at once.
    const gap = parseFloat(getComputedStyle(track).columnGap || '0');
    const step = firstCard.getBoundingClientRect().width + gap;
    const maxScroll = track.scrollWidth - track.clientWidth;

    let target = track.scrollLeft + step * direction;
    if (direction === 1 && track.scrollLeft >= maxScroll - 1) {
      target = 0; // last card → loop back to the first
    } else if (direction === -1 && track.scrollLeft <= 1) {
      target = maxScroll; // first card → loop back to the last
    }
    track.scrollTo({ left: target, behavior: 'smooth' });
  }

  return (
    <section className="bg-cream-deep py-16 sm:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-wrap items-end justify-between gap-y-4 mb-12">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.24em] text-gold-deep">
              Our best selling tours at a glance
            </p>
            <h2 className="mt-3 font-hero text-[32px] font-black leading-tight tracking-[-0.02em] text-ink sm:text-[44px]">
              Top Food <span className="text-brand">Tours</span> in Rome
            </h2>
          </div>

          <div className="flex gap-2">
            <button
              type="button"
              aria-label="Previous tour"
              onClick={() => scrollByOneCard(-1)}
              className="flex h-10 w-10 items-center justify-center rounded-full border border-line bg-paper text-ink shadow-card hover:border-brand hover:text-brand transition-all duration-200 ease-out sm:h-11 sm:w-11"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <path d="M15 5 8 12l7 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
            <button
              type="button"
              aria-label="Next tour"
              onClick={() => scrollByOneCard(1)}
              className="flex h-10 w-10 items-center justify-center rounded-full border border-line bg-paper text-ink shadow-card hover:border-brand hover:text-brand transition-all duration-200 ease-out sm:h-11 sm:w-11"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <path d="m9 5 7 7-7 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
          </div>
        </div>

        <div
          ref={trackRef}
          className="grid auto-cols-[85%] grid-flow-col gap-4 overflow-x-auto scroll-smooth pb-4 pt-1 [scrollbar-width:none] sm:auto-cols-[calc((100%-1rem)/2)] sm:gap-6 lg:auto-cols-[calc((100%-4.5rem)/4)] [&::-webkit-scrollbar]:hidden"
          style={{ scrollSnapType: 'x mandatory' }}
        >
          {tours.map((tour, index) => (
            <div
              key={tour.slug}
              style={{ scrollSnapAlign: 'start' }}
            >
              <TourCard tour={tour} priority={index < 4} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
