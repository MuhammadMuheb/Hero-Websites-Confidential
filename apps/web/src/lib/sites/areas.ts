/**
 * Area / neighbourhood hub data for the three network sites that have one
 * (Underground Colosseum, Pompeii Day Trip, Rome Vespa). Rendered with the
 * master design by MasterAreasPage / MasterAreaPage in
 * src/components/master/MasterPages.tsx. Only text and links live here.
 */
import { FEATURED_TOURS as PDT_TOURS } from '@/lib/pompeii-day-trip';

export interface AreaEntry {
  slug: string;
  name: string;
  description: string;
  /** Where the card links. Omitted = the area's own detail page (Pompeii only). */
  href?: string;
}

export interface AreaHub {
  eyebrow: string;
  title: string;
  subtitle: string;
  /** [before, green word, after] */
  sectionTitle: [string, string, string];
  /** Where the areas are, used in page text, e.g. "Pompeii". */
  place: string;
  areas: AreaEntry[];
  /** Area detail pages exist at /neighborhoods/{slug}. */
  hasDetailPages: boolean;
}

export const COLOSSEUM_AREAS: AreaEntry[] = [
  {
    slug: 'arena-floor',
    name: 'The Arena Floor',
    description: 'Where the games took place. Part of the floor has been rebuilt, and some tours let you stand on it and look up at the whole amphitheatre.',
    href: '/money/underground-arena-floor-tour',
  },
  {
    slug: 'hypogeum',
    name: 'The Hypogeum (Underground)',
    description: 'The tunnels and rooms under the arena, where animals, fighters and stage machinery waited before being lifted up to the floor.',
    href: '/support/how-underground-access-really-works',
  },
  {
    slug: 'upper-tiers',
    name: 'Upper Tiers & Seating',
    description: 'The seating levels, split by social class. The higher levels give the best overview of the arena and the Forum next door.',
    href: '/money/skip-the-line-colosseum-tickets',
  },
  {
    slug: 'external-arches',
    name: 'External Arches & Entrances',
    description: 'The ground-floor arches, most of them numbered, which let tens of thousands of spectators in and out quickly.',
    href: '/support/getting-there-metro-meeting-points',
  },
  {
    slug: 'vaulted-passages',
    name: 'Vaulted Passages & Corridors',
    description: 'The covered corridors and stairways that linked the entrances to the seats. Every standard visit walks through them.',
    href: '/support/opening-hours-beating-the-crowds',
  },
  {
    slug: 'travertine-wall',
    name: 'Travertine Outer Wall',
    description: 'The four-storey outer wall of travertine stone, the image most people picture when they think of the Colosseum.',
    href: '/colosseum-forum-palatine-itinerary',
  },
  {
    slug: 'gladiator-barracks-area',
    name: 'Gladiator Gate & Ludus Magnus',
    description: 'The route fighters took into the arena, and the remains of the Ludus Magnus, the gladiator training school just next to the Colosseum.',
    href: '/money/underground-arena-floor-tour',
  },
  {
    slug: 'forum-palatine',
    name: 'Roman Forum & Palatine Hill',
    description: 'Included on the same ticket as the Colosseum. Most visitors combine all three in one day.',
    href: '/colosseum-forum-palatine-itinerary',
  },
];

export const POMPEII_AREAS: AreaEntry[] = [
  { slug: 'forum', name: 'The Forum', description: 'The civic centre of ancient Pompeii, with temples, markets and public buildings around a long open square.' },
  { slug: 'house-of-the-faun', name: 'House of the Faun', description: 'One of the largest houses in Pompeii. The famous Alexander mosaic found here is now in the Naples museum; a copy is on site.' },
  { slug: 'house-of-mysteries', name: 'Villa of the Mysteries', description: 'A villa just outside the walls, known for its large painted room showing a mysterious ritual scene.' },
  { slug: 'amphitheater', name: 'Amphitheatre', description: 'One of the oldest surviving stone amphitheatres in the Roman world, at the eastern edge of the site.' },
  { slug: 'theaters', name: 'Theatres', description: 'The Large Theatre and the smaller covered Odeon, used for plays, music and public events.' },
  { slug: 'street-of-tombs', name: 'Street of Tombs', description: 'A road outside the city gate lined with family tombs and monuments.' },
  { slug: 'bakery-thermopolium', name: 'Bakeries & Thermopolium', description: 'Ancient bakeries with their mills and ovens, and street-food counters where people bought hot food.' },
  { slug: 'lupanare', name: 'The Lupanare', description: 'An ancient brothel with small rooms, painted scenes and graffiti left by visitors.' },
  { slug: 'herculaneum-gate', name: 'Herculaneum Gate', description: 'The north-western gate of the city, where the road left Pompeii towards Herculaneum and the Street of Tombs begins.' },
  { slug: 'garden-houses', name: 'Houses & Gardens', description: 'Homes of every size, from grand houses with gardens and fountains to simple shops with rooms above.' },
];

