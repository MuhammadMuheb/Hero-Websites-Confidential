import type { Metadata } from 'next';
import { SafeImage } from '@/components/SafeImage';
import Link from '@/components/NetworkLink';
import { SITE_DOMAIN } from '@/lib/firestore';

export const metadata: Metadata = {
  title: 'Getting to Tivoli from Rome: Train vs Tour vs Car - Complete Guide',
  description: 'Exact transit directions from Rome to Tivoli — train costs/timing, bus options, guided tour alternatives, and honest comparison to help you choose.',
  alternates: { canonical: `https://${SITE_DOMAIN}/getting-to-tivoli-train-vs-tour` },
};

export default function GettingToTivoliPage() {
  return (
    <>
      <section className="relative min-h-[400px] w-full overflow-hidden bg-ink">
        <div className="absolute inset-0">
          <SafeImage
            src="https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=1200&h=600&fit=crop"
            alt="Rome to Tivoli train journey"
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-black/20" />

        <div className="relative mx-auto flex min-h-[400px] max-w-[1440px] flex-col justify-end px-6 py-16 sm:px-14 sm:py-20">
          <h1 className="max-w-3xl font-sans text-[40px] font-extrabold leading-tight text-white sm:text-[52px]">
            Getting to Tivoli from Rome: Complete Transit Guide
          </h1>
          <p className="mt-6 max-w-2xl text-lg text-white/90">
            Train, bus, car, or guided tour? Here&apos;s every option with exact costs, timing, and honest pros/cons so you choose what works best for you.
          </p>
        </div>
      </section>

      <section className="border-b border-line py-16 sm:py-20">
        <div className="mx-auto max-w-[1200px] px-6 sm:px-14">
          <h2 className="font-sans text-3xl font-extrabold tracking-tight text-ink sm:text-4xl">
            Option 1: Regional Train (Fastest & Cheapest)
          </h2>

          <div className="mt-8 rounded-media border border-line bg-paper-tint p-8">
            <div className="grid grid-cols-1 gap-8 sm:grid-cols-4">
              <div><p className="text-sm font-semibold text-faint">Cost</p><p className="mt-2 text-xl font-bold text-ink">€3–5</p></div>
              <div><p className="text-sm font-semibold text-faint">Duration</p><p className="mt-2 text-xl font-bold text-ink">~50 min</p></div>
              <div><p className="text-sm font-semibold text-faint">Frequency</p><p className="mt-2 text-xl font-bold text-ink">Every 15–20 min</p></div>
              <div><p className="text-sm font-semibold text-faint">Best For</p><p className="mt-2 text-xl font-bold text-ink">Budget</p></div>
            </div>

            <h3 className="mt-8 font-bold text-ink">How to Book & Get There</h3>
            <ol className="mt-4 space-y-3 text-base leading-relaxed text-ink-muted">
              <li><strong>1. Go to Rome Termini or Roma Tiburtina station</strong> (any major metro station connects to both)</li>
              <li><strong>2. Buy ticket at ticket window</strong> or Trenitalia app (€3–5 per person)</li>
              <li><strong>3. Board Regional train (FR or REG line)</strong> headed to Tivoli</li>
              <li><strong>4. Arrive at Tivoli station</strong> (~50 mins), then take bus #4 or #4X to villas (€1)</li>
            </ol>

            <div className="mt-6 rounded-media bg-accent-soft p-4">
              <p className="text-sm"><strong>✓ Pro:</strong> Cheapest option, frequent departures, reliable timing</p>
              <p className="mt-2 text-sm"><strong>✗ Con:</strong> No direct guidance at station, need to figure out local bus</p>
            </div>
          </div>
        </div>
      </section>

      <section className="border-b border-line bg-paper-tint py-16 sm:py-20">
        <div className="mx-auto max-w-[1200px] px-6 sm:px-14">
          <h2 className="font-sans text-3xl font-extrabold tracking-tight text-ink sm:text-4xl">
            Option 2: Guided Tour with Transport
          </h2>

          <div className="mt-8 rounded-media border border-line bg-white p-8">
            <div className="grid grid-cols-1 gap-8 sm:grid-cols-4">
              <div><p className="text-sm font-semibold text-faint">Cost</p><p className="mt-2 text-xl font-bold text-ink">€65–€200</p></div>
              <div><p className="text-sm font-semibold text-faint">Duration</p><p className="mt-2 text-xl font-bold text-ink">8–10 hours</p></div>
              <div><p className="text-sm font-semibold text-faint">Includes</p><p className="mt-2 text-xl font-bold text-ink">Guide & Tickets</p></div>
              <div><p className="text-sm font-semibold text-faint">Best For</p><p className="mt-2 text-xl font-bold text-ink">Convenience</p></div>
            </div>

            <h3 className="mt-8 font-bold text-ink">Group vs Private</h3>
            <div className="mt-4 space-y-4">
              <div><p className="font-bold text-accent">Group Tours</p><p className="text-sm text-ink-muted">€65–€89, meet other travelers, fixed schedule, no customization</p></div>
              <div><p className="font-bold text-accent">Private Tours</p><p className="text-sm text-ink-muted">€150–€200, door-to-door, your pace, full customization</p></div>
            </div>

            <div className="mt-6 rounded-media bg-accent-soft p-4">
              <p className="text-sm"><strong>✓ Pro:</strong> Everything organized, skip-the-line access, expert guide</p>
              <p className="mt-2 text-sm"><strong>✗ Con:</strong> Expensive, less flexible, group pacing</p>
            </div>
          </div>
        </div>
      </section>

      <section className="border-b border-line py-16 sm:py-20">
        <div className="mx-auto max-w-[1200px] px-6 sm:px-14">
          <h2 className="font-sans text-3xl font-extrabold tracking-tight text-ink sm:text-4xl">
            Option 3: Rental Car
          </h2>

          <div className="mt-8 rounded-media border border-line bg-paper-tint p-8">
            <div className="grid grid-cols-1 gap-8 sm:grid-cols-4">
              <div><p className="text-sm font-semibold text-faint">Cost</p><p className="mt-2 text-xl font-bold text-ink">€50–€100</p></div>
              <div><p className="text-sm font-semibold text-faint">Parking</p><p className="mt-2 text-xl font-bold text-ink">€5–€10 daily</p></div>
              <div><p className="text-sm font-semibold text-faint">Driving</p><p className="mt-2 text-xl font-bold text-ink">45–60 min</p></div>
              <div><p className="text-sm font-semibold text-faint">Best For</p><p className="mt-2 text-xl font-bold text-ink">Flexibility</p></div>
            </div>

            <p className="mt-6 text-base leading-relaxed text-ink-muted">
              Rome traffic is notoriously chaotic. Consider this only if comfortable driving in high-stress conditions. Tivoli parking is abundant and cheap. Exact route via Rome ring road (GRA) &rarr; A24/E24 toward L&apos;Aquila &rarr; Tivoli exit.
            </p>

            <div className="mt-6 rounded-media bg-accent-soft p-4">
              <p className="text-sm"><strong>✓ Pro:</strong> Complete flexibility, visit multiple sites in one day</p>
              <p className="mt-2 text-sm"><strong>✗ Con:</strong> Rome traffic stress, parking logistics, gas costs</p>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-paper-tint py-16 sm:py-20">
        <div className="mx-auto max-w-[1200px] px-6 sm:px-14">
          <h2 className="font-sans text-3xl font-extrabold tracking-tight text-ink sm:text-4xl">
            Honest Recommendation
          </h2>

          <div className="mt-8 space-y-6">
            <div className="rounded-media border border-line bg-white p-6">
              <p className="font-bold text-accent">👉 Best Value: Regional Train + Self-Guided</p>
              <p className="mt-2 text-base text-ink-muted">
                €30–40 total, complete control, realistic experience. Takes a bit of local navigation figuring out but saves 75% vs guided tours. Follow the self-guided Tivoli page.
              </p>
            </div>

            <div className="rounded-media border border-line bg-white p-6">
              <p className="font-bold text-accent">👉 Best Convenience: Guided Group Tour</p>
              <p className="mt-2 text-base text-ink-muted">
                €65–89, everything organized, expert knowledge, no stress. Worth it if you want zero logistics headaches.
              </p>
            </div>

            <div className="rounded-media border border-line bg-white p-6">
              <p className="font-bold text-accent">👉 Best Flexibility: Private Tour</p>
              <p className="mt-2 text-base text-ink-muted">
                €150–200, door-to-door, custom pacing, your schedule. Premium experience for families or special occasions.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 sm:py-20">
        <div className="mx-auto max-w-[1200px] px-6 sm:px-14 text-center">
          <h2 className="font-sans text-3xl font-extrabold tracking-tight text-ink sm:text-4xl">
            Ready to Plan Your Trip?
          </h2>
          <p className="mt-4 max-w-2xl mx-auto text-base text-ink-muted">
            Choose your option and explore the money pages for detailed booking info and real tours.
          </p>
          <div className="mt-8 flex flex-wrap gap-4 justify-center">
            <Link href="/money/self-guided-tivoli" className="inline-flex h-12 items-center justify-center rounded-control bg-accent-gradient px-8 text-sm font-bold text-white shadow-glow transition-transform hover:scale-[1.02]">
              Self-Guided Guide
            </Link>
            <Link href="/tivoli-day-trip" className="inline-flex h-12 items-center justify-center rounded-control border border-line px-8 text-sm font-bold text-ink transition-all hover:border-accent">
              Back to Tivoli Overview
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
