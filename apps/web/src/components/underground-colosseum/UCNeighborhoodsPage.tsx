import Link from &apos;@/components/NetworkLink&apos;;

const COLOSSEUM_AREAS = [
  {
    slug: &apos;arena-floor&apos;,
    name: &apos;The Arena Floor&apos;,
    description: &apos;The sand-covered floor where gladiators fought — now partially reconstructed for tours with underground access&apos;,
  },
  {
    slug: &apos;hypogeum&apos;,
    name: &apos;The Hypogeum (Underground)&apos;,
    description: &apos;Multi-level tunnel system beneath the arena with elevators, animal cages, and trap doors for gladiators and beasts&apos;,
  },
  {
    slug: &apos;upper-tiers&apos;,
    name: &apos;Upper Tiers & Seating&apos;,
    description: &apos;Steep stone seating with different sections for various social classes — the best views and crowded routes on standard tours&apos;,
  },
  {
    slug: &apos;external-arches&apos;,
    name: &apos;External Arches & Entrances&apos;,
    description: &apos;The 80 numbered entrance arches — where 50,000 spectators could flow in and out in minutes&apos;,
  },
  {
    slug: &apos;vaulted-passages&apos;,
    name: &apos;Vaulted Passages & Corridors&apos;,
    description: &apos;Underground corridors connecting entrances to seating areas — cooler than the arena floor, part of most tours&apos;,
  },
  {
    slug: &apos;travertine-wall&apos;,
    name: &apos;Travertine Outer Wall&apos;,
    description: &apos;The iconic 4-story facade of white travertine — the structure that survived the ages and draws millions of visitors&apos;,
  },
  {
    slug: &apos;interior-reconstruction&apos;,
    name: &apos;Interior Reconstruction Areas&apos;,
    description: &apos;Medieval and Renaissance-era modifications — walls, rooms, and structures built inside the ancient amphitheater over centuries&apos;,
  },
  {
    slug: &apos;stone-seating-sections&apos;,
    name: &apos;Stone Seating Sections & Cavea&apos;,
    description: &apos;The tiered seating structure — 80 rows with different sections (maenianum) for senators, knights, and common citizens&apos;,
  },
  {
    slug: &apos;spectator-entry-points&apos;,
    name: &apos;Spectator Entry Points&apos;,
    description: &apos;Routes from the ground-level arches up to seating — steep staircases and ramps that challenge visitors with mobility issues&apos;,
  },
  {
    slug: &apos;gladiator-barracks-area&apos;,
    name: &apos;Gladiator Barracks & Holding&apos;,
    description: &apos;Underground areas where gladiators waited before combat — part of the historical narrative on every tour&apos;,
  },
];

export function UCNeighborhoodsPage() {
  const jsonLd = {
    &apos;@context&apos;: &apos;https://schema.org&apos;,
    &apos;@type&apos;: &apos;CollectionPage&apos;,
    name: &apos;Colosseum Areas & Zones&apos;,
    description: &apos;Guide to different areas and zones within the Colosseum&apos;,
    url: &apos;https://undergroundcolosseum.com/neighborhoods&apos;,
    mainEntity: {
      &apos;@type&apos;: &apos;ItemList&apos;,
      itemListElement: COLOSSEUM_AREAS.map((area, index) => ({
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
