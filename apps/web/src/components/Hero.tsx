'use client';

import { SafeImage } from './SafeImage';

interface HeroProps {
  imageUrl: string | null;
  title?: string;
  subtitle?: string;
  accentWord?: string;
}

export function Hero({
  imageUrl,
  title = "Street Food & Culinary Experiences",
  subtitle = "Authentic tours from local experts",
  accentWord = "Culinary",
}: HeroProps) {

  return (
    <section className="relative min-h-[100svh] w-full bg-ink flex flex-col justify-between pt-16">
      {/* Full-bleed Ken Burns image with overlay */}
      {imageUrl && (
        <>
          <div className="kenburns absolute inset-0 top-0 z-0">
            <SafeImage
              src={imageUrl}
              alt="Authentic Roman street food scene"
              fill
              priority
              sizes="100vw"
              className="object-cover"
            />
          </div>
          {/* Dark overlay */}
          <div className="absolute inset-0 bg-ink/60 z-10" />
        </>
      )}

      {/* Hero content */}
      <div className="relative z-20 mx-auto flex flex-1 max-w-7xl flex-col justify-center px-4 sm:px-6 lg:px-8">
        {/* Gold dotted eyebrow */}
        <p className="animate-fade-up text-sm font-semibold uppercase tracking-wider text-gold border-t-2 border-dashed border-gold pt-4 mb-6">
          Explore Rome
        </p>

        {/* H1 with ONE gold accent word - line-reveal */}
        <h1 className="reveal-lines max-w-3xl font-display text-5xl sm:text-6xl md:text-7xl font-bold leading-tight text-cream-text mb-6">
          {title.split(accentWord).map((part, i, arr) => (
            <span key={i} className="line block">
              <span className="line-i" style={{ '--ln': i } as React.CSSProperties}>
                {part}
                {i < arr.length - 1 && <span className="text-gold">{accentWord}</span>}
              </span>
            </span>
          ))}
        </h1>

        {/* Subline */}
        <p className="animate-fade-up text-lg sm:text-xl text-cream-text/90 max-w-xl mb-8">
          {subtitle}
        </p>

        {/* Two buttons: brand solid + cream outline */}
        <div className="animate-fade-up flex flex-wrap gap-4">
          <button className="cta-pulse px-8 py-4 bg-brand text-cream rounded-full font-semibold hover:bg-brand-dark transition-colors">
            See Tours
          </button>
          <button className="px-8 py-4 border-2 border-cream text-cream rounded-full font-semibold hover:bg-cream/10 transition-colors">
            Learn More
          </button>
        </div>
      </div>

    </section>
  );
}
