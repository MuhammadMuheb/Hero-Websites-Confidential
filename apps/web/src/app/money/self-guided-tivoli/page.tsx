import type { Metadata } from 'next';
import { SafeImage } from '@/components/SafeImage';
import Link from '@/components/NetworkLink';
import { SITE_DOMAIN } from '@/lib/firestore';

export const metadata: Metadata = {
  title: 'Self-Guided Tivoli Day Trip: Complete Route, Timing & Tips',
  description: 'Independent Tivoli travel guide from Rome — exact transit instructions, timing, route mapping, and money-saving tips for self-guided exploration of both villas.',
  alternates: { canonical: `https://${SITE_DOMAIN}/money/self-guided-tivoli` },
};

export default function SelfGuidedTivoliPage() {
  return (
    <>
      <section className="relative min-h-[440px] w-full overflow-hidden bg-ink">
        <div className="absolute inset-0">
          <SafeImage
            src="https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=1200&h=600&fit=crop"
            alt="Self-guided Tivoli exploration"
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
            <span className="text-white">Self-Guided</span>
          </nav>

          <h1 className="max-w-3xl font-sans text-[40px] font-extrabold leading-[1.1] text-white sm:text-[52px]">
            Self-Guided Tivoli: Complete Route & Budget Tips
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-white/90">
            Independent travelers: here&apos;s the complete route, exact transit timings, money-saving strategies, and everything you need to explore Tivoli on your own schedule.
          </p>

          <a href="#guide" className="mt-10 inline-flex h-12 items-center justify-center rounded-control bg-accent-gradient px-8 text-sm font-bold text-white shadow-glow transition-transform hover:scale-[1.02]">
            Read the Complete Guide
          </a>
        </div>
      </section>

      <section className="border-b border-line py-16 sm:py-20">
        <div className="mx-auto max-w-[1200px] px-6 sm:px-14">
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-4">
            <div><p className="text-sm font-semibold text-faint">Cost</p><p className="mt-2 text-2xl font-bold text-ink">€30–€40</p></div>
            <div><p className="text-sm font-semibold text-faint">Duration</p><p className="mt-2 text-2xl font-bold text-ink">10–12 hours</p></div>
            <div><p className="text-sm font-semibold text-faint">Best For</p><p className="mt-2 text-2xl font-bold text-ink">Budget</p></div>
            <div><p className="text-sm font-semibold text-faint">Difficulty</p><p className="mt-2 text-2xl font-bold text-ink">Moderate</p></div>
          </div>
        </div>
      </section>

      <section id="guide" className="bg-paper-tint py-16 sm:py-20">
        <div className="mx-auto max-w-[1200px] px-6 sm:px-14">
          <h2 className="font-sans text-3xl font-extrabold tracking-tight text-ink sm:text-4xl">
            Self-Guided Essentials
          </h2>

          <div className="mt-10 space-y-10">
            <div>
              <h3 className="font-sans text-lg font-bold text-accent">Step 1: Rome to Tivoli (1 hour)</h3>
              <div className="mt-4 rounded-media border border-line bg-white p-6">
                <p className="font-bold text-ink">Regional Train (Recommended)</p>
                <ul className="mt-3 space-y-2 text-sm text-ink-muted">
                  <li>• Depart: Rome Termini or Rome Tiburtina station</li>
                  <li>• Line: Trenitalia FR or REG to Tivoli</li>
                  <li>• Cost: €3–5 per person one way</li>
                  <li>• Duration: ~50 minutes</li>
                  <li>• Frequency: Every 15–20 minutes</li>
                  <li>• Booking: Buy at ticket window or Trenitalia app</li>
                </ul>
              </div>
            </div>

            <div>
              <h3 className="font-sans text-lg font-bold text-accent">Step 2: Tivoli Station to Villas (Local Transit)</h3>
              <div className="mt-4 rounded-media border border-line bg-white p-6">
                <p className="font-bold text-ink">Bus Options</p>
                <ul className="mt-3 space-y-2 text-sm text-ink-muted">
                  <li>• Bus #4 or #4X: Station → Villa d&apos;Este (10 min, €1)</li>
                  <li>• Bus #5: Villa d&apos;Este → Hadrian&apos;s Villa (20 min, €1)</li>
                  <li>• Tickets: Buy at bar/newsstand in station</li>
                  <li>• Walking: 2–3 km between villas possible in 35 mins</li>
                </ul>
              </div>
            </div>

            <div>
              <h3 className="font-sans text-lg font-bold text-accent">Step 3: Entrance Tickets</h3>
              <div className="mt-4 rounded-media border border-line bg-white p-6">
                <div className="space-y-4">
                  <div>
                    <p className="font-bold text-ink">Villa d&apos;Este</p>
                    <p className="mt-1 text-sm text-ink-muted">€11 (standard) | €9 (reduced) | €6 (EU under 25)</p>
                  </div>
                  <div>
                    <p className="font-bold text-ink">Hadrian&apos;s Villa</p>
                    <p className="mt-1 text-sm text-ink-muted">€13 (standard) | €10 (reduced) | €7 (EU under 25)</p>
                  </div>
                  <div>
                    <p className="font-bold text-ink">Combined Ticket</p>
                    <p className="mt-1 text-sm text-ink-muted">€18 (both villas, no discount)</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="border-b border-line py-16 sm:py-20">
        <div className="mx-auto max-w-[1200px] px-6 sm:px-14">
          <h2 className="font-sans text-3xl font-extrabold tracking-tight text-ink sm:text-4xl">
            Complete Daily Schedule
          </h2>

          <div className="mt-10 space-y-4">
            <div className="flex gap-4 rounded-media border border-line bg-paper-tint p-6">
              <div className="shrink-0 text-center"><span className="inline-block font-bold text-accent">7:30</span><p className="text-xs text-ink-muted">AM</p></div>
              <div><p className="font-bold text-ink">Meet at Rome Termini</p><p className="text-sm text-ink-muted">Arrive 15 min early, buy train ticket</p></div>
            </div>

            <div className="flex gap-4 rounded-media border border-line bg-paper-tint p-6">
              <div className="shrink-0 text-center"><span className="inline-block font-bold text-accent">8:00</span><p className="text-xs text-ink-muted">AM</p></div>
              <div><p className="font-bold text-ink">Train to Tivoli</p><p className="text-sm text-ink-muted">~50 min journey, relax and read guide</p></div>
            </div>

            <div className="flex gap-4 rounded-media border border-line bg-paper-tint p-6">
              <div className="shrink-0 text-center"><span className="inline-block font-bold text-accent">9:00</span><p className="text-xs text-ink-muted">AM</p></div>
              <div><p className="font-bold text-ink">Tivoli Station → Bus to Villa d&apos;Este</p><p className="text-sm text-ink-muted">10 min bus ride, €1</p></div>
            </div>

            <div className="flex gap-4 rounded-media border border-line bg-paper-tint p-6">
              <div className="shrink-0 text-center"><span className="inline-block font-bold text-accent">9:15</span><p className="text-xs text-ink-muted">AM</p></div>
              <div><p className="font-bold text-ink">Villa d&apos;Este Exploration</p><p className="text-sm text-ink-muted">2.5–3 hours (fountains, gardens)</p></div>
            </div>

            <div className="flex gap-4 rounded-media border border-line bg-paper-tint p-6">
              <div className="shrink-0 text-center"><span className="inline-block font-bold text-accent">12:15</span><p className="text-xs text-ink-muted">PM</p></div>
              <div><p className="font-bold text-ink">Lunch in Tivoli</p><p className="text-sm text-ink-muted">Local trattorias near villa</p></div>
            </div>

            <div className="flex gap-4 rounded-media border border-line bg-paper-tint p-6">
              <div className="shrink-0 text-center"><span className="inline-block font-bold text-accent">1:15</span><p className="text-xs text-ink-muted">PM</p></div>
              <div><p className="font-bold text-ink">Bus to Hadrian&apos;s Villa</p><p className="text-sm text-ink-muted">20 min ride, €1</p></div>
            </div>

            <div className="flex gap-4 rounded-media border border-line bg-paper-tint p-6">
              <div className="shrink-0 text-center"><span className="inline-block font-bold text-accent">1:35</span><p className="text-xs text-ink-muted">PM</p></div>
              <div><p className="font-bold text-ink">Hadrian&apos;s Villa Exploration</p><p className="text-sm text-ink-muted">3–3.5 hours (ruins, archaeology)</p></div>
            </div>

            <div className="flex gap-4 rounded-media border border-line bg-paper-tint p-6">
              <div className="shrink-0 text-center"><span className="inline-block font-bold text-accent">5:15</span><p className="text-xs text-ink-muted">PM</p></div>
              <div><p className="font-bold text-ink">Bus to Tivoli Station</p><p className="text-sm text-ink-muted">20 min ride back</p></div>
            </div>

            <div className="flex gap-4 rounded-media border border-line bg-paper-tint p-6">
              <div className="shrink-0 text-center"><span className="inline-block font-bold text-accent">6:00</span><p className="text-xs text-ink-muted">PM</p></div>
              <div><p className="font-bold text-ink">Train back to Rome</p><p className="text-sm text-ink-muted">~50 min journey</p></div>
            </div>

            <div className="flex gap-4 rounded-media border border-line bg-paper-tint p-6">
              <div className="shrink-0 text-center"><span className="inline-block font-bold text-accent">7:00</span><p className="text-xs text-ink-muted">PM</p></div>
              <div><p className="font-bold text-ink">Back in Rome Center</p><p className="text-sm text-ink-muted">Dinner and rest</p></div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 sm:py-20">
        <div className="mx-auto max-w-[1200px] px-6 sm:px-14">
          <h2 className="font-sans text-3xl font-extrabold tracking-tight text-ink sm:text-4xl">
            Money-Saving Tips
          </h2>

          <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2">
            <div className="rounded-media border border-line bg-white p-6">
              <h3 className="font-bold text-accent">Bring Your Own Lunch</h3>
              <p className="mt-2 text-sm text-ink-muted">Pack sandwiches and water. Restaurants in Tivoli are tourist-oriented and pricey.</p>
            </div>
            <div className="rounded-media border border-line bg-white p-6">
              <h3 className="font-bold text-accent">Buy Combined Ticket</h3>
              <p className="mt-2 text-sm text-ink-muted">€18 for both villas saves €6 vs buying separately.</p>
            </div>
            <div className="rounded-media border border-line bg-white p-6">
              <h3 className="font-bold text-accent">Check ID Discounts</h3>
              <p className="mt-2 text-sm text-ink-muted">EU citizens under 25 get 30–40% off entrance fees.</p>
            </div>
            <div className="rounded-media border border-line bg-white p-6">
              <h3 className="font-bold text-accent">Skip the Tour Bus</h3>
              <p className="mt-2 text-sm text-ink-muted">Public transport is 5–10x cheaper than commercial tours.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-paper-tint py-16 sm:py-20">
        <div className="mx-auto max-w-[1200px] px-6 sm:px-14 text-center">
          <h2 className="font-sans text-3xl font-extrabold tracking-tight text-ink sm:text-4xl">
            Ready to Explore Tivoli Independently?
          </h2>
          <p className="mt-4 max-w-2xl mx-auto text-base text-ink-muted">
            Use this guide, download the map, and experience both villas at your own pace. Total cost: €30–40 per person including all transport and tickets.
          </p>
          <Link href="/getting-to-tivoli-train-vs-tour" className="mt-8 inline-flex h-12 items-center justify-center rounded-control bg-accent-gradient px-8 text-sm font-bold text-white shadow-glow transition-transform hover:scale-[1.02]">
            Read Getting to Tivoli Guide
          </Link>
        </div>
      </section>
    </>
  );
}
