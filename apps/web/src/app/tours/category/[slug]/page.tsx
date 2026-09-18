import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getAllTours, getPageDoc, SITE_DOMAIN } from '@/lib/firestore';
import { InnerHero } from '@/components/InnerHero';
import { TourCard } from '@/components/TourCard';
import Link from '@/components/NetworkLink';
import { CATEGORIES, getNeighborhood, getTourEntryByRealSlug, tourHref } from '@/lib/tours';

export const dynamic = 'force-dynamic';

const CATEGORY_COPY: Record<string, string> = {
  pizza: `Rome doesn't really have "a" pizza — it has at least two, and neither is the round, wood-fired pie most visitors expect. Pizza al taglio is sold by weight off a rectangular tray, cut with scissors, and eaten standing up or walking down the street; it's built for a thick, airy crust that can hold up under a long, slow bake. Pizza bianca is simpler still — just dough, olive oil, and salt, torn open at a bakery counter and often eaten plain or split for a sandwich. Neither is really "Neapolitan" style, and locals will tell you as much. These tours exist to explain that distinction on the ground: which bakeries have been doing it for decades, why the dough recipe changes by neighbourhood, and which toppings are a Roman specialty rather than a tourist add-on. Expect a lot of walking, a lot of tasting in small amounts rather than one big sit-down meal, and a guide who can tell a good crust from a reheated one at a glance.`,
  pasta: `Roman pasta is a short list done extremely well: cacio e pepe, carbonara, amatriciana, gricia — four dishes built from a handful of ingredients (pecorino, guanciale, black pepper, sometimes tomato) and almost no room to hide a bad one. Because the recipes are so simple, execution is everything, and a Roman will argue for an hour about the correct ratio of cheese to pasta water. These tours and classes get you either behind the technique yourself — the emulsion for cacio e pepe trips up plenty of home cooks — or in front of a few kitchens that have been getting it right for years, so you can taste the difference a good guanciale and real Pecorino Romano actually make. If you've only had carbonara with cream in it, this is where that gets corrected.`,
  'beer-and-wine': `Rome's wine scene runs on small, family-run enotecas more than big-name labels — Lazio produces easy, food-friendly whites like Frascati that were built to go with fried starters and cured meats, not to be studied on their own. Craft beer is newer to the city but has taken hold fast, especially in Trastevere and Testaccio, where a wave of small breweries and bottle shops opened over the last decade. These tours pair the drink with the food it was actually meant for — a glass of Frascati with supplì, a local IPA with a plate of guanciale — in bars and cellars a first-time visitor would otherwise walk straight past. Expect small pours across several stops rather than one long dinner, and a guide who can explain why a particular pairing works instead of just pouring it.`,
  gelato: `The giveaway for good gelato in Rome has nothing to do with how tall the pile is in the display case — those neon-bright mountains of "gelato" piled above the rim are almost always a sign of stabilizers and artificial color, aimed squarely at tourists who don't know better. Real gelato sits low and matte in covered metal tins, with fruit flavors that change with the season because they're made from what's actually ripe that week. These tours go straight to the gelaterias that still make it that way — small-batch, low sugar, low fat compared to ice cream, and genuinely different flavor to flavor rather than variations on cream and sugar. You'll also get the honest answer on pistachio (real pistachio gelato is pale green-grey, not the bright green of food coloring) and where the best espresso pairing in the neighbourhood actually is.`,
  'street-food-classics': `Supplì and trapizzino are Rome's actual fast food — the things a local grabs standing at a counter, not sitting down. Supplì is a fried rice croquette with a molten mozzarella center (the "telephone wire" cheese-pull is the test of a fresh one); trapizzino is a triangle of pizza bianca dough split open and stuffed with a braised filling like trippa or chicken cacciatore, invented in Rome in the last fifteen years but already treated like a classic. These tours are built around eating on the move — several small stops rather than one sit-down meal — at the fry shops, delis, and market stalls that Romans actually queue at, with an explanation of what separates a fresh-fried, correctly seasoned version from the reheated, oversalted one sold to whoever wanders past a landmark.`,
};

