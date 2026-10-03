import { getTenantHome, getTenantPage, getTenantTours } from '@/lib/tenant-data';
import { getTenantByDomain } from '@/lib/tenants';

type Params = Promise<{ site: string }>;

const escapeXml = (s: string) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

/** sitemap.xml of a project: its Home (when published), its tours and the standard pages that exist. */
export async function GET(_request: Request, { params }: { params: Params }) {
  const { site } = await params;
  const tenant = await getTenantByDomain(site);
  if (!tenant) return new Response('Not found', { status: 404 });

  const origin = `https://${tenant.domain}`;
  const paths: string[] = [];
  if (await getTenantHome(tenant)) paths.push('/');

  const tours = await getTenantTours(tenant);
  if (tours.length > 0) paths.push('/tours', ...tours.map((t) => `/tours/${t.slug}`));

  const pages = await Promise.all(['about', 'contact', 'faq'].map(async (slug) => ((await getTenantPage(tenant, slug)) ? `/${slug}` : null)));
  paths.push(...pages.filter((p): p is string => p !== null));

  const body = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${paths.map((p) => `  <url><loc>${escapeXml(origin + p)}</loc></url>`).join('\n')}\n</urlset>\n`;
  return new Response(body, { headers: { 'content-type': 'application/xml; charset=utf-8' } });
}
