import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getAllBlogPosts, getAllTours, getPageDoc, SITE_DOMAIN } from '@/lib/firestore';
import { HomePageBody } from '@/components/HomePageBody';
import { UndergroundColosseumHome } from '@/components/UndergroundColosseumHome';
import { PrivateVaticanHome } from '@/components/PrivateVaticanHome';
import { PompeiiDayTripHome } from '@/components/PompeiiDayTripHome';
import { RomeVespaHome } from '@/components/RomeVespaHome';
import { GolfCartRomeHome } from '@/components/GolfCartRomeHome';
import { CookingInRomeHome } from '@/components/CookingInRomeHome';
import { RomePizzaClassHome } from '@/components/RomePizzaClassHome';
import { TiramisuClassHome } from '@/components/TiramisuClassHome';
import { TuscanyDayTripHome } from '@/components/TuscanyDayTripHome';
import { AmalfiDayTripHome } from '@/components/AmalfiDayTripHome';
import { TivoliDayTripHome } from '@/components/TivoliDayTripHome';
import { NaplesStreetFoodHome } from '@/components/NaplesStreetFoodHome';
import { getNetworkSite } from '@/lib/tours';
import { HERO_IMAGE as UC_HERO_IMAGE } from '@/lib/underground-colosseum';
import { HERO_IMAGE as PV_HERO_IMAGE } from '@/lib/private-vatican';
import { HERO_IMAGE as PDT_HERO_IMAGE } from '@/lib/pompeii-day-trip';
import { HERO_IMAGE as RV_HERO_IMAGE } from '@/lib/rome-vespa';
import { HERO_IMAGE as GCR_HERO_IMAGE } from '@/lib/golf-cart-rome';
import { HERO_IMAGE as CIR_HERO_IMAGE } from '@/lib/cooking-in-rome';
import { HERO_IMAGE as RPC_HERO_IMAGE } from '@/lib/rome-pizza-class';
import { HERO_IMAGE as TC_HERO_IMAGE } from '@/lib/tiramisu-class';
import { HERO_IMAGE as TDT_HERO_IMAGE } from '@/lib/tuscany-day-trip';
import { HERO_IMAGE as ADT_HERO_IMAGE } from '@/lib/amalfi-day-trip';
import { HERO_IMAGE as TVDT_HERO_IMAGE } from '@/lib/tivoli-day-trip';
import { HERO_IMAGE as NSF_HERO_IMAGE } from '@/lib/naples-street-food';

/**
 * Underground Colosseum, Private Vatican, Pompeii Day Trip, Rome Vespa, Golf
 * Cart Rome, Cooking in Rome, Rome Pizza Class, Tiramisù Class, and Tuscany
 * Day Trip each get their own bespoke homepage (built from the site's
 * dedicated blueprint) even though none is the platform's
 * ACTIVE_NETWORK_SLUG test property — everywhere else in this app that
 * check still gates the shared T1 template, but these nine heroes have
 * real, indexable content of their own instead of the "under construction"
 * placeholder. Each gets its own
 * explicit `site.slug === '...'` check below (rather than a single shared
 * constant) since their metadata and homepage component both differ —
 * adding a ninth bespoke hero later is still just one more such block per
 * function, not a broader refactor.
 * (A shared exported constant isn't used
 * here because Next.js route files may only export the handful of names it
 * recognizes as special — revalidate, generateStaticParams, generateMetadata,
 * the default component — and fails the build on any other export; see
 * [...rest]/page.tsx, which needs the identical four slugs and declares its
 * own local checks for the same reason.)
 */

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

