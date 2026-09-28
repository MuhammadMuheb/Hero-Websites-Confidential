import Link from '@/components/NetworkLink';
import type { TourDoc } from '@/lib/firestore';
import { SafeImage } from '@/components/SafeImage';
import { tourHref } from '@/lib/tours';

interface TourCardProps {
  tour: TourDoc;
  priority?: boolean;
  href?: string;
  /** Smaller card (category rows): hides chips and notes. */
  compact?: boolean;
  /** Rank in category: shows as #1, #2, #3 in compact mode */
  rank?: number;
}

export function TourCard({ tour, priority, href, compact, rank }: TourCardProps) {
  const chips = (tour.features ?? []).slice(0, 2);

  if (compact) {
    return (
      <Link
        id={`tour-${tour.slug}`}
        href={href ?? tourHref(tour.slug)}
        className="group flex flex-col overflow-hidden rounded-[18px] border border-line bg-paper p-2.5 shadow-card-soft transition-all duration-300 hover:-translate-y-0.5 hover:shadow-card-hover"
      >
        {/* Image */}
        <div className="relative aspect-[3/2] overflow-hidden rounded-[14px] bg-media">
          {tour.imageUrl ? (
            <SafeImage
              src={tour.imageUrl}
              alt={`${tour.title}, ${tour.city}`}
              fill
              priority={priority}
              sizes="(min-width: 1280px) 200px, (min-width: 1024px) 18vw, (min-width: 640px) 35vw, 75vw"
              className="object-cover transition-transform duration-500 group-hover:scale-105"
            />
          ) : null}
          {rank ? (
            <span className="absolute left-3 top-3 rounded-full bg-gold px-2.5 py-0.5 text-xs font-bold text-ink">
              #{rank}
            </span>
          ) : null}
        </div>

        {/* Content */}
        <div className="flex flex-1 flex-col px-2.5 pt-3 pb-2">
          {/* Feature chips */}
          {chips.length > 0 && (
            <div className="flex flex-wrap gap-1 mb-2">
              {chips.slice(0, 2).map((chip) => (
                <span key={chip} className="bg-accent-soft text-brand-dark px-2 py-0.5 text-[11px] font-semibold rounded-md">
                  {chip}
                </span>
              ))}
            </div>
          )}

          {/* Title */}
          <h3 className="font-hero text-[15px] font-bold text-ink leading-snug line-clamp-2">
            {tour.title}
          </h3>

          {/* Duration */}
          {tour.duration && (
            <div className="mt-2 flex items-center gap-2 text-[13px] text-ink-muted">
              <span>🕐</span>
              <span>{tour.duration}</span>
            </div>
          )}

          {/* Price */}
          {tour.priceBand && (
            <div className="mt-auto pt-3 flex items-end justify-between">
              <span className="text-[13px] font-bold text-brand group-hover:underline">View tour</span>
              <span className="text-right leading-none">
                <span className="block text-[11px] font-semibold text-ink-muted">from</span>
                <span className="block font-hero text-[18px] font-extrabold text-ink">{tour.priceBand}</span>
              </span>
            </div>
          )}
        </div>
      </Link>
    );
  }

  return (
    <Link
      id={`tour-${tour.slug}`}
      href={href ?? tourHref(tour.slug)}
      className="group flex h-full flex-col overflow-hidden rounded-[22px] border border-ink/5 bg-paper shadow-card-soft transition-all duration-300 hover:-translate-y-1 hover:shadow-card-hover"
    >
      {/* Image */}
      <div className="relative aspect-[4/3] overflow-hidden bg-media">
        {tour.imageUrl ? (
          <SafeImage
            src={tour.imageUrl}
            alt={`${tour.title}, ${tour.city}`}
            fill
            priority={priority}
            sizes="(min-width: 1280px) 290px, (min-width: 1024px) 23vw, (min-width: 640px) 48vw, 85vw"
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : null}
        {tour.isTopPick && (
          <span className="absolute right-4 top-4 rounded-full bg-gold px-3 py-1 text-xs font-bold uppercase tracking-wide text-ink shadow-card-soft">
            Top pick
          </span>
        )}
      </div>

      {/* Content */}
      <div className="flex flex-1 flex-col p-5">
        {/* Title */}
        <h3 className="font-hero text-[17px] font-extrabold leading-snug text-ink group-hover:text-brand transition-colors">
          {tour.title}
        </h3>

        {/* Duration + features */}
        <div className="mt-3 flex items-center gap-3 text-xs text-ink/60">
          {tour.duration && (
            <>
              <span className="font-medium">{tour.duration}</span>
              {(tour.groupSize || tour.language) && <span className="w-1 h-1 bg-ink/40 rounded-full" />}
            </>
          )}
          {tour.groupSize && <span>{tour.groupSize}</span>}
          {tour.language && <span>{tour.language}</span>}
        </div>

        {/* Feature chips */}
        {chips.length > 0 && (
          <div className="mt-3 flex flex-wrap gap-1.5">
            {chips.map((chip) => (
              <span key={chip} className="bg-cream-deep text-ink/70 px-2 py-1 text-xs font-medium rounded-full">
                {chip}
              </span>
            ))}
          </div>
        )}

        {/* Notes */}
        {tour.firstHandNotes && (
          <p className="mt-3 line-clamp-2 text-sm leading-relaxed text-ink/60">
            {tour.firstHandNotes}
          </p>
        )}

        {/* Price */}
        {tour.priceBand && (
          <div className="mt-auto flex items-end justify-between border-t border-line pt-4">
            <span className="text-sm font-bold text-brand group-hover:underline">View tour</span>
            <span className="text-right leading-none">
              <span className="block text-[10px] font-bold uppercase tracking-[0.18em] text-ink-muted">From</span>
              <span className="mt-1 block font-hero text-[22px] font-black text-ink">
                {tour.priceBand}
                <span className="ml-1 text-xs font-semibold text-ink-muted">/adult</span>
              </span>
            </span>
          </div>
        )}
      </div>
    </Link>
  );
}
