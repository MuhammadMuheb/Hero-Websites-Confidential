import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getNetworkSite, SITE_DOMAIN } from '@/lib/tours';

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const site = getNetworkSite(slug);
  if (!site) return {};
  return {
    title: `Contact ${site.name}`,
    description: `Get in touch with ${site.name}.`,
    alternates: { canonical: `https://${SITE_DOMAIN}/${slug}/contact` },
  };
}

export default async function PropertyContactPage({ params }: Props) {
  const { slug } = await params;
  const site = getNetworkSite(slug);
  if (!site) notFound();

  return (
    <div className="min-h-screen bg-white">
      <section className="border-b border-line py-16 sm:py-20">
        <div className="mx-auto max-w-[1200px] px-6 sm:px-14">
          <h1 className="font-sans text-4xl font-extrabold text-ink sm:text-5xl">Contact {site.name}</h1>
          <p className="mt-4 max-w-2xl text-base text-ink-muted">Have questions? We&apos;d love to hear from you.</p>
        </div>
      </section>
      <section className="py-16 sm:py-20">
        <div className="mx-auto max-w-[800px] px-6 sm:px-14">
          <div className="rounded-media border border-line bg-paper-tint p-8">
            <div className="space-y-6">
              <div>
                <p className="text-sm font-semibold text-faint mb-2">Email</p>
                <p className="text-base font-medium text-accent">Contact us for inquiries</p>
              </div>
              <div>
                <p className="text-sm font-semibold text-faint mb-2">Response Time</p>
                <p className="text-base text-ink-muted">We usually reply within 24 hours.</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
