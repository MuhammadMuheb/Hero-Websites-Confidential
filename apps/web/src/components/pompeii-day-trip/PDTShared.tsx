'use client';

import { useEffect, useRef, useState } from 'react';
import Link from '@/components/NetworkLink';
import { SafeImage } from '@/components/SafeImage';
import {
  AUTHOR,
  EXPLORE_LINKS,
  LEARN_LINKS,
  PLAN_NAV_ITEMS,
  TOURS_NAV_ITEMS,
  type FeaturedTour,
  type NavItem,
} from '@/lib/pompeii-day-trip';
import { NETWORK_SITES } from '@/lib/tours';

/**
 * The other 12 properties in the network, for cross-linking from this
 * hero's own nav/footer — per the network-wide "Our Network" cross-link
 * standard (every property, not just Underground Colosseum's original
 * exception — see PVShared.tsx/UCShared.tsx's identical SIBLING_SITES/
 * NETWORK_NAV_ITEMS pattern).
 */
const SIBLING_SITES = NETWORK_SITES.filter((site) => site.slug !== 'pompeii-day-trip');
const NETWORK_NAV_ITEMS: NavItem[] = SIBLING_SITES.map((site) => ({
  title: site.name,
  href: `/${site.slug}`,
  keyword: 'Italy Tours network',
}));

/**
 * Shared chrome for every Pompeii Day Trip page — home and all 14 money /
 * support / utility pages built off the property's blueprint (Master Network
 * Blueprint §3.2). Mirrors PVShared.tsx / UCShared.tsx structure exactly,
 * themed with Volcanic Ember (`--accent`, scoped via the `.pdt-scope` wrapper
 * each top-level page component applies — see globals.css) and Fraunces
 * display-serif headings (blueprint §3.2.2 — archaeological/editorial
 * gravitas suits a multi-origin trip-planning hub), matching the platform's
 * standard charcoal header/footer weight rather than Private Vatican's navy
 * exception (this property isn't the network's highest-sensitivity site).
 */

export function PDTBrandMark() {
  return (
    <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-[10px] bg-accent-gradient shadow-card-soft">
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path
          d="M12 3 4 20h16L12 3Z"
          stroke="white"
          strokeWidth="1.6"
          strokeLinejoin="round"
        />
        <path d="M12 9v4" stroke="white" strokeWidth="1.6" strokeLinecap="round" />
        <path d="M12 16.2h.01" stroke="white" strokeWidth="1.6" strokeLinecap="round" />
      </svg>
    </span>
  );
}

function NavDropdown({ label, items, footerHref, footerLabel }: { label: string; items: NavItem[]; footerHref?: string; footerLabel?: string }) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    }
    document.addEventListener('click', handleClick);
    return () => document.removeEventListener('click', handleClick);
  }, []);

  return (
    <div ref={ref} className="relative">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        className="flex items-center gap-1 text-sm font-medium text-ink-muted transition-colors hover:text-accent"
      >
        {label}
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" aria-hidden="true" className={`transition-transform ${open ? 'rotate-180' : ''}`}>
          <path d="m6 9 6 6 6-6" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>

      {open ? (
        <div className="absolute left-1/2 top-full z-50 mt-3 w-[340px] -translate-x-1/2 rounded-media border border-line bg-white p-2 shadow-dropdown">
          <div className="max-h-[60vh] overflow-y-auto">
            {items.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className="flex flex-col gap-0.5 rounded-xl px-3 py-2.5 transition-colors hover:bg-paper-tint"
              >
                <span className="text-sm font-semibold text-ink">{item.title}</span>
                <span className="text-xs text-faint">{item.keyword}</span>
              </Link>
            ))}
          </div>
          {footerHref && footerLabel ? (
            <Link
              href={footerHref}
              onClick={() => setOpen(false)}
              className="mt-1 flex items-center justify-between rounded-xl px-3 py-2.5 text-sm font-bold text-accent transition-colors hover:bg-accent-soft"
            >
              {footerLabel}
              <span aria-hidden="true">&rarr;</span>
            </Link>
          ) : null}
        </div>
      ) : null}
    </div>
  );
}

