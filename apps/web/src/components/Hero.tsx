'use client';

import { useRef } from 'react';
import Link from '@/components/NetworkLink';
import { SafeImage } from './SafeImage';
import { GlobalSearchBox } from './GlobalSearchBox';
import { tourHref } from '@/lib/tours';

interface HeroProps {
  imageUrl: string | null;
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

export function Hero({ imageUrl }: HeroProps) {
  const scrollerRef = useRef<HTMLDivElement>(null);

  function scrollBy(delta: number) {
    scrollerRef.current?.scrollBy({ left: delta, behavior: 'smooth' });
  }

  return (
    <section>
      <div className="relative h-[400px] w-full overflow-hidden sm:h-[480px]">
        {imageUrl ? (
          <SafeImage
            src={imageUrl}
            alt="A small, authentic Roman trattoria with a handwritten specials board — Rome street food, not a generic Europe scene"
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
        ) : null}
        <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/25 to-black/10" />

        <div className="relative mx-auto flex h-full max-w-[960px] flex-col justify-center px-6 pb-10">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-white/70">Rome, Italy</p>
          <h1 className="mt-3 max-w-2xl font-sans text-[40px] font-extrabold leading-[1.1] tracking-tight text-white sm:text-[60px] sm:leading-[1.05]">
            Rome&rsquo;s Ultimate Street Food &amp; Culinary Experiences
          </h1>
        </div>
      </div>

      {/* Search bar straddles the hero/strip boundary — half over the photo, half over the light
          section below — matching the reference's actual overlap, not fully embedded in the photo. */}
      <div className="relative z-10 mx-auto -mt-8 max-w-[896px] px-6">
        <GlobalSearchBox
          placeholder="Trastevere, Testaccio, Suppli, Pizza al Taglio…"
          compact={false}
          className="w-full"
        />
      </div>

      {/* Category chips — separate strip below the photo, functional scroll like the reference.
          White, not the light-gray tint used elsewhere: the section right below (Trust Points)
          is already that gray, and two identical backgrounds back-to-back read as one seamless
          block with no boundary between them. */}
      <div className="bg-white">
        <div className="mx-auto flex max-w-[1200px] items-center gap-2 px-6 pb-6 pt-8">
          <button
            type="button"
            aria-label="Scroll categories left"
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
            {CHIPS.map((chip) => (
              <Link
                key={chip.label}
                href={chip.href}
                className="flex h-[42px] shrink-0 items-center whitespace-nowrap rounded-full border border-line bg-white px-4 text-[15px] font-bold text-ink-soft transition-all duration-200 ease-out hover:border-accent hover:bg-accent-soft hover:text-accent"
              >
                {chip.label}
              </Link>
            ))}
          </div>

          <button
            type="button"
            aria-label="Scroll categories right"
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
