import type { Metadata } from 'next';
import { SafeImage } from '@/components/SafeImage';
import Link from '@/components/NetworkLink';
import { SITE_DOMAIN } from '@/lib/firestore';

export const metadata: Metadata = {
  title: 'Tivoli with Kids: Family-Friendly Day Trip Planning Guide',
  description: 'Family guide to Villa d\'Este and Tivoli day trips — kid-friendly activities, timing, logistics, and honest tips for visiting with children.',
  alternates: { canonical: `https://${SITE_DOMAIN}/money/tivoli-with-kids` },
};

export default function TivoliWithKidsPage() {
  return (
    <>
      <section className="relative min-h-[400px] w-full overflow-hidden bg-ink">
        <div className="absolute inset-0">
          <SafeImage
            src="https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=1200&h=600&fit=crop"
            alt="Tivoli with family and kids"
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-black/20" />

        <div className="relative mx-auto flex min-h-[400px] max-w-[1440px] flex-col justify-end px-6 py-16 sm:px-14 sm:py-20">
          <h1 className="max-w-3xl font-sans text-[40px] font-extrabold leading-tight text-white sm:text-[52px]">
            Tivoli with Kids: Family-Friendly Day Trip
          </h1>
          <p className="mt-6 max-w-2xl text-lg text-white/90">
            Villa d&apos;Este fountains genuinely engage kids. Here&apos;s how to make Tivoli work for the whole family without meltdowns.
          </p>
        </div>
      </section>

      <section className="border-b border-line py-16 sm:py-20">
        <div className="mx-auto max-w-[1200px] px-6 sm:px-14">
          <h2 className="font-sans text-3xl font-extrabold tracking-tight text-ink sm:text-4xl">
            Is Tivoli Kid-Friendly? YES.
          </h2>

          <div className="mt-8 rounded-media border border-line bg-paper-tint p-8">
            <h3 className="font-bold text-accent mb-4">Villa d&apos;Este for Kids</h3>
            <p className="text-base text-ink-muted">
              The fountains are genuinely exciting to children. Water features, outdoor exploration, running along paths — kids find it engaging and not boring like traditional museums. It&apos;s essentially an outdoor water playground with history.
            </p>

            <h3 className="font-bold text-accent mt-6 mb-4">Hadrian&apos;s Villa for Kids</h3>
            <p className="text-base text-ink-muted">
              More challenging for younger kids. The vast ruins require imagination to visualize what was there. Better for kids 8+ who can appreciate archaeology and don&apos;t tire easily. Little ones (3–6) find endless walking frustrating.
            </p>
          </div>
        </div>
      </section>

      <section className="border-b border-line bg-paper-tint py-16 sm:py-20">
        <div className="mx-auto max-w-[1200px] px-6 sm:px-14">
          <h2 className="font-sans text-3xl font-extrabold tracking-tight text-ink sm:text-4xl">
            Age-Based Guide
          </h2>

          <div className="mt-10 space-y-6">
            <div className="rounded-media border border-line bg-white p-6">
              <h3 className="font-bold text-accent">Ages 3–5 (Toddlers/Preschool)</h3>
              <p className="mt-3 text-base text-ink-muted">
                <strong>Villa d&apos;Este only, 1–1.5 hours max.</strong> The fountains are mesmerizing but attention span is short. Bring snacks, water, wet wipes. Skip Hadrian&apos;s Villa entirely — too much walking, too boring without context.
              </p>
            </div>

            <div className="rounded-media border border-line bg-white p-6">
              <h3 className="font-bold text-accent">Ages 6–9 (Elementary School)</h3>
              <p className="mt-3 text-base text-ink-muted">
                <strong>Villa d&apos;Este (2 hrs) + light Hadrian&apos;s exploration (1 hr).</strong> Kids this age can appreciate both sites if you keep it interactive. Make it a scavenger hunt — find the dragon fountain, the organ fountain, etc.
              </p>
            </div>

            <div className="rounded-media border border-line bg-white p-6">
              <h3 className="font-bold text-accent">Ages 10+ (Tweens/Teens)</h3>
              <p className="mt-3 text-base text-ink-muted">
                <strong>Both villas, full day possible.</strong> Can appreciate history, handle longer walking, engage with archaeology. Bring a simple guidebook or download info beforehand so they understand what they&apos;re seeing.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="border-b border-line py-16 sm:py-20">
        <div className="mx-auto max-w-[1200xml] px-6 sm:px-14">
          <h2 className="font-sans text-3xl font-extrabold tracking-tight text-ink sm:text-4xl">
            Family-Friendly Planning Tips
          </h2>

          <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2">
            <div className="rounded-media border border-line bg-paper-tint p-6">
              <h3 className="font-bold text-ink">🚌 Transportation</h3>
              <ul className="mt-3 space-y-2 text-sm text-ink-muted">
                <li>• Train is kid-engaging (novel experience)</li>
                <li>• Guided tour = no transport stress</li>
                <li>• Skip car if multiple kids</li>
              </ul>
            </div>

            <div className="rounded-media border border-line bg-paper-tint p-6">
              <h3 className="font-bold text-ink">🍎 Food & Snacks</h3>
              <ul className="mt-3 space-y-2 text-sm text-ink-muted">
                <li>• Bring snacks (limited options at villas)</li>
                <li>• Pack sandwiches, fruit, water bottles</li>
                <li>• Avoid midday heat — early start</li>
              </ul>
            </div>

            <div className="rounded-media border border-line bg-paper-tint p-6">
              <h3 className="font-bold text-ink">👕 Clothing & Sun</h3>
              <ul className="mt-3 space-y-2 text-sm text-ink-muted">
                <li>• Comfortable walking shoes (they&apos;ll complain otherwise)</li>
                <li>• Sun hats, sunscreen (essential!)</li>
                <li>• Light layers for variable weather</li>
              </ul>
            </div>

            <div className="rounded-media border border-line bg-paper-tint p-6">
              <h3 className="font-bold text-ink">💡 Engagement Tips</h3>
              <ul className="mt-3 space-y-2 text-sm text-ink-muted">
                <li>• Make it a scavenger hunt (find specific fountains)</li>
                <li>• Let them pick where to explore</li>
                <li>• Tell stories about emperors/princes</li>
              </ul>
            </div>

            <div className="rounded-media border border-line bg-paper-tint p-6">
              <h3 className="font-bold text-ink">📱 Timing</h3>
              <ul className="mt-3 space-y-2 text-sm text-ink-muted">
                <li>• Start early (8–9 AM) to beat crowds & heat</li>
                <li>• Leave by early afternoon for rest</li>
                <li>• Avoid peak summer months (July–Aug)</li>
              </ul>
            </div>

            <div className="rounded-media border border-line bg-paper-tint p-6">
              <h3 className="font-bold text-ink">✓ Tour Selection</h3>
              <ul className="mt-3 space-y-2 text-sm text-ink-muted">
                <li>• Family-focused group tours (kid guides)</li>
                <li>• Private tours (custom pacing for kids)</li>
                <li>• Skip self-guided unless kids 10+</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-paper-tint py-16 sm:py-20">
        <div className="mx-auto max-w-[1200px] px-6 sm:px-14">
          <h2 className="font-sans text-3xl font-extrabold tracking-tight text-ink sm:text-4xl">
            Family Tours to Book
          </h2>

          <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2">
            <a href="https://www.getyourguide.com/tivoli-family" className="group flex flex-col overflow-hidden rounded-media border border-line bg-white transition-all hover:-translate-y-1 hover:shadow-card-hover">
              <div className="relative aspect-[4/3] overflow-hidden bg-media">
                <SafeImage
                  src="https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=600&h=450&fit=crop"
                  alt="Family tour"
                  fill
                  sizes="(min-width: 1024px) 500px, 90vw"
                  className="object-cover"
                />
              </div>
              <div className="flex flex-1 flex-col p-4">
                <span className="inline-block w-fit rounded-full bg-media px-2.5 py-1 text-xs font-semibold text-ink-muted">GetYourGuide</span>
                <h3 className="mt-3 font-bold text-ink">Family-Friendly Villa d&apos;Este Tour</h3>
                <p className="mt-2 text-sm text-ink-muted">Guide trained for kids, skip-the-line, interactive storytelling. Ages 5+.</p>
                <p className="mt-4 font-bold text-ink">from €55</p>
              </div>
            </a>

            <a href="https://www.viator.com/private-tivoli-family" className="group flex flex-col overflow-hidden rounded-media border border-line bg-white transition-all hover:-translate-y-1 hover:shadow-card-hover">
              <div className="relative aspect-[4/3] overflow-hidden bg-media">
                <SafeImage
                  src="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600&h=450&fit=crop"
                  alt="Private family tour"
                  fill
                  sizes="(min-width: 1024px) 500px, 90vw"
                  className="object-cover"
                />
              </div>
              <div className="flex flex-1 flex-col p-4">
                <span className="inline-block w-fit rounded-full bg-media px-2.5 py-1 text-xs font-semibold text-ink-muted">Viator</span>
                <h3 className="mt-3 font-bold text-ink">Private Family Tivoli Experience</h3>
                <p className="mt-2 text-sm text-ink-muted">Car with AC, family-paced guide, custom timing for naps/meals.</p>
                <p className="mt-4 font-bold text-ink">from €140</p>
              </div>
            </a>
          </div>
        </div>
      </section>

      <section className="py-16 sm:py-20">
        <div className="mx-auto max-w-[1200px] px-6 sm:px-14 text-center">
          <h2 className="font-sans text-3xl font-extrabold tracking-tight text-ink sm:text-4xl">
            Ready for Family Tivoli?
          </h2>
          <Link href="/money/full-day-tivoli" className="mt-8 inline-flex h-12 items-center justify-center rounded-control bg-accent-gradient px-8 text-sm font-bold text-white shadow-glow transition-transform hover:scale-[1.02]">
            Book Family-Friendly Tour
          </Link>
        </div>
      </section>
    </>
  );
}
