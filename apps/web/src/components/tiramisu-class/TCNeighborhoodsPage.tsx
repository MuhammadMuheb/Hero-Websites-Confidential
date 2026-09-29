import Link from '@/components/NetworkLink';

const ROME_NEIGHBORHOODS = [
  {
    slug: 'centro-storico',
    name: 'Centro Storico',
    description: 'Historic center with traditional dessert shops and historic cafes',
  },
  {
    slug: 'trastevere',
    name: 'Trastevere',
    description: 'Charming neighborhood with gelato makers and local dessert traditions',
  },
  {
    slug: 'monti',
    name: 'Monti',
    description: 'Hillside area with artisan pastry shops and traditional Italian bakeries',
  },
  {
    slug: 'campo-de-fiori',
    name: 'Campo de\' Fiori',
    description: 'Market square with fresh ingredients and local food traditions',
  },
  {
    slug: 'jewish-ghetto',
    name: 'Jewish Ghetto',
    description: 'Historic neighborhood with unique dessert traditions and food culture',
  },
];

export function TCNeighborhoodsPage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: 'Tiramisu Classes by Rome Neighborhood',
    description: 'Guide to neighborhoods for tiramisu and dessert classes in Rome',
    url: 'https://tiramisu-class.com/neighborhoods',
    mainEntity: {
      '@type': 'ItemList',
      itemListElement: ROME_NEIGHBORHOODS.map((neighborhood, index) => ({
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
    <div className="tc-scope bg-white">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      {/* Hero Section */}
      <section className="border-b border-line">
        <div className="mx-auto max-w-[1440px] px-6 pt-6 sm:px-14">
          <nav aria-label="Breadcrumb" className="text-sm text-faint">
            <Link href="/tiramisu-class" className="hover:text-accent">
              Home
            </Link>
            <span className="mx-2">/</span>
            <span className="text-ink-muted">Neighborhoods</span>
          </nav>
        </div>
        <div className="mx-auto max-w-[1440px] px-6 py-14 text-center sm:px-14 sm:py-16">
          <h1 className="font-display text-3xl font-semibold text-ink sm:text-4xl">
            Make Desserts by Neighborhood
          </h1>
          <p className="mt-4 text-ink-muted">Guide to neighborhoods and dessert traditions in Rome</p>
        </div>
      </section>

      {/* Neighborhoods Grid */}
      <section className="py-14">
        <div className="mx-auto max-w-[1000px] px-6 sm:px-14">
          <div className="space-y-3">
            {ROME_NEIGHBORHOODS.map((neighborhood) => (
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
