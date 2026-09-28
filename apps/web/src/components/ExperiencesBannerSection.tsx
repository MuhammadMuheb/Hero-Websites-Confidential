import Link from '@/components/NetworkLink';
import { SafeImage } from './SafeImage';

interface ExperiencesBannerSectionProps {
  title?: string;
  description?: string;
  ctaLabel?: string;
  ctaHref?: string;
  imageUrl?: string;
  imageAlt?: string;
}

export function ExperiencesBannerSection({
  title = 'What Could Your Next Rome Food Day Taste Like?',
  description = 'Markets, pizza al taglio counters, wine bars, and the neighbourhoods that don’t make it into most guidebooks.',
  ctaLabel = 'See Our Top Rome Food Tours',
  ctaHref = '/',
  imageUrl = 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=1200&h=800&fit=crop',
  imageAlt = 'Fresh pizza al taglio, one of the tastings featured on our Rome food tours',
}: ExperiencesBannerSectionProps = {}) {
  return (
    <section>
      <div className="bg-media py-16 text-center sm:py-20">
        <div className="mx-auto max-w-[720px] px-6 sm:px-14">
          <h2 className="font-sans text-2xl font-extrabold tracking-tight text-ink sm:text-3xl">
            {title}
          </h2>
          <p className="mx-auto mt-3 max-w-md text-base leading-relaxed text-ink-muted">
            {description}
          </p>
          <Link
            href={ctaHref}
            className="mt-6 inline-flex h-12 items-center justify-center rounded-control bg-accent-gradient px-7 text-sm font-bold text-white shadow-glow transition-transform duration-200 ease-out hover:scale-[1.02] active:scale-[0.98]"
          >
            {ctaLabel}
          </Link>
        </div>
      </div>

      <div className="relative h-[440px] w-full sm:h-[560px] lg:h-[640px]">
        <SafeImage
          src={imageUrl}
          alt={imageAlt}
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
      </div>
    </section>
  );
}
