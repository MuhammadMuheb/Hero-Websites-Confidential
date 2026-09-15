'use client';

import { useEffect, useRef, useState } from 'react';
import Link from '@/components/NetworkLink';
import { SafeImage } from '@/components/SafeImage';
import { type FeaturedTour, type NavItem, NAV_ITEMS } from '@/lib/naples-street-food';
import { AUTHOR } from '@/lib/naples-street-food-content';
import { NETWORK_SITES } from '@/lib/tours';

const SIBLING_SITES = NETWORK_SITES.filter((site) => site.slug !== 'naples-street-food');
const NETWORK_NAV_ITEMS: NavItem[] = SIBLING_SITES.map((site) => ({
  title: site.name,
  href: `/${site.slug}`,
  keyword: 'Italy Tours network',
}));

export function NSFBrandMark() {
  return (
    <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-[10px] bg-accent-gradient shadow-card-soft">
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <circle cx="7.5" cy="7.5" r="1.5" fill="white" />
        <circle cx="12" cy="4" r="1.5" fill="white" />
        <circle cx="16.5" cy="7.5" r="1.5" fill="white" />
        <path d="M12 9v10M8 15h8" stroke="white" strokeWidth="1.6" strokeLinecap="round" />
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
              <Link key={item.href} href={item.href} onClick={() => setOpen(false)} className="flex flex-col gap-0.5 rounded-xl px-3 py-2.5 transition-colors hover:bg-paper-tint">
                <span className="text-sm font-semibold text-ink">{item.title}</span>
                <span className="text-xs text-faint">{item.keyword}</span>
              </Link>
            ))}
          </div>
          {footerHref && footerLabel ? (
            <Link href={footerHref} onClick={() => setOpen(false)} className="mt-1 flex items-center justify-between rounded-xl px-3 py-2.5 text-sm font-bold text-accent transition-colors hover:bg-accent-soft">
              {footerLabel}
              <span aria-hidden="true">&rarr;</span>
            </Link>
          ) : null}
        </div>
      ) : null}
    </div>
  );
}

export function NSFHeader({ toursHref = '#tours', planHref = '#plan-your-trip', faqHref = '#faq', ctaHref = '#featured-tours' }: { toursHref?: string; planHref?: string; faqHref?: string; ctaHref?: string }) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [hidden, setHidden] = useState(false);
  const lastScrollY = useRef(0);

  useEffect(() => {
    lastScrollY.current = window.scrollY;
    function onScroll() {
      if (mobileOpen) return;
      const currentY = window.scrollY;
      const delta = currentY - lastScrollY.current;
      if (currentY < 80) setHidden(false);
      else if (delta > 4) setHidden(true);
      else if (delta < -4) setHidden(false);
      lastScrollY.current = currentY;
    }
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [mobileOpen]);

  return (
    <header className={`sticky top-0 z-40 border-b border-line/80 bg-white/85 backdrop-blur-md ${hidden ? '-translate-y-full transition-transform duration-300 ease-out' : 'translate-y-0'}`}>
      <div className="mx-auto flex h-[72px] max-w-[1440px] items-center justify-between gap-4 px-6 sm:px-14">
        <Link href="/" className="flex min-w-0 shrink items-center gap-2.5">
          <NSFBrandMark />
          <span className="truncate font-display text-base font-bold leading-none tracking-tight text-ink sm:text-lg">Naples Street Food</span>
        </Link>

        <nav aria-label="Primary" className="hidden min-w-0 items-center gap-8 lg:flex">
          <NavDropdown label="Tours" items={NAV_ITEMS.slice(0, 3)} footerHref={toursHref} footerLabel="See all tours" />
          <NavDropdown label="Guides" items={NAV_ITEMS.slice(3)} footerHref={planHref} footerLabel="See all guides" />
          <a href={faqHref} className="text-sm font-medium text-ink-muted transition-colors hover:text-accent">FAQ</a>
          <NavDropdown label="Our Network" items={NETWORK_NAV_ITEMS} />
        </nav>

        <div className="flex shrink-0 items-center gap-3 sm:gap-4">
          <div className="hidden items-center gap-5 sm:flex">
            <Link href="/about" className="text-sm font-medium text-ink-muted transition-colors hover:text-accent">About</Link>
            <Link href="/contact" className="text-sm font-medium text-ink-muted transition-colors hover:text-accent">Contact</Link>
          </div>
          <span className="hidden h-6 w-px bg-line sm:block" aria-hidden="true" />
          <a href={ctaHref} className="flex h-10 shrink-0 items-center justify-center whitespace-nowrap rounded-control bg-accent-gradient px-4 text-sm font-bold text-white shadow-glow transition-transform duration-200 ease-out hover:scale-[1.02]">
            See Tours
          </a>
          <button type="button" aria-label={mobileOpen ? 'Close menu' : 'Open menu'} aria-expanded={mobileOpen} onClick={() => setMobileOpen((v) => !v)} className="flex h-10 w-10 shrink-0 items-center justify-center rounded-control border border-line text-ink lg:hidden">
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
        <div className="max-h-[calc(100vh-72px)] overflow-y-auto border-t border-line bg-white px-6 py-5 sm:px-14 lg:hidden">
          <p className="text-xs font-bold uppercase tracking-wide text-faint">Tours</p>
          <div className="mt-2 flex flex-col">
            {NAV_ITEMS.slice(0, 4).map((item) => (
              <Link key={item.href} href={item.href} onClick={() => setMobileOpen(false)} className="border-b border-media py-3 text-[15px] font-semibold text-ink">
                {item.title}
              </Link>
            ))}
          </div>
          <p className="mt-5 text-xs font-bold uppercase tracking-wide text-faint">Guides</p>
          <div className="mt-2 flex flex-col">
            {NAV_ITEMS.slice(4).map((item) => (
              <Link key={item.href} href={item.href} onClick={() => setMobileOpen(false)} className="border-b border-media py-3 text-[15px] font-semibold text-ink">
                {item.title}
              </Link>
            ))}
          </div>
          <div className="mt-5 flex flex-col gap-1">
            <a href={faqHref} onClick={() => setMobileOpen(false)} className="py-2 text-[15px] font-semibold text-ink">FAQ</a>
            <Link href="/about" onClick={() => setMobileOpen(false)} className="py-2 text-[15px] font-semibold text-ink">About</Link>
            <Link href="/contact" onClick={() => setMobileOpen(false)} className="py-2 text-[15px] font-semibold text-ink">Contact</Link>
          </div>
          <p className="mt-5 text-xs font-bold uppercase tracking-wide text-faint">Our Network</p>
          <div className="mt-2 flex flex-col">
            {SIBLING_SITES.map((site) => (
              <Link key={site.slug} href={`/${site.slug}`} onClick={() => setMobileOpen(false)} className="border-b border-media py-2.5 text-sm text-ink-muted">
                {site.name}
              </Link>
            ))}
          </div>
          <a href={ctaHref} onClick={() => setMobileOpen(false)} className="mt-5 flex h-11 items-center justify-center rounded-control bg-accent-gradient text-sm font-bold text-white shadow-glow transition-transform duration-200 ease-out hover:scale-[1.02]">
            See Tours
          </a>
        </div>
      ) : null}
    </header>
  );
}

