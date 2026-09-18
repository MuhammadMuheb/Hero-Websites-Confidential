import { InnerHero } from '@/components/InnerHero';
import { COOKIE_POLICY } from '@/lib/tuscany-day-trip';

export function TDTCookiePolicyPage() {
  return (
    <div className="tdt-scope bg-white">
      <InnerHero title={COOKIE_POLICY.title} breadcrumb={{ label: 'Home', href: '/' }} />

      <section className="py-14">
        <div className="mx-auto max-w-[720px] px-6 sm:px-14">
          <div className="rich-content" dangerouslySetInnerHTML={{ __html: COOKIE_POLICY.fallbackHtml }} />
        </div>
      </section>
    </div>
  );
}
