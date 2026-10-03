import { unstable_cache } from 'next/cache';
import { getDb } from '@/lib/firestore';
import type { NetworkSite } from '@/lib/network-types';
import { projectSiteUrl } from '@/lib/tenant-host';

/**
 * Our Network: every project that is not archived and has an address (a public URL, or a domain).
 *
 * A project appears as soon as it is created with a domain. It does not have to be "live": a project that is
 * still being built links to its own "Coming soon" page. A project without any address cannot be linked, so it is
 * left out until one is set. Archived projects are never listed.
 *
 * Read from Firestore `properties`. The admin refreshes the `network` tag whenever a project is created, edited or
 * deleted; if that call cannot reach this app, the list is at most a minute old.
 */
const readNetwork = unstable_cache(
  async (): Promise<NetworkSite[]> => {
    const snap = await getDb().collection('properties').select('name', 'domain', 'publicUrl', 'status').get();
    return snap.docs
      .map((d) => {
        const data = d.data();
        return { slug: d.id, name: typeof data.name === 'string' ? data.name.trim() : '', status: data.status, publicUrl: projectSiteUrl(data.publicUrl, data.domain) };
      })
      .filter((p): p is { slug: string; name: string; status: unknown; publicUrl: string } => p.status !== 'archived' && p.name !== '' && p.publicUrl !== null)
      .map(({ slug, name, publicUrl }) => ({ slug, name, publicUrl }))
      .sort((a, b) => a.name.localeCompare(b.name));
  },
  ['network:sites'],
  { tags: ['network'], revalidate: 60 },
);

/** Never throws: if Firestore is unavailable the network block is simply not shown. */
export async function getLiveNetworkSites(): Promise<NetworkSite[]> {
  try {
    return await readNetwork();
  } catch (error) {
    console.error('[network] could not read the projects, hiding the network block:', error instanceof Error ? error.message : error);
    return [];
  }
}
