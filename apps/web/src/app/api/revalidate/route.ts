import { revalidateTag } from 'next/cache';
import { NextResponse, type NextRequest } from 'next/server';

/**
 * On-demand ISR webhook (blueprint §13.2.1). Content editors/CMS webhooks
 * call this after a Firestore write instead of waiting for the hourly
 * `revalidate` window. Protected by a shared secret — never left open, since
 * an unauthenticated version would let anyone force-refresh every page.
 */
const VALID_TAGS = new Set(['tours', 'pages', 'blog-posts', 'authors']);

export async function POST(request: NextRequest) {
  const secret = request.nextUrl.searchParams.get('secret');

  if (!process.env.REVALIDATE_SECRET) {
    return NextResponse.json({ error: 'REVALIDATE_SECRET is not configured on this deployment.' }, { status: 500 });
  }

  if (secret !== process.env.REVALIDATE_SECRET) {
    return NextResponse.json({ error: 'Invalid secret.' }, { status: 401 });
  }

  const tag = request.nextUrl.searchParams.get('tag');
  if (!tag || !VALID_TAGS.has(tag)) {
    return NextResponse.json({ error: `tag must be one of: ${Array.from(VALID_TAGS).join(', ')}` }, { status: 400 });
  }

  revalidateTag(tag);
  return NextResponse.json({ revalidated: true, tag, now: Date.now() });
}
