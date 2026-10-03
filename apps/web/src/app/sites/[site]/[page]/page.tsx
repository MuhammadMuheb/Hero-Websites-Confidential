import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { FaqContent, LegalContent, PageContent } from '@/components/tenant/PageContent';
import { getTenantPage, type TenantPage } from '@/lib/tenant-data';
import { getTenantByDomain, type Tenant } from '@/lib/tenants';

type Params = Promise<{ site: string; page: string }>;

/** The standard pages every project can have. `legal` pages are fields of the admin's single Legal page. */
const PAGES: Record<string, { label: string; kind: 'content' | 'faq' | 'legal'; legalKey?: string }> = {
  about: { label: 'About', kind: 'content' },
  contact: { label: 'Contact', kind: 'content' },
  faq: { label: 'FAQ', kind: 'faq' },
  privacy: { label: 'Privacy Policy', kind: 'legal', legalKey: 'privacy' },
  terms: { label: 'Terms of Service', kind: 'legal', legalKey: 'terms' },
  'cookie-policy': { label: 'Cookie Policy', kind: 'legal', legalKey: 'cookie' },
  'affiliate-disclosure': { label: 'Affiliate Disclosure', kind: 'legal', legalKey: 'affiliate' },
};

async function load(params: Params): Promise<{ tenant: Tenant; slug: string; def: (typeof PAGES)[string]; doc: TenantPage; html?: string } | null> {
  const { site, page } = await params;
  const def = PAGES[page];
  if (!def) return null;
  const tenant = await getTenantByDomain(site);
  if (!tenant) return null;

  if (def.kind === 'legal') {
    const legal = await getTenantPage(tenant, 'legal');
    const own = await getTenantPage(tenant, page); // an older project may keep one document per legal page
    const html = (typeof legal?.data[def.legalKey!] === 'string' ? (legal.data[def.legalKey!] as string) : undefined) ?? (typeof own?.data.bodyHtml === 'string' ? (own.data.bodyHtml as string) : undefined);
    if (!html?.trim()) return null;
    return { tenant, slug: page, def, doc: legal ?? own!, html };
  }

  const doc = await getTenantPage(tenant, page);
  return doc ? { tenant, slug: page, def, doc } : null;
}

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const found = await load(params);
  if (!found) return {};
  return { title: found.doc.metaTitle || found.def.label, description: found.doc.metaDesc || undefined, alternates: { canonical: `/${found.slug}` } };
}

export default async function TenantContentPage({ params }: { params: Params }) {
  const found = await load(params);
  if (!found) notFound();
  const { tenant, def, doc, html } = found;

  return (
    <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6">
      <h1 className="font-hero text-4xl font-black tracking-[-0.02em] text-ink">{def.kind === 'legal' ? def.label : doc.title || def.label}</h1>
      <div className="mt-8">
        {def.kind === 'faq' && <FaqContent data={doc.data} />}
        {def.kind === 'legal' && html && <LegalContent html={html} />}
        {def.kind === 'content' && <PageContent data={doc.data} />}
      </div>
      {found.slug === 'contact' && tenant.contactEmail && (
        <p className="mt-10 text-ink-muted">
          Email us at{' '}
          <a href={`mailto:${tenant.contactEmail}`} className="font-semibold text-brand hover:underline">
            {tenant.contactEmail}
          </a>
          .
        </p>
      )}
    </div>
  );
}
