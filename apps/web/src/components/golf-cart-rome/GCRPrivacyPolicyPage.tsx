import { PrivacyPolicyTemplate } from '@/components/PrivacyPolicyTemplate';
import { PRIVACY_POLICY } from '@/lib/golf-cart-rome';

export function GCRPrivacyPolicyPage() {
  return (
    <div className="gcr-scope bg-white">
      <PrivacyPolicyTemplate data={PRIVACY_POLICY} />
    </div>
  );
}
