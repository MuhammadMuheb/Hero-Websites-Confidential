import { unstable_cache } from 'next/cache';
import { getDb } from '@/lib/firestore';

/**
 * Destination behind /go/:slug. The URL is the tour's own `affiliateUrl` in
 * Firestore (tours/{slug}), so editing it in the admin changes the redirect
 * without a deploy. Anything missing, malformed or non-https resolves to
 * undefined and /go answers 404 rather than redirecting somewhere unsafe.
 */
const lookup = unstable_cache(
  async (slug: string): Promise<string | undefined> => {
    const snap = await getDb().collection('tours').doc(slug).get();
    const url = snap.exists ? snap.data()?.affiliateUrl : undefined;
    return typeof url === 'string' && url.startsWith('https://') ? url : undefined;
  },
  ['affiliate:by-slug'],
  { tags: ['tours'], revalidate: 3600 },
);

export async function getAffiliateRedirect(slug: string): Promise<string | undefined> {
  if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slug)) return undefined;
  try {
    return await lookup(slug);
  } catch (error) {
    console.error('[affiliate-redirects] lookup failed', slug, error);
    return undefined;
  }
}
