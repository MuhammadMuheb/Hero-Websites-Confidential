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
} from '@/lib/naples-street-food';
import { HERO } from '@/lib/naples-street-food-content';
import {
  CarouselArrows,
  QuickFactsStrip,
  RibbonBadge,
  TourComparisonTable,
  NSFAuthorBox,
  useCardCarousel,
} from '@/components/naples-street-food/NSFShared';

/**
 * Homepage for the Naples Street Food hero property. Now uses the unified
 * platform Header/Footer for consistency across the entire network.
 */

function MoneyPagesCarousel() {
  const { trackRef, scrollByOneCard } = useCardCarousel();
  return (
    <section id="tours" className="scroll-mt-[65px] border-b border-line py-16 sm:py-20">
      <div className="mx-auto max-w-[1200px] px-6 sm:px-14">
        <div className="flex flex-wrap items-end justify-between gap-y-4">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-accent">Naples food tours</p>
            <h2 className="mt-2 font-display text-[26px] font-bold leading-[1.2] tracking-tight text-ink sm:text-[32px]">
              Choose Your Food Experience
            </h2>
          </div>
          <CarouselArrows label="food tour" onPrev={() => scrollByOneCard(-1)} onNext={() => scrollByOneCard(1)} />
        </div>
        <p className="mt-3 max-w-[62ch] text-[15.5px] leading-relaxed text-ink-muted">
          Every card below is its own guide with its own primary keyword — each covers a distinct Naples food niche.
        </p>
        <div ref={trackRef} className="mt-8 grid auto-cols-[calc(100%-2.5rem)] grid-flow-col gap-6 overflow-x-auto scroll-smooth [scrollbar-width:none] sm:auto-cols-[calc((100%-1.5rem)/2)] lg:auto-cols-[calc((100%-3*1.5rem)/4)] [&::-webkit-scrollbar]:hidden" style={{ scrollSnapType: 'x mandatory' }}>
          {MONEY_PAGES.map((page) => (
            <Link key={page.href} href={page.href} style={{ scrollSnapAlign: 'start' }} className="group flex flex-col overflow-hidden rounded-media border border-line bg-white transition-all duration-300 hover:-translate-y-1 hover:border-line hover:shadow-card-hover">
              <div className="relative aspect-[4/3] overflow-hidden bg-media">
                <SafeImage src={page.image.src} alt={page.image.alt} fill sizes="(min-width: 1024px) 280px, (min-width: 640px) 45vw, 90vw" className="object-cover transition-transform duration-500 group-hover:scale-105" />
                {page.badge ? <RibbonBadge label={page.badge} /> : null}
              </div>
              <div className="flex flex-1 flex-col p-4">
                <h3 className="font-display text-[16px] font-bold leading-snug text-ink">{page.title}</h3>
                <p className="mt-2 flex-1 text-[14.5px] leading-relaxed text-ink-muted">{page.blurb}</p>
                <span className="mt-3 inline-block w-fit rounded-full bg-media px-2.5 py-1 text-xs font-semibold text-ink-muted">{page.keyword}</span>
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
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-accent">Live tour listings</p>
            <h2 className="mt-2 font-display text-[26px] font-bold leading-[1.2] tracking-tight text-ink sm:text-[32px]">
              Featured Naples Food Tours
            </h2>
          </div>
          <div className="flex items-center gap-3">
            <span className="hidden rounded-full bg-white px-3 py-1 text-xs font-semibold uppercase tracking-[0.08em] text-ink-muted sm:inline-block">€35 – €70 price band</span>
            <CarouselArrows label="food tour" onPrev={() => scrollByOneCard(-1)} onNext={() => scrollByOneCard(1)} />
          </div>
        </div>
        <p className="mt-3 max-w-[62ch] text-[15.5px] leading-relaxed text-ink-muted">
          Every card pulls partner, price band, and current listing live from tour operators.
        </p>
        <div ref={trackRef} className="mt-8 grid auto-cols-[calc(100%-2.5rem)] grid-flow-col gap-6 overflow-x-auto scroll-smooth [scrollbar-width:none] sm:auto-cols-[calc((100%-1.5rem)/2)] lg:auto-cols-[calc((100%-3*1.5rem)/4)] [&::-webkit-scrollbar]:hidden" style={{ scrollSnapType: 'x mandatory' }}>
          {FEATURED_TOURS.map((tour) => (
            <div key={tour.slug} style={{ scrollSnapAlign: 'start' }} className="flex flex-col overflow-hidden rounded-media border border-line bg-white transition-all duration-300 hover:-translate-y-1 hover:shadow-card-hover">
              <div className="relative aspect-[4/3] bg-media">
                <SafeImage src={tour.image.src} alt={tour.image.alt} fill sizes="(min-width: 1024px) 280px, (min-width: 640px) 45vw, 90vw" className="object-cover" />
                {tour.badge ? <RibbonBadge label={tour.badge} /> : null}
              </div>
              <div className="flex flex-1 flex-col p-4">
                <span className="w-fit rounded-full bg-media px-2.5 py-1 text-xs font-semibold text-ink-muted">{tour.partner}</span>
                <h3 className="mt-3 font-display text-[16px] font-bold leading-snug text-ink">{tour.title}</h3>
                <p className="mt-1.5 text-sm text-ink-muted">{tour.meta}</p>
                <div className="mt-4 flex items-end justify-between">
                  <span className="font-display text-2xl font-bold tabular-nums text-ink">from €{tour.priceFrom}</span>
                  <Link href={tour.href} className="text-sm font-bold text-accent hover:underline">View &rarr;</Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function NaplesStreetFoodHome() {
  const faqJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: FAQS.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: { '@type': 'Answer', text: faq.answer },
    })),
  };

  return (
    <div className="nsf-scope bg-white">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />

      <NetworkPropertyHero
        heroImageUrl={HERO_IMAGE.src}
        heroImageAlt={HERO_IMAGE.alt}
        heroHeadline={HERO.headline}
        navigationLinks={QUICK_LINKS}
        searchPlaceholder="Search food tours…"
      />

      {/* ---------- quick facts ---------- */}
      <section className="border-b border-line bg-paper-tint py-14 sm:py-16">
        <div className="mx-auto max-w-[1200px] px-6 sm:px-14">
          <p className="text-xs font-semibold uppercase tracking-[0.14em] text-accent">Naples by the numbers</p>
          <h2 className="mt-2 font-display text-[24px] font-bold leading-snug tracking-tight text-ink sm:text-[28px]">
            Street Food Essentials
          </h2>
          <p className="mt-3 max-w-[62ch] text-[15.5px] leading-relaxed text-ink-muted">
            Quick facts about Naples food tours, pizza heritage, and when to visit.
          </p>
          <div className="mt-8">
            <QuickFactsStrip facts={QUICK_FACTS} />
          </div>
        </div>
      </section>

      <MoneyPagesCarousel />
      <FeaturedToursCarousel />

      {/* ---------- comparison table ---------- */}
      <section className="border-b border-line py-16 sm:py-20">
        <div className="mx-auto max-w-[1200px] px-6 sm:px-14">
          <p className="text-xs font-semibold uppercase tracking-[0.14em] text-accent">Every tour, side by side</p>
          <h2 className="mt-2 font-display text-[26px] font-bold leading-[1.2] tracking-tight text-ink sm:text-[32px]">
            Compare All Featured Tours at a Glance
          </h2>
          <p className="mt-3 max-w-[62ch] text-[15.5px] leading-relaxed text-ink-muted">
            Price and partner comparison for every featured Naples street food tour.
          </p>
          <div className="mt-8">
            <TourComparisonTable tours={FEATURED_TOURS} caption="Comparison of featured Naples street food tours by partner and price" />
          </div>
        </div>
      </section>

      {/* ---------- support pages ---------- */}
      <section id="plan-your-trip" className="scroll-mt-[65px] border-b border-line bg-paper-tint py-16 sm:py-20">
        <div className="mx-auto max-w-[1200px] px-6 sm:px-14">
          <p className="text-xs font-semibold uppercase tracking-[0.14em] text-accent">Free planning guides</p>
          <h2 className="mt-2 font-display text-[26px] font-bold leading-[1.2] tracking-tight text-ink sm:text-[32px]">
            Before You Book
          </h2>
          <p className="mt-3 max-w-[62ch] text-[15.5px] leading-relaxed text-ink-muted">
            Each guide below dives into one aspect of Naples food culture to help you plan better.
          </p>
          <div className="mt-8 grid gap-5 sm:grid-cols-2">
            {SUPPORT_PAGES.map((page) => (
              <Link key={page.href} href={page.href} className="group flex items-center gap-4 rounded-media border border-line bg-white p-4 transition-all duration-300 hover:-translate-y-0.5 hover:border-white hover:shadow-card-soft">
                <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-xl bg-media sm:h-[72px] sm:w-[72px]">
                  <SafeImage src={page.image.src} alt={page.image.alt} fill sizes="72px" className="object-cover" />
                </div>
                <div className="min-w-0 flex-1">
                  <h3 className="text-[15px] font-bold leading-snug text-ink">{page.title}</h3>
                  <span className="mt-2 inline-block w-fit rounded-full bg-media px-2.5 py-1 text-xs font-semibold text-ink-muted">{page.keyword}</span>
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
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true" className="shrink-0 text-faint transition-transform group-open:rotate-180">
                    <path d="m6 9 6 6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </summary>
                <p className="mt-3 text-sm leading-relaxed text-ink-muted">{faq.answer}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <NSFAuthorBox />
    </div>
  );
}
