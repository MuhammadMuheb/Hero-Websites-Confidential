'use client';

import { useRef } from 'react';
import Link from 'next/link';
import { SafeImage } from './SafeImage';
import { GlobalSearchBox } from './GlobalSearchBox';
import { tourHref } from '@/lib/tours';

interface HeroProps {
  imageUrl: string | null;
  /** Inner page title (triggers inner page hero mode instead of homepage hero) */
  title?: string;
  subtitle?: string;
  accentWord?: string;
  /** Homepage copy for network sites. Omitted = Street Food Rome (master). */
  home?: {
    eyebrow: string;
    title: [string, string, string];
    placeholder: string;
    chips: { label: string; href: string }[];
    imageAlt: string;
  };
}

/**
 * Each chip links to the most specific real page for what it names — a
 * neighbourhood hub, a category hub, or (for a term that names one exact
 * tour) the tour page itself — rather than a generic search or hub fallback.
 */
const CHIPS: { label: string; href: string }[] = [
  { label: 'Trastevere', href: '/neighborhoods/trastevere' },
  { label: 'Testaccio', href: '/neighborhoods/testaccio' },
  { label: 'Suppli', href: '/tours/category/street-food-classics' },
  { label: 'Pizza al Taglio', href: '/tours/category/pizza' },
  { label: 'Food Tours', href: '/tours' },
  { label: 'Testaccio Market', href: tourHref('testaccio-market-food-tour') },
  { label: 'Aperitivo', href: tourHref('aperitivo-evening-experience') },
  { label: 'Jewish Ghetto', href: '/neighborhoods/jewish-ghetto' },
  { label: "Campo de' Fiori", href: '/neighborhoods/campo-de-fiori' },
  { label: 'Monti', href: '/neighborhoods/monti' },
  { label: 'Prati', href: '/neighborhoods/prati' },
  { label: 'San Lorenzo', href: '/neighborhoods/san-lorenzo' },
  { label: 'Pigneto', href: '/neighborhoods/pigneto' },
  { label: 'Gelato', href: '/tours/category/gelato' },
  { label: 'Coffee Culture', href: tourHref('gelato-espresso-crawl') },
  { label: 'Cacio e Pepe', href: tourHref('cacio-e-pepe-carbonara-tasting-walk') },
  { label: 'Trapizzino', href: tourHref('trapizzino-fried-classics-walk') },
  { label: 'Wine Tasting', href: '/tours/category/beer-and-wine' },
  { label: 'Cooking Class', href: tourHref('pasta-making-class-trastevere') },
  { label: 'Market Tour', href: tourHref('testaccio-market-food-tour') },
];

export function Hero({ imageUrl, title, subtitle, accentWord, home }: HeroProps) {
  const chips = home?.chips ?? CHIPS;
  const scrollerRef = useRef<HTMLDivElement>(null);
  const isInnerPage = !!title;

  function scrollBy(delta: number) {
    scrollerRef.current?.scrollBy({ left: delta, behavior: 'smooth' });
  }

  // Inner page hero mode
  if (isInnerPage) {
    return (
      <section className="bg-cream-light">
        <div className="relative h-[280px] w-full overflow-hidden sm:h-96">
          {imageUrl ? (
            <>
              <SafeImage src={imageUrl} alt={title} fill priority sizes="100vw" className="object-cover" />
              <div
                className="absolute inset-0"
                style={{
                  background: 'linear-gradient(135deg, rgba(12,35,26,0.75) 0%, rgba(12,35,26,0.50) 50%, rgba(12,35,26,0.25) 100%)',
                }}
              />
            </>
          ) : (
            <div className="absolute inset-0 bg-gradient-to-br from-brand/20 via-gold/10 to-cream-deep/20" />
          )}
          <div className="relative flex h-full flex-col items-center justify-center px-6 sm:px-8">
            <p className="text-xs font-bold uppercase tracking-[0.24em] text-gold-light">Search & Discover</p>
            <h1 className="mt-4 font-hero text-[36px] font-black leading-tight tracking-[-0.02em] text-cream-text sm:text-[48px]">
              {title}{accentWord && <span className="text-gold"> {accentWord}</span>}
            </h1>
            {subtitle && (
              <p className="mt-3 max-w-md text-base font-medium text-cream-text/90 sm:text-lg">{subtitle}</p>
            )}
          </div>
        </div>
      </section>
    );
  }

  // Homepage hero mode — original Street Food Rome layout, v2 colors
  return (
    <section id="hero" className="bg-cream">
      <div className="relative h-[420px] w-full overflow-hidden sm:h-[520px]">
        {imageUrl ? (
          <SafeImage
            src={imageUrl}
            alt={home?.imageAlt ?? "A Roman trattoria table set out on a cobbled street, where Rome's street food tours begin"}
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
        ) : null}
        {/* Dark-green overlay: same box as the image, so there is no gap or overflow */}
        <div
          className="absolute inset-0"
          style={{
            background:
              'linear-gradient(100deg, rgba(12,35,26,0.88) 0%, rgba(12,35,26,0.62) 45%, rgba(12,35,26,0.30) 100%)',
          }}
        />

        <div className="relative mx-auto flex h-full max-w-[1200px] flex-col justify-center px-6 pb-12 sm:px-10">
          <p className="text-xs font-bold uppercase tracking-[0.28em] text-gold">{home?.eyebrow ?? 'Rome, Italy'}</p>
          <h1 className="mt-4 max-w-3xl font-hero text-[40px] font-black leading-[1.05] tracking-[-0.02em] text-cream-text sm:text-[60px]">
            {home ? (
              <>
                {home.title[0]}
                <span className="text-gold">{home.title[1]}</span>
                {home.title[2]}
              </>
            ) : (
              <>
                Rome&rsquo;s Ultimate <span className="text-gold">Street Food</span> &amp; Culinary Experiences
              </>
            )}
          </h1>
        </div>
      </div>

      {/* Search bar on the bottom edge of the hero: half over the photo, half below */}
      <div className="relative z-10 mx-auto -mt-8 max-w-[820px] px-6">
        <div className="rounded-full shadow-search">
          <GlobalSearchBox
            placeholder={home?.placeholder ?? 'Trastevere, Testaccio, Suppli, Pizza al Taglio…'}
            compact={false}
            className="w-full"
          />
        </div>
      </div>

      {/* Chips: one row only */}
      <div className="mx-auto flex max-w-[1200px] items-center gap-2 px-6 pb-8 pt-8 sm:px-10">
        <button
          type="button"
          aria-label="Scroll categories left"
          onClick={() => scrollBy(-320)}
          className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-line bg-paper text-ink transition-colors duration-200 hover:border-brand hover:text-brand"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <path d="m15 5-7 7 7 7" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>

        <div
          ref={scrollerRef}
          className="flex flex-1 items-center gap-2.5 overflow-x-auto scroll-smooth [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        >
          {chips.map((chip) => (
            <Link
              key={`${chip.label}-${chip.href}`}
              href={chip.href}
              className="flex h-11 shrink-0 items-center whitespace-nowrap rounded-full border border-line bg-paper px-5 text-[15px] font-semibold text-ink transition-colors duration-200 hover:border-brand hover:bg-accent-soft hover:text-brand"
            >
              {chip.label}
            </Link>
          ))}
        </div>

        <button
          type="button"
          aria-label="Scroll categories right"
          onClick={() => scrollBy(320)}
          className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-line bg-paper text-ink transition-colors duration-200 hover:border-brand hover:text-brand"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <path d="m9 5 7 7-7 7" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
      </div>
    </section>
  );
}
