import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { UnderConstructionNotice } from '@/components/UnderConstructionNotice';
import { MoneyPageTemplate } from '@/components/underground-colosseum/MoneyPageTemplate';
import { SupportPageTemplate } from '@/components/underground-colosseum/SupportPageTemplate';
import { UCAboutPage } from '@/components/underground-colosseum/UCAboutPage';
import { UCContactPage } from '@/components/underground-colosseum/UCContactPage';
import { MoneyPageTemplate as PVMoneyPageTemplate } from '@/components/private-vatican/MoneyPageTemplate';
import { SupportPageTemplate as PVSupportPageTemplate } from '@/components/private-vatican/SupportPageTemplate';
import { PVAboutPage } from '@/components/private-vatican/PVAboutPage';
import { PVContactPage } from '@/components/private-vatican/PVContactPage';
import { MoneyPageTemplate as PDTMoneyPageTemplate } from '@/components/pompeii-day-trip/MoneyPageTemplate';
import { SupportPageTemplate as PDTSupportPageTemplate } from '@/components/pompeii-day-trip/SupportPageTemplate';
import { PDTAboutPage } from '@/components/pompeii-day-trip/PDTAboutPage';
import { PDTContactPage } from '@/components/pompeii-day-trip/PDTContactPage';
import { MoneyPageTemplate as RVMoneyPageTemplate } from '@/components/rome-vespa/MoneyPageTemplate';
import { SupportPageTemplate as RVSupportPageTemplate } from '@/components/rome-vespa/SupportPageTemplate';
import { RVAboutPage } from '@/components/rome-vespa/RVAboutPage';
import { RVContactPage } from '@/components/rome-vespa/RVContactPage';
import { MoneyPageTemplate as GCRMoneyPageTemplate } from '@/components/golf-cart-rome/MoneyPageTemplate';
import { SupportPageTemplate as GCRSupportPageTemplate } from '@/components/golf-cart-rome/SupportPageTemplate';
import { GCRAboutPage } from '@/components/golf-cart-rome/GCRAboutPage';
import { GCRContactPage } from '@/components/golf-cart-rome/GCRContactPage';
import { MoneyPageTemplate as CIRMoneyPageTemplate } from '@/components/cooking-in-rome/MoneyPageTemplate';
import { SupportPageTemplate as CIRSupportPageTemplate } from '@/components/cooking-in-rome/SupportPageTemplate';
import { CIRAboutPage } from '@/components/cooking-in-rome/CIRAboutPage';
import { CIRContactPage } from '@/components/cooking-in-rome/CIRContactPage';
import { MoneyPageTemplate as RPCMoneyPageTemplate } from '@/components/rome-pizza-class/MoneyPageTemplate';
import { SupportPageTemplate as RPCSupportPageTemplate } from '@/components/rome-pizza-class/SupportPageTemplate';
import { RPCAboutPage } from '@/components/rome-pizza-class/RPCAboutPage';
import { RPCContactPage } from '@/components/rome-pizza-class/RPCContactPage';
import { MoneyPageTemplate as TCMoneyPageTemplate } from '@/components/tiramisu-class/MoneyPageTemplate';
import { SupportPageTemplate as TCSupportPageTemplate } from '@/components/tiramisu-class/SupportPageTemplate';
import { TCAboutPage } from '@/components/tiramisu-class/TCAboutPage';
import { TCContactPage } from '@/components/tiramisu-class/TCContactPage';
import { ACTIVE_NETWORK_SLUG, getNetworkSite } from '@/lib/tours';
import { getMoneyPageContent, getSupportPageContent } from '@/lib/underground-colosseum-content';
import { ARENA_FLOOR_PAGE, MONEY_PAGES, SUPPORT_PAGES, WORTH_IT_PAGE } from '@/lib/underground-colosseum';
import {
  getMoneyPageContent as getPVMoneyPageContent,
  getSupportPageContent as getPVSupportPageContent,
} from '@/lib/private-vatican-content';
import { MONEY_PAGES as PV_MONEY_PAGES, SUPPORT_PAGES as PV_SUPPORT_PAGES } from '@/lib/private-vatican';
import {
  getMoneyPageContent as getPDTMoneyPageContent,
  getSupportPageContent as getPDTSupportPageContent,
} from '@/lib/pompeii-day-trip-content';
import { MONEY_PAGES as PDT_MONEY_PAGES, SUPPORT_PAGES as PDT_SUPPORT_PAGES } from '@/lib/pompeii-day-trip';
import {
  getMoneyPageContent as getRVMoneyPageContent,
  getSupportPageContent as getRVSupportPageContent,
} from '@/lib/rome-vespa-content';
import { MONEY_PAGES as RV_MONEY_PAGES, SUPPORT_PAGES as RV_SUPPORT_PAGES } from '@/lib/rome-vespa';
import {
  getMoneyPageContent as getGCRMoneyPageContent,
  getSupportPageContent as getGCRSupportPageContent,
} from '@/lib/golf-cart-rome-content';
import { MONEY_PAGES as GCR_MONEY_PAGES, SUPPORT_PAGES as GCR_SUPPORT_PAGES } from '@/lib/golf-cart-rome';
import {
  getMoneyPageContent as getCIRMoneyPageContent,
  getSupportPageContent as getCIRSupportPageContent,
} from '@/lib/cooking-in-rome-content';
import { MONEY_PAGES as CIR_MONEY_PAGES, SUPPORT_PAGES as CIR_SUPPORT_PAGES } from '@/lib/cooking-in-rome';
import {
  getMoneyPageContent as getRPCMoneyPageContent,
  getSupportPageContent as getRPCSupportPageContent,
} from '@/lib/rome-pizza-class-content';
import { MONEY_PAGES as RPC_MONEY_PAGES, SUPPORT_PAGES as RPC_SUPPORT_PAGES } from '@/lib/rome-pizza-class';
import {
  getMoneyPageContent as getTCMoneyPageContent,
  getSupportPageContent as getTCSupportPageContent,
} from '@/lib/tiramisu-class-content';
import { MONEY_PAGES as TC_MONEY_PAGES, SUPPORT_PAGES as TC_SUPPORT_PAGES } from '@/lib/tiramisu-class';
import { SITE_DOMAIN } from '@/lib/firestore';

