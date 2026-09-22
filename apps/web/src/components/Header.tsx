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
  // Each network property's page ('/{slug}') and all its sub-pages
  // ('/{slug}/about', '/{slug}/tours', ...) render the same site, rebranded
  // with that property's own name in place of "street food rome" — the brand
  // applies across the whole prefix, but "is this the homepage" (which hides
  // the top search bar, since the Hero below already has its own) only holds
  // at the exact root, same as the unprefixed site.
  const segments = pathname.split('/').filter(Boolean);
  const networkSite = NETWORK_SITES.find((s) => s.slug === segments[0]);
  const isHomepage = networkSite ? segments.length === 1 : pathname === '/';
  const brandName = networkSite ? networkSite.name.toLowerCase() : 'street food rome';
  const brandHref = networkSite ? `/${networkSite.slug}` : '/';

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
      className={`sticky top-0 z-40 h-[72px] border-b border-line/80 bg-white/85 backdrop-blur-md ${
        hidden ? '-translate-y-full transition-transform duration-300 ease-out' : 'translate-y-0'
      }`}
    >
      <div className="mx-auto flex h-full max-w-[1440px] items-center justify-between gap-2 px-6 sm:px-14">
        <div className="flex min-w-0 items-center gap-3 sm:gap-5">
          <Link href={brandHref} className="group flex min-w-0 items-center gap-2.5">
            <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-accent-gradient text-white shadow-glow transition-transform duration-300 ease-out group-hover:scale-105">
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
            <span className="truncate text-base font-bold tracking-tight text-ink sm:text-lg">
              {brandName}
            </span>
          </Link>

          <ViewToursMenu />
        </div>

        {isHomepage ? null : (
          <SearchBox placeholder="Search tours, guides, neighborhoods…" className="hidden flex-1 lg:block" />
        )}

        <div className="flex shrink-0 items-center gap-3 sm:gap-5">
          <AccountMenu />
          <button type="button" aria-label="Bag" className="text-ink">
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
