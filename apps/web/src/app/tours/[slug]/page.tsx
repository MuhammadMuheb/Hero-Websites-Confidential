import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getAllTours, getTourBySlug, SITE_DOMAIN } from '@/lib/firestore';
import { TourPageContent } from '@/components/TourPageContent';
import { TOURS, getCategory, getNeighborhood, getRelatedTours, getTourEntryBySeoSlug } from '@/lib/tours';

export const dynamic = 'force-dynamic';

export async function generateStaticParams() {
  return TOURS.map((t) => ({ slug: t.seoSlug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const entry = getTourEntryBySeoSlug(slug);
  if (!entry) return {};

  const tour = await getTourBySlug(entry.realSlug);
  if (!tour) return {};

  const description = tour.firstHandNotes ?? `${tour.title} — a Street Food Rome tour.`;

  return {
    title: tour.title,
    description,
    alternates: { canonical: `https://${SITE_DOMAIN}/tours/${entry.seoSlug}` },
    openGraph: tour.imageUrl
      ? {
          title: tour.title,
          description,
          url: `https://${SITE_DOMAIN}/tours/${entry.seoSlug}`,
          images: [{ url: tour.imageUrl, alt: `${tour.title} — a Street Food Rome tour in ${tour.city}` }],
        }
      : undefined,
    twitter: tour.imageUrl ? { card: 'summary_large_image', images: [tour.imageUrl] } : undefined,
  };
}

export default async function TourPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const entry = getTourEntryBySeoSlug(slug);
  if (!entry) notFound();

  const tour = await getTourBySlug(entry.realSlug);
  if (!tour) notFound();

  const allTours = await getAllTours();
  const others = getRelatedTours(allTours, tour);

  const category = getCategory(entry.category);

  // Prefer the Firestore doc's own `neighborhood` field when set, falling back
  // to the registry's — most existing docs don't have it populated yet.
  const neighborhoodSlug = tour.neighborhood ?? entry.neighborhood;
  const neighborhood = neighborhoodSlug ? getNeighborhood(neighborhoodSlug) : undefined;

  return (
    <TourPageContent
      tour={tour}
      otherTours={others}
      category={category ? { label: category.name, href: `/tours/category/${category.slug}` } : undefined}
      neighborhood={neighborhood ? { name: neighborhood.name, href: `/neighborhoods/${neighborhood.slug}` } : undefined}
    />
  );
}
