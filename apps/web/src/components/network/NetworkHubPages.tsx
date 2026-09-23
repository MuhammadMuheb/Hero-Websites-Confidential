import Link from '@/components/NetworkLink';
import { InnerHero } from '@/components/InnerHero';
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
      className="group flex flex-col overflow-hidden rounded-card border border-line bg-white shadow-card-soft transition-all duration-200 ease-out hover:-translate-y-0.5 hover:border-accent/40 hover:shadow-card-hover focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
    >
      {guide.image ? (
        <div className="relative aspect-[16/10] overflow-hidden bg-media">
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
        <span className="text-xs font-bold uppercase tracking-[0.12em] text-accent">
          {guide.kind === 'compare' ? 'Compare & book' : 'Plan your visit'}
        </span>
        <h3 className="mt-2 font-display text-xl font-semibold leading-snug text-ink group-hover:text-accent">{guide.title}</h3>
        <p className="mt-2 flex-1 text-[15px] leading-relaxed text-ink-muted">{guide.description}</p>
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
  scope,
  siteName,
  title,
  subtitle,
  tours,
  guides,
}: {
  scope: string;
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
    <div className={`${scope} bg-white`}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <InnerHero eyebrow={siteName} title={title} subtitle={subtitle} breadcrumb={{ label: 'Home', href: '/' }} />

      <section className="py-14 sm:py-16">
        <div className="mx-auto max-w-[1440px] px-6 sm:px-14">
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {tours.map((tour) => (
              <a
                key={tour.slug}
                href={`/go/${tour.slug}`}
                rel="sponsored nofollow"
                className="group flex flex-col overflow-hidden rounded-card border border-line bg-white shadow-card-soft transition-all duration-200 ease-out hover:-translate-y-0.5 hover:shadow-card-hover focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
              >
                <div className="relative aspect-[4/3] overflow-hidden bg-media">
                  <SafeImage
                    src={tour.image.src}
                    alt={tour.image.alt}
                    fill
                    sizes="(min-width: 1024px) 320px, (min-width: 640px) 45vw, 92vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  {tour.badge ? (
                    <span className="absolute left-3 top-3 rounded-full bg-accent px-3 py-1 text-xs font-bold text-white">{tour.badge}</span>
                  ) : null}
                </div>
                <div className="flex flex-1 flex-col p-5">
                  <span className="text-xs font-semibold uppercase tracking-[0.1em] text-faint">{tour.partner}</span>
                  <h2 className="mt-1.5 font-display text-lg font-semibold leading-snug text-ink">{tour.title}</h2>
                  <p className="mt-1.5 text-sm text-ink-muted">{tour.meta}</p>
                  <div className="mt-auto flex items-end justify-between pt-5">
                    <p className="text-sm text-ink-muted">
                      from <span className="text-xl font-bold text-ink">&euro;{tour.priceFrom}</span>
                    </p>
                    <span className="inline-flex min-h-[44px] items-center rounded-control bg-accent px-4 text-sm font-bold text-white transition-colors group-hover:bg-accent-hover">
                      Check availability
                    </span>
                  </div>
                </div>
              </a>
            ))}
          </div>
          <p className="mt-6 text-sm text-faint">
            Prices are indicative &ldquo;from&rdquo; prices set by each partner. We may earn a commission when you book &mdash;{' '}
            <Link href="/affiliate-disclosure" className="underline underline-offset-2 hover:text-accent">
              how that works
            </Link>
            .
          </p>
        </div>
      </section>

      {compareGuides.length ? (
        <section className="border-t border-line bg-paper-tint py-14 sm:py-16">
          <div className="mx-auto max-w-[1440px] px-6 sm:px-14">
            <h2 className="font-display text-2xl font-semibold text-ink sm:text-3xl">Not sure which to pick?</h2>
            <p className="mt-2 max-w-2xl text-ink-muted">Our side-by-side comparisons break down route, group size and value for each option.</p>
            <div className="mt-8">
              <GuideGrid guides={compareGuides} />
            </div>
          </div>
        </section>
      ) : null}
    </div>
  );
}

/** /blog — the property's own comparison and planning guides. */
export function NetworkGuidesPage({
  scope,
  siteName,
  title,
  subtitle,
  guides,
}: {
  scope: string;
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
    <div className={`${scope} bg-white`}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <InnerHero eyebrow={siteName} title={title} subtitle={subtitle} breadcrumb={{ label: 'Home', href: '/' }} />
      {plan.length ? (
        <section className="py-14 sm:py-16">
          <div className="mx-auto max-w-[1440px] px-6 sm:px-14">
            <h2 className="font-display text-2xl font-semibold text-ink sm:text-3xl">Planning guides</h2>
            <div className="mt-8">
              <GuideGrid guides={plan} />
            </div>
          </div>
        </section>
      ) : null}
      {compare.length ? (
        <section className="border-t border-line bg-paper-tint py-14 sm:py-16">
          <div className="mx-auto max-w-[1440px] px-6 sm:px-14">
            <h2 className="font-display text-2xl font-semibold text-ink sm:text-3xl">Tour comparisons</h2>
            <div className="mt-8">
              <GuideGrid guides={compare} />
            </div>
          </div>
        </section>
      ) : null}
    </div>
  );
}

/** Pompeii area detail — the area summary plus the property's planning guides. */
export function NetworkAreaPage({
  scope,
  area,
  guides,
}: {
  scope: string;
  area: { name: string; description: string };
  guides: HubGuide[];
}) {
  return (
    <div className={`${scope} bg-white`}>
      <InnerHero
        eyebrow="Pompeii site guide"
        title={`${area.name}, Pompeii`}
        subtitle={area.description}
        breadcrumb={{ label: 'All areas', href: '/neighborhoods' }}
      />
      <section className="py-14 sm:py-16">
        <div className="mx-auto max-w-[1440px] px-6 sm:px-14">
          <h2 className="font-display text-2xl font-semibold text-ink sm:text-3xl">Plan your visit</h2>
          <div className="mt-8">
            <GuideGrid guides={guides} />
          </div>
        </div>
      </section>
    </div>
  );
}
