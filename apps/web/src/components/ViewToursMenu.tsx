'use client';

import { useEffect, useRef, useState } from 'react';
import { usePathname } from 'next/navigation';
import Link from '@/components/NetworkLink';
import { CATEGORIES, NETWORK_SITES } from '@/lib/tours';

interface NavItem {
  label: string;
  href: string;
}

function buildNavItems(basePrefix: string): { PAGES: NavItem[]; TOURS_AND_BLOG: NavItem[] } {
  const homeHref = basePrefix || '/';

  const PAGES: NavItem[] = [
    { label: 'Home', href: homeHref },
    { label: 'About Us', href: `${basePrefix}/about` },
    { label: 'Contact Us', href: `${basePrefix}/contact` },
    { label: 'FAQ', href: `${basePrefix}/faq` },
    { label: 'Privacy Policy', href: `${basePrefix}/privacy` },
    { label: 'Terms of Service', href: `${basePrefix}/terms` },
  ];

  const TOURS_AND_BLOG: NavItem[] = [
    { label: 'All Tours', href: `${basePrefix}/tours` },
    ...CATEGORIES.map((c) => ({ label: `${c.name} Tours`, href: `${basePrefix}/tours/category/${c.slug}` })),
    { label: 'Blog', href: `${basePrefix}/blog` },
  ];

  return { PAGES, TOURS_AND_BLOG };
}

function ColumnHeading({ children }: { children: React.ReactNode }) {
  return <p className="text-xs font-semibold uppercase tracking-[0.1em] text-faint">{children}</p>;
}

const linkClass = 'text-sm text-ink-muted transition-colors hover:text-accent';

export function ViewToursMenu() {
  const [open, setOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();

  const segments = pathname.split('/').filter(Boolean);
  const networkSite = NETWORK_SITES.find((s) => s.slug === segments[0]);
  const currentSiteSlug = networkSite ? networkSite.slug : 'street-food-rome';
  const siblingSites = NETWORK_SITES.filter((site) => site.slug !== currentSiteSlug);

  const basePrefix = networkSite ? `/${networkSite.slug}` : '';
  const { PAGES, TOURS_AND_BLOG } = buildNavItems(basePrefix);

  useEffect(() => {
    function onClickOutside(e: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener('mousedown', onClickOutside);
    return () => document.removeEventListener('mousedown', onClickOutside);
  }, []);

  return (
    <div className="relative" ref={menuRef}>
      <button
        type="button"
        aria-expanded={open}
        onClick={() => setOpen((o) => !o)}
        className="flex h-9 shrink-0 items-center gap-1.5 whitespace-nowrap rounded-control bg-accent-gradient px-3 text-sm font-bold text-white shadow-glow transition-transform duration-200 ease-out hover:scale-[1.02] sm:h-10 sm:px-4 sm:text-base"
      >
        View Tours
        <svg
          width="12"
          height="12"
          viewBox="0 0 24 24"
          fill="none"
          aria-hidden="true"
          className={`hidden transition-transform sm:block ${open ? 'rotate-180' : ''}`}
        >
          <path d="m6 9 6 6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>

      {open ? (
        <div className="fixed inset-x-4 top-[73px] z-50 max-h-[calc(100vh-90px)] overflow-y-auto rounded-media border border-line bg-white p-6 shadow-popover lg:absolute lg:inset-x-auto lg:left-0 lg:top-full lg:mt-3 lg:max-h-none lg:w-[92vw] lg:max-w-[560px] lg:overflow-visible">
          <div className="grid grid-cols-2 gap-6 sm:grid-cols-3">
            <div>
              <ColumnHeading>Pages</ColumnHeading>
              <ul className="mt-3 space-y-2.5">
                {PAGES.map((item) => (
                  <li key={item.href}>
                    <Link href={item.href} onClick={() => setOpen(false)} className={linkClass}>
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <ColumnHeading>Tours &amp; Blog</ColumnHeading>
              <ul className="mt-3 space-y-2.5">
                {TOURS_AND_BLOG.map((item) => (
                  <li key={item.href}>
                    <Link href={item.href} onClick={() => setOpen(false)} className={linkClass}>
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Sister properties in the same affiliate network — each links to its own internal page. */}
            <div className="col-span-2 sm:col-span-1">
              <ColumnHeading>Our Network</ColumnHeading>
              <ul className="mt-3 space-y-2.5">
                {siblingSites.map((site) => (
                  <li key={site.number}>
                    <Link href={`/${site.slug}`} onClick={() => setOpen(false)} className={linkClass}>
                      {site.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}
