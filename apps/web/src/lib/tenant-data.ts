import { unstable_cache } from 'next/cache';
import { getDb, type TourDoc } from '@/lib/firestore';
import { fromAdminData } from '@/lib/home-content';
import { SiteConfigSchema, type SiteConfig } from '@/lib/sites/config';
import type { Tenant } from '@/lib/tenants';

/**
 * Everything the generic site template reads for one project. All reads are keyed by the project, so any
 * number of projects share the same code. Reads never throw: a Firestore problem yields "nothing found",
 * and the template shows its empty state instead of an error page.
 */

type Raw = Record<string, unknown>;
const isObject = (v: unknown): v is Raw => typeof v === 'object' && v !== null && !Array.isArray(v);

/* ---------- tours ---------- */

/** A tour plus its long description (the older TourDoc has no such field). */
export type TenantTourDoc = TourDoc & { description: string | null };

/** "Street Food" and "street-food" are the same category in a URL. */
export const categorySlug = (label: string): string =>
  label.toLowerCase().normalize("NFKD").replace(/[̀-ͯ]/g, "").replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");

/** A card the admin has published (or an older card that predates the workflow). */
const isPublished = (d: Raw) => d.status === undefined || d.status === 'published';

function money(amount: number, currency: unknown): string {
  const code = typeof currency === 'string' && /^[A-Z]{3}$/.test(currency) ? currency : 'EUR';
  try {
    return new Intl.NumberFormat('en-GB', { style: 'currency', currency: code, maximumFractionDigits: 0 }).format(amount);
  } catch {
    return `${code} ${amount}`;
  }
}

/** Reads both shapes: the admin's cards (price{}, images[], category) and the older tours (priceBand, imageUrl, niche). */
export function toTourDoc(d: Raw): TenantTourDoc {
  const price = isObject(d.price) && typeof d.price.current === 'number' ? money(d.price.current, d.price.currency) : typeof d.priceBand === 'string' ? d.priceBand : null;
  const images = Array.isArray(d.images) ? d.images.filter(isObject) : [];
  const firstImage = images.sort((a, b) => Number(a.order ?? 0) - Number(b.order ?? 0))[0]?.url;
  const str = (v: unknown) => (typeof v === 'string' && v.trim() ? v.trim() : null);
  return {
    title: String(d.title ?? ''),
    slug: String(d.slug ?? ''),
    partner: str(d.partner) ?? '',
    partnerProductId: str(d.partnerProductId) ?? '',
    affiliateUrl: str(d.affiliateUrl) ?? '',
    priceBand: price,
    duration: str(d.duration),
    city: str(d.city) ?? '',
    niche: Array.isArray(d.niche) ? d.niche.filter((n): n is string => typeof n === 'string') : str(d.category) ? [String(d.category)] : [],
    imageUrl: str(firstImage) ?? str(d.imageUrl),
    firstHandNotes: str(d.shortDescription) ?? str(d.firstHandNotes),
    description: str(d.description),
    neighborhood: str(d.neighbourhood) ?? str(d.neighborhood),
    features: Array.isArray(d.features) ? d.features.filter((f): f is string => typeof f === 'string') : [],
    isTopPick: d.isTopPick === true,
    groupSize: null,
    language: null,
    propertySlug: str(d.propertySlug) ?? undefined,
  };
}

const readTours = unstable_cache(
  async (slug: string): Promise<TenantTourDoc[]> => {
    const snap = await getDb().collection('tours').where('propertySlug', '==', slug).get();
    return snap.docs
      .map((d) => d.data() as Raw)
      .filter(isPublished)
      .map(toTourDoc)
      .filter((t) => t.slug && t.title)
      .sort((a, b) => a.title.localeCompare(b.title));
  },
  ['tenant:tours'],
  { tags: ['tours'], revalidate: 300 },
);

export async function getTenantTours(tenant: Tenant): Promise<TenantTourDoc[]> {
  try {
    return await readTours(tenant.slug);
  } catch (error) {
    console.error('[tenant-data] tours failed for', tenant.slug, error instanceof Error ? error.message : error);
    return [];
  }
}

export async function getTenantTour(tenant: Tenant, slug: string): Promise<TenantTourDoc | null> {
  return (await getTenantTours(tenant)).find((t) => t.slug === slug) ?? null;
}

/* ---------- pages (About, Contact, FAQ, Legal ...) ---------- */

export interface TenantPage {
  title: string;
  metaTitle: string;
  metaDesc: string;
  /** The page content as the admin saved it (published.data), or the old flat fields. */
  data: Raw;
}

const readPage = unstable_cache(
  async (storedDomain: string, slug: string): Promise<TenantPage | null> => {
    const snap = await getDb().collection('sites').doc(storedDomain).collection('pages').doc(slug).get();
    const d = snap.data();
    if (!d) return null;
    const published = isObject(d.published) ? d.published : undefined;
    const meta = published && isObject(published.meta) ? published.meta : {};
    const data = published && isObject(published.data) ? published.data : (d as Raw);
    return {
      title: String(meta.title ?? d.title ?? ''),
      metaTitle: String(meta.metaTitle ?? d.metaTitle ?? ''),
      metaDesc: String(meta.metaDesc ?? d.metaDesc ?? ''),
      data,
    };
  },
  ['tenant:page'],
  { tags: ['pages'], revalidate: 300 },
);

export async function getTenantPage(tenant: Tenant, slug: string): Promise<TenantPage | null> {
  try {
    return await readPage(tenant.storedDomain, slug);
  } catch (error) {
    console.error('[tenant-data] page failed for', tenant.slug, slug, error instanceof Error ? error.message : error);
    return null;
  }
}

/* ---------- home ---------- */

const readHome = unstable_cache(
  async (slug: string): Promise<Raw | null> => {
    const snap = await getDb().collection('siteContent').doc(slug).get();
    const published = snap.data()?.published;
    return isObject(published) && isObject(published.data) ? published.data : null;
  },
  ['tenant:home'],
  { tags: ['home'], revalidate: 300 },
);

/**
 * The project's published Home as a SiteConfig, or null when it has none or it is incomplete. Null makes the
 * template show its "coming soon" page, so a half-finished project never shows a broken home.
 */
export async function getTenantHome(tenant: Tenant): Promise<SiteConfig | null> {
  let data: Raw | null;
  try {
    data = await readHome(tenant.slug);
  } catch (error) {
    console.error('[tenant-data] home failed for', tenant.slug, error instanceof Error ? error.message : error);
    return null;
  }
  if (!data) return null;

  const mapped = fromAdminData(data);
  const parsed = SiteConfigSchema.safeParse({
    ...mapped,
    slug: tenant.slug,
    name: tenant.name,
    domain: tenant.domain,
    description: mapped.metaDescription ?? '',
    contactEmail: mapped.contactEmail ?? tenant.contactEmail,
  });
  if (!parsed.success) {
    console.warn('[tenant-data] home of', tenant.slug, 'is incomplete:', parsed.error.issues.map((i) => i.path.join('.')).join(', '));
    return null;
  }
  return parsed.data;
}
