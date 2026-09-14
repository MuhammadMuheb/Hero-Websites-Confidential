'use client';

import { useState } from 'react';
import Link from '@/components/NetworkLink';
import type { BlogPostDoc, TourDoc } from '@/lib/firestore';
import { NETWORK_SITES, getBlogPostForLandmark, tourHref } from '@/lib/tours';

/** Neighbourhood/market items link to /neighborhoods/{slug}; pure landmarks (no dedicated
 *  hub page exists or is planned for them) link to a matching blog post via `landmarkSlug`,
 *  falling back to /blog when no post is tagged for that landmark yet — never inert text. */
const ATTRACTIONS: { label: string; neighborhoodSlug: string | null; landmarkSlug: string | null }[] = [
  { label: 'Testaccio Market', neighborhoodSlug: 'testaccio', landmarkSlug: null },
  { label: "Campo de' Fiori Market", neighborhoodSlug: 'campo-de-fiori', landmarkSlug: null },
  { label: 'Trastevere', neighborhoodSlug: 'trastevere', landmarkSlug: null },
  { label: 'Jewish Ghetto', neighborhoodSlug: 'jewish-ghetto', landmarkSlug: null },
  { label: 'Trevi Fountain', neighborhoodSlug: null, landmarkSlug: 'trevi-fountain' },
  { label: 'Pantheon', neighborhoodSlug: null, landmarkSlug: 'pantheon' },
  { label: 'Piazza Navona', neighborhoodSlug: null, landmarkSlug: 'piazza-navona' },
  { label: 'Colosseum', neighborhoodSlug: null, landmarkSlug: 'colosseum' },
  { label: 'Vatican Museums', neighborhoodSlug: null, landmarkSlug: 'vatican-museums' },
  { label: 'Spanish Steps', neighborhoodSlug: null, landmarkSlug: 'spanish-steps' },
  { label: 'Monti', neighborhoodSlug: 'monti', landmarkSlug: null },
  { label: 'Prati', neighborhoodSlug: 'prati', landmarkSlug: null },
  { label: 'San Lorenzo', neighborhoodSlug: 'san-lorenzo', landmarkSlug: null },
  { label: 'Pigneto', neighborhoodSlug: 'pigneto', landmarkSlug: null },
  { label: 'Villa Borghese', neighborhoodSlug: null, landmarkSlug: 'villa-borghese' },
  { label: 'Circus Maximus', neighborhoodSlug: null, landmarkSlug: 'circus-maximus' },
  { label: 'Piazza del Popolo', neighborhoodSlug: null, landmarkSlug: 'piazza-del-popolo' },
  { label: 'Via del Corso', neighborhoodSlug: null, landmarkSlug: 'via-del-corso' },
  { label: 'Trionfale Market', neighborhoodSlug: 'trionfale', landmarkSlug: null },
  { label: 'Garbatella', neighborhoodSlug: 'garbatella', landmarkSlug: null },
];

const TABS = ['Top Attractions', 'Top Destinations', 'Top Tours'] as const;
type Tab = (typeof TABS)[number];

interface LinkItem {
  label: string;
  href: string | null;
  /** Suppresses the position-number prefix — used for the network sites' clean labels. */
  hideNumber?: boolean;
}

export function ExploreLinksSection({ tours, allBlogPosts }: { tours: TourDoc[]; allBlogPosts: BlogPostDoc[] }) {
  const [active, setActive] = useState<Tab>('Top Attractions');

  const attractionItems: LinkItem[] = ATTRACTIONS.map((a) => {
    if (a.neighborhoodSlug) return { label: a.label, href: `/neighborhoods/${a.neighborhoodSlug}` };
    if (a.landmarkSlug) {
      const post = getBlogPostForLandmark(allBlogPosts, a.landmarkSlug);
      return { label: a.label, href: post ? `/blog/${post.slug}` : '/blog' };
    }
    return { label: a.label, href: '/blog' };
  });

  // Sister properties in the same affiliate network — each links to its own internal page.
  const destinationItems: LinkItem[] = NETWORK_SITES.map((site) => ({
    label: site.name,
    href: `/${site.slug}`,
    hideNumber: true,
  }));

  const tourItems: LinkItem[] = [
    ...tours.slice(0, 19).map((tour) => ({ label: tour.title, href: tourHref(tour.slug) })),
    { label: 'All Rome Food Tours', href: '/tours' },
  ];

  const lists: Record<Tab, LinkItem[]> = {
    'Top Attractions': attractionItems,
    'Top Destinations': destinationItems,
    'Top Tours': tourItems,
  };

  const items = lists[active];

  return (
    <section className="bg-paper-tint py-14">
      <div className="mx-auto max-w-[1440px] px-6 sm:px-14">
        <h2 className="text-center font-sans text-xl font-extrabold tracking-tight text-ink sm:text-2xl">
          Places You Can Plan Your Next Trip
        </h2>

        <div className="mt-8 flex justify-center">
          <div className="inline-flex flex-wrap justify-center gap-1 rounded-full bg-line/70 p-1">
            {TABS.map((tab) => (
              <button
                key={tab}
                type="button"
                onClick={() => setActive(tab)}
                className={`rounded-full px-5 py-2.5 text-sm font-bold transition-all duration-200 ease-out ${
                  active === tab
                    ? 'bg-white text-ink shadow-tab'
                    : 'text-ink-muted hover:text-ink'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        <div className="mx-auto mt-12 grid max-w-[1100px] grid-cols-2 gap-x-8 gap-y-6 md:grid-cols-4 md:gap-x-12">
          {items.map((item, index) =>
            item.href ? (
              <Link
                key={item.label}
                href={item.href}
                className="flex items-baseline gap-2 text-[15px] text-ink-muted transition-colors hover:text-accent"
              >
                {item.hideNumber ? null : (
                  <span className="tabular-nums text-sm text-faint">{index + 1}.</span>
                )}
                <span className="font-medium">{item.label}</span>
              </Link>
            ) : (
              <span key={item.label} className="flex items-baseline gap-2 text-[15px] text-ink-muted">
                {item.hideNumber ? null : (
                  <span className="tabular-nums text-sm text-faint">{index + 1}.</span>
                )}
                <span className="font-medium">{item.label}</span>
              </span>
            ),
          )}
        </div>
      </div>
    </section>
  );
}
