'use client';

import { usePathname } from 'next/navigation';
import Link from '@/components/NetworkLink';
import { NETWORK_SITES } from '@/lib/tours';

const SFR_COMPANY_LINKS = [
  { label: 'Home', href: '/' },
  { label: 'About', href: '/about' },
  { label: 'Contact', href: '/contact' },
  { label: 'Blog', href: '/blog' },
  { label: 'Rome Food Tours', href: '/tours' },
  { label: 'Top Attractions', href: '/neighborhoods' },
];

/** Properties with a real /neighborhoods area guide (see app/[slug]/[...rest]/registry.tsx). */
const AREA_GUIDE_SLUGS = new Set(['underground-colosseum', 'pompeii-day-trip', 'rome-vespa']);

function companyLinks(slug: string) {
  if (slug === 'street-food-rome') return SFR_COMPANY_LINKS;
  return [
    { label: 'Home', href: '/' },
    { label: 'About', href: '/about' },
    { label: 'Contact', href: '/contact' },
    { label: 'Guides', href: '/blog' },
    { label: 'Compare Tours', href: '/tours' },
    ...(AREA_GUIDE_SLUGS.has(slug) ? [{ label: 'Explore by Area', href: '/neighborhoods' }] : []),
  ];
}

const LEGAL_LINKS = [
  { label: 'Privacy Policy', href: '/privacy' },
  { label: 'Terms of Service', href: '/terms' },
  { label: 'Cookie Policy', href: '/cookie-policy' },
  { label: 'Affiliate Disclosure', href: '/affiliate-disclosure' },
  { label: 'FAQ', href: '/faq' },
];

const SOCIAL_LINKS = [
  {
    label: 'Instagram',
    href: '#',
    icon: (
      <>
        <rect x="3.5" y="3.5" width="17" height="17" rx="4.5" stroke="currentColor" strokeWidth="1.6" />
        <circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="1.6" />
        <circle cx="16.8" cy="7.2" r="0.9" fill="currentColor" />
      </>
    ),
  },
  {
    label: 'Facebook',
    href: '#',
    icon: (
      <path
        d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3V2z"
        fill="currentColor"
      />
    ),
  },
  {
    label: 'Pinterest',
    href: '#',
    icon: (
      <path
        d="M12.02 2C6.53 2 3 5.9 3 10.44c0 2.75 1.53 4.61 2.45 4.61.38 0 .6-1.07.6-1.37 0-.36-.9-1.12-.9-2.62 0-3.1 2.36-5.63 6.07-5.63 3.16 0 5.46 1.8 5.46 4.61 0 2.23-.9 6.42-3.8 6.42-1.05 0-1.94-.76-1.94-1.85 0-1.6 1.12-3.15 1.12-4.8 0-2.8-3.98-2.29-3.98.9 0 .58.16 1.23.4 1.75-.57 2.44-1.73 6.08-1.73 6.08-.31 1.29.04 3.14.14 3.24.08.08.2.06.28-.05.12-.16 1.63-2.28 2.14-3.86.14-.46.83-3.25.83-3.25.4.78 1.6 1.46 2.87 1.46 3.78 0 6.34-3.44 6.34-8.05C21 5.4 17.28 2 12.02 2Z"
        fill="currentColor"
      />
    ),
  },
];

export function Footer() {
  const year = new Date().getFullYear();
  const pathname = usePathname();

  const segments = pathname.split('/').filter(Boolean);
  const networkSite = NETWORK_SITES.find((s) => s.slug === segments[0]);
  const currentSiteSlug = networkSite ? networkSite.slug : 'street-food-rome';
  const brandName = networkSite ? networkSite.name : 'Street Food Rome';
  const contactEmail = `hello@${currentSiteSlug.replace(/-/g, '')}.com`;

  return (
    <footer className="bg-paper-tint text-ink-muted">
      <div className="mx-auto max-w-7xl px-6 sm:px-8 py-16">
        {/* Top row: logo + blurb + button + socials */}
        <div className="flex flex-col gap-8 sm:flex-row sm:items-center sm:justify-between pb-12 border-b border-line">
          <div className="flex-1">
            <Link href={networkSite ? `/${networkSite.slug}` : '/'} className="flex items-center gap-2.5">
              <span className="flex h-8 w-8 items-center justify-center rounded-full bg-accent text-white">
                <span className="text-sm font-bold">🍝</span>
              </span>
              <span className="text-sm font-bold text-ink">{brandName.toLowerCase()}</span>
            </Link>
            <p className="mt-3 max-w-xs text-sm leading-relaxed text-ink-muted">
              A first-hand guide to unforgettable experiences, written by a local insider — honest recommendations, expert comparisons, no tourist traps.
            </p>
            <Link
              href={`${networkSite ? `/${networkSite.slug}` : ''}/tours`}
              className="mt-4 inline-flex items-center rounded-full bg-accent px-4 py-2 text-sm font-semibold text-white hover:bg-accent-hover transition-colors"
            >
              Compare tours
            </Link>
          </div>

          <div className="flex gap-3">
            {SOCIAL_LINKS.map((social) => (
              <Link
                key={social.label}
                href={social.href}
                aria-label={social.label}
                className="flex h-10 w-10 items-center justify-center rounded-full border border-line text-ink-muted hover:border-accent hover:text-accent transition-colors"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                  {social.icon}
                </svg>
              </Link>
            ))}
          </div>
        </div>

        {/* 4 columns */}
        <div className="mt-12 grid grid-cols-2 gap-x-8 gap-y-10 sm:grid-cols-4">
          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-ink">Company</h3>
            <ul className="mt-4 space-y-2.5">
              {companyLinks(currentSiteSlug).map((link) => (
                <li key={link.label}>
                  <Link href={`${networkSite ? `/${networkSite.slug}` : ''}${link.href}`} className="text-sm text-ink-muted hover:text-accent transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-ink">Our Network</h3>
            <ul className="mt-4 space-y-2.5">
              {NETWORK_SITES.map((site) => (
                <li key={site.number}>
                  <Link
                    href={`/${site.slug}`}
                    className="text-sm text-ink-muted hover:text-accent transition-colors"
                  >
                    {site.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-ink">Privacy &amp; Terms</h3>
            <ul className="mt-4 space-y-2.5">
              {LEGAL_LINKS.map((link) => (
                <li key={link.label}>
                  <Link href={`${networkSite ? `/${networkSite.slug}` : ''}${link.href}`} className="text-sm text-ink-muted hover:text-accent transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-ink">Contact Us</h3>
            <ul className="mt-4 space-y-2.5 text-sm text-ink-muted">
              <li>
                <a href={`mailto:${contactEmail}`} className="hover:text-accent transition-colors">
                  {contactEmail}
                </a>
              </li>
              <li>Based in Italy</li>
              <li>We usually reply within 24 hours</li>
            </ul>
            <p className="mt-4 inline-flex items-center gap-1.5 rounded-control border border-line bg-white px-2.5 py-1.5 text-xs text-ink-muted">
              Bookings via trusted partners
            </p>
          </div>
        </div>

        {/* Bottom row */}
        <div className="mt-12 flex flex-col gap-2 border-t border-line pt-8 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-xs text-ink-muted">© {year} {brandName}. All rights reserved.</p>
          <p className="text-xs text-ink-muted">
            We may earn a commission when you book through partner links on this site, at no extra cost to you.
          </p>
        </div>
      </div>
    </footer>
  );
}
