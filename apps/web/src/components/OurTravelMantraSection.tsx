import { SafeImage } from './SafeImage';

const FIRST_TWO_POINTS = [
  {
    title: '1. Go With People Who Actually Want to Eat',
    body: "This one's up to you, but the best food days in Rome are shared with people who don't mind a fourth stop, a second gelato, or lingering at a market stall a little too long.",
  },
  {
    title: '2. Pick a Neighbourhood, Not Just a Landmark',
    body: 'Rome rewards wandering more than checklists. Trastevere, Testaccio, the Jewish Ghetto — each neighbourhood has its own food identity, and the best meals are usually a few streets back from wherever the tour buses stop.',
  },
];

const THIRD_POINT_PARAGRAPHS = [
  "Knowing what to order is one thing; knowing where to go is another. That's the real question once you land — not what to see, but what to eat, and who's actually going to show you where.",
  'This is where a good guide earns their keep — someone who eats in these neighbourhoods themselves, not just narrates them. We only recommend tours led by people like that.',
];

export function OurTravelMantraSection() {
  return (
    <section className="relative overflow-hidden bg-white py-16 sm:py-20">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-1/2 h-[900px] w-[900px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent-soft blur-3xl"
      />

      <div className="relative mx-auto max-w-[1200px] px-6 sm:px-14">
        <h2 className="text-center font-sans text-3xl font-extrabold tracking-tight text-ink sm:text-4xl">
          Our Travel &ldquo;Mantra&rdquo;
        </h2>

        <div className="mt-14 grid grid-cols-1 gap-x-16 gap-y-10 lg:grid-cols-2">
          <div className="relative aspect-[4/3] overflow-hidden rounded-media bg-media">
            <SafeImage
              src="https://images.unsplash.com/photo-1532117472055-4d0734b51f31"
              alt="Sharing wine and a meal together in Rome"
              fill
              sizes="(min-width: 1024px) 560px, 90vw"
              className="object-cover"
            />
          </div>

          <div className="flex flex-col justify-center gap-8">
            {FIRST_TWO_POINTS.map((point) => (
              <div key={point.title}>
                <h3 className="font-sans text-lg font-bold text-accent">{point.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-ink-muted">{point.body}</p>
              </div>
            ))}
          </div>

          <div className="flex flex-col justify-center gap-4">
            <h3 className="font-sans text-lg font-bold text-accent">3. Let a Local Lead the Way</h3>
            {THIRD_POINT_PARAGRAPHS.map((paragraph) => (
              <p key={paragraph} className="text-sm leading-relaxed text-ink-muted">
                {paragraph}
              </p>
            ))}
          </div>

          <div className="relative aspect-[4/3] overflow-hidden rounded-media bg-media lg:mt-16">
            <SafeImage
              src="https://images.unsplash.com/photo-1696407868324-460a69a81c11"
              alt="A guide leading a small group through Trastevere"
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
