import { FAQPageTemplate } from '@/components/FAQPageTemplate';
import { FAQS } from '@/lib/private-vatican';

export function PVFAQPage() {
  return (
    <FAQPageTemplate
      title="Frequently Asked Questions"
      subtitle="Early access, private tours, and what this site actually covers."
      faqs={FAQS}
      breadcrumbLabel="Private Vatican"
      breadcrumbHref="/private-vatican"
    />
  );
}
