import type { Metadata } from 'next';
import { getPageDoc, SITE_DOMAIN } from '@/lib/firestore';
import { InnerHero } from '@/components/InnerHero';

export const dynamic = 'force-dynamic';

const FALLBACK_TITLE = 'Cookie Policy';

const FALLBACK_HTML = `
  <p>This Cookie Policy explains how Street Food Rome (&quot;we,&quot; &quot;us&quot;) uses cookies and similar technologies on streetfoodrome.com.</p>
  <h2>What cookies we use</h2>
  <p>We use a small number of strictly necessary cookies to keep the site functioning — for example, remembering your cookie-consent choice. We also use standard analytics cookies to understand which pages and tours are useful to visitors, so we can improve the site over time.</p>
  <h2>Third-party cookies</h2>
  <p>When you click through to book a tour, you leave streetfoodrome.com and land on GetYourGuide, our booking partner. GetYourGuide sets its own cookies under its own privacy and cookie policies, which we don&apos;t control. We recommend reviewing GetYourGuide&apos;s policies directly if you have questions about their tracking.</p>
  <h2>Managing cookies</h2>
  <p>Most browsers let you block or delete cookies through their settings. Blocking cookies may affect how parts of this site work, but it won&apos;t prevent you from reading tour information or content.</p>
  <h2>Changes to this policy</h2>
  <p>We may update this policy occasionally to reflect changes in the tools we use. Check back here periodically for the current version.</p>
  <h2>Contact</h2>
  <p>Questions about this policy can be sent to <a href="mailto:hello@streetfoodrome.com">hello@streetfoodrome.com</a>.</p>
`;

export async function generateMetadata(): Promise<Metadata> {
  const page = await getPageDoc('cookie-policy');
  return {
    title: page?.metaTitle ?? FALLBACK_TITLE,
    description: page?.metaDesc ?? 'How Street Food Rome uses cookies and similar technologies.',
    alternates: { canonical: `https://${SITE_DOMAIN}/cookie-policy` },
  };
}

export default async function CookiePolicyPage() {
  const page = await getPageDoc('cookie-policy');

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
