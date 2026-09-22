'use client';

import { useEffect, useRef, useState } from 'react';
import { usePathname } from 'next/navigation';
import Link from '@/components/NetworkLink';
import { NETWORK_SITES, getPropertyToursAndBlog } from '@/lib/tours';

interface NavItem {
  label: string;
  href: string;
}

interface NavSection {
  title: string;
  items: NavItem[];
}

function buildNavSections(basePrefix: string, networkSiteSlug: string): NavSection[] {
  const homeHref = basePrefix || '/';

  // Get property-specific tours and blog items
  const propertyTours = getPropertyToursAndBlog(networkSiteSlug);
  const toursAndBlogItems: NavItem[] = propertyTours.map((item) => ({
    label: item.label,
    href: basePrefix ? `${basePrefix}${item.href}` : item.href,
  }));

  // Main pages
  const pageItems: NavItem[] = [
    { label: 'Home', href: homeHref },
    { label: 'About Us', href: `${basePrefix}/about` },
    { label: 'Contact Us', href: `${basePrefix}/contact` },
    { label: 'FAQ', href: `${basePrefix}/faq` },
  ];

  // Legal/policy items (hidden from main display, available in footer/full menu)
  const legalItems: NavItem[] = [
    { label: 'Privacy Policy', href: `${basePrefix}/privacy` },
    { label: 'Terms of Service', href: `${basePrefix}/terms` },
  ];

  return [
    { title: 'Pages', items: pageItems },
    { title: 'Tours & Blog', items: toursAndBlogItems },
    { title: 'Legal', items: legalItems },
  ];
}

function SectionHeading({ children }: { children: React.ReactNode }) {
  return <p className="text-xs font-semibold uppercase tracking-[0.15em] text-faint/60 mb-3">{children}</p>;
}

const linkClass = 'text-sm text-ink-muted transition-colors hover:text-ink hover:font-medium block py-1.5';

export function ViewToursMenu() {
  const [open, setOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();

  const segments = pathname.split('/').filter(Boolean);
  const networkSite = NETWORK_SITES.find((s) => s.slug === segments[0]);
  const currentSiteSlug = networkSite ? networkSite.slug : 'street-food-rome';
  const siblingSites = NETWORK_SITES.filter((site) => site.slug !== currentSiteSlug);

  const basePrefix = networkSite ? `/${networkSite.slug}` : '';
  const sections = buildNavSections(basePrefix, currentSiteSlug);

  // Guarantee sections exist for TypeScript
  const pageSection = sections[0];
  const toursSection = sections[1];
  const legalSection = sections[2];

  useEffect(() => {
    function onClickOutside(e: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener('mousedown', onClickOutside);
    return () => document.removeEventListener('mousedown', onClickOutside);
  }, []);

  const closeMenu = () => setOpen(false);

  return (
    <div className="relative" ref={menuRef}>
      <button
        type="button"
        aria-expanded={open}
        onClick={() => setOpen((o) => !o)}
        className="flex h-9 shrink-0 items-center gap-1.5 whitespace-nowrap rounded-md bg-accent-gradient px-3.5 text-sm font-semibold text-white shadow-md transition-all duration-200 ease-out hover:shadow-lg hover:scale-[1.01] active:scale-[0.99] sm:h-10 sm:px-4 sm:text-base"
      >
        Menu
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

      {open && (
        <div className="fixed inset-x-4 top-[72px] z-50 max-h-[calc(100vh-90px)] overflow-y-auto rounded-md border border-line/40 bg-white p-8 shadow-xl lg:absolute lg:inset-x-auto lg:left-0 lg:top-full lg:mt-3 lg:max-h-none lg:w-max lg:min-w-[920px] lg:overflow-visible">
          <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4">
            {/* Pages Section */}
            <div>
              <SectionHeading>Pages</SectionHeading>
              <ul className="space-y-2">
                {pageSection?.items.map((item) => (
                  <li key={item.href}>
                    <Link href={item.href} onClick={closeMenu} className={linkClass}>
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Tours & Blog Section */}
            <div>
              <SectionHeading>Tours &amp; Blog</SectionHeading>
              <ul className="space-y-2">
                {toursSection?.items.map((item) => (
                  <li key={item.href}>
                    <Link href={item.href} onClick={closeMenu} className={linkClass}>
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Legal Section */}
            <div>
              <SectionHeading>Legal</SectionHeading>
              <ul className="space-y-2">
                {legalSection?.items.map((item) => (
                  <li key={item.href}>
                    <Link href={item.href} onClick={closeMenu} className={linkClass}>
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Our Network Section - Prominent */}
            <div>
              <SectionHeading>Our Network</SectionHeading>
              <ul className="space-y-2">
                {siblingSites.slice(0, 6).map((site) => (
                  <li key={site.number}>
                    <Link href={`/${site.slug}`} onClick={closeMenu} className={linkClass}>
                      {site.name}
                    </Link>
                  </li>
                ))}
                {siblingSites.length > 6 && (
                  <li className="pt-3 border-t border-line/20 mt-3">
                    <Link href="/network" onClick={closeMenu} className={`${linkClass} font-semibold text-accent hover:text-accent/80`}>
                      All Properties →
                    </Link>
                  </li>
                )}
              </ul>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
