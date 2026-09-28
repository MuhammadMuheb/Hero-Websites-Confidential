import { PrivacyPolicyTemplate } from '@/components/PrivacyPolicyTemplate';
import { PRIVACY_POLICY } from '@/lib/cooking-in-rome';

export function CIRPrivacyPolicyPage() {
  return (
    <div className="bg-white">
      <PrivacyPolicyTemplate data={PRIVACY_POLICY} />
    </div>
  );
}
