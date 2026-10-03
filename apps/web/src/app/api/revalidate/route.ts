import { timingSafeEqual } from 'node:crypto';
import { revalidateTag } from 'next/cache';
import { NextResponse, type NextRequest } from 'next/server';

/**
 * On-demand ISR webhook (blueprint §13.2.1). The admin calls this after a publish instead of
 * waiting for the hourly `revalidate` window. Protected by a shared secret: never left open, since
 * an unauthenticated version would let anyone force-refresh every page.
 *
 * Admin contract (apps/admin revalidateWeb):
 *   POST /api/revalidate
 *   header  x-revalidate-secret: <REVALIDATE_SECRET>
 *   body    { "tag": "home" }
 *
 * The older form (?secret=...&tag=...) still works until every caller has switched, but a secret in
 * a URL ends up in logs, so prefer the header.
 */
const VALID_TAGS = new Set(['tours', 'pages', 'blog-posts', 'authors', 'home', 'network', 'navigation']);

function sameSecret(given: string | null, expected: string): boolean {
  if (!given) return false;
  const a = Buffer.from(given);
  const b = Buffer.from(expected);
  return a.length === b.length && timingSafeEqual(a, b);
}

async function readTag(request: NextRequest): Promise<string | null> {
  const fromQuery = request.nextUrl.searchParams.get('tag');
  if (fromQuery) return fromQuery;
  try {
    const body = (await request.json()) as { tag?: unknown };
    return typeof body.tag === 'string' ? body.tag : null;
  } catch {
    return null; // no body, or not JSON
  }
}

export async function POST(request: NextRequest) {
  const expected = process.env.REVALIDATE_SECRET;
  if (!expected) {
    return NextResponse.json({ error: 'REVALIDATE_SECRET is not configured on this deployment.' }, { status: 500 });
  }

  const given = request.headers.get('x-revalidate-secret') ?? request.nextUrl.searchParams.get('secret');
  if (!sameSecret(given, expected)) {
    return NextResponse.json({ error: 'Invalid secret.' }, { status: 401 });
  }

  const tag = await readTag(request);
  if (!tag || !VALID_TAGS.has(tag)) {
    return NextResponse.json({ error: `tag must be one of: ${Array.from(VALID_TAGS).join(', ')}` }, { status: 400 });
  }

  revalidateTag(tag);
  return NextResponse.json({ revalidated: true, tag, now: Date.now() });
}
