'use client';

import { createContext, useContext, type ReactNode } from 'react';
import type { NetworkSite } from '@/lib/network-types';

const NetworkContext = createContext<NetworkSite[]>([]);

/** The root layout (a server component) reads Firestore once and hands the list to every client component below. */
export function NetworkProvider({ sites, children }: { sites: NetworkSite[]; children: ReactNode }) {
  return <NetworkContext.Provider value={sites}>{children}</NetworkContext.Provider>;
}

export function useNetworkSites(): NetworkSite[] {
  return useContext(NetworkContext);
}

/** Shared markup attributes for links that leave this site. */
export const EXTERNAL_LINK = { target: '_blank', rel: 'noopener' } as const;
