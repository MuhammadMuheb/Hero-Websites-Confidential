import Link from &apos;@/components/NetworkLink&apos;;

const TIVOLI_ATTRACTIONS = [
  {
    slug: &apos;villa-d-este&apos;,
    name: &apos;Villa d\&apos;Este&apos;,
    description: &apos;Renaissance villa famous for elaborate fountains and water features&apos;,
  },
  {
    slug: &apos;hadrians-villa&apos;,
    name: &apos;Hadrian\&apos;s Villa&apos;,
    description: &apos;Ancient Roman emperor\&apos;s retreat with extensive ruins and archaeological sites&apos;,
  },
  {
    slug: &apos;tivoli-town&apos;,
    name: &apos;Tivoli Town&apos;,
    description: &apos;Historic hilltop town with medieval buildings and local Roman atmosphere&apos;,
  },
  {
    slug: &apos;aniene-river&apos;,
    name: &apos;Aniene River&apos;,
    description: &apos;Natural valley with cascading waterfalls and scenic river walks&apos;,
  },
  {
    slug: &apos;villa-gregoriana&apos;,
    name: &apos;Villa Gregoriana&apos;,
    description: &apos;Park with dramatic cliff views, waterfall and ancient Roman temple remains&apos;,
  },
];

export function TVDTNeighborhoodsPage() {
  const jsonLd = {
    &apos;@context&apos;: &apos;https://schema.org&apos;,
    &apos;@type&apos;: &apos;CollectionPage&apos;,
    name: &apos;Tivoli Day Trip Attractions&apos;,
    description: &apos;Guide to attractions and areas for Tivoli day trips from Rome&apos;,
    url: &apos;https://tivoli-day-trip.com/neighborhoods&apos;,
    mainEntity: {
      &apos;@type&apos;: &apos;ItemList&apos;,
      itemListElement: TIVOLI_ATTRACTIONS.map((attraction, index) => ({
        &apos;@type&apos;: &apos;ListItem&apos;,
        position: index + 1,
        item: {
          &apos;@type&apos;: &apos;Place&apos;,
          name: attraction.name,
          description: attraction.description,
        },
      })),
    },
  };

  return (
    <div className="tvdt-scope bg-white">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      {/* Hero Section */}
      <section className="border-b border-line">
        <div className="mx-auto max-w-[1440px] px-6 pt-6 sm:px-14">
          <nav aria-label="Breadcrumb" className="text-sm text-faint">
            <Link href="/tivoli-day-trip" className="hover:text-accent">
              Home
            </Link>
            <span className="mx-2">/</span>
            <span className="text-ink-muted">Attractions</span>
          </nav>
        </div>
        <div className="mx-auto max-w-[1440px] px-6 py-14 text-center sm:px-14 sm:py-16">
          <h1 className="font-display text-3xl font-semibold text-ink sm:text-4xl">
            Explore Tivoli
          </h1>
          <p className="mt-4 text-ink-muted">Guide to villas, sites and attractions for Tivoli day trips</p>
        </div>
      </section>

      {/* Attractions Grid */}
      <section className="py-14">
        <div className="mx-auto max-w-[1000px] px-6 sm:px-14">
          <div className="space-y-3">
            {TIVOLI_ATTRACTIONS.map((attraction) => (
              <div key={attraction.slug} className="rounded-card border border-line bg-white p-6 transition-all hover:border-accent hover:shadow-card">
                <h2 className="font-display text-xl font-semibold text-ink">{attraction.name}</h2>
                <p className="mt-2 text-sm text-ink-muted">{attraction.description}</p>
                <button className="mt-4 text-sm font-bold text-accent hover:underline">Learn more →</button>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
