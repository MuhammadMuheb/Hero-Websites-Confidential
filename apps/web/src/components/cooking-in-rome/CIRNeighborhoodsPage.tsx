import Link from &apos;@/components/NetworkLink&apos;;

const ROME_NEIGHBORHOODS = [
  {
    slug: &apos;testaccio&apos;,
    name: &apos;Testaccio&apos;,
    description: &apos;Working-class neighborhood famous for traditional Roman cuisine and authentic food culture&apos;,
  },
  {
    slug: &apos;trastevere&apos;,
    name: &apos;Trastevere&apos;,
    description: &apos;Charming riverside area with intimate trattorias, wine bars, and local food traditions&apos;,
  },
  {
    slug: &apos;campo-de-fiori&apos;,
    name: &apos;Campo de\&apos; Fiori&apos;,
    description: &apos;Vibrant market square and surrounding streets — where Romans shop for fresh ingredients&apos;,
  },
  {
    slug: &apos;jewish-ghetto&apos;,
    name: &apos;Jewish Ghetto&apos;,
    description: &apos;Historic neighborhood with unique culinary traditions and family-run food establishments&apos;,
  },
  {
    slug: &apos;monti&apos;,
    name: &apos;Monti&apos;,
    description: &apos;Hillside neighborhood with artisan food shops, pasta makers, and local food culture&apos;,
  },
  {
    slug: &apos;centro-storico&apos;,
    name: &apos;Centro Storico&apos;,
    description: &apos;Historic center with markets, food shops, and traditional Roman food destinations&apos;,
  },
  {
    slug: &apos;prati&apos;,
    name: &apos;Prati&apos;,
    description: &apos;Residential neighborhood with neighborhood markets and authentic local food scene&apos;,
  },
];

export function CIRNeighborhoodsPage() {
  const jsonLd = {
    &apos;@context&apos;: &apos;https://schema.org&apos;,
    &apos;@type&apos;: &apos;CollectionPage&apos;,
    name: &apos;Cooking Classes by Rome Neighborhood&apos;,
    description: &apos;Guide to neighborhoods and food markets for cooking classes in Rome&apos;,
    url: &apos;https://cookinginrome.com/neighborhoods&apos;,
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
    <div className="cir-scope bg-white">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      {/* Hero Section */}
      <section className="border-b border-line">
        <div className="mx-auto max-w-[1440px] px-6 pt-6 sm:px-14">
          <nav aria-label="Breadcrumb" className="text-sm text-faint">
            <Link href="/cooking-in-rome" className="hover:text-accent">
              Home
            </Link>
            <span className="mx-2">/</span>
            <span className="text-ink-muted">Neighborhoods</span>
          </nav>
        </div>
        <div className="mx-auto max-w-[1440px] px-6 py-14 text-center sm:px-14 sm:py-16">
          <h1 className="font-display text-3xl font-semibold text-ink sm:text-4xl">
            Cook Rome by Neighborhood
          </h1>
          <p className="mt-4 text-ink-muted">Guide to food neighborhoods and markets for cooking classes</p>
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