async function safeGetAllBlogPosts() {
  try {
    return await getAllBlogPosts();
  } catch (error) {
    console.error('Error fetching blog posts:', error);
    return [];
  }
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const site = getNetworkSite(slug);
  if (!site) return {};

  if (site.slug === 'underground-colosseum') {
    const title = 'Underground & Arena Floor Colosseum Tours | Underground Colosseum';
    const description =
      "A first-hand guide to Colosseum underground and arena-floor access tours — honest comparisons across GetYourGuide, Viator, and Tiqets, from a Rome-based guide who has walked every circuit in person.";
    const ogImage = `${UC_HERO_IMAGE.src}?w=1200&h=630&q=80&auto=format&fit=crop`;
    return {
      title: { absolute: title },
      description,
      alternates: { canonical: `https://${SITE_DOMAIN}/${site.slug}` },
      openGraph: {
        title,
        description,
        url: `https://${SITE_DOMAIN}/${site.slug}`,
        images: [{ url: ogImage, width: 1200, height: 630, alt: UC_HERO_IMAGE.alt }],
      },
      twitter: { card: 'summary_large_image', images: [ogImage] },
    };
  }

  if (site.slug === 'private-vatican') {
    const title = 'Private Vatican Tours — Early Access & Skip-the-Line Guide';
    const description =
      'Independent guide to Vatican early-access and private tours. Not affiliated with the Vatican Museums — honest comparisons, real crowd data.';
    const ogImage = `${PV_HERO_IMAGE.src}?w=1200&h=630&q=80&auto=format&fit=crop`;
    return {
      title: { absolute: title },
      description,
      alternates: { canonical: `https://${SITE_DOMAIN}/${site.slug}` },
      openGraph: {
        title,
        description,
        url: `https://${SITE_DOMAIN}/${site.slug}`,
        images: [{ url: ogImage, width: 1200, height: 630, alt: PV_HERO_IMAGE.alt }],
      },
      twitter: { card: 'summary_large_image', images: [ogImage] },
    };
  }

  if (site.slug === 'pompeii-day-trip') {
    const title = 'Pompeii Day Trips — From Rome, Naples, Sorrento & Amalfi';
    const description =
      'Honest, first-hand Pompeii day-trip planning by origin city. Train-vs-tour logistics, timing, and real comparisons — not templated travel-blog filler.';
    const ogImage = `${PDT_HERO_IMAGE.src}?w=1200&h=630&q=80&auto=format&fit=crop`;
    return {
      title: { absolute: title },
      description,
      alternates: { canonical: `https://${SITE_DOMAIN}/${site.slug}` },
      openGraph: {
        title,
        description,
        url: `https://${SITE_DOMAIN}/${site.slug}`,
        images: [{ url: ogImage, width: 1200, height: 630, alt: PDT_HERO_IMAGE.alt }],
      },
      twitter: { card: 'summary_large_image', images: [ogImage] },
    };
  }

  if (site.slug === 'rome-vespa') {
    const title = 'Rome Vespa Tours — Guided, Self-Drive & Sidecar Routes';
    const description =
      'First-hand guide to Vespa and sidecar tours in Rome. Real routes, honest licence requirements, and which option actually suits you.';
    const ogImage = `${RV_HERO_IMAGE.src}?w=1200&h=630&q=80&auto=format&fit=crop`;
    return {
      title: { absolute: title },
      description,
      alternates: { canonical: `https://${SITE_DOMAIN}/${site.slug}` },
      openGraph: {
        title,
        description,
        url: `https://${SITE_DOMAIN}/${site.slug}`,
        images: [{ url: ogImage, width: 1200, height: 630, alt: RV_HERO_IMAGE.alt }],
      },
      twitter: { card: 'summary_large_image', images: [ogImage] },
    };
  }

  if (site.slug === 'golf-cart-rome') {
    const title = 'Golf Cart Tours of Rome — Guided, Seated & Accessible';
    const description =
      "Guided golf cart tours of Rome for families, seniors, and anyone who’d rather sit down and still see everything. Honest accessibility notes.";
    const ogImage = `${GCR_HERO_IMAGE.src}?w=1200&h=630&q=80&auto=format&fit=crop`;
    return {
      title: { absolute: title },
      description,
      alternates: { canonical: `https://${SITE_DOMAIN}/${site.slug}` },
      openGraph: {
        title,
        description,
        url: `https://${SITE_DOMAIN}/${site.slug}`,
        images: [{ url: ogImage, width: 1200, height: 630, alt: GCR_HERO_IMAGE.alt }],
      },
      twitter: { card: 'summary_large_image', images: [ogImage] },
    };
  }

  if (site.slug === 'cooking-in-rome') {
    const title = 'Rome Cooking Classes — Pasta, Pizza & Market-to-Table';
    const description =
      'First-hand guide to Rome cooking classes. Pasta, pizza, gelato and market-to-table options compared — every class taken in person.';
    const ogImage = `${CIR_HERO_IMAGE.src}?w=1200&h=630&q=80&auto=format&fit=crop`;
    return {
      title: { absolute: title },
      description,
      alternates: { canonical: `https://${SITE_DOMAIN}/${site.slug}` },
      openGraph: {
        title,
        description,
        url: `https://${SITE_DOMAIN}/${site.slug}`,
        images: [{ url: ogImage, width: 1200, height: 630, alt: CIR_HERO_IMAGE.alt }],
      },
      twitter: { card: 'summary_large_image', images: [ogImage] },
    };
  }

  if (site.slug === 'rome-pizza-class') {
    const title = 'Rome Pizza-Making Class — Hands-On, Wood-Fired Technique';
    const description =
      'Learn real Roman pizza-making hands-on. Family, private, and combo class options compared — every class taken in person first.';
    const ogImage = `${RPC_HERO_IMAGE.src}?w=1200&h=630&q=80&auto=format&fit=crop`;
    return {
      title: { absolute: title },
      description,
      alternates: { canonical: `https://${SITE_DOMAIN}/${site.slug}` },
      openGraph: {
        title,
        description,
        url: `https://${SITE_DOMAIN}/${site.slug}`,
        images: [{ url: ogImage, width: 1200, height: 630, alt: RPC_HERO_IMAGE.alt }],
      },
      twitter: { card: 'summary_large_image', images: [ogImage] },
    };
  }

  if (site.slug === 'tiramisu-class') {
    const title = 'Tiramisù Class Rome — Hands-On Dessert-Making';
    const description =
      'Learn to make real tiramisù hands-on in Rome. Couples, gift, and combo class options — every class taken in person first.';
    const ogImage = `${TC_HERO_IMAGE.src}?w=1200&h=630&q=80&auto=format&fit=crop`;
    return {
      title: { absolute: title },
      description,
      alternates: { canonical: `https://${SITE_DOMAIN}/${site.slug}` },
      openGraph: {
        title,
        description,
        url: `https://${SITE_DOMAIN}/${site.slug}`,
        images: [{ url: ogImage, width: 1200, height: 630, alt: TC_HERO_IMAGE.alt }],
      },
      twitter: { card: 'summary_large_image', images: [ogImage] },
    };
  }

  if (site.slug === 'tuscany-day-trip') {
    const title = 'Tuscany Day Trips — From Florence: Wine, Siena & Chianti';
    const description =
      'First-hand Tuscany day-trip guide from Florence. Honest wine-tour logistics, hill-town routing, and when to drive vs book a tour.';
    const ogImage = `${TDT_HERO_IMAGE.src}?w=1200&h=630&q=80&auto=format&fit=crop`;
    return {
      title: { absolute: title },
      description,
      alternates: { canonical: `https://${SITE_DOMAIN}/${site.slug}` },
      openGraph: {
        title,
        description,
        url: `https://${SITE_DOMAIN}/${site.slug}`,
        images: [{ url: ogImage, width: 1200, height: 630, alt: TDT_HERO_IMAGE.alt }],
      },
      twitter: { card: 'summary_large_image', images: [ogImage] },
    };
  }

  if (site.slug === 'amalfi-day-trip') {
    const title = 'Amalfi Coast Day Trips — By Road or By Boat, Honestly Compared';
    const description =
      'First-hand Amalfi Coast day-trip guide. Positano, Ravello, and Amalfi routing, boat-vs-road comparisons, and honest crowd timing.';
    const ogImage = `${ADT_HERO_IMAGE.src}?w=1200&h=630&q=80&auto=format&fit=crop`;
    return {
      title: { absolute: title },
      description,
      alternates: { canonical: `https://${SITE_DOMAIN}/${site.slug}` },
      openGraph: {
        title,
        description,
        url: `https://${SITE_DOMAIN}/${site.slug}`,
        images: [{ url: ogImage, width: 1200, height: 630, alt: ADT_HERO_IMAGE.alt }],
      },
      twitter: { card: 'summary_large_image', images: [ogImage] },
    };
  }

  if (site.slug === 'tivoli-day-trip') {
    const title = "Tivoli Day Trips — Villa d’Este & Hadrian’s Villa Guide";
    const description =
      "First-hand Tivoli day-trip guide from Rome. Villa d’Este vs Hadrian’s Villa, half-day vs full-day, and honest transit logistics.";
    const ogImage = `${TVDT_HERO_IMAGE.src}?w=1200&h=630&q=80&auto=format&fit=crop`;
    return {
      title: { absolute: title },
      description,
      alternates: { canonical: `https://${SITE_DOMAIN}/${site.slug}` },
      openGraph: {
        title,
        description,
        url: `https://${SITE_DOMAIN}/${site.slug}`,
        images: [{ url: ogImage, width: 1200, height: 630, alt: TVDT_HERO_IMAGE.alt }],
      },
      twitter: { card: 'summary_large_image', images: [ogImage] },
    };
  }

  if (site.slug === 'naples-street-food') {
    const title = 'Naples Street Food Tours — Pizza, Markets & Spaccanapoli';
    const description =
      'First-hand Naples food tours from a guide who actually visits Naples. Pizza at the source, market tastings, and honest routing.';
    const ogImage = `${NSF_HERO_IMAGE.src}?w=1200&h=630&q=80&auto=format&fit=crop`;
    return {
      title: { absolute: title },
      description,
      alternates: { canonical: `https://${SITE_DOMAIN}/${site.slug}` },
      openGraph: {
        title,
        description,
        url: `https://${SITE_DOMAIN}/${site.slug}`,
        images: [{ url: ogImage, width: 1200, height: 630, alt: NSF_HERO_IMAGE.alt }],
      },
      twitter: { card: 'summary_large_image', images: [ogImage] },
    };
  }

  // All 13 network properties now render as active sites (multi-tenancy enabled)
  const page = await safeGetPageDoc('home');
  const title = page?.metaTitle ? page.metaTitle.replace('Street Food Rome', site.name) : site.name;
  const description = page?.metaDesc ?? "A first-hand guide to Rome's street food — honest recommendations, no tourist traps.";

  return {
    title,
    description,
    alternates: { canonical: `https://${SITE_DOMAIN}/${site.slug}` },
    openGraph: page?.heroImageUrl
      ? {
          title,
          description,
          url: `https://${SITE_DOMAIN}/${site.slug}`,
          images: [{ url: page.heroImageUrl, alt: title }],
        }
      : undefined,
    twitter: page?.heroImageUrl ? { card: 'summary_large_image', images: [page.heroImageUrl] } : undefined,
  };
}

