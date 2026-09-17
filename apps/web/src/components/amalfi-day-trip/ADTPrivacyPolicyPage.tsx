import { PrivacyPolicyTemplate } from '@/components/PrivacyPolicyTemplate';
import { PRIVACY_POLICY } from '@/lib/amalfi-day-trip';

export function ADTPrivacyPolicyPage() {
  return <PrivacyPolicyTemplate data={PRIVACY_POLICY} />;
}
