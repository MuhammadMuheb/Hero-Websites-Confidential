import { FAQPageTemplate } from '@/components/FAQPageTemplate';
import { FAQS } from '@/lib/pompeii-day-trip';

/**
 * Pompeii Day Trip FAQ page — renders the FAQ template with Pompeii-specific
 * questions and answers. Wrapped in .pdt-scope for Volcanic Ember theming.
 */

export function PDTFAQPage() {
  return (
    <div className="pdt-scope bg-white">
      <FAQPageTemplate
        title="Frequently Asked Questions"
        subtitle="Day trip planning, logistics, and what this site covers."
        faqs={FAQS}
        breadcrumbLabel="Pompeii Day Trip"
        breadcrumbHref="/pompeii-day-trip"
      />
    </div>
  );
}
