import Link from &apos;@/components/NetworkLink&apos;;

const ROME_NEIGHBORHOODS = [
  {
    slug: &apos;testaccio&apos;,
    name: &apos;Testaccio&apos;,
    description: &apos;Traditional Roman neighborhood with authentic pizza culture and family pizzerias&apos;,
  },
  {
    slug: &apos;trastevere&apos;,
    name: &apos;Trastevere&apos;,
    description: &apos;Charming riverside area famous for casual pizza joints and traditional wood-fired ovens&apos;,
  },
  {
    slug: &apos;campo-de-fiori&apos;,
    name: &apos;Campo de\&apos; Fiori&apos;,
    description: &apos;Lively square surrounded by pizza restaurants and casual Roman dining&apos;,
  },
  {
    slug: &apos;centro-storico&apos;,
    name: &apos;Centro Storico&apos;,
    description: &apos;Historic center with mix of upscale pizzerias and traditional pizza schools&apos;,
  },
  {
    slug: &apos;monti&apos;,
    name: &apos;Monti&apos;,
    description: &apos;Hillside neighborhood with artisan bakeries and authentic neighborhood pizzerias&apos;,
  },
  {
    slug: &apos;jewish-ghetto&apos;,
    name: &apos;Jewish Ghetto&apos;,
    description: &apos;Historic area with unique pizza traditions and local food establishments&apos;,
  },
];

export function RPCNeighborhoodsPage() {
  const jsonLd = {
    &apos;@context&apos;: &apos;https://schema.org&apos;,
    &apos;@type&apos;: &apos;CollectionPage&apos;,
    name: &apos;Pizza Classes by Rome Neighborhood&apos;,
    description: &apos;Guide to neighborhoods for pizza-making classes in Rome&apos;,
    url: &apos;https://romepizzaclass.com/neighborhoods&apos;,
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
