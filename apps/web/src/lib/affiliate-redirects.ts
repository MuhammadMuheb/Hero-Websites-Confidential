import { FEATURED_TOURS as UC_TOURS } from '@/lib/underground-colosseum';
import { FEATURED_TOURS as PV_TOURS } from '@/lib/private-vatican';
import { FEATURED_TOURS as PDT_TOURS } from '@/lib/pompeii-day-trip';
import { FEATURED_TOURS as RV_TOURS } from '@/lib/rome-vespa';
import { FEATURED_TOURS as GCR_TOURS } from '@/lib/golf-cart-rome';
import { FEATURED_TOURS as CIR_TOURS } from '@/lib/cooking-in-rome';
import { FEATURED_TOURS as RPC_TOURS } from '@/lib/rome-pizza-class';
import { FEATURED_TOURS as TC_TOURS } from '@/lib/tiramisu-class';
import { FEATURED_TOURS as TDT_TOURS } from '@/lib/tuscany-day-trip';
import { FEATURED_TOURS as ADT_TOURS } from '@/lib/amalfi-day-trip';
import { FEATURED_TOURS as TVDT_TOURS } from '@/lib/tivoli-day-trip';
import { FEATURED_TOURS as NSF_TOURS } from '@/lib/naples-street-food';

/**
 * Single registry behind every /go/:slug affiliate link across the network.
 *
 * Each property's FEATURED_TOURS lists partner listings by partner + title,
 * but none of them carry a destination URL — so every "Check availability"
 * button used to dead-end. Until real partner deep links (with affiliate IDs)
 * are added to a tour's `url`, the redirect lands on the partner's own search
 * results for that tour's title, which is at least the right product on the
 * right site. Add a `url` to an entry in EXPLICIT_REDIRECTS to override.
 */

interface RedirectSource {
  partner: string;
  slug: string;
  title: string;
}

/** Hand-verified destinations; win over the generated partner search. */
const EXPLICIT_REDIRECTS: Record<string, string> = {
  'full-day-tivoli-both-villas': 'https://www.getyourguide.com/search?q=tivoli+both+villas&date=next30days',
  'half-day-villa-este-fountains': 'https://www.viator.com/search/activity?q=villa+este&loc=Rome',
  'private-tivoli-expert-guide': 'https://www.civitatis.com/en/rome/tivoli-tour/',
  'hadrians-villa-archaeology-focus': 'https://www.getyourguide.com/search?q=hadrians+villa+archaeology',
  'tivoli-gardens-photography-tour': 'https://www.viator.com/search/activity?q=tivoli+photography',
  'villa-este-skip-line-early-access': 'https://www.civitatis.com/en/rome/villa-este-tickets/',
  'tivoli-villages-countryside-tour': 'https://www.getyourguide.com/search?q=tivoli+villages+countryside',
  'tivoli-sunset-dinner-experience': 'https://www.viator.com/search/activity?q=tivoli+dinner',
};

const ALL_TOURS: RedirectSource[] = [
  ...UC_TOURS,
  ...PV_TOURS,
  ...PDT_TOURS,
  ...RV_TOURS,
  ...GCR_TOURS,
  ...CIR_TOURS,
  ...RPC_TOURS,
  ...TC_TOURS,
  ...TDT_TOURS,
  ...ADT_TOURS,
  ...TVDT_TOURS,
  ...NSF_TOURS,
];

function partnerSearchUrl(partner: string, title: string): string {
  const q = encodeURIComponent(title);
  switch (partner.toLowerCase()) {
    case 'viator':
      return `https://www.viator.com/searchResults/all?text=${q}`;
    case 'tiqets':
      return `https://www.tiqets.com/en/search/?q=${q}`;
    case 'civitatis':
      return `https://www.civitatis.com/en/search/?q=${q}`;
    case 'getyourguide':
    default:
      return `https://www.getyourguide.com/s/?q=${q}`;
  }
}

export function getAffiliateRedirect(slug: string): string | undefined {
  if (EXPLICIT_REDIRECTS[slug]) return EXPLICIT_REDIRECTS[slug];
  const tour = ALL_TOURS.find((t) => t.slug === slug);
  return tour ? partnerSearchUrl(tour.partner, tour.title) : undefined;
}

export function getAllAffiliateSlugs(): string[] {
  return [...new Set([...Object.keys(EXPLICIT_REDIRECTS), ...ALL_TOURS.map((t) => t.slug)])];
}
