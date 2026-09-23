import type { Metadata } from 'next';
import { SafeImage } from '@/components/SafeImage';
import Link from '@/components/NetworkLink';
import { SITE_DOMAIN } from '@/lib/firestore';

export const metadata: Metadata = {
  title: 'Best Time to Visit Villa d\'Este: Month-by-Month Guide',
  description: 'When to visit Tivoli & Villa d\'Este gardens — fountain flow, weather, crowds, and honest month-by-month breakdown.',
  alternates: { canonical: `https://${SITE_DOMAIN}/gardens-best-season` },
};

export default function BestSeasonPage() {
  return (
    <>
      <section className="relative min-h-[400px] w-full overflow-hidden bg-ink">
        <div className="absolute inset-0">
          <SafeImage
            src="https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=1200&h=600&fit=crop"
            alt="Villa d'Este best season"
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-black/20" />

        <div className="relative mx-auto flex min-h-[400px] max-w-[1440px] flex-col justify-end px-6 py-16 sm:px-14 sm:py-20">
          <h1 className="max-w-3xl font-sans text-[40px] font-extrabold leading-tight text-white sm:text-[52px]">
            Best Time to Visit Villa d'Este: Month-by-Month Guide
          </h1>
          <p className="mt-6 max-w-2xl text-lg text-white/90">
            When do fountains flow best? When are crowds smallest? Here's the honest breakdown by month.
          </p>
        </div>
      </section>

      <section className="border-b border-line py-16 sm:py-20">
        <div className="mx-auto max-w-[1200px] px-6 sm:px-14">
          <h2 className="font-sans text-3xl font-extrabold tracking-tight text-ink sm:text-4xl">
            The Answer: May (Late Spring)
          </h2>
          <p className="mt-4 max-w-2xl text-base leading-relaxed text-ink-muted">
            <strong>May is optimal.</strong> Fountains at full flow, gardens in bloom, 20–23°C (perfect), minimal crowds compared to summer. This is genuinely the best month if you can plan around it.
          </p>

          <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-4">
            <div className="rounded-media border border-line bg-paper-tint p-4">
              <p className="text-xs font-semibold text-accent">Fountain Flow</p>
              <p className="mt-2 font-bold text-ink">100%</p>
            </div>
            <div className="rounded-media border border-line bg-paper-tint p-4">
              <p className="text-xs font-semibold text-accent">Weather</p>
              <p className="mt-2 font-bold text-ink">Ideal</p>
            </div>
            <div className="rounded-media border border-line bg-paper-tint p-4">
              <p className="text-xs font-semibold text-accent">Crowds</p>
              <p className="mt-2 font-bold text-ink">Light–Mod</p>
            </div>
            <div className="rounded-media border border-line bg-paper-tint p-4">
              <p className="text-xs font-semibold text-accent">Gardens</p>
              <p className="mt-2 font-bold text-ink">In Bloom</p>
            </div>
          </div>
        </div>
      </section>

      <section className="border-b border-line bg-paper-tint py-16 sm:py-20">
        <div className="mx-auto max-w-[1200px] px-6 sm:px-14">
          <h2 className="font-sans text-3xl font-extrabold tracking-tight text-ink sm:text-4xl">
            Month-by-Month Breakdown
          </h2>

          <div className="mt-10 space-y-6">
            {[
              { month: 'January', temp: '5°C', flow: '30%', crowd: 'Very Light', note: 'Cold, wet, fountains at minimum. Only come if you must.' },
              { month: 'February', temp: '6°C', flow: '30%', crowd: 'Very Light', note: 'Still cold. Gardens dormant. Occasional rainfall.' },
              { month: 'March', temp: '10°C', flow: '50%', crowd: 'Light', note: 'Spring arriving. Fountains wake up. Still fewer crowds.' },
              { month: 'April', temp: '15°C', flow: '80%', crowd: 'Moderate', note: 'Gardens starting to bloom. Weather warming. Crowds increasing.' },
              { month: 'May', temp: '21°C', flow: '100%', crowd: 'Moderate', note: '⭐ BEST MONTH. Perfect weather, full fountains, gardens peak bloom.' },
              { month: 'June', temp: '26°C', flow: '100%', crowd: 'Heavy', note: 'Summer starts. Still great but crowds building. Morning visits best.' },
              { month: 'July', temp: '28°C', flow: '100%', crowd: 'Very Heavy', note: '☀️ HOT. Midday unbearable (32°C+). Visit early morning/late afternoon.' },
              { month: 'August', temp: '28°C', flow: '100%', crowd: 'Extremely Heavy', note: 'Peak summer. Crowded, hot, humid. Many locals leave for vacation.' },
              { month: 'September', temp: '24°C', flow: '100%', crowd: 'Heavy', note: 'Still warm, fountains running. Crowds start thinning by late month.' },
              { month: 'October', temp: '18°C', flow: '80%', crowd: 'Moderate', note: '✓ GOOD OPTION. Autumn colors, pleasant weather, fewer crowds return.' },
              { month: 'November', temp: '12°C', flow: '60%', crowd: 'Light', note: 'Chilly, some rain. Fountains reduce flow. Gardens fade to autumn tones.' },
              { month: 'December', temp: '7°C', flow: '40%', crowd: 'Light', note: 'Cold, occasional snow. Holiday season brings some tourism. Fountains minimal.' },
            ].map((item) => (
              <div key={item.month} className="rounded-media border border-line bg-white p-6">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <h3 className="font-bold text-ink">{item.month}</h3>
                    <p className="mt-2 text-sm text-ink-muted">{item.note}</p>
                  </div>
                  <div className="shrink-0 text-right">
                    <p className="text-xs text-faint">Temp: <strong>{item.temp}</strong></p>
                    <p className="mt-1 text-xs text-faint">Flow: <strong>{item.flow}</strong></p>
                    <p className="mt-1 text-xs text-faint">Crowds: <strong>{item.crowd}</strong></p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 sm:py-20">
        <div className="mx-auto max-w-[1200px] px-6 sm:px-14 text-center">
          <h2 className="font-sans text-3xl font-extrabold tracking-tight text-ink sm:text-4xl">
            Plan Your Visit
          </h2>
          <Link href="/money/full-day-tivoli" className="mt-8 inline-flex h-12 items-center justify-center rounded-control bg-accent-gradient px-8 text-sm font-bold text-white shadow-glow transition-transform hover:scale-[1.02]">
            Browse Tours
          </Link>
        </div>
      </section>
    </>
  );
}
