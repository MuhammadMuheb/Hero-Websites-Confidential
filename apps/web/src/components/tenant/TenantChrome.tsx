import Link from 'next/link';
import type { NetworkSite } from '@/lib/network-types';
import type { SiteNavigation } from '@/lib/navigation';
import type { Tenant } from '@/lib/tenants';

/** Other live projects, never this one. */
const others = (tenant: Tenant, network: NetworkSite[]) => network.filter((n) => n.slug !== tenant.slug);

/** A link inside the site is a <Link>; a full address (https, mailto, tel) is a plain anchor. */
function NavAnchor({ href, className, children }: { href: string; className: string; children: React.ReactNode }) {
  return href.startsWith('/') ? (
    <Link href={href} className={className}>
      {children}
    </Link>
  ) : (
    <a href={href} className={className} {...(href.startsWith('https://') ? { target: '_blank', rel: 'noopener noreferrer' } : {})}>
      {children}
    </a>
  );
}

/**
 * Header of the generic site template. What it says (name, links, button) comes from the project's own navigation
 * in the admin, with sensible defaults, so every project shares this one component.
 */
export function TenantHeader({ tenant, network, nav }: { tenant: Tenant; network: NetworkSite[]; nav: SiteNavigation }) {
  const sites = others(tenant, network);
  return (
    <header className="sticky top-0 z-40 border-b border-line bg-cream/95 backdrop-blur">
      <div className="mx-auto flex max-w-7xl flex-wrap items-center gap-x-6 gap-y-2 px-4 py-3 sm:px-6 lg:px-8">
        <Link href="/" className="flex min-w-0 items-center gap-2" aria-label={`${nav.siteTitle} home`}>
          {tenant.logoUrl.startsWith('https://') && (
            // eslint-disable-next-line @next/next/no-img-element -- the logo is an arbitrary https image chosen in the admin
            <img src={tenant.logoUrl} alt="" className="h-8 w-auto max-w-[8rem] object-contain" />
          )}
          <span className="truncate font-hero text-lg font-black tracking-[-0.01em] text-ink">{nav.siteTitle}</span>
        </Link>
        <nav aria-label="Main" className="ml-auto flex flex-wrap items-center gap-x-5 gap-y-1 text-sm font-semibold text-ink">
          {nav.navbar.map((item) => (
            <NavAnchor key={`${item.label}-${item.href}`} href={item.href} className="py-1 transition-colors hover:text-brand">
              {item.label}
            </NavAnchor>
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
          <NavAnchor href={nav.cta.href} className="rounded-full bg-accent px-4 py-1.5 text-white transition-colors hover:bg-accent-hover">
            {nav.cta.label}
          </NavAnchor>
        </nav>
      </div>
    </header>
  );
}

export function TenantFooter({ tenant, network, nav }: { tenant: Tenant; network: NetworkSite[]; nav: SiteNavigation }) {
  const sites = others(tenant, network);
  const year = new Date().getFullYear();
  return (
    <footer className="mt-16 border-t border-line bg-cream-deep text-ink-muted">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 gap-x-8 gap-y-10 sm:grid-cols-4">
          {nav.footer.map((group) => (
            <div key={group.title}>
              <h3 className="text-xs font-bold uppercase tracking-wider text-ink">{group.title}</h3>
              <ul className="mt-4 space-y-2.5 text-sm">
                {group.links.map((item) => (
                  <li key={`${item.label}-${item.href}`}>
                    <NavAnchor href={item.href} className="transition-colors hover:text-brand">
                      {item.label}
                    </NavAnchor>
                  </li>
                ))}
              </ul>
            </div>
          ))}
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
          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-ink">Contact</h3>
            <ul className="mt-4 space-y-2.5 text-sm">
              {nav.contactEmail && (
                <li>
                  <a href={`mailto:${nav.contactEmail}`} className="transition-colors hover:text-brand">
                    {nav.contactEmail}
                  </a>
                </li>
              )}
              {nav.contactLines.map((line) => (
                <li key={line}>{line}</li>
              ))}
            </ul>
            {nav.contactBadge && <p className="mt-4 inline-flex rounded-control border border-line bg-white px-2.5 py-1.5 text-xs">{nav.contactBadge}</p>}
          </div>
        </div>
        <div className="mt-10 flex flex-col gap-2 text-xs sm:flex-row sm:items-center sm:justify-between">
          <p>
            &copy; {year} {nav.siteTitle}. All rights reserved.
          </p>
          {nav.bottomNote && <p>{nav.bottomNote}</p>}
        </div>
      </div>
    </footer>
  );
}
