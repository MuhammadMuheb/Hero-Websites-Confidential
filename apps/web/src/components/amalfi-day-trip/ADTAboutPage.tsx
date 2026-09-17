import Link from '@/components/NetworkLink';
import { SafeImage } from '@/components/SafeImage';
import { PhotoGallery, ADTFooter } from './ADTShared';
import { AUTHOR, HERO_IMAGE, MONEY_PAGES, SUPPORT_PAGES, Amalfi_DAY_TRIP_GALLERY } from '@/lib/amalfi-day-trip';

/**
 * The site's About page — mirrors Tiramisù Class's TCAboutPage.tsx structure
 * exactly (author bio/credentials, a stat grid backing up the independence
 * claim, a photo grid, a card grid into the money pages). Restates the
 * site's independence from any single winery or tour operator here in full,
 * matching the network's non-affiliation disclosure convention.
 */

const GUIDE_COUNT = SUPPORT_PAGES.length;

const TRUST_STATS = [
  { value: String(MONEY_PAGES.length), label: 'Day trip comparison guides', detail: 'One per booking decision — Florence flagship, wine, the classic trio, and the full hub roundup.' },
  { value: String(GUIDE_COUNT), label: 'Before-you-book guides', detail: 'Trip picking, wine logistics, driving vs. touring, seasonality, and inclusions.' },
  { value: '3', label: 'Partners cross-checked', detail: 'GetYourGuide, Viator, and Civitatis — compared, never favored.' },
  { value: '0', label: 'Sponsored placements', detail: 'No operator or winery pays for a better spot in any comparison.' },
];

const CREDENTIALS = [
  'Every route on this site has been driven and walked in person — hill-town routing, winery pacing, and drive times checked directly, not from marketing copy',
  'Licensed as a regional tourist guide based in Florence, with hands-on experience routing Chianti, Siena, and San Gimignano day trips across every season',
  "Cross-checks each operator's actual itinerary (town order, winery count, wine-tasting inclusion) against what's advertised before publishing a verdict",
  '"Skip this one" gets published as often as "book this one" when that\'s the honest answer',
];

