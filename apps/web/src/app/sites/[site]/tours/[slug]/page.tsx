import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getTenantTour } from '@/lib/tenant-data';
import { getTenantByDomain } from '@/lib/tenants';

type Params = Promise<{ site: string; slug: string }>;

async function load(params: Params) {
  const { site, slug } = await params;
  const tenant = await getTenantByDomain(site);
  if (!tenant) return null;
  const tour = await getTenantTour(tenant, slug);
  return tour ? { tenant, tour } : null;
}

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const found = await load(params);
  if (!found) return {};
  const { tour } = found;
  const description = tour.firstHandNotes ?? `${tour.title}${tour.city ? ` in ${tour.city}` : ''}.`;
  return {
    title: tour.title,
    description,
    alternates: { canonical: `/tours/${tour.slug}` },
    openGraph: tour.imageUrl ? { title: tour.title, description, images: [{ url: tour.imageUrl, alt: tour.title }] } : undefined,
  };
}

export default async function TenantTourPage({ params }: { params: Params }) {
  const found = await load(params);
  if (!found) notFound();
  const { tour } = found;
  const paragraphs = (tour.description ?? '').split(/\n{2,}/).map((p) => p.trim()).filter(Boolean);
  const bookable = tour.affiliateUrl.startsWith('https://');

  return (
    <article className="mx-auto max-w-4xl px-4 py-12 sm:px-6">
      <p className="text-sm text-ink-muted">
        <Link href="/tours" className="hover:text-brand">
          Tours
        </Link>{' '}
        / {tour.title}
      </p>
      <h1 className="mt-2 font-hero text-4xl font-black tracking-[-0.02em] text-ink">{tour.title}</h1>

      <ul className="mt-4 flex flex-wrap gap-2 text-sm font-semibold text-ink">
        {tour.city && <li className="rounded-full border border-line bg-paper px-3 py-1">{tour.city}</li>}
        {tour.duration && <li className="rounded-full border border-line bg-paper px-3 py-1">{tour.duration}</li>}
        {tour.priceBand && <li className="rounded-full border border-line bg-paper px-3 py-1">From {tour.priceBand}</li>}
      </ul>

      {tour.imageUrl && (
        // eslint-disable-next-line @next/next/no-img-element -- an arbitrary https image chosen in the admin
        <img src={tour.imageUrl} alt={tour.title} className="mt-8 aspect-[16/9] w-full rounded-[20px] object-cover" />
      )}

      {tour.firstHandNotes && <p className="mt-8 text-lg leading-relaxed text-ink">{tour.firstHandNotes}</p>}
      {paragraphs.length > 0 && (
        <div className="mt-6 space-y-4 leading-relaxed text-ink-muted">
          {paragraphs.map((p, i) => (
            <p key={i}>{p}</p>
          ))}
        </div>
      )}

      {bookable && (
        <a href={tour.affiliateUrl} target="_blank" rel="sponsored noopener" className="mt-10 inline-flex rounded-full bg-brand px-7 py-3 text-base font-bold text-white shadow-glow transition-colors hover:bg-brand-dark">
          Check availability
        </a>
      )}
    </article>
  );
}
