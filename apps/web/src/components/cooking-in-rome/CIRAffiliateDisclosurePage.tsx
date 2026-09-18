import { PrivacyPolicyTemplate } from '@/components/PrivacyPolicyTemplate';
import { AFFILIATE_DISCLOSURE } from '@/lib/cooking-in-rome';

export function CIRAffiliateDisclosurePage() {
  return (
    <div className="cir-scope bg-white">
      <PrivacyPolicyTemplate data={AFFILIATE_DISCLOSURE} />
    </div>
  );
}
