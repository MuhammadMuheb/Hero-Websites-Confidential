import { InnerHero } from '@/components/InnerHero';
import { COOKIE_POLICY } from '@/lib/pompeii-day-trip';

/**
 * Pompeii Day Trip Cookie Policy page — mirrors Street Food Rome's pattern:
 * InnerHero + fallback HTML content. Wrapped in .pdt-scope for Volcanic Ember
 * theming. CMS integration available but not yet configured.
 */

export function PDTCookiePolicyPage() {
  return (
    <div className="pdt-scope bg-white">
      <InnerHero title={COOKIE_POLICY.title} breadcrumb={{ label: 'Home', href: '/' }} />

      <section className="py-14">
        <div className="mx-auto max-w-[720px] px-6 sm:px-14">
          <div className="rich-content" dangerouslySetInnerHTML={{ __html: COOKIE_POLICY.fallbackHtml }} />
        </div>
      </section>
    </div>
  );
}
