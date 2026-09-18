import { PrivacyPolicyTemplate } from '@/components/PrivacyPolicyTemplate';
import { TERMS_OF_SERVICE } from '@/lib/tuscany-day-trip';

export function TDTTermsOfServicePage() {
  return <PrivacyPolicyTemplate data={TERMS_OF_SERVICE} />;
}
