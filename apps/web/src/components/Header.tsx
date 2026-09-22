'use client';

import { useEffect, useRef, useState } from 'react';
import Link from '@/components/NetworkLink';
import { usePathname } from 'next/navigation';
import { AccountMenu } from './AccountMenu';
import { NETWORK_SITES, getPropertyToursAndBlog } from '@/lib/tours';

interface NavItem {
  label: string;
  href: string;
}

export function Header() {
  const [hidden, setHidden] = useState(false);
  const [toursOpen, setToursOpen] = useState(false);
  const [networkOpen, setNetworkOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const lastScrollY = useRef(0);
  const pathname = usePathname();
  const segments = pathname.split('/').filter(Boolean);
  const networkSite = NETWORK_SITES.find((s) => s.slug === segments[0]);
  const brandName = networkSite ? networkSite.name.toLowerCase() : 'street food rome';
  const brandHref = networkSite ? `/${networkSite.slug}` : '/';
  const basePrefix = networkSite ? `/${networkSite.slug}` : '';
  const currentSiteSlug = networkSite?.slug || 'street-food-rome';
  const siblingSites = NETWORK_SITES.filter((site) => site.slug !== currentSiteSlug);

  // Get tours & blog items
  const propertyTours = getPropertyToursAndBlog(currentSiteSlug);
  const toursItems: NavItem[] = propertyTours.map((item) => ({
    label: item.label,
    href: basePrefix ? `${basePrefix}${item.href}` : item.href,
  }));

  useEffect(() => {
    lastScrollY.current = window.scrollY;

    function onScroll() {
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
  }, []);

  // Close dropdowns when clicking outside
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
    <header
      className={`sticky top-0 z-40 h-16 border-b border-gray-200 bg-white shadow-sm transition-transform duration-300 ease-out ${
        hidden ? '-translate-y-full' : 'translate-y-0'
      }`}
    >
      <div className="mx-auto h-full max-w-full px-4 sm:px-6 lg:px-8">
        <div className="flex h-full items-center justify-between gap-4 sm:gap-6 lg:gap-8">
          {/* Logo - Left */}
          <Link href={brandHref} className="group flex shrink-0 items-center gap-2">
            <span className="flex h-8 w-8 items-center justify-center rounded-full bg-red-600 text-white">
              <span className="text-xs font-bold">🍝</span>
            </span>
            <span className="hidden text-sm font-semibold text-gray-900 sm:inline">{brandName}</span>
          </Link>

          {/* Center Navigation - Desktop Only */}
          <nav className="hidden lg:flex items-center gap-1">
            {/* Home */}
            <Link
              href={basePrefix || '/'}
              className="px-3 py-2 text-sm font-medium text-gray-700 hover:text-gray-900 transition-colors"
            >
              Home
            </Link>

            {/* About Us */}
            <Link
              href={`${basePrefix}/about`}
              className="px-3 py-2 text-sm font-medium text-gray-700 hover:text-gray-900 transition-colors"
            >
              About Us
            </Link>

            {/* Contact Us */}
            <Link
              href={`${basePrefix}/contact`}
              className="px-3 py-2 text-sm font-medium text-gray-700 hover:text-gray-900 transition-colors"
            >
              Contact Us
            </Link>

            {/* FAQ */}
            <Link
              href={`${basePrefix}/faq`}
              className="px-3 py-2 text-sm font-medium text-gray-700 hover:text-gray-900 transition-colors"
            >
              FAQ
            </Link>

            {/* Privacy Policy */}
            <Link
              href={`${basePrefix}/privacy`}
              className="px-3 py-2 text-sm font-medium text-gray-700 hover:text-gray-900 transition-colors"
            >
              Privacy Policy
            </Link>

            {/* Terms of Service */}
            <Link
              href={`${basePrefix}/terms`}
              className="px-3 py-2 text-sm font-medium text-gray-700 hover:text-gray-900 transition-colors"
            >
              Terms of Service
            </Link>

            {/* Tours & Blog Dropdown */}
            <div className="relative" data-dropdown="tours">
              <button
                onClick={() => {
                  setToursOpen(!toursOpen);
                  setNetworkOpen(false);
                }}
                className="flex items-center gap-1 px-3 py-2 text-sm font-medium text-gray-700 hover:text-gray-900 transition-colors"
              >
                Tours & Blog
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" className={`transition-transform ${toursOpen ? 'rotate-180' : ''}`}>
                  <path d="m6 9 6 6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
              {toursOpen && (
                <div className="absolute left-0 top-full mt-0 w-48 rounded-md border border-gray-200 bg-white shadow-lg">
                  {toursItems.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={() => setToursOpen(false)}
                      className="block px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 hover:text-gray-900 first:rounded-t-md last:rounded-b-md"
                    >
                      {item.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>

            {/* Our Network Dropdown */}
            <div className="relative" data-dropdown="network">
              <button
                onClick={() => {
                  setNetworkOpen(!networkOpen);
                  setToursOpen(false);
                }}
                className="flex items-center gap-1 px-3 py-2 text-sm font-medium text-gray-700 hover:text-gray-900 transition-colors"
              >
                Our Network
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" className={`transition-transform ${networkOpen ? 'rotate-180' : ''}`}>
                  <path d="m6 9 6 6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
              {networkOpen && (
                <div className="absolute left-0 top-full mt-0 w-56 rounded-md border border-gray-200 bg-white shadow-lg max-h-96 overflow-y-auto">
                  {siblingSites.map((site) => (
                    <Link
                      key={site.number}
                      href={`/${site.slug}`}
                      onClick={() => setNetworkOpen(false)}
                      className="block px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 hover:text-gray-900 first:rounded-t-md last:rounded-b-md"
                    >
                      {site.name}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          </nav>

          {/* Right Actions - Account & Bag */}
          <div className="flex items-center gap-3 sm:gap-4 ml-auto">
            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 text-gray-700 hover:text-gray-900 transition-colors"
              aria-label="Menu"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                <path d="M3 6h18M3 12h18M3 18h18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              </svg>
            </button>

            <AccountMenu />
            <button type="button" aria-label="Shopping bag" className="p-2 text-gray-700 hover:text-gray-900 transition-colors">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                <path d="M7 8V6a5 5 0 0 1 10 0v2" stroke="currentColor" strokeWidth="1.6" />
                <rect x="3.5" y="8" width="17" height="13" rx="2" stroke="currentColor" strokeWidth="1.6" />
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Menu - Below Header */}
        {mobileMenuOpen && (
          <div className="lg:hidden border-t border-gray-200 bg-white py-4 px-4 space-y-3">
            {/* Home */}
            <Link
              href={basePrefix || '/'}
              className="block px-3 py-2 text-sm font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50 rounded-md transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              Home
            </Link>

            {/* About Us */}
            <Link
              href={`${basePrefix}/about`}
              className="block px-3 py-2 text-sm font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50 rounded-md transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              About Us
            </Link>

            {/* Contact Us */}
            <Link
              href={`${basePrefix}/contact`}
              className="block px-3 py-2 text-sm font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50 rounded-md transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              Contact Us
            </Link>

            {/* FAQ */}
            <Link
              href={`${basePrefix}/faq`}
              className="block px-3 py-2 text-sm font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50 rounded-md transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              FAQ
            </Link>

            {/* Privacy Policy */}
            <Link
              href={`${basePrefix}/privacy`}
              className="block px-3 py-2 text-sm font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50 rounded-md transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              Privacy Policy
            </Link>

            {/* Terms of Service */}
            <Link
              href={`${basePrefix}/terms`}
              className="block px-3 py-2 text-sm font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50 rounded-md transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              Terms of Service
            </Link>

            {/* Divider */}
            <div className="h-px bg-gray-200 my-2"></div>

            {/* Tours & Blog */}
            <button
              onClick={() => setToursOpen(!toursOpen)}
              className="w-full text-left px-3 py-2 text-sm font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50 rounded-md transition-colors flex items-center justify-between"
            >
              Tours & Blog
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" className={`transition-transform ${toursOpen ? 'rotate-180' : ''}`}>
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
                    className="block px-3 py-2 text-sm text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded-md transition-colors"
                  >
                    {item.label}
                  </Link>
                ))}
              </div>
            )}

            {/* Our Network */}
            <button
              onClick={() => setNetworkOpen(!networkOpen)}
              className="w-full text-left px-3 py-2 text-sm font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50 rounded-md transition-colors flex items-center justify-between"
            >
              Our Network
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" className={`transition-transform ${networkOpen ? 'rotate-180' : ''}`}>
                <path d="m6 9 6 6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
            {networkOpen && (
              <div className="pl-4 space-y-2 max-h-64 overflow-y-auto">
                {siblingSites.map((site) => (
                  <Link
                    key={site.number}
                    href={`/${site.slug}`}
                    onClick={() => {
                      setNetworkOpen(false);
                      setMobileMenuOpen(false);
                    }}
                    className="block px-3 py-2 text-sm text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded-md transition-colors"
                  >
                    {site.name}
                  </Link>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </header>
  );
}
