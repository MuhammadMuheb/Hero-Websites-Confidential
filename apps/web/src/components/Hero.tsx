'use client';

import { useRef } from 'react';
import Link from '@/components/NetworkLink';
import { SafeImage } from './SafeImage';
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
      <div className="relative h-[340px] w-full sm:h-[420px]">
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
        <div className="absolute inset-0 bg-black/35" />

        <div className="relative mx-auto flex h-full max-w-[896px] flex-col justify-center px-6 pb-8">
          <h1 className="font-sans text-[40px] font-extrabold leading-[1.15] text-white sm:text-[56px] sm:leading-[72px]">
            Rome&rsquo;s Ultimate Street Food &amp; Culinary Experiences
          </h1>
        </div>
      </div>

      {/* Search bar straddles the hero/strip boundary — half over the photo, half over the light
          section below — matching the reference's actual overlap, not fully embedded in the photo. */}
      <div className="relative z-10 mx-auto -mt-[29px] max-w-[896px] px-6">
        <form action="#" className="flex items-center gap-2 rounded-2xl bg-white p-2 shadow-[0_8px_48px_rgba(45,51,57,0.16)]">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" className="ml-3 shrink-0 text-ink-muted" aria-hidden="true">
            <circle cx="11" cy="11" r="7" stroke="currentColor" strokeWidth="1.8" />
            <path d="m20 20-3.5-3.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
          </svg>
          <input
            type="text"
            name="q"
            placeholder="Trastevere, Testaccio, Suppli, Pizza al Taglio…."
            className="h-10 w-full bg-transparent text-base text-ink placeholder:text-ink-muted focus:outline-none"
          />
          <button
            type="submit"
            className="h-10 shrink-0 rounded-[6px] border border-accent px-2 text-base font-medium text-accent"
          >
            Search Tours
          </button>
        </form>
      </div>

      {/* Category chips — separate strip below the photo, functional scroll like the reference.
          White, not the light-gray tint used elsewhere: the section right below (Trust Points)
          is already that gray, and two identical backgrounds back-to-back read as one seamless
          block with no boundary between them. */}
      <div className="bg-white">
        <div className="mx-auto flex max-w-[1200px] items-center gap-2 px-6 pb-6 pt-10">
          <button
            type="button"
            aria-label="Scroll categories left"
            onClick={() => scrollBy(-320)}
            className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-line bg-white text-faint transition-colors hover:border-accent hover:text-accent"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <path d="m15 5-7 7 7 7" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>

          <div
            ref={scrollerRef}
            className="flex flex-1 items-center gap-3 overflow-x-auto scroll-smooth [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
          >
            {CHIPS.map((chip) => (
              <Link
                key={chip.label}
                href={chip.href}
                className="flex h-[42px] shrink-0 items-center whitespace-nowrap rounded-lg border border-line bg-white px-3 text-base font-bold text-accent"
              >
                {chip.label}
              </Link>
            ))}
          </div>

          <button
            type="button"
            aria-label="Scroll categories right"
            onClick={() => scrollBy(320)}
            className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-line bg-white text-faint transition-colors hover:border-accent hover:text-accent"
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
