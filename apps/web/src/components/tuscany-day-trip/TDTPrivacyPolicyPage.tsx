import { PrivacyPolicyTemplate } from '@/components/PrivacyPolicyTemplate';
import { PRIVACY_POLICY } from '@/lib/tuscany-day-trip';

export function TDTPrivacyPolicyPage() {
  return <PrivacyPolicyTemplate data={PRIVACY_POLICY} />;
}
