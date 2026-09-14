'use client';

import { useEffect, useRef, useState } from 'react';
import Link from '@/components/NetworkLink';
import { CATEGORIES, NETWORK_SITES } from '@/lib/tours';

interface NavItem {
  label: string;
  href: string;
}

const PAGES: NavItem[] = [
  { label: 'About Us', href: '/about' },
  { label: 'Contact Us', href: '/contact' },
  { label: 'FAQ', href: '/faq' },
  { label: 'Privacy Policy', href: '/privacy' },
  { label: 'Terms of Service', href: '/terms' },
];

const TOURS_AND_BLOG: NavItem[] = [
  { label: 'All Tours', href: '/tours' },
  ...CATEGORIES.map((c) => ({ label: `${c.name} Tours`, href: `/tours/category/${c.slug}` })),
  { label: 'Blog', href: '/blog' },
];

function ColumnHeading({ children }: { children: React.ReactNode }) {
  return <p className="text-xs font-semibold uppercase tracking-[0.1em] text-faint">{children}</p>;
}

const linkClass = 'text-sm text-ink-muted transition-colors hover:text-accent';

export function ViewToursMenu() {
  const [open, setOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

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
                {NETWORK_SITES.map((site) => (
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
