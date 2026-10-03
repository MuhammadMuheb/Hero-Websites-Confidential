import type { Metadata } from 'next';
import { headers } from 'next/headers';
import { notFound } from 'next/navigation';
import type { ReactNode } from 'react';
import { TenantFooter, TenantHeader } from '@/components/tenant/TenantChrome';
import { getLiveNetworkSites } from '@/lib/network';
import { TENANT_VIA_PATH_HEADER } from '@/lib/tenant-host';
import { getTenantByDomain } from '@/lib/tenants';
import { themeVars } from '@/lib/theme';

type Params = Promise<{ site: string }>;

/**
 * The generic site template. One layout, any number of projects: /sites/<domain>/... is what the middleware
 * rewrites a project's own domain to. The project comes from Firestore (properties.domain); an unknown or
 * archived domain is a 404.
 */
export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { site } = await params;
  const tenant = await getTenantByDomain(site);
  if (!tenant) return {};
  // Opened by path (a preview, before DNS is ready) rather than by its own domain: keep it out of search engines.
  const viaPath = (await headers()).get(TENANT_VIA_PATH_HEADER) === '1';
  return {
    metadataBase: new URL(`https://${tenant.domain}`),
    title: { default: tenant.name, template: `%s | ${tenant.name}` },
    robots: viaPath ? { index: false, follow: false } : { index: true, follow: true },
  };
}

export default async function TenantLayout({ children, params }: { children: ReactNode; params: Params }) {
  const { site } = await params;
  const tenant = await getTenantByDomain(site);
  if (!tenant) notFound();
  const network = await getLiveNetworkSites();

  return (
    <div style={themeVars(tenant.theme)} className="min-h-screen bg-cream text-ink">
      <TenantHeader tenant={tenant} network={network} />
      <main>{children}</main>
      <TenantFooter tenant={tenant} network={network} />
    </div>
  );
}
