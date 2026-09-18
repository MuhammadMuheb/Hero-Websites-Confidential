import { PrivacyPolicyTemplate } from '@/components/PrivacyPolicyTemplate';
import { AFFILIATE_DISCLOSURE } from '@/lib/private-vatican';

export function PVAffiliateDisclosurePage() {
  return <PrivacyPolicyTemplate data={AFFILIATE_DISCLOSURE} />;
}
