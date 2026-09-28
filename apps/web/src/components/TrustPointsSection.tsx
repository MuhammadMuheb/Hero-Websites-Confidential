import Link from '@/components/NetworkLink';

interface TrustPointsSectionProps {
  items?: Array<{ name: string; href: string }>;
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

export function TrustPointsSection({ items }: TrustPointsSectionProps) {
  const foods = items ?? DEFAULT_FOODS;

  return (
    <section className="border-y border-line bg-cream py-10">
      <div className="mx-auto max-w-[1200px] px-6 sm:px-10">
        <p className="text-center text-xs font-bold uppercase tracking-[0.24em] text-gold-deep mb-6">
          Taste the real Rome
        </p>
        <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 sm:gap-x-8">
          {foods.map((p) => (
            <Link
              key={p.name}
              href={p.href}
              className="font-hero text-sm font-semibold tracking-[-0.01em] text-ink/45 transition-colors duration-200 hover:text-brand sm:text-base"
            >
              {p.name}
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
