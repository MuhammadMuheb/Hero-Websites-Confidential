import { NSFAuthorBox, NSFFooter, NSFHeader } from './NSFShared';
import type { SupportPageContent } from '@/lib/naples-street-food-content';

export function SupportPageTemplate({ content }: { content: SupportPageContent }) {
  return (
    <div className="nsf-scope">
      <NSFHeader toursHref="/#tours" faqHref="/#faq" />
      <section className="border-b border-line py-14 sm:py-20">
        <div className="mx-auto max-w-[760px] px-6 sm:px-14">
          <p className="text-xs font-semibold uppercase tracking-[0.14em] text-accent">Naples Guide</p>
          <h1 className="mt-4 font-display text-[34px] font-bold leading-[1.12] tracking-tight text-ink sm:text-[48px]">
            {content.navTitle}
          </h1>
          <div className="mt-8 space-y-4 text-[17px] leading-relaxed text-ink-muted">
            <p>{content.body}</p>
          </div>
        </div>
      </section>
      <NSFAuthorBox />
      <NSFFooter />
    </div>
  );
}
