import type { ReactNode } from 'react';
import { InnerHero } from '@/components/InnerHero';

export interface FAQItem {
  question: string;
  answer: string;
}

export interface FAQPageProps {
  title: string;
  subtitle: string;
  faqs: FAQItem[];
  breadcrumbLabel?: string;
  breadcrumbHref?: string;
}

export function FAQPageTemplate({
  title,
  subtitle,
  faqs,
  breadcrumbLabel = 'Home',
  breadcrumbHref = '/',
}: FAQPageProps) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: { '@type': 'Answer', text: faq.answer },
    })),
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <InnerHero title={title} subtitle={subtitle} breadcrumb={{ label: breadcrumbLabel, href: breadcrumbHref }} />

      <section className="py-14">
        <div className="mx-auto max-w-[760px] px-6 sm:px-14">
          <div className="divide-y divide-line rounded-card border border-line">
            {faqs.map((faq) => (
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
    </>
  );
}
