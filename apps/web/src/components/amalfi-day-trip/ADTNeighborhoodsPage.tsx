import Link from &apos;@/components/NetworkLink&apos;;

const AMALFI_COAST_AREAS = [
  {
    slug: &apos;amalfi-town&apos;,
    name: &apos;Amalfi Town&apos;,
    description: &apos;The heart of the coast — charming piazzas, cathedral, and harbor views perfect for wandering&apos;,
  },
  {
    slug: &apos;positano&apos;,
    name: &apos;Positano&apos;,
    description: &apos;Cliffside village with pastel-colored houses cascading to the beach — the most picturesque stop on the coast&apos;,
  },
  {
    slug: &apos;ravello&apos;,
    name: &apos;Ravello&apos;,
    description: &apos;Hilltop town with stunning views, terrace gardens, and peaceful atmosphere away from coastal crowds&apos;,
  },
  {
    slug: &apos;salerno&apos;,
    name: &apos;Salerno&apos;,
    description: &apos;Gateway city with Roman history, vibrant waterfront, and authentic local food culture&apos;,
  },
  {
    slug: &apos;atrani&apos;,
    name: &apos;Atrani&apos;,
    description: &apos;Tiny village with medieval charm — the smallest municipality on the coast with timeless character&apos;,
  },
  {
    slug: &apos;praiano&apos;,
    name: &apos;Praiano&apos;,
    description: &apos;Fishing village on vertical cliffs with secluded beaches and authentic local restaurants&apos;,
  },
  {
    slug: &apos;furore&apos;,
    name: &apos;Furore&apos;,
    description: &apos;Hidden gem village known for its fjord, secret beach cove, and dramatic mountain backdrop&apos;,
  },
  {
    slug: &apos;minori&apos;,
    name: &apos;Minori&apos;,
    description: &apos;Quiet beach town with Roman villa ruins and lemon grove history along a wide sandy shore&apos;,
  },
  {
    slug: &apos;maiori&apos;,
    name: &apos;Maiori&apos;,
    description: &apos;Larger beach resort with more amenities, local wine production, and family-friendly atmosphere&apos;,
  },
  {
    slug: &apos;sorrento&apos;,
    name: &apos;Sorrento&apos;,
    description: &apos;Seaside town perched on cliffs with lemon terraces, easy Bay of Naples access, and local markets&apos;,
  },
];

export function ADTNeighborhoodsPage() {
  const jsonLd = {
    &apos;@context&apos;: &apos;https://schema.org&apos;,
    &apos;@type&apos;: &apos;CollectionPage&apos;,
    name: &apos;Amalfi Coast Towns & Areas&apos;,
    description: &apos;Guide to different towns and areas along the Amalfi Coast&apos;,
    url: &apos;https://amalficoastdaytrip.com/neighborhoods&apos;,
    mainEntity: {
      &apos;@type&apos;: &apos;ItemList&apos;,
      itemListElement: AMALFI_COAST_AREAS.map((area, index) => ({
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
    <div className="adt-scope bg-white">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      {/* Hero Section */}
      <section className="border-b border-line">
        <div className="mx-auto max-w-[1440px] px-6 pt-6 sm:px-14">
          <nav aria-label="Breadcrumb" className="text-sm text-faint">
            <Link href="/amalfi-day-trip" className="hover:text-accent">
              Home
            </Link>
            <span className="mx-2">/</span>
            <span className="text-ink-muted">Towns & Areas</span>
          </nav>
        </div>
        <div className="mx-auto max-w-[1440px] px-6 py-14 text-center sm:px-14 sm:py-16">
          <h1 className="font-display text-3xl font-semibold text-ink sm:text-4xl">
            Explore the Amalfi Coast
          </h1>
          <p className="mt-4 text-ink-muted">Guide to towns and areas along Italy&apos;s most stunning coastline</p>
        </div>
      </section>

      {/* Areas Grid */}
      <section className="py-14">
        <div className="mx-auto max-w-[1000px] px-6 sm:px-14">
          <div className="space-y-3">
            {AMALFI_COAST_AREAS.map((area) => (
              <div key={area.slug} className="rounded-card border border-line bg-white p-6 transition-all hover:border-accent hover:shadow-card">
                <h2 className="font-display text-xl font-semibold text-ink">{area.name}</h2>
                <p className="mt-2 text-sm text-ink-muted">{area.description}</p>
                <button className="mt-4 text-sm font-bold text-accent hover:underline">Learn more →</button>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
