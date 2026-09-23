import { InnerHero } from '@/components/InnerHero';

export interface LegalDoc {
  title: string;
  intro: string;
  sections?: { heading: string; content: string }[];
  /** Trusted, hand-written HTML body used by properties whose legal copy is long-form. */
  fallbackHtml?: string;
  contactEmail?: string;
}

/** Shared legal-page layout (privacy, terms, cookies, affiliate disclosure) for every property. */
export function NetworkLegalPage({ scope, doc }: { scope: string; doc: LegalDoc }) {
  return (
    <div className={`${scope} bg-white`}>
      <InnerHero title={doc.title} breadcrumb={{ label: 'Home', href: '/' }} />
      <section className="py-14">
        <div className="mx-auto max-w-[720px] space-y-8 px-6 sm:px-14">
          <p className="text-base leading-relaxed text-ink-muted">{doc.intro}</p>
          {doc.fallbackHtml ? <div className="rich-content" dangerouslySetInnerHTML={{ __html: doc.fallbackHtml }} /> : null}
          {doc.sections?.map((section) => (
            <div key={section.heading}>
              <h2 className="mb-3 text-lg font-semibold text-ink">{section.heading}</h2>
              <p className="text-base leading-relaxed text-ink-muted">{section.content}</p>
            </div>
          ))}
          {doc.contactEmail ? (
            <p className="border-t border-line pt-6 text-sm text-ink-muted">
              Questions? Email{' '}
              <a href={`mailto:${doc.contactEmail}`} className="font-semibold text-accent underline-offset-2 hover:underline">
                {doc.contactEmail}
              </a>
            </p>
          ) : null}
        </div>
      </section>
    </div>
  );
}

/** Fallback copy for properties that don't ship their own version of a legal page. */
export function genericLegalDoc(kind: 'terms' | 'cookie-policy' | 'affiliate-disclosure', siteName: string, contactEmail: string): LegalDoc {
  if (kind === 'terms') {
    return {
      title: 'Terms of Service',
      intro: `By using ${siteName}, you agree to these terms.`,
      contactEmail,
      sections: [
        {
          heading: 'About this site',
          content: `${siteName} publishes independent, first-hand comparisons of tours and experiences. We are not a tour operator and are not affiliated with any operator or booking platform we link to.`,
        },
        {
          heading: 'Bookings',
          content: 'Every booking is made directly with the partner platform (such as GetYourGuide, Viator, Tiqets or Civitatis) under that platform’s own terms, cancellation policy and pricing. Prices shown here are indicative and can change at any time.',
        },
        {
          heading: 'Accuracy',
          content: 'We check opening hours, prices and logistics regularly, but conditions change. Always confirm the details on the booking page before you travel.',
        },
        {
          heading: 'Content use',
          content: 'You may share links to our pages. Republishing our text or photos in full requires written permission.',
        },
      ],
    };
  }
  if (kind === 'cookie-policy') {
    return {
      title: 'Cookie Policy',
      intro: `How ${siteName} uses cookies and similar technologies.`,
      contactEmail,
      sections: [
        {
          heading: 'Essential cookies',
          content: 'We use a small number of cookies needed for the site to work, such as remembering your preferences.',
        },
        {
          heading: 'Partner cookies',
          content: 'When you click through to a booking partner, that partner may set its own cookies to attribute the booking. Those cookies are governed by the partner’s cookie policy.',
        },
        {
          heading: 'Your choices',
          content: 'You can block or delete cookies in your browser settings at any time. Blocking essential cookies may affect how the site works.',
        },
      ],
    };
  }
  return {
    title: 'Affiliate Disclosure',
    intro: `${siteName} is reader-supported. Here is exactly how that works.`,
    contactEmail,
    sections: [
      {
        heading: 'How we earn money',
        content: 'Some links on this site go to booking partners such as GetYourGuide, Viator, Tiqets and Civitatis. If you book through one of those links, the partner may pay us a commission at no extra cost to you.',
      },
      {
        heading: 'How it affects recommendations',
        content: 'It doesn’t. Tours are ranked on what we found first-hand: route, group size, guide quality and value. No operator can pay for placement.',
      },
      {
        heading: 'Where affiliate links appear',
        content: 'Affiliate links are the “Check availability” and tour-card buttons that leave this site. They are marked as sponsored links for search engines.',
      },
    ],
  };
}
