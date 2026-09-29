import Link from '@/components/NetworkLink';

const COLOSSEUM_AREAS = [
  {
    slug: 'arena-floor',
    name: 'The Arena Floor',
    description: 'The sand-covered floor where gladiators fought — now partially reconstructed for tours with underground access',
  },
  {
    slug: 'hypogeum',
    name: 'The Hypogeum (Underground)',
    description: 'Multi-level tunnel system beneath the arena with elevators, animal cages, and trap doors for gladiators and beasts',
  },
  {
    slug: 'upper-tiers',
    name: 'Upper Tiers & Seating',
    description: 'Steep stone seating with different sections for various social classes — the best views and crowded routes on standard tours',
  },
  {
    slug: 'external-arches',
    name: 'External Arches & Entrances',
    description: 'The 80 numbered entrance arches — where 50,000 spectators could flow in and out in minutes',
  },
  {
    slug: 'vaulted-passages',
    name: 'Vaulted Passages & Corridors',
    description: 'Underground corridors connecting entrances to seating areas — cooler than the arena floor, part of most tours',
  },
  {
    slug: 'travertine-wall',
    name: 'Travertine Outer Wall',
    description: 'The iconic 4-story facade of white travertine — the structure that survived the ages and draws millions of visitors',
  },
  {
    slug: 'interior-reconstruction',
    name: 'Interior Reconstruction Areas',
    description: 'Medieval and Renaissance-era modifications — walls, rooms, and structures built inside the ancient amphitheater over centuries',
  },
  {
    slug: 'stone-seating-sections',
    name: 'Stone Seating Sections & Cavea',
    description: 'The tiered seating structure — 80 rows with different sections (maenianum) for senators, knights, and common citizens',
  },
  {
    slug: 'spectator-entry-points',
    name: 'Spectator Entry Points',
    description: 'Routes from the ground-level arches up to seating — steep staircases and ramps that challenge visitors with mobility issues',
  },
  {
    slug: 'gladiator-barracks-area',
    name: 'Gladiator Barracks & Holding',
    description: 'Underground areas where gladiators waited before combat — part of the historical narrative on every tour',
  },
];

export function UCNeighborhoodsPage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: 'Colosseum Areas & Zones',
    description: 'Guide to different areas and zones within the Colosseum',
    url: 'https://undergroundcolosseum.com/neighborhoods',
    mainEntity: {
      '@type': 'ItemList',
      itemListElement: COLOSSEUM_AREAS.map((area, index) => ({
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
    <div className="uc-scope bg-white">
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
            Explore the Colosseum by Area
          </h1>
          <p className="mt-4 text-ink-muted">Guide to different zones and sections within the ancient amphitheater</p>
        </div>
      </section>

      {/* Areas Grid */}
      <section className="py-14">
        <div className="mx-auto max-w-[1000px] px-6 sm:px-14">
          <div className="space-y-3">
            {COLOSSEUM_AREAS.map((area) => (
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
