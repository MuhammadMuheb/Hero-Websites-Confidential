import { notFound, redirect } from 'next/navigation';

interface RouteParams {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: RouteParams) {
  const { slug } = await params;
  return {
    robots: 'noindex',
  };
}

const TOUR_REDIRECTS: Record<string, string> = {
  'full-day-tivoli-both-villas': 'https://www.getyourguide.com/search?q=tivoli+both+villas&date=next30days',
  'half-day-villa-este-fountains': 'https://www.viator.com/search/activity?q=villa+este&loc=Rome',
  'private-tivoli-expert-guide': 'https://www.civitatis.com/en/rome/tivoli-tour/',
  'hadrians-villa-archaeology-focus': 'https://www.getyourguide.com/search?q=hadrians+villa+archaeology',
  'tivoli-gardens-photography-tour': 'https://www.viator.com/search/activity?q=tivoli+photography',
  'villa-este-skip-line-early-access': 'https://www.civitatis.com/en/rome/villa-este-tickets/',
  'tivoli-villages-countryside-tour': 'https://www.getyourguide.com/search?q=tivoli+villages+countryside',
  'tivoli-sunset-dinner-experience': 'https://www.viator.com/search/activity?q=tivoli+dinner',
};

export default async function GoRedirectPage({ params }: RouteParams) {
  const { slug } = await params;
  const redirectUrl = TOUR_REDIRECTS[slug];

  if (!redirectUrl) {
    notFound();
  }

  redirect(redirectUrl);
}
