import { NextResponse, type NextRequest } from 'next/server';
import { TENANT_HEADER, TENANT_PATH_PREFIX, TENANT_VIA_PATH_HEADER, isLegacyHost, legacyDomain, normalizeHost } from '@/lib/tenant-host';

/**
 * Multi-site routing (see lib/tenant-host.ts). The legacy host keeps the existing pages; every other host
 * is rewritten to /sites/<host>/<path>, so one generic template serves any number of projects.
 *
 * Both tenant headers are always rewritten here, never trusted from the client.
 */
export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const headers = new Headers(request.headers);
  headers.delete(TENANT_HEADER);
  headers.delete(TENANT_VIA_PATH_HEADER);

  const host = normalizeHost(request.headers.get('x-forwarded-host') ?? request.headers.get('host'));

  // A tenant addressed by path, e.g. https://<preview>.vercel.app/sites/example.com/tours (testing a
  // project before its DNS is ready). Never allowed on the production legacy domain: that would show
  // another project's pages under it.
  if (pathname.startsWith(TENANT_PATH_PREFIX)) {
    if (host === legacyDomain()) return new NextResponse('Not found', { status: 404 });
    const domain = normalizeHost(pathname.split('/')[2]);
    headers.set(TENANT_HEADER, domain);
    headers.set(TENANT_VIA_PATH_HEADER, '1');
    return NextResponse.next({ request: { headers } });
  }

  if (isLegacyHost(host)) return NextResponse.next({ request: { headers } });

  headers.set(TENANT_HEADER, host);
  const url = request.nextUrl.clone();
  url.pathname = `${TENANT_PATH_PREFIX}${host}${pathname === '/' ? '' : pathname}`;
  return NextResponse.rewrite(url, { request: { headers } });
}

export const config = {
  // Everything except Next internals, static files and the API (revalidate, search) which answer on any host.
  matcher: ['/((?!_next/static|_next/image|favicon.ico|api/).*)'],
};
