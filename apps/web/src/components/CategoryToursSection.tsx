import Link from '@/components/NetworkLink';
import type { TourDoc } from '@/lib/firestore';
import { SafeImage } from './SafeImage';
import { TourCard } from '@/components/cards/TourCard';

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
    <div className="group relative col-span-1 overflow-hidden rounded-[22px] shadow-card sm:col-span-2 lg:col-span-1">
      <div className="relative aspect-[4/3] h-full min-h-[300px] overflow-hidden bg-media sm:min-h-[340px] lg:aspect-auto lg:min-h-[440px]">
        <SafeImage
          src={imageUrl}
          alt={`${name} in Rome`}
          fill
          sizes="(min-width: 1024px) 420px, 100vw"
          className="object-cover transition-transform duration-500 ease-out group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-ink/90 via-ink/35 to-transparent" />
      </div>
      <div className="absolute inset-x-0 bottom-0 p-7">
        <p className="text-xs font-bold uppercase tracking-[0.24em] text-gold">Must taste</p>
        <h3 className="mt-2 font-hero text-[28px] font-black leading-tight text-white sm:text-[32px]">{name}</h3>
        <Link
          href={href}
          className="mt-3 inline-flex h-10 items-center justify-center rounded-full bg-gold px-5 text-sm font-bold text-ink transition-all duration-200 ease-out hover:-translate-y-0.5 hover:shadow-card"
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
    <section className="bg-cream py-16 sm:py-20">
      <div className="mx-auto max-w-[1200px] px-6 sm:px-10">
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
                className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-[1.5fr_1fr_1fr_1fr]"
              >
                <CategoryCard
                  name={category.name}
                  ctaLabel={category.ctaLabel}
                  imageUrl={category.imageUrl}
                  href={`/tours/category/${category.categorySlug}`}
                />
                {categoryTours.map((tour) => (
                  <TourCard key={tour.slug} tour={tour} compact />
                ))}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
