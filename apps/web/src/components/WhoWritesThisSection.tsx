import { SafeImage } from './SafeImage';

interface WhoWritesSectionProps {
  name?: string;
  role?: string;
  bio?: string;
  imageUrl?: string;
  imageAlt?: string;
  /** Second paragraph. Default = Street Food Rome's "personally visited" line. */
  closingLine?: string;
}

export function WhoWritesThisSection({
  name = 'Street Food Rome',
  role = 'Food Writer',
  bio = 'There\'s no team behind this site — just one person who\'s lived in Rome for over a decade. Every tour recommended here has been taken in person.',
  imageUrl = 'https://images.unsplash.com/photo-1708628934823-a37e3fe0bb4e?w=600&h=450&fit=crop',
  imageAlt = 'An evening aperitivo stop in Rome',
  closingLine,
}: WhoWritesSectionProps = {}) {
  return (
    <section className="bg-white py-16 sm:py-20">
      <div className="mx-auto max-w-[1200px] px-6 sm:px-14">
        <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-2 lg:gap-16">
          <div>
            <p className="text-sm font-semibold text-faint">Something people often ask&hellip; okay, but&hellip;</p>
            <h2 className="mt-2 font-sans text-3xl font-extrabold tracking-tight text-accent sm:text-4xl">
              Who Writes {name}?
            </h2>

            <div className="mt-6 flex flex-col gap-4 text-base leading-relaxed text-ink-muted">
              <p>{bio}</p>
              {closingLine ? (
                <p>{closingLine}</p>
              ) : (
                <p>
                  Every tour and experience recommended here has been{' '}
                  <strong className="font-bold text-ink">personally visited and verified</strong>.
                </p>
              )}
            </div>
          </div>

          <div className="relative aspect-[4/3] overflow-hidden rounded-media bg-media">
            <SafeImage
              src={imageUrl}
              alt={imageAlt}
              fill
              sizes="(min-width: 1024px) 560px, 90vw"
              className="object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