/**
 * Catches every sub-path under a network property that isn't the platform's
 * ACTIVE_NETWORK_SLUG test site. Underground Colosseum, Private Vatican,
 * Pompeii Day Trip, Rome Vespa, Golf Cart Rome, Cooking in Rome, Rome Pizza
 * Class, and Tiramisù Class are all special-cased here too (alongside their
 * root page.tsx, which exports BESPOKE_HERO_SLUGS): each
 * property's money pages, support pages, /about, and /contact are real,
 * indexable content — built from the site's own blueprint — so those
 * specific paths render their real templates. Anything else under any of the
 * five (e.g.
 * /go/:slug, the affiliate redirect handler, which is a separate
 * infrastructure feature, not a content page) still falls through to the
 * "under construction" placeholder below, same as every other not-yet-built
 * network property's sub-paths.
 */

// Pre-renders each bespoke property's real sub-paths at build time, matching
// the pattern the root [slug] page and /tours/[slug] already use
// (generateStaticParams off a static registry). Everything else this
// catch-all handles (other network sites' placeholder sub-paths, /go/:slug,
// etc.) is intentionally left out — dynamicParams defaults to true, so those
// still render on-demand exactly as before; this only removes the
// per-request render cost for pages that are actually real, indexable
// content (doc 00's "SSG/ISR" baseline).
export async function generateStaticParams() {
  const ucHrefs = [
    ...MONEY_PAGES.map((p) => p.href),
    ...SUPPORT_PAGES.map((p) => p.href),
    ARENA_FLOOR_PAGE.href,
    WORTH_IT_PAGE.href,
    '/about',
    '/contact',
  ];
  const pvHrefs = [...PV_MONEY_PAGES.map((p) => p.href), ...PV_SUPPORT_PAGES.map((p) => p.href), '/about', '/contact'];
  const pdtHrefs = [...PDT_MONEY_PAGES.map((p) => p.href), ...PDT_SUPPORT_PAGES.map((p) => p.href), '/about', '/contact'];
  const rvHrefs = [...RV_MONEY_PAGES.map((p) => p.href), ...RV_SUPPORT_PAGES.map((p) => p.href), '/about', '/contact'];
  const gcrHrefs = [...GCR_MONEY_PAGES.map((p) => p.href), ...GCR_SUPPORT_PAGES.map((p) => p.href), '/about', '/contact'];
  const cirHrefs = [...CIR_MONEY_PAGES.map((p) => p.href), ...CIR_SUPPORT_PAGES.map((p) => p.href), '/about', '/contact'];
  const rpcHrefs = [...RPC_MONEY_PAGES.map((p) => p.href), ...RPC_SUPPORT_PAGES.map((p) => p.href), '/about', '/contact'];
  const tcHrefs = [...TC_MONEY_PAGES.map((p) => p.href), ...TC_SUPPORT_PAGES.map((p) => p.href), '/about', '/contact'];

  return [
    ...ucHrefs.map((href) => ({ slug: 'underground-colosseum', rest: [href.replace(/^\//, '')] })),
    ...pvHrefs.map((href) => ({ slug: 'private-vatican', rest: [href.replace(/^\//, '')] })),
    ...pdtHrefs.map((href) => ({ slug: 'pompeii-day-trip', rest: [href.replace(/^\//, '')] })),
    ...rvHrefs.map((href) => ({ slug: 'rome-vespa', rest: [href.replace(/^\//, '')] })),
    ...gcrHrefs.map((href) => ({ slug: 'golf-cart-rome', rest: [href.replace(/^\//, '')] })),
    ...cirHrefs.map((href) => ({ slug: 'cooking-in-rome', rest: [href.replace(/^\//, '')] })),
    ...rpcHrefs.map((href) => ({ slug: 'rome-pizza-class', rest: [href.replace(/^\//, '')] })),
    ...tcHrefs.map((href) => ({ slug: 'tiramisu-class', rest: [href.replace(/^\//, '')] })),
  ];
}

function resolveUndergroundColosseumPage(path: string) {
  const money = getMoneyPageContent(path);
  if (money) return { type: 'money' as const, content: money };

  const support = getSupportPageContent(path);
  if (support) return { type: 'support' as const, content: support };

  if (path === '/about') return { type: 'about' as const };
  if (path === '/contact') return { type: 'contact' as const };

  return null;
}

function resolvePrivateVaticanPage(path: string) {
  const money = getPVMoneyPageContent(path);
  if (money) return { type: 'money' as const, content: money };

  const support = getPVSupportPageContent(path);
  if (support) return { type: 'support' as const, content: support };

  if (path === '/about') return { type: 'about' as const };
  if (path === '/contact') return { type: 'contact' as const };

  return null;
}

function resolvePompeiiDayTripPage(path: string) {
  const money = getPDTMoneyPageContent(path);
  if (money) return { type: 'money' as const, content: money };

  const support = getPDTSupportPageContent(path);
  if (support) return { type: 'support' as const, content: support };

  if (path === '/about') return { type: 'about' as const };
  if (path === '/contact') return { type: 'contact' as const };

  return null;
}

function resolveRomeVespaPage(path: string) {
  const money = getRVMoneyPageContent(path);
  if (money) return { type: 'money' as const, content: money };

  const support = getRVSupportPageContent(path);
  if (support) return { type: 'support' as const, content: support };

  if (path === '/about') return { type: 'about' as const };
  if (path === '/contact') return { type: 'contact' as const };

  return null;
}

function resolveGolfCartRomePage(path: string) {
  const money = getGCRMoneyPageContent(path);
  if (money) return { type: 'money' as const, content: money };

  const support = getGCRSupportPageContent(path);
  if (support) return { type: 'support' as const, content: support };

  if (path === '/about') return { type: 'about' as const };
  if (path === '/contact') return { type: 'contact' as const };

  return null;
}

function resolveCookingInRomePage(path: string) {
  const money = getCIRMoneyPageContent(path);
  if (money) return { type: 'money' as const, content: money };

  const support = getCIRSupportPageContent(path);
  if (support) return { type: 'support' as const, content: support };

  if (path === '/about') return { type: 'about' as const };
  if (path === '/contact') return { type: 'contact' as const };

  return null;
}

function resolveRomePizzaClassPage(path: string) {
  const money = getRPCMoneyPageContent(path);
  if (money) return { type: 'money' as const, content: money };

  const support = getRPCSupportPageContent(path);
  if (support) return { type: 'support' as const, content: support };

  if (path === '/about') return { type: 'about' as const };
  if (path === '/contact') return { type: 'contact' as const };

  return null;
}

function resolveTiramisuClassPage(path: string) {
  const money = getTCMoneyPageContent(path);
  if (money) return { type: 'money' as const, content: money };

  const support = getTCSupportPageContent(path);
  if (support) return { type: 'support' as const, content: support };

  if (path === '/about') return { type: 'about' as const };
  if (path === '/contact') return { type: 'contact' as const };

  return null;
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string; rest: string[] }> }): Promise<Metadata> {
  const { slug, rest } = await params;
  const site = getNetworkSite(slug);
  if (!site) return {};

  if (site.slug === 'underground-colosseum') {
    const path = `/${rest.join('/')}`;
    const resolved = resolveUndergroundColosseumPage(path);
    const canonical = `https://${SITE_DOMAIN}/${site.slug}${path}`;

    if (resolved?.type === 'money') {
      return {
        title: { absolute: resolved.content.metaTitle },
        description: resolved.content.metaDescription,
        alternates: { canonical },
        openGraph: { title: resolved.content.metaTitle, description: resolved.content.metaDescription, url: canonical },
      };
    }
    if (resolved?.type === 'support') {
      return {
        title: { absolute: resolved.content.metaTitle },
        description: resolved.content.metaDescription,
        alternates: { canonical },
        openGraph: { title: resolved.content.metaTitle, description: resolved.content.metaDescription, url: canonical },
      };
    }
    if (resolved?.type === 'about') {
      return {
        title: { absolute: 'About Underground Colosseum — First-Hand, Independent Tour Research' },
        description:
          'Every Colosseum underground tour comparison here is written by someone who walked the routes and cross-checked GetYourGuide, Viator, and Tiqets in person — zero sponsored placements.',
        alternates: { canonical },
      };
    }
    if (resolved?.type === 'contact') {
      return {
        title: { absolute: 'Contact | Underground Colosseum' },
        description: 'Get in touch with Underground Colosseum, plus our full affiliate disclosure.',
        alternates: { canonical },
      };
    }

    return { title: `${site.name} | Page Not Found`, robots: { index: false, follow: false } };
  }

  if (site.slug === 'private-vatican') {
    const path = `/${rest.join('/')}`;
    const resolved = resolvePrivateVaticanPage(path);
    const canonical = `https://${SITE_DOMAIN}/${site.slug}${path}`;

    if (resolved?.type === 'money') {
      return {
        title: { absolute: resolved.content.metaTitle },
        description: resolved.content.metaDescription,
        alternates: { canonical },
        openGraph: { title: resolved.content.metaTitle, description: resolved.content.metaDescription, url: canonical },
      };
    }
    if (resolved?.type === 'support') {
      return {
        title: { absolute: resolved.content.metaTitle },
        description: resolved.content.metaDescription,
        alternates: { canonical },
        openGraph: { title: resolved.content.metaTitle, description: resolved.content.metaDescription, url: canonical },
      };
    }
    if (resolved?.type === 'about') {
      return {
        title: { absolute: 'About Private Vatican — First-Hand, Independent Tour Research' },
        description:
          'Every Vatican early-access and private tour comparison here is written by a licensed Rome guide who took the tours and cross-checked GetYourGuide, Viator, and Tiqets in person — not affiliated with the Vatican Museums.',
        alternates: { canonical },
      };
    }
    if (resolved?.type === 'contact') {
      return {
        title: { absolute: 'Contact | Private Vatican' },
        description: 'Get in touch with Private Vatican, plus our full affiliate disclosure and non-affiliation statement.',
        alternates: { canonical },
      };
    }

    return { title: `${site.name} | Page Not Found`, robots: { index: false, follow: false } };
  }

  if (site.slug === 'pompeii-day-trip') {
    const path = `/${rest.join('/')}`;
    const resolved = resolvePompeiiDayTripPage(path);
    const canonical = `https://${SITE_DOMAIN}/${site.slug}${path}`;

    if (resolved?.type === 'money') {
      return {
        title: { absolute: resolved.content.metaTitle },
        description: resolved.content.metaDescription,
        alternates: { canonical },
        openGraph: { title: resolved.content.metaTitle, description: resolved.content.metaDescription, url: canonical },
      };
    }
    if (resolved?.type === 'support') {
      return {
        title: { absolute: resolved.content.metaTitle },
        description: resolved.content.metaDescription,
        alternates: { canonical },
        openGraph: { title: resolved.content.metaTitle, description: resolved.content.metaDescription, url: canonical },
      };
    }
    if (resolved?.type === 'about') {
      return {
        title: { absolute: 'About Pompeii Day Trip — First-Hand, Independent Trip Planning' },
        description:
          'Every Pompeii day-trip comparison here is written by a Bay of Naples regional guide who has run the trip from Rome, Naples, and Sorrento in person — zero sponsored placements.',
        alternates: { canonical },
      };
    }
    if (resolved?.type === 'contact') {
      return {
        title: { absolute: 'Contact | Pompeii Day Trip' },
        description: 'Get in touch with Pompeii Day Trip, plus our full affiliate disclosure.',
        alternates: { canonical },
      };
    }

    return { title: `${site.name} | Page Not Found`, robots: { index: false, follow: false } };
  }

  if (site.slug === 'rome-vespa') {
    const path = `/${rest.join('/')}`;
    const resolved = resolveRomeVespaPage(path);
    const canonical = `https://${SITE_DOMAIN}/${site.slug}${path}`;

    if (resolved?.type === 'money') {
      return {
        title: { absolute: resolved.content.metaTitle },
        description: resolved.content.metaDescription,
        alternates: { canonical },
        openGraph: { title: resolved.content.metaTitle, description: resolved.content.metaDescription, url: canonical },
      };
    }
    if (resolved?.type === 'support') {
      return {
        title: { absolute: resolved.content.metaTitle },
        description: resolved.content.metaDescription,
        alternates: { canonical },
        openGraph: { title: resolved.content.metaTitle, description: resolved.content.metaDescription, url: canonical },
      };
    }
    if (resolved?.type === 'about') {
      return {
        title: { absolute: 'About Rome Scooter Tours — First-Hand, Independent Tour Research' },
        description:
          'Every Rome Vespa and sidecar tour comparison here is written by a licensed motorcycle instructor who rode the routes and cross-checked GetYourGuide and Viator in person — zero sponsored placements.',
        alternates: { canonical },
      };
    }
    if (resolved?.type === 'contact') {
      return {
        title: { absolute: 'Contact | Rome Scooter Tours' },
        description: 'Get in touch with Rome Scooter Tours, plus our full affiliate disclosure.',
        alternates: { canonical },
      };
    }

    return { title: `${site.name} | Page Not Found`, robots: { index: false, follow: false } };
  }

  if (site.slug === 'golf-cart-rome') {
    const path = `/${rest.join('/')}`;
    const resolved = resolveGolfCartRomePage(path);
    const canonical = `https://${SITE_DOMAIN}/${site.slug}${path}`;

    if (resolved?.type === 'money') {
      return {
        title: { absolute: resolved.content.metaTitle },
        description: resolved.content.metaDescription,
        alternates: { canonical },
        openGraph: { title: resolved.content.metaTitle, description: resolved.content.metaDescription, url: canonical },
      };
    }
    if (resolved?.type === 'support') {
      return {
        title: { absolute: resolved.content.metaTitle },
        description: resolved.content.metaDescription,
        alternates: { canonical },
        openGraph: { title: resolved.content.metaTitle, description: resolved.content.metaDescription, url: canonical },
      };
    }
    if (resolved?.type === 'about') {
      return {
        title: { absolute: 'About Golf Cart Rome — First-Hand, Independent Accessibility Research' },
        description:
          'Every Golf Cart Rome tour comparison here is written by a certified accessible-travel consultant who checked boarding, mobility, and comfort in person — zero sponsored placements.',
        alternates: { canonical },
      };
    }
    if (resolved?.type === 'contact') {
      return {
        title: { absolute: 'Contact | Golf Cart Rome' },
        description: 'Get in touch with Golf Cart Rome, plus our full affiliate disclosure.',
        alternates: { canonical },
      };
    }

    return { title: `${site.name} | Page Not Found`, robots: { index: false, follow: false } };
  }

  if (site.slug === 'cooking-in-rome') {
    const path = `/${rest.join('/')}`;
    const resolved = resolveCookingInRomePage(path);
    const canonical = `https://${SITE_DOMAIN}/${site.slug}${path}`;

    if (resolved?.type === 'money') {
      return {
        title: { absolute: resolved.content.metaTitle },
        description: resolved.content.metaDescription,
        alternates: { canonical },
        openGraph: { title: resolved.content.metaTitle, description: resolved.content.metaDescription, url: canonical },
      };
    }
    if (resolved?.type === 'support') {
      return {
        title: { absolute: resolved.content.metaTitle },
        description: resolved.content.metaDescription,
        alternates: { canonical },
        openGraph: { title: resolved.content.metaTitle, description: resolved.content.metaDescription, url: canonical },
      };
    }
    if (resolved?.type === 'about') {
      return {
        title: { absolute: 'About Cooking in Rome — First-Hand, Independent Class Research' },
        description:
          'Every Rome cooking class comparison here is written by a Rome-based culinary instructor who has taken the classes and cross-checked GetYourGuide, Viator, and Civitatis in person — zero sponsored placements.',
        alternates: { canonical },
      };
    }
    if (resolved?.type === 'contact') {
      return {
        title: { absolute: 'Contact | Cooking in Rome' },
        description: 'Get in touch with Cooking in Rome, plus our full affiliate disclosure.',
        alternates: { canonical },
      };
    }

    return { title: `${site.name} | Page Not Found`, robots: { index: false, follow: false } };
  }

  if (site.slug === 'rome-pizza-class') {
    const path = `/${rest.join('/')}`;
    const resolved = resolveRomePizzaClassPage(path);
    const canonical = `https://${SITE_DOMAIN}/${site.slug}${path}`;

    if (resolved?.type === 'money') {
      return {
        title: { absolute: resolved.content.metaTitle },
        description: resolved.content.metaDescription,
        alternates: { canonical },
        openGraph: { title: resolved.content.metaTitle, description: resolved.content.metaDescription, url: canonical },
      };
    }
    if (resolved?.type === 'support') {
      return {
        title: { absolute: resolved.content.metaTitle },
        description: resolved.content.metaDescription,
        alternates: { canonical },
        openGraph: { title: resolved.content.metaTitle, description: resolved.content.metaDescription, url: canonical },
      };
    }
    if (resolved?.type === 'about') {
      return {
        title: { absolute: 'About Rome Pizza Class — First-Hand, Independent Class Research' },
        description:
          'Every Rome pizza-making class comparison here is written by a Rome-based pizzaiolo who has taken the classes and cross-checked GetYourGuide and Viator in person — zero sponsored placements.',
        alternates: { canonical },
      };
    }
    if (resolved?.type === 'contact') {
      return {
        title: { absolute: 'Contact | Rome Pizza Class' },
        description: 'Get in touch with Rome Pizza Class, plus our full affiliate disclosure.',
        alternates: { canonical },
      };
    }

    return { title: `${site.name} | Page Not Found`, robots: { index: false, follow: false } };
  }

  if (site.slug === 'tiramisu-class') {
    const path = `/${rest.join('/')}`;
    const resolved = resolveTiramisuClassPage(path);
    const canonical = `https://${SITE_DOMAIN}/${site.slug}${path}`;

    if (resolved?.type === 'money') {
      return {
        title: { absolute: resolved.content.metaTitle },
        description: resolved.content.metaDescription,
        alternates: { canonical },
        openGraph: { title: resolved.content.metaTitle, description: resolved.content.metaDescription, url: canonical },
      };
    }
    if (resolved?.type === 'support') {
      return {
        title: { absolute: resolved.content.metaTitle },
        description: resolved.content.metaDescription,
        alternates: { canonical },
        openGraph: { title: resolved.content.metaTitle, description: resolved.content.metaDescription, url: canonical },
      };
    }
    if (resolved?.type === 'about') {
      return {
        title: { absolute: 'About Tiramisù Class — First-Hand, Independent Class Research' },
        description:
          'Every Rome tiramisù class comparison here is written by a Rome-based pastry chef who has taken the classes and cross-checked GetYourGuide and Viator in person — zero sponsored placements.',
        alternates: { canonical },
      };
    }
    if (resolved?.type === 'contact') {
      return {
        title: { absolute: 'Contact | Tiramisù Class' },
        description: 'Get in touch with Tiramisù Class, plus our full affiliate disclosure.',
        alternates: { canonical },
      };
    }

    return { title: `${site.name} | Page Not Found`, robots: { index: false, follow: false } };
  }

  if (site.slug === ACTIVE_NETWORK_SLUG) return {};
  return { title: `${site.name} | Page Not Found`, robots: { index: false, follow: false } };
}

export default async function NetworkSiteSubPage({ params }: { params: Promise<{ slug: string; rest: string[] }> }) {
  const { slug, rest } = await params;
  const site = getNetworkSite(slug);
  if (!site) notFound();

  if (site.slug === 'underground-colosseum') {
    const path = `/${rest.join('/')}`;
    const resolved = resolveUndergroundColosseumPage(path);

    if (resolved?.type === 'money') return <MoneyPageTemplate content={resolved.content} />;
    if (resolved?.type === 'support') return <SupportPageTemplate content={resolved.content} />;
    if (resolved?.type === 'about') return <UCAboutPage />;
    if (resolved?.type === 'contact') return <UCContactPage />;

    return <UnderConstructionNotice siteName={site.name} />;
  }

  if (site.slug === 'private-vatican') {
    const path = `/${rest.join('/')}`;
    const resolved = resolvePrivateVaticanPage(path);

    if (resolved?.type === 'money') return <PVMoneyPageTemplate content={resolved.content} />;
    if (resolved?.type === 'support') return <PVSupportPageTemplate content={resolved.content} />;
    if (resolved?.type === 'about') return <PVAboutPage />;
    if (resolved?.type === 'contact') return <PVContactPage />;

    return <UnderConstructionNotice siteName={site.name} />;
  }

  if (site.slug === 'pompeii-day-trip') {
    const path = `/${rest.join('/')}`;
    const resolved = resolvePompeiiDayTripPage(path);

    if (resolved?.type === 'money') return <PDTMoneyPageTemplate content={resolved.content} />;
    if (resolved?.type === 'support') return <PDTSupportPageTemplate content={resolved.content} />;
    if (resolved?.type === 'about') return <PDTAboutPage />;
    if (resolved?.type === 'contact') return <PDTContactPage />;

    return <UnderConstructionNotice siteName={site.name} />;
  }

  if (site.slug === 'rome-vespa') {
    const path = `/${rest.join('/')}`;
    const resolved = resolveRomeVespaPage(path);

    if (resolved?.type === 'money') return <RVMoneyPageTemplate content={resolved.content} />;
    if (resolved?.type === 'support') return <RVSupportPageTemplate content={resolved.content} />;
    if (resolved?.type === 'about') return <RVAboutPage />;
    if (resolved?.type === 'contact') return <RVContactPage />;

    return <UnderConstructionNotice siteName={site.name} />;
  }

  if (site.slug === 'golf-cart-rome') {
    const path = `/${rest.join('/')}`;
    const resolved = resolveGolfCartRomePage(path);

    if (resolved?.type === 'money') return <GCRMoneyPageTemplate content={resolved.content} />;
    if (resolved?.type === 'support') return <GCRSupportPageTemplate content={resolved.content} />;
    if (resolved?.type === 'about') return <GCRAboutPage />;
    if (resolved?.type === 'contact') return <GCRContactPage />;

    return <UnderConstructionNotice siteName={site.name} />;
  }

  if (site.slug === 'cooking-in-rome') {
    const path = `/${rest.join('/')}`;
    const resolved = resolveCookingInRomePage(path);

    if (resolved?.type === 'money') return <CIRMoneyPageTemplate content={resolved.content} />;
    if (resolved?.type === 'support') return <CIRSupportPageTemplate content={resolved.content} />;
    if (resolved?.type === 'about') return <CIRAboutPage />;
    if (resolved?.type === 'contact') return <CIRContactPage />;

    return <UnderConstructionNotice siteName={site.name} />;
  }

  if (site.slug === 'rome-pizza-class') {
    const path = `/${rest.join('/')}`;
    const resolved = resolveRomePizzaClassPage(path);

    if (resolved?.type === 'money') return <RPCMoneyPageTemplate content={resolved.content} />;
    if (resolved?.type === 'support') return <RPCSupportPageTemplate content={resolved.content} />;
    if (resolved?.type === 'about') return <RPCAboutPage />;
    if (resolved?.type === 'contact') return <RPCContactPage />;

    return <UnderConstructionNotice siteName={site.name} />;
  }

  if (site.slug === 'tiramisu-class') {
    const path = `/${rest.join('/')}`;
    const resolved = resolveTiramisuClassPage(path);

    if (resolved?.type === 'money') return <TCMoneyPageTemplate content={resolved.content} />;
    if (resolved?.type === 'support') return <TCSupportPageTemplate content={resolved.content} />;
    if (resolved?.type === 'about') return <TCAboutPage />;
    if (resolved?.type === 'contact') return <TCContactPage />;

    return <UnderConstructionNotice siteName={site.name} />;
  }

  if (site.slug === ACTIVE_NETWORK_SLUG) notFound();

  return <UnderConstructionNotice siteName={site.name} />;
}
