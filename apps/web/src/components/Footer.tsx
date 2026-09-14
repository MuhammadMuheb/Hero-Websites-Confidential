'use client';

import { usePathname } from 'next/navigation';
import Link from '@/components/NetworkLink';
import { NETWORK_SITES, isUnbuiltNetworkRoute } from '@/lib/tours';

const COMPANY_LINKS = [
  { label: 'Home', href: '/' },
  { label: 'About', href: '/about' },
  { label: 'Contact', href: '/contact' },
  { label: 'Blog', href: '/blog' },
  { label: 'Rome Food Tours', href: '/tours' },
  { label: 'Top Attractions', href: '/neighborhoods' },
  { label: 'All Destinations', href: '/tours' },
];

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

  if (isUnbuiltNetworkRoute(pathname)) return null;

  return (
    <footer className="border-t border-line bg-paper-tint">
      <div className="mx-auto max-w-[1440px] px-6 py-16 sm:px-14">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <Link href="/" className="flex items-center gap-2">
              <span className="flex h-6 w-6 items-center justify-center rounded-full bg-accent text-white">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                  <path
                    d="M6 3v7a2 2 0 0 0 2 2v9M6 3a2 2 0 0 0-2 2M6 3a2 2 0 0 1 2 2v5M18 3c-1.6 0-3 2-3 6s1.4 5 3 5v7"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </span>
              <span className="text-lg font-bold tracking-tight text-ink">street food rome</span>
            </Link>
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-ink-muted">
              A first-hand guide to Rome&rsquo;s street food, written by a 12-year resident — honest
              neighbourhood, market, and tour recommendations, no tourist traps.
            </p>
          </div>

          <div className="flex gap-3">
            {SOCIAL_LINKS.map((social) => (
              <Link
                key={social.label}
                href={social.href}
                aria-label={social.label}
                className="flex h-9 w-9 items-center justify-center rounded-full border border-line bg-white text-ink-muted transition-colors hover:border-accent hover:text-accent"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                  {social.icon}
                </svg>
              </Link>
            ))}
          </div>
        </div>

        <div className="mt-12 grid grid-cols-2 gap-x-8 gap-y-10 sm:grid-cols-4">
          <div>
            <h3 className="text-sm font-bold uppercase tracking-wide text-ink">Company</h3>
            <ul className="mt-4 space-y-3">
              {COMPANY_LINKS.map((link) => (
                <li key={link.label}>
                  <Link href={link.href} className="text-sm text-ink-muted transition-colors hover:text-accent">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-bold uppercase tracking-wide text-ink">Our Network</h3>
            <ul className="mt-4 space-y-3">
              {NETWORK_SITES.map((site) => (
                <li key={site.number}>
                  <Link
                    href={`/${site.slug}`}
                    className="text-sm text-ink-muted transition-colors hover:text-accent"
                  >
                    {site.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-bold uppercase tracking-wide text-ink">Privacy &amp; Terms</h3>
            <ul className="mt-4 space-y-3">
              {LEGAL_LINKS.map((link) => (
                <li key={link.label}>
                  <Link href={link.href} className="text-sm text-ink-muted transition-colors hover:text-accent">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-bold uppercase tracking-wide text-ink">Contact Us</h3>
            <ul className="mt-4 space-y-3 text-sm text-ink-muted">
              <li>
                <a href="mailto:hello@streetfoodrome.com" className="transition-colors hover:text-accent">
                  hello@streetfoodrome.com
                </a>
              </li>
              <li>Based in Rome, Italy</li>
              <li>We usually reply within 24 hours</li>
            </ul>
            <p className="mt-5 inline-flex items-center gap-1.5 rounded-[6px] border border-line bg-white px-2.5 py-1.5 text-xs text-ink-muted">
              Bookings powered by GetYourGuide
            </p>
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-3 border-t border-line pt-8 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-xs text-faint">© {year} Street Food Rome. All rights reserved.</p>
          <p className="text-xs text-faint">
            As a GetYourGuide affiliate partner, we may earn a commission on bookings made through
            links on this site.
          </p>
        </div>
      </div>
    </footer>
  );
}