export function NSFAuthorBox() {
  return (
    <section className="border-b border-line bg-paper-tint py-14">
      <div className="mx-auto max-w-[1200px] px-6 sm:px-14">
        <div className="flex flex-col items-start gap-6 rounded-media border border-line bg-white p-6 shadow-card sm:flex-row sm:items-center sm:justify-between sm:p-8">
          <div className="flex items-center gap-5">
            <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full bg-accent-gradient text-lg font-bold text-white shadow-card-soft sm:h-20 sm:w-20 sm:text-xl">
              {AUTHOR.photoOrInitials}
            </div>
            <div>
              <p className="text-[17px] font-bold text-ink">{AUTHOR.name}</p>
              <p className="text-sm font-medium text-faint">{AUTHOR.credentials}</p>
              <p className="mt-2 max-w-[52ch] text-sm leading-relaxed text-ink-muted">{AUTHOR.bio}</p>
            </div>
          </div>
          <Link href="/about" className="flex h-11 shrink-0 items-center justify-center whitespace-nowrap rounded-control border border-accent px-5 text-sm font-bold text-accent transition-colors hover:bg-accent-soft">
            About our approach &rarr;
          </Link>
        </div>
      </div>
    </section>
  );
}

export function NSFFooter() {
  return (
    <footer className="bg-ink text-white/70">
      <div className="mx-auto max-w-[1440px] px-6 py-16 sm:px-14">
        <div className="rounded-panel border border-white/15 bg-white/5 px-5 py-4 text-center text-[13px] font-semibold text-white/85 sm:text-left">
          Independent guide &mdash; not affiliated with any restaurant, GetYourGuide, Viator, or Civitatis.
        </div>
        <div className="mt-10 grid grid-cols-2 gap-x-8 gap-y-10 sm:grid-cols-3 lg:grid-cols-5">
          <div className="col-span-2 sm:col-span-3 lg:col-span-1">
            <Link href="/" className="flex items-center gap-2.5">
              <NSFBrandMark />
              <span className="font-display text-lg font-bold tracking-tight text-white">Naples Street Food</span>
            </Link>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-white/55">
              Independent, first-hand guide to Naples food tours, markets, and pizza at the source — part of the Italy Tours network of Rome and Italy travel guides.
            </p>
            <p className="mt-4 text-xs font-semibold uppercase tracking-[0.1em] text-white/35">GetYourGuide &middot; Viator &middot; Civitatis</p>
          </div>
          <div>
            <h3 className="text-xs font-bold uppercase tracking-[0.14em] text-white/40">Tours</h3>
            <ul className="mt-4 space-y-3">
              {NAV_ITEMS.slice(0, 4).map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-sm text-white/65 transition-colors hover:text-accent">
                    {link.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="text-xs font-bold uppercase tracking-[0.14em] text-white/40">Guides</h3>
            <ul className="mt-4 space-y-3">
              {NAV_ITEMS.slice(4).map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-sm text-white/65 transition-colors hover:text-accent">
                    {link.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="text-xs font-bold uppercase tracking-[0.14em] text-white/40">Legal</h3>
            <ul className="mt-4 space-y-3">
              <li>
                <Link href="/about" className="text-sm text-white/65 transition-colors hover:text-accent">About</Link>
              </li>
              <li>
                <Link href="/contact" className="text-sm text-white/65 transition-colors hover:text-accent">Contact</Link>
              </li>
            </ul>
          </div>
        </div>
        <p className="mt-10 border-t border-white/10 pt-6 text-center text-xs text-white/40">© {new Date().getFullYear()} Naples Street Food. All rights reserved.</p>
      </div>
    </footer>
  );
}

export function CarouselArrows({ label, onPrev, onNext }: { label: string; onPrev: () => void; onNext: () => void }) {
  return (
    <div className="flex gap-2" role="group" aria-label={`${label} carousel controls`}>
      <button type="button" onClick={onPrev} aria-label={`Previous ${label}`} className="flex h-10 w-10 items-center justify-center rounded-control border border-line text-faint transition-colors hover:border-accent hover:text-accent">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <path d="M15 18l-6-6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>
      <button type="button" onClick={onNext} aria-label={`Next ${label}`} className="flex h-10 w-10 items-center justify-center rounded-control border border-line text-faint transition-colors hover:border-accent hover:text-accent">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <path d="M9 18l6-6-6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>
    </div>
  );
}

export function useCardCarousel() {
  const trackRef = useRef<HTMLDivElement>(null);
  const scrollByOneCard = (direction: number) => {
    if (!trackRef.current) return;
    const cardWidth = trackRef.current.querySelector('[style*="scroll-snap"]')?.getBoundingClientRect().width ?? 300;
    trackRef.current.scrollBy({ left: direction * (cardWidth + 24), behavior: 'smooth' });
  };
  return { trackRef, scrollByOneCard };
}

export function RibbonBadge({ label }: { label: string }) {
  return (
    <div className="absolute right-0 top-0 flex items-center justify-center bg-accent-gradient px-3 py-1 text-xs font-bold text-white shadow-card-soft">
      {label}
    </div>
  );
}

export function QuickFactsStrip({ facts }: { facts: Array<{ label: string; stat: string; detail: string }> }) {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {facts.map((fact) => (
        <div key={fact.label} className="rounded-media border border-line bg-white p-4">
          <p className="text-xs font-semibold uppercase tracking-[0.1em] text-faint">{fact.label}</p>
          <p className="mt-2 font-display text-2xl font-bold text-accent">{fact.stat}</p>
          <p className="mt-2 text-sm text-ink-muted">{fact.detail}</p>
        </div>
      ))}
    </div>
  );
}

export function TourComparisonTable({ tours, caption }: { tours: FeaturedTour[]; caption: string }) {
  return (
    <div className="overflow-x-auto rounded-media border border-line">
      <table className="w-full text-sm">
        <caption className="sr-only">{caption}</caption>
        <thead>
          <tr className="border-b border-line bg-paper-tint">
            <th className="px-4 py-3 text-left font-semibold text-ink">Tour</th>
            <th className="px-4 py-3 text-left font-semibold text-ink">Partner</th>
            <th className="px-4 py-3 text-right font-semibold text-ink">From €</th>
          </tr>
        </thead>
        <tbody>
          {tours.map((tour) => (
            <tr key={tour.slug} className="border-b border-line last:border-b-0 hover:bg-paper-tint">
              <td className="px-4 py-3"><Link href={tour.href} className="font-medium text-accent hover:underline">{tour.title}</Link></td>
              <td className="px-4 py-3 text-ink-muted">{tour.partner}</td>
              <td className="px-4 py-3 text-right tabular-nums font-bold text-ink">{tour.priceFrom}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
