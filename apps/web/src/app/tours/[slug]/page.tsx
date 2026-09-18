import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getAllTours, getTourBySlug, SITE_DOMAIN } from '@/lib/firestore';
import { TourPageContent } from '@/components/TourPageContent';
import { getCategory, getNeighborhood, getRelatedTours, getTourEntryBySeoSlug } from '@/lib/tours';
import { CATEGORY_HERO_IMAGES } from '@/lib/category-images';

export const dynamic = 'force-dynamic';

async function safeTourBySlug(slug: string) {
  try {
    return await getTourBySlug(slug);
  } catch (error) {
    console.error(`Error fetching tour ${slug}:`, error);
    return null;
  }
}

async function safeGetAllTours() {
  try {
    return await getAllTours();
  } catch (error) {
    console.error('Error fetching all tours:', error);
    return [];
  }
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const entry = getTourEntryBySeoSlug(slug);
  if (!entry) return {};

  const tour = await safeTourBySlug(entry.realSlug);
  if (!tour) return {};

  const description = tour.firstHandNotes ?? `${tour.title} — a Street Food Rome tour.`;
  const category = getCategory(entry.category);
  const fallbackImageUrl = category ? CATEGORY_HERO_IMAGES[category.slug]?.src : undefined;
  const heroImageUrl = tour.imageUrl ?? fallbackImageUrl;

  return {
    title: tour.title,
    description,
    alternates: { canonical: `https://${SITE_DOMAIN}/tours/${entry.seoSlug}` },
    openGraph: heroImageUrl
      ? {
          title: tour.title,
          description,
          url: `https://${SITE_DOMAIN}/tours/${entry.seoSlug}`,
          images: [{ url: heroImageUrl, alt: `${tour.title} — a Street Food Rome tour in ${tour.city}` }],
        }
      : undefined,
    twitter: heroImageUrl ? { card: 'summary_large_image', images: [heroImageUrl] } : undefined,
  };
}

export default async function TourPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const entry = getTourEntryBySeoSlug(slug);
  if (!entry) notFound();

  const tour = await safeTourBySlug(entry.realSlug);
  if (!tour) notFound();

  const allTours = await safeGetAllTours();
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
