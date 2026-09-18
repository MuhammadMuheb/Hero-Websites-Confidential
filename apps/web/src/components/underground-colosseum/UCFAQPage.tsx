import { FAQPageTemplate } from '@/components/FAQPageTemplate';
import { FAQS } from '@/lib/underground-colosseum';

export function UCFAQPage() {
  return (
    <div className="uc-scope bg-white">
      <FAQPageTemplate
        title="Frequently Asked Questions"
        subtitle="Underground access, booking, and what this site covers."
        faqs={FAQS}
        breadcrumbLabel="Underground Colosseum"
        breadcrumbHref="/underground-colosseum"
      />
    </div>
  );
}
