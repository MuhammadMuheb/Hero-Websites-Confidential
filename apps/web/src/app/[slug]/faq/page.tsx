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
  return { title: `FAQ - ${site.name}`, description: `Frequently asked questions about ${site.name}`, alternates: { canonical: `https://${SITE_DOMAIN}/${slug}/faq` } };
}

export default async function PropertyFaqPage({ params }: Props) {
  const { slug } = await params;
  const site = getNetworkSite(slug);
  if (!site) notFound();

  const faqs = [
    { q: 'How do you choose recommendations?', a: 'Every experience has been personally visited and evaluated. No sponsorships.' },
    { q: 'Are links affiliate?', a: 'Yes, we may earn commissions, but this never influences recommendations.' },
    { q: 'How do I submit feedback?', a: `Contact us at hello@${slug.replace(/-/g, '')}.com` },
    { q: 'Can I use your content?', a: 'For personal use yes. For commercial use, please contact us.' },
  ];

  return (
    <div className="min-h-screen bg-white py-16 sm:py-20">
      <div className="mx-auto max-w-[800px] px-6 sm:px-14">
        <h1 className="font-sans text-4xl font-extrabold text-ink sm:text-5xl mb-12">FAQ</h1>
        <div className="space-y-6">
          {faqs.map((faq, idx) => (
            <div key={idx} className="rounded-media border border-line bg-paper-tint p-6">
              <h3 className="font-bold text-ink">{faq.q}</h3>
              <p className="mt-3 text-base text-ink-muted">{faq.a}</p>
            </div>
          ))}
        </div>
        <div className="mt-10 text-center">
          <Link href={`/${slug}/contact`} className="inline-flex h-11 items-center justify-center rounded-control bg-accent-gradient px-7 text-sm font-bold text-white">Get in Touch</Link>
        </div>
      </div>
    </div>
  );
}
