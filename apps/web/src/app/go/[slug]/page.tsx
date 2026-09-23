import { notFound, redirect } from 'next/navigation';
import { getAffiliateRedirect } from '@/lib/affiliate-redirects';

interface RouteParams {
  params: Promise<{ slug: string }>;
}

export const metadata = { robots: { index: false, follow: false } };

/**
 * Affiliate redirect for every property. Property-prefixed links
 * (/{property}/go/{slug}) are rewritten here by middleware.ts.
 */
export default async function GoRedirectPage({ params }: RouteParams) {
  const { slug } = await params;
  const redirectUrl = getAffiliateRedirect(slug);

  if (!redirectUrl) {
    notFound();
  }

  redirect(redirectUrl);
}
