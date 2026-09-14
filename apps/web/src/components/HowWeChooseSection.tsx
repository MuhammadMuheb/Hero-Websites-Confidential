const STEPS = [
  {
    title: 'Walk it first',
    description: 'Every tour on this site has been taken in person before it was ever recommended.',
  },
  {
    title: 'Stay off the tourist track',
    description:
      'We look for real neighbourhoods and family-run kitchens, not the stops every guidebook already sends you to.',
  },
  {
    title: 'Judge it honestly',
    description:
      "If a tour disappoints, it doesn't make the list — no exceptions for who's paying the commission.",
  },
  {
    title: 'Keep it personal',
    description: 'One person writes this site. Every review reflects an actual visit, not a template.',
  },
];

export function HowWeChooseSection() {
  return (
    <section className="bg-white py-16 sm:py-20">
      <div className="mx-auto max-w-[1200px] px-6 sm:px-14">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-[320px_1fr] lg:gap-16">
          <h2 className="font-sans text-3xl font-extrabold leading-tight tracking-tight text-ink sm:text-4xl">
            How We Choose Our Tours
          </h2>

          <div className="grid grid-cols-1 gap-x-12 gap-y-10 sm:grid-cols-2">
            {STEPS.map((step, index) => (
              <div key={step.title}>
                <span className="flex h-10 w-10 items-center justify-center rounded-full bg-accent-gradient text-base font-bold text-white shadow-glow">
                  {index + 1}
                </span>
                <h3 className="mt-4 font-sans text-base font-bold text-accent">{step.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-ink-muted">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