/**
 * `toursHref`/`planHref` let each page point the dropdown's "see all" link
 * and the FAQ link at the right target: the homepage's in-page anchors when
 * rendered there, or the homepage itself (with the anchor) when rendered on
 * any other page, since those sections only exist on the homepage.
 */
export function PDTHeader({ toursHref = '#tours', planHref = '#plan-your-trip', faqHref = '#faq', ctaHref = '#featured-tours' }: {
  toursHref?: string;
  planHref?: string;
  faqHref?: string;
  ctaHref?: string;
}) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [hidden, setHidden] = useState(false);
  const lastScrollY = useRef(0);

  useEffect(() => {
    lastScrollY.current = window.scrollY;

    function onScroll() {
      if (mobileOpen) return;
      const currentY = window.scrollY;
      const delta = currentY - lastScrollY.current;

      if (currentY < 80) {
        setHidden(false);
      } else if (delta > 4) {
        setHidden(true);
      } else if (delta < -4) {
        setHidden(false);
      }
      lastScrollY.current = currentY;
    }

    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [mobileOpen]);

  return (
    <header
      className={`sticky top-0 z-40 border-b border-line/80 bg-white/85 backdrop-blur-md ${
        hidden ? '-translate-y-full transition-transform duration-300 ease-out' : 'translate-y-0'
      }`}
    >
      <div className="mx-auto flex h-[72px] max-w-[1440px] items-center justify-between gap-4 px-6 sm:px-14">
        <Link href="/" className="flex min-w-0 shrink items-center gap-2.5">
          <PDTBrandMark />
          <span className="truncate font-display text-base font-bold leading-none tracking-tight text-ink sm:text-lg">
            Pompeii Day Trip
          </span>
        </Link>

        <nav aria-label="Primary" className="hidden min-w-0 items-center gap-8 lg:flex">
          <NavDropdown label="Tours" items={TOURS_NAV_ITEMS} footerHref={toursHref} footerLabel="Compare all 6 tours" />
          <NavDropdown label="Plan Your Trip" items={PLAN_NAV_ITEMS} footerHref={planHref} footerLabel="See all guides" />
          <a href={faqHref} className="text-sm font-medium text-ink-muted transition-colors hover:text-accent">
            FAQ
          </a>
          <NavDropdown label="Our Network" items={NETWORK_NAV_ITEMS} />
        </nav>

        <div className="flex shrink-0 items-center gap-3 sm:gap-4">
          <div className="hidden items-center gap-5 sm:flex">
            <Link href="/about" className="text-sm font-medium text-ink-muted transition-colors hover:text-accent">
              About
            </Link>
            <Link href="/contact" className="text-sm font-medium text-ink-muted transition-colors hover:text-accent">
              Contact
            </Link>
          </div>

          <span className="hidden h-6 w-px bg-line sm:block" aria-hidden="true" />

          <a
            href={ctaHref}
            className="flex h-10 shrink-0 items-center justify-center whitespace-nowrap rounded-control bg-accent-gradient px-4 text-sm font-bold text-white shadow-glow transition-transform duration-200 ease-out hover:scale-[1.02]"
          >
            Check Availability
          </a>

          <button
            type="button"
            aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={mobileOpen}
            onClick={() => setMobileOpen((v) => !v)}
            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-control border border-line text-ink lg:hidden"
          >
            {mobileOpen ? (
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <path d="M6 6l12 12M18 6 6 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              </svg>
            ) : (
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <path d="M4 7h16M4 12h16M4 17h16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              </svg>
            )}
          </button>
        </div>
      </div>

      {mobileOpen ? (
        <div className="max-h-[calc(100vh-65px)] overflow-y-auto border-t border-line bg-white px-6 py-5 sm:px-14 lg:hidden">
          <p className="text-xs font-bold uppercase tracking-wide text-faint">Tours</p>
          <div className="mt-2 flex flex-col">
            {TOURS_NAV_ITEMS.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setMobileOpen(false)}
                className="border-b border-media py-3 text-[15px] font-semibold text-ink"
              >
                {item.title}
              </Link>
            ))}
          </div>

          <p className="mt-5 text-xs font-bold uppercase tracking-wide text-faint">Plan Your Trip</p>
          <div className="mt-2 flex flex-col">
            {PLAN_NAV_ITEMS.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setMobileOpen(false)}
                className="border-b border-media py-3 text-[15px] font-semibold text-ink"
              >
                {item.title}
              </Link>
            ))}
          </div>

          <div className="mt-5 flex flex-col gap-1">
            <a href={faqHref} onClick={() => setMobileOpen(false)} className="py-2 text-[15px] font-semibold text-ink">
              FAQ
            </a>
            <Link href="/about" onClick={() => setMobileOpen(false)} className="py-2 text-[15px] font-semibold text-ink">
              About
            </Link>
            <Link href="/contact" onClick={() => setMobileOpen(false)} className="py-2 text-[15px] font-semibold text-ink">
              Contact
            </Link>
          </div>

          <p className="mt-5 text-xs font-bold uppercase tracking-wide text-faint">Our Network</p>
          <div className="mt-2 flex flex-col">
            {SIBLING_SITES.map((site) => (
              <Link
                key={site.slug}
                href={`/${site.slug}`}
                onClick={() => setMobileOpen(false)}
                className="border-b border-media py-2.5 text-sm text-ink-muted"
              >
                {site.name}
              </Link>
            ))}
          </div>

          <a
            href={ctaHref}
            onClick={() => setMobileOpen(false)}
            className="mt-5 flex h-11 items-center justify-center rounded-control bg-accent-gradient text-sm font-bold text-white shadow-glow transition-transform duration-200 ease-out hover:scale-[1.02]"
          >
            Check Availability
          </a>
        </div>
      ) : null}
    </header>
  );
}

