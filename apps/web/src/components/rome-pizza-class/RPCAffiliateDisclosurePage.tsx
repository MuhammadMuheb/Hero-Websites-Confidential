import { PrivacyPolicyTemplate } from '@/components/PrivacyPolicyTemplate';
import { AFFILIATE_DISCLOSURE } from '@/lib/rome-pizza-class';

export function RPCAffiliateDisclosurePage() {
  return <PrivacyPolicyTemplate data={AFFILIATE_DISCLOSURE} />;
}
