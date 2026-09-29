import Link from &apos;@/components/NetworkLink&apos;;

const VATICAN_NEIGHBORHOODS = [
  {
    slug: &apos;vatican-city&apos;,
    name: &apos;Vatican City&apos;,
    description: &apos;The spiritual heart — St. Peter\&apos;s Basilica, museums, and the entire Vatican grounds&apos;,
  },
  {
    slug: &apos;prati&apos;,
    name: &apos;Prati&apos;,
    description: &apos;Elegant neighborhood adjacent to Vatican with wide avenues and residential calm&apos;,
  },
  {
    slug: &apos;borgo&apos;,
    name: &apos;Borgo&apos;,
    description: &apos;Medieval streets between Vatican and Tiber — charming alleyways and historic buildings&apos;,
  },
  {
    slug: &apos;trastevere&apos;,
    name: &apos;Trastevere&apos;,
    description: &apos;Picturesque neighborhood across the Tiber with ivy-covered buildings and local atmosphere&apos;,
  },
  {
    slug: &apos;castel-sant-angelo&apos;,
    name: &apos;Castel Sant\&apos;Angelo&apos;,
    description: &apos;Historic fortress on the Tiber\&apos;s banks with panoramic city views and bridge access&apos;,
  },
  {
    slug: &apos;campo-de-fiori&apos;,
    name: &apos;Campo de\&apos; Fiori&apos;,
    description: &apos;Lively square surrounded by Renaissance architecture and vibrant street life&apos;,
  },
  {
    slug: &apos;pantheon-area&apos;,
    name: &apos;Pantheon Area&apos;,
    description: &apos;Ancient Rome\&apos;s best-preserved monument surrounded by historic piazzas and streets&apos;,
  },
  {
    slug: &apos;trevi-fountain&apos;,
    name: &apos;Trevi Fountain Area&apos;,
    description: &apos;The iconic Baroque fountain with elegant streets and refined Roman atmosphere&apos;,
  },
];

export function PVNeighborhoodsPage() {
  const jsonLd = {
    &apos;@context&apos;: &apos;https://schema.org&apos;,
    &apos;@type&apos;: &apos;CollectionPage&apos;,
    name: &apos;Vatican & Rome Neighborhoods&apos;,
    description: &apos;Guide to neighborhoods and areas for Vatican tours&apos;,
    url: &apos;https://privatevatican.com/neighborhoods&apos;,
    mainEntity: {
      &apos;@type&apos;: &apos;ItemList&apos;,
      itemListElement: VATICAN_NEIGHBORHOODS.map((neighborhood, index) => ({
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
