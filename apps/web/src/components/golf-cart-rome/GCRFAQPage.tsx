import { FAQPageTemplate } from '@/components/FAQPageTemplate';
import { FAQS } from '@/lib/golf-cart-rome';

export function GCRFAQPage() {
  return (
    <FAQPageTemplate
      title="Frequently Asked Questions"
      subtitle="Accessibility, booking, and what this site covers."
      faqs={FAQS}
      breadcrumbLabel="Golf Cart Rome"
      breadcrumbHref="/golf-cart-rome"
    />
  );
}
