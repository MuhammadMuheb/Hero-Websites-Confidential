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
    title: `Terms of Service - ${site.name}`,
    description: `Terms of service for ${site.name}.`,
    alternates: { canonical: `https://${SITE_DOMAIN}/${property}/terms` },
  };
}

export default async function PropertyTermsPage({ params }: Props) {
  const { property } = await params;
  const site = getNetworkSite(property);

  if (!site) notFound();

  return (
    <div className="min-h-screen bg-white">
      <section className="border-b border-line py-16 sm:py-20">
        <div className="mx-auto max-w-[1200px] px-6 sm:px-14">
          <h1 className="font-sans text-[40px] font-extrabold leading-tight text-ink sm:text-[48px]">
            Terms of Service
          </h1>
          <p className="mt-4 text-ink-muted">Last updated: Today</p>
        </div>
      </section>

      <section className="py-16 sm:py-20">
        <div className="mx-auto max-w-[800px] px-6 sm:px-14 space-y-8">
          <div>
            <h2 className="font-bold text-ink mb-3">Content Use</h2>
            <p className="text-ink-muted">All content on {site.name} is provided for personal, non-commercial use. You may not republish, redistribute, or sell our content without permission.</p>
          </div>

          <div>
            <h2 className="font-bold text-ink mb-3">Affiliate Links</h2>
            <p className="text-ink-muted">{site.name} may earn a commission on tours and experiences booked through our links. This doesn't affect the price you pay — it's how we sustain the site.</p>
          </div>

          <div>
            <h2 className="font-bold text-ink mb-3">Third-Party Services</h2>
            <p className="text-ink-muted">We're not responsible for third-party services (tour operators, hotels, etc.). Read their terms before booking. We recommend experiences but can't guarantee specific outcomes.</p>
          </div>

          <div>
            <h2 className="font-bold text-ink mb-3">Accuracy</h2>
            <p className="text-ink-muted">We make reasonable efforts to keep information current, but details change. Always confirm directly with tour operators or venues before visiting.</p>
          </div>

          <div>
            <h2 className="font-bold text-ink mb-3">Contact</h2>
            <p className="text-ink-muted">
              Questions about these terms? <Link href={`/${property}/contact`} className="font-bold text-accent hover:underline">Contact us</Link>.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
