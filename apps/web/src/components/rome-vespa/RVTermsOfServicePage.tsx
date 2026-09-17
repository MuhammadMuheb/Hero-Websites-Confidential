import { TermsOfServiceTemplate } from '@/components/TermsOfServiceTemplate';
import { TERMS_OF_SERVICE } from '@/lib/rome-vespa';

export function RVTermsOfServicePage() {
  return (
    <div className="rv-scope bg-white">
      <TermsOfServiceTemplate data={TERMS_OF_SERVICE} />
    </div>
  );
}
