import type { Metadata } from 'next';
import Link from '@/components/NetworkLink';
import { SITE_DOMAIN } from '@/lib/firestore';
import { InnerHero } from '@/components/InnerHero';
import { NEIGHBORHOODS } from '@/lib/tours';

export const revalidate = 3600;

export const metadata: Metadata = {
  title: 'Rome Neighbourhood Food Guides',
  description:
    "Where to eat in Rome, neighbourhood by neighbourhood — Trastevere, Testaccio, the Jewish Ghetto, Campo de' Fiori, Monti, and more.",
  alternates: { canonical: `https://${SITE_DOMAIN}/neighborhoods` },
};

export default function NeighborhoodsIndexPage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: 'Rome Neighbourhood Food Guides',
    url: `https://${SITE_DOMAIN}/neighborhoods`,
    mainEntity: {
      '@type': 'ItemList',
      itemListElement: NEIGHBORHOODS.map((n, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        url: `https://${SITE_DOMAIN}/neighborhoods/${n.slug}`,
        name: n.name,
      })),
    },
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <InnerHero
        eyebrow="Neighbourhood Guides"
        title="Where to Eat in Rome, By Neighbourhood"
        subtitle="Every neighbourhood has a different food identity — here's what to eat and when to go, area by area."
        breadcrumb={{ label: 'Home', href: '/' }}
      />

      <section className="py-10">
        <div className="mx-auto max-w-[1000px] px-6 sm:px-14">
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            {NEIGHBORHOODS.map((n) => (
              <Link
                key={n.slug}
                href={`/neighborhoods/${n.slug}`}
                className="group flex items-center justify-between rounded-2xl border border-line bg-white p-6 transition-colors hover:border-accent"
              >
                <span className="font-display text-xl font-semibold text-ink">{n.name}</span>
                <span className="text-faint transition-colors group-hover:text-accent">→</span>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
