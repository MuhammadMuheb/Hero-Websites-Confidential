import { FAQPageTemplate } from '@/components/FAQPageTemplate';
import { FAQS } from '@/lib/tivoli-day-trip';

export function TVDTFAQPage() {
  return (
    <FAQPageTemplate
      title="Frequently Asked Questions"
      subtitle="Tivoli day trips, villa visits, and what this site covers."
      faqs={FAQS}
      breadcrumbLabel="Tivoli Day Trip"
      breadcrumbHref="/tivoli-day-trip"
    />
  );
}
