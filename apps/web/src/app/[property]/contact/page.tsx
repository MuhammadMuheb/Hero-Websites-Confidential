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
    title: `Contact ${site.name}`,
    description: `Get in touch with ${site.name}. We typically reply within 24 hours.`,
    alternates: { canonical: `https://${SITE_DOMAIN}/${property}/contact` },
  };
}

export default async function PropertyContactPage({ params }: Props) {
  const { property } = await params;
  const site = getNetworkSite(property);

  if (!site) notFound();

  return (
    <div className="min-h-screen bg-white">
      <section className="border-b border-line py-16 sm:py-20">
        <div className="mx-auto max-w-[1200px] px-6 sm:px-14">
          <nav className="mb-6 text-sm text-ink-muted">
            <Link href={`/${property}`} className="hover:text-accent">{site.name}</Link>
            <span className="mx-2">/</span>
            <span>Contact</span>
          </nav>

          <h1 className="font-sans text-[40px] font-extrabold leading-tight text-ink sm:text-[48px]">
            Contact {site.name}
          </h1>
          <p className="mt-4 max-w-2xl text-base text-ink-muted">
            Have a question or feedback? We'd love to hear from you. We typically respond within 24 hours.
          </p>
        </div>
      </section>

      <section className="py-16 sm:py-20">
        <div className="mx-auto max-w-[800px] px-6 sm:px-14">
          <div className="rounded-media border border-line bg-paper-tint p-8">
            <h2 className="font-bold text-ink mb-4">Get in Touch</h2>

            <div className="space-y-6">
              <div>
                <p className="text-sm font-semibold text-faint mb-2">Email</p>
                <a href="mailto:hello@example.com" className="text-base font-medium text-accent hover:underline">
                  hello@{property.replace(/-/g, '')}.com
                </a>
              </div>

              <div>
                <p className="text-sm font-semibold text-faint mb-2">Response Time</p>
                <p className="text-base text-ink-muted">
                  We usually reply to all inquiries within 24 hours during business days.
                </p>
              </div>

              <div>
                <p className="text-sm font-semibold text-faint mb-2">What We're Looking For</p>
                <ul className="text-base text-ink-muted space-y-2">
                  <li>• Tour recommendations or experiences to review</li>
                  <li>• Feedback on our content and recommendations</li>
                  <li>• Partnership or collaboration inquiries</li>
                  <li>• General questions about {site.name}</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
