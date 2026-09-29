import Link from &apos;@/components/NetworkLink&apos;;

const ROME_NEIGHBORHOODS = [
  {
    slug: &apos;centro-storico&apos;,
    name: &apos;Centro Storico&apos;,
    description: &apos;Historic center with iconic monuments — Pantheon, Trevi Fountain, and ancient squares&apos;,
  },
  {
    slug: &apos;colosseum-forum&apos;,
    name: &apos;Colosseum & Forum&apos;,
    description: &apos;Ancient Rome\&apos;s grandest landmarks with archaeological sites and history at every turn&apos;,
  },
  {
    slug: &apos;vatican&apos;,
    name: &apos;Vatican Area&apos;,
    description: &apos;St. Peter\&apos;s Basilica and Vatican Museums with wide streets perfect for leisurely rides&apos;,
  },
  {
    slug: &apos;trastevere&apos;,
    name: &apos;Trastevere&apos;,
    description: &apos;Charming neighborhood with cobblestone streets, ivy-covered buildings, and local atmosphere&apos;,
  },
  {
    slug: &apos;appian-way&apos;,
    name: &apos;Appian Way&apos;,
    description: &apos;Ancient Roman road with archaeological sites, catacombs, and countryside views outside the city&apos;,
  },
  {
    slug: &apos;villa-borghese&apos;,
    name: &apos;Villa Borghese&apos;,
    description: &apos;Expansive gardens and parks — perfect for scenic rides through Rome\&apos;s green spaces&apos;,
  },
  {
    slug: &apos;testaccio&apos;,
    name: &apos;Testaccio&apos;,
    description: &apos;Working-class Roman neighborhood with authentic local character and hidden gems&apos;,
  },
  {
    slug: &apos;spanish-steps&apos;,
    name: &apos;Spanish Steps Area&apos;,
    description: &apos;Elegant neighborhood with designer shops, galleries, and refined Roman architecture&apos;,
  },
];

export function GCRNeighborhoodsPage() {
  const jsonLd = {
    &apos;@context&apos;: &apos;https://schema.org&apos;,
    &apos;@type&apos;: &apos;CollectionPage&apos;,
    name: &apos;Golf Cart Tours by Rome Neighborhood&apos;,
    description: &apos;Guide to neighborhoods and areas for golf cart tours in Rome&apos;,
    url: &apos;https://golfcartrome.com/neighborhoods&apos;,
    mainEntity: {
      &apos;@type&apos;: &apos;ItemList&apos;,
      itemListElement: ROME_NEIGHBORHOODS.map((neighborhood, index) => ({
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
