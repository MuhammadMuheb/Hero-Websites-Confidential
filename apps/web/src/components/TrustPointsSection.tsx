/** Names strip under the chips: only the booking platforms this site actually links to. */
const ROW_ONE = [
  { name: 'Viator', href: 'https://www.viator.com' },
  { name: 'GetYourGuide', href: 'https://www.getyourguide.com' },
];
const ROW_TWO = [
  { name: 'Klook', href: 'https://www.klook.com' },
  { name: 'Airbnb Experiences', href: 'https://www.airbnb.com/s/experiences' },
];

function NameRow({ items }: { items: { name: string; href: string }[] }) {
  return (
    <div className="flex flex-wrap items-center justify-center gap-x-12 gap-y-3 sm:gap-x-20">
      {items.map((p) => (
        <a
          key={p.name}
          href={p.href}
          target="_blank"
          rel="noopener noreferrer sponsored"
          className="font-hero text-[22px] font-extrabold tracking-[-0.01em] text-ink/45 transition-colors duration-200 hover:text-brand sm:text-[28px]"
        >
          {p.name}
        </a>
      ))}
    </div>
  );
}

export function TrustPointsSection() {
  return (
    <section className="border-y border-line bg-cream py-10">
      <div className="mx-auto max-w-[1200px] px-6 sm:px-10">
        <p className="text-center text-xs font-bold uppercase tracking-[0.24em] text-gold-deep">
          Book with trusted platforms
        </p>
        <div className="mt-6 space-y-4">
          <NameRow items={ROW_ONE} />
          <NameRow items={ROW_TWO} />
        </div>
      </div>
    </section>
  );
}
