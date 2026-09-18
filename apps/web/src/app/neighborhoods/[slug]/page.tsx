import type { Metadata } from 'next';
import Link from '@/components/NetworkLink';
import { notFound } from 'next/navigation';
import { getAllTours, getPageDoc, SITE_DOMAIN } from '@/lib/firestore';
import { InnerHero } from '@/components/InnerHero';
import { TourCard } from '@/components/TourCard';
import { getNeighborhood, getToursForNeighborhood } from '@/lib/tours';

export const dynamic = 'force-dynamic';

async function safeGetPageDoc(slug: string) {
  try {
    return await getPageDoc(slug);
  } catch (error) {
    console.error(`Error fetching page doc for ${slug}:`, error);
    return null;
  }
}

async function safeGetAllTours() {
  try {
    return await getAllTours();
  } catch (error) {
    console.error('Error fetching tours:', error);
    return [];
  }
}

/**
 * Genuine, distinct editorial copy per neighbourhood — deliberately short
 * (150-250 words) given there's no CMS content for these yet, but each one
 * covers what to eat there and when to go, not a template with the name
 * swapped in.
 */
const NEIGHBORHOOD_COPY: Record<string, string> = {
  trastevere: `Trastevere is the neighbourhood most first-time visitors picture when they imagine eating in Rome — narrow cobbled lanes, ivy over doorways, and a trattoria on every corner. That reputation makes it a mixed bag: the streets closest to Piazza Santa Maria are thick with menus translated into six languages and pizza reheated under a heat lamp, but a five-minute walk further, past Piazza Trilussa or up toward the Gianicolo, still turns up kitchens that have fed the same families for decades. This is the best place in Rome to pair a food stop with a drink — the area's wine bars and the newer wave of craft beer spots sit right alongside the classic trattorias, so an evening here naturally becomes a crawl rather than one sit-down meal. Go for dinner and stay late; Trastevere is quiet at lunch and genuinely alive after 8pm, when the restaurant crowd gives way to a younger bar crowd without the neighbourhood emptying out.`,
  testaccio: `Testaccio was Rome's slaughterhouse district until the early 20th century, and that history still shapes what's on the menu — this is the neighbourhood that treats quinto quarto (the "fifth quarter," offal and other cuts butchers didn't sell to nobility) as a point of pride rather than a novelty. Trippa alla romana and coda alla vaccinara both come from here, and you'll find them cooked properly at trattorias that have barely changed their recipes in fifty years. The other reason to come is Mercato Testaccio, a covered market that's equal parts produce stalls and small food counters — it's one of the few markets in central Rome that still functions as a market for residents first, tourists second. Go in the late morning for the market at its most active, or in the evening for the trattorias; this is a neighbourhood better suited to a full meal than a quick snack, and it rewards showing up hungry.`,
  'jewish-ghetto': `Rome's Jewish community is the oldest in Europe outside Israel, continuously present in this small quarter along the Tiber since long before the 16th-century walls that once enclosed it. The food reflects that history directly: carciofi alla giudia (whole artichokes flattened and deep-fried until the leaves crisp like petals) is the dish to know, alongside fried salt cod and the dense, twice-baked pizza ebraica studded with candied fruit and nuts. Several bakeries and restaurants along Via del Portico d'Ottavia keep kosher, and the neighbourhood is genuinely small enough to cover on foot in under an hour, which makes it easy to combine with a stop at the nearby Ghetto's ancient ruins. Artichoke season (roughly February through April) is the best time to visit for the signature dish at its peak, though the fried cod and pizza ebraica are available year-round.`,
  'campo-de-fiori': `Campo de' Fiori runs two completely different lives in the same square. From early morning until early afternoon it's a genuine produce and flower market — one of the last of its kind this central in Rome, though prices have crept up as it's become a fixture on walking tours. After the stalls pack up, the square flips into one of the city's busiest aperitivo and nightlife spots, ringed by bars that get loud and crowded fast. The honest advice: come in the morning for the market itself and a coffee at the edge of the square, then treat the evening version as a place to pass through rather than linger — the food directly on the square skews toward tourist pricing, while genuinely good small trattorias sit just one or two streets back toward Via dei Giubbonari.`,
  monti: `Monti is technically Rome's oldest rione, tucked behind the Colosseum and the Forum, but it doesn't feel ancient day to day — it's the neighbourhood where Rome's vintage shops, natural wine bars, and independent kitchens have clustered over the last fifteen years. The food here trends younger and more experimental than the trattoria standards elsewhere: small plates, natural and orange wines, and menus that change with what's at the market rather than sticking to the same four pastas. It's also one of the more walkable food-and-drink neighbourhoods for an evening that starts with dinner and drifts into a wine bar afterward, since almost everything worthwhile sits within a few blocks of Via del Boschetto and Via dei Serpenti. Weekday evenings are noticeably calmer than weekends, when Monti fills with a younger Roman crowd rather than tourists.`,
  prati: `Prati sits directly across the river from the Vatican, and most people only pass through it on the way to the Vatican Museums — which is exactly why it's underrated for food. Because it's genuinely residential rather than built around a landmark, the restaurants here cater to people who live nearby and eat out regularly, not to a one-time tourist crowd, so quality tends to be more consistent and prices more honest than the streets immediately around St. Peter's Square. It's a grid of wide, orderly boulevards rather than winding medieval lanes, which makes it easy to navigate but less atmospheric than Trastevere or Monti. Go here specifically if you're already spending the morning at the Vatican and want lunch or dinner that doesn't cater exclusively to tour groups — just walk a few blocks away from the Museums entrance first.`,
  'san-lorenzo': `San Lorenzo grew up around Rome's main university, La Sapienza, and it still eats and drinks like a student neighbourhood — cheap, informal, and busy late into the night, especially on weekdays during the academic year. It was heavily industrial and working-class through the mid-20th century, which is part of why it never got the polish (or the prices) of the historic centre, and why street art and independent bars have taken over old warehouse spaces here more than almost anywhere else in Rome. It's a good neighbourhood for pizza al taglio and simple, filling food rather than a formal sit-down meal, and for an evening that's more about the bar crawl than the dinner itself. Skip it in August, when the university empties out and much of the neighbourhood follows.`,
  pigneto: `Pigneto was a working-class, semi-industrial district until filmmakers and then a wave of artists and young Romans started moving in over the last two decades — Pier Paolo Pasolini shot scenes of Accattone on its main pedestrian strip, and that gritty-but-creative reputation still defines the neighbourhood. Via del Pigneto itself is now lined with small independent restaurants, wine bars, and cafés that skew casual and inventive rather than traditional trattoria fare, alongside genuinely old-school bars that haven't changed their prices or their regulars in years. It's a short tram ride from the centre rather than walkable from most tourist itineraries, which keeps it feeling like a neighbourhood locals actually go out in rather than a stop built for visitors. Evenings are the draw here, particularly Thursday through Saturday.`,
  trionfale: `Trionfale is a mostly residential district just north of the Vatican, known locally for one thing above all: Mercato Trionfale, the largest of Rome's covered local markets, with well over 200 stalls selling produce, cheese, fish, and meat to people who live in the surrounding blocks. It's not set up for tourists in any way — no multilingual signage, no tasting counters built for visitors — which is exactly what makes it worth a detour if you want to see how Romans actually shop for a Sunday lunch. There isn't much of a restaurant scene built around the market itself, so this is a neighbourhood better suited to buying good ingredients (or a quick market-stall snack) than sitting down for a full meal. Go on a weekday morning, well before the market's early-afternoon close, to see it at full activity.`,
  garbatella: `Garbatella was built in the 1920s as a garden-city experiment — low buildings, internal courtyards, and a deliberately village-like layout that still sets it apart from the dense grid of central Rome. It sits south of the historic centre, off most first-time visitors' maps entirely, and that distance has kept its trattorias and neighbourhood bars oriented toward locals rather than tourism. The food here is straightforward, unfussy Roman cooking rather than anything experimental — this is a neighbourhood to visit for an honest, quiet meal away from the crowds rather than for a specific dish you can't get elsewhere. It rewards slowing down: wander the courtyards (the "lotti," numbered residential blocks with their own internal gardens) before or after eating, since the architecture is as much the reason to come as the food.`,
};

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const neighborhood = getNeighborhood(slug);
  if (!neighborhood) return {};
  const page = await safeGetPageDoc(`neighborhood-${neighborhood.slug}`);
  const title = page?.metaTitle ?? `Eating in ${neighborhood.name}, Rome`;
  const description =
    page?.metaDesc ?? `What to eat in ${neighborhood.name}, Rome, and when to go — a first-hand neighbourhood food guide.`;
  return {
    title,
    description,
    alternates: { canonical: `https://${SITE_DOMAIN}/neighborhoods/${neighborhood.slug}` },
    openGraph: page?.heroImageUrl
      ? {
          title,
          description,
          url: `https://${SITE_DOMAIN}/neighborhoods/${neighborhood.slug}`,
          images: [{ url: page.heroImageUrl, alt: `Eating in ${neighborhood.name}, Rome` }],
        }
      : undefined,
    twitter: page?.heroImageUrl ? { card: 'summary_large_image', images: [page.heroImageUrl] } : undefined,
  };
}

