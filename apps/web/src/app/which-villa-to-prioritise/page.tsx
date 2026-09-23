import type { Metadata } from 'next';
import { SafeImage } from '@/components/SafeImage';
import Link from '@/components/NetworkLink';
import { SITE_DOMAIN } from '@/lib/firestore';

export const metadata: Metadata = {
  title: 'Villa d\'Este vs Hadrian\'s Villa: Which Should You Visit?',
  description: 'Compare Villa d\'Este fountains vs Hadrian\'s Villa ruins. Time needed, interests matched, and honest recommendation on which villa to prioritise.',
  alternates: { canonical: `https://${SITE_DOMAIN}/which-villa-to-prioritise` },
};

export default function WhichVillaPage() {
  return (
    <>
      <section className="relative min-h-[400px] w-full overflow-hidden bg-ink">
        <div className="absolute inset-0">
          <SafeImage
            src="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1200&h=600&fit=crop"
            alt="Villa d&apos;Este vs Hadrian&apos;s Villa comparison"
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-black/20" />

        <div className="relative mx-auto flex min-h-[400px] max-w-[1440px] flex-col justify-end px-6 py-16 sm:px-14 sm:py-20">
          <h1 className="max-w-3xl font-sans text-[40px] font-extrabold leading-tight text-white sm:text-[52px]">
            Villa d&apos;Este or Hadrian&apos;s Villa? Which to Visit?
          </h1>
          <p className="mt-6 max-w-2xl text-lg text-white/90">
            Renaissance fountains vs ancient Roman ruins — each is completely different. Here&apos;s how to choose based on your interests and available time.
          </p>
        </div>
      </section>

      <section className="border-b border-line py-16 sm:py-20">
        <div className="mx-auto max-w-[1200px] px-6 sm:px-14">
          <h2 className="font-sans text-3xl font-extrabold tracking-tight text-ink sm:text-4xl">
            Villa d&apos;Este: Renaissance Fountains & Gardens
          </h2>

          <div className="mt-8 grid grid-cols-1 gap-8 sm:grid-cols-2">
            <div>
              <h3 className="font-bold text-accent mb-4">Perfect For</h3>
              <ul className="space-y-2 text-base text-ink-muted">
                <li>✓ Photography enthusiasts</li>
                <li>✓ Garden lovers</li>
                <li>✓ Art & architecture fans</li>
                <li>✓ Visitors with limited mobility</li>
                <li>✓ Half-day trips</li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold text-accent mb-4">Key Features</h3>
              <ul className="space-y-2 text-base text-ink-muted">
                <li>• 500+ fountains cascading</li>
                <li>• Terraced Renaissance gardens</li>
                <li>• Water-powered art installations</li>
                <li>• Frescoed villa interiors</li>
                <li>• Crowds: Moderate to heavy</li>
              </ul>
            </div>
          </div>

          <div className="mt-8 rounded-media border border-line bg-paper-tint p-6">
            <p className="text-sm"><strong>Time Needed:</strong> 2–2.5 hours is sufficient to see all main attractions</p>
            <p className="mt-3 text-sm"><strong>Physical Demand:</strong> Moderate — many stairs, walking on uneven terrain</p>
            <p className="mt-3 text-sm"><strong>Accessibility:</strong> Limited wheelchair access; some areas steep and narrow</p>
          </div>
        </div>
      </section>

      <section className="border-b border-line bg-paper-tint py-16 sm:py-20">
        <div className="mx-auto max-w-[1200px] px-6 sm:px-14">
          <h2 className="font-sans text-3xl font-extrabold tracking-tight text-ink sm:text-4xl">
            Hadrian&apos;s Villa: Ancient Roman Archaeology
          </h2>

          <div className="mt-8 grid grid-cols-1 gap-8 sm:grid-cols-2">
            <div>
              <h3 className="font-bold text-accent mb-4">Perfect For</h3>
              <ul className="space-y-2 text-base text-ink-muted">
                <li>✓ History buffs</li>
                <li>✓ Archaeology enthusiasts</li>
                <li>✓ Quiet explorers</li>
                <li>✓ Students & researchers</li>
                <li>✓ Full-day visits</li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold text-accent mb-4">Key Features</h3>
              <ul className="space-y-2 text-base text-ink-muted">
                <li>• 27 hectares of ruins</li>
                <li>• Ancient temples & palaces</li>
                <li>• Archaeological excavations</li>
                <li>• Imperial leisure complex</li>
                <li>• Crowds: Light to moderate</li>
              </ul>
            </div>
          </div>

          <div className="mt-8 rounded-media border border-line bg-white p-6">
            <p className="text-sm"><strong>Time Needed:</strong> 3–3.5 hours minimum for meaningful exploration</p>
            <p className="mt-3 text-sm"><strong>Physical Demand:</strong> High — lots of walking, uneven ground, climbing</p>
            <p className="mt-3 text-sm"><strong>Accessibility:</strong> Very limited; mostly outdoor ruins with few paths</p>
          </div>
        </div>
      </section>

      <section className="border-b border-line py-16 sm:py-20">
        <div className="mx-auto max-w-[1200px] px-6 sm:px-14">
          <h2 className="font-sans text-3xl font-extrabold tracking-tight text-ink sm:text-4xl">
            Side-by-Side Comparison
          </h2>

          <div className="mt-8 overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-line">
                  <th className="py-3 px-4 text-left font-bold text-ink">Aspect</th>
                  <th className="py-3 px-4 text-left font-bold text-ink">Villa d&apos;Este</th>
                  <th className="py-3 px-4 text-left font-bold text-ink">Hadrian&apos;s Villa</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-line">
                  <td className="py-4 px-4 font-bold text-ink">Visual Drama</td>
                  <td className="py-4 px-4 text-ink-muted">Fountains everywhere — stunning</td>
                  <td className="py-4 px-4 text-ink-muted">Quiet, contemplative ruins</td>
                </tr>
                <tr className="border-b border-line bg-paper-tint">
                  <td className="py-4 px-4 font-bold text-ink">Crowds</td>
                  <td className="py-4 px-4 text-ink-muted">Heavy (major attraction)</td>
                  <td className="py-4 px-4 text-ink-muted">Fewer visitors</td>
                </tr>
                <tr className="border-b border-line">
                  <td className="py-4 px-4 font-bold text-ink">Exploration Time</td>
                  <td className="py-4 px-4 text-ink-muted">2–2.5 hours</td>
                  <td className="py-4 px-4 text-ink-muted">3–3.5 hours</td>
                </tr>
                <tr className="border-b border-line bg-paper-tint">
                  <td className="py-4 px-4 font-bold text-ink">Photography</td>
                  <td className="py-4 px-4 text-ink-muted">Excellent (many angles)</td>
                  <td className="py-4 px-4 text-ink-muted">Good (atmospheric)</td>
                </tr>
                <tr className="border-b border-line">
                  <td className="py-4 px-4 font-bold text-ink">Physical Demand</td>
                  <td className="py-4 px-4 text-ink-muted">Moderate</td>
                  <td className="py-4 px-4 text-ink-muted">High</td>
                </tr>
                <tr className="bg-paper-tint">
                  <td className="py-4 px-4 font-bold text-ink">Best Visited With</td>
                  <td className="py-4 px-4 text-ink-muted">Half day or standalone</td>
                  <td className="py-4 px-4 text-ink-muted">Full day + other sites</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <section className="bg-paper-tint py-16 sm:py-20">
        <div className="mx-auto max-w-[1200px] px-6 sm:px-14">
          <h2 className="font-sans text-3xl font-extrabold tracking-tight text-ink sm:text-4xl">
            The Honest Answer
          </h2>

          <div className="mt-8 space-y-6">
            <div className="rounded-media border border-line bg-white p-6">
              <p className="font-bold text-accent">If You Only Have Time for ONE Villa</p>
              <p className="mt-3 text-base text-ink-muted">
                <strong>Choose Villa d&apos;Este.</strong> It's the more visually striking, universally impressive, and takes less time. The fountains are genuinely remarkable — something most visitors remember for years.
              </p>
            </div>

            <div className="rounded-media border border-line bg-white p-6">
              <p className="font-bold text-accent">If You Have a Full Day</p>
              <p className="mt-3 text-base text-ink-muted">
                <strong>Do both.</strong> Villa d&apos;Este in the morning (2.5 hrs), lunch, then Hadrian&apos;s Villa (3.5 hrs). The contrast is the whole experience — fountains first gives you visual drama, then archaeology rewards slower exploration.
              </p>
            </div>

            <div className="rounded-media border border-line bg-white p-6">
              <p className="font-bold text-accent">If You're a History Nerd</p>
              <p className="mt-3 text-base text-ink-muted">
                <strong>Hadrian&apos;s Villa is your priority.</strong> Villa d&apos;Este is nice, but Hadrian&apos;s Villa tells the story of Imperial Rome — the emperor's personal retreat, the scale of power, the engineering. It rewards deep exploration.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 sm:py-20">
        <div className="mx-auto max-w-[1200px] px-6 sm:px-14 text-center">
          <h2 className="font-sans text-3xl font-extrabold tracking-tight text-ink sm:text-4xl">
            Next Steps
          </h2>
          <div className="mt-8 flex flex-wrap gap-4 justify-center">
            <Link href="/money/full-day-tivoli" className="inline-flex h-12 items-center justify-center rounded-control bg-accent-gradient px-8 text-sm font-bold text-white shadow-glow transition-transform hover:scale-[1.02]">
              Book a Full-Day Tour
            </Link>
            <Link href="/gardens-best-season" className="inline-flex h-12 items-center justify-center rounded-control border border-line px-8 text-sm font-bold text-ink">
              When's Best to Visit?
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
