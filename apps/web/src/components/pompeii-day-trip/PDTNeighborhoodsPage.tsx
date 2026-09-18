import Link from '@/components/NetworkLink';

/**
 * Pompeii Day Trip Neighborhoods/Areas page — displays different zones and areas
 * within the Pompeii archaeological site. Mirrors Street Food Rome's Neighborhoods
 * structure. Wrapped in .pdt-scope for Volcanic Ember theming.
 */

const POMPEII_AREAS = [
  {
    slug: 'forum',
    name: 'The Forum',
    description: 'The civic center of ancient Pompeii — temples, markets, and public buildings',
  },
  {
    slug: 'house-of-the-faun',
    name: 'House of the Faun',
    description: 'One of Pompeii\'s largest private residences with famous Alexander mosaic',
  },
  {
    slug: 'house-of-mysteries',
    name: 'House of the Mysteries',
    description: 'Villa with remarkable frescoes showing Dionysian rituals and initiation ceremonies',
  },
  {
    slug: 'amphitheater',
    name: 'Amphitheater',
    description: 'Ancient entertainment venue — one of the oldest known stone amphitheaters',
  },
  {
    slug: 'theaters',
    name: 'Theaters',
    description: 'The Grand Theater and Small Theater — public venues for drama and performance',
  },
  {
    slug: 'street-of-tombs',
    name: 'Street of Tombs',
    description: 'Via dei Sepolcri — lined with family tombs and monuments outside the city gate',
  },
  {
    slug: 'bakery-thermopolium',
    name: 'Bakery & Thermopolium',
    description: 'Ancient food establishments frozen in time by the eruption of Mount Vesuvius',
  },
  {
    slug: 'lupanare',
    name: 'The Lupanare',
    description: 'Ancient brothel with preserved frescoes and graffiti from visitors',
  },
  {
    slug: 'herculaneum-gate',
    name: 'Herculaneum Gate',
    description: 'Northern entrance with remains of inhabitants who sheltered during the eruption',
  },
  {
    slug: 'garden-houses',
    name: 'Garden Houses',
    description: 'Residential villas showcasing daily life, from wealthy estates to modest homes',
  },
];

export function PDTNeighborhoodsPage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: 'Pompeii Areas & Zones',
    description: 'Guide to different areas and zones within the Pompeii archaeological site',
    url: 'https://pompeiidaytrip.com/neighborhoods',
    mainEntity: {
      '@type': 'ItemList',
      itemListElement: POMPEII_AREAS.map((area, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        item: {
          '@type': 'Place',
          name: area.name,
          description: area.description,
        },
      })),
    },
  };

  return (
    <div className="pdt-scope bg-white">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      {/* Hero Section */}
      <section className="border-b border-line">
        <div className="mx-auto max-w-[1440px] px-6 pt-6 sm:px-14">
          <nav aria-label="Breadcrumb" className="text-sm text-faint">
            <Link href="/" className="hover:text-accent">
              Home
            </Link>
            <span className="mx-2">/</span>
            <span className="text-ink-muted">Areas</span>
          </nav>
        </div>
        <div className="mx-auto max-w-[1440px] px-6 py-14 text-center sm:px-14 sm:py-16">
          <h1 className="font-display text-3xl font-semibold text-ink sm:text-4xl">
            Explore Pompeii by Area
          </h1>
          <p className="mt-4 text-ink-muted">Guide to different zones and landmarks within the archaeological site</p>
        </div>
      </section>

      {/* Areas Grid */}
      <section className="py-14">
        <div className="mx-auto max-w-[1000px] px-6 sm:px-14">
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            {POMPEII_AREAS.map((area) => (
              <Link
                key={area.slug}
                href={`/pompeii-day-trip/neighborhoods/${area.slug}`}
                className="rounded-card border border-line bg-white p-6 transition-all hover:border-accent hover:shadow-card"
              >
                <h2 className="font-display text-xl font-semibold text-ink">{area.name}</h2>
                <p className="mt-2 text-sm text-ink-muted">{area.description}</p>
                <div className="mt-4 text-sm font-bold text-accent">Learn more →</div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
