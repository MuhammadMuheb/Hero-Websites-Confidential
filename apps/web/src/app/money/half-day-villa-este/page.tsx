import type { Metadata } from 'next';
import { SafeImage } from '@/components/SafeImage';
import Link from '@/components/NetworkLink';
import { SITE_DOMAIN } from '@/lib/firestore';

export const metadata: Metadata = {
  title: 'Half-Day Villa d\'Este Tour: Fountains & Gardens from Rome',
  description: 'Quick guide to half-day Villa d\'Este tours from Rome — perfect for limited time. Skip-the-line access, expert guides, and honest tour comparisons.',
  alternates: { canonical: `https://${SITE_DOMAIN}/money/half-day-villa-este` },
};

export default function HalfDayVillaEstePage() {
  return (
    <>
      <section className="relative min-h-[440px] w-full overflow-hidden bg-ink">
        <div className="absolute inset-0">
          <SafeImage
            src="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1200&h=600&fit=crop"
            alt="Villa d&apos;Este fountain details"
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/10" />

        <div className="relative mx-auto flex min-h-[440px] max-w-[1440px] flex-col justify-end px-6 py-16 sm:px-14 sm:py-20">
          <nav className="mb-6 text-sm text-white/70">
            <Link href="/tivoli-day-trip" className="hover:text-white">
              Tivoli Day Trip
            </Link>
            <span className="mx-2">/</span>
            <span className="text-white">Half-Day Villa d&apos;Este</span>
          </nav>

          <h1 className="max-w-3xl font-sans text-[40px] font-extrabold leading-[1.1] text-white sm:text-[52px]">
            Half-Day Villa d&apos;Este: Fountains & Renaissance Gardens
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-white/90">
            Perfect for travelers with limited time. Discover Villa d&apos;Este's breathtaking water features and Renaissance gardens in 4–5 focused hours from Rome.
          </p>

          <div className="mt-10 flex flex-wrap gap-4">
            <a href="#tours" className="inline-flex h-12 items-center justify-center rounded-control bg-accent-gradient px-8 text-sm font-bold text-white shadow-glow transition-transform hover:scale-[1.02]">
              Explore Half-Day Tours
            </a>
          </div>
        </div>
      </section>

      <section className="border-b border-line py-16 sm:py-20">
        <div className="mx-auto max-w-[1200px] px-6 sm:px-14">
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-4">
            <div>
              <p className="text-sm font-semibold text-faint">Duration</p>
              <p className="mt-2 text-2xl font-bold text-ink">4–5 hours</p>
            </div>
            <div>
              <p className="text-sm font-semibold text-faint">Distance</p>
              <p className="mt-2 text-2xl font-bold text-ink">28 km</p>
            </div>
            <div>
              <p className="text-sm font-semibold text-faint">Best For</p>
              <p className="mt-2 text-2xl font-bold text-ink">Quick Visit</p>
            </div>
            <div>
              <p className="text-sm font-semibold text-faint">Price Range</p>
              <p className="mt-2 text-2xl font-bold text-ink">€45–€120</p>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-paper-tint py-16 sm:py-20">
        <div className="mx-auto max-w-[1200px] px-6 sm:px-14">
          <h2 className="font-sans text-3xl font-extrabold tracking-tight text-ink sm:text-4xl">
            Villa d&apos;Este: Renaissance Fountains Only
          </h2>
          <p className="mt-4 max-w-2xl text-base leading-relaxed text-ink-muted">
            If you only have a half day in Tivoli, Villa d&apos;Este is the right choice. Over 500 fountains cascading through Renaissance terraced gardens — the most visually stunning site and completely walkable in 2–2.5 hours.
          </p>

          <div className="mt-10 rounded-media border border-line bg-white p-8">
            <h3 className="font-sans text-lg font-bold text-accent">What You'll See</h3>
            <ul className="mt-4 space-y-3 text-base text-ink-muted">
              <li>✓ Fountain of Tivoli (centerpiece, oldest feature)</li>
              <li>✓ Fountain of the Hundred Fountains (cascading water features)</li>
              <li>✓ Dragon Fountain (dramatic sculptural water display)</li>
              <li>✓ Organ Fountain (water-powered musical instrument)</li>
              <li>✓ Secret Garden paths and hidden grottoes</li>
              <li>✓ Renaissance frescoes in the villa interiors</li>
            </ul>
          </div>
        </div>
      </section>

      <section id="tours" className="border-b border-line py-16 sm:py-20">
        <div className="mx-auto max-w-[1200px] px-6 sm:px-14">
          <h2 className="font-sans text-3xl font-extrabold tracking-tight text-ink sm:text-4xl">
            Recommended Half-Day Tours
          </h2>

          <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            <a href="https://www.getyourguide.com/villa-este" className="group flex flex-col overflow-hidden rounded-media border border-line bg-white transition-all hover:-translate-y-1 hover:shadow-card-hover">
              <div className="relative aspect-[4/3] overflow-hidden bg-media">
                <SafeImage
                  src="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600&h=450&fit=crop"
                  alt="Villa d&apos;Este half-day tour"
                  fill
                  sizes="(min-width: 1024px) 380px, 90vw"
                  className="object-cover transition-transform group-hover:scale-105"
                />
              </div>
              <div className="flex flex-1 flex-col p-4">
                <span className="inline-block w-fit rounded-full bg-media px-2.5 py-1 text-xs font-semibold text-ink-muted">GetYourGuide</span>
                <h3 className="mt-3 font-sans text-base font-bold text-ink">Half-Day Villa d&apos;Este Tour with Guide</h3>
                <p className="mt-2 text-sm text-ink-muted">Skip-the-line tickets, expert English-speaking guide, covered 4 hours including travel.</p>
                <p className="mt-4 font-sans text-lg font-bold text-ink">from €48</p>
                <span className="mt-4 inline-flex items-center gap-1 text-sm font-bold text-accent">View Tour →</span>
              </div>
            </a>

            <a href="https://www.viator.com/villa-este" className="group flex flex-col overflow-hidden rounded-media border border-line bg-white transition-all hover:-translate-y-1 hover:shadow-card-hover">
              <div className="relative aspect-[4/3] overflow-hidden bg-media">
                <SafeImage
                  src="https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=600&h=450&fit=crop"
                  alt="Viator Villa d&apos;Este tour"
                  fill
                  sizes="(min-width: 1024px) 380px, 90vw"
                  className="object-cover transition-transform group-hover:scale-105"
                />
              </div>
              <div className="flex flex-1 flex-col p-4">
                <span className="inline-block w-fit rounded-full bg-media px-2.5 py-1 text-xs font-semibold text-ink-muted">Viator</span>
                <h3 className="mt-3 font-sans text-base font-bold text-ink">Quick Villa d&apos;Este Self-Guided</h3>
                <p className="mt-2 text-sm text-ink-muted">Tickets and map provided, flexible timing, individual pace at your own speed.</p>
                <p className="mt-4 font-sans text-lg font-bold text-ink">from €38</p>
                <span className="mt-4 inline-flex items-center gap-1 text-sm font-bold text-accent">View Tour →</span>
              </div>
            </a>

            <a href="https://www.civitatis.com/villa-este" className="group flex flex-col overflow-hidden rounded-media border border-line bg-white transition-all hover:-translate-y-1 hover:shadow-card-hover">
              <div className="relative aspect-[4/3] overflow-hidden bg-media">
                <SafeImage
                  src="https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=600&h=450&fit=crop"
                  alt="Civitatis Villa d&apos;Este tour"
                  fill
                  sizes="(min-width: 1024px) 380px, 90vw"
                  className="object-cover transition-transform group-hover:scale-105"
                />
              </div>
              <div className="flex flex-1 flex-col p-4">
                <span className="inline-block w-fit rounded-full bg-media px-2.5 py-1 text-xs font-semibold text-ink-muted">Civitatis</span>
                <h3 className="mt-3 font-sans text-base font-bold text-ink">Villa d&apos;Este Morning Group Tour</h3>
                <p className="mt-2 text-sm text-ink-muted">Meet other travelers, guided experience, includes train transport and entrance fee.</p>
                <p className="mt-4 font-sans text-lg font-bold text-ink">from €52</p>
                <span className="mt-4 inline-flex items-center gap-1 text-sm font-bold text-accent">View Tour →</span>
              </div>
            </a>
          </div>
        </div>
      </section>

      <section className="bg-paper-tint py-16 sm:py-20">
        <div className="mx-auto max-w-[1200px] px-6 sm:px-14">
          <h2 className="font-sans text-3xl font-extrabold tracking-tight text-ink sm:text-4xl">
            Typical Half-Day Schedule
          </h2>

          <div className="mt-10 space-y-4">
            <div className="flex gap-4 rounded-media border border-line bg-white p-6">
              <div className="shrink-0">
                <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-accent-gradient text-sm font-bold text-white">8</span>
              </div>
              <div>
                <p className="font-bold text-ink">8:00 AM — Meet in Rome</p>
                <p className="mt-1 text-sm text-ink-muted">Hotel pickup or meet at station</p>
              </div>
            </div>

            <div className="flex gap-4 rounded-media border border-line bg-white p-6">
              <div className="shrink-0">
                <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-accent-gradient text-sm font-bold text-white">9</span>
              </div>
              <div>
                <p className="font-bold text-ink">9:00 AM — Travel to Tivoli</p>
                <p className="mt-1 text-sm text-ink-muted">1 hour by train or car</p>
              </div>
            </div>

            <div className="flex gap-4 rounded-media border border-line bg-white p-6">
              <div className="shrink-0">
                <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-accent-gradient text-sm font-bold text-white">10</span>
              </div>
              <div>
                <p className="font-bold text-ink">10:00 AM – 12:30 PM — Villa d&apos;Este</p>
                <p className="mt-1 text-sm text-ink-muted">2.5 hours exploring fountains and gardens</p>
              </div>
            </div>

            <div className="flex gap-4 rounded-media border border-line bg-white p-6">
              <div className="shrink-0">
                <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-accent-gradient text-sm font-bold text-white">1</span>
              </div>
              <div>
                <p className="font-bold text-ink">1:00 PM — Lunch in Tivoli</p>
                <p className="mt-1 text-sm text-ink-muted">Local restaurant or picnic lunch</p>
              </div>
            </div>

            <div className="flex gap-4 rounded-media border border-line bg-white p-6">
              <div className="shrink-0">
                <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-accent-gradient text-sm font-bold text-white">2</span>
              </div>
              <div>
                <p className="font-bold text-ink">2:00 PM — Return to Rome</p>
                <p className="mt-1 text-sm text-ink-muted">1 hour travel back to city center</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 sm:py-20">
        <div className="mx-auto max-w-[1200px] px-6 sm:px-14 text-center">
          <h2 className="font-sans text-3xl font-extrabold tracking-tight text-ink sm:text-4xl">
            Book Your Half-Day Villa d&apos;Este Tour
          </h2>
          <a href="#tours" className="mt-8 inline-flex h-12 items-center justify-center rounded-control bg-accent-gradient px-8 text-sm font-bold text-white shadow-glow transition-transform hover:scale-[1.02]">
            See Tours Above
          </a>
        </div>
      </section>
    </>
  );
}
