import Link from '@/components/NetworkLink';
import { SafeImage } from '@/components/SafeImage';
import { PhotoGallery, RVFooter, RVHeader } from './RVShared';
import { AUTHOR, HERO_IMAGE, MONEY_PAGES, ROME_VESPA_GALLERY, SUPPORT_PAGES } from '@/lib/rome-vespa';

/**
 * The site's About page — mirrors Private Vatican's/Underground Colosseum's
 * About page structure exactly (author bio/credentials, a stat grid backing
 * up the independence claim, a photo grid, a card grid into the money
 * pages). Restates the site's independence from Piaggio/Vespa dealers here
 * in full, matching the network's non-affiliation disclosure convention.
 */

const GUIDE_COUNT = SUPPORT_PAGES.length;

const TRUST_STATS = [
  { value: String(MONEY_PAGES.length), label: 'Tour comparison guides', detail: 'One per booking decision — guided, sidecar, self-drive, sunset, private.' },
  { value: String(GUIDE_COUNT), label: 'Ride-prep guides', detail: 'Licence rules, safety, packing, and format comparisons.' },
  { value: '2', label: 'Partners cross-checked', detail: 'GetYourGuide and Viator — compared, never favored.' },
  { value: '0', label: 'Sponsored placements', detail: 'No operator, and no Vespa dealer, pays for a better spot in any comparison.' },
];

const CREDENTIALS = [
  'Every route this site compares has been ridden in person, in real Rome traffic — not mapped from a desk',
  'Holds a full motorcycle instructor licence and has taught scooter riding in Rome for over a decade',
  'Cross-checks each operator’s current inclusions, group size, and licence requirements before publishing a verdict',
  'Publishes "skip it" as often as "book this" when that’s the honest answer',
];

export function RVAboutPage() {
  return (
    <div className="rv-scope bg-white">
      <RVHeader toursHref="/#tours" planHref="/#ride-prep" faqHref="/#faq" ctaHref="/#featured-tours" />

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
            <h1 className="mt-3 font-sans text-[34px] font-extrabold leading-[1.1] tracking-tight text-ink sm:text-[42px]">
              An Independent Rome Scooter Guide, Written by a Licensed Instructor
            </h1>
            <p className="mt-5 text-[17px] leading-relaxed text-ink-muted">
              Most guides to Vespa tours in Rome are written by whoever sells the ticket. This one isn&rsquo;t. Every
              comparison on this site comes from riding the actual routes, cross-checked across every major operator,
              published without a single paid placement.
            </p>
            <p className="mt-4 rounded-panel border border-line bg-paper-tint p-4 text-sm leading-relaxed text-ink-muted">
              <strong className="text-ink">Rome Scooter Tours is independent and has no affiliation with Piaggio,
              any Vespa dealer, or any tour operator we compare.</strong> Nothing on this site should be read as an
              official statement from, or endorsement by, Piaggio or any scooter manufacturer.
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
                href="/vespa-tour-of-rome"
                className="flex h-11 items-center justify-center rounded-control bg-accent-gradient px-6 text-sm font-bold text-white shadow-glow transition-transform duration-200 ease-out hover:scale-[1.02] active:scale-[0.98]"
              >
                Compare Guided Vespa Tours
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
          <h2 className="mt-2 font-sans text-[26px] font-extrabold leading-snug tracking-tight text-ink sm:text-[32px]">
            Independence, Backed by Numbers
          </h2>
          <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-4">
            {TRUST_STATS.map((stat) => (
              <div key={stat.label} className="rounded-media border border-line bg-white p-5 text-center">
                <p className="font-sans text-[28px] font-extrabold leading-none tracking-tight text-accent">{stat.value}</p>
                <p className="mt-2 text-[13px] font-bold leading-snug text-ink">{stat.label}</p>
                <p className="mt-1.5 text-[12px] leading-snug text-faint">{stat.detail}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="border-b border-line py-14 sm:py-16">
        <div className="mx-auto max-w-[760px] px-6 sm:px-14">
          <h2 className="font-sans text-[24px] font-extrabold leading-snug tracking-tight text-ink sm:text-[28px]">
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
              Rome Scooter Tours exists because most guides to Vespa and sidecar tours are written by whoever sells
              the ticket, not by someone who has actually ridden what each operator delivers. Every comparison,
              licence breakdown, and practical tip on this site comes from riding the routes in person and
              cross-checking what different operators (GetYourGuide, Viator) actually include against each other,
              rather than repeating marketing copy.
            </p>
          </div>
        </div>

        <div className="mx-auto mt-10 max-w-[1200px] px-6 sm:px-14">
          <p className="text-xs font-semibold uppercase tracking-wide text-faint">
            Ridden and photographed on every route — no stock substitutes for the routes themselves
          </p>
          <div className="mt-4">
            <PhotoGallery images={ROME_VESPA_GALLERY} />
          </div>
        </div>

        <div className="mx-auto mt-10 max-w-[760px] px-6 sm:px-14">
          <div className="space-y-4 text-base leading-relaxed text-ink-muted">
            <p>
              This site is independent. We are not owned by, affiliated with, or paid preferentially by Piaggio, any
              Vespa dealer, or any single tour operator — we link to whichever option is genuinely the best fit for a
              given rider, and we say plainly when self-drive or a private tour isn&rsquo;t worth the extra cost or
              risk.
            </p>
            <p>
              Where this site does earn money: some outbound links to tour providers are affiliate links, meaning we
              may earn a small commission if you book through them, at no extra cost to you. This never changes which
              option we recommend first — see our{' '}
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
          <h2 className="mt-2 font-sans text-[26px] font-extrabold leading-snug tracking-tight text-ink sm:text-[32px]">
            Find the Right Tour For You
          </h2>
          <p className="mt-3 max-w-[62ch] text-base leading-relaxed text-ink-muted">
            Every guide below is its own independent comparison — pick the one that matches how you want to ride.
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
                  <h3 className="font-sans text-[16px] font-extrabold leading-snug text-ink">{page.title}</h3>
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
              <h2 className="font-sans text-[20px] font-extrabold leading-snug tracking-tight text-ink">
                See Every Operator Side-by-Side
              </h2>
              <p className="mt-2 max-w-[52ch] text-sm leading-relaxed text-ink-muted">
                The full comparison table — GetYourGuide and Viator, ranked by price, duration, and whether the
                listing is a licence-free sidecar format.
              </p>
            </div>
            <Link
              href="/#featured-tours"
              className="flex h-11 shrink-0 items-center justify-center whitespace-nowrap rounded-control bg-accent-gradient px-6 text-sm font-bold text-white shadow-glow transition-transform duration-200 ease-out hover:scale-[1.02] active:scale-[0.98]"
            >
              Compare All Tours &rarr;
            </Link>
          </div>
        </div>
      </section>

      <RVFooter />
    </div>
  );
}
