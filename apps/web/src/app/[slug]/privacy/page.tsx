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
  return { title: `Privacy - ${site.name}`, description: `Privacy policy for ${site.name}`, alternates: { canonical: `https://${SITE_DOMAIN}/${slug}/privacy` } };
}

export default async function PrivacyPage({ params }: Props) {
  const { slug } = await params;
  const site = getNetworkSite(slug);
  if (!site) notFound();

  return (
    <div className="min-h-screen bg-white py-16 sm:py-20">
      <div className="mx-auto max-w-[800px] px-6 sm:px-14">
        <h1 className="font-sans text-4xl font-extrabold text-ink sm:text-5xl mb-12">Privacy Policy</h1>
        <div className="space-y-8 text-ink-muted">
          <div>
            <h2 className="font-bold text-ink mb-3">Information We Collect</h2>
            <p>We collect minimal data. If you email us, we keep that to answer your questions.</p>
          </div>
          <div>
            <h2 className="font-bold text-ink mb-3">Cookies</h2>
            <p>We use essential cookies for functionality. Third-party partners set cookies when you book.</p>
          </div>
          <div>
            <h2 className="font-bold text-ink mb-3">Affiliate Links</h2>
            <p>Tour links go to GetYourGuide, Viator, and others. Their privacy policies apply once you leave.</p>
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
