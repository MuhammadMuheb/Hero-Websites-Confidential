import { notFound, redirect } from 'next/navigation';
import { getAffiliateRedirect } from '@/lib/affiliate-redirects';

interface RouteParams {
  params: Promise<{ slug: string }>;
}

export const metadata = { robots: { index: false, follow: false } };

/** Affiliate redirect: sends /go/{slug} to that tour's affiliateUrl in Firestore. */
export default async function GoRedirectPage({ params }: RouteParams) {
  const { slug } = await params;
  const redirectUrl = await getAffiliateRedirect(slug);

  if (!redirectUrl) {
    notFound();
  }

  redirect(redirectUrl);
}