export default async function NetworkSitePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const site = getNetworkSite(slug);
  if (!site) notFound();

  if (site.slug === 'underground-colosseum') {
    return <UndergroundColosseumHome />;
  }

  if (site.slug === 'private-vatican') {
    return <PrivateVaticanHome />;
  }

  if (site.slug === 'pompeii-day-trip') {
    return <PompeiiDayTripHome />;
  }

  if (site.slug === 'rome-vespa') {
    return <RomeVespaHome />;
  }

  if (site.slug === 'golf-cart-rome') {
    return <GolfCartRomeHome />;
  }

  if (site.slug === 'cooking-in-rome') {
    return <CookingInRomeHome />;
  }

  if (site.slug === 'rome-pizza-class') {
    return <RomePizzaClassHome />;
  }

  if (site.slug === 'tiramisu-class') {
    return <TiramisuClassHome />;
  }

  if (site.slug === 'tuscany-day-trip') {
    return <TuscanyDayTripHome />;
  }

  if (site.slug === 'amalfi-day-trip') {
    return <AmalfiDayTripHome />;
  }

  if (site.slug === 'tivoli-day-trip') {
    return <TivoliDayTripHome />;
  }

  if (site.slug === 'naples-street-food') {
    return <NaplesStreetFoodHome />;
  }

  // All 13 network properties render the shared-template home page (multi-tenancy activated)
  const [page, tours, allBlogPosts] = await Promise.all([
    safeGetPageDoc('home'),
    safeGetAllTours(),
    safeGetAllBlogPosts(),
  ]);

  return (
    <HomePageBody
      siteName={site.name}
      canonicalUrl={`https://${SITE_DOMAIN}/${site.slug}`}
      heroImageUrl={page?.heroImageUrl ?? null}
      tours={tours}
      allBlogPosts={allBlogPosts}
    />
  );
}
