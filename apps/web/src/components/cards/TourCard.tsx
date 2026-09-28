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
        {compact && rank ? (
          <span className="absolute left-4 top-4 rounded-full bg-gold px-3 py-1 text-xs font-bold text-ink shadow-card-soft">
            #{rank}
          </span>
        ) : tour.isTopPick && !compact ? (
          <span className="absolute right-4 top-4 rounded-full bg-gold px-3 py-1 text-xs font-bold uppercase tracking-wide text-ink shadow-card-soft">
            Top pick
          </span>
        ) : null}
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
        {!compact && chips.length > 0 && (
          <div className="mt-3 flex flex-wrap gap-1.5">
            {chips.map((chip) => (
              <span key={chip} className="bg-cream-deep text-ink/70 px-2 py-1 text-xs font-medium rounded-full">
                {chip}
              </span>
            ))}
          </div>
        )}

        {/* Notes */}
        {!compact && tour.firstHandNotes && (
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