export async function generateStaticParams() {
  return CATEGORIES.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const category = CATEGORIES.find((c) => c.slug === slug);
  if (!category) return {};
  const page = await getPageDoc(`category-${category.slug}`);
  const title = page?.metaTitle ?? `${category.name} Tours in Rome`;
  const description =
    page?.metaDesc ??
    `${category.name} tours in Rome — real, first-hand recommendations for the best ${category.name.toLowerCase()} experiences the city has to offer.`;
  return {
    title,
    description,
    alternates: { canonical: `https://${SITE_DOMAIN}/tours/category/${category.slug}` },
    openGraph: page?.heroImageUrl
      ? {
          title,
          description,
          url: `https://${SITE_DOMAIN}/tours/category/${category.slug}`,
          images: [{ url: page.heroImageUrl, alt: `${category.name} tours in Rome` }],
        }
      : undefined,
    twitter: page?.heroImageUrl ? { card: 'summary_large_image', images: [page.heroImageUrl] } : undefined,
  };
}

export default async function CategoryHubPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const category = CATEGORIES.find((c) => c.slug === slug);
  if (!category) notFound();

  const page = await getPageDoc(`category-${category.slug}`);
  const allTours = await getAllTours();
  const tours = allTours.filter((t) => getTourEntryByRealSlug(t.slug)?.category === category.slug);

  // Distinct neighbourhoods represented among this category's tours, for a
  // "find these tours in X neighbourhood" cross-link row below the grid.
  const neighborhoodSlugs = Array.from(
    new Set(
      tours
        .map((t) => getTourEntryByRealSlug(t.slug)?.neighborhood)
        .filter((slug): slug is string => Boolean(slug)),
    ),
  );
  const neighborhoods = neighborhoodSlugs
    .map((slug) => getNeighborhood(slug))
    .filter((n): n is NonNullable<typeof n> => Boolean(n));

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: `${category.name} Tours in Rome`,
    url: `https://${SITE_DOMAIN}/tours/category/${category.slug}`,
    mainEntity: {
      '@type': 'ItemList',
      itemListElement: tours.map((tour, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        url: `https://${SITE_DOMAIN}${tourHref(tour.slug)}`,
        name: tour.title,
      })),
    },
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <InnerHero
        eyebrow="Food Category"
        title={`${category.name} Tours in Rome`}
        breadcrumb={{ label: 'Home', href: '/' }}
        imageUrl={page?.heroImageUrl}
        imageAlt={`${category.name} tours in Rome`}
      />

      <section className="py-10">
        <div className="mx-auto max-w-[1440px] px-6 sm:px-14">
          <div className="mx-auto max-w-[760px]">
            <div
              className="rich-content text-base leading-relaxed text-ink-muted"
              dangerouslySetInnerHTML={{ __html: page?.bodyHtml ?? `<p>${CATEGORY_COPY[category.slug]}</p>` }}
            />
          </div>

          {tours.length === 0 ? (
            <p className="mt-10 text-sm text-ink-muted">No tours are tagged in this category yet.</p>
          ) : (
            <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4">
              {tours.map((tour, i) => (
                <TourCard key={tour.slug} tour={tour} priority={i < 4} />
              ))}
            </div>
          )}

          {neighborhoods.length > 0 ? (
            <p className="mt-10 text-sm text-ink-muted">
              Find {category.name} tours in:{' '}
              {neighborhoods.map((n, i) => (
                <span key={n.slug}>
                  <Link href={`/neighborhoods/${n.slug}`} className="font-bold text-accent hover:underline">
                    {n.name}
                  </Link>
                  {i < neighborhoods.length - 1 ? ', ' : ''}
                </span>
              ))}
            </p>
          ) : null}
        </div>
      </section>
    </>
  );
}
