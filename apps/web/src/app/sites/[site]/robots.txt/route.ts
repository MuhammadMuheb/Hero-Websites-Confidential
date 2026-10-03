import { headers } from 'next/headers';
import { TENANT_VIA_PATH_HEADER } from '@/lib/tenant-host';
import { getTenantByDomain } from '@/lib/tenants';

type Params = Promise<{ site: string }>;

const text = (body: string, status = 200) => new Response(body, { status, headers: { 'content-type': 'text/plain; charset=utf-8' } });

/** robots.txt of a project, served on its own domain. A project opened by path (a preview) is not indexable. */
export async function GET(_request: Request, { params }: { params: Params }) {
  const { site } = await params;
  const tenant = await getTenantByDomain(site);
  if (!tenant) return text('User-agent: *\nDisallow: /\n', 404);
  if ((await headers()).get(TENANT_VIA_PATH_HEADER) === '1') return text('User-agent: *\nDisallow: /\n');
  return text(`User-agent: *\nAllow: /\n\nSitemap: https://${tenant.domain}/sitemap.xml\n`);
}
