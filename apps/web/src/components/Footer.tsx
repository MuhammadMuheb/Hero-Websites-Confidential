'use client';

import Link from 'next/link';
import { EXTERNAL_LINK, useNetworkSites } from './NetworkProvider';

const SFR_COMPANY_LINKS = [
  { label: 'Home', href: '/' },
  { label: 'About', href: '/about' },
  { label: 'Contact', href: '/contact' },
  { label: 'Blog', href: '/blog' },
  { label: 'Rome Food Tours', href: '/tours' },
  { label: 'Top Attractions', href: '/neighborhoods' },
];

const LEGAL_LINKS = [
  { label: 'Privacy Policy', href: '/privacy' },
  { label: 'Terms of Service', href: '/terms' },
  { label: 'Cookie Policy', href: '/cookie-policy' },
  { label: 'Affiliate Disclosure', href: '/affiliate-disclosure' },
  { label: 'FAQ', href: '/faq' },
];


export function Footer() {
  const year = new Date().getFullYear();
  const networkSites = useNetworkSites();
  const brandName = 'Street Food Rome';
  const contactEmail = 'hello@streetfoodrome.com';

  return (
    <footer className="border-t border-line bg-cream-deep text-ink-muted">
      <div className="mx-auto max-w-7xl px-6 sm:px-8 py-16">
        {/* 4 columns */}
        <div className="grid grid-cols-2 gap-x-8 gap-y-10 sm:grid-cols-4">
          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-ink">Company</h3>
            <ul className="mt-4 space-y-2.5">
              {SFR_COMPANY_LINKS.map((link) => (
                <li key={link.label}>
                  <Link href={link.href} className="text-sm text-ink-muted hover:text-accent transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {networkSites.length > 0 && (
            <div>
              <h3 className="text-xs font-bold uppercase tracking-wider text-ink">Our Network</h3>
              <ul className="mt-4 space-y-2.5">
                {networkSites.map((site) => (
                  <li key={site.slug}>
                    <a href={site.publicUrl} {...EXTERNAL_LINK} className="text-sm text-ink-muted hover:text-accent transition-colors">
                      {site.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          )}

          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-ink">Privacy &amp; Terms</h3>
            <ul className="mt-4 space-y-2.5">
              {LEGAL_LINKS.map((link) => (
                <li key={link.label}>
                  <Link href={link.href} className="text-sm text-ink-muted hover:text-accent transition-colors">
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
