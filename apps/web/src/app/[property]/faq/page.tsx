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
    title: `FAQ - ${site.name}`,
    description: `Frequently asked questions about ${site.name} and our recommendations.`,
    alternates: { canonical: `https://${SITE_DOMAIN}/${property}/faq` },
  };
}

export default async function PropertyFaqPage({ params }: Props) {
  const { property } = await params;
  const site = getNetworkSite(property);

  if (!site) notFound();

  const faqs = [
    { q: 'How do you choose what to recommend?', a: 'Every experience, tour, and restaurant on this site has been personally visited and evaluated. We don\'t accept sponsorships or commissions.' },
    { q: 'Are the tours affiliate-linked?', a: 'Yes, we may earn a small commission through affiliate partnerships, but this never influences our recommendations.' },
    { q: 'How do I submit feedback?', a: `Contact us at hello@${property.replace(/-/g, '')}.com with your thoughts or recommendations.` },
    { q: 'Can I use your content?', a: 'For personal use, yes. For commercial use or publication, please contact us first.' },
    { q: 'How often do you update information?', a: 'We regularly update content based on personal visits and feedback from travelers.' },
  ];

  return (
    <div className="min-h-screen bg-white">
      <section className="border-b border-line py-16 sm:py-20">
        <div className="mx-auto max-w-[1200px] px-6 sm:px-14">
          <nav className="mb-6 text-sm text-ink-muted">
            <Link href={`/${property}`} className="hover:text-accent">{site.name}</Link>
            <span className="mx-2">/</span>
            <span>FAQ</span>
          </nav>

          <h1 className="font-sans text-[40px] font-extrabold leading-tight text-ink sm:text-[48px]">
            Frequently Asked Questions
          </h1>
        </div>
      </section>

      <section className="py-16 sm:py-20">
        <div className="mx-auto max-w-[800px] px-6 sm:px-14">
          <div className="space-y-6">
            {faqs.map((faq, idx) => (
              <div key={idx} className="rounded-media border border-line bg-paper-tint p-6">
                <h3 className="font-bold text-ink">{faq.q}</h3>
                <p className="mt-3 text-base text-ink-muted">{faq.a}</p>
              </div>
            ))}
          </div>

          <div className="mt-10 text-center">
            <p className="text-ink-muted">Didn't find the answer?</p>
            <Link href={`/${property}/contact`} className="mt-4 inline-flex h-11 items-center justify-center rounded-control bg-accent-gradient px-7 text-sm font-bold text-white transition-transform hover:scale-[1.02]">
              Get in Touch
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
