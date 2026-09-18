import { PrivacyPolicyTemplate } from '@/components/PrivacyPolicyTemplate';
import { AFFILIATE_DISCLOSURE } from '@/lib/tuscany-day-trip';

export function TDTAffiliateDisclosurePage() {
  return <PrivacyPolicyTemplate data={AFFILIATE_DISCLOSURE} />;
}
