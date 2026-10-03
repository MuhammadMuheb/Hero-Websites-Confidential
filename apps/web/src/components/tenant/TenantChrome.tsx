import Link from 'next/link';
import type { NetworkSite } from '@/lib/network-types';
import type { Tenant } from '@/lib/tenants';

const NAV = [
  { label: 'Tours', href: '/tours' },
  { label: 'About', href: '/about' },
  { label: 'FAQ', href: '/faq' },
  { label: 'Contact', href: '/contact' },
];

const LEGAL = [
  { label: 'Privacy Policy', href: '/privacy' },
  { label: 'Terms of Service', href: '/terms' },
  { label: 'Cookie Policy', href: '/cookie-policy' },
  { label: 'Affiliate Disclosure', href: '/affiliate-disclosure' },
];

/** Other live projects, never this one. */
const others = (tenant: Tenant, network: NetworkSite[]) => network.filter((n) => n.slug !== tenant.slug);

/** Header of the generic site template: the project's name or logo, a few links, and Our Network. */
export function TenantHeader({ tenant, network }: { tenant: Tenant; network: NetworkSite[] }) {
  const sites = others(tenant, network);
  return (
    <header className="sticky top-0 z-40 border-b border-line bg-cream/95 backdrop-blur">
      <div className="mx-auto flex max-w-7xl flex-wrap items-center gap-x-6 gap-y-2 px-4 py-3 sm:px-6 lg:px-8">
        <Link href="/" className="flex min-w-0 items-center gap-2" aria-label={`${tenant.name} home`}>
          {tenant.logoUrl.startsWith('https://') && (
            // eslint-disable-next-line @next/next/no-img-element -- the logo is an arbitrary https image chosen in the admin
            <img src={tenant.logoUrl} alt="" className="h-8 w-auto max-w-[8rem] object-contain" />
          )}
          <span className="truncate font-hero text-lg font-black tracking-[-0.01em] text-ink">{tenant.name}</span>
        </Link>
        <nav aria-label="Main" className="ml-auto flex flex-wrap items-center gap-x-5 gap-y-1 text-sm font-semibold text-ink">
          {NAV.map((item) => (
            <Link key={item.href} href={item.href} className="py-1 transition-colors hover:text-brand">
              {item.label}
            </Link>
          ))}
          {sites.length > 0 && (
            <details className="relative">
              <summary className="cursor-pointer list-none py-1 transition-colors hover:text-brand">Our Network</summary>
              <ul className="absolute right-0 top-full z-50 mt-2 w-64 rounded-[16px] border border-line bg-paper p-2 shadow-dropdown">
                {sites.map((site) => (
                  <li key={site.slug}>
                    <a href={site.publicUrl} target="_blank" rel="noopener" className="block rounded-lg px-3 py-2 font-semibold transition-colors hover:bg-accent-soft hover:text-brand">
                      {site.name}
                    </a>
                  </li>
                ))}
              </ul>
            </details>
          )}
        </nav>
      </div>
    </header>
  );
}

export function TenantFooter({ tenant, network }: { tenant: Tenant; network: NetworkSite[] }) {
  const sites = others(tenant, network);
  const year = new Date().getFullYear();
  return (
    <footer className="mt-16 border-t border-line bg-cream-deep text-ink-muted">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 gap-x-8 gap-y-10 sm:grid-cols-4">
          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-ink">{tenant.name}</h3>
            <ul className="mt-4 space-y-2.5 text-sm">
              <li>
                <Link href="/" className="transition-colors hover:text-brand">
                  Home
                </Link>
              </li>
              {NAV.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className="transition-colors hover:text-brand">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-ink">Privacy &amp; Terms</h3>
            <ul className="mt-4 space-y-2.5 text-sm">
              {LEGAL.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className="transition-colors hover:text-brand">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          {sites.length > 0 && (
            <div>
              <h3 className="text-xs font-bold uppercase tracking-wider text-ink">Our Network</h3>
              <ul className="mt-4 space-y-2.5 text-sm">
                {sites.map((site) => (
                  <li key={site.slug}>
                    <a href={site.publicUrl} target="_blank" rel="noopener" className="transition-colors hover:text-brand">
                      {site.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          )}
          {tenant.contactEmail && (
            <div>
              <h3 className="text-xs font-bold uppercase tracking-wider text-ink">Contact</h3>
              <p className="mt-4 text-sm">
                <a href={`mailto:${tenant.contactEmail}`} className="transition-colors hover:text-brand">
                  {tenant.contactEmail}
                </a>
              </p>
            </div>
          )}
        </div>
        <p className="mt-10 text-xs">
          &copy; {year} {tenant.name}. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
