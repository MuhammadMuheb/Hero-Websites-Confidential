'use client';

import { usePathname } from 'next/navigation';
import Link from '@/components/NetworkLink';
import { NETWORK_SITES } from '@/lib/tours';

const FOOTER_LINKS = {
  explore: [
    { label: 'All Destinations', href: '/all-destinations' },
    { label: 'Guides', href: '/guides' },
    { label: 'Tours', href: '/tours' },
  ],
  company: [
    { label: 'About', href: '/about' },
    { label: 'Contact', href: '/contact' },
    { label: 'FAQ', href: '/faq' },
  ],
  legal: [
    { label: 'Privacy Policy', href: '/privacy' },
    { label: 'Terms of Service', href: '/terms' },
    { label: 'Cookie Policy', href: '/cookie-policy' },
  ],
};

export function Footer() {
  const pathname = usePathname();
  const segments = pathname.split('/').filter(Boolean);
  const networkSite = NETWORK_SITES.find((s) => s.slug === segments[0]);
  const basePrefix = networkSite ? `/${networkSite.slug}` : '';

  return (
    <footer className="bg-cream-deep border-t border-line mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Main Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
          {/* Brand */}
          <div>
            <h3 className="text-sm font-semibold text-gold-deep uppercase tracking-wider mb-4">
              {networkSite?.name || 'Street Food Rome'}
            </h3>
            <p className="text-xs text-ink/70 leading-relaxed">
              Authentic tours and guides from local experts
            </p>
          </div>

          {/* Explore */}
          <div>
            <h4 className="text-xs font-semibold text-ink uppercase tracking-wider mb-4">Explore</h4>
            <ul className="space-y-2">
              {FOOTER_LINKS.explore.map((link) => (
                <li key={link.href}>
                  <Link
                    href={basePrefix + link.href}
                    className="text-sm text-ink/70 hover:text-brand transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="text-xs font-semibold text-ink uppercase tracking-wider mb-4">Company</h4>
            <ul className="space-y-2">
              {FOOTER_LINKS.company.map((link) => (
                <li key={link.href}>
                  <Link
                    href={basePrefix + link.href}
                    className="text-sm text-ink/70 hover:text-brand transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Network */}
          <div>
            <h4 className="text-xs font-semibold text-ink uppercase tracking-wider mb-4">Network</h4>
            <ul className="space-y-2 max-h-32 overflow-y-auto">
              {NETWORK_SITES.map((site) => (
                <li key={site.slug}>
                  <Link
                    href={`/${site.slug}`}
                    className="text-sm text-ink/70 hover:text-brand transition-colors"
                  >
                    {site.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div className="h-px bg-line mb-8" />

        {/* Legal & Copyright */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
          <p className="text-xs text-ink/70">
            &copy; {new Date().getFullYear()} {networkSite?.name || 'Street Food Rome'}. All rights reserved.
          </p>
          <ul className="flex flex-wrap gap-6">
            {FOOTER_LINKS.legal.map((link) => (
              <li key={link.href}>
                <Link
                  href={basePrefix + link.href}
                  className="text-xs text-ink/70 hover:text-brand transition-colors"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </footer>
  );
}
