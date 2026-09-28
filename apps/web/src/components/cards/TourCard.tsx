import Link from '@/components/NetworkLink';
import type { TourDoc } from '@/lib/firestore';
import { SafeImage } from '@/components/SafeImage';
import { tourHref } from '@/lib/tours';

interface TourCardProps {
  tour: TourDoc;
  priority?: boolean;
  href?: string;
}

export function TourCard({ tour, priority, href }: TourCardProps) {
  const chips = (tour.features ?? []).slice(0, 2);

  return (
    <Link
      id={`tour-${tour.slug}`}
      href={href ?? tourHref(tour.slug)}
      className="group card-lift flex h-full flex-col overflow-hidden rounded-card bg-paper shadow-card hover:shadow-card-hover transition-all"
    >
      {/* Image */}
      <div className="img-zoom relative aspect-video overflow-hidden bg-media">
        {tour.imageUrl ? (
          <SafeImage
            src={tour.imageUrl}
            alt={`${tour.title}, ${tour.city}`}
            fill
            priority={priority}
            sizes="(min-width: 1280px) 300px, (min-width: 768px) 45vw, 90vw"
            className="object-cover"
          />
        ) : null}
        {tour.isTopPick && (
          <span className="absolute right-4 top-4 rounded-full bg-gold text-ink px-3 py-1 text-xs font-semibold shadow-card-soft">
            Top pick
          </span>
        )}
      </div>

      {/* Content */}
      <div className="flex flex-1 flex-col p-4 sm:p-6">
        {/* Title */}
        <h3 className="font-display font-bold text-lg leading-snug text-ink group-hover:text-brand transition-colors">
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
          <div className="mt-auto pt-4 border-t border-line">
            <span className="text-right block">
              <span className="font-display text-xl font-bold text-ink">{tour.priceBand}</span>
              <span className="text-xs text-ink/60 ml-1">/adult</span>
            </span>
          </div>
        )}
      </div>
    </Link>
  );
}
