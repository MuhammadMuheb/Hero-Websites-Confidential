'use client';

import { useEffect, useRef, useState } from 'react';
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
  const [searchOpen, setSearchOpen] = useState(false);
  const pathname = usePathname();
  const segments = pathname.split('/').filter(Boolean);
  const networkSite = NETWORK_SITES.find((s) => s.slug === segments[0]);
  const brandName = networkSite ? networkSite.name.toLowerCase() : 'street food rome';
  const brandHref = networkSite ? `/${networkSite.slug}` : '/';
  const basePrefix = networkSite ? `/${networkSite.slug}` : '';
  const currentSiteSlug = networkSite?.slug || 'street-food-rome';
  const siblingSites = NETWORK_SITES.filter((site) => site.slug !== currentSiteSlug);

  const propertyTours = getPropertyToursAndBlog(currentSiteSlug);
  const toursItems: NavItem[] = propertyTours.map((item) => ({
    label: item.label,
    href: basePrefix ? `${basePrefix}${item.href}` : item.href,
  }));

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
        className={`sticky top-0 z-40 h-[72px] border-b transition-colors duration-200 ${
          scrolled ? 'border-ink/10 bg-paper/85 backdrop-blur' : 'border-ink/10 bg-paper'
        }`}
        style={{
          backgroundImage: scrolled ? 'linear-gradient(180deg, rgba(var(--paper),0.85) 0%, rgba(var(--paper),0.75) 100%)' : undefined,
        }}
      >
        <div className="mx-auto h-full max-w-full px-4 sm:px-6 lg:px-8">
          <div className="flex h-full items-center justify-between gap-6">
            {/* Logo - Left */}
            <Link href={brandHref} className="flex shrink-0 items-center gap-2">
              <span className="flex h-8 w-8 items-center justify-center rounded-full bg-accent">
                <span className="text-sm font-bold text-white">🍝</span>
              </span>
              <span className="hidden text-sm font-semibold text-ink sm:inline">{brandName}</span>
            </Link>

            {/* Center Navigation - Desktop Only */}
            <nav className="hidden lg:flex items-center gap-0.5">
            <Link
              href={basePrefix || '/'}
              className="relative px-3 py-2 text-sm font-medium text-ink transition-colors hover:text-accent after:absolute after:bottom-1 after:left-0 after:h-0.5 after:w-0 after:bg-accent after:transition-all after:duration-200 hover:after:w-full"
            >
              Home
            </Link>

            <Link
              href={`${basePrefix}/about`}
              className="relative px-3 py-2 text-sm font-medium text-ink transition-colors hover:text-accent after:absolute after:bottom-1 after:left-0 after:h-0.5 after:w-0 after:bg-accent after:transition-all after:duration-200 hover:after:w-full"
            >
              About Us
            </Link>

            <Link
              href={`${basePrefix}/contact`}
              className="relative px-3 py-2 text-sm font-medium text-ink transition-colors hover:text-accent after:absolute after:bottom-1 after:left-0 after:h-0.5 after:w-0 after:bg-accent after:transition-all after:duration-200 hover:after:w-full"
            >
              Contact Us
            </Link>

            <Link
              href={`${basePrefix}/faq`}
              className="relative px-3 py-2 text-sm font-medium text-ink transition-colors hover:text-accent after:absolute after:bottom-1 after:left-0 after:h-0.5 after:w-0 after:bg-accent after:transition-all after:duration-200 hover:after:w-full"
            >
              FAQ
            </Link>

            <Link
              href={`${basePrefix}/privacy`}
              className="relative px-3 py-2 text-sm font-medium text-ink transition-colors hover:text-accent after:absolute after:bottom-1 after:left-0 after:h-0.5 after:w-0 after:bg-accent after:transition-all after:duration-200 hover:after:w-full"
            >
              Privacy Policy
            </Link>

            <Link
              href={`${basePrefix}/terms`}
              className="relative px-3 py-2 text-sm font-medium text-ink transition-colors hover:text-accent after:absolute after:bottom-1 after:left-0 after:h-0.5 after:w-0 after:bg-accent after:transition-all after:duration-200 hover:after:w-full"
            >
              Terms of Service
            </Link>

            <div className="relative" data-dropdown="tours">
              <button
                onClick={() => {
                  setToursOpen(!toursOpen);
                  setNetworkOpen(false);
                }}
                className="flex items-center gap-1 px-3 py-2 text-sm font-medium text-ink transition-colors hover:text-accent"
              >
                Tours & Blog
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" className={`transition-transform duration-200 ${toursOpen ? 'rotate-180' : ''}`}>
                  <path d="m6 9 6 6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
              {toursOpen && (
                <div className="absolute left-0 top-full mt-0 w-64 rounded-panel border border-line bg-paper shadow-dropdown">
                  <div className="grid grid-cols-3 gap-6 p-6">
                    <div>
                      <div className="text-xs font-semibold uppercase tracking-wide text-ink-muted mb-3">Tours by category</div>
                      {toursItems.slice(0, 6).map((item) => (
                        <Link
                          key={item.href}
                          href={item.href}
                          onClick={() => setToursOpen(false)}
                          className="block px-0 py-1.5 text-sm text-ink hover:text-accent transition-colors"
                        >
                          {item.label}
                        </Link>
                      ))}
                    </div>
                    <div>
                      <div className="text-xs font-semibold uppercase tracking-wide text-ink-muted mb-3">Top tours</div>
                      {toursItems.slice(6, 12).map((item) => (
                        <Link
                          key={item.href}
                          href={item.href}
                          onClick={() => setToursOpen(false)}
                          className="block px-0 py-1.5 text-sm text-ink hover:text-accent transition-colors"
                        >
                          {item.label}
                        </Link>
                      ))}
                      <Link href={`${basePrefix}/tours`} onClick={() => setToursOpen(false)} className="block px-0 py-1.5 text-sm font-semibold text-accent hover:text-accent-hover transition-colors">
                        All tours →
                      </Link>
                    </div>
                    <div>
                      <div className="text-xs font-semibold uppercase tracking-wide text-ink-muted mb-3">Guides</div>
                      {toursItems.slice(0, 5).map((item) => (
                        <Link
                          key={item.href}
                          href={item.href}
                          onClick={() => setToursOpen(false)}
                          className="block px-0 py-1.5 text-sm text-ink hover:text-accent transition-colors"
                        >
                          {item.label}
                        </Link>
                      ))}
                      <Link href={`${basePrefix}/blog`} onClick={() => setToursOpen(false)} className="block px-0 py-1.5 text-sm font-semibold text-accent hover:text-accent-hover transition-colors">
                        All guides →
                      </Link>
                    </div>
                  </div>
                </div>
              )}
            </div>

            <div className="relative" data-dropdown="network">
              <button
                onClick={() => {
                  setNetworkOpen(!networkOpen);
                  setToursOpen(false);
                }}
                className="flex items-center gap-1 px-3 py-2 text-sm font-medium text-ink transition-colors hover:text-accent"
              >
                Our Network
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" className={`transition-transform duration-200 ${networkOpen ? 'rotate-180' : ''}`}>
                  <path d="m6 9 6 6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
              {networkOpen && (
                <div className="absolute left-0 top-full mt-0 w-96 rounded-panel border border-line bg-paper shadow-dropdown">
                  <div className="grid grid-cols-2 gap-6 p-6">
                    {[...NETWORK_SITES].map((site) => (
                      <Link
                        key={site.number}
                        href={`/${site.slug}`}
                        onClick={() => setNetworkOpen(false)}
                        className="block px-0 py-2 text-sm text-ink hover:text-accent transition-colors border-l-2 border-transparent hover:border-accent pl-2"
                      >
                        <div className="font-semibold text-sm">{site.name}</div>
                        {site.slug === currentSiteSlug && <div className="text-xs text-accent font-semibold mt-1">You are here</div>}
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </nav>

          {/* Right Actions */}
          <div className="flex items-center gap-4 ml-auto">
            <button
              onClick={() => setSearchOpen(!searchOpen)}
              className="p-2 text-ink hover:text-accent transition-colors"
              aria-label="Search"
              type="button"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                <circle cx="11" cy="11" r="8" stroke="currentColor" strokeWidth="1.8" />
                <path d="m21 21-4.4-4.4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
              </svg>
            </button>

            <Link
              href={`${basePrefix}/tours`}
              className="hidden sm:inline-block rounded-full bg-accent px-4 py-2 text-sm font-semibold text-white hover:bg-accent-hover transition-colors"
            >
              See Tours
            </Link>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 text-ink hover:text-accent transition-colors"
              aria-label="Menu"
              type="button"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                <path d="M3 6h18M3 12h18M3 18h18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              </svg>
            </button>
          </div>
        </div>

      </div>
    </header>

    {/* Mobile Menu */}
    {mobileMenuOpen && (
      <div className="fixed inset-0 top-[72px] z-30 lg:hidden overflow-y-auto bg-paper">
        <div className="p-6 space-y-3">
          <Link
            href={basePrefix || '/'}
            className="block px-3 py-2 text-sm font-medium text-ink hover:text-accent transition-colors"
            onClick={() => setMobileMenuOpen(false)}
          >
            Home
          </Link>

          <Link
            href={`${basePrefix}/about`}
            className="block px-3 py-2 text-sm font-medium text-ink hover:text-accent transition-colors"
            onClick={() => setMobileMenuOpen(false)}
          >
            About Us
          </Link>

          <Link
            href={`${basePrefix}/contact`}
            className="block px-3 py-2 text-sm font-medium text-ink hover:text-accent transition-colors"
            onClick={() => setMobileMenuOpen(false)}
          >
            Contact Us
          </Link>

          <Link
            href={`${basePrefix}/faq`}
            className="block px-3 py-2 text-sm font-medium text-ink hover:text-accent transition-colors"
            onClick={() => setMobileMenuOpen(false)}
          >
            FAQ
          </Link>

          <Link
            href={`${basePrefix}/privacy`}
            className="block px-3 py-2 text-sm font-medium text-ink hover:text-accent transition-colors"
            onClick={() => setMobileMenuOpen(false)}
          >
            Privacy Policy
          </Link>

          <Link
            href={`${basePrefix}/terms`}
            className="block px-3 py-2 text-sm font-medium text-ink hover:text-accent transition-colors"
            onClick={() => setMobileMenuOpen(false)}
          >
            Terms of Service
          </Link>

          <div className="h-px bg-line my-4" />

          <button
            onClick={() => setToursOpen(!toursOpen)}
            className="w-full text-left px-3 py-2 text-sm font-medium text-ink hover:text-accent transition-colors flex items-center justify-between"
            type="button"
          >
            Tours & Blog
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" className={`transition-transform duration-200 ${toursOpen ? 'rotate-180' : ''}`}>
              <path d="m6 9 6 6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
          {toursOpen && (
            <div className="pl-4 space-y-2">
              {toursItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => {
                    setToursOpen(false);
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
            onClick={() => setNetworkOpen(!networkOpen)}
            className="w-full text-left px-3 py-2 text-sm font-medium text-ink hover:text-accent transition-colors flex items-center justify-between"
            type="button"
          >
            Our Network
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" className={`transition-transform duration-200 ${networkOpen ? 'rotate-180' : ''}`}>
              <path d="m6 9 6 6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
          {networkOpen && (
            <div className="pl-4 space-y-3">
              {NETWORK_SITES.map((site) => (
                <Link
                  key={site.number}
                  href={`/${site.slug}`}
                  onClick={() => {
                    setNetworkOpen(false);
                    setMobileMenuOpen(false);
                  }}
                  className="block px-3 py-2 text-sm hover:text-accent transition-colors"
                >
                  <div className="font-semibold text-ink">{site.name}</div>
                  {site.slug === currentSiteSlug && <div className="text-xs text-accent font-semibold mt-1">You are here</div>}
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
