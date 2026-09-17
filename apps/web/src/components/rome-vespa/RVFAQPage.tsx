import { FAQPageTemplate } from '@/components/FAQPageTemplate';
import { FAQS } from '@/lib/rome-vespa';

export function RVFAQPage() {
  return (
    <FAQPageTemplate
      title="Frequently Asked Questions"
      subtitle="Vespa tours, licence requirements, and what this site covers."
      faqs={FAQS}
      breadcrumbLabel="Rome Scooter Tours"
      breadcrumbHref="/rome-vespa"
    />
  );
}
