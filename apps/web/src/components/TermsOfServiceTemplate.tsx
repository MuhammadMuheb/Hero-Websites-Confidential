import { InnerHero } from '@/components/InnerHero';

export interface TermsOfServiceSection {
  heading: string;
  content: string;
}

export interface TermsOfServiceData {
  title: string;
  intro: string;
  sections: TermsOfServiceSection[];
  contactEmail: string;
}

export function TermsOfServiceTemplate({ data }: { data: TermsOfServiceData }) {
  return (
    <>
      <InnerHero title={data.title} breadcrumb={{ label: 'Home', href: '/' }} />

      <section className="py-14">
        <div className="mx-auto max-w-[720px] px-6 sm:px-14 space-y-8">
          <p className="text-sm text-ink-muted">{data.intro}</p>

          <div className="space-y-8">
            {data.sections.map((section, idx) => (
              <div key={idx}>
                <h2 className="mb-4 font-display text-lg font-semibold text-ink">{section.heading}</h2>
                <p className="text-sm leading-relaxed text-ink-muted">{section.content}</p>
              </div>
            ))}
          </div>

          <div className="border-t border-line pt-8">
            <h2 className="mb-4 font-display text-lg font-semibold text-ink">Contact us about these terms</h2>
            <p className="text-sm leading-relaxed text-ink-muted">
              If you have questions about these terms, you can contact us at{' '}
              <a href={`mailto:${data.contactEmail}`} className="font-semibold text-accent hover:underline">
                {data.contactEmail}
              </a>
              . This page is a plain-language summary and not a substitute for legal advice.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
