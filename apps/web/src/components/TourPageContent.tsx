import Link from '@/components/NetworkLink';
import { SITE_DOMAIN, type TourDoc } from '@/lib/firestore';
import { tourHref, getTourEntryByRealSlug, getCategory } from '@/lib/tours';
import { CATEGORY_HERO_IMAGES } from '@/lib/category-images';
import { SafeImage } from './SafeImage';

interface CategoryCrumb {
  label: string;
  href: string;
}

interface NeighborhoodLink {
  name: string;
  href: string;
}

interface TourPageContentProps {
  tour: TourDoc;
  otherTours: { title: string; href: string }[];
  /** Category hub this tour belongs to, for the "Home / Category / Tour" breadcrumb. */
  category?: CategoryCrumb;
  /** Neighbourhood hub this tour is set in, if any — cross-links to /neighborhoods/{slug}. */
  neighborhood?: NeighborhoodLink;
}

export function TourPageContent({ tour, otherTours, category, neighborhood }: TourPageContentProps) {
  // Get fallback image from tour's category if tour doesn't have its own imageUrl
  const tourEntry = getTourEntryByRealSlug(tour.slug);
  const tourCategory = tourEntry ? getCategory(tourEntry.category) : undefined;
  const fallbackImageUrl = tourCategory ? CATEGORY_HERO_IMAGES[tourCategory.slug]?.src : undefined;
  const finalImageUrl = tour.imageUrl ?? fallbackImageUrl;

  // TouristTrip rather than Product/AggregateOffer: `priceBand` is a free-text
  // range (e.g. "€30-60"), not a structured min/max, so a numeric Offer would
  // mean fabricating a price we don't actually have. TouristTrip lets us
  // describe the tour honestly (name, description, itinerary partner) without
  // inventing offer data.
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'TouristTrip',
    name: tour.title,
    ...(tour.firstHandNotes ? { description: tour.firstHandNotes } : {}),
    ...(finalImageUrl ? { image: finalImageUrl } : {}),
    touristType: 'Food and culinary tourists',
    itinerary: { '@type': 'Place', name: `${tour.city}, Italy` },
    url: `https://${SITE_DOMAIN}${tourHref(tour.slug)}`,
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <section className="bg-paper-tint py-10 sm:py-14">
        <div className="mx-auto max-w-[1100px] px-6 sm:px-14">
          <nav className="text-sm text-faint">
            <Link href="/" className="hover:text-accent">
              Home
            </Link>
            <span className="mx-2">/</span>
            {category ? (
              <>
                <Link href={category.href} className="hover:text-accent">
                  {category.label}
                </Link>
                <span className="mx-2">/</span>
              </>
            ) : null}
            <span className="text-ink-muted">{tour.title}</span>
          </nav>

          <h1 className="mt-4 font-display text-3xl font-semibold tracking-tight text-ink sm:text-4xl">
            {tour.title}
          </h1>

          <div className="mt-3 flex flex-wrap items-center gap-3 text-sm text-ink-muted">
            {tour.duration ? (
              <span className="flex items-center gap-1.5">
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                  <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.6" />
                  <path d="M12 7v5l3.5 2" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
                </svg>
                {tour.duration}
              </span>
            ) : null}
            <span className="rounded-md bg-white px-2 py-1 text-xs font-semibold text-ink-muted">Free Cancellation</span>
            <span className="rounded-md bg-white px-2 py-1 text-xs font-semibold text-ink-muted">Small Group</span>
            {neighborhood ? (
              <Link
                href={neighborhood.href}
                className="rounded-md bg-white px-2 py-1 text-xs font-semibold text-ink-muted hover:text-accent"
              >
                Set in {neighborhood.name}
              </Link>
            ) : null}
          </div>
        </div>
      </section>

      <section className="py-10 sm:py-14">
        <div className="mx-auto grid max-w-[1100px] gap-10 px-6 sm:px-14 lg:grid-cols-[1.6fr_1fr]">
          <div>
            <div className="relative aspect-[16/10] overflow-hidden rounded-media bg-media">
              {finalImageUrl ? (
                <SafeImage
                  src={finalImageUrl}
                  alt={`${tour.title} — a Street Food Rome tour in ${tour.city}`}
                  fill
                  priority
                  sizes="(min-width: 1024px) 660px, 90vw"
                  className="object-cover"
                />
              ) : null}
            </div>

            {tour.firstHandNotes ? (
              <div className="mt-8">
                <h2 className="font-display text-xl font-semibold text-ink">What to expect</h2>
                <p className="mt-3 text-base leading-relaxed text-ink-muted">{tour.firstHandNotes}</p>
              </div>
            ) : null}
          </div>

          <aside className="h-fit rounded-media border border-line bg-white p-6 shadow-aside lg:sticky lg:top-24">
            {tour.priceBand ? (
              <p>
                <span className="font-display text-3xl font-semibold text-ink">{tour.priceBand}</span>
                <span className="ml-1 text-sm text-faint">/adult</span>
              </p>
            ) : null}

            <Link
              href={tour.affiliateUrl}
              target="_blank"
              rel="noopener noreferrer sponsored"
              className="mt-4 flex h-12 w-full items-center justify-center rounded-control bg-accent-gradient text-sm font-bold text-white shadow-glow transition-transform duration-200 ease-out hover:scale-[1.02] active:scale-[0.98]"
            >
              Check Availability
            </Link>

            <p className="mt-4 text-xs leading-relaxed text-faint">
              Booking is handled by GetYourGuide, our booking partner — you&rsquo;ll be taken to their site to
              confirm your date and pay. Free cancellation up to 24 hours before the tour.
            </p>
          </aside>
        </div>
      </section>

      {otherTours.length > 0 ? (
        <section className="bg-paper-tint py-14">
          <div className="mx-auto max-w-[1100px] px-6 sm:px-14">
            <h2 className="font-display text-2xl font-semibold text-ink">You might also like</h2>
            <ul className="mt-6 space-y-3">
              {otherTours.map((other) => (
                <li key={other.href}>
                  <Link href={other.href} className="text-sm font-bold text-accent hover:underline">
                    {other.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </section>
      ) : null}
    </>
  );
}
