import { InnerHero } from '@/components/InnerHero';
import { COOKIE_POLICY } from '@/lib/underground-colosseum';

export function UCCookiePolicyPage() {
  return (
    <div className="uc-scope bg-white">
      <InnerHero title={COOKIE_POLICY.title} breadcrumb={{ label: 'Home', href: '/' }} />

      <section className="py-14">
        <div className="mx-auto max-w-[720px] px-6 sm:px-14 space-y-8">
          <p className="text-ink-muted">{COOKIE_POLICY.intro}</p>
          {COOKIE_POLICY.sections.map((section, idx) => (
            <div key={idx}>
              <h2 className="text-lg font-semibold text-ink-soft mb-3">{section.heading}</h2>
              <p className="text-sm text-ink-muted">{section.content}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
