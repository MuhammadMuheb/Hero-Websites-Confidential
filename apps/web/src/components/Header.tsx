'use client';

import { useEffect, useRef, useState } from 'react';
import Link from '@/components/NetworkLink';
import { usePathname } from 'next/navigation';
import { AccountMenu } from './AccountMenu';
import { ViewToursMenu } from './ViewToursMenu';
import { SearchBox } from './SearchBox';
import { NETWORK_SITES } from '@/lib/tours';

export function Header() {
  const [hidden, setHidden] = useState(false);
  const lastScrollY = useRef(0);
  const pathname = usePathname();
  const segments = pathname.split('/').filter(Boolean);
  const networkSite = NETWORK_SITES.find((s) => s.slug === segments[0]);
  const isHomepage = networkSite ? segments.length === 1 : pathname === '/';
  const brandName = networkSite ? networkSite.name.toLowerCase() : 'street food rome';
  const brandHref = networkSite ? `/${networkSite.slug}` : '/';
  const basePrefix = networkSite ? `/${networkSite.slug}` : '';

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

  return (
    <header
      className={`sticky top-0 z-40 h-[70px] border-b border-line/50 bg-white shadow-sm transition-transform duration-300 ease-out ${
        hidden ? '-translate-y-full' : 'translate-y-0'
      }`}
    >
      <div className="mx-auto flex h-full max-w-[1440px] items-center justify-between px-6 sm:px-8 lg:px-14">
        {/* Logo & Brand - Left Section */}
        <Link href={brandHref} className="group flex min-w-0 items-center gap-2.5 shrink-0">
          <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-accent-gradient text-white shadow-md transition-transform duration-300 ease-out group-hover:scale-105">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <path
                d="M6 3v7a2 2 0 0 0 2 2v9M6 3a2 2 0 0 0-2 2M6 3a2 2 0 0 1 2 2v5M18 3c-1.6 0-3 2-3 6s1.4 5 3 5v7"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </span>
          <span className="truncate text-sm font-bold tracking-tight text-ink sm:text-base hidden sm:block">
            {brandName}
          </span>
        </Link>

        {/* Center Navigation - Desktop Only */}
        <nav className="hidden lg:flex items-center gap-6 flex-1 justify-center">
          <Link
            href={basePrefix || '/'}
            className="text-sm font-medium text-ink-muted hover:text-ink transition-colors duration-200"
          >
            Home
          </Link>
          <Link
            href={`${basePrefix}/about`}
            className="text-sm font-medium text-ink-muted hover:text-ink transition-colors duration-200"
          >
            About
          </Link>
          <Link
            href={`${basePrefix}/tours`}
            className="text-sm font-medium text-ink-muted hover:text-ink transition-colors duration-200"
          >
            Tours
          </Link>
          <Link
            href={`${basePrefix}/blog`}
            className="text-sm font-medium text-ink-muted hover:text-ink transition-colors duration-200"
          >
            Blog
          </Link>
          <Link
            href={`${basePrefix}/contact`}
            className="text-sm font-medium text-ink-muted hover:text-ink transition-colors duration-200"
          >
            Contact
          </Link>
        </nav>

        {/* Search Bar - Hidden on Homepage */}
        {!isHomepage && (
          <SearchBox placeholder="Search tours, guides…" className="hidden flex-1 lg:max-w-xs lg:block" />
        )}

        {/* Right Actions Section */}
        <div className="flex items-center gap-3 sm:gap-4 ml-auto">
          {/* Menu Button - Always visible, but different behavior on mobile vs desktop */}
          <ViewToursMenu />

          {/* Account & Shopping Bag */}
          <AccountMenu />
          <button
            type="button"
            aria-label="Shopping bag"
            className="text-ink hover:text-accent transition-colors duration-200"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <path d="M7 8V6a5 5 0 0 1 10 0v2" stroke="currentColor" strokeWidth="1.6" />
              <rect x="3.5" y="8" width="17" height="13" rx="2" stroke="currentColor" strokeWidth="1.6" />
            </svg>
          </button>
        </div>
      </div>
    </header>
  );
}
