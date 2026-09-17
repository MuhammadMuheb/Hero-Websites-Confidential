import { FAQPageTemplate } from '@/components/FAQPageTemplate';
import { FAQS } from '@/lib/cooking-in-rome';

export function CIRFAQPage() {
  return (
    <FAQPageTemplate
      title="Frequently Asked Questions"
      subtitle="Cooking classes, booking, and what this site covers."
      faqs={FAQS}
      breadcrumbLabel="Cooking in Rome"
      breadcrumbHref="/cooking-in-rome"
    />
  );
}
