import { unstable_cache } from 'next/cache';
import { getDb } from '@/lib/firestore';
import { normalizeHost } from '@/lib/tenant-host';
import type { ProjectTheme } from '@/lib/theme';

/** One project, as the public site needs it. Comes from Firestore `properties`, written by the admin. */
export interface Tenant {
  slug: string;
  name: string;
  /** Normalised host, e.g. "example.com" (no www). */
  domain: string;
  /** The domain exactly as stored on the project: the key of its page documents (sites/{domain}/pages). */
  storedDomain: string;
  publicUrl: string;
  status: 'coming_soon' | 'live' | 'archived';
  contactEmail: string;
  logoUrl: string;
  theme: Partial<ProjectTheme>;
}

const NOT_FOUND = "tenant-not-found";

/**
 * A found project is cached (one minute, or until the admin refreshes the "network" tag). A domain that no project
 * owns throws instead of returning null: unstable_cache would otherwise cache the miss, and a project created a
 * moment ago would 404 until the cache expired.
 */
const lookup = unstable_cache(
  async (domain: string): Promise<Tenant> => {
    // A project may store its domain with or without "www.".
    const snap = await getDb().collection('properties').where('domain', 'in', [domain, `www.${domain}`]).limit(5).get();
    const doc = snap.docs.find((d) => d.data().status !== 'archived');
    if (!doc) throw new Error(NOT_FOUND);
    const d = doc.data();
    return {
      slug: doc.id,
      name: typeof d.name === 'string' && d.name.trim() ? d.name.trim() : doc.id,
      domain: normalizeHost(d.domain) || domain,
      storedDomain: typeof d.domain === "string" ? d.domain : domain,
      publicUrl: typeof d.publicUrl === 'string' ? d.publicUrl : '',
      status: d.status === 'live' || d.status === 'archived' ? d.status : 'coming_soon',
      contactEmail: typeof d.contactEmail === 'string' ? d.contactEmail : '',
      logoUrl: typeof d.logoUrl === 'string' ? d.logoUrl : '',
      theme: d.theme && typeof d.theme === 'object' ? (d.theme as Partial<ProjectTheme>) : {},
    };
  },
  ['tenant:by-domain'],
  // The admin revalidates the "network" tag on every project change, so edits show at once; otherwise a minute.
  { tags: ['network'], revalidate: 60 },
);

/** Misses are remembered for a few seconds so a flood of requests for unknown hosts does not become a flood of queries. */
const misses = new Map<string, number>();
const MISS_TTL_MS = 10_000;

/** The project that owns this domain, or null (unknown or archived). Never throws. */
export async function getTenantByDomain(rawDomain: string): Promise<Tenant | null> {
  const domain = normalizeHost(rawDomain);
  if (!domain) return null;
  if ((misses.get(domain) ?? 0) > Date.now()) return null;
  try {
    return await lookup(domain);
  } catch (error) {
    if (error instanceof Error && error.message === NOT_FOUND) {
      if (misses.size > 1000) misses.clear();
      misses.set(domain, Date.now() + MISS_TTL_MS);
      return null;
    }
    console.error('[tenants] lookup failed for', domain, error instanceof Error ? error.message : error);
    return null;
  }
}
