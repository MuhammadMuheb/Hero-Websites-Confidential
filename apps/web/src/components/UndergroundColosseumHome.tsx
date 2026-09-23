'use client';

import Link from '@/components/NetworkLink';
import { SafeImage } from '@/components/SafeImage';
import { NetworkPropertyHero } from '@/components/NetworkPropertyHero';
import {
  ARENA_FLOOR_PAGE,
  FAQS,
  FEATURED_TOURS,
  HERO_IMAGE,
  MONEY_PAGES,
  QUICK_FACTS,
  QUICK_LINKS,
  SUPPORT_PAGES,
  WORTH_IT_PAGE,
} from '@/lib/underground-colosseum';
import {
  CarouselArrows,
  QuickFactsStrip,
  RibbonBadge,
  TourComparisonTable,
  UCAuthorBox,
  useCardCarousel,
} from '@/components/underground-colosseum/UCShared';

/**
 * Homepage for the Underground Colosseum hero property (undergroundcolosseum.com,
 * served here at /underground-colosseum as part of the unified 13-property
 * network). Uses the platform's unified Header/Footer for consistency across
 * all network properties. Built off the site's wireframe: hero -> quick-jump
 * chips -> 5 money-page cards -> featured tours -> validation teasers -> 6
 * support-page cards -> FAQ -> author box -> footer. The two tour-card grids
 * are client-side carousels (scroll-snap track + looping prev/next arrows),
 * the same pattern as the platform's own TourCarouselSection.tsx — hence 'use
 * client' at the top of an otherwise static page.
 */

/**
 * "Choose Your Colosseum Tour" — the 5 money pages, as a carousel track
 * instead of a fixed grid (matches the platform's TourCarouselSection
 * pattern; still exactly 5 cards, since those are 5 fixed distinct SEO
 * pages per the site blueprint — this only changes how they're browsed).
 */
