import { PrivacyPolicyTemplate } from '@/components/PrivacyPolicyTemplate';
import { PRIVACY_POLICY } from '@/lib/underground-colosseum';

export function UCPrivacyPolicyPage() {
  return <PrivacyPolicyTemplate data={PRIVACY_POLICY} />;
}
