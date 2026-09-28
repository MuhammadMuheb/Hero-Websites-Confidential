import Link from '@/components/NetworkLink';
import type { TourDoc } from '@/lib/firestore';
import { SafeImage } from './SafeImage';
import { TourCard } from '@/components/cards/TourCard';

const CATEGORIES = [
  {
    name: 'Pizza',
    categorySlug: 'pizza',
    description: 'Crispy pizza al taglio, bakery pizza bianca and Roman-style thin crust.',
    imageUrl: 'https://images.unsplash.com/photo-1664309641932-0e03e0771b97',
    subLinks: ['Pizza al Taglio', 'Trastevere', 'Bakery Tours'],
    slugs: [
      'pizza-al-taglio-suppli-tasting-tour',
      'trastevere-pizza-craft-beer-crawl',
      'roman-pizza-bianca-bakery-tour',
    ],
  },
  {
    name: 'Pasta',
    categorySlug: 'pasta',
    description: 'Carbonara, Cacio e Pepe, and other iconic Roman pasta dishes.',
    imageUrl: 'https://images.unsplash.com/photo-1755594461640-b800c6bafdfa',
    subLinks: ['Pasta Making', 'Tasting Walk', 'Dinner Class'],
    slugs: [
      'pasta-making-class-trastevere',
      'cacio-e-pepe-carbonara-tasting-walk',
      'roman-pasta-four-ways-dinner',
    ],
  },
  {
    name: 'Beer & Wine',
    categorySlug: 'beer-and-wine',
    description: 'Italian wines and local beers paired with authentic Roman cuisine.',
    imageUrl: 'https://images.unsplash.com/photo-1783443800128-8893eac948bb',
    subLinks: ['Wine Tasting', 'Evening Crawl', 'Food Pairing'],
    slugs: ['rome-food-wine-tasting', 'monti-food-wine-evening', 'trastevere-food-wine-walk'],
  },
  {
    name: 'Gelato',
    categorySlug: 'gelato',
    description: 'Artisanal gelato from the best gelaterias in Rome, with espresso.',
    imageUrl: 'https://images.unsplash.com/photo-1759314420838-36d3d881c81c',
    subLinks: ['Gelato Tasting', 'Best Gelaterias', 'Espresso Crawl'],
    slugs: ['roman-gelato-tasting-walk', 'best-gelaterias-of-rome-tour', 'gelato-espresso-crawl'],
  },
  {
    name: 'Suppli & Street Food Classics',
    categorySlug: 'street-food-classics',
    description: 'Fried Roman street food: suppli, trapizzino, and testaccio classics.',
    imageUrl: 'https://images.unsplash.com/photo-1688458296759-91020b4ff2ba',
    subLinks: ['Suppli Tour', 'Fried Classics', 'Testaccio Food'],
    slugs: [
      'suppli-roman-street-snacks-tour',
      'trapizzino-fried-classics-walk',
      'testaccio-fried-food-crawl',
    ],
  },
];

function CategoryCard({
  name,
  imageUrl,
  href,
  count,
  tours,
}: {
  name: string;
  imageUrl: string;
  href: string;
  count: number;
  tours: TourDoc[];
}) {
  const lowestPrice = tours
    .filter((t) => t.priceBand)
    .map((t) => {
      const match = t.priceBand?.match(/\d+/);
      return match ? parseInt(match[0], 10) : null;
    })
    .filter((n): n is number => n !== null)
    .sort((a, b) => a - b)[0];

  return (
    <Link
      href={href}
      className="group relative col-span-1 sm:col-span-2 lg:col-span-1 overflow-hidden rounded-[20px] h-full min-h-[300px] flex flex-col transition-all duration-300 hover:-translate-y-1"
    >
      <SafeImage
        src={imageUrl}
        alt={`${name} in Rome`}
        fill
        sizes="(min-width: 1024px) 380px, 100vw"
        className="absolute inset-0 object-cover transition-transform duration-500 ease-out group-hover:scale-105"
      />
      <div className="absolute top-0 inset-x-0 h-32 bg-gradient-to-b from-ink/55 to-transparent" />
      <div className="absolute bottom-0 inset-x-0 h-40 bg-gradient-to-t from-ink/45 to-transparent" />

      <div className="relative z-10 p-6 flex flex-col h-full">
        <div>
          <h3 className="font-hero text-[30px] lg:text-[34px] font-black leading-tight text-white drop-shadow">{name}</h3>
          <p className="mt-2 text-sm text-white/85">
            {count} tours
            {typeof lowestPrice === 'number' && lowestPrice > 0 && ` · From €${lowestPrice}`}
          </p>
        </div>

        <button className="mt-auto inline-flex items-center justify-center rounded-full bg-white text-ink px-5 h-11 font-bold whitespace-nowrap transition-all duration-200 hover:bg-gold">
          See {count} tours →
        </button>
      </div>
    </Link>
  );
}

export function CategoryToursSection({ tours }: { tours: TourDoc[] }) {
  const bySlug = new Map(tours.map((tour) => [tour.slug, tour]));

  return (
    <section className="bg-cream py-16 sm:py-20">
      <div className="mx-auto max-w-[1280px] px-6 sm:px-10">
        <div className="text-center">
          <p className="text-xs font-bold uppercase tracking-[0.24em] text-gold-deep">
            Things you must taste in Rome
          </p>
          <h2 className="mt-3 font-hero text-[32px] font-black leading-tight tracking-[-0.02em] text-ink sm:text-[44px]">
            Top Food <span className="text-brand">Items</span> to Try in Rome
          </h2>
        </div>

        <div className="mt-12 flex flex-col gap-10">
          {CATEGORIES.map((category) => {
            const categoryTours = category.slugs
              .map((slug) => bySlug.get(slug))
              .filter((tour): tour is TourDoc => Boolean(tour));

            if (categoryTours.length === 0) return null;

            return (
              <div
                key={category.name}
                className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-[1.75fr_1fr_1fr_1fr] lg:items-stretch"
              >
                <CategoryCard
                  name={category.name}
                  imageUrl={category.imageUrl}
                  href={`/tours/category/${category.categorySlug}`}
                  count={categoryTours.length}
                  tours={categoryTours}
                />
                {categoryTours.map((tour, idx) => (
                  <TourCard key={tour.slug} tour={tour} compact rank={idx + 1} />
                ))}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
