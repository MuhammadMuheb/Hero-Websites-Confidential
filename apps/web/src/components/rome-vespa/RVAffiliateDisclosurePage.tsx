import { AffiliateDisclosureTemplate } from '@/components/AffiliateDisclosureTemplate';
import { AFFILIATE_DISCLOSURE } from '@/lib/rome-vespa';

export function RVAffiliateDisclosurePage() {
  return (
    <div className="rv-scope bg-white">
      <AffiliateDisclosureTemplate data={AFFILIATE_DISCLOSURE} />
    </div>
  );
}
