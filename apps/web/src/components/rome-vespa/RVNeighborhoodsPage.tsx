import Link from '@/components/NetworkLink';

const ROME_NEIGHBORHOODS = [
  {
    slug: 'centro-storico',
    name: 'Centro Storico',
    description: 'Historic center with narrow winding streets, perfect for Vespa weaving through classic Rome',
  },
  {
    slug: 'trastevere',
    name: 'Trastevere',
    description: 'Charming neighborhood on the Tiber\'s west bank — cobblestone streets and ivy-covered buildings',
  },
  {
    slug: 'testaccio',
    name: 'Testaccio',
    description: 'Working-class Roman neighborhood with authentic street life and local scooter culture',
  },
  {
    slug: 'prati',
    name: 'Prati',
    description: 'Elegant area near the Vatican with wide avenues and residential charm',
  },
  {
    slug: 'monti',
    name: 'Monti',
    description: 'Hillside neighborhood with steep streets, hidden piazzas, and local Roman authenticity',
  },
  {
    slug: 'campo-de-fiori',
    name: 'Campo de\' Fiori',
    description: 'Lively square and surrounding streets — market hub and nightlife destination',
  },
  {
    slug: 'jewish-ghetto',
    name: 'Jewish Ghetto',
    description: 'Ancient Rome\'s most compact neighborhood with centuries of layered history',
  },
  {
    slug: 'colosseum-area',
    name: 'Colosseum Area',
    description: 'Ancient Rome\'s grand monuments — straight streets and touristic Roman landmarks',
  },
  {
    slug: 'appian-way',
    name: 'Appian Way',
    description: 'Ancient Roman road south of the city — open views and archaeological sites',
  },
  {
    slug: 'villa-borghese',
    name: 'Villa Borghese',
    description: 'Expansive gardens and park — leafy rides through Rome\'s green lung',
  },
];

export function RVNeighborhoodsPage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: 'Vespa Tours by Rome Neighborhood',
    description: 'Guide to different neighborhoods and areas for Vespa touring in Rome',
    url: 'https://romevespa.com/neighborhoods',
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
    <div className="rv-scope bg-white">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      {/* Hero Section */}
      <section className="border-b border-line">
        <div className="mx-auto max-w-[1440px] px-6 pt-6 sm:px-14">
          <nav aria-label="Breadcrumb" className="text-sm text-faint">
            <Link href="/rome-vespa" className="hover:text-accent">
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
          <p className="mt-4 text-ink-muted">Guide to different neighborhoods where Vespa tours thrive</p>
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
