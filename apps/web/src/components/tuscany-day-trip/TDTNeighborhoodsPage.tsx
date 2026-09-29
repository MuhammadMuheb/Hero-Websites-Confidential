import Link from '@/components/NetworkLink';

const TUSCANY_TOWNS = [
  {
    slug: 'florence',
    name: 'Florence',
    description: 'Renaissance capital with art museums, cathedrals, and bridge crossings over the Arno',
  },
  {
    slug: 'siena',
    name: 'Siena',
    description: 'Medieval hill town famous for its Palio horse race and stunning piazza',
  },
  {
    slug: 'chianti',
    name: 'Chianti',
    description: 'Wine region with rolling vineyards, family wineries, and wine production tours',
  },
  {
    slug: 'montepulciano',
    name: 'Montepulciano',
    description: 'Renaissance town on a hilltop with wine estates and panoramic countryside views',
  },
  {
    slug: 'pienza',
    name: 'Pienza',
    description: 'Ideal Renaissance town with perfectly planned streets and Tuscan countryside',
  },
  {
    slug: 'san-gimignano',
    name: 'San Gimignano',
    description: 'Medieval hill town famous for its tower houses and historic streets',
  },
  {
    slug: 'cortona',
    name: 'Cortona',
    description: 'Ancient Etruscan hilltop town with Renaissance art and sweeping valley views',
  },
];

export function TDTNeighborhoodsPage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: 'Tuscany Day Trip Towns',
    description: 'Guide to towns and areas for Tuscany day trips from Florence',
    url: 'https://tuscany-day-trip.com/neighborhoods',
    mainEntity: {
      '@type': 'ItemList',
      itemListElement: TUSCANY_TOWNS.map((town, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        item: {
          '@type': 'Place',
          name: town.name,
          description: town.description,
        },
      })),
    },
  };

  return (
    <div className="tdt-scope bg-white">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      {/* Hero Section */}
      <section className="border-b border-line">
        <div className="mx-auto max-w-[1440px] px-6 pt-6 sm:px-14">
          <nav aria-label="Breadcrumb" className="text-sm text-faint">
            <Link href="/tuscany-day-trip" className="hover:text-accent">
              Home
            </Link>
            <span className="mx-2">/</span>
            <span className="text-ink-muted">Towns</span>
          </nav>
        </div>
        <div className="mx-auto max-w-[1440px] px-6 py-14 text-center sm:px-14 sm:py-16">
          <h1 className="font-display text-3xl font-semibold text-ink sm:text-4xl">
            Explore Tuscany
          </h1>
          <p className="mt-4 text-ink-muted">Guide to towns and countryside for Tuscany day trips</p>
        </div>
      </section>

      {/* Towns Grid */}
      <section className="py-14">
        <div className="mx-auto max-w-[1000px] px-6 sm:px-14">
          <div className="space-y-3">
            {TUSCANY_TOWNS.map((town) => (
              <div key={town.slug} className="rounded-card border border-line bg-white p-6 transition-all hover:border-accent hover:shadow-card">
                <h2 className="font-display text-xl font-semibold text-ink">{town.name}</h2>
                <p className="mt-2 text-sm text-ink-muted">{town.description}</p>
                <button className="mt-4 text-sm font-bold text-accent hover:underline">Learn more →</button>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
