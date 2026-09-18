import { TermsOfServiceTemplate } from '@/components/TermsOfServiceTemplate';
import { TERMS_OF_SERVICE } from '@/lib/golf-cart-rome';

export function GCRTermsOfServicePage() {
  return (
    <div className="gcr-scope bg-white">
      <TermsOfServiceTemplate data={TERMS_OF_SERVICE} />
    </div>
  );
}
