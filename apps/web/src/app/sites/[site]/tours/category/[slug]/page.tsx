import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { TourCard } from '@/components/cards/TourCard';
import { categorySlug, getTenantTours } from '@/lib/tenant-data';
import { getTenantByDomain } from '@/lib/tenants';

type Params = Promise<{ site: string; slug: string }>;

async function load(params: Params) {
  const { site, slug } = await params;
  const tenant = await getTenantByDomain(site);
  if (!tenant) return null;
  const all = await getTenantTours(tenant);
  const tours = all.filter((t) => t.niche.some((label) => categorySlug(label) === slug));
  const label = tours[0]?.niche.find((l) => categorySlug(l) === slug);
  return label ? { tenant, tours, label, slug } : null;
}

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const found = await load(params);
  if (!found) return {};
  return { title: `${found.label} tours`, alternates: { canonical: `/tours/category/${found.slug}` } };
}

export default async function TenantCategoryPage({ params }: { params: Params }) {
  const found = await load(params);
  if (!found) notFound();

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <p className="text-sm text-ink-muted">
        <Link href="/tours" className="hover:text-brand">
          Tours
        </Link>{' '}
        / {found.label}
      </p>
      <h1 className="mt-2 font-hero text-4xl font-black tracking-[-0.02em] text-ink">{found.label}</h1>
      <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {found.tours.map((tour) => (
          <TourCard key={tour.slug} tour={tour} href={`/tours/${tour.slug}`} />
        ))}
      </div>
    </div>
  );
}
