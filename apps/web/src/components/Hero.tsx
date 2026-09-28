'use client';

import { useRef } from 'react';
import Link from '@/components/NetworkLink';
import { SafeImage } from './SafeImage';
import { GlobalSearchBox } from './GlobalSearchBox';
import { tourHref } from '@/lib/tours';

interface HeroProps {
  imageUrl: string | null;
  /** Inner page title (triggers inner page hero mode instead of homepage hero) */
  title?: string;
  subtitle?: string;
  accentWord?: string;
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

export function Hero({ imageUrl, title, subtitle, accentWord }: HeroProps) {
  const scrollerRef = useRef<HTMLDivElement>(null);
  const isInnerPage = !!title;

  function scrollBy(delta: number) {
    scrollerRef.current?.scrollBy({ left: delta, behavior: 'smooth' });
  }

  // Inner page hero mode
  if (isInnerPage) {
    return (
      <section className="bg-paper">
        {imageUrl ? (
          <div className="relative h-64 w-full overflow-hidden sm:h-80">
            <SafeImage src={imageUrl} alt={title} fill priority sizes="100vw" className="object-cover" />
          </div>
        ) : null}
        <div className="mx-auto max-w-6xl px-6 py-12 text-center sm:px-8 sm:py-16">
          <h1 className="font-display text-3xl font-bold text-ink sm:text-4xl">
            {title}{accentWord && <span className="text-accent"> {accentWord}</span>}
          </h1>
          {subtitle && <p className="mt-3 text-lg text-ink-muted">{subtitle}</p>}
        </div>
      </section>
    );
  }

  // Homepage hero mode (§4 spec)
  return (
    <section id="hero">
      {/* Dark hero: photo + overlay as same box (absolute inset-0) to prevent gaps/horizontal scroll */}
      <div className="relative w-full" style={{ aspectRatio: '16 / 9', maxHeight: '500px' }}>
        {imageUrl ? (
          <SafeImage
            src={imageUrl}
            alt="Rome street food experience"
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
        ) : null}
        {/* Overlay and hero content in same container */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/50 to-black/70" />

        <div className="absolute inset-0 flex flex-col items-center justify-center px-6">
          <p className="text-xs font-semibold uppercase tracking-wider text-gold">Rome, Italy</p>
          <h1 className="mt-4 max-w-3xl text-center font-display text-4xl font-black leading-tight tracking-tight text-white sm:text-5xl md:text-6xl">
            Rome&rsquo;s Ultimate <span className="text-gold">Street Food</span> &amp; Culinary Experiences
          </h1>
          <p className="mt-4 max-w-2xl text-center text-lg text-white/90">Authentic culinary walks led by locals</p>

          {/* Search bar */}
          <div className="mt-8 w-full max-w-2xl">
            <GlobalSearchBox
              placeholder="Trastevere, Testaccio, Suppli, Pizza al Taglio…"
              compact={false}
              className="w-full"
            />
          </div>

          {/* Chips */}
          <div className="mt-8 flex flex-wrap items-center justify-center gap-2">
            {CHIPS.slice(0, 8).map((chip) => (
              <Link
                key={chip.label}
                href={chip.href}
                className="inline-flex rounded-full border border-white/30 bg-white/10 px-3 py-1.5 text-sm font-medium text-white hover:bg-white/20 transition-colors backdrop-blur"
              >
                {chip.label}
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* Category chips carousel — separate section */}
      <div className="bg-paper">
        <div className="mx-auto flex max-w-7xl items-center gap-2 px-6 py-6">
          <button
            type="button"
            aria-label="Scroll categories left"
            onClick={() => scrollBy(-320)}
            className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-line bg-paper text-ink-muted hover:border-accent hover:text-accent transition-colors duration-200"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <path d="m15 5-7 7 7 7" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>

          <div
            ref={scrollerRef}
            className="flex flex-1 items-center gap-2.5 overflow-x-auto scroll-smooth [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
          >
            {CHIPS.map((chip) => (
              <Link
                key={chip.label}
                href={chip.href}
                className="flex h-10 shrink-0 items-center whitespace-nowrap rounded-full border border-line bg-paper px-4 text-sm font-semibold text-ink hover:border-accent hover:bg-accent-soft hover:text-accent transition-colors duration-200"
              >
                {chip.label}
              </Link>
            ))}
          </div>

          <button
            type="button"
            aria-label="Scroll categories right"
            onClick={() => scrollBy(320)}
            className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-line bg-paper text-ink-muted hover:border-accent hover:text-accent transition-colors duration-200"
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
