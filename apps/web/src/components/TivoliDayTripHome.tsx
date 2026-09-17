'use client';

import Link from '@/components/NetworkLink';
import { SafeImage } from '@/components/SafeImage';
import { NetworkPropertyHero } from '@/components/NetworkPropertyHero';
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
  useCardCarousel,
} from '@/components/tivoli-day-trip/TVDTShared';

/**
 * Homepage for the Tivoli Day Trip hero property (TivoliDayTrip.com,
 * served here at /tivoli-day-trip). Mirrors TuscanyDayTripHome structure:
 * hero -> quick-jump chips -> facts strip -> 4 money-page cards -> featured
 * day trips -> comparison table -> support-page grid -> FAQ -> author box -> footer.
 * Now uses the unified platform Header/Footer for consistency across the
 * entire network, wrapped in `.tvdt-scope` for Tivoli accent tokens.
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
          Compare 4 distinct day trip options — each with different timing, transport, and price points, so you can find the one that fits your schedule and budget.
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
          Hand-picked tours from top operators — all rated, verified, and bookable through trusted partner sites.
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
  const baseUrl = 'https://street-food-rome-web.vercel.app';

  const websiteJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'Tivoli Day Trip',
    url: `${baseUrl}/`,
    description: "First-hand Tivoli day-trip guide from Rome. Villa d'Este vs Hadrian's Villa, half-day vs full-day, and honest transit logistics.",
  };

  const organizationJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'Tivoli Day Trip',
    url: `${baseUrl}/`,
    sameAs: ['https://tivolivillas.com'],
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
      url: `${baseUrl}${page.href}`,
    })),
  };

  const touristTripJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'TouristTrip',
    name: 'Tivoli Day Trips from Rome',
    description:
      'Independent guide to Tivoli day trips from Rome — Villa d\'Este fountains and Hadrian\'s Villa ruins, half-day and full-day options, with honest transit logistics and tour comparisons.',
    itinerary: [
      { '@type': 'Place', name: 'Villa d\'Este', description: 'Renaissance fountains and terraced gardens' },
      { '@type': 'Place', name: 'Hadrian\'s Villa', description: 'Ancient Roman ruins and archaeological site' },
    ],
    provider: { '@type': 'Organization', name: 'Tivoli Day Trip' },
    url: `${baseUrl}/`,
  };

  return (
    <div className="TVDT-scope bg-white">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(touristTripJsonLd) }} />

      <NetworkPropertyHero
        propertyName="Tivoli Day Trip"
        heroImageUrl={HERO_IMAGE.src}
        heroImageAlt={HERO_IMAGE.alt}
        heroHeadline={HERO.headline}
        navigationLinks={QUICK_LINKS}
        searchPlaceholder="Tivoli tours, Villa d'Este, Hadrian's Villa…"
      />

      {/* ---------- before you book: Tivoli facts ---------- */}
      <section className="border-b border-line bg-paper-tint py-14 sm:py-16">
        <div className="mx-auto max-w-[1200px] px-6 sm:px-14">
          <p className="text-xs font-semibold uppercase tracking-[0.14em] text-accent">Before you book</p>
          <h2 className="mt-2 font-display text-[24px] font-bold leading-snug tracking-tight text-ink sm:text-[28px]">
            Tivoli, by the Numbers
          </h2>
          <p className="mt-3 max-w-[62ch] text-[15.5px] leading-relaxed text-ink-muted">
            Essential facts about Tivoli — distance from Rome, travel time by train and bus, visit duration for each villa, and best times to visit.
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
            Side-by-side comparison of all featured tours — partner, duration, and price at a glance.
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
            In-depth guides to help you decide: which villa to prioritize, best season to visit, how to get there, and family-friendly planning.
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
    </div>
  );
}
