const CARDS = [
  {
    title: 'Moved for a Semester, Stayed for a Decade',
    body: 'What started as one semester abroad turned into more than ten years in Rome — long enough to stop counting, and long enough to know which market stalls are actually worth the walk.',
    icon: (
      <>
        <path d="M12 21s7-6.1 7-11.5A7 7 0 0 0 5 9.5C5 14.9 12 21 12 21Z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
        <circle cx="12" cy="9.5" r="2.4" stroke="currentColor" strokeWidth="1.6" />
      </>
    ),
  },
  {
    title: 'Got Tired of Sending the Same Three Names',
    body: "Friends visiting kept asking for restaurant names over text. Writing it down properly — with the reasoning behind each pick — turned into something longer than a message thread.",
    icon: (
      <>
        <path d="M4 5h16v10H9l-4 4V5Z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
        <path d="M8 9h8M8 12h5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
      </>
    ),
  },
  {
    title: 'Street Food Rome Was Born',
    body: "A single-author site with one rule: nothing gets recommended that hasn't actually been eaten, walked, and paid for out of pocket first.",
    icon: (
      <>
        <path d="M5 21V4a1 1 0 0 1 1-1h9l4 4v14" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
        <path d="M15 3v4h4" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
        <path d="M9 13l2 2 4-4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
      </>
    ),
  },
];

export function HowItStartedSection() {
  return (
    <section className="bg-paper-tint py-16 sm:py-20">
      <div className="mx-auto max-w-[1100px] px-6 sm:px-14">
        <h2 className="font-sans text-2xl font-extrabold tracking-tight text-ink sm:text-3xl">
          How It Started
        </h2>

        <div className="mt-10 grid grid-cols-1 gap-10 sm:grid-cols-3 sm:gap-8">
          {CARDS.map((card) => (
            <div key={card.title}>
              <div className="flex h-16 w-16 items-center justify-center rounded-xl bg-gradient-to-br from-accent to-accent-hover text-white">
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                  {card.icon}
                </svg>
              </div>
              <h3 className="mt-4 font-sans text-base font-bold text-accent">{card.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-ink-muted">{card.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
