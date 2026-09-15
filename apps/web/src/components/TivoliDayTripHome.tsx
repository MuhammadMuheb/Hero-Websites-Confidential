'use client';

import Link from '@/components/NetworkLink';
import { SafeImage } from '@/components/SafeImage';
import {
  FAQS,
  FEATURED_TOURS,
  HERO_IMAGE,
  MONEY_PAGES,
  QUICK_FACTS,
  QUICK_LINKS,
  SUPPORT_PAGES,
} from '@/lib/tivoli-day-trip';
import { HERO } from '@/lib/tivoli-day-trip-content';
import {
  CarouselArrows,
  QuickFactsStrip,
  RibbonBadge,
  TourComparisonTable,
  TVDTAuthorBox,
  TVDTFooter,
  TVDTHeader,
  useCardCarousel,
} from '@/components/tivoli-day-trip/TVDTShared';

/**
 * Homepage for the Tivoli Day Trip hero property (TivoliDayTrip.com,
 * served here at /tivoli-day-trip). Mirrors TuscanyDayTripHome structure:
 * hero -> quick-jump chips -> facts strip -> 4 money-page cards -> featured
 * day trips -> comparison table -> support-page grid -> FAQ -> author box -> footer.
 * Wrapped in `.tvdt-scope` for Tivoli accent tokens.
 */

