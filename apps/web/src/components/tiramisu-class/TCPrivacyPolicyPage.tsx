import { PrivacyPolicyTemplate } from '@/components/PrivacyPolicyTemplate';
import { PRIVACY_POLICY } from '@/lib/tiramisu-class';

export function TCPrivacyPolicyPage() {
  return <PrivacyPolicyTemplate data={PRIVACY_POLICY} />;
}
