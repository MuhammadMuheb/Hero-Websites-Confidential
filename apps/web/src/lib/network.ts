import { unstable_cache } from 'next/cache';
import { getDb } from '@/lib/firestore';
import type { NetworkSite } from '@/lib/network-types';

/**
 * Our Network: the projects the admin has set to status "live" with an https publicUrl.
 * Read from Firestore `properties`; refreshed by the admin through the `network` tag, otherwise hourly.
 * A project that is not live, or has no valid URL, is never listed.
 */
const readLive = unstable_cache(
  async (): Promise<NetworkSite[]> => {
    const snap = await getDb().collection('properties').where('status', '==', 'live').get();
    return snap.docs
      .map((d) => ({ slug: d.id, name: d.data().name, publicUrl: d.data().publicUrl }))
      .filter((p): p is NetworkSite => typeof p.name === 'string' && p.name.trim() !== '' && typeof p.publicUrl === 'string' && p.publicUrl.startsWith('https://'))
      .map((p) => ({ slug: p.slug, name: p.name.trim(), publicUrl: p.publicUrl }))
      .sort((a, b) => a.name.localeCompare(b.name));
  },
  ['network:live'],
  { tags: ['network'], revalidate: 3600 },
);

/** Never throws: if Firestore is unavailable the network block is simply not shown. */
export async function getLiveNetworkSites(): Promise<NetworkSite[]> {
  try {
    return await readLive();
  } catch (error) {
    console.error('[network] could not read live sites, hiding the network block:', error instanceof Error ? error.message : error);
    return [];
  }
}
