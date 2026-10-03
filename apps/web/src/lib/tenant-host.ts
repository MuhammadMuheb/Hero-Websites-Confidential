/**
 * Host helpers shared by the Edge middleware and server code. Pure functions, no Firebase.
 *
 * How sites are served: ONE deployment serves every project. The middleware looks at the request's
 * host. The legacy site (Street Food Rome: SITE_DOMAIN, localhost and *.vercel.app previews) is served by
 * the existing pages. Any other host is rewritten to /sites/<host>/..., where one generic template reads
 * that project from Firestore (properties.domain). Adding a project in the admin with a domain is all it
 * takes; there is no per-site code.
 */

/** Request header the middleware sets so the root layout can tell tenant requests from legacy ones. */
export const TENANT_HEADER = 'x-tenant-domain';
/** Set when a tenant was addressed by path (/sites/<domain>) instead of by host: previews and testing. */
export const TENANT_VIA_PATH_HEADER = 'x-tenant-via-path';
export const TENANT_PATH_PREFIX = '/sites/';

const FALLBACK_LEGACY_DOMAIN = 'streetfoodrome.com';

/** Lower-case host without port, trailing dot or leading "www.". Accepts a forwarded list ("a.com, b.com"). */
export function normalizeHost(raw: string | null | undefined): string {
  if (!raw) return '';
  const host = (raw.split(',')[0] ?? '').trim().toLowerCase().replace(/:\d+$/, '').replace(/\.$/, '');
  return host.startsWith('www.') ? host.slice(4) : host;
}

/** The domain the legacy (Street Food Rome) pages are served on. */
export function legacyDomain(env: Record<string, string | undefined> = process.env): string {
  return normalizeHost(env.SITE_DOMAIN || FALLBACK_LEGACY_DOMAIN);
}

/** Hosts that are always served by the legacy pages: its own domain, local development and Vercel previews. */
export function isLegacyHost(host: string, env: Record<string, string | undefined> = process.env): boolean {
  if (!host) return true;
  if (host === legacyDomain(env)) return true;
  if (host === 'localhost' || host === '127.0.0.1' || host === '[::1]' || host.endsWith('.localhost')) return true;
  if (host.endsWith('.vercel.app')) return true;
  const extra = (env.LEGACY_HOSTS || '').split(',').map(normalizeHost).filter(Boolean);
  return extra.includes(host);
}

/** A hostname a project may use as its domain (no scheme, path or port). */
export function isValidDomain(domain: string): boolean {
  return /^(?=.{1,253}$)([a-z0-9]([a-z0-9-]{0,61}[a-z0-9])?\.)+[a-z]{2,63}$/.test(domain);
}

/**
 * The address of a project's site: its public URL when that is a valid https URL, otherwise https:// plus its
 * domain, otherwise null. Only https addresses are returned, so the value is safe to use as a link.
 */
export function projectSiteUrl(publicUrl: unknown, domain: unknown): string | null {
  const url = typeof publicUrl === 'string' ? publicUrl.trim() : '';
  if (/^https:\/\/[^\s/$.?#][^\s]*$/i.test(url)) return url;
  const host = typeof domain === 'string' ? domain.trim().toLowerCase() : '';
  return isValidDomain(host) ? `https://${host}` : null;
}
