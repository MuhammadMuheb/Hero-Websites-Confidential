'use client';

import { useRef } from 'react';
import type { TourDoc } from '@/lib/firestore';
import { TourCard } from './TourCard';

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
    <section className="bg-paper-tint py-20">
      <div className="mx-auto max-w-[1440px] px-6 sm:px-14">
        <div className="flex flex-wrap items-end justify-between gap-y-4">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-faint">
              Our best selling tours at a glance
            </p>
            <h2 className="mt-2 font-sans text-3xl font-extrabold tracking-tight text-ink sm:text-4xl">
              Top Food Tours in Rome
            </h2>
          </div>

          <div className="flex gap-2">
            <button
              type="button"
              aria-label="Previous tour"
              onClick={() => scrollByOneCard(-1)}
              className="flex h-10 w-10 items-center justify-center rounded-full border border-line bg-white text-faint transition-colors hover:border-accent hover:text-accent sm:h-11 sm:w-11"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <path d="M15 5 8 12l7 7" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
            <button
              type="button"
              aria-label="Next tour"
              onClick={() => scrollByOneCard(1)}
              className="flex h-10 w-10 items-center justify-center rounded-full border border-line bg-white text-faint transition-colors hover:border-accent hover:text-accent sm:h-11 sm:w-11"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <path d="m9 5 7 7-7 7" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
          </div>
        </div>

        {/* Visible cards per row scale with viewport (1 on mobile, 2 on
            tablet, 4 on desktop); each card is always sized as a fraction of
            the track width minus gaps, so scrolling by one card's measured
            width moves exactly one card at a time rather than jumping a full
            screen. */}
        <div
          ref={trackRef}
          className="mt-10 grid auto-cols-[calc(100%-2.5rem)] grid-flow-col gap-5 overflow-x-auto scroll-smooth [scrollbar-width:none] sm:auto-cols-[calc((100%-1.75rem)/2)] sm:gap-7 lg:auto-cols-[calc((100%-3*1.75rem)/4)] [&::-webkit-scrollbar]:hidden"
          style={{ scrollSnapType: 'x mandatory' }}
        >
          {tours.map((tour, index) => (
            <div key={tour.slug} style={{ scrollSnapAlign: 'start' }}>
              <TourCard tour={tour} priority={index === 0} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
