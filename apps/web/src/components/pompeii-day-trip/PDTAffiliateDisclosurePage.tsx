import { AffiliateDisclosureTemplate } from '@/components/AffiliateDisclosureTemplate';
import { AFFILIATE_DISCLOSURE } from '@/lib/pompeii-day-trip';

/**
 * Pompeii Day Trip Affiliate Disclosure page — renders the templated disclosure
 * with Pompeii's affiliate partner information. Wraps content in .pdt-scope for
 * Volcanic Ember theming.
 */

export function PDTAffiliateDisclosurePage() {
  return (
    <div className="pdt-scope bg-white">
      <AffiliateDisclosureTemplate data={AFFILIATE_DISCLOSURE} />
    </div>
  );
}
