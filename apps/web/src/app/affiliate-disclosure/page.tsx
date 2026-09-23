import type { Metadata } from 'next';
import { getPageDoc, SITE_DOMAIN } from '@/lib/firestore';
import { InnerHero } from '@/components/InnerHero';

export const dynamic = 'force-dynamic';

const FALLBACK_TITLE = 'Affiliate Disclosure';

const FALLBACK_HTML = `
  <p>Street Food Rome is a participant in the GetYourGuide affiliate program. This page explains what that means for anyone reading our tour recommendations.</p>
  <h2>How we earn money</h2>
  <p>When you click &quot;Check Availability&quot; on a tour page and go on to book that tour through GetYourGuide, we may earn a small commission. This costs you nothing extra — the price you pay is the same whether you book through our link or find the same tour directly on GetYourGuide.</p>
  <h2>How this affects our recommendations</h2>
  <p>We only list tours we&apos;d genuinely recommend to a friend visiting Rome. Commission potential does not determine which tours we cover or how we describe them — our first-hand notes on each tour reflect our own experience and opinion, not the size of the commission.</p>
  <h2>Who runs this site</h2>
  <p>Street Food Rome is written and maintained independently; GetYourGuide does not write, edit, or approve our content. They are solely our booking partner.</p>
  <h2>Questions</h2>
  <p>If you have questions about this disclosure, contact us at <a href="mailto:hello@streetfoodrome.com">hello@streetfoodrome.com</a>.</p>
`;

export async function generateMetadata(): Promise<Metadata> {
  const page = await getPageDoc('affiliate-disclosure');
  return {
    title: page?.metaTitle ?? FALLBACK_TITLE,
    description: page?.metaDesc ?? 'How Street Food Rome earns money through the GetYourGuide affiliate program.',
    alternates: { canonical: `https://${SITE_DOMAIN}/affiliate-disclosure` },
  };
}

export default async function AffiliateDisclosurePage() {
  const page = await getPageDoc('affiliate-disclosure');

  return (
    <>
      <InnerHero title={page?.title ?? FALLBACK_TITLE} breadcrumb={{ label: 'Home', href: '/' }} />
      <section className="py-14">
        <div className="mx-auto max-w-[720px] px-6 sm:px-14">
          <div className="rich-content" dangerouslySetInnerHTML={{ __html: page?.bodyHtml ?? FALLBACK_HTML }} />
        </div>
      </section>
    </>
  );
}
