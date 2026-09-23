import Link from '@/components/NetworkLink';
import { SafeImage } from '@/components/SafeImage';
import { ADTAuthorBox, ADTFooter } from './ADTShared';
import type { SupportPageContent } from '@/lib/amalfi-day-trip-content';

/**
 * Shared template for all 5 Tuscany Day Trip support pages — mirrors
 * Tiramisù Class's SupportPageTemplate.tsx exactly in structure (FAQPage +
 * BreadcrumbList schema, first-hand detail, one primary CTA into the money
 * page it feeds, one contextual link, FAQ). Content is entirely data-driven
 * (lib/amalfi-day-trip-content.ts).
 */
export function SupportPageTemplate({ content }: { content: SupportPageContent }) {
  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://amalfidaytrip.com/' },
      { '@type': 'ListItem', position: 2, name: content.navTitle, item: `https://amalfidaytrip.com${content.href}` },
    ],
  };

  const faqJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: (content.faqs || []).map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: { '@type': 'Answer', text: faq.answer },
    })),
  };

  return (
    <div className="ADT-scope bg-white">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />


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
            {content.keyword && <p className="text-xs font-semibold uppercase tracking-[0.14em] text-accent">{content.keyword}</p>}
            <h1 className="mt-3 font-display text-[30px] font-bold leading-[1.15] tracking-tight text-ink sm:text-[38px]">
              {content.h1 ?? content.navTitle ?? content.metaTitle}
            </h1>
            <div className="mt-7 flex flex-wrap gap-3">
              {content.relatedMoneyHref && content.relatedMoneyLabel && (
                <Link
                  href={content.relatedMoneyHref}
                  className="flex h-11 items-center justify-center rounded-control bg-accent-gradient px-6 text-sm font-bold text-white shadow-glow transition-transform duration-200 ease-out hover:scale-[1.02] active:scale-[0.98]"
                >
                  {content.relatedMoneyLabel}
                </Link>
              )}
              <Link
                href="/#featured-tours"
                className="flex h-11 items-center justify-center rounded-control border border-accent px-6 text-sm font-medium text-accent transition-colors hover:bg-accent-soft"
              >
                Compare All Day Trips
              </Link>
            </div>
          </div>
          {content.heroImage && (
            <div className="relative aspect-[4/3] overflow-hidden rounded-media bg-media">
              <SafeImage src={content.heroImage.src} alt={content.heroImage.alt} fill priority sizes="(min-width: 1024px) 560px, 100vw" className="object-cover" />
            </div>
          )}
        </div>
      </section>

      {/* ---------- body sections ---------- */}
      {content.sections && content.sections.length > 0 && (
      <section className="border-b border-line py-14 sm:py-16">
        <div className="mx-auto max-w-[760px] px-6 sm:px-14">
          {content.sections.map((section) => (
            <div key={section.heading} className="mt-8 first:mt-0">
              <h2 className="font-display text-[20px] font-bold leading-snug tracking-tight text-ink sm:text-[24px]">
                {section.heading}
              </h2>
              {section.body.map((para, i) => (
                <p key={i} className="mt-3 text-base leading-relaxed text-ink-muted">
                  {para}
                </p>
              ))}
            </div>
          ))}
        </div>
      </section>
      )}

      {/* ---------- closing CTA band ---------- */}
      <section className="border-b border-line py-14 sm:py-16">
        <div className="mx-auto max-w-[1200px] px-6 sm:px-14">
          <div className="flex flex-col items-start gap-6 rounded-media border border-line bg-paper-tint p-6 sm:flex-row sm:items-center sm:justify-between sm:p-8">
            <div>
              <h2 className="font-display text-[18px] font-bold leading-snug tracking-tight text-ink">
                Ready to Book?
              </h2>
              <p className="mt-2 max-w-[52ch] text-sm leading-relaxed text-ink-muted">
                This page feeds directly into our comparison of every trip that covers this — see the full breakdown
                before you choose.
              </p>
            </div>
            {content.relatedMoneyHref && content.relatedMoneyLabel && (
              <Link
                href={content.relatedMoneyHref}
                className="flex h-11 shrink-0 items-center justify-center whitespace-nowrap rounded-control bg-accent-gradient px-6 text-sm font-bold text-white shadow-glow transition-transform duration-200 ease-out hover:scale-[1.02] active:scale-[0.98]"
              >
                {content.relatedMoneyLabel} &rarr;
              </Link>
            )}
          </div>
        </div>
      </section>

      {/* ---------- FAQ ---------- */}
      {content.faqs && content.faqs.length > 0 && (
      <section id="faq" className="scroll-mt-[65px] border-b border-line bg-paper-tint py-14 sm:py-16">
        <div className="mx-auto max-w-[760px] px-6 sm:px-14">
          <p className="text-xs font-semibold uppercase tracking-[0.14em] text-accent">Common questions</p>
          <h2 className="mt-2 font-display text-[24px] font-bold leading-snug tracking-tight text-ink sm:text-[30px]">
            Frequently Asked
          </h2>
          <div className="mt-6 divide-y divide-line rounded-media border border-line bg-white">
            {content.faqs.map((faq) => (
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
      )}

      <ADTAuthorBox />
      <ADTFooter />
    </div>
  );
}

