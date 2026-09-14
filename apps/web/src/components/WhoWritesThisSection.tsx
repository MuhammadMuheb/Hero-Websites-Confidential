import { SafeImage } from './SafeImage';

export function WhoWritesThisSection() {
  return (
    <section className="bg-white py-16 sm:py-20">
      <div className="mx-auto max-w-[1200px] px-6 sm:px-14">
        <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-2 lg:gap-16">
          <div>
            <p className="text-sm font-semibold text-faint">Something people often ask&hellip; okay, but&hellip;</p>
            <h2 className="mt-2 font-sans text-3xl font-extrabold tracking-tight text-accent sm:text-4xl">
              Who Writes Street Food Rome?
            </h2>

            <div className="mt-6 flex flex-col gap-4 text-base leading-relaxed text-ink-muted">
              <p>
                There&rsquo;s <strong className="font-bold text-ink">no team behind this site</strong> — just
                one person who&rsquo;s lived in Rome for over a decade and still gets a little smug about knowing
                which pizza al taglio counter is worth the queue.
              </p>
              <p>
                Every tour recommended here has been{' '}
                <strong className="font-bold text-ink">taken in person, paid for like anyone else would</strong>,
                and judged the same way you&rsquo;d judge it yourself: was it worth the afternoon?
              </p>
              <p>
                This site doesn&rsquo;t run tours directly. It points you toward the ones led by people who clearly
                love doing this, and{' '}
                <strong className="font-bold text-ink">quietly leaves off the ones that don&rsquo;t</strong>.
              </p>
              <p>
                &ldquo;Street food&rdquo; covers a lot of ground here — market stalls, pizza counters, wine bars, and
                the occasional trapizzino eaten standing up on a side street.
              </p>
            </div>
          </div>

          <div className="relative aspect-[4/3] overflow-hidden rounded-2xl bg-media">
            <SafeImage
              src="https://images.unsplash.com/photo-1771476320575-02ab6cc4ecd9"
              alt="An evening aperitivo stop in Rome, the kind of first-hand experience behind every tour on this site"
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
