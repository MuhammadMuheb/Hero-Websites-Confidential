import Link from 'next/link';
import { TourCard } from '@/components/cards/TourCard';
import type { TourDoc } from '@/lib/firestore';
import type { SiteConfig } from '@/lib/sites/config';

/** Splits "Rome Street Food Tours" around the gold word so it can be highlighted. */
function splitTitle(title: string, gold: string): [string, string, string] {
  const i = gold ? title.indexOf(gold) : -1;
  return i < 0 ? [title, '', ''] : [title.slice(0, i), gold, title.slice(i + gold.length)];
}

/** Home page of the generic site template, built from the project's published Home content. */
export function TenantHome({ config, tours }: { config: SiteConfig; tours: TourDoc[] }) {
  const [before, gold, after] = splitTitle(config.heroTitle, config.heroGoldWord);
  const featured = tours.slice(0, 9);

  return (
    <>
      <section className="relative isolate overflow-hidden bg-ink">
        {/* eslint-disable-next-line @next/next/no-img-element -- the hero image is an arbitrary https image chosen in the admin */}
        <img src={config.heroImage.src} alt={config.heroImage.alt} className="absolute inset-0 -z-10 h-full w-full object-cover opacity-70" />
        <div className="absolute inset-0 -z-10 bg-gradient-to-t from-ink/80 via-ink/30 to-transparent" />
        <div className="mx-auto max-w-5xl px-4 py-24 text-center sm:px-6 sm:py-32">
          {config.heroEyebrow && <p className="text-xs font-bold uppercase tracking-[0.24em] text-gold">{config.heroEyebrow}</p>}
          <h1 className="mt-4 font-hero text-4xl font-black leading-tight tracking-[-0.02em] text-cream sm:text-6xl">
            {before}
            {gold && <span className="text-gold">{gold}</span>}
            {after}
          </h1>
          <p className="mx-auto mt-5 max-w-2xl text-lg text-cream/85">{config.heroSubtitle}</p>
          <Link href="/tours" className="mt-8 inline-flex rounded-full bg-brand px-7 py-3 text-base font-bold text-white shadow-glow transition-colors hover:bg-brand-dark">
            See all tours
          </Link>
        </div>
      </section>

      {config.chips && config.chips.length > 0 && (
        <section className="border-b border-line bg-paper">
          <ul className="mx-auto flex max-w-7xl flex-wrap justify-center gap-2 px-4 py-5 sm:px-6">
            {config.chips.slice(0, 12).map((chip) => (
              <li key={chip} className="rounded-full border border-line bg-cream px-3 py-1 text-sm font-medium text-ink">
                {chip}
              </li>
            ))}
          </ul>
        </section>
      )}

      {featured.length > 0 && (
        <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <div className="flex flex-wrap items-end justify-between gap-3">
            <h2 className="font-hero text-3xl font-black tracking-[-0.02em] text-ink sm:text-4xl">{config.sliderTitle || 'Our tours'}</h2>
            <Link href="/tours" className="text-sm font-bold text-brand hover:underline">
              All tours &rarr;
            </Link>
          </div>
          <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {featured.map((tour) => (
              <TourCard key={tour.slug} tour={tour} href={`/tours/${tour.slug}`} />
            ))}
          </div>
        </section>
      )}

      {config.categories && config.categories.length > 0 && (
        <section className="bg-cream-deep py-16">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <h2 className="font-hero text-3xl font-black tracking-[-0.02em] text-ink sm:text-4xl">{config.categoryTitle || 'Browse by category'}</h2>
            <ul className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {config.categories.map((category) => (
                <li key={category.slug}>
                  <Link href={`/tours/category/${category.slug}`} className="group block overflow-hidden rounded-[18px] border border-line bg-paper shadow-card-soft transition hover:-translate-y-0.5 hover:shadow-card-hover">
                    {/* eslint-disable-next-line @next/next/no-img-element -- arbitrary https image chosen in the admin */}
                    <img src={category.imageUrl} alt="" className="h-40 w-full object-cover" loading="lazy" />
                    <div className="p-5">
                      <h3 className="font-hero text-lg font-extrabold text-ink group-hover:text-brand">{category.name}</h3>
                      <p className="mt-1 text-sm text-ink-muted">{category.description}</p>
                    </div>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}

      {config.howWeChoose && config.howWeChoose.length > 0 && (
        <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <h2 className="font-hero text-3xl font-black tracking-[-0.02em] text-ink sm:text-4xl">{config.howWeChooseTitle || 'How we choose'}</h2>
          <ul className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {config.howWeChoose.map((item) => (
              <li key={item.title} className="rounded-[18px] border border-line bg-paper p-6">
                <h3 className="font-hero text-lg font-extrabold text-ink">{item.title}</h3>
                <p className="mt-2 text-sm text-ink-muted">{item.description}</p>
              </li>
            ))}
          </ul>
        </section>
      )}
    </>
  );
}
