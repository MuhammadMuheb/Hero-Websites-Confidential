import { FAQPageTemplate } from '@/components/FAQPageTemplate';
import { FAQS } from '@/lib/pompeii-day-trip';

export function PDTFAQPage() {
  return (
    <FAQPageTemplate
      title="Frequently Asked Questions"
      subtitle="Day trip planning, logistics, and what this site covers."
      faqs={FAQS}
      breadcrumbLabel="Pompeii Day Trip"
      breadcrumbHref="/pompeii-day-trip"
    />
  );
}
