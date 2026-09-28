import Link from '@/components/NetworkLink';

const ROW_ONE = [
  { name: 'Carbonara', href: '/tours/category/pasta' },
  { name: 'Cacio e Pepe', href: '/tours/category/pasta' },
  { name: 'Supplì', href: '/tours/category/street-food-classics' },
  { name: 'Trapizzino', href: '/tours/category/street-food-classics' },
  { name: 'Pizza al Taglio', href: '/tours/category/pizza' },
];
const ROW_TWO = [
  { name: 'Maritozzo', href: '/tours/category/gelato' },
  { name: 'Gelato', href: '/tours/category/gelato' },
  { name: 'Carciofi alla Giudia', href: '/neighborhoods/jewish-ghetto' },
  { name: 'Amatriciana', href: '/tours/category/pasta' },
  { name: 'Porchetta', href: '/tours' },
];

function NameRow({ items }: { items: { name: string; href: string }[] }) {
  return (
    <div className="flex flex-wrap items-center justify-center gap-x-12 gap-y-3 sm:gap-x-20">
      {items.map((p) => (
        <Link
          key={p.name}
          href={p.href}
          className="font-hero text-[22px] font-extrabold tracking-[-0.01em] text-ink/45 transition-colors duration-200 hover:text-brand sm:text-[28px]"
        >
          {p.name}
        </Link>
      ))}
    </div>
  );
}

export function TrustPointsSection() {
  return (
    <section className="border-y border-line bg-cream py-10">
      <div className="mx-auto max-w-[1200px] px-6 sm:px-10">
        <p className="text-center text-xs font-bold uppercase tracking-[0.24em] text-gold-deep">
          Taste the real Rome
        </p>
        <div className="mt-6 space-y-4">
          <NameRow items={ROW_ONE} />
          <NameRow items={ROW_TWO} />
        </div>
      </div>
    </section>
  );
}
