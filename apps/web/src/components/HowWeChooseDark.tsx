import { Heart, Users, MapPin, Clock } from 'lucide-react';

interface HowWeChooseDarkProps {
  items?: Array<{ title: string; description: string }>;
}

const DEFAULT_ITEMS = [
  { title: 'Authentic', description: 'No tourist traps — only where Romans actually eat.' },
  { title: 'Local-Led', description: 'Guides who live and eat in Rome every day.' },
  { title: 'Neighborhood-Based', description: 'Explore real neighborhoods, not just landmarks.' },
  { title: 'Intimate Groups', description: '8–12 people max for a genuine connection.' },
];

const ICON_MAP = {
  Authentic: Heart,
  'Local-Led': Users,
  'Neighborhood-Based': MapPin,
  'Intimate Groups': Clock,
};

/** Homepage "How We Choose": dark ink band with 4 gold icons. */
export function HowWeChooseDark({ items }: HowWeChooseDarkProps) {
  const itemList = items ?? DEFAULT_ITEMS;
  return (
    <section className="bg-ink py-16 text-cream-text sm:py-20">
      <div className="mx-auto max-w-[1200px] px-6 sm:px-10">
        <div className="text-center">
          <p className="text-xs font-bold uppercase tracking-[0.24em] text-gold">Our Standards</p>
          <h2 className="mt-3 font-hero text-[30px] font-black leading-tight tracking-[-0.02em] sm:text-[40px]">
            How We <span className="text-gold">Choose</span>
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-base leading-relaxed text-cream-text/75">
            Every tour is built on 12+ years of living, eating, and exploring Rome.
          </p>
        </div>
        <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {itemList.map(({ title, description }) => {
            const Icon = ICON_MAP[title as keyof typeof ICON_MAP] || Heart;
            return (
              <div key={title} className="rounded-[22px] border border-white/10 bg-white/[0.04] p-7 text-center">
                <span className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-gold/15 text-gold">
                  <Icon size={26} strokeWidth={1.8} aria-hidden="true" />
                </span>
                <h3 className="mt-5 font-hero text-lg font-extrabold">{title}</h3>
                <p className="mt-2 text-[15px] leading-relaxed text-cream-text/70">{description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
