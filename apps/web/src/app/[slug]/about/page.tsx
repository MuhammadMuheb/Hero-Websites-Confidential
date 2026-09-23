import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getNetworkSite, SITE_DOMAIN } from '@/lib/tours';
import { SafeImage } from '@/components/SafeImage';
import Link from '@/components/NetworkLink';

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const site = getNetworkSite(slug);
  if (!site) return {};

  const title = `About ${site.name}`;
  const description = `Learn about ${site.name} — our story, values, and commitment to authentic experiences.`;

  return {
    title,
    description,
    alternates: { canonical: `https://${SITE_DOMAIN}/${slug}/about` },
    openGraph: { title, description, url: `https://${SITE_DOMAIN}/${slug}/about` },
  };
}

export default async function PropertyAboutPage({ params }: Props) {
  const { slug } = await params;
  const site = getNetworkSite(slug);

  if (!site) {
    notFound();
  }

  return (
    <>
      <section className="relative min-h-[400px] w-full overflow-hidden bg-ink">
        <div className="absolute inset-0">
          <SafeImage
            src="https://images.unsplash.com/photo-1504674900968-f0cbe0e78c90?w=1200&h=600&fit=crop"
            alt={`About ${site.name}`}
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-black/20" />

        <div className="relative mx-auto flex min-h-[400px] max-w-[1440px] flex-col justify-end px-6 py-16 sm:px-14 sm:py-20">
          <nav className="mb-6 text-sm text-white/70">
            <Link href={`/${slug}`} className="hover:text-white">{site.name}</Link>
            <span className="mx-2">/</span>
            <span className="text-white">About Us</span>
          </nav>

          <h1 className="max-w-3xl font-sans text-[40px] font-extrabold leading-tight text-white sm:text-[52px]">
            About {site.name}
          </h1>
          <p className="mt-6 max-w-2xl text-lg text-white/90">
            Our story, values, and commitment to authentic, first-hand experiences across {site.name.toLowerCase()}.
          </p>
        </div>
      </section>

      <section className="border-b border-line py-16 sm:py-20">
        <div className="mx-auto max-w-[1200px] px-6 sm:px-14">
          <h2 className="font-sans text-3xl font-extrabold tracking-tight text-ink sm:text-4xl">
            Our Mission
          </h2>
          <p className="mt-6 max-w-2xl text-base leading-relaxed text-ink-muted">
            {site.name} is built on one core principle: everything we recommend has been experienced firsthand. No crowd-sourced rankings, no sponsored placements &mdash; just honest, thoughtful recommendations from someone who genuinely cares about the experience.
          </p>

          <div className="mt-10 grid grid-cols-1 gap-8 sm:grid-cols-3">
            <div className="rounded-media border border-line bg-paper-tint p-6">
              <h3 className="font-bold text-accent">Authenticity</h3>
              <p className="mt-3 text-sm text-ink-muted">
                Every tour, restaurant, and experience recommended here has been personally visited and evaluated.
              </p>
            </div>
            <div className="rounded-media border border-line bg-paper-tint p-6">
              <h3 className="font-bold text-accent">Honesty</h3>
              <p className="mt-3 text-sm text-ink-muted">
                We don&apos;t accept commissions or sponsorships. Our recommendations are entirely independent.
              </p>
            </div>
            <div className="rounded-media border border-line bg-paper-tint p-6">
              <h3 className="font-bold text-accent">Quality</h3>
              <p className="mt-3 text-sm text-ink-muted">
                We set a high bar. If something doesn&apos;t meet our standards, it simply doesn&apos;t get recommended.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-paper-tint py-16 sm:py-20">
        <div className="mx-auto max-w-[1200px] px-6 sm:px-14 text-center">
          <h2 className="font-sans text-3xl font-extrabold tracking-tight text-ink sm:text-4xl">
            Questions? Get in Touch
          </h2>
          <Link
            href={`/${slug}/contact`}
            className="mt-8 inline-flex h-12 items-center justify-center rounded-control bg-accent-gradient px-8 text-sm font-bold text-white shadow-glow transition-transform hover:scale-[1.02]"
          >
            Contact Us
          </Link>
        </div>
      </section>
    </>
  );
}
