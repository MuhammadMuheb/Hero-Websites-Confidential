import { PrivacyPolicyTemplate } from '@/components/PrivacyPolicyTemplate';
import { TERMS_OF_SERVICE } from '@/lib/cooking-in-rome';

export function CIRTermsOfServicePage() {
  return (
    <div className="cir-scope bg-white">
      <PrivacyPolicyTemplate data={TERMS_OF_SERVICE} />
    </div>
  );
}
