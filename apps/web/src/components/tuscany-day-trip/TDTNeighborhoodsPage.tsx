import Link from &apos;@/components/NetworkLink&apos;;

const TUSCANY_TOWNS = [
  {
    slug: &apos;florence&apos;,
    name: &apos;Florence&apos;,
    description: &apos;Renaissance capital with art museums, cathedrals, and bridge crossings over the Arno&apos;,
  },
  {
    slug: &apos;siena&apos;,
    name: &apos;Siena&apos;,
    description: &apos;Medieval hill town famous for its Palio horse race and stunning piazza&apos;,
  },
  {
    slug: &apos;chianti&apos;,
    name: &apos;Chianti&apos;,
    description: &apos;Wine region with rolling vineyards, family wineries, and wine production tours&apos;,
  },
  {
    slug: &apos;montepulciano&apos;,
    name: &apos;Montepulciano&apos;,
    description: &apos;Renaissance town on a hilltop with wine estates and panoramic countryside views&apos;,
  },
  {
    slug: &apos;pienza&apos;,
    name: &apos;Pienza&apos;,
    description: &apos;Ideal Renaissance town with perfectly planned streets and Tuscan countryside&apos;,
  },
  {
    slug: &apos;san-gimignano&apos;,
    name: &apos;San Gimignano&apos;,
    description: &apos;Medieval hill town famous for its tower houses and historic streets&apos;,
  },
  {
    slug: &apos;cortona&apos;,
    name: &apos;Cortona&apos;,
    description: &apos;Ancient Etruscan hilltop town with Renaissance art and sweeping valley views&apos;,
  },
];

export function TDTNeighborhoodsPage() {
  const jsonLd = {
    &apos;@context&apos;: &apos;https://schema.org&apos;,
    &apos;@type&apos;: &apos;CollectionPage&apos;,
    name: &apos;Tuscany Day Trip Towns&apos;,
    description: &apos;Guide to towns and areas for Tuscany day trips from Florence&apos;,
    url: &apos;https://tuscany-day-trip.com/neighborhoods&apos;,
    mainEntity: {
      &apos;@type&apos;: &apos;ItemList&apos;,
      itemListElement: TUSCANY_TOWNS.map((town, index) => ({
        &apos;@type&apos;: &apos;ListItem&apos;,
        position: index + 1,
        item: {
          &apos;@type&apos;: &apos;Place&apos;,
          name: town.name,
          description: town.description,
        },
      })),
    },
  };

  return (
    <div className="tdt-scope bg-white">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      {/* Hero Section */}
      <section className="border-b border-line">
        <div className="mx-auto max-w-[1440px] px-6 pt-6 sm:px-14">
          <nav aria-label="Breadcrumb" className="text-sm text-faint">
            <Link href="/tuscany-day-trip" className="hover:text-accent">
              Home
            </Link>
            <span className="mx-2">/</span>
            <span className="text-ink-muted">Towns</span>
          </nav>
        </div>
        <div className="mx-auto max-w-[1440px] px-6 py-14 text-center sm:px-14 sm:py-16">
          <h1 className="font-display text-3xl font-semibold text-ink sm:text-4xl">
            Explore Tuscany
          </h1>
          <p className="mt-4 text-ink-muted">Guide to towns and countryside for Tuscany day trips</p>
        </div>
      </section>

      {/* Towns Grid */}
      <section className="py-14">
        <div className="mx-auto max-w-[1000px] px-6 sm:px-14">
          <div className="space-y-3">
            {TUSCANY_TOWNS.map((town) => (
              <div key={town.slug} className="rounded-card border border-line bg-white p-6 transition-all hover:border-accent hover:shadow-card">
                <h2 className="font-display text-xl font-semibold text-ink">{town.name}</h2>
                <p className="mt-2 text-sm text-ink-muted">{town.description}</p>
                <button className="mt-4 text-sm font-bold text-accent hover:underline">Learn more →</button>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
