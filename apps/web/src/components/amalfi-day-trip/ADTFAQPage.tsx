import { FAQPageTemplate } from '@/components/FAQPageTemplate';
import { FAQS } from '@/lib/amalfi-day-trip';

export function ADTFAQPage() {
  return (
    <FAQPageTemplate
      title="Frequently Asked Questions"
      subtitle="Amalfi Coast day trips, logistics, and what this site covers."
      faqs={FAQS}
      breadcrumbLabel="Amalfi Day Trip"
      breadcrumbHref="/amalfi-day-trip"
    />
  );
}