export function PDTAuthorBox() {
  return (
    <section className="border-b border-line bg-paper-tint py-14">
      <div className="mx-auto max-w-[1200px] px-6 sm:px-14">
        <div className="flex flex-col items-start gap-6 rounded-media border border-line bg-white p-6 shadow-card sm:flex-row sm:items-center sm:justify-between sm:p-8">
          <div className="flex items-center gap-5">
            <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full bg-accent-gradient text-lg font-bold text-white shadow-card-soft sm:h-20 sm:w-20 sm:text-xl">
              {AUTHOR.initials}
            </div>
            <div>
              <p className="text-[17px] font-bold text-ink">{AUTHOR.name}</p>
              <p className="text-sm font-medium text-faint">
                {AUTHOR.title} &middot; {AUTHOR.domain}
              </p>
              <p className="mt-2 max-w-[52ch] text-sm leading-relaxed text-ink-muted">{AUTHOR.bio}</p>
            </div>
          </div>
          <Link
            href="/about"
            className="flex h-11 shrink-0 items-center justify-center whitespace-nowrap rounded-control border border-accent px-5 text-sm font-bold text-accent transition-colors hover:bg-accent-soft"
          >
            About our approach &rarr;
          </Link>
        </div>
      </div>
    </section>
  );
}

export function PDTFooter() {
  return (
    <footer className="bg-ink text-white/70">
      <div className="mx-auto max-w-[1440px] px-6 py-16 sm:px-14">
        <div className="grid grid-cols-2 gap-x-8 gap-y-10 sm:grid-cols-3 lg:grid-cols-5">
          <div className="col-span-2 sm:col-span-3 lg:col-span-1">
            <Link href="/" className="flex items-center gap-2.5">
              <PDTBrandMark />
              <span className="font-display text-lg font-bold tracking-tight text-white">Pompeii Day Trip</span>
            </Link>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-white/55">
              Independent, first-hand guide to Pompeii day trips from Rome, Naples, and Sorrento/Amalfi &mdash; part of
              the Italy Tours network of Rome and Italy travel guides.
            </p>
            <p className="mt-4 text-xs font-semibold uppercase tracking-[0.1em] text-white/35">
              GetYourGuide &middot; Viator &middot; Civitatis
            </p>
          </div>

          <div>
            <h3 className="text-xs font-bold uppercase tracking-[0.14em] text-white/40">Explore</h3>
            <ul className="mt-4 space-y-3">
              {EXPLORE_LINKS.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-sm text-white/65 transition-colors hover:text-accent">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-xs font-bold uppercase tracking-[0.14em] text-white/40">Plan</h3>
            <ul className="mt-4 space-y-3">
              {LEARN_LINKS.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-sm text-white/65 transition-colors hover:text-accent">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-xs font-bold uppercase tracking-[0.14em] text-white/40">Company</h3>
            <ul className="mt-4 space-y-3">
              <li>
                <Link href="/about" className="text-sm text-white/65 transition-colors hover:text-accent">
                  About
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-sm text-white/65 transition-colors hover:text-accent">
                  Contact
                </Link>
              </li>
              <li>
                <Link href="/contact#disclosure" className="text-sm text-white/65 transition-colors hover:text-accent">
                  Affiliate Disclosure
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-xs font-bold uppercase tracking-[0.14em] text-white/40">Our Network</h3>
            <ul className="mt-4 space-y-3">
              {SIBLING_SITES.map((site) => (
                <li key={site.slug}>
                  <Link href={`/${site.slug}`} className="text-sm text-white/65 transition-colors hover:text-accent">
                    {site.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-3 border-t border-white/10 pt-8 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-xs text-white/40">&copy; {new Date().getFullYear()} Pompeii Day Trip. All rights reserved.</p>
          <p className="text-xs text-white/40">
            As an affiliate partner, this site may earn a commission on bookings made through outbound links, at no
            extra cost to you. Independent &mdash; not affiliated with the Parco Archeologico di Pompei.
          </p>
        </div>
      </div>
    </footer>
  );
}

export function RibbonBadge({ label }: { label: string }) {
  return (
    <span className="absolute left-3 top-3 rounded-full bg-ink/80 px-2.5 py-1 text-[11px] font-bold uppercase tracking-wide text-white backdrop-blur-sm">
      {label}
    </span>
  );
}

export function useCardCarousel() {
  const trackRef = useRef<HTMLDivElement>(null);

  function scrollByOneCard(direction: 1 | -1) {
    const track = trackRef.current;
    if (!track) return;
    const firstCard = track.firstElementChild as HTMLElement | null;
    if (!firstCard) return;
    const gap = parseFloat(getComputedStyle(track).columnGap || '0');
    const step = firstCard.getBoundingClientRect().width + gap;
    const maxScroll = track.scrollWidth - track.clientWidth;

    let target = track.scrollLeft + step * direction;
    if (direction === 1 && track.scrollLeft >= maxScroll - 1) {
      target = 0;
    } else if (direction === -1 && track.scrollLeft <= 1) {
      target = maxScroll;
    }
    track.scrollTo({ left: target, behavior: 'smooth' });
  }

  return { trackRef, scrollByOneCard };
}

export function CarouselArrows({ onPrev, onNext, label }: { onPrev: () => void; onNext: () => void; label: string }) {
  return (
    <div className="flex gap-2">
      <button
        type="button"
        aria-label={`Previous ${label}`}
        onClick={onPrev}
        className="flex h-10 w-10 items-center justify-center rounded-full border border-line bg-white text-faint shadow-card-soft transition-all duration-200 ease-out hover:border-accent hover:text-accent sm:h-11 sm:w-11"
      >
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <path d="M15 5 8 12l7 7" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>
      <button
        type="button"
        aria-label={`Next ${label}`}
        onClick={onNext}
        className="flex h-10 w-10 items-center justify-center rounded-full border border-line bg-white text-faint shadow-card-soft transition-all duration-200 ease-out hover:border-accent hover:text-accent sm:h-11 sm:w-11"
      >
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <path d="m9 5 7 7-7 7" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>
    </div>
  );
}

/**
 * A real side-by-side comparison table (per doc 01's T2 Day-trip template
 * spec), matching Underground Colosseum's and Private Vatican's shipped
 * pattern. Whether a listing includes genuine skip-the-line entry
 * (`skipLineEntry`) is this property's equivalent of UC's arena-floor flag —
 * the single biggest factor in what a Pompeii ticket actually delivers on a
 * tight day-trip schedule.
 */
export function TourComparisonTable({ tours, caption }: { tours: FeaturedTour[]; caption?: string }) {
  return (
    <div className="overflow-x-auto rounded-media border border-line bg-white">
      <table className="w-full min-w-[640px] border-collapse text-left text-sm">
        {caption ? <caption className="sr-only">{caption}</caption> : null}
        <thead>
          <tr className="border-b border-line bg-paper-tint">
            <th scope="col" className="px-4 py-3 font-bold text-ink">Tour</th>
            <th scope="col" className="px-4 py-3 font-bold text-ink">Partner</th>
            <th scope="col" className="px-4 py-3 font-bold text-ink">Duration</th>
            <th scope="col" className="px-4 py-3 font-bold text-ink">Skip-the-line</th>
            <th scope="col" className="px-4 py-3 text-right font-bold text-ink">From</th>
            <th scope="col" className="px-4 py-3" aria-label="Link" />
          </tr>
        </thead>
        <tbody>
          {tours.map((tour) => (
            <tr key={tour.slug} className="border-b border-line last:border-b-0 even:bg-paper-tint/50">
              <td className="px-4 py-3 font-semibold text-ink">{tour.title}</td>
              <td className="px-4 py-3 text-ink-muted">{tour.partner}</td>
              <td className="px-4 py-3 text-ink-muted">{(tour.meta.split('·')[0] ?? '').trim()}</td>
              <td className="px-4 py-3">
                {tour.skipLineEntry ? (
                  <span className="inline-flex items-center gap-1 font-semibold text-success">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                      <path d="m5 12.5 4.5 4.5L19 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    Included
                  </span>
                ) : (
                  <span className="text-faint">Not included</span>
                )}
              </td>
              <td className="px-4 py-3 text-right font-bold tabular-nums text-ink">&euro;{tour.priceFrom}</td>
              <td className="px-4 py-3 text-right">
                <Link href={`/go/${tour.slug}`} className="text-sm font-bold text-accent hover:underline">
                  View &rarr;
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

/**
 * "Pompeii by the Numbers" stat strip — verifiable historical facts about
 * Pompeii, Herculaneum, and Vesuvius (see QUICK_FACTS in
 * lib/pompeii-day-trip.ts), not business metrics.
 */
export function QuickFactsStrip({ facts }: { facts: { value: string; label: string; detail: string }[] }) {
  return (
    <div className="grid grid-cols-2 gap-4 sm:grid-cols-5">
      {facts.map((fact) => (
        <div key={fact.label} className="rounded-media border border-line bg-white p-5 text-center">
          <p className="font-display text-[26px] font-extrabold leading-none tracking-tight text-accent">{fact.value}</p>
          <p className="mt-2 text-[13px] font-bold leading-snug text-ink">{fact.label}</p>
          <p className="mt-1.5 text-[12px] leading-snug text-faint">{fact.detail}</p>
        </div>
      ))}
    </div>
  );
}

/**
 * "At a glance" summary box for a money page — every value passed in
 * restates something already stated in that page's own body copy (see
 * AtAGlanceItem in lib/pompeii-day-trip-content.ts).
 */
export function AtAGlanceBox({ items }: { items: { label: string; value: string }[] }) {
  return (
    <div className="rounded-media border border-line bg-paper-tint p-5">
      <p className="text-xs font-bold uppercase tracking-wide text-faint">At a glance</p>
      <dl className="mt-3 divide-y divide-line">
        {items.map((item) => (
          <div key={item.label} className="flex items-start justify-between gap-4 py-2.5 first:pt-0 last:pb-0">
            <dt className="text-sm text-ink-muted">{item.label}</dt>
            <dd className="text-right text-sm font-bold tabular-nums text-ink">{item.value}</dd>
          </div>
        ))}
      </dl>
    </div>
  );
}

/** Photo-led gallery grid — reused on the About page (see PDTAboutPage). */
export function PhotoGallery({ images }: { images: { src: string; alt: string }[] }) {
  return (
    <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
      {images.map((image) => (
        <div key={image.src} className="relative aspect-square overflow-hidden rounded-xl bg-media">
          <SafeImage src={image.src} alt={image.alt} fill sizes="(min-width: 640px) 25vw, 50vw" className="object-cover" />
        </div>
      ))}
    </div>
  );
}
