import { InnerHero } from '@/components/InnerHero';

export interface AffiliateDisclosureSection {
  heading: string;
  content: string;
}

export interface AffiliateDisclosureData {
  title: string;
  intro: string;
  sections: AffiliateDisclosureSection[];
  contactEmail: string;
}

export function AffiliateDisclosureTemplate({ data }: { data: AffiliateDisclosureData }) {
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
            <h2 className="mb-4 font-display text-lg font-semibold text-ink">Have questions?</h2>
            <p className="text-sm leading-relaxed text-ink-muted">
              We believe in transparency about how we work. If you have questions about our affiliate relationships or
              how we choose partners, please reach out at{' '}
              <a href={`mailto:${data.contactEmail}`} className="font-semibold text-accent hover:underline">
                {data.contactEmail}
              </a>
              .
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
