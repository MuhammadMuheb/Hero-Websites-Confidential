import { FAQPageTemplate } from '@/components/FAQPageTemplate';
import { FAQS } from '@/lib/cooking-in-rome';

export function CIRFAQPage() {
  return (
    <div className="cir-scope bg-white">
      <FAQPageTemplate
        title="Frequently Asked Questions"
        subtitle="Classes, bookings, and what this site covers."
        faqs={FAQS}
        breadcrumbLabel="Cooking in Rome"
        breadcrumbHref="/cooking-in-rome"
      />
    </div>
  );
}
