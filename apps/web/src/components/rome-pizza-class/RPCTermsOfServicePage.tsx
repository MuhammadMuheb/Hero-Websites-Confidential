import { PrivacyPolicyTemplate } from '@/components/PrivacyPolicyTemplate';
import { TERMS_OF_SERVICE } from '@/lib/rome-pizza-class';

export function RPCTermsOfServicePage() {
  return <PrivacyPolicyTemplate data={TERMS_OF_SERVICE} />;
}
