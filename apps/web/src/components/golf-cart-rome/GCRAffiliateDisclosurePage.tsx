import { InnerHero } from '@/components/InnerHero';
import { AFFILIATE_DISCLOSURE } from '@/lib/golf-cart-rome';

export function GCRAffiliateDisclosurePage() {
  return (
    <div className="gcr-scope bg-white">
      <InnerHero title={AFFILIATE_DISCLOSURE.title} breadcrumb={{ label: 'Home', href: '/' }} />

      <section className="py-14">
        <div className="mx-auto max-w-[720px] px-6 sm:px-14 space-y-8">
          <p className="text-ink-muted">{AFFILIATE_DISCLOSURE.intro}</p>
          {AFFILIATE_DISCLOSURE.sections.map((section, idx) => (
            <div key={idx}>
              <h2 className="text-lg font-semibold text-ink-soft mb-3">{section.heading}</h2>
              <p className="text-sm text-ink-muted">{section.content}</p>
            </div>
          ))}
          <div className="pt-6 border-t border-line">
            <p className="text-xs text-faint">
              Questions? Email us at{' '}
              <a href={`mailto:${AFFILIATE_DISCLOSURE.contactEmail}`} className="text-accent hover:text-accent-hover">
                {AFFILIATE_DISCLOSURE.contactEmail}
              </a>
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
