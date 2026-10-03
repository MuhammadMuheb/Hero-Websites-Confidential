import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { ComingSoon } from '@/components/tenant/ComingSoon';
import { TenantHome } from '@/components/tenant/TenantHome';
import { getTenantHome, getTenantTours } from '@/lib/tenant-data';
import { getTenantByDomain } from '@/lib/tenants';

type Params = Promise<{ site: string }>;

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { site } = await params;
  const tenant = await getTenantByDomain(site);
  if (!tenant) return {};
  const config = await getTenantHome(tenant);
  if (!config) return { title: { absolute: tenant.name }, robots: { index: false, follow: true } };
  return {
    title: { absolute: config.metaTitle || tenant.name },
    description: config.metaDescription,
    alternates: { canonical: '/' },
    openGraph: { title: config.metaTitle || tenant.name, description: config.metaDescription, images: [{ url: config.heroImage.src, alt: config.heroImage.alt }] },
  };
}

export default async function TenantHomePage({ params }: { params: Params }) {
  const { site } = await params;
  const tenant = await getTenantByDomain(site);
  if (!tenant) notFound();

  const config = await getTenantHome(tenant);
  // No complete published Home yet: a clean "coming soon" page instead of a broken one.
  if (!config) return <ComingSoon tenant={tenant} />;
  return <TenantHome config={config} tours={await getTenantTours(tenant)} />;
}
