import { PrivacyPolicyTemplate } from '@/components/PrivacyPolicyTemplate';
import { PRIVACY_POLICY } from '@/lib/rome-pizza-class';

export function RPCPrivacyPolicyPage() {
  return <PrivacyPolicyTemplate data={PRIVACY_POLICY} />;
}
