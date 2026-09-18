import { PrivacyPolicyTemplate } from '@/components/PrivacyPolicyTemplate';
import { COOKIE_POLICY } from '@/lib/cooking-in-rome';

export function CIRCookiePolicyPage() {
  return (
    <div className="cir-scope bg-white">
      <PrivacyPolicyTemplate data={COOKIE_POLICY} />
    </div>
  );
}
