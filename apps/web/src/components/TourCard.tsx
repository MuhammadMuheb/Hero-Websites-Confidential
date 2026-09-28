import Link from 'next/link';
import Image from 'next/image';

interface TourCardProps {
  title: string;
  href: string;
  image: string;
  imageAlt: string;
  place: string;
  duration: string;
  feature?: string;
  badge?: 'new' | 'featured' | 'popular';
}

export function TourCard({ title, href, image, imageAlt, place, duration, feature, badge }: TourCardProps) {
  return (
    <Link href={href}>
      <div className="card-lift overflow-hidden rounded-card bg-paper shadow-card hover:shadow-card-hover transition-all">
        {/* Image */}
        <div className="img-zoom relative h-48 overflow-hidden bg-media">
          <Image
            src={image}
            alt={imageAlt}
            fill
            className="object-cover"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          />
          {/* Badge */}
          {badge && (
            <div className="absolute top-4 left-4">
              {badge === 'new' && (
                <span className="inline-block bg-brand text-cream text-xs font-semibold px-3 py-1 rounded-full">
                  New
                </span>
              )}
              {badge === 'featured' && (
                <span className="inline-block bg-gold text-ink text-xs font-semibold px-3 py-1 rounded-full">
                  Featured
                </span>
              )}
              {badge === 'popular' && (
                <span className="inline-block bg-brand-dark text-cream text-xs font-semibold px-3 py-1 rounded-full">
                  Popular
                </span>
              )}
            </div>
          )}
        </div>

        {/* Content */}
        <div className="p-4 sm:p-6">
          {/* Title */}
          <h3 className="font-display font-bold text-lg leading-tight text-ink mb-3">{title}</h3>

          {/* Place Pill */}
          <div className="inline-block bg-cream-deep text-ink/70 text-xs font-medium px-3 py-1.5 rounded-full mb-4">
            {place}
          </div>

          {/* Duration & Feature */}
          <div className="flex items-center gap-3 text-xs text-ink/60">
            <span className="font-medium">{duration}</span>
            {feature && (
              <>
                <span className="w-1 h-1 bg-ink/40 rounded-full" />
                <span>{feature}</span>
              </>
            )}
          </div>
        </div>
      </div>
    </Link>
  );
}
