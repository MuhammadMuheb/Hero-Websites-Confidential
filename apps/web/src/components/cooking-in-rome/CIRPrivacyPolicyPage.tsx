import { PrivacyPolicyTemplate } from '@/components/PrivacyPolicyTemplate';
import { PRIVACY_POLICY } from '@/lib/cooking-in-rome';

export function CIRPrivacyPolicyPage() {
  return (
    <div className="cir-scope bg-white">
      <PrivacyPolicyTemplate data={PRIVACY_POLICY} />
    </div>
  );
}
