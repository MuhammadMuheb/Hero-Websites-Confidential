import Link from &apos;@/components/NetworkLink&apos;;

/**
 * Pompeii Day Trip Neighborhoods/Areas page — displays different zones and areas
 * within the Pompeii archaeological site. Mirrors Street Food Rome&apos;s Neighborhoods
 * structure. Wrapped in .pdt-scope for Volcanic Ember theming.
 */

export const POMPEII_AREAS = [
  {
    slug: &apos;forum&apos;,
    name: &apos;The Forum&apos;,
    description: &apos;The civic center of ancient Pompeii — temples, markets, and public buildings&apos;,
  },
  {
    slug: &apos;house-of-the-faun&apos;,
    name: &apos;House of the Faun&apos;,
    description: &apos;One of Pompeii\&apos;s largest private residences with famous Alexander mosaic&apos;,
  },
  {
    slug: &apos;house-of-mysteries&apos;,
    name: &apos;House of the Mysteries&apos;,
    description: &apos;Villa with remarkable frescoes showing Dionysian rituals and initiation ceremonies&apos;,
  },
  {
    slug: &apos;amphitheater&apos;,
    name: &apos;Amphitheater&apos;,
    description: &apos;Ancient entertainment venue — one of the oldest known stone amphitheaters&apos;,
  },
  {
    slug: &apos;theaters&apos;,
    name: &apos;Theaters&apos;,
    description: &apos;The Grand Theater and Small Theater — public venues for drama and performance&apos;,
  },
  {
    slug: &apos;street-of-tombs&apos;,
    name: &apos;Street of Tombs&apos;,
    description: &apos;Via dei Sepolcri — lined with family tombs and monuments outside the city gate&apos;,
  },
  {
    slug: &apos;bakery-thermopolium&apos;,
    name: &apos;Bakery & Thermopolium&apos;,
    description: &apos;Ancient food establishments frozen in time by the eruption of Mount Vesuvius&apos;,
  },
  {
    slug: &apos;lupanare&apos;,
    name: &apos;The Lupanare&apos;,
    description: &apos;Ancient brothel with preserved frescoes and graffiti from visitors&apos;,
  },
  {
    slug: &apos;herculaneum-gate&apos;,
    name: &apos;Herculaneum Gate&apos;,
    description: &apos;Northern entrance with remains of inhabitants who sheltered during the eruption&apos;,
  },
  {
    slug: &apos;garden-houses&apos;,
    name: &apos;Garden Houses&apos;,
    description: &apos;Residential villas showcasing daily life, from wealthy estates to modest homes&apos;,
  },
];

export function PDTNeighborhoodsPage() {
  const jsonLd = {
    &apos;@context&apos;: &apos;https://schema.org&apos;,
    &apos;@type&apos;: &apos;CollectionPage&apos;,
    name: &apos;Pompeii Areas & Zones&apos;,
    description: &apos;Guide to different areas and zones within the Pompeii archaeological site&apos;,
    url: &apos;https://pompeiidaytrip.com/neighborhoods&apos;,
    mainEntity: {
      &apos;@type&apos;: &apos;ItemList&apos;,
      itemListElement: POMPEII_AREAS.map((area, index) => ({
        &apos;@type&apos;: &apos;ListItem&apos;,
        position: index + 1,
        item: {
          &apos;@type&apos;: &apos;Place&apos;,
          name: area.name,
          description: area.description,
        },
      })),
    },
  };

  return (
    <div className="bg-white">
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
