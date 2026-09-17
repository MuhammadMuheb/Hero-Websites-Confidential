import { TermsOfServiceTemplate } from '@/components/TermsOfServiceTemplate';
import { TERMS_OF_SERVICE } from '@/lib/pompeii-day-trip';

/**
 * Pompeii Day Trip Terms of Service page — renders the templated terms with
 * Pompeii-specific content. Wrapped in .pdt-scope for Volcanic Ember theming.
 */

export function PDTTermsOfServicePage() {
  return (
    <div className="pdt-scope bg-white">
      <TermsOfServiceTemplate data={TERMS_OF_SERVICE} />
    </div>
  );
}
