'use client';

import { useRef } from 'react';
import Link from '@/components/NetworkLink';
import { SafeImage } from './SafeImage';

export interface NavigationLink {
  label: string;
  href: string;
}

interface NetworkPropertyHeroProps {
  propertyName: string;
  heroImageUrl: string;
  heroImageAlt: string;
  heroHeadline: string;
  heroEyebrow?: string;
  navigationLinks: NavigationLink[];
  searchPlaceholder?: string;
}

/**
 * Unified hero section for all 13 network properties — full-width background
 * image, headline, search bar overlapping the hero/section boundary, and
 * horizontal scrollable navigation links carousel. Standardizes the opening
 * layout across the entire network while allowing property-specific content.
 */
export function NetworkPropertyHero({
  propertyName,
  heroImageUrl,
  heroImageAlt,
  heroHeadline,
  heroEyebrow = 'EXPERIENCE',
  navigationLinks,
  searchPlaceholder = 'Search tours…',
}: NetworkPropertyHeroProps) {
  const scrollerRef = useRef<HTMLDivElement>(null);

  function scrollBy(delta: number) {
    scrollerRef.current?.scrollBy({ left: delta, behavior: 'smooth' });
  }

  return (
    <section>
      <div className="relative h-[400px] w-full overflow-hidden sm:h-[480px]">
        <SafeImage
          src={heroImageUrl}
          alt={heroImageAlt}
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/25 to-black/10" />

        <div className="relative mx-auto flex h-full max-w-[960px] flex-col justify-center px-6 pb-10">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-white/70">{heroEyebrow}</p>
          <h1 className="mt-3 max-w-2xl font-sans text-[40px] font-extrabold leading-[1.1] tracking-tight text-white sm:text-[60px] sm:leading-[1.05]">
            {heroHeadline}
          </h1>
        </div>
      </div>

      {/* Search bar straddles the hero/strip boundary — half over the photo, half over the light
          section below — matching the reference's actual overlap, not fully embedded in the photo. */}
      <div className="relative z-10 mx-auto -mt-8 max-w-[896px] px-6">
        <form action="#" className="flex items-center gap-2 rounded-card border border-line/60 bg-white p-2.5 shadow-search">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" className="ml-3 shrink-0 text-ink-muted" aria-hidden="true">
            <circle cx="11" cy="11" r="7" stroke="currentColor" strokeWidth="1.8" />
            <path d="m20 20-3.5-3.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
          </svg>
          <input
            type="text"
            name="q"
            placeholder={searchPlaceholder}
            className="h-10 w-full bg-transparent text-base text-ink placeholder:text-ink-muted focus:outline-none"
          />
          <button
            type="submit"
            className="h-11 shrink-0 rounded-control bg-accent-gradient px-5 text-base font-bold text-white shadow-glow transition-transform duration-200 ease-out hover:scale-[1.02] active:scale-[0.98]"
          >
            Search Tours
          </button>
        </form>
      </div>

      {/* Navigation links — separate strip below the photo, functional scroll like the reference.
          White background for clean boundary with the section below. */}
      <div className="bg-white">
        <div className="mx-auto flex max-w-[1200px] items-center gap-2 px-6 pb-6 pt-8">
          <button
            type="button"
            aria-label="Scroll navigation left"
            onClick={() => scrollBy(-320)}
            className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-line bg-white text-faint transition-all duration-200 ease-out hover:border-accent hover:text-accent"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <path d="m15 5-7 7 7 7" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>

          <div
            ref={scrollerRef}
            className="flex flex-1 items-center gap-2.5 overflow-x-auto scroll-smooth [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
          >
            {navigationLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className="flex h-[42px] shrink-0 items-center whitespace-nowrap rounded-full border border-line bg-white px-4 text-[15px] font-bold text-ink-soft transition-all duration-200 ease-out hover:border-accent hover:bg-accent-soft hover:text-accent"
              >
                {link.label}
              </Link>
            ))}
          </div>

          <button
            type="button"
            aria-label="Scroll navigation right"
            onClick={() => scrollBy(320)}
            className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-line bg-white text-faint transition-all duration-200 ease-out hover:border-accent hover:text-accent"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <path d="m9 5 7 7-7 7" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
        </div>
      </div>
    </section>
  );
}
