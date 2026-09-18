import { PrivacyPolicyTemplate } from '@/components/PrivacyPolicyTemplate';
import { COOKIE_POLICY } from '@/lib/rome-pizza-class';

export function RPCCookiePolicyPage() {
  return <PrivacyPolicyTemplate data={COOKIE_POLICY} />;
}