function MoneyPagesCarousel() {
  const { trackRef, scrollByOneCard } = useCardCarousel();

  return (
    <section id="tours" className="scroll-mt-[65px] border-b border-line py-16 sm:py-20">
      <div className="mx-auto max-w-[1200px] px-6 sm:px-14">
        <div className="flex flex-wrap items-end justify-between gap-y-4">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-accent">The 5 ways to book</p>
            <h2 className="mt-2 font-sans text-[28px] font-extrabold leading-[1.15] tracking-tight text-ink sm:text-[36px]">
              Choose Your Colosseum Tour
            </h2>
          </div>
          <CarouselArrows label="tour page" onPrev={() => scrollByOneCard(-1)} onNext={() => scrollByOneCard(1)} />
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
                <h3 className="font-sans text-[17px] font-bold leading-snug text-ink">{page.title}</h3>
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

/**
 * "Featured Tours" — 8 diverse bookable listings across all three partners,
 * as a carousel showing 4 cards at once on desktop (2 tablet, 1 mobile),
 * with looping prev/next arrows.
 */
function FeaturedToursCarousel() {
  const { trackRef, scrollByOneCard } = useCardCarousel();

  return (
    <section id="featured-tours" className="scroll-mt-[65px] border-b border-line bg-paper-tint py-16 sm:py-20">
      <div className="mx-auto max-w-[1200px] px-6 sm:px-14">
        <div className="flex flex-wrap items-end justify-between gap-y-4">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-accent">Live tour comparison</p>
            <h2 className="mt-2 font-sans text-[28px] font-extrabold leading-[1.15] tracking-tight text-ink sm:text-[36px]">
              Featured Tours
            </h2>
          </div>
          <div className="flex items-center gap-3">
            <span className="hidden rounded-full bg-white px-3 py-1 text-xs font-semibold uppercase tracking-[0.08em] text-ink-muted sm:inline-block">
              €50 – €110 price band
            </span>
            <CarouselArrows label="tour" onPrev={() => scrollByOneCard(-1)} onNext={() => scrollByOneCard(1)} />
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
          Underground slots are capped daily — official releases often sell out within minutes.
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
                <h3 className="mt-3 font-sans text-[17px] font-bold leading-snug text-ink">{tour.title}</h3>
                <p className="mt-1.5 text-sm text-ink-muted">{tour.meta}</p>
                <div className="mt-4 flex items-end justify-between">
                  <span className="font-sans text-2xl font-bold tabular-nums text-ink">from &euro;{tour.priceFrom}</span>
                  <Link href={`/go/${tour.slug}`} className="text-sm font-bold text-accent hover:underline">
                    View tour &rarr;
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

export function UndergroundColosseumHome() {
  const websiteJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'Underground Colosseum',
    url: 'https://undergroundcolosseum.com/',
  };

  const organizationJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'Underground Colosseum',
    url: 'https://undergroundcolosseum.com/',
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
      url: `https://undergroundcolosseum.com${page.href}`,
    })),
  };

  return (
    <div className="bg-white">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListJsonLd) }} />

      <NetworkPropertyHero
        heroImageUrl={HERO_IMAGE.src}
        heroImageAlt={HERO_IMAGE.alt}
        heroHeadline="Underground & Arena Floor Colosseum Tours"
        navigationLinks={QUICK_LINKS}
        searchPlaceholder="Underground tours, Arena floor, Colosseum access…"
      />

      {/* ---------- Colosseum by the numbers ---------- */}
      <section className="border-b border-line bg-paper-tint py-14 sm:py-16">
        <div className="mx-auto max-w-[1200px] px-6 sm:px-14">
          <p className="text-xs font-semibold uppercase tracking-[0.14em] text-accent">Before the tunnels were tours</p>
          <h2 className="mt-2 font-sans text-[26px] font-extrabold leading-snug tracking-tight text-ink sm:text-[32px]">
            The Colosseum, by the Numbers
          </h2>
          <p className="mt-3 max-w-[62ch] text-[15.5px] leading-relaxed text-ink-muted">
            A little history before you book — the same facts that make the underground worth seeing in the first place.
          </p>
          <div className="mt-8">
            <QuickFactsStrip facts={QUICK_FACTS} />
          </div>
        </div>
      </section>

      <MoneyPagesCarousel />
      <FeaturedToursCarousel />

      {/* ---------- full tour comparison table ---------- */}
      <section className="border-b border-line py-16 sm:py-20">
        <div className="mx-auto max-w-[1200px] px-6 sm:px-14">
          <p className="text-xs font-semibold uppercase tracking-[0.14em] text-accent">Every partner, side by side</p>
          <h2 className="mt-2 font-sans text-[28px] font-extrabold leading-[1.15] tracking-tight text-ink sm:text-[36px]">
            Compare All 8 Tours at a Glance
          </h2>
          <p className="mt-3 max-w-[62ch] text-[15.5px] leading-relaxed text-ink-muted">
            The same 8 listings as the carousel above, laid out as a straight spec comparison — duration, whether arena-floor
            access is actually included, and price, so you can scan the whole market in one table instead of card by card.
          </p>
          <div className="mt-8">
            <TourComparisonTable tours={FEATURED_TOURS} caption="Comparison of every featured Colosseum tour by partner, duration, arena-floor access and price" />
          </div>
        </div>
      </section>

      {/* ---------- validation teasers ---------- */}
      <section className="border-b border-line py-16 sm:py-20">
        <div className="mx-auto max-w-[1200px] px-6 sm:px-14">
          <p className="text-xs font-semibold uppercase tracking-[0.14em] text-accent">Before you book</p>
          <h2 className="mt-2 font-sans text-[28px] font-extrabold leading-[1.15] tracking-tight text-ink sm:text-[36px]">
            Know Before You Go
          </h2>

          <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            <div className="overflow-hidden rounded-media bg-accent-soft transition-shadow duration-300 hover:shadow-card-soft">
              <div className="relative aspect-[16/9] bg-media">
                <SafeImage
                  src={WORTH_IT_PAGE.image.src}
                  alt={WORTH_IT_PAGE.image.alt}
                  fill
                  sizes="(min-width: 640px) 50vw, 100vw"
                  className="object-cover"
                />
              </div>
              <div className="p-6">
                <h3 className="font-sans text-[17px] font-bold leading-snug text-ink">{WORTH_IT_PAGE.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-ink-muted">
                  Short answer: yes, if you book the arena-floor add-on directly — here&rsquo;s the honest breakdown,
                  including when it isn&rsquo;t worth the extra cost.
                </p>
                <Link href={WORTH_IT_PAGE.href} className="mt-4 inline-block text-sm font-bold text-accent hover:underline">
                  Read the verdict &rarr;
                </Link>
              </div>
            </div>

            <div className="overflow-hidden rounded-media border border-line bg-white transition-shadow duration-300 hover:shadow-card-soft">
              <div className="relative aspect-[16/9] bg-media">
                <SafeImage
                  src={ARENA_FLOOR_PAGE.image.src}
                  alt={ARENA_FLOOR_PAGE.image.alt}
                  fill
                  sizes="(min-width: 640px) 50vw, 100vw"
                  className="object-cover"
                />
              </div>
              <div className="p-6">
                <h3 className="font-sans text-[17px] font-bold leading-snug text-ink">{ARENA_FLOOR_PAGE.title}</h3>
                <span className="mt-3 inline-block w-fit rounded-full bg-media px-2.5 py-1 text-xs font-semibold text-ink-muted">
                  {ARENA_FLOOR_PAGE.keyword}
                </span>
                <p className="mt-3 text-sm leading-relaxed text-ink-muted">
                  First-hand photography, step by step, from the entrance to the reconstructed floor itself.
                </p>
                <Link href={ARENA_FLOOR_PAGE.href} className="mt-4 inline-block text-sm font-bold text-accent hover:underline">
                  Read &rarr;
                </Link>
              </div>
            </div>

            <div className="overflow-hidden rounded-media border border-line bg-white transition-shadow duration-300 hover:shadow-card-soft">
              <div className="relative aspect-[16/9] bg-media">
                <SafeImage
                  src="https://images.unsplash.com/photo-1590273971191-2af8df641e2c"
                  alt="Wide view of the Colosseum under a dramatic sky"
                  fill
                  sizes="(min-width: 1024px) 380px, (min-width: 640px) 45vw, 90vw"
                  className="object-cover"
                />
                <span className="absolute left-3 top-3 flex h-9 w-9 items-center justify-center rounded-full bg-white/90 text-gold backdrop-blur-sm">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                    <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.6" />
                    <path d="M12 7v5l3.5 2" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
                  </svg>
                </span>
              </div>
              <div className="p-6">
                <h3 className="font-sans text-[17px] font-bold leading-snug text-ink">Opening Hours at a Glance</h3>
                <ul className="mt-3 divide-y divide-line text-[14.5px] text-ink-muted">
                  <li className="flex items-center justify-between gap-3 py-1.5">
                    <span>Summer (late Mar–Aug)</span>
                    <span className="font-bold text-ink">8:30am–7:15pm</span>
                  </li>
                  <li className="flex items-center justify-between gap-3 py-1.5">
                    <span>Autumn (Sep–Oct)</span>
                    <span className="font-bold text-ink">8:30am–6:30/7pm</span>
                  </li>
                  <li className="flex items-center justify-between gap-3 py-1.5">
                    <span>Winter (Nov–mid Feb)</span>
                    <span className="font-bold text-ink">8:30am–4:30/5pm</span>
                  </li>
                </ul>
                <p className="mt-3 text-xs leading-relaxed text-faint">
                  Closed Jan 1, May 1 &amp; Dec 25. Hours shift with sunset — always confirm before you go.
                </p>
                <Link href="/support/opening-hours-beating-the-crowds" className="mt-4 inline-block text-sm font-bold text-accent hover:underline">
                  Full crowd-avoidance guide &rarr;
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ---------- plan your visit / support pages ---------- */}
      <section id="plan-your-visit" className="scroll-mt-[65px] border-b border-line bg-paper-tint py-16 sm:py-20">
        <div className="mx-auto max-w-[1200px] px-6 sm:px-14">
          <p className="text-xs font-semibold uppercase tracking-[0.14em] text-accent">Free planning guides</p>
          <h2 className="mt-2 font-sans text-[28px] font-extrabold leading-[1.15] tracking-tight text-ink sm:text-[36px]">
            Plan Your Visit
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
          <h2 className="mt-2 text-center font-sans text-[28px] font-extrabold leading-[1.15] tracking-tight text-ink sm:text-[36px]">
            Frequently Asked
          </h2>
          <div className="mt-8 divide-y divide-line rounded-media border border-line bg-white">
            {FAQS.map((faq) => (
              <details key={faq.question} className="group px-6 py-5">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-display text-base font-semibold text-ink marker:content-none">
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

      <UCAuthorBox />
    </div>
  );
}
