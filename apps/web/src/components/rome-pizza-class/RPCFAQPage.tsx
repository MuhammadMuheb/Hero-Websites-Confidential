import { FAQPageTemplate } from '@/components/FAQPageTemplate';
import { FAQS } from '@/lib/rome-pizza-class';

export function RPCFAQPage() {
  return (
    <FAQPageTemplate
      title="Frequently Asked Questions"
      subtitle="Pizza-making classes, booking, and what this site covers."
      faqs={FAQS}
      breadcrumbLabel="Rome Pizza Class"
      breadcrumbHref="/rome-pizza-class"
    />
  );
}