export function ADTAboutPage() {
  return (
    <div className="ADT-scope bg-white">

      <section className="border-b border-line">
        <div className="mx-auto max-w-[1200px] px-6 pt-6 sm:px-14">
          <nav aria-label="Breadcrumb" className="text-sm text-faint">
            <Link href="/" className="hover:text-accent">Home</Link>
            <span className="mx-2">/</span>
            <span className="text-ink-muted">About</span>
          </nav>
        </div>
        <div className="mx-auto grid max-w-[1200px] grid-cols-1 items-center gap-10 px-6 py-10 sm:px-14 sm:py-14 lg:grid-cols-2 lg:gap-14">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-accent">About this site</p>
            <h1 className="mt-3 font-display text-[30px] font-bold leading-[1.15] tracking-tight text-ink sm:text-[38px]">
              An Independent Amalfi Day-Trip Guide, Written by a Licensed Regional Guide
            </h1>
            <p className="mt-5 text-[17px] leading-relaxed text-ink-muted">
              Most guides to Amalfi Day Trips are written by whoever sells the ticket. This one isn&rsquo;t. Every
              comparison on this site starts from the same question &mdash; does this itinerary actually route the
              day well, and is the wine-tasting question answered honestly &mdash; cross-checked across every major
              operator, published without a single paid placement.
            </p>
            <p className="mt-4 rounded-panel border border-line bg-paper-tint p-4 text-sm leading-relaxed text-ink-muted">
              <strong className="text-ink">Amalfi Day Trip is independent and has no affiliation with any single
              winery, tour operator, GetYourGuide, Viator, or Civitatis.</strong> Nothing on this site should be read
              as an official statement from, or endorsement by, any operator we compare.
            </p>

            <div className="mt-8 flex items-center gap-5">
              <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-full bg-accent-gradient text-xl font-bold text-white shadow-card-soft">
                {AUTHOR.initials}
              </div>
              <div>
                <p className="text-[18px] font-bold text-ink">{AUTHOR.name}</p>
                <p className="text-sm font-medium text-faint">
                  {AUTHOR.title} &middot; {AUTHOR.domain}
                </p>
              </div>
            </div>

            <div className="mt-10 flex flex-wrap gap-3">
              <Link
                href="/Amalfi-from-florence"
                className="flex h-11 items-center justify-center rounded-control bg-accent-gradient px-6 text-sm font-bold text-white shadow-glow transition-transform duration-200 ease-out hover:scale-[1.02] active:scale-[0.98]"
              >
                Compare Amalfi Day Trips
              </Link>
              <Link
                href="/contact"
                className="flex h-11 items-center justify-center rounded-control border border-accent px-6 text-sm font-medium text-accent transition-colors hover:bg-accent-soft"
              >
                Get in Touch
              </Link>
            </div>
          </div>

          <div className="relative aspect-[4/3] overflow-hidden rounded-media bg-media">
            <SafeImage
              src={HERO_IMAGE.src}
              alt={HERO_IMAGE.alt}
              fill
              sizes="(min-width: 1024px) 560px, 90vw"
              className="object-cover"
            />
          </div>
        </div>
      </section>

      <section className="border-b border-line bg-paper-tint py-14 sm:py-16">
        <div className="mx-auto max-w-[1200px] px-6 sm:px-14">
          <p className="text-xs font-semibold uppercase tracking-[0.14em] text-accent">Why trust this guide</p>
          <h2 className="mt-2 font-display text-[24px] font-bold leading-snug tracking-tight text-ink sm:text-[30px]">
            Independence, Backed by Numbers
          </h2>
          <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-4">
            {TRUST_STATS.map((stat) => (
              <div key={stat.label} className="rounded-media border border-line bg-white p-5 text-center">
                <p className="font-display text-[26px] font-bold leading-none tracking-tight text-accent">{stat.value}</p>
                <p className="mt-2 text-[13px] font-bold leading-snug text-ink">{stat.label}</p>
                <p className="mt-1.5 text-[12px] leading-snug text-faint">{stat.detail}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="border-b border-line py-14 sm:py-16">
        <div className="mx-auto max-w-[760px] px-6 sm:px-14">
          <h2 className="font-display text-[22px] font-bold leading-snug tracking-tight text-ink sm:text-[26px]">
            What &ldquo;First-Hand&rdquo; Actually Means Here
          </h2>
          <ul className="mt-6 flex flex-col gap-3">
            {CREDENTIALS.map((item) => (
              <li key={item} className="flex items-start gap-3 text-base leading-relaxed text-ink-muted">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true" className="mt-0.5 shrink-0 text-success">
                  <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="1.6" />
                  <path d="m8 12.5 2.5 2.5L16 9.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                {item}
              </li>
            ))}
          </ul>

          <div className="mt-10 space-y-4 text-base leading-relaxed text-ink-muted">
            <p>
              Amalfi Day Trip exists because most guides to Amalfi Day Trips are written by whoever sells the
              ticket, not by someone who actually checks whether a given itinerary routes the day well or is mostly a
              rushed four-town marathon dressed up in golden-hour marketing photos. Every comparison, routing note,
              and practical tip on this site comes from checking what different operators (GetYourGuide, Viator,
              Civitatis) actually deliver against each other, rather than repeating marketing copy.
            </p>
          </div>
        </div>

        <div className="mx-auto mt-10 max-w-[1200px] px-6 sm:px-14">
          <p className="text-xs font-semibold uppercase tracking-wide text-faint">
            Checked town by town, winery by winery &mdash; no stock substitutes for the actual route
          </p>
          <div className="mt-4">
            <PhotoGallery images={Amalfi_DAY_TRIP_GALLERY} />
          </div>
        </div>

        <div className="mx-auto mt-10 max-w-[760px] px-6 sm:px-14">
          <div className="space-y-4 text-base leading-relaxed text-ink-muted">
            <p>
              This site is independent. We are not owned by, affiliated with, or paid preferentially by any single
              winery, tour operator, GetYourGuide, Viator, or Civitatis &mdash; we link to whichever trip is
              genuinely the best fit for a given visitor, and we say plainly when a listing&rsquo;s itinerary
              doesn&rsquo;t match what actually happens on the day.
            </p>
            <p>
              Where this site does earn money: some outbound links to trip providers are affiliate links, meaning we
              may earn a small commission if you book through them, at no extra cost to you. This never changes which
              option we recommend first &mdash; see our{' '}
              <Link href="/contact#disclosure" className="font-semibold text-accent hover:underline">
                affiliate disclosure
              </Link>{' '}
              for the full detail.
            </p>
          </div>
        </div>
      </section>

      <section id="start-here" className="scroll-mt-[65px] border-b border-line bg-paper-tint py-14 sm:py-16">
        <div className="mx-auto max-w-[1200px] px-6 sm:px-14">
          <p className="text-xs font-semibold uppercase tracking-[0.14em] text-accent">Start here</p>
          <h2 className="mt-2 font-display text-[24px] font-bold leading-snug tracking-tight text-ink sm:text-[30px]">
            Find the Right Day Trip For You
          </h2>
          <p className="mt-3 max-w-[62ch] text-base leading-relaxed text-ink-muted">
            Every guide below is its own independent comparison &mdash; pick the one that matches what you actually
            want from the day.
          </p>

          <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {MONEY_PAGES.map((page) => (
              <Link
                key={page.href}
                href={page.href}
                className="group flex flex-col overflow-hidden rounded-media border border-line bg-white transition-all duration-300 hover:-translate-y-1 hover:shadow-card-hover"
              >
                <div className="relative aspect-[4/3] bg-media">
                  <SafeImage
                    src={page.image.src}
                    alt={page.image.alt}
                    fill
                    sizes="(min-width: 1024px) 380px, (min-width: 640px) 45vw, 90vw"
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                  {page.badge ? (
                    <span className="absolute left-3 top-3 rounded-full bg-ink/80 px-2.5 py-1 text-[11px] font-bold uppercase tracking-wide text-white backdrop-blur-sm">
                      {page.badge}
                    </span>
                  ) : null}
                </div>
                <div className="flex flex-1 flex-col p-5">
                  <h3 className="font-display text-[15px] font-bold leading-snug text-ink">{page.title}</h3>
                  <p className="mt-1.5 flex-1 text-sm text-ink-muted">{page.blurb}</p>
                  <span className="mt-4 text-sm font-bold text-accent group-hover:underline">{page.cta} &rarr;</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="py-14 sm:py-16">
        <div className="mx-auto max-w-[1200px] px-6 sm:px-14">
          <div className="flex flex-col items-start gap-6 rounded-media border border-line bg-paper-tint p-6 sm:flex-row sm:items-center sm:justify-between sm:p-8">
            <div>
              <h2 className="font-display text-[18px] font-bold leading-snug tracking-tight text-ink">
                See Every Operator Side-by-Side
              </h2>
              <p className="mt-2 max-w-[52ch] text-sm leading-relaxed text-ink-muted">
                The full comparison table &mdash; GetYourGuide, Viator, and Civitatis, ranked by price, duration, and
                wine-tasting inclusion.
              </p>
            </div>
            <Link
              href="/#featured-tours"
              className="flex h-11 shrink-0 items-center justify-center whitespace-nowrap rounded-control bg-accent-gradient px-6 text-sm font-bold text-white shadow-glow transition-transform duration-200 ease-out hover:scale-[1.02] active:scale-[0.98]"
            >
              Compare All Day Trips &rarr;
            </Link>
          </div>
        </div>
      </section>

      <ADTFooter />
    </div>
  );
}

