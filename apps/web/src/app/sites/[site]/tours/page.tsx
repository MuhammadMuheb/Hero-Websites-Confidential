import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { TourCard } from '@/components/cards/TourCard';
import { categorySlug, getTenantTours } from '@/lib/tenant-data';
import { getTenantByDomain } from '@/lib/tenants';

type Params = Promise<{ site: string }>;

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { site } = await params;
  const tenant = await getTenantByDomain(site);
  if (!tenant) return {};
  return { title: 'Tours', description: `All ${tenant.name} tours in one place.`, alternates: { canonical: '/tours' } };
}

export default async function TenantToursPage({ params }: { params: Params }) {
  const { site } = await params;
  const tenant = await getTenantByDomain(site);
  if (!tenant) notFound();

  const tours = await getTenantTours(tenant);
  const categories = Array.from(new Map(tours.flatMap((t) => t.niche).map((label) => [categorySlug(label), label])).entries());

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <h1 className="font-hero text-4xl font-black tracking-[-0.02em] text-ink">Tours</h1>
      <p className="mt-2 text-ink-muted">Every tour from {tenant.name}.</p>

      {categories.length > 1 && (
        <ul className="mt-6 flex flex-wrap gap-2" aria-label="Categories">
          {categories.map(([slug, label]) => (
            <li key={slug}>
              <Link href={`/tours/category/${slug}`} className="rounded-full border border-line bg-paper px-3 py-1 text-sm font-semibold text-ink transition-colors hover:border-brand hover:text-brand">
                {label}
              </Link>
            </li>
          ))}
        </ul>
      )}

      {tours.length === 0 ? (
        <p className="mt-10 rounded-[16px] border border-dashed border-line bg-paper px-6 py-12 text-center text-ink-muted">Tours will appear here soon.</p>
      ) : (
        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {tours.map((tour) => (
            <TourCard key={tour.slug} tour={tour} href={`/tours/${tour.slug}`} />
          ))}
        </div>
      )}
    </div>
  );
}
