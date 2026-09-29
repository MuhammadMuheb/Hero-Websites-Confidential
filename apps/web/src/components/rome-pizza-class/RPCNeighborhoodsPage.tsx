import Link from '@/components/NetworkLink';

const ROME_NEIGHBORHOODS = [
  {
    slug: 'testaccio',
    name: 'Testaccio',
    description: 'Traditional Roman neighborhood with authentic pizza culture and family pizzerias',
  },
  {
    slug: 'trastevere',
    name: 'Trastevere',
    description: 'Charming riverside area famous for casual pizza joints and traditional wood-fired ovens',
  },
  {
    slug: 'campo-de-fiori',
    name: 'Campo de\' Fiori',
    description: 'Lively square surrounded by pizza restaurants and casual Roman dining',
  },
  {
    slug: 'centro-storico',
    name: 'Centro Storico',
    description: 'Historic center with mix of upscale pizzerias and traditional pizza schools',
  },
  {
    slug: 'monti',
    name: 'Monti',
    description: 'Hillside neighborhood with artisan bakeries and authentic neighborhood pizzerias',
  },
  {
    slug: 'jewish-ghetto',
    name: 'Jewish Ghetto',
    description: 'Historic area with unique pizza traditions and local food establishments',
  },
];

export function RPCNeighborhoodsPage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: 'Pizza Classes by Rome Neighborhood',
    description: 'Guide to neighborhoods for pizza-making classes in Rome',
    url: 'https://romepizzaclass.com/neighborhoods',
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
    <div className="rpc-scope bg-white">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      {/* Hero Section */}
      <section className="border-b border-line">
        <div className="mx-auto max-w-[1440px] px-6 pt-6 sm:px-14">
          <nav aria-label="Breadcrumb" className="text-sm text-faint">
            <Link href="/rome-pizza-class" className="hover:text-accent">
              Home
            </Link>
            <span className="mx-2">/</span>
            <span className="text-ink-muted">Neighborhoods</span>
          </nav>
        </div>
        <div className="mx-auto max-w-[1440px] px-6 py-14 text-center sm:px-14 sm:py-16">
          <h1 className="font-display text-3xl font-semibold text-ink sm:text-4xl">
            Make Pizza by Neighborhood
          </h1>
          <p className="mt-4 text-ink-muted">Guide to neighborhoods and pizza traditions in Rome</p>
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
