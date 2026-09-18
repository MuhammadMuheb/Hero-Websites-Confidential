import { TourComparisonTable, NSFAuthorBox, NSFFooter } from './NSFShared';
import { FEATURED_TOURS } from '@/lib/naples-street-food';
import type { MoneyPageContent } from '@/lib/naples-street-food-content';

export function MoneyPageTemplate({ content }: { content: MoneyPageContent }) {
  const relevantTours = FEATURED_TOURS.slice(0, 3);

  return (
    <div className="nsf-scope">
      <section className="border-b border-line py-14 sm:py-20">
        <div className="mx-auto max-w-[760px] px-6 sm:px-14">
          <p className="text-xs font-semibold uppercase tracking-[0.14em] text-accent">Naples Street Food</p>
          <h1 className="mt-4 font-display text-[34px] font-bold leading-[1.12] tracking-tight text-ink sm:text-[48px]">
            {content.navTitle}
          </h1>
          <p className="mt-5 text-[17px] leading-relaxed text-ink-muted">{content.hook}</p>
          <ul className="mt-6 space-y-2">
            {content.highlights.map((h) => (
              <li key={h} className="flex gap-2 text-sm text-ink-muted">
                <span className="text-accent">•</span> {h}
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="border-b border-line py-16 sm:py-20">
        <div className="mx-auto max-w-[1200px] px-6 sm:px-14">
          <h2 className="font-display text-[26px] font-bold leading-[1.2] tracking-tight text-ink sm:text-[32px]">
            Compare Naples Food Tours
          </h2>
          <p className="mt-3 max-w-[62ch] text-[15.5px] leading-relaxed text-ink-muted">
            Every featured tour side-by-side — partner, price, and key details.
          </p>
          <div className="mt-8">
            <TourComparisonTable tours={relevantTours} caption={`Naples food tours related to ${content.navTitle}`} />
          </div>
        </div>
      </section>

      <section id="faq" className="border-b border-line py-16 sm:py-20">
        <div className="mx-auto max-w-[760px] px-6 sm:px-14">
          <h2 className="text-center font-display text-[26px] font-bold leading-[1.2] tracking-tight text-ink sm:text-[32px]">
            Common Questions
          </h2>
          <div className="mt-8 divide-y divide-line rounded-media border border-line bg-white">
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

      <NSFAuthorBox />
      <NSFFooter />
    </div>
  );
}
