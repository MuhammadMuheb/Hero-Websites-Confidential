import { TermsOfServiceTemplate } from '@/components/TermsOfServiceTemplate';
import { TERMS_OF_SERVICE } from '@/lib/underground-colosseum';

export function UCTermsOfServicePage() {
  return (
    <div className="uc-scope bg-white">
      <TermsOfServiceTemplate data={TERMS_OF_SERVICE} />
    </div>
  );
}
