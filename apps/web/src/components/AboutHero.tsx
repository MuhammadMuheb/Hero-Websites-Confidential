import Link from 'next/link';
import { SafeImage } from './SafeImage';

export const ABOUT_HERO_IMAGE_URL = 'https://images.unsplash.com/photo-1759843541277-14651600026c';
export const ABOUT_HERO_IMAGE_ALT =
  'A fruit and vegetable stall at a Roman street market — the everyday food shopping behind the recommendations on this site';

interface AboutHeroProps {
  title: string;
  description: string;
  imageUrl?: string;
  imageAlt?: string;
  homeHref?: string;
}

export function AboutHero({
  title,
  description,
  imageUrl = ABOUT_HERO_IMAGE_URL,
  imageAlt = ABOUT_HERO_IMAGE_ALT,
  homeHref = '/',
}: AboutHeroProps) {
  return (
    <section className="relative flex min-h-[360px] items-end overflow-hidden sm:min-h-[440px]">
      <SafeImage
        src={imageUrl}
        alt={imageAlt}
        fill
        priority
        sizes="100vw"
        className="object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/35 to-black/10" />

      <div className="relative mx-auto w-full max-w-[1440px] px-6 pb-12 sm:px-14 sm:pb-16">
        <nav className="mb-4 text-sm text-white/70">
          <Link href={homeHref} className="hover:text-white">
            Home
          </Link>
          <span className="mx-2">/</span>
          <span className="text-white">About Us</span>
        </nav>

        <h1 className="max-w-2xl font-sans text-[32px] font-extrabold leading-[1.15] text-white sm:text-[44px] sm:leading-[1.1]">
          {title}
        </h1>
        <p className="mt-4 max-w-xl text-base leading-relaxed text-white/85 sm:text-lg">
          {description}
        </p>

        <a
          href="#our-story"
          className="mt-6 inline-flex h-11 items-center justify-center rounded-control bg-accent-gradient px-5 text-sm font-bold text-white shadow-glow transition-transform duration-200 ease-out hover:scale-[1.02] active:scale-[0.98]"
        >
          Read Our Story
        </a>
      </div>
    </section>
  );
}
