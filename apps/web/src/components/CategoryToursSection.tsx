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
  description,
  imageUrl,
  href,
  count,
  subLinks,
  tours,
}: {
  name: string;
  description: string;
  imageUrl: string;
  href: string;
  count: number;
  subLinks: string[];
  tours: TourDoc[];
}) {
  const lowestPrice = tours
    .filter((t) => t.priceBand)
    .map((t) => {
      const price = parseInt(t.priceBand?.replace(/[^0-9]/g, '') || '0');
      return price;
    })
    .sort((a, b) => a - b)[0];

  return (
    <Link
      href={href}
      className="group relative col-span-1 overflow-hidden rounded-[22px] bg-paper shadow-card-soft transition-all duration-300 hover:-translate-y-1 hover:shadow-card-hover sm:col-span-2 lg:col-span-1 lg:min-h-[440px] flex flex-col"
    >
      <div className="relative aspect-[4/3] lg:aspect-auto lg:flex-1 overflow-hidden bg-media">
        <SafeImage
          src={imageUrl}
          alt={`${name} in Rome`}
          fill
          sizes="(min-width: 1024px) 320px, 100vw"
          className="object-cover transition-transform duration-500 ease-out group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-ink/90 via-ink/40 to-transparent" />
        {count > 0 && (
          <span className="absolute left-4 top-4 rounded-full bg-white/20 backdrop-blur-sm px-3 py-1 text-xs font-bold text-white">
            {count} tours
          </span>
        )}
      </div>

      <div className="flex flex-1 flex-col justify-between p-7">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.24em] text-gold-deep">Must taste</p>
          <h3 className="mt-2 font-hero text-[32px] font-black leading-tight text-ink">{name}</h3>
          <p className="mt-3 text-sm leading-relaxed text-ink/70">{description}</p>
        </div>

        {lowestPrice > 0 && (
          <p className="mt-3 text-sm font-bold text-ink">
            From €{lowestPrice}
          </p>
        )}

        <div className="mt-4 flex flex-wrap gap-2">
          {subLinks.map((link) => (
            <span key={link} className="rounded-full bg-white/15 backdrop-blur-sm px-3 py-1 text-xs font-medium text-white/90">
              {link}
            </span>
          ))}
        </div>

        <button className="mt-4 inline-flex h-10 items-center justify-center rounded-full bg-gold px-5 text-sm font-bold text-ink transition-all duration-200 ease-out hover:-translate-y-0.5 hover:shadow-card">
          See all {count} {name} tours →
        </button>
      </div>
    </Link>
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

        <div className="mt-12 flex flex-col gap-12">
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
                  description={category.description}
                  imageUrl={category.imageUrl}
                  href={`/tours/category/${category.categorySlug}`}
                  count={categoryTours.length}
                  subLinks={category.subLinks}
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
