import Link from 'next/link';
import type { TourDoc } from '@/lib/firestore';
import { SafeImage } from './SafeImage';
import { TourCard } from '@/components/cards/TourCard';

const DEFAULT_CATEGORIES: Array<{
  name: string;
  slug: string;
  description: string;
  imageUrl: string;
  tourSlugs: string[];
  href?: string;
}> = [
  {
    name: 'Pizza',
    slug: 'pizza',
    description: 'Crispy pizza al taglio, bakery pizza bianca and Roman-style thin crust.',
    imageUrl: 'https://images.unsplash.com/photo-1664309641932-0e03e0771b97',
    tourSlugs: [
      'pizza-al-taglio-suppli-tasting-tour',
      'trastevere-pizza-craft-beer-crawl',
      'roman-pizza-bianca-bakery-tour',
    ],
  },
  {
    name: 'Pasta',
    slug: 'pasta',
    description: 'Carbonara, Cacio e Pepe, and other iconic Roman pasta dishes.',
    imageUrl: 'https://images.unsplash.com/photo-1755594461640-b800c6bafdfa',
    tourSlugs: [
      'pasta-making-class-trastevere',
      'cacio-e-pepe-carbonara-tasting-walk',
      'roman-pasta-four-ways-dinner',
    ],
  },
  {
    name: 'Beer & Wine',
    slug: 'beer-and-wine',
    description: 'Italian wines and local beers paired with authentic Roman cuisine.',
    imageUrl: 'https://images.unsplash.com/photo-1783443800128-8893eac948bb',
    tourSlugs: ['rome-food-wine-tasting', 'monti-food-wine-evening', 'trastevere-food-wine-walk'],
  },
  {
    name: 'Gelato',
    slug: 'gelato',
    description: 'Artisanal gelato from the best gelaterias in Rome, with espresso.',
    imageUrl: 'https://images.unsplash.com/photo-1759314420838-36d3d881c81c',
    tourSlugs: ['roman-gelato-tasting-walk', 'best-gelaterias-of-rome-tour', 'gelato-espresso-crawl'],
  },
  {
    name: 'Suppli & Street Food Classics',
    slug: 'street-food-classics',
    description: 'Fried Roman street food: suppli, trapizzino, and testaccio classics.',
    imageUrl: 'https://images.unsplash.com/photo-1688458296759-91020b4ff2ba',
    tourSlugs: [
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
  city,
}: {
  name: string;
  imageUrl: string;
  href: string;
  count: number;
  tours: TourDoc[];
  city: string;
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
      className="group relative col-span-1 sm:col-span-2 lg:col-span-1 overflow-hidden rounded-[20px] h-full min-h-[300px] lg:h-[400px] flex flex-col transition-all duration-300 hover:-translate-y-1"
    >
      <SafeImage
        src={imageUrl}
        alt={`${name} in ${city}`}
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

interface CategoryToursSectionProps {
  tours: TourDoc[];
  categories?: Array<{ name: string; slug: string; imageUrl: string; tourSlugs: string[]; href?: string }>;
  eyebrow?: string;
  /** [before, green word, after] */
  title?: [string, string, string];
  city?: string;
}

export function CategoryToursSection({ tours, categories, eyebrow, title, city = 'Rome' }: CategoryToursSectionProps) {
  const bySlug = new Map(tours.map((tour) => [tour.slug, tour]));
  const categoryList = categories ?? DEFAULT_CATEGORIES;

  return (
    <section className="bg-cream py-16 sm:py-20">
      <div className="mx-auto max-w-[1280px] px-6 sm:px-10">
        <div className="text-center">
          <p className="text-xs font-bold uppercase tracking-[0.24em] text-gold-deep">
            {eyebrow ?? 'Things you must taste in Rome'}
          </p>
          <h2 className="mt-3 font-hero text-[32px] font-black leading-tight tracking-[-0.02em] text-ink sm:text-[44px]">
            {title ? (
              <>
                {title[0]}
                <span className="text-brand">{title[1]}</span>
                {title[2]}
              </>
            ) : (
              <>
                Top Food <span className="text-brand">Items</span> to Try in Rome
              </>
            )}
          </h2>
        </div>

        <div className="mt-12 flex flex-col gap-10">
          {categoryList.map((category) => {
            const categoryTours = category.tourSlugs
              .map((slug) => bySlug.get(slug))
              .filter((tour): tour is TourDoc => Boolean(tour));

            if (categoryTours.length === 0) return null;

            return (
              <div
                key={category.name}
                className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-[1.75fr_1fr_1fr_1fr] lg:items-end"
              >
                <CategoryCard
                  name={category.name}
                  imageUrl={category.imageUrl}
                  href={category.href ?? `/tours/category/${category.slug}`}
                  city={city}
                  count={categoryTours.length}
                  tours={categoryTours}
                />
                {categoryTours.map((tour, idx) => (
                  <TourCard key={tour.slug} tour={tour} compact rank={idx + 1} href={category.href} />
                ))}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
