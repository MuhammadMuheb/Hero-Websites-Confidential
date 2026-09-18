import { PrivacyPolicyTemplate } from '@/components/PrivacyPolicyTemplate';
import { TERMS_OF_SERVICE } from '@/lib/private-vatican';

export function PVTermsOfServicePage() {
  return <PrivacyPolicyTemplate data={TERMS_OF_SERVICE} />;
}