export const ROME_VESPA_AREAS: AreaEntry[] = [
  { slug: 'centro-storico', name: 'Centro Storico', description: 'The historic centre, with narrow lanes, piazzas and fountains. Many Vespa tours pass Piazza Navona and the Pantheon area.', href: '/what-a-vespa-tour-covers' },
  { slug: 'trastevere', name: 'Trastevere', description: 'Cobbled streets and ivy-covered buildings on the west bank of the Tiber, especially lively in the evening.', href: '/money/vespa-at-sunset' },
  { slug: 'testaccio', name: 'Testaccio', description: 'A real local neighbourhood with a food market and everyday Roman street life.', href: '/what-a-vespa-tour-covers' },
  { slug: 'prati', name: 'Prati', description: 'An elegant area near the Vatican with wide, straight avenues that are easy to ride.', href: '/money/vespa-tour-of-rome' },
  { slug: 'monti', name: 'Monti', description: 'A hilly neighbourhood behind the Forum, with small squares, cafés and independent shops.', href: '/what-a-vespa-tour-covers' },
  { slug: 'campo-de-fiori', name: "Campo de' Fiori", description: 'A market square by day and a busy meeting point in the evening.', href: '/money/vespa-tour-of-rome' },
  { slug: 'jewish-ghetto', name: 'Jewish Ghetto', description: 'A small, historic quarter by the river, home to one of the oldest Jewish communities in Europe.', href: '/what-a-vespa-tour-covers' },
  { slug: 'colosseum-area', name: 'Colosseum Area', description: 'The big ancient monuments: the Colosseum, the Forum and the wide avenues around them.', href: '/money/vespa-tour-of-rome' },
  { slug: 'appian-way', name: 'Appian Way', description: 'The ancient Roman road south of the city, with open countryside views and archaeological sites.', href: '/money/private-vespa-tour' },
  { slug: 'villa-borghese', name: 'Villa Borghese', description: "One of Rome's largest parks, with shady lanes and views over the city.", href: '/money/private-vespa-tour' },
];

const HUBS: Record<string, AreaHub> = {
  'underground-colosseum': {
    eyebrow: 'Inside the Colosseum',
    title: 'Explore the Colosseum by Area',
    subtitle: 'What each part of the amphitheatre is, and which ticket or tour lets you see it.',
    sectionTitle: ['The Colosseum ', 'Area', ' by Area'],
    place: 'the Colosseum',
    areas: COLOSSEUM_AREAS,
    hasDetailPages: false,
  },
  'pompeii-day-trip': {
    eyebrow: 'Inside Pompeii',
    title: 'Explore Pompeii by Area',
    subtitle: 'The main zones and landmarks of the archaeological site, so you can plan your route.',
    sectionTitle: ['Pompeii ', 'Area', ' by Area'],
    place: 'Pompeii',
    areas: POMPEII_AREAS,
    hasDetailPages: true,
  },
  'rome-vespa': {
    eyebrow: 'Ride Rome',
    title: 'Ride Rome by Neighbourhood',
    subtitle: 'The neighbourhoods Vespa tours ride through, and what each one feels like from the saddle.',
    sectionTitle: ['Rome ', 'Neighbourhood', ' by Neighbourhood'],
    place: 'Rome',
    areas: ROME_VESPA_AREAS,
    hasDetailPages: false,
  },
};

export function getAreaHub(slug: string): AreaHub | null {
  return HUBS[slug] ?? null;
}

/* ------------------------------------------------------------------ */
/* Pompeii tour categories (/tours/category/{rome|naples|...})          */
/* ------------------------------------------------------------------ */

export const PDT_TOUR_CATEGORIES: { slug: string; title: string; description: string; tag: string }[] = [
  { slug: 'rome', title: 'Pompeii from Rome', description: 'Pompeii day trips that start in Rome, by train or by coach.', tag: 'from-rome' },
  { slug: 'naples', title: 'Pompeii from Naples', description: 'Pompeii from Naples, the closest base and the fastest route to the ruins.', tag: 'from-naples' },
  { slug: 'vesuvius', title: 'Pompeii + Vesuvius', description: 'Tours that combine the ruins with a walk up to the crater of Mount Vesuvius.', tag: 'vesuvius' },
  { slug: 'herculaneum', title: 'Pompeii + Herculaneum', description: 'Tours that pair Pompeii with Herculaneum, the smaller and better-preserved town nearby.', tag: 'herculaneum' },
];

/** Tour slugs for a Pompeii tour category, in the site's own order. */
export function pompeiiCategoryTourSlugs(category: string): string[] {
  const cat = PDT_TOUR_CATEGORIES.find((c) => c.slug === category);
  if (!cat) return [];
  return PDT_TOURS.filter((t) => t.tags.includes(cat.tag)).map((t) => t.slug);
}
