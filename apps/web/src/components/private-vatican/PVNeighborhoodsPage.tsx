import Link from '@/components/NetworkLink';

const VATICAN_NEIGHBORHOODS = [
  {
    slug: 'vatican-city',
    name: 'Vatican City',
    description: 'The spiritual heart — St. Peter\'s Basilica, museums, and the entire Vatican grounds',
  },
  {
    slug: 'prati',
    name: 'Prati',
    description: 'Elegant neighborhood adjacent to Vatican with wide avenues and residential calm',
  },
  {
    slug: 'borgo',
    name: 'Borgo',
    description: 'Medieval streets between Vatican and Tiber — charming alleyways and historic buildings',
  },
  {
    slug: 'trastevere',
    name: 'Trastevere',
    description: 'Picturesque neighborhood across the Tiber with ivy-covered buildings and local atmosphere',
  },
  {
    slug: 'castel-sant-angelo',
    name: 'Castel Sant\'Angelo',
    description: 'Historic fortress on the Tiber\'s banks with panoramic city views and bridge access',
  },
  {
    slug: 'campo-de-fiori',
    name: 'Campo de\' Fiori',
    description: 'Lively square surrounded by Renaissance architecture and vibrant street life',
  },
  {
    slug: 'pantheon-area',
    name: 'Pantheon Area',
    description: 'Ancient Rome\'s best-preserved monument surrounded by historic piazzas and streets',
  },
  {
    slug: 'trevi-fountain',
    name: 'Trevi Fountain Area',
    description: 'The iconic Baroque fountain with elegant streets and refined Roman atmosphere',
  },
];

export function PVNeighborhoodsPage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: 'Vatican & Rome Neighborhoods',
    description: 'Guide to neighborhoods and areas for Vatican tours',
    url: 'https://privatevatican.com/neighborhoods',
    mainEntity: {
      '@type': 'ItemList',
      itemListElement: VATICAN_NEIGHBORHOODS.map((neighborhood, index) => ({
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
    <div className="pv-scope bg-white">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      {/* Hero Section */}
      <section className="border-b border-line">
        <div className="mx-auto max-w-[1440px] px-6 pt-6 sm:px-14">
          <nav aria-label="Breadcrumb" className="text-sm text-faint">
            <Link href="/private-vatican" className="hover:text-accent">
              Home
            </Link>
            <span className="mx-2">/</span>
            <span className="text-ink-muted">Neighborhoods</span>
          </nav>
        </div>
        <div className="mx-auto max-w-[1440px] px-6 py-14 text-center sm:px-14 sm:py-16">
          <h1 className="font-display text-3xl font-semibold text-ink sm:text-4xl">
            Vatican & Rome Neighborhoods
          </h1>
          <p className="mt-4 text-ink-muted">Guide to neighborhoods and areas around the Vatican</p>
        </div>
      </section>

      {/* Neighborhoods Grid */}
      <section className="py-14">
        <div className="mx-auto max-w-[1000px] px-6 sm:px-14">
          <div className="space-y-3">
            {VATICAN_NEIGHBORHOODS.map((neighborhood) => (
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
