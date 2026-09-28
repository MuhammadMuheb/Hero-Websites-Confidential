import Link from '@/components/NetworkLink';
import { Hero } from '@/components/Hero';
import { SafeImage } from '@/components/SafeImage';

export interface HubTour {
  partner: string;
  slug: string;
  title: string;
  meta: string;
  priceFrom: number;
  badge: string | null;
  image: { src: string; alt: string };
}

export interface HubGuide {
  href: string;
  title: string;
  description: string;
  image?: { src: string; alt: string };
  kind: 'compare' | 'plan';
}

function GuideCard({ guide }: { guide: HubGuide }) {
  return (
    <Link
      href={guide.href}
      className="group flex flex-col overflow-hidden rounded-card border border-line bg-cream shadow-md transition-all duration-200 ease-out hover:shadow-lg focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand"
      data-reveal
    >
      {guide.image ? (
        <div className="relative aspect-[16/10] overflow-hidden bg-cream-deep">
          <SafeImage
            src={guide.image.src}
            alt={guide.image.alt}
            fill
            sizes="(min-width: 1024px) 400px, (min-width: 640px) 45vw, 92vw"
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
        </div>
      ) : null}
      <div className="flex flex-1 flex-col p-6">
        <span className="text-xs font-bold uppercase tracking-[0.12em] text-brand">
          {guide.kind === 'compare' ? 'Compare & book' : 'Plan your visit'}
        </span>
        <h3 className="mt-2 font-display text-xl font-semibold leading-snug text-ink group-hover:text-brand">{guide.title}</h3>
        <p className="mt-2 flex-1 text-[15px] leading-relaxed text-ink/70">{guide.description}</p>
        <span className="mt-4 text-sm font-bold text-ink">
          Read the guide <span aria-hidden="true">&rarr;</span>
        </span>
      </div>
    </Link>
  );
}

function GuideGrid({ guides }: { guides: HubGuide[] }) {
  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {guides.map((g) => (
        <GuideCard key={g.href} guide={g} />
      ))}
    </div>
  );
}

/** /tours — every partner listing for the property, each one a tracked /go/ link. */
export function NetworkToursPage({
  siteName,
  title,
  subtitle,
  tours,
  guides,
}: {
  siteName: string;
  title: string;
  subtitle: string;
  tours: HubTour[];
  guides: HubGuide[];
}) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: `${siteName} — ${title}`,
    itemListElement: tours.map((tour, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      item: {
        '@type': 'TouristTrip',
        name: tour.title,
        description: tour.meta,
        image: tour.image.src,
        offers: { '@type': 'Offer', price: tour.priceFrom, priceCurrency: 'EUR' },
      },
    })),
  };
  const compareGuides = guides.filter((g) => g.kind === 'compare');

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <Hero imageUrl="https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=1600&q=80" title={title} subtitle={subtitle} accentWord="" />

      <section className="bg-cream py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {tours.map((tour, i) => (
              <a
                key={tour.slug}
                href={`/go/${tour.slug}`}
                rel="sponsored nofollow"
                className="group flex flex-col overflow-hidden rounded-card bg-white border border-line shadow-md hover:shadow-lg transition-all duration-200"
                data-reveal
                style={{ '--i': i } as React.CSSProperties}
              >
                <div className="relative aspect-[4/3] overflow-hidden bg-cream-deep">
                  <SafeImage
                    src={tour.image.src}
                    alt={tour.image.alt}
                    fill
                    sizes="(min-width: 1024px) 320px, (min-width: 640px) 45vw, 92vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  {tour.badge ? (
                    <span className="absolute left-3 top-3 rounded-full bg-brand px-3 py-1 text-xs font-bold text-cream">{tour.badge}</span>
                  ) : null}
                </div>
                <div className="flex flex-1 flex-col p-5">
                  <span className="text-xs font-semibold uppercase tracking-[0.1em] text-ink/60">{tour.partner}</span>
                  <h2 className="mt-1.5 font-display text-lg font-semibold leading-snug text-ink">{tour.title}</h2>
                  <p className="mt-1.5 text-sm text-ink/70">{tour.meta}</p>
                  <div className="mt-auto flex items-end justify-between pt-5">
                    <p className="text-sm text-ink/70">
                      from <span className="text-xl font-bold text-ink">&euro;{tour.priceFrom}</span>
                    </p>
                    <span className="inline-flex min-h-[44px] items-center rounded-control bg-brand px-4 text-sm font-bold text-cream hover:bg-brand/90 transition-colors">
                      Check availability
                    </span>
                  </div>
                </div>
              </a>
            ))}
          </div>
          <p className="mt-6 text-sm text-ink/60">
            Prices are indicative &ldquo;from&rdquo; prices set by each partner. We may earn a commission when you book &mdash;{' '}
            <Link href="/affiliate-disclosure" className="text-brand hover:underline">
              how that works
            </Link>
            .
          </p>
        </div>
      </section>

      {compareGuides.length ? (
        <section className="border-t border-line bg-white py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="font-display text-4xl font-bold text-ink">Not sure which to pick?</h2>
            <p className="mt-4 max-w-2xl text-ink/70">Our side-by-side comparisons break down route, group size and value for each option.</p>
            <div className="mt-12">
              <GuideGrid guides={compareGuides} />
            </div>
          </div>
        </section>
      ) : null}
    </>
  );
}

/** /blog — the property's own comparison and planning guides. */
export function NetworkGuidesPage({
  siteName,
  title,
  subtitle,
  guides,
}: {
  siteName: string;
  title: string;
  subtitle: string;
  guides: HubGuide[];
}) {
  const plan = guides.filter((g) => g.kind === 'plan');
  const compare = guides.filter((g) => g.kind === 'compare');
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: `${siteName} — ${title}`,
    hasPart: guides.map((g) => ({ '@type': 'Article', headline: g.title, description: g.description })),
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <Hero imageUrl="https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=1600&q=80" title={title} subtitle={subtitle} accentWord="" />
      {plan.length ? (
        <section className="bg-cream py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="font-display text-4xl font-bold text-ink">Planning guides</h2>
            <div className="mt-12">
              <GuideGrid guides={plan} />
            </div>
          </div>
        </section>
      ) : null}
      {compare.length ? (
        <section className="bg-white py-20 border-t border-line">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="font-display text-4xl font-bold text-ink">Tour comparisons</h2>
            <div className="mt-12">
              <GuideGrid guides={compare} />
            </div>
          </div>
        </section>
      ) : null}
    </>
  );
}

/** Pompeii area detail — the area summary plus the property's planning guides. */
export function NetworkAreaPage({
  area,
  guides,
}: {
  area: { name: string; description: string };
  guides: HubGuide[];
}) {
  return (
    <>
      <Hero imageUrl="https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=1600&q=80" title={`${area.name}, Pompeii`} subtitle={area.description} accentWord="" />
      <section className="bg-cream py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="font-display text-4xl font-bold text-ink">Plan your visit</h2>
          <div className="mt-12">
            <GuideGrid guides={guides} />
          </div>
        </div>
      </section>
    </>
  );
}
