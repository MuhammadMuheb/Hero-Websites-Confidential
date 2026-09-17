import { FAQPageTemplate } from '@/components/FAQPageTemplate';
import { FAQS } from '@/lib/tiramisu-class';

export function TCFAQPage() {
  return (
    <FAQPageTemplate
      title="Frequently Asked Questions"
      subtitle="Tiramisù-making classes, booking, and what this site covers."
      faqs={FAQS}
      breadcrumbLabel="Tiramisù Class"
      breadcrumbHref="/tiramisu-class"
    />
  );
}
