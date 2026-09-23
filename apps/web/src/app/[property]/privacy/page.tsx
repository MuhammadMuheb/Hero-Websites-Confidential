import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getNetworkSite, SITE_DOMAIN } from '@/lib/tours';
import Link from '@/components/NetworkLink';

interface Props {
  params: Promise<{ property: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { property } = await params;
  const site = getNetworkSite(property);
  if (!site) return {};

  return {
    title: `Privacy Policy - ${site.name}`,
    description: `Privacy policy for ${site.name}.`,
    alternates: { canonical: `https://${SITE_DOMAIN}/${property}/privacy` },
  };
}

export default async function PropertyPrivacyPage({ params }: Props) {
  const { property } = await params;
  const site = getNetworkSite(property);

  if (!site) notFound();

  return (
    <div className="min-h-screen bg-white">
      <section className="border-b border-line py-16 sm:py-20">
        <div className="mx-auto max-w-[1200px] px-6 sm:px-14">
          <h1 className="font-sans text-[40px] font-extrabold leading-tight text-ink sm:text-[48px]">
            Privacy Policy
          </h1>
          <p className="mt-4 text-ink-muted">Last updated: Today</p>
        </div>
      </section>

      <section className="py-16 sm:py-20">
        <div className="mx-auto max-w-[800px] px-6 sm:px-14 space-y-8">
          <div>
            <h2 className="font-bold text-ink mb-3">Information We Collect</h2>
            <p className="text-ink-muted">We collect minimal personal data. If you email us, we keep that correspondence to answer your questions and won't add you to any mailing list without permission.</p>
          </div>

          <div>
            <h2 className="font-bold text-ink mb-3">Cookies</h2>
            <p className="text-ink-muted">This site uses essential cookies for functionality. We may use analytics to understand how you use the site. Third-party services (tour operators) set their own cookies when you click through to book.</p>
          </div>

          <div>
            <h2 className="font-bold text-ink mb-3">Affiliate Links</h2>
            <p className="text-ink-muted">Tour booking links go to GetYourGuide, Viator, Civitatis, and other partners. Once you leave our site, their privacy policies govern your information — we don't receive your payment or personal booking details.</p>
          </div>

          <div>
            <h2 className="font-bold text-ink mb-3">Contact Us</h2>
            <p className="text-ink-muted">
              Questions about privacy? <Link href={`/${property}/contact`} className="font-bold text-accent hover:underline">Contact us</Link> anytime.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
