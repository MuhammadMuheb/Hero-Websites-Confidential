import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getNetworkSite, SITE_DOMAIN } from '@/lib/tours';
import Link from '@/components/NetworkLink';

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const site = getNetworkSite(slug);
  if (!site) return {};
  return { title: `Terms - ${site.name}`, description: `Terms of service for ${site.name}`, alternates: { canonical: `https://${SITE_DOMAIN}/${slug}/terms` } };
}

export default async function TermsPage({ params }: Props) {
  const { slug } = await params;
  const site = getNetworkSite(slug);
  if (!site) notFound();

  return (
    <div className="min-h-screen bg-white py-16 sm:py-20">
      <div className="mx-auto max-w-[800px] px-6 sm:px-14">
        <h1 className="font-sans text-4xl font-extrabold text-ink sm:text-5xl mb-12">Terms of Service</h1>
        <div className="space-y-8 text-ink-muted">
          <div>
            <h2 className="font-bold text-ink mb-3">Content Use</h2>
            <p>All content is for personal, non-commercial use only. No republishing without permission.</p>
          </div>
          <div>
            <h2 className="font-bold text-ink mb-3">Affiliate Links</h2>
            <p>We may earn commissions on bookings. This doesn't affect the price you pay.</p>
          </div>
          <div>
            <h2 className="font-bold text-ink mb-3">Third-Party Services</h2>
            <p>We're not responsible for tour operators or venues. Always confirm details before visiting.</p>
          </div>
          <div>
            <h2 className="font-bold text-ink mb-3">Questions?</h2>
            <Link href={`/${slug}/contact`} className="text-accent font-bold hover:underline">Contact us</Link>
          </div>
        </div>
      </div>
    </div>
  );
}
