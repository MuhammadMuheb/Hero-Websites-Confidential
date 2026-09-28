'use client';

import { useEffect, useState } from 'react';
import Link from '@/components/NetworkLink';
import { usePathname } from 'next/navigation';
import { NETWORK_SITES } from '@/lib/tours';
import { Menu, X, Search } from 'lucide-react';

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();
  const segments = pathname.split('/').filter(Boolean);
  const networkSite = NETWORK_SITES.find((s) => s.slug === segments[0]);
  const brandName = networkSite?.name || 'Street Food Rome';
  const brandHref = networkSite ? `/${networkSite.slug}` : '/';
  const currentSiteSlug = networkSite?.slug || 'street-food-rome';
  const siblingSites = NETWORK_SITES.filter((site) => site.slug !== currentSiteSlug);

  useEffect(() => {
    function handleScroll() {
      setScrolled(window.scrollY > 0);
    }
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 left-0 right-0 z-40 transition-all duration-300 ${
        scrolled ? 'header-glass' : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between gap-4">
        {/* Logo */}
        <Link href={brandHref} className="text-xl font-bold font-display flex-shrink-0">
          {brandName}
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex gap-8 flex-1">
          <Link
            href={brandHref}
            className="nav-underline relative text-sm font-medium transition-colors"
          >
            Home
          </Link>
          <Link
            href={`${brandHref}/tours`}
            className="nav-underline relative text-sm font-medium transition-colors"
          >
            Tours
          </Link>
          <Link
            href={`${brandHref}/guides`}
            className="nav-underline relative text-sm font-medium transition-colors"
          >
            Guides
          </Link>
          <Link
            href={`${brandHref}/about`}
            className="nav-underline relative text-sm font-medium transition-colors"
          >
            About
          </Link>
        </nav>

        {/* Desktop Actions */}
        <div className="hidden md:flex items-center gap-4">
          <button
            className="p-2 hover:text-brand transition-colors"
            aria-label="Search"
          >
            <Search size={20} />
          </button>
          <button className="header-pill cta-pulse px-6 py-2 bg-brand text-cream rounded-full font-semibold text-sm hover:bg-brand-dark transition-colors">
            See Tours
          </button>
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="md:hidden"
          aria-label="Toggle menu"
        >
          {mobileOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <nav className="md:hidden bg-cream border-t border-line px-4 py-4 space-y-3">
          <Link
            href={brandHref}
            className="block text-sm font-medium hover:text-brand"
            onClick={() => setMobileOpen(false)}
          >
            Home
          </Link>
          <Link
            href={`${brandHref}/tours`}
            className="block text-sm font-medium hover:text-brand"
            onClick={() => setMobileOpen(false)}
          >
            Tours
          </Link>
          <Link
            href={`${brandHref}/guides`}
            className="block text-sm font-medium hover:text-brand"
            onClick={() => setMobileOpen(false)}
          >
            Guides
          </Link>
          <Link
            href={`${brandHref}/about`}
            className="block text-sm font-medium hover:text-brand"
            onClick={() => setMobileOpen(false)}
          >
            About
          </Link>
          <div className="pt-4 border-t border-line">
            <button className="w-full px-6 py-2 bg-brand text-cream rounded-full font-semibold text-sm hover:bg-brand-dark transition-colors">
              See Tours
            </button>
          </div>
          {siblingSites.length > 0 && (
            <div className="pt-4 border-t border-line">
              <p className="text-xs font-semibold text-gold-deep mb-3">OUR NETWORK</p>
              {siblingSites.map((site) => (
                <Link
                  key={site.slug}
                  href={`/${site.slug}`}
                  className="block text-sm font-medium hover:text-brand py-1"
                  onClick={() => setMobileOpen(false)}
                >
                  {site.name}
                </Link>
              ))}
            </div>
          )}
        </nav>
      )}
    </header>
  );
}
