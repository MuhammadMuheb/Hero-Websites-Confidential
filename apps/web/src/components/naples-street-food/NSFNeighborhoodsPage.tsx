import Link from '@/components/NetworkLink';

const NAPLES_NEIGHBORHOODS = [
  {
    slug: 'centro-storico',
    name: 'Centro Storico',
    description: 'Historic center with narrow alleyways and street vendors selling traditional Neapolitan food',
  },
  {
    slug: 'spanish-quarter',
    name: 'Spanish Quarter',
    description: 'Working-class neighborhood with authentic street food stands and local culture',
  },
  {
    slug: 'port-area',
    name: 'Port Area',
    description: 'Waterfront with seafood vendors, fresh catch, and maritime food traditions',
  },
  {
    slug: 'spaccanapoli',
    name: 'Spaccanapoli',
    description: 'Famous straight street cutting through historic Naples — lined with food stalls and vendors',
  },
  {
    slug: 'piazza-dante',
    name: 'Piazza Dante',
    description: 'Central square with surrounding food markets and local street vendors',
  },
  {
    slug: 'vomero',
    name: 'Vomero',
    description: 'Hilltop neighborhood with local food culture and street food traditions',
  },
  {
    slug: 'chiaia',
    name: 'Chiaia',
    description: 'Elegant seafront district with local food shops and casual eating spots',
  },
];

export function NSFNeighborhoodsPage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: 'Naples Street Food by Neighborhood',
    description: 'Guide to neighborhoods and street food areas in Naples',
    url: 'https://naples-street-food.com/neighborhoods',
    mainEntity: {
      '@type': 'ItemList',
      itemListElement: NAPLES_NEIGHBORHOODS.map((neighborhood, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        item: {
          '@type': 'Place',
          name: neighborhood.name,
          description: neighborhood.description,
        },
      })),
    },
  };

  return (
    <div className="nsf-scope bg-white">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      {/* Hero Section */}
      <section className="border-b border-line">
        <div className="mx-auto max-w-[1440px] px-6 pt-6 sm:px-14">
          <nav aria-label="Breadcrumb" className="text-sm text-faint">
            <Link href="/naples-street-food" className="hover:text-accent">
              Home
            </Link>
            <span className="mx-2">/</span>
            <span className="text-ink-muted">Neighborhoods</span>
          </nav>
        </div>
        <div className="mx-auto max-w-[1440px] px-6 py-14 text-center sm:px-14 sm:py-16">
          <h1 className="font-display text-3xl font-semibold text-ink sm:text-4xl">
            Eat Naples by Neighborhood
          </h1>
          <p className="mt-4 text-ink-muted">Guide to neighborhoods and street food areas in Naples</p>
        </div>
      </section>

      {/* Neighborhoods Grid */}
      <section className="py-14">
        <div className="mx-auto max-w-[1000px] px-6 sm:px-14">
          <div className="space-y-3">
            {NAPLES_NEIGHBORHOODS.map((neighborhood) => (
              <div key={neighborhood.slug} className="rounded-card border border-line bg-white p-6 transition-all hover:border-accent hover:shadow-card">
                <h2 className="font-display text-xl font-semibold text-ink">{neighborhood.name}</h2>
                <p className="mt-2 text-sm text-ink-muted">{neighborhood.description}</p>
                <button className="mt-4 text-sm font-bold text-accent hover:underline">Learn more →</button>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
