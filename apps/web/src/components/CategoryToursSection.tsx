import Link from '@/components/NetworkLink';
import type { TourDoc } from '@/lib/firestore';
import { SafeImage } from './SafeImage';
import { TourCard } from './TourCard';

const CATEGORIES = [
  {
    name: 'Pizza',
    categorySlug: 'pizza',
    ctaLabel: 'Explore Pizza Tours',
    imageUrl: 'https://images.unsplash.com/photo-1664309641932-0e03e0771b97',
    slugs: [
      'pizza-al-taglio-suppli-tasting-tour',
      'trastevere-pizza-craft-beer-crawl',
      'roman-pizza-bianca-bakery-tour',
    ],
  },
  {
    name: 'Pasta',
    categorySlug: 'pasta',
    ctaLabel: 'Check Availability',
    imageUrl: 'https://images.unsplash.com/photo-1755594461640-b800c6bafdfa',
    slugs: [
      'pasta-making-class-trastevere',
      'cacio-e-pepe-carbonara-tasting-walk',
      'roman-pasta-four-ways-dinner',
    ],
  },
  {
    name: 'Beer & Wine',
    categorySlug: 'beer-and-wine',
    ctaLabel: 'Explore Experience',
    imageUrl: 'https://images.unsplash.com/photo-1783443800128-8893eac948bb',
    slugs: ['rome-food-wine-tasting', 'monti-food-wine-evening', 'trastevere-food-wine-walk'],
  },
  {
    name: 'Gelato',
    categorySlug: 'gelato',
    ctaLabel: 'Discover Gelato Tours',
    imageUrl: 'https://images.unsplash.com/photo-1759314420838-36d3d881c81c',
    slugs: ['roman-gelato-tasting-walk', 'best-gelaterias-of-rome-tour', 'gelato-espresso-crawl'],
  },
  {
    name: 'Suppli & Street Food Classics',
    categorySlug: 'street-food-classics',
    ctaLabel: 'See Street Food Tours',
    imageUrl: 'https://images.unsplash.com/photo-1688458296759-91020b4ff2ba',
    slugs: [
      'suppli-roman-street-snacks-tour',
      'trapizzino-fried-classics-walk',
      'testaccio-fried-food-crawl',
    ],
  },
];

function CategoryCard({
  name,
  ctaLabel,
  imageUrl,
  href,
}: {
  name: string;
  ctaLabel: string;
  imageUrl: string;
  href: string;
}) {
  return (
    <div className="relative col-span-1 overflow-hidden rounded-2xl sm:col-span-2 lg:col-span-1">
      <div className="relative aspect-[4/3] h-full min-h-[260px] overflow-hidden bg-media sm:min-h-[300px] lg:aspect-auto">
        <SafeImage
          src={imageUrl}
          alt={`${name} in Rome`}
          fill
          sizes="(min-width: 1024px) 320px, (min-width: 640px) 100vw, 100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/10 to-transparent" />
      </div>
      <div className="absolute inset-x-0 bottom-0 p-5">
        <h3 className="font-sans text-2xl font-extrabold text-white">{name}</h3>
        <Link
          href={href}
          className="mt-3 inline-flex h-10 items-center justify-center rounded-[6px] bg-white px-4 text-sm font-bold text-ink transition-colors hover:bg-media"
        >
          {ctaLabel}
        </Link>
      </div>
    </div>
  );
}

export function CategoryToursSection({ tours }: { tours: TourDoc[] }) {
  const bySlug = new Map(tours.map((tour) => [tour.slug, tour]));

  return (
    <section className="bg-white py-20">
      <div className="mx-auto max-w-[1440px] px-6 sm:px-14">
        <div className="text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.14em] text-faint">
            Things you must taste in Rome
          </p>
          <h2 className="mt-2 font-sans text-3xl font-extrabold tracking-tight text-ink sm:text-4xl">
            Top Food Items to Try in Rome
          </h2>
        </div>

        <div className="mt-10 flex flex-col gap-10">
          {CATEGORIES.map((category) => {
            const categoryTours = category.slugs
              .map((slug) => bySlug.get(slug))
              .filter((tour): tour is TourDoc => Boolean(tour));

            if (categoryTours.length === 0) return null;

            return (
              <div
                key={category.name}
                className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-[1.1fr_1fr_1fr_1fr]"
              >
                <CategoryCard
                  name={category.name}
                  ctaLabel={category.ctaLabel}
                  imageUrl={category.imageUrl}
                  href={`/tours/category/${category.categorySlug}`}
                />
                {categoryTours.map((tour) => (
                  <TourCard key={tour.slug} tour={tour} />
                ))}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
