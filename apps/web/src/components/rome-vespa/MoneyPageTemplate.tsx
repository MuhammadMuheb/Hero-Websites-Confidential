import Link from '@/components/NetworkLink';
import { SafeImage } from '@/components/SafeImage';
import { AtAGlanceBox, TourComparisonTable, RVAuthorBox, RVFooter, RVHeader } from './RVShared';
import { getFeaturedToursForPage } from '@/lib/rome-vespa';
import type { MoneyPageContent } from '@/lib/rome-vespa-content';

/**
 * Shared template for all 5 Rome Vespa money pages — mirrors Private
 * Vatican's/Underground Colosseum's MoneyPageTemplate.tsx exactly in
 * structure (TouristTrip + Product/Offer + FAQPage + BreadcrumbList schema,
 * tour comparison cards, a verdict block, FAQ, one contextual link), themed
 * with Public Sans extrabold headings per this property's design tokens
 * (blueprint §3.3.2) rather than a serif-display treatment. The `.rv-scope`
 * wrapper (see globals.css) scopes the Riviera Teal accent tokens to this
 * subtree only.
 */
export function MoneyPageTemplate({ content }: { content: MoneyPageContent }) {
  // Each money page leads with the tours most relevant to its own topic
  // instead of every page repeating the identical 8 cards in the identical
  // order — same pattern as Private Vatican's getFeaturedToursForPage.
  const relevantTours = getFeaturedToursForPage(content.href, 4);
  const lowestPrice = Math.min(...relevantTours.map((tour) => tour.priceFrom));

  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://romevespa.com/' },
      { '@type': 'ListItem', position: 2, name: content.navTitle, item: `https://romevespa.com${content.href}` },
    ],
  };

  const faqJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: content.faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: { '@type': 'Answer', text: faq.answer },
    })),
  };

  const touristTripJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'TouristTrip',
    name: content.navTitle,
    description: content.metaDescription,
    url: `https://romevespa.com${content.href}`,
  };

  // One Product/Offer node per tour shown in this page's comparison table.
  const productJsonLd = relevantTours.map((tour) => ({
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: tour.title,
    brand: { '@type': 'Organization', name: tour.partner },
    offers: {
      '@type': 'Offer',
      priceCurrency: 'EUR',
      price: tour.priceFrom,
      url: `https://romevespa.com/go/${tour.slug}`,
      availability: 'https://schema.org/InStock',
    },
  }));

  return (
    <div className="rv-scope bg-white pb-20 lg:pb-0">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(touristTripJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(productJsonLd) }} />

      <RVHeader toursHref="/#tours" planHref="/#ride-prep" faqHref="#faq" ctaHref="#tour-options" />

      {/* ---------- mobile sticky CTA ---------- */}
      <div className="fixed inset-x-0 bottom-0 z-30 border-t border-line bg-white/95 px-4 py-3 shadow-bar-up backdrop-blur-sm lg:hidden">
        <div className="mx-auto flex max-w-[1200px] items-center justify-between gap-3">
          <div className="min-w-0">
            <p className="truncate text-[11px] font-semibold uppercase tracking-wide text-faint">{content.navTitle}</p>
            <p className="text-sm font-bold tabular-nums text-ink">From &euro;{lowestPrice}</p>
          </div>
          <a
            href="#tour-options"
            className="flex h-11 shrink-0 items-center justify-center whitespace-nowrap rounded-control bg-accent-gradient px-5 text-sm font-bold text-white shadow-glow transition-transform duration-200 ease-out hover:scale-[1.02] active:scale-[0.98]"
          >
            See Tour Options
          </a>
        </div>
      </div>

      {/* ---------- hero ---------- */}
      <section className="border-b border-line">
        <div className="mx-auto max-w-[1200px] px-6 pt-6 sm:px-14">
          <nav aria-label="Breadcrumb" className="text-sm text-faint">
            <Link href="/" className="hover:text-accent">Home</Link>
            <span className="mx-2">/</span>
            <span className="text-ink-muted">{content.navTitle}</span>
          </nav>
        </div>
        <div className="mx-auto grid max-w-[1200px] gap-10 px-6 py-8 sm:px-14 lg:grid-cols-[1.05fr_1fr] lg:items-center lg:py-14">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-accent">{content.keyword}</p>
            <h1 className="mt-3 font-sans text-[32px] font-extrabold leading-[1.1] tracking-tight text-ink sm:text-[42px]">
              {content.h1}
            </h1>
            {content.intro.map((para, i) => (
              <p key={i} className="mt-4 max-w-[60ch] text-[16px] leading-relaxed text-ink-muted">
                {para}
              </p>
            ))}
            <div className="mt-6 max-w-[420px]">
              <AtAGlanceBox items={content.atAGlance} />
            </div>
            <div className="mt-7 flex flex-wrap gap-3">
              <a
                href="#tour-options"
                className="flex h-11 items-center justify-center rounded-control bg-accent-gradient px-6 text-sm font-bold text-white shadow-glow transition-transform duration-200 ease-out hover:scale-[1.02] active:scale-[0.98]"
              >
                See Tour Options
              </a>
              <Link
                href={content.relatedSupportHref}
                className="flex h-11 items-center justify-center rounded-control border border-accent px-6 text-sm font-medium text-accent transition-colors hover:bg-accent-soft"
              >
                {content.relatedSupportLabel}
              </Link>
            </div>
          </div>
          <div className="relative aspect-[4/3] overflow-hidden rounded-media bg-media">
            <SafeImage src={content.heroImage.src} alt={content.heroImage.alt} fill priority sizes="(min-width: 1024px) 560px, 100vw" className="object-cover" />
          </div>
        </div>
      </section>

      {/* ---------- body sections ---------- */}
      <section className="border-b border-line py-14 sm:py-16">
        <div className="mx-auto max-w-[760px] px-6 sm:px-14">
          {content.sections.map((section) => (
            <div key={section.heading} className="mt-8 first:mt-0">
              <h2 className="font-sans text-[22px] font-extrabold leading-snug tracking-tight text-ink sm:text-[26px]">
                {section.heading}
              </h2>
              {section.body.map((para, i) => (
                <p key={i} className="mt-3 text-base leading-relaxed text-ink-muted">
                  {para}
                </p>
              ))}
            </div>
          ))}

          <div className="mt-10 rounded-media border border-gold/50 bg-gold/[0.06] p-6">
            <h3 className="font-sans text-[17px] font-bold text-ink">{content.verdict.heading}</h3>
            <p className="mt-2 text-base leading-relaxed text-ink-muted">{content.verdict.body}</p>
          </div>
        </div>
      </section>

      {/* ---------- tour comparison cards ---------- */}
      <section id="tour-options" className="scroll-mt-[65px] border-b border-line bg-paper-tint py-14 sm:py-16">
        <div className="mx-auto max-w-[1200px] px-6 sm:px-14">
          <p className="text-xs font-semibold uppercase tracking-[0.14em] text-accent">Live tour comparison</p>
          <h2 className="mt-2 font-sans text-[26px] font-extrabold leading-snug tracking-tight text-ink sm:text-[32px]">
            Every Tour Option, Compared
          </h2>
          <p className="mt-3 max-w-[62ch] text-base leading-relaxed text-ink-muted">
            The listings most relevant to this page, side by side — including whether the tour is a licence-free
            sidecar format or one you ride yourself.
          </p>
          <div className="mt-6">
            <TourComparisonTable tours={relevantTours} caption={`Tour comparison for ${content.navTitle}`} />
          </div>
          <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {relevantTours.map((tour) => (
              <div key={tour.slug} className="flex flex-col overflow-hidden rounded-media border border-line bg-white">
                <div className="relative aspect-[4/3] bg-media">
                  <SafeImage src={tour.image.src} alt={tour.image.alt} fill sizes="(min-width: 1024px) 280px, (min-width: 640px) 45vw, 90vw" className="object-cover" />
                </div>
                <div className="flex flex-1 flex-col p-4">
                  <span className="w-fit rounded-full bg-media px-2.5 py-1 text-xs font-semibold text-ink-muted">{tour.partner}</span>
                  <h3 className="mt-3 font-sans text-[16px] font-extrabold leading-snug text-ink">{tour.title}</h3>
                  <p className="mt-1.5 text-sm text-ink-muted">{tour.meta}</p>
                  <div className="mt-4 flex items-end justify-between">
                    <span className="font-sans text-xl font-extrabold text-ink">from &euro;{tour.priceFrom}</span>
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

      {/* ---------- FAQ ---------- */}
      <section id="faq" className="scroll-mt-[65px] border-b border-line py-14 sm:py-16">
        <div className="mx-auto max-w-[760px] px-6 sm:px-14">
          <h2 className="font-sans text-[26px] font-extrabold leading-snug tracking-tight text-ink sm:text-[32px]">
            Frequently Asked
          </h2>
          <div className="mt-6 divide-y divide-line rounded-media border border-line bg-white">
            {content.faqs.map((faq) => (
              <details key={faq.question} className="group px-6 py-5">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-sans text-base font-bold text-ink marker:content-none">
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

      <RVAuthorBox />
      <RVFooter />
    </div>
  );
}
