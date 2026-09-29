import Link from &apos;@/components/NetworkLink&apos;;

const NAPLES_NEIGHBORHOODS = [
  {
    slug: &apos;centro-storico&apos;,
    name: &apos;Centro Storico&apos;,
    description: &apos;Historic center with narrow alleyways and street vendors selling traditional Neapolitan food&apos;,
  },
  {
    slug: &apos;spanish-quarter&apos;,
    name: &apos;Spanish Quarter&apos;,
    description: &apos;Working-class neighborhood with authentic street food stands and local culture&apos;,
  },
  {
    slug: &apos;port-area&apos;,
    name: &apos;Port Area&apos;,
    description: &apos;Waterfront with seafood vendors, fresh catch, and maritime food traditions&apos;,
  },
  {
    slug: &apos;spaccanapoli&apos;,
    name: &apos;Spaccanapoli&apos;,
    description: &apos;Famous straight street cutting through historic Naples — lined with food stalls and vendors&apos;,
  },
  {
    slug: &apos;piazza-dante&apos;,
    name: &apos;Piazza Dante&apos;,
    description: &apos;Central square with surrounding food markets and local street vendors&apos;,
  },
  {
    slug: &apos;vomero&apos;,
    name: &apos;Vomero&apos;,
    description: &apos;Hilltop neighborhood with local food culture and street food traditions&apos;,
  },
  {
    slug: &apos;chiaia&apos;,
    name: &apos;Chiaia&apos;,
    description: &apos;Elegant seafront district with local food shops and casual eating spots&apos;,
  },
];

export function NSFNeighborhoodsPage() {
  const jsonLd = {
    &apos;@context&apos;: &apos;https://schema.org&apos;,
    &apos;@type&apos;: &apos;CollectionPage&apos;,
    name: &apos;Naples Street Food by Neighborhood&apos;,
    description: &apos;Guide to neighborhoods and street food areas in Naples&apos;,
    url: &apos;https://naples-street-food.com/neighborhoods&apos;,
    mainEntity: {
      &apos;@type&apos;: &apos;ItemList&apos;,
      itemListElement: NAPLES_NEIGHBORHOODS.map((neighborhood, index) => ({
        &apos;@type&apos;: &apos;ListItem&apos;,
        position: index + 1,
        item: {
          &apos;@type&apos;: &apos;Place&apos;,
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