function MoneyPagesCarousel() {
  const { trackRef, scrollByOneCard } = useCardCarousel();

  return (
    <section id="tours" className="scroll-mt-[65px] border-b border-line py-16 sm:py-20">
      <div className="mx-auto max-w-[1200px] px-6 sm:px-14">
        <div className="flex flex-wrap items-end justify-between gap-y-4">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-accent">The 4 ways to book</p>
            <h2 className="mt-2 font-display text-[26px] font-bold leading-[1.2] tracking-tight text-ink sm:text-[32px]">
              Choose Your Tivoli Day Trip
            </h2>
          </div>
          <CarouselArrows label="day trip page" onPrev={() => scrollByOneCard(-1)} onNext={() => scrollByOneCard(1)} />
        </div>
        <p className="mt-3 max-w-[62ch] text-[15.5px] leading-relaxed text-ink-muted">
          Every card below is its own page with its own primary keyword — no two share intent, so each can rank on
          its own.
        </p>

        <div
          ref={trackRef}
          className="mt-8 grid auto-cols-[calc(100%-2.5rem)] grid-flow-col gap-6 overflow-x-auto scroll-smooth [scrollbar-width:none] sm:auto-cols-[calc((100%-1.5rem)/2)] lg:auto-cols-[calc((100%-3*1.5rem)/4)] [&::-webkit-scrollbar]:hidden"
          style={{ scrollSnapType: 'x mandatory' }}
        >
          {MONEY_PAGES.map((page) => (
            <Link
              key={page.href}
              href={page.href}
              style={{ scrollSnapAlign: 'start' }}
              className="group flex flex-col overflow-hidden rounded-media border border-line bg-white transition-all duration-300 hover:-translate-y-1 hover:border-line hover:shadow-card-hover"
            >
              <div className="relative aspect-[4/3] overflow-hidden bg-media">
                <SafeImage
                  src={page.image.src}
                  alt={page.image.alt}
                  fill
                  sizes="(min-width: 1024px) 280px, (min-width: 640px) 45vw, 90vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
                {page.badge ? <RibbonBadge label={page.badge} /> : null}
              </div>
              <div className="flex flex-1 flex-col p-4">
                <h3 className="font-display text-[16px] font-bold leading-snug text-ink">{page.title}</h3>
                <p className="mt-2 flex-1 text-[14.5px] leading-relaxed text-ink-muted">{page.blurb}</p>
                <span className="mt-3 inline-block w-fit rounded-full bg-media px-2.5 py-1 text-xs font-semibold text-ink-muted">
                  {page.keyword}
                </span>
                <span className="mt-4 inline-flex items-center gap-1 text-sm font-bold text-accent">
                  {page.cta}
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden="true" className="transition-transform group-hover:translate-x-0.5">
                    <path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

function FeaturedToursCarousel() {
  const { trackRef, scrollByOneCard } = useCardCarousel();

  return (
    <section id="featured-tours" className="scroll-mt-[65px] border-b border-line bg-paper-tint py-16 sm:py-20">
      <div className="mx-auto max-w-[1200px] px-6 sm:px-14">
        <div className="flex flex-wrap items-end justify-between gap-y-4">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-accent">Live trip comparison</p>
            <h2 className="mt-2 font-display text-[26px] font-bold leading-[1.2] tracking-tight text-ink sm:text-[32px]">
              Featured Day Trips
            </h2>
          </div>
          <div className="flex items-center gap-3">
            <span className="hidden rounded-full bg-white px-3 py-1 text-xs font-semibold uppercase tracking-[0.08em] text-ink-muted sm:inline-block">
              €100 – €180 price band
            </span>
            <CarouselArrows label="day trip" onPrev={() => scrollByOneCard(-1)} onNext={() => scrollByOneCard(1)} />
          </div>
        </div>
        <p className="mt-3 max-w-[62ch] text-[15.5px] leading-relaxed text-ink-muted">
          Every card pulls partner, price band, and duration live from the Tour collection.
        </p>
        <p className="mt-2 flex items-center gap-1.5 text-sm font-semibold text-gold">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden="true" className="shrink-0">
            <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.8" />
            <path d="M12 7v5l3.5 2" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
          </svg>
          Boat tours and private-guide slots book out first — reserve at least a few days ahead in peak season.
        </p>

        <div
          ref={trackRef}
          className="mt-8 grid auto-cols-[calc(100%-2.5rem)] grid-flow-col gap-6 overflow-x-auto scroll-smooth [scrollbar-width:none] sm:auto-cols-[calc((100%-1.5rem)/2)] lg:auto-cols-[calc((100%-3*1.5rem)/4)] [&::-webkit-scrollbar]:hidden"
          style={{ scrollSnapType: 'x mandatory' }}
        >
          {FEATURED_TOURS.map((tour) => (
            <div
              key={tour.slug}
              style={{ scrollSnapAlign: 'start' }}
              className="flex flex-col overflow-hidden rounded-media border border-line bg-white transition-all duration-300 hover:-translate-y-1 hover:shadow-card-hover"
            >
              <div className="relative aspect-[4/3] bg-media">
                <SafeImage
                  src={tour.image.src}
                  alt={tour.image.alt}
                  fill
                  sizes="(min-width: 1024px) 280px, (min-width: 640px) 45vw, 90vw"
                  className="object-cover"
                />
                {tour.badge ? <RibbonBadge label={tour.badge} /> : null}
              </div>
              <div className="flex flex-1 flex-col p-4">
                <span className="w-fit rounded-full bg-media px-2.5 py-1 text-xs font-semibold text-ink-muted">
                  {tour.partner}
                </span>
                <h3 className="mt-3 font-display text-[16px] font-bold leading-snug text-ink">{tour.title}</h3>
                <p className="mt-1.5 text-sm text-ink-muted">{tour.meta}</p>
                <div className="mt-4 flex items-end justify-between">
                  <span className="font-display text-2xl font-bold tabular-nums text-ink">from &euro;{tour.priceFrom}</span>
                  <Link href={tour.href} className="text-sm font-bold text-accent hover:underline">
                    View trip &rarr;
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function TivoliDayTripHome() {
  const websiteJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'Tivoli Day Trip',
    url: 'https://TivoliDayTrip.com/',
  };

  const organizationJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'Tivoli Day Trip',
    url: 'https://TivoliDayTrip.com/',
  };

  const faqJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: FAQS.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: { '@type': 'Answer', text: faq.answer },
    })),
  };

  const itemListJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    itemListElement: MONEY_PAGES.map((page, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: page.title,
      url: `https://TivoliDayTrip.com${page.href}`,
    })),
  };

  const touristTripJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'TouristTrip',
    name: 'Tivoli Coast Day Trips',
    description:
      'Independent guide to Tivoli Coast day trips by road and boat — Positano, Ravello, and Tivoli routing with honest boat-vs-road comparisons.',
    provider: { '@type': 'Organization', name: 'Tivoli Day Trip' },
    url: 'https://TivoliDayTrip.com/',
  };

  return (
    <div className="TVDT-scope bg-white">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(touristTripJsonLd) }} />

      <TVDTHeader />

      {/* ---------- hero ---------- */}
      <section className="border-b border-line">
        <div className="mx-auto grid max-w-[1200px] gap-10 px-6 py-14 sm:px-14 lg:grid-cols-[1.05fr_1fr] lg:items-center lg:py-20">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-faint">
              {HERO.eyebrow || 'Tivoli Coast day trips'}
            </p>
            <h1 className="mt-4 font-display text-[34px] font-bold leading-[1.12] tracking-tight text-ink sm:text-[48px]">
              {HERO.headline}
            </h1>
            <p className="mt-5 max-w-[52ch] text-[17px] leading-relaxed text-ink-muted">
              {HERO.subheadline}
            </p>

            <div className="mt-7 flex flex-wrap gap-3">
              <Link
                href={HERO.primaryCta.href}
                className="flex h-11 items-center justify-center rounded-control bg-accent-gradient px-6 text-sm font-bold text-white shadow-glow transition-transform duration-200 ease-out hover:scale-[1.02] active:scale-[0.98]"
              >
                {HERO.primaryCta.label}
              </Link>
              <Link
                href={HERO.secondaryCta.href}
                className="flex h-11 items-center justify-center rounded-control border border-accent px-6 text-sm font-medium text-accent transition-colors hover:bg-accent-soft"
              >
                {HERO.secondaryCta.label}
              </Link>
            </div>

            <div className="mt-8 flex flex-col gap-2.5 text-sm text-ink-muted sm:flex-row sm:flex-wrap sm:gap-x-6 sm:gap-y-2">
              {HERO.trustBullets.map((label) => (
                <span key={label} className="flex items-center gap-1.5">
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" aria-hidden="true" className="shrink-0 text-success">
                    <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="1.6" />
                    <path d="m8 12.5 2.5 2.5L16 9.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  {label}
                </span>
              ))}
            </div>
          </div>

          <div className="relative aspect-[4/3] overflow-hidden rounded-media bg-media shadow-card">
            <SafeImage
              src={HERO_IMAGE.src}
              alt={HERO_IMAGE.alt}
              fill
              priority
              sizes="(min-width: 1024px) 560px, 100vw"
              className="object-cover"
            />
          </div>
        </div>
      </section>

      {/* ---------- quick-jump topic chips ---------- */}
      <div className="border-b border-line bg-white">
        <div className="mx-auto flex max-w-[1200px] items-center gap-2 overflow-x-auto px-6 py-4 [scrollbar-width:none] sm:px-14 [&::-webkit-scrollbar]:hidden">
          {QUICK_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="flex h-9 shrink-0 items-center whitespace-nowrap rounded-full border border-line px-3.5 text-sm font-semibold text-ink-muted transition-all duration-200 ease-out hover:border-accent hover:bg-accent-soft hover:text-accent"
            >
              {link.label}
            </Link>
          ))}
        </div>
      </div>

      {/* ---------- before you book: Tivoli facts ---------- */}
      <section className="border-b border-line bg-paper-tint py-14 sm:py-16">
        <div className="mx-auto max-w-[1200px] px-6 sm:px-14">
          <p className="text-xs font-semibold uppercase tracking-[0.14em] text-accent">Before you book</p>
          <h2 className="mt-2 font-display text-[24px] font-bold leading-snug tracking-tight text-ink sm:text-[28px]">
            Tivoli Coast, by the Numbers
          </h2>
          <p className="mt-3 max-w-[62ch] text-[15.5px] leading-relaxed text-ink-muted">
            A little geography and timing before you book — the region's logistics and when the coast road is open.
          </p>
          <div className="mt-8">
            <QuickFactsStrip facts={QUICK_FACTS} />
          </div>
        </div>
      </section>

      <MoneyPagesCarousel />
      <FeaturedToursCarousel />

      {/* ---------- full trip comparison table ---------- */}
      <section className="border-b border-line py-16 sm:py-20">
        <div className="mx-auto max-w-[1200px] px-6 sm:px-14">
          <p className="text-xs font-semibold uppercase tracking-[0.14em] text-accent">Every partner, side by side</p>
          <h2 className="mt-2 font-display text-[26px] font-bold leading-[1.2] tracking-tight text-ink sm:text-[32px]">
            Compare All Tivoli Day Trips at a Glance
          </h2>
          <p className="mt-3 max-w-[62ch] text-[15.5px] leading-relaxed text-ink-muted">
            The same listings as the carousel above, laid out as a straight spec comparison — duration, whether
            boat tours are included, and price.
          </p>
          <div className="mt-8">
            <TourComparisonTable tours={FEATURED_TOURS} caption="Comparison of every featured Tivoli Day Trip listing by partner, duration, boat-tour option and price" />
          </div>
        </div>
      </section>

      {/* ---------- before you book / support pages ---------- */}
      <section id="plan-your-trip" className="scroll-mt-[65px] border-b border-line bg-paper-tint py-16 sm:py-20">
        <div className="mx-auto max-w-[1200px] px-6 sm:px-14">
          <p className="text-xs font-semibold uppercase tracking-[0.14em] text-accent">Free planning guides</p>
          <h2 className="mt-2 font-display text-[26px] font-bold leading-[1.2] tracking-tight text-ink sm:text-[32px]">
            Before You Book
          </h2>
          <p className="mt-3 max-w-[62ch] text-[15.5px] leading-relaxed text-ink-muted">
            Each page below feeds trust into one of the money pages above — every link here lands on a page that
            converts.
          </p>

          <div className="mt-8 grid gap-5 sm:grid-cols-2">
            {SUPPORT_PAGES.map((page) => (
              <Link
                key={page.href}
                href={page.href}
                className="group flex items-center gap-4 rounded-media border border-line bg-white p-4 transition-all duration-300 hover:-translate-y-0.5 hover:border-white hover:shadow-card-soft"
              >
                <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-xl bg-media sm:h-[72px] sm:w-[72px]">
                  <SafeImage src={page.image.src} alt={page.image.alt} fill sizes="72px" className="object-cover" />
                </div>
                <div className="min-w-0 flex-1">
                  <h3 className="text-[15px] font-bold leading-snug text-ink">{page.title}</h3>
                  <span className="mt-2 inline-block w-fit rounded-full bg-media px-2.5 py-1 text-xs font-semibold text-ink-muted">
                    {page.keyword}
                  </span>
                </div>
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-line text-faint transition-colors group-hover:border-accent group-hover:text-accent">
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" aria-hidden="true" className="transition-transform group-hover:translate-x-0.5">
                    <path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ---------- FAQ ---------- */}
      <section id="faq" className="scroll-mt-[65px] border-b border-line py-16 sm:py-20">
        <div className="mx-auto max-w-[760px] px-6 sm:px-14">
          <p className="text-center text-xs font-semibold uppercase tracking-[0.14em] text-accent">Fast answers</p>
          <h2 className="mt-2 text-center font-display text-[26px] font-bold leading-[1.2] tracking-tight text-ink sm:text-[32px]">
            Frequently Asked
          </h2>
          <div className="mt-8 divide-y divide-line rounded-media border border-line bg-white">
            {FAQS.map((faq) => (
              <details key={faq.question} className="group px-6 py-5">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-display text-base font-bold text-ink marker:content-none">
                  {faq.question}
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    aria-hidden="true"
                    className="shrink-0 text-faint transition-transform group-open:rotate-180"
                  >
                    <path d="m6 9 6 6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </summary>
                <p className="mt-3 text-sm leading-relaxed text-ink-muted">{faq.answer}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <TVDTAuthorBox />
      <TVDTFooter />
    </div>
  );
}

