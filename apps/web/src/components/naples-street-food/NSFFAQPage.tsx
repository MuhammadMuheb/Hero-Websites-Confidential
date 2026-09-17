import { FAQPageTemplate } from '@/components/FAQPageTemplate';
import { FAQS } from '@/lib/naples-street-food';

export function NSFFAQPage() {
  return (
    <FAQPageTemplate
      title="Frequently Asked Questions"
      subtitle="Naples street food tours, booking, and what this site covers."
      faqs={FAQS}
      breadcrumbLabel="Naples Street Food"
      breadcrumbHref="/naples-street-food"
    />
  );
}