export default async function NeighborhoodPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const neighborhood = getNeighborhood(slug);
  if (!neighborhood) notFound();

  const page = await safeGetPageDoc(`neighborhood-${neighborhood.slug}`);
  const allTours = await safeGetAllTours();
  const tours = getToursForNeighborhood(allTours, neighborhood.slug);

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: `Eating in ${neighborhood.name}, Rome`,
    about: { '@type': 'Place', name: `${neighborhood.name}, Rome` },
    url: `https://${SITE_DOMAIN}/neighborhoods/${neighborhood.slug}`,
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <InnerHero
        eyebrow="Neighbourhood Guide"
        title={`Eating in ${neighborhood.name}, Rome`}
        breadcrumb={{ label: 'Home', href: '/' }}
        imageUrl={page?.heroImageUrl}
        imageAlt={`Eating in ${neighborhood.name}, Rome`}
      />

      <section className="py-10">
        <div className="mx-auto max-w-[1440px] px-6 sm:px-14">
          <div className="mx-auto max-w-[760px]">
            <div
              className="rich-content text-base leading-relaxed text-ink-muted"
              dangerouslySetInnerHTML={{ __html: page?.bodyHtml ?? `<p>${NEIGHBORHOOD_COPY[neighborhood.slug]}</p>` }}
            />
          </div>

          {tours.length > 0 ? (
            <>
              <h2 className="mt-12 font-display text-2xl font-semibold text-ink">
                Tours in {neighborhood.name}
              </h2>
              <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4">
                {tours.map((tour) => (
                  <TourCard key={tour.slug} tour={tour} />
                ))}
              </div>
            </>
          ) : (
            <p className="mt-12 text-sm text-ink-muted">
              No tours are tagged in {neighborhood.name} yet — check the full{' '}
              <Link href="/tours" className="font-bold text-accent hover:underline">
                tour index
              </Link>
              .
            </p>
          )}
        </div>
      </section>
    </>
  );
}
