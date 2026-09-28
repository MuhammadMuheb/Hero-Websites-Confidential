import type { Metadata } from 'next';
import { getPageDoc, SITE_DOMAIN } from '@/lib/firestore';
import { PageDocContent } from '@/components/PageDocContent';

export const revalidate = 3600;

export async function generateMetadata(): Promise<Metadata> {
  const page = await getPageDoc('terms');
  if (!page) return {};
  return {
    title: page.metaTitle,
    description: page.metaDesc,
    alternates: { canonical: `https://${SITE_DOMAIN}/terms` },
  };
}

export default function TermsOfServicePage() {
  return <PageDocContent slug="terms" />;
}
