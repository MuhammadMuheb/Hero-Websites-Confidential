import Link from '@/components/NetworkLink';
import { SafeImage } from './SafeImage';

interface Breadcrumb {
  label: string;
  href: string;
}

interface InnerHeroProps {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  breadcrumb?: Breadcrumb;
  /** Optional hero image — renders as a full-width band above the text. Omit for a plain text banner. */
  imageUrl?: string | null;
  imageAlt?: string;
}

export function InnerHero({ eyebrow, title, subtitle, breadcrumb, imageUrl, imageAlt }: InnerHeroProps) {
  return (
    <section className="bg-paper-tint">
      {imageUrl ? (
        <div className="relative h-[220px] w-full overflow-hidden sm:h-[300px]">
          <SafeImage src={imageUrl} alt={imageAlt ?? title} fill priority sizes="100vw" className="object-cover" />
        </div>
      ) : null}
      <div className="mx-auto max-w-[1440px] px-6 py-14 text-center sm:px-14 sm:py-16">
        {breadcrumb ? (
          <nav className="mb-3 text-sm text-faint">
            <Link href={breadcrumb.href} className="hover:text-accent">
              {breadcrumb.label}
            </Link>
            <span className="mx-2">/</span>
            <span className="text-ink-muted">{title}</span>
          </nav>
        ) : null}
        {eyebrow ? (
          <p className="text-xs font-semibold uppercase tracking-[0.14em] text-faint">{eyebrow}</p>
        ) : null}
        <h1 className="mt-2 font-display text-3xl font-semibold tracking-tight text-ink sm:text-4xl">
          {title}
        </h1>
        {subtitle ? (
          <p className="mx-auto mt-3 max-w-2xl text-base leading-relaxed text-ink-muted">{subtitle}</p>
        ) : null}
      </div>
    </section>
  );
}
