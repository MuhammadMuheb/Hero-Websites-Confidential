'use client';

import NextLink from 'next/link';
import { usePathname } from 'next/navigation';
import { NETWORK_SITES } from '@/lib/tours';

const NETWORK_SLUGS = new Set(NETWORK_SITES.map((site) => site.slug));

/** Street Food Rome is the root site: it lives at "/", not "/street-food-rome". */
const ROOT_SITE_SLUG = 'street-food-rome';

type Props = React.ComponentProps<typeof NextLink>;

/**
 * Drop-in replacement for next/link. When the current page is under a
 * network property prefix (/{slug}/...), any internal href gets that same
 * prefix — so "About" stays "/rome-vespa/about" instead of dropping back to
 * the bare "/about". A href that already targets a network property's own
 * root (e.g. the "Our Network" list's "/rome-vespa") is left alone — those
 * are deliberate cross-property jumps, not part of the current site tree.
 * External links, mailto:, hashes, and non-string hrefs pass through untouched.
 */
export default function Link({ href, ...rest }: Props) {
  const pathname = usePathname();
  const activeSlug = NETWORK_SLUGS.has(pathname.split('/')[1] ?? '') ? pathname.split('/')[1] : null;

  // Any link to /street-food-rome(/...) goes to the root site as-is — never prefixed, never 404.
  if (typeof href === 'string' && (href === `/${ROOT_SITE_SLUG}` || href.startsWith(`/${ROOT_SITE_SLUG}/`))) {
    const rootHref = href.slice(ROOT_SITE_SLUG.length + 1) || '/';
    return <NextLink href={rootHref} {...rest} />;
  }

  let resolvedHref = href;
  if (activeSlug && typeof href === 'string' && href.startsWith('/')) {
    const targetFirstSegment = href.split('/')[1] ?? '';
    const targetsNetworkRoot = NETWORK_SLUGS.has(targetFirstSegment);
    if (!targetsNetworkRoot) {
      resolvedHref = href === '/' ? `/${activeSlug}` : `/${activeSlug}${href}`;
    }
  }

  return <NextLink href={resolvedHref} {...rest} />;
}
