import type { Metadata } from 'next';
import { Hero } from '@/components/Hero';
import { SafeImage } from '@/components/SafeImage';
import Link from '@/components/NetworkLink';
import { SITE_DOMAIN } from '@/lib/firestore';

export const metadata: Metadata = {
  title: 'Full-Day Tivoli Tour: Both Villas in One Day from Rome',
  description: 'Complete guide to full-day Tivoli tours from Rome — Villa d\'Este fountains and Hadrian\'s Villa ruins combined, with timing, routing, and honest tour recommendations.',
  alternates: { canonical: `https://${SITE_DOMAIN}/money/full-day-tivoli` },
  openGraph: {
    title: 'Full-Day Tivoli Tour: Both Villas in One Day from Rome',
    description: 'Complete guide to full-day Tivoli tours from Rome — Villa d\'Este fountains and Hadrian\'s Villa ruins combined, with timing, routing, and honest tour recommendations.',
    url: `https://${SITE_DOMAIN}/money/full-day-tivoli`,
  },
};

export default function FullDayTivoliPage() {
  return (
    <>
      <section className="relative min-h-[440px] w-full overflow-hidden bg-ink">
        <div className="absolute inset-0">
          <SafeImage
            src="https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=1200&h=600&fit=crop"
            alt="Villa d&apos;Este fountains in Tivoli"
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
            <span className="text-white">Full-Day Both Villas</span>
          </nav>

          <h1 className="max-w-3xl font-sans text-[40px] font-extrabold leading-[1.1] text-white sm:text-[52px]">
            Full-Day Tivoli Tour: Both Villas in One Day
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-white/90">
            Experience the complete Tivoli masterpiece &mdash; Renaissance fountains at Villa d&apos;Este and ancient imperial ruins at Hadrian&apos;s Villa. The ultimate cultural immersion without feeling rushed.
          </p>

          <div className="mt-10 flex flex-wrap gap-4">
            <a
              href="#tours"
              className="inline-flex h-12 items-center justify-center rounded-control bg-accent-gradient px-8 text-sm font-bold text-white shadow-glow transition-transform duration-200 ease-out hover:scale-[1.02] active:scale-[0.98]"
            >
              Explore Full-Day Tours
            </a>
            <a
              href="#details"
              className="inline-flex h-12 items-center justify-center rounded-control border border-white/30 px-8 text-sm font-bold text-white transition-all duration-200 ease-out hover:border-white hover:bg-white/10"
            >
              How It Works
            </a>
          </div>
        </div>
      </section>

      <section className="border-b border-line py-16 sm:py-20">
        <div className="mx-auto max-w-[1200px] px-6 sm:px-14">
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
            <div>
              <p className="text-sm font-semibold text-faint">Duration</p>
              <p className="mt-2 text-2xl font-bold text-ink">8–10 hours</p>
              <p className="mt-1 text-sm text-ink-muted">Total time including transport</p>
            </div>
            <div>
              <p className="text-sm font-semibold text-faint">Distance</p>
              <p className="mt-2 text-2xl font-bold text-ink">28 km</p>
              <p className="mt-1 text-sm text-ink-muted">Northeast from Rome</p>
            </div>
            <div>
              <p className="text-sm font-semibold text-faint">Best For</p>
              <p className="mt-2 text-2xl font-bold text-ink">Culture</p>
              <p className="mt-1 text-sm text-ink-muted">History & architecture lovers</p>
            </div>
            <div>
              <p className="text-sm font-semibold text-faint">Price Range</p>
              <p className="mt-2 text-2xl font-bold text-ink">€65–€195</p>
              <p className="mt-1 text-sm text-ink-muted">Self-guided to premium private</p>
            </div>
          </div>
        </div>
      </section>

      <section id="details" className="bg-paper-tint py-16 sm:py-20">
        <div className="mx-auto max-w-[1200px] px-6 sm:px-14">
          <h2 className="font-sans text-3xl font-extrabold tracking-tight text-ink sm:text-4xl">
            Why Full-Day Tivoli?
          </h2>
          <p className="mt-4 max-w-2xl text-base leading-relaxed text-ink-muted">
            Tivoli&apos;s two major villas represent two completely different worlds: Renaissance fountains and gardens at Villa d&apos;Este versus imperial archaeology at Hadrian&apos;s Villa. A full day lets you experience both properly without rushing.
          </p>

          <div className="mt-10 grid grid-cols-1 gap-8 sm:grid-cols-2">
            <div className="rounded-media border border-line bg-white p-6">
              <h3 className="font-sans text-lg font-bold text-accent">Villa d&apos;Este (Fountains)</h3>
              <p className="mt-3 text-sm leading-relaxed text-ink-muted">
                Renaissance masterpiece with over 500 fountains, terraced gardens, and artistic water features. Most visually dramatic and widely photographed.
              </p>
              <p className="mt-4 text-sm font-semibold text-ink">2–2.5 hours exploration time</p>
            </div>

            <div className="rounded-media border border-line bg-white p-6">
              <h3 className="font-sans text-lg font-bold text-accent">Hadrian's Villa (Ruins)</h3>
              <p className="mt-3 text-sm leading-relaxed text-ink-muted">
                Ancient Roman imperial retreat with elaborate ruins, temples, and 27 hectares of archaeological wonders. Rewards slow exploration and curiosity.
              </p>
              <p className="mt-4 text-sm font-semibold text-ink">3–3.5 hours exploration time</p>
            </div>
          </div>
        </div>
      </section>

      <section id="tours" className="border-b border-line py-16 sm:py-20">
        <div className="mx-auto max-w-[1200px] px-6 sm:px-14">
          <h2 className="font-sans text-3xl font-extrabold tracking-tight text-ink sm:text-4xl">
            Top Full-Day Tours
          </h2>
          <p className="mt-4 max-w-2xl text-base leading-relaxed text-ink-muted">
            Honest recommendations from tour operators with best ratings and verified guest reviews.
          </p>

          <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            <a
              href="https://www.getyourguide.com/tivoli-tour"
              className="group flex flex-col overflow-hidden rounded-media border border-line bg-white transition-all duration-300 hover:-translate-y-1 hover:shadow-card-hover"
            >
              <div className="relative aspect-[4/3] overflow-hidden bg-media">
                <SafeImage
                  src="https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=600&h=450&fit=crop"
                  alt="Full-day Both Villas tour"
                  fill
                  sizes="(min-width: 1024px) 380px, 90vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>
              <div className="flex flex-1 flex-col p-4">
                <span className="inline-block w-fit rounded-full bg-media px-2.5 py-1 text-xs font-semibold text-ink-muted">
                  GetYourGuide
                </span>
                <h3 className="mt-3 font-sans text-base font-bold text-ink">Full-Day Both Villas with Expert Guide</h3>
                <p className="mt-2 text-sm text-ink-muted">
                  Complete tour covering both villas with professional guidance, all transportation included.
                </p>
                <p className="mt-4 font-sans text-lg font-bold text-ink">from €75</p>
                <span className="mt-4 inline-flex items-center gap-1 text-sm font-bold text-accent group-hover:translate-x-0.5">
                  View Tour →
                </span>
              </div>
            </a>

            <a
              href="https://www.viator.com/tivoli-tour"
              className="group flex flex-col overflow-hidden rounded-media border border-line bg-white transition-all duration-300 hover:-translate-y-1 hover:shadow-card-hover"
            >
              <div className="relative aspect-[4/3] overflow-hidden bg-media">
                <SafeImage
                  src="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600&h=450&fit=crop"
                  alt="Viator Tivoli tour"
                  fill
                  sizes="(min-width: 1024px) 380px, 90vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>
              <div className="flex flex-1 flex-col p-4">
                <span className="inline-block w-fit rounded-full bg-media px-2.5 py-1 text-xs font-semibold text-ink-muted">
                  Viator
                </span>
                <h3 className="mt-3 font-sans text-base font-bold text-ink">8-Hour Private Tivoli Experience</h3>
                <p className="mt-2 text-sm text-ink-muted">
                  Personalized day trip with private driver and guide, custom pacing, skip-the-line access.
                </p>
                <p className="mt-4 font-sans text-lg font-bold text-ink">from €150</p>
                <span className="mt-4 inline-flex items-center gap-1 text-sm font-bold text-accent group-hover:translate-x-0.5">
                  View Tour →
                </span>
              </div>
            </a>

            <a
              href="https://www.civitatis.com/tivoli-tour"
              className="group flex flex-col overflow-hidden rounded-media border border-line bg-white transition-all duration-300 hover:-translate-y-1 hover:shadow-card-hover"
            >
              <div className="relative aspect-[4/3] overflow-hidden bg-media">
                <SafeImage
                  src="https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=600&h=450&fit=crop"
                  alt="Civitatis Tivoli tour"
                  fill
                  sizes="(min-width: 1024px) 380px, 90vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>
              <div className="flex flex-1 flex-col p-4">
                <span className="inline-block w-fit rounded-full bg-media px-2.5 py-1 text-xs font-semibold text-ink-muted">
                  Civitatis
                </span>
                <h3 className="mt-3 font-sans text-base font-bold text-ink">Full-Day Tivoli Group Tour</h3>
                <p className="mt-2 text-sm text-ink-muted">
                  Guided group experience meeting locals, both villas included, lunch recommendations.
                </p>
                <p className="mt-4 font-sans text-lg font-bold text-ink">from €65</p>
                <span className="mt-4 inline-flex items-center gap-1 text-sm font-bold text-accent group-hover:translate-x-0.5">
                  View Tour →
                </span>
              </div>
            </a>
          </div>
        </div>
      </section>

      <section className="border-b border-line bg-paper-tint py-16 sm:py-20">
        <div className="mx-auto max-w-[1200px] px-6 sm:px-14">
          <h2 className="font-sans text-3xl font-extrabold tracking-tight text-ink sm:text-4xl">
            Practical Details
          </h2>

          <div className="mt-10 space-y-8">
            <div>
              <h3 className="font-sans text-lg font-bold text-accent">Getting There</h3>
              <p className="mt-3 text-base leading-relaxed text-ink-muted">
                Regional trains from Rome Termini to Tivoli Station (€3–5 one way, 1 hour). From the station, local bus or taxi (10 minutes) to either villa. Most tours include transport from Rome.
              </p>
            </div>

            <div>
              <h3 className="font-sans text-lg font-bold text-accent">What to Bring</h3>
              <ul className="mt-3 space-y-2 text-base text-ink-muted">
                <li>• Comfortable walking shoes (expect 15,000+ steps across both sites)</li>
                <li>• Sunscreen and hat (minimal shade once inside villa gardens)</li>
                <li>• Water bottle (refill at fountains or carry 1.5–2L)</li>
                <li>• Light sweater (early morning/evening can be cool even in summer)</li>
              </ul>
            </div>

            <div>
              <h3 className="font-sans text-lg font-bold text-accent">Best Season</h3>
              <p className="mt-3 text-base leading-relaxed text-ink-muted">
                May: Fountains at full flow, gardens in bloom, perfect weather. July–August: Hot (32°C+), crowded. September–October: Still warm, fewer crowds. October onwards: Some fountains reduce flow in winter months.
              </p>
            </div>

            <div>
              <h3 className="font-sans text-lg font-bold text-accent">Common Questions</h3>
              <div className="mt-3 space-y-4">
                <div>
                  <p className="font-bold text-ink">Can I do Tivoli as a half-day trip?</p>
                  <p className="mt-1 text-base text-ink-muted">
                    Villa d&apos;Este alone fits in 4&ndash;5 hours. Both villas properly explored requires a full day.
                  </p>
                </div>
                <div>
                  <p className="font-bold text-ink">Which villa first?</p>
                  <p className="mt-1 text-base text-ink-muted">
                    Either order works. Some prefer fountains first (Villa d&apos;Este) for visual drama, then ruins. Others reverse it.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 sm:py-20">
        <div className="mx-auto max-w-[1200px] px-6 sm:px-14 text-center">
          <h2 className="font-sans text-3xl font-extrabold tracking-tight text-ink sm:text-4xl">
            Ready to Plan Your Full-Day Tivoli Adventure?
          </h2>
          <p className="mt-4 max-w-2xl mx-auto text-base leading-relaxed text-ink-muted">
            Browse the tours above, compare options, and book directly with trusted operators. Most include skip-the-line tickets and expert guidance.
          </p>
          <a
            href="#tours"
            className="mt-8 inline-flex h-12 items-center justify-center rounded-control bg-accent-gradient px-8 text-sm font-bold text-white shadow-glow transition-transform duration-200 ease-out hover:scale-[1.02] active:scale-[0.98]"
          >
            Explore Tours Above
          </a>
        </div>
      </section>
    </>
  );
}
