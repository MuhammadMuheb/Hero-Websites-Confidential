import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { ACTIVE_NETWORK_SLUG, NETWORK_SITES } from '@/lib/tours';

const NETWORK_SLUGS = new Set(NETWORK_SITES.map((site) => site.slug));

/**
 * Only the one active network property (ACTIVE_NETWORK_SLUG) gets its
 * sub-pages rewritten to the real site content — e.g. /street-food-rome/about
 * transparently serves the same content as /about, with the browser URL
 * staying prefixed. The other 12 properties are separate, not-yet-built
 * projects: their sub-paths are left alone here and fall through to the
 * app/[slug]/[...rest] catch-all, which renders an "under construction"
 * placeholder instead of this site's content.
 *
 * The bare /{slug} root (any of the 13) is left untouched either way — it's
 * handled by app/[slug]/page.tsx directly, not by this rewrite, since there's
 * nothing to strip when there's only one segment.
 */
export function middleware(request: NextRequest) {
  const segments = request.nextUrl.pathname.split('/').filter(Boolean);

  // Affiliate links rendered inside a property (NetworkLink prefixes every
  // internal href) all share the one /go/:slug redirect handler.
  if (segments.length === 3 && segments[1] === 'go' && NETWORK_SLUGS.has(segments[0] ?? '')) {
    const url = request.nextUrl.clone();
    url.pathname = `/go/${segments[2]}`;
    return NextResponse.rewrite(url);
  }

  if (segments.length >= 2 && segments[0] === ACTIVE_NETWORK_SLUG) {
    const url = request.nextUrl.clone();
    url.pathname = `/${segments.slice(1).join('/')}`;
    return NextResponse.rewrite(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!_next|api|.*\\..*).*)'],
};
