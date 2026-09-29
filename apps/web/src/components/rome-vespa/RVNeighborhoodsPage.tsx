import Link from &apos;@/components/NetworkLink&apos;;

const ROME_NEIGHBORHOODS = [
  {
    slug: &apos;centro-storico&apos;,
    name: &apos;Centro Storico&apos;,
    description: &apos;Historic center with narrow winding streets, perfect for Vespa weaving through classic Rome&apos;,
  },
  {
    slug: &apos;trastevere&apos;,
    name: &apos;Trastevere&apos;,
    description: &apos;Charming neighborhood on the Tiber\&apos;s west bank — cobblestone streets and ivy-covered buildings&apos;,
  },
  {
    slug: &apos;testaccio&apos;,
    name: &apos;Testaccio&apos;,
    description: &apos;Working-class Roman neighborhood with authentic street life and local scooter culture&apos;,
  },
  {
    slug: &apos;prati&apos;,
    name: &apos;Prati&apos;,
    description: &apos;Elegant area near the Vatican with wide avenues and residential charm&apos;,
  },
  {
    slug: &apos;monti&apos;,
    name: &apos;Monti&apos;,
    description: &apos;Hillside neighborhood with steep streets, hidden piazzas, and local Roman authenticity&apos;,
  },
  {
    slug: &apos;campo-de-fiori&apos;,
    name: &apos;Campo de\&apos; Fiori&apos;,
    description: &apos;Lively square and surrounding streets — market hub and nightlife destination&apos;,
  },
  {
    slug: &apos;jewish-ghetto&apos;,
    name: &apos;Jewish Ghetto&apos;,
    description: &apos;Ancient Rome\&apos;s most compact neighborhood with centuries of layered history&apos;,
  },
  {
    slug: &apos;colosseum-area&apos;,
    name: &apos;Colosseum Area&apos;,
    description: &apos;Ancient Rome\&apos;s grand monuments — straight streets and touristic Roman landmarks&apos;,
  },
  {
    slug: &apos;appian-way&apos;,
    name: &apos;Appian Way&apos;,
    description: &apos;Ancient Roman road south of the city — open views and archaeological sites&apos;,
  },
  {
    slug: &apos;villa-borghese&apos;,
    name: &apos;Villa Borghese&apos;,
    description: &apos;Expansive gardens and park — leafy rides through Rome\&apos;s green lung&apos;,
  },
];

export function RVNeighborhoodsPage() {
  const jsonLd = {
    &apos;@context&apos;: &apos;https://schema.org&apos;,
    &apos;@type&apos;: &apos;CollectionPage&apos;,
    name: &apos;Vespa Tours by Rome Neighborhood&apos;,
    description: &apos;Guide to different neighborhoods and areas for Vespa touring in Rome&apos;,
    url: &apos;https://romevespa.com/neighborhoods&apos;,
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
