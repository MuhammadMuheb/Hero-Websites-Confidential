'use client';

import { useEffect, useState } from 'react';
import Link from '@/components/NetworkLink';
import { usePathname } from 'next/navigation';
import { GlobalSearchBox } from './GlobalSearchBox';
import { NETWORK_SITES, getPropertyToursAndBlog } from '@/lib/tours';

interface NavItem {
  label: string;
  href: string;
}

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [toursOpen, setToursOpen] = useState(false);
  const [networkOpen, setNetworkOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  /** Mobile drawer accordion: only one section open at a time. */
  const [mobileSection, setMobileSection] = useState<'tours' | 'network' | null>(null);
  const [searchOpen, setSearchOpen] = useState(false);
  const pathname = usePathname();
  const segments = pathname.split('/').filter(Boolean);
  const networkSite = NETWORK_SITES.find((s) => s.slug === segments[0]);
  const brandName = networkSite ? networkSite.name : 'Street Food Rome';
  const brandHref = networkSite ? `/${networkSite.slug}` : '/';
  const basePrefix = networkSite ? `/${networkSite.slug}` : '';
  const currentSiteSlug = networkSite?.slug || 'street-food-rome';

  const propertyTours = getPropertyToursAndBlog(currentSiteSlug);
  const toursItems: NavItem[] = propertyTours.map((item) => ({
    label: item.label,
    href: basePrefix ? `${basePrefix}${item.href}` : item.href,
  }));
  const tourLinks = toursItems.filter((item) => !item.href.endsWith('/blog'));
  const guideLinks: NavItem[] = [
    { label: 'Travel Blog', href: `${basePrefix}/blog` },
    { label: 'Neighborhood Guides', href: `${basePrefix}/neighborhoods` },
    { label: 'FAQ', href: `${basePrefix}/faq` },
  ];

  // Close every menu when the page changes.
  useEffect(() => {
    setToursOpen(false);
    setNetworkOpen(false);
    setMobileMenuOpen(false);
    setMobileSection(null);
  }, [pathname]);

  // Escape closes desktop dropdowns and the mobile drawer.
  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === 'Escape') {
        setToursOpen(false);
        setNetworkOpen(false);
        setMobileMenuOpen(false);
      }
    }
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, []);

  useEffect(() => {
    function onScroll() {
      setScrolled(window.scrollY > 0);
    }
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      const target = e.target as HTMLElement;
      if (!target.closest('[data-dropdown]')) {
        setToursOpen(false);
        setNetworkOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <>
      <header
        className={`sticky top-0 z-40 h-16 sm:h-[72px] border-b transition-colors duration-200 ${
          scrolled ? 'border-ink/10 bg-cream/90 backdrop-blur' : 'border-ink/10 bg-cream'
        }`}
      >
        <div className="mx-auto h-full max-w-full px-2 sm:px-3 lg:px-8">
          <div className="flex h-full items-center justify-between gap-2 sm:gap-3 lg:gap-6 min-w-0">
            {/* Logo - Left */}
            <Link href={brandHref} className="flex shrink-0 items-center gap-2">
              <span className="font-hero text-sm sm:text-[20px] font-black tracking-[-0.01em] text-ink">{brandName}</span>
            </Link>

            {/* Center Navigation - Desktop Only */}
            <nav className="hidden lg:flex items-center gap-0.5 min-w-0 shrink">
            <Link
              href={basePrefix || '/'}
              className="relative shrink-0 whitespace-nowrap px-1.5 xl:px-3 py-2 text-xs xl:text-sm font-semibold text-ink transition-colors hover:text-brand after:absolute after:bottom-1 after:left-1.5 xl:after:left-3 after:h-0.5 after:w-0 after:bg-gold after:transition-all after:duration-200 hover:after:w-[calc(100%-0.75rem)] xl:hover:after:w-[calc(100%-1.5rem)]"
            >
              Home
            </Link>

            <Link
              href={`${basePrefix}/about`}
              className="relative shrink-0 whitespace-nowrap px-1.5 xl:px-3 py-2 text-xs xl:text-sm font-semibold text-ink transition-colors hover:text-brand after:absolute after:bottom-1 after:left-1.5 xl:after:left-3 after:h-0.5 after:w-0 after:bg-gold after:transition-all after:duration-200 hover:after:w-[calc(100%-0.75rem)] xl:hover:after:w-[calc(100%-1.5rem)]"
            >
              About Us
            </Link>

            <Link
              href={`${basePrefix}/contact`}
              className="relative shrink-0 whitespace-nowrap px-1.5 xl:px-3 py-2 text-xs xl:text-sm font-semibold text-ink transition-colors hover:text-brand after:absolute after:bottom-1 after:left-1.5 xl:after:left-3 after:h-0.5 after:w-0 after:bg-gold after:transition-all after:duration-200 hover:after:w-[calc(100%-0.75rem)] xl:hover:after:w-[calc(100%-1.5rem)]"
            >
              Contact Us
            </Link>

            <Link
              href={`${basePrefix}/faq`}
              className="relative shrink-0 whitespace-nowrap px-1.5 xl:px-3 py-2 text-xs xl:text-sm font-semibold text-ink transition-colors hover:text-brand after:absolute after:bottom-1 after:left-1.5 xl:after:left-3 after:h-0.5 after:w-0 after:bg-gold after:transition-all after:duration-200 hover:after:w-[calc(100%-0.75rem)] xl:hover:after:w-[calc(100%-1.5rem)]"
            >
              FAQ
            </Link>

            <Link
              href={`${basePrefix}/privacy`}
              className="relative shrink-0 whitespace-nowrap px-1.5 xl:px-3 py-2 text-xs xl:text-sm font-semibold text-ink transition-colors hover:text-brand after:absolute after:bottom-1 after:left-1.5 xl:after:left-3 after:h-0.5 after:w-0 after:bg-gold after:transition-all after:duration-200 hover:after:w-[calc(100%-0.75rem)] xl:hover:after:w-[calc(100%-1.5rem)]"
            >
              Privacy Policy
            </Link>

            <Link
              href={`${basePrefix}/terms`}
              className="relative shrink-0 whitespace-nowrap px-1.5 xl:px-3 py-2 text-xs xl:text-sm font-semibold text-ink transition-colors hover:text-brand after:absolute after:bottom-1 after:left-1.5 xl:after:left-3 after:h-0.5 after:w-0 after:bg-gold after:transition-all after:duration-200 hover:after:w-[calc(100%-0.75rem)] xl:hover:after:w-[calc(100%-1.5rem)]"
            >
              Terms of Service
            </Link>

            <div className="relative" data-dropdown="tours">
              <button
                type="button"
                aria-expanded={toursOpen}
                onClick={() => {
                  setToursOpen((v) => !v);
                  setNetworkOpen(false);
                }}
                className="flex shrink-0 items-center gap-1 whitespace-nowrap px-1.5 xl:px-3 py-2 text-xs xl:text-sm font-semibold text-ink transition-colors hover:text-brand"
              >
                Tours & Blog
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" className={`transition-transform duration-200 ${toursOpen ? 'rotate-180' : ''}`}>
                  <path d="m6 9 6 6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
              {toursOpen && (
                <div className="absolute left-1/2 top-full z-50 mt-3 w-[480px] -translate-x-1/2 rounded-[20px] border border-line bg-paper p-6 shadow-dropdown">
                  <div className="grid grid-cols-2 gap-8">
                    <div>
                      <p className="mb-3 text-[11px] font-bold uppercase tracking-[0.18em] text-gold-deep">Tours by category</p>
                      <ul className="space-y-0.5">
                        {tourLinks.map((item) => (
                          <li key={item.href}>
                            <Link
                              href={item.href}
                              onClick={() => setToursOpen(false)}
                              className="block whitespace-nowrap rounded-lg px-2 py-1.5 text-[15px] font-medium text-ink transition-colors hover:bg-accent-soft hover:text-brand"
                            >
                              {item.label}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <p className="mb-3 text-[11px] font-bold uppercase tracking-[0.18em] text-gold-deep">Guides &amp; Blog</p>
                      <ul className="space-y-0.5">
                        {guideLinks.map((item) => (
                          <li key={item.href}>
                            <Link
                              href={item.href}
                              onClick={() => setToursOpen(false)}
                              className="block whitespace-nowrap rounded-lg px-2 py-1.5 text-[15px] font-medium text-ink transition-colors hover:bg-accent-soft hover:text-brand"
                            >
                              {item.label}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                  <div className="mt-5 flex items-center justify-between border-t border-line pt-4">
                    <Link href={`${basePrefix}/tours`} onClick={() => setToursOpen(false)} className="text-sm font-bold text-brand hover:underline">
                      See all tours →
                    </Link>
                    <Link href={`${basePrefix}/blog`} onClick={() => setToursOpen(false)} className="text-sm font-bold text-brand hover:underline">
                      All guides →
                    </Link>
                  </div>
                </div>
              )}
            </div>

            <div className="relative" data-dropdown="network">
              <button
                type="button"
                aria-expanded={networkOpen}
                onClick={() => {
                  setNetworkOpen((v) => !v);
                  setToursOpen(false);
                }}
                className="flex shrink-0 items-center gap-1 whitespace-nowrap px-1.5 xl:px-3 py-2 text-xs xl:text-sm font-semibold text-ink transition-colors hover:text-brand"
              >
                Our Network
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" className={`transition-transform duration-200 ${networkOpen ? 'rotate-180' : ''}`}>
                  <path d="m6 9 6 6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
              {networkOpen && (
                <div className="absolute right-0 top-full z-50 mt-3 w-[440px] rounded-[20px] border border-line bg-paper p-5 shadow-dropdown">
                  <p className="mb-3 px-2 text-[11px] font-bold uppercase tracking-[0.18em] text-gold-deep">Italy Tours Network</p>
                  <div className="grid grid-cols-2 gap-x-4 gap-y-0.5">
                    {[...NETWORK_SITES].map((site) => (
                      <Link
                        key={site.number}
                        href={`/${site.slug}`}
                        onClick={() => setNetworkOpen(false)}
                        className="block whitespace-nowrap rounded-lg px-2 py-1.5 text-ink transition-colors hover:bg-accent-soft hover:text-brand"
                      >
                        <span className="text-[14px] font-semibold">{site.name}</span>
                        {site.slug === currentSiteSlug && <span className="block text-[11px] font-bold text-brand">You are here</span>}
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </nav>

          {/* Right Actions */}
          <div className="flex items-center gap-1.5 sm:gap-2 lg:gap-4 ml-auto shrink">
            <Link
              href={`${basePrefix}/tours`}
              className="hidden md:inline-flex rounded-full bg-accent px-2 lg:px-4 py-1 lg:py-2 text-xs lg:text-sm font-semibold text-white hover:bg-accent-hover transition-colors whitespace-nowrap"
            >
              See Tours
            </Link>

            {/* Mobile Menu Button */}
            <button
              onClick={() => {
                setMobileMenuOpen((v) => !v);
                setMobileSection(null);
              }}
              aria-expanded={mobileMenuOpen}
              className="lg:hidden p-1.5 sm:p-2 text-ink hover:text-accent transition-colors"
              aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
              type="button"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                {mobileMenuOpen ? (
                  <path d="M18 6 6 18M6 6l12 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                ) : (
                  <path d="M3 6h18M3 12h18M3 18h18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                )}
              </svg>
            </button>
          </div>
        </div>

      </div>
    </header>

    {/* Mobile Menu */}
    {mobileMenuOpen && (
      <div data-dropdown="mobile" className="fixed inset-0 top-16 sm:top-[72px] z-30 overflow-y-auto bg-cream lg:hidden">
        <div className="p-4 sm:p-6 space-y-2 sm:space-y-3">
          <Link
            href={basePrefix || '/'}
            className="block rounded-lg px-3 py-2.5 text-base font-semibold text-ink transition-colors hover:bg-accent-soft hover:text-brand"
            onClick={() => setMobileMenuOpen(false)}
          >
            Home
          </Link>

          <Link
            href={`${basePrefix}/about`}
            className="block rounded-lg px-3 py-2.5 text-base font-semibold text-ink transition-colors hover:bg-accent-soft hover:text-brand"
            onClick={() => setMobileMenuOpen(false)}
          >
            About Us
          </Link>

          <Link
            href={`${basePrefix}/contact`}
            className="block rounded-lg px-3 py-2.5 text-base font-semibold text-ink transition-colors hover:bg-accent-soft hover:text-brand"
            onClick={() => setMobileMenuOpen(false)}
          >
            Contact Us
          </Link>

          <Link
            href={`${basePrefix}/faq`}
            className="block rounded-lg px-3 py-2.5 text-base font-semibold text-ink transition-colors hover:bg-accent-soft hover:text-brand"
            onClick={() => setMobileMenuOpen(false)}
          >
            FAQ
          </Link>

          <Link
            href={`${basePrefix}/privacy`}
            className="block rounded-lg px-3 py-2.5 text-base font-semibold text-ink transition-colors hover:bg-accent-soft hover:text-brand"
            onClick={() => setMobileMenuOpen(false)}
          >
            Privacy Policy
          </Link>

          <Link
            href={`${basePrefix}/terms`}
            className="block rounded-lg px-3 py-2.5 text-base font-semibold text-ink transition-colors hover:bg-accent-soft hover:text-brand"
            onClick={() => setMobileMenuOpen(false)}
          >
            Terms of Service
          </Link>

          <div className="h-px bg-line my-4" />

          <button
            onClick={() => setMobileSection((v) => (v === 'tours' ? null : 'tours'))}
            aria-expanded={mobileSection === 'tours'}
            className="flex w-full items-center justify-between rounded-lg px-3 py-2.5 text-left text-base font-semibold text-ink transition-colors hover:bg-accent-soft hover:text-brand"
            type="button"
          >
            Tours & Blog
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" className={`transition-transform duration-200 ${mobileSection === 'tours' ? 'rotate-180' : ''}`}>
              <path d="m6 9 6 6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
          {mobileSection === 'tours' && (
            <div className="space-y-1 pl-4">
              {toursItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => {
                    setMobileSection(null);
                    setMobileMenuOpen(false);
                  }}
                  className="block px-3 py-2 text-sm text-ink-muted hover:text-accent transition-colors"
                >
                  {item.label}
                </Link>
              ))}
            </div>
          )}

          <button
            onClick={() => setMobileSection((v) => (v === 'network' ? null : 'network'))}
            aria-expanded={mobileSection === 'network'}
            className="flex w-full items-center justify-between rounded-lg px-3 py-2.5 text-left text-base font-semibold text-ink transition-colors hover:bg-accent-soft hover:text-brand"
            type="button"
          >
            Our Network
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" className={`transition-transform duration-200 ${mobileSection === 'network' ? 'rotate-180' : ''}`}>
              <path d="m6 9 6 6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
          {mobileSection === 'network' && (
            <div className="space-y-1 pl-4">
              {NETWORK_SITES.map((site) => (
                <Link
                  key={site.number}
                  href={`/${site.slug}`}
                  onClick={() => {
                    setMobileSection(null);
                    setMobileMenuOpen(false);
                  }}
                  className="block px-3 py-2 text-sm hover:text-accent transition-colors"
                >
                  <div className="font-semibold text-ink">{site.name}</div>
                  {site.slug === currentSiteSlug && <div className="mt-0.5 text-xs font-bold text-brand">You are here</div>}
                </Link>
              ))}
            </div>
          )}

          <div className="h-px bg-line my-4" />

          <Link
            href={`${basePrefix}/tours`}
            className="block rounded-full bg-accent px-4 py-2 text-center text-sm font-semibold text-white hover:bg-accent-hover transition-colors"
            onClick={() => setMobileMenuOpen(false)}
          >
            See Tours
          </Link>
        </div>
      </div>
    )}

    {/* Search Modal */}
    {searchOpen && (
      <div className="fixed inset-0 z-50 bg-black/50 flex items-start justify-center pt-24 lg:pt-12">
        <div className="w-full max-w-2xl mx-4">
          <button
            onClick={() => setSearchOpen(false)}
            className="absolute top-6 right-6 text-white"
            aria-label="Close search"
            type="button"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path d="M18 6L6 18M6 6l12 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            </svg>
          </button>
          <GlobalSearchBox
            placeholder="Search tours, guides, neighborhoods..."
            compact={false}
            className="w-full"
          />
        </div>
      </div>
    )}
    </>
  );
}
