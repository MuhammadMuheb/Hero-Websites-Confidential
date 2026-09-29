import Link from '@/components/NetworkLink';

const ROME_NEIGHBORHOODS = [
  {
    slug: 'centro-storico',
    name: 'Centro Storico',
    description: 'Historic center with iconic monuments — Pantheon, Trevi Fountain, and ancient squares',
  },
  {
    slug: 'colosseum-forum',
    name: 'Colosseum & Forum',
    description: 'Ancient Rome\'s grandest landmarks with archaeological sites and history at every turn',
  },
  {
    slug: 'vatican',
    name: 'Vatican Area',
    description: 'St. Peter\'s Basilica and Vatican Museums with wide streets perfect for leisurely rides',
  },
  {
    slug: 'trastevere',
    name: 'Trastevere',
    description: 'Charming neighborhood with cobblestone streets, ivy-covered buildings, and local atmosphere',
  },
  {
    slug: 'appian-way',
    name: 'Appian Way',
    description: 'Ancient Roman road with archaeological sites, catacombs, and countryside views outside the city',
  },
  {
    slug: 'villa-borghese',
    name: 'Villa Borghese',
    description: 'Expansive gardens and parks — perfect for scenic rides through Rome\'s green spaces',
  },
  {
    slug: 'testaccio',
    name: 'Testaccio',
    description: 'Working-class Roman neighborhood with authentic local character and hidden gems',
  },
  {
    slug: 'spanish-steps',
    name: 'Spanish Steps Area',
    description: 'Elegant neighborhood with designer shops, galleries, and refined Roman architecture',
  },
];

export function GCRNeighborhoodsPage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: 'Golf Cart Tours by Rome Neighborhood',
    description: 'Guide to neighborhoods and areas for golf cart tours in Rome',
    url: 'https://golfcartrome.com/neighborhoods',
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
    <div className="gcr-scope bg-white">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      {/* Hero Section */}
      <section className="border-b border-line">
        <div className="mx-auto max-w-[1440px] px-6 pt-6 sm:px-14">
          <nav aria-label="Breadcrumb" className="text-sm text-faint">
            <Link href="/golf-cart-rome" className="hover:text-accent">
              Home
            </Link>
            <span className="mx-2">/</span>
            <span className="text-ink-muted">Neighborhoods</span>
          </nav>
        </div>
        <div className="mx-auto max-w-[1440px] px-6 py-14 text-center sm:px-14 sm:py-16">
          <h1 className="font-display text-3xl font-semibold text-ink sm:text-4xl">
            Ride Rome by Neighborhood
          </h1>
          <p className="mt-4 text-ink-muted">Guide to neighborhoods for comfortable golf cart tours</p>
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
