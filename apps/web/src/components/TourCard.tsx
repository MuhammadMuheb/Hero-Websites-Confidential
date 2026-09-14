import Link from '@/components/NetworkLink';
import type { TourDoc } from '@/lib/firestore';
import { SafeImage } from './SafeImage';
import { tourHref } from '@/lib/tours';

interface TourCardProps {
  tour: TourDoc;
  priority?: boolean;
  /** Override the auto-resolved /tours/{seoSlug} link (rarely needed). */
  href?: string;
}

export function TourCard({ tour, priority, href }: TourCardProps) {
  return (
    <Link href={href ?? tourHref(tour.slug)} className="group lift-on-hover flex h-full flex-col">
      <div className="relative aspect-[4/3] overflow-hidden rounded-media bg-media">
        {tour.imageUrl ? (
          <SafeImage
            src={tour.imageUrl}
            alt={`${tour.title} — a Street Food Rome tour in ${tour.city}`}
            fill
            priority={priority}
            sizes="(min-width: 1280px) 300px, (min-width: 768px) 45vw, 90vw"
            className="object-cover transition-transform duration-500 ease-out group-hover:scale-105"
          />
        ) : null}
        <span className="absolute right-3 top-3 flex h-9 w-9 items-center justify-center rounded-full border border-white/40 bg-white/90 text-faint shadow-card-soft backdrop-blur-sm transition-colors hover:border-accent hover:text-accent">
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <path
              d="M12 20s-7-4.35-9.5-8.8C.6 8 2 4.5 5.5 4c2-.28 3.7.7 4.5 2.3.8-1.6 2.5-2.58 4.5-2.3C18 4.5 19.4 8 17.5 11.2 15 15.65 12 20 12 20Z"
              stroke="currentColor"
              strokeWidth="1.6"
              strokeLinejoin="round"
            />
          </svg>
        </span>
      </div>

      <div className="flex flex-1 flex-col pt-4">
        <h3 className="font-sans text-base font-bold leading-snug text-ink-soft transition-colors group-hover:text-accent">
          {tour.title}
        </h3>

        <div className="mt-2 flex items-center gap-2 text-sm text-ink-muted">
          <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-accent-soft text-accent-hover">
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.6" />
              <path d="M12 7v5l3.5 2" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
            </svg>
          </span>
          {tour.duration ? <span>{tour.duration}</span> : null}
        </div>

        <div className="mt-3 flex flex-wrap gap-1.5">
          <span className="rounded-md bg-media px-2 py-1 text-xs font-semibold text-ink-muted">
            Free Cancellation
          </span>
          <span className="rounded-md bg-media px-2 py-1 text-xs font-semibold text-ink-muted">
            Small Group
          </span>
        </div>

        {tour.firstHandNotes ? (
          <p className="mt-3 line-clamp-2 text-sm leading-relaxed text-ink-muted">{tour.firstHandNotes}</p>
        ) : null}

        <div className="mt-auto flex items-end justify-end pt-4">
          {tour.priceBand ? (
            <span className="text-right">
              <span className="font-sans text-2xl font-bold tabular-nums text-ink-soft">{tour.priceBand}</span>
              <span className="ml-1 text-sm text-faint">/adult</span>
            </span>
          ) : null}
        </div>
      </div>
    </Link>
  );
}
