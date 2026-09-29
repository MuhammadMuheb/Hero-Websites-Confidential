import Link from '@/components/NetworkLink';

const AMALFI_COAST_AREAS = [
  {
    slug: 'amalfi-town',
    name: 'Amalfi Town',
    description: 'The heart of the coast — charming piazzas, cathedral, and harbor views perfect for wandering',
  },
  {
    slug: 'positano',
    name: 'Positano',
    description: 'Cliffside village with pastel-colored houses cascading to the beach — the most picturesque stop on the coast',
  },
  {
    slug: 'ravello',
    name: 'Ravello',
    description: 'Hilltop town with stunning views, terrace gardens, and peaceful atmosphere away from coastal crowds',
  },
  {
    slug: 'salerno',
    name: 'Salerno',
    description: 'Gateway city with Roman history, vibrant waterfront, and authentic local food culture',
  },
  {
    slug: 'atrani',
    name: 'Atrani',
    description: 'Tiny, village with medieval charm — the smallest municipality on the coast with timeless character',
  },
  {
    slug: 'praiano',
    name: 'Praiano',
    description: 'Fishing village on vertical cliffs with secluded beaches and authentic local restaurants',
  },
  {
    slug: 'furore',
    name: 'Furore',
    description: 'Hidden gem village known for its fjord, secret beach cove, and dramatic mountain backdrop',
  },
  {
    slug: 'minori',
    name: 'Minori',
    description: 'Quiet beach town with Roman villa ruins and lemon grove history along a wide sandy shore',
  },
  {
    slug: 'maiori',
    name: 'Maiori',
    description: 'Larger beach resort with more amenities, local wine production, and family-friendly atmosphere',
  },
  {
    slug: 'sorrento',
    name: 'Sorrento',
    description: 'Seaside town perched on cliffs with lemon terraces, easy Bay of Naples access, and local markets',
  },
];

export function ADTNeighborhoodsPage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: 'Amalfi Coast Towns & Areas',
    description: 'Guide to different towns and areas along the Amalfi Coast',
    url: 'https://amalficoastdaytrip.com/neighborhoods',
    mainEntity: {
      '@type': 'ItemList',
      itemListElement: AMALFI_COAST_AREAS.map((area, index) => ({
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
