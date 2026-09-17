import { FAQPageTemplate } from '@/components/FAQPageTemplate';
import { FAQS } from '@/lib/tuscany-day-trip';

export function TDTFAQPage() {
  return (
    <FAQPageTemplate
      title="Frequently Asked Questions"
      subtitle="Day trip planning, logistics, and what this site covers."
      faqs={FAQS}
      breadcrumbLabel="Tuscany Day Trip"
      breadcrumbHref="/tuscany-day-trip"
    />
  );
}
