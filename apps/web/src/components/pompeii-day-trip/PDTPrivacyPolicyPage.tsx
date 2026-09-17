import { PrivacyPolicyTemplate } from '@/components/PrivacyPolicyTemplate';
import { PRIVACY_POLICY } from '@/lib/pompeii-day-trip';

/**
 * Pompeii Day Trip Privacy Policy page — renders the templated privacy policy
 * with Pompeii-specific content. Wrapped in .pdt-scope for Volcanic Ember theming.
 */

export function PDTPrivacyPolicyPage() {
  return (
    <div className="pdt-scope bg-white">
      <PrivacyPolicyTemplate data={PRIVACY_POLICY} />
    </div>
  );
}
