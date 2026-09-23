import type { Metadata } from 'next';
import { SafeImage } from '@/components/SafeImage';
import Link from '@/components/NetworkLink';
import { SITE_DOMAIN } from '@/lib/firestore';

export const metadata: Metadata = {
  title: 'Private Tivoli Tour with Expert Guide: Door-to-Door from Rome',
  description: 'Personalized private Tivoli tours with English-speaking guide and transport. Skip crowds, set your own pace, insider stories. Full-day or custom duration.',
  alternates: { canonical: `https://${SITE_DOMAIN}/money/private-tivoli-guide` },
};

export default function PrivateTivoliGuidePage() {
  return (
    <>
      <section className="relative min-h-[440px] w-full overflow-hidden bg-ink">
        <div className="absolute inset-0">
          <SafeImage
            src="https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=1200&h=600&fit=crop"
            alt="Private Tivoli tour group"
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/10" />

        <div className="relative mx-auto flex min-h-[440px] max-w-[1440px] flex-col justify-end px-6 py-16 sm:px-14 sm:py-20">
          <nav className="mb-6 text-sm text-white/70">
            <Link href="/tivoli-day-trip" className="hover:text-white">Tivoli Day Trip</Link>
            <span className="mx-2">/</span>
            <span className="text-white">Private Guide</span>
          </nav>

          <h1 className="max-w-3xl font-sans text-[40px] font-extrabold leading-[1.1] text-white sm:text-[52px]">
            Private Tivoli Tour: Personalized Experience with Expert Guide
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-white/90">
            Skip the bus tours and crowds. A private guide, door-to-door transport, and custom pacing give you Tivoli on your terms — with insider knowledge you won&apos;t find in guidebooks.
          </p>

          <a href="#tours" className="mt-10 inline-flex h-12 items-center justify-center rounded-control bg-accent-gradient px-8 text-sm font-bold text-white shadow-glow transition-transform hover:scale-[1.02]">
            Find Private Tours
          </a>
        </div>
      </section>

      <section className="border-b border-line py-16 sm:py-20">
        <div className="mx-auto max-w-[1200px] px-6 sm:px-14">
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-4">
            <div><p className="text-sm font-semibold text-faint">Duration</p><p className="mt-2 text-2xl font-bold text-ink">8–12 hours</p></div>
            <div><p className="text-sm font-semibold text-faint">Group Size</p><p className="mt-2 text-2xl font-bold text-ink">1–8 people</p></div>
            <div><p className="text-sm font-semibold text-faint">Best For</p><p className="mt-2 text-2xl font-bold text-ink">Customization</p></div>
            <div><p className="text-sm font-semibold text-faint">Price Range</p><p className="mt-2 text-2xl font-bold text-ink">€150–€300</p></div>
          </div>
        </div>
      </section>

      <section className="bg-paper-tint py-16 sm:py-20">
        <div className="mx-auto max-w-[1200px] px-6 sm:px-14">
          <h2 className="font-sans text-3xl font-extrabold tracking-tight text-ink sm:text-4xl">
            Why Choose Private?
          </h2>

          <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2">
            <div className="rounded-media border border-line bg-white p-6">
              <h3 className="font-bold text-accent">No Crowds</h3>
              <p className="mt-2 text-sm text-ink-muted">Skip group tours. Move at your pace, take photos when you want, linger where you choose.</p>
            </div>
            <div className="rounded-media border border-line bg-white p-6">
              <h3 className="font-bold text-accent">Door-to-Door</h3>
              <p className="mt-2 text-sm text-ink-muted">Private driver picks you up from your hotel and returns you. No public transport, no waiting.</p>
            </div>
            <div className="rounded-media border border-line bg-white p-6">
              <h3 className="font-bold text-accent">Expert Knowledge</h3>
              <p className="mt-2 text-sm text-ink-muted">Professional guides provide context, history, and insider stories you won&apos;t find in any guidebook.</p>
            </div>
            <div className="rounded-media border border-line bg-white p-6">
              <h3 className="font-bold text-accent">Flexible Scheduling</h3>
              <p className="mt-2 text-sm text-ink-muted">Choose your own hours. Early start, longer lunch, extra time at one villa — you decide.</p>
            </div>
          </div>
        </div>
      </section>

      <section id="tours" className="border-b border-line py-16 sm:py-20">
        <div className="mx-auto max-w-[1200px] px-6 sm:px-14">
          <h2 className="font-sans text-3xl font-extrabold tracking-tight text-ink sm:text-4xl">
            Top Private Tivoli Guides
          </h2>

          <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2">
            <a href="https://www.viator.com/private-tivoli" className="group flex flex-col overflow-hidden rounded-media border border-line bg-white transition-all hover:-translate-y-1 hover:shadow-card-hover">
              <div className="relative aspect-[4/3] overflow-hidden bg-media">
                <SafeImage
                  src="https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=600&h=450&fit=crop"
                  alt="Private Tivoli tour"
                  fill
                  sizes="(min-width: 1024px) 500px, 90vw"
                  className="object-cover transition-transform group-hover:scale-105"
                />
              </div>
              <div className="flex flex-1 flex-col p-4">
                <span className="inline-block w-fit rounded-full bg-media px-2.5 py-1 text-xs font-semibold text-ink-muted">Viator</span>
                <h3 className="mt-3 font-sans text-base font-bold text-ink">Private Full-Day Tivoli with Driver & Guide</h3>
                <p className="mt-2 text-sm text-ink-muted">Hotel pickup, both villas, skip-the-line tickets, custom pacing, lunch recommendations.</p>
                <p className="mt-4 font-sans text-lg font-bold text-ink">from €160 per person</p>
              </div>
            </a>

            <a href="https://www.getyourguide.com/private-tivoli" className="group flex flex-col overflow-hidden rounded-media border border-line bg-white transition-all hover:-translate-y-1 hover:shadow-card-hover">
              <div className="relative aspect-[4/3] overflow-hidden bg-media">
                <SafeImage
                  src="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600&h=450&fit=crop"
                  alt="GetYourGuide private tour"
                  fill
                  sizes="(min-width: 1024px) 500px, 90vw"
                  className="object-cover transition-transform group-hover:scale-105"
                />
              </div>
              <div className="flex flex-1 flex-col p-4">
                <span className="inline-block w-fit rounded-full bg-media px-2.5 py-1 text-xs font-semibold text-ink-muted">GetYourGuide</span>
                <h3 className="mt-3 font-sans text-base font-bold text-ink">8-Hour Private Tivoli Experience</h3>
                <p className="mt-2 text-sm text-ink-muted">Personalized itinerary, English-speaking guide, entrance fees included, flexible timing.</p>
                <p className="mt-4 font-sans text-lg font-bold text-ink">from €180 per person</p>
              </div>
            </a>
          </div>
        </div>
      </section>

      <section className="bg-paper-tint py-16 sm:py-20">
        <div className="mx-auto max-w-[1200px] px-6 sm:px-14">
          <h2 className="font-sans text-3xl font-extrabold tracking-tight text-ink sm:text-4xl">
            What&apos;s Included
          </h2>

          <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            <div className="flex gap-3">
              <span className="shrink-0 text-2xl">✓</span>
              <div><p className="font-bold text-ink">Hotel Pickup & Return</p><p className="mt-1 text-sm text-ink-muted">Door-to-door private transport</p></div>
            </div>
            <div className="flex gap-3">
              <span className="shrink-0 text-2xl">✓</span>
              <div><p className="font-bold text-ink">Expert English-Speaking Guide</p><p className="mt-1 text-sm text-ink-muted">10+ years Tivoli experience</p></div>
            </div>
            <div className="flex gap-3">
              <span className="shrink-0 text-2xl">✓</span>
              <div><p className="font-bold text-ink">Entrance Fee Included</p><p className="mt-1 text-sm text-ink-muted">Both villas covered</p></div>
            </div>
            <div className="flex gap-3">
              <span className="shrink-0 text-2xl">✓</span>
              <div><p className="font-bold text-ink">Skip-the-Line Access</p><p className="mt-1 text-sm text-ink-muted">No waiting in ticket queues</p></div>
            </div>
            <div className="flex gap-3">
              <span className="shrink-0 text-2xl">✓</span>
              <div><p className="font-bold text-ink">Custom Pacing</p><p className="mt-1 text-sm text-ink-muted">Spend more time where you want</p></div>
            </div>
            <div className="flex gap-3">
              <span className="shrink-0 text-2xl">✓</span>
              <div><p className="font-bold text-ink">Lunch Recommendations</p><p className="mt-1 text-sm text-ink-muted">Local restaurants guides eat at</p></div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 sm:py-20">
        <div className="mx-auto max-w-[1200px] px-6 sm:px-14 text-center">
          <h2 className="font-sans text-3xl font-extrabold tracking-tight text-ink sm:text-4xl">
            Ready for a Private Tivoli Experience?
          </h2>
          <a href="#tours" className="mt-8 inline-flex h-12 items-center justify-center rounded-control bg-accent-gradient px-8 text-sm font-bold text-white shadow-glow transition-transform hover:scale-[1.02]">
            Browse Private Tours
          </a>
        </div>
      </section>
    </>
  );
}
