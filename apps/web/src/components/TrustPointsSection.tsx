import Link from 'next/link';

interface TrustPointsSectionProps {
  items?: Array<{ name: string; href: string }>;
  label?: string;
}

const DEFAULT_FOODS = [
  { name: 'Carbonara', href: '/tours/category/pasta' },
  { name: 'Cacio e Pepe', href: '/tours/category/pasta' },
  { name: 'Supplì', href: '/tours/category/street-food-classics' },
  { name: 'Trapizzino', href: '/tours/category/street-food-classics' },
  { name: 'Pizza al Taglio', href: '/tours/category/pizza' },
  { name: 'Maritozzo', href: '/tours/category/gelato' },
  { name: 'Gelato', href: '/tours/category/gelato' },
  { name: 'Carciofi alla Giudia', href: '/neighborhoods/jewish-ghetto' },
  { name: 'Amatriciana', href: '/tours/category/pasta' },
  { name: 'Porchetta', href: '/tours' },
];

export function TrustPointsSection({ items, label }: TrustPointsSectionProps) {
  const foods = items ?? DEFAULT_FOODS;

  return (
    <section className="border-y border-line bg-cream py-8 sm:py-10 overflow-x-hidden">
      <div className="mx-auto w-full max-w-full px-2 sm:px-4 lg:px-10">
        <p className="text-center text-xs font-bold uppercase tracking-[0.24em] text-gold-deep mb-4 sm:mb-6">
          {label ?? 'Taste the real Rome'}
        </p>
        <div className="flex flex-wrap items-center justify-center gap-1.5 sm:gap-2 lg:gap-4">
          {foods.map((p) => (
            <Link
              key={p.name}
              href={p.href}
              className="font-hero text-xs font-semibold tracking-[-0.01em] text-ink/45 transition-colors duration-200 hover:text-brand"
            >
              {p.name}
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
