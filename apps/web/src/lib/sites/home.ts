/**
 * Homepage content for the 12 network sites.
 *
 * Every network homepage renders the SAME <HomePageBody> as Street Food Rome
 * (the master). Only the text and images change. This file builds that content
 * from each site's own real data in src/lib/<slug>.ts (MONEY_PAGES,
 * SUPPORT_PAGES, FEATURED_TOURS, galleries) plus the per-site copy in COPY
 * below. Nothing here is invented: tours, prices and images all come from the
 * site's own data file.
 */
import type { TourDoc } from '@/lib/firestore';
import * as UC from '@/lib/underground-colosseum';
import * as PDT from '@/lib/pompeii-day-trip';
import * as RV from '@/lib/rome-vespa';
import * as TDT from '@/lib/tuscany-day-trip';
import * as PV from '@/lib/private-vatican';
import * as GCR from '@/lib/golf-cart-rome';
import * as CIR from '@/lib/cooking-in-rome';
import * as RPC from '@/lib/rome-pizza-class';
import * as TC from '@/lib/tiramisu-class';
import * as NSF from '@/lib/naples-street-food';
import * as ADT from '@/lib/amalfi-day-trip';
import * as TVDT from '@/lib/tivoli-day-trip';

export type IconName = 'heart' | 'users' | 'map' | 'clock' | 'compass' | 'camera';

export interface LinkItem {
  label: string;
  href: string;
}

export interface HomeCategory {
  name: string;
  slug: string;
  description: string;
  imageUrl: string;
  href: string;
  tourSlugs: string[];
}

export interface HomeContent {
  siteName: string;
  city: string;
  metaTitle: string;
  metaDescription: string;
  heroImage: { src: string; alt: string };
  heroEyebrow: string;
  /** [before, gold word, after] */
  heroTitle: [string, string, string];
  searchPlaceholder: string;
  chips: LinkItem[];
  namesLabel: string;
  names: LinkItem[];
  sliderEyebrow: string;
  /** [before, green word, after] */
  sliderTitle: [string, string, string];
  tours: TourDoc[];
  /** tour slug -> internal page the card opens */
  tourHrefs: Record<string, string>;
  categoryEyebrow: string;
  categoryTitle: [string, string, string];
  categories: HomeCategory[];
  howEyebrow: string;
  howTitle: [string, string, string];
  howSubtitle: string;
  how: { title: string; description: string; icon: IconName }[];
  placesTitle: string;
  attractions: LinkItem[];
  topTours: LinkItem[];
}

/* ------------------------------------------------------------------ */
/* Raw site data                                                        */
/* ------------------------------------------------------------------ */

interface RawImage {
  src: string;
  alt: string;
}
interface RawPage {
  title: string;
  href: string;
  blurb?: string;
  image?: RawImage;
}
interface RawTour {
  slug: string;
  title: string;
  meta: string;
  priceFrom: number;
  image: RawImage;
  partner?: string;
  badge?: string | null;
}
interface RawSite {
  money: RawPage[];
  support: RawPage[];
  tours: RawTour[];
  gallery: RawImage[];
  toursFor?: (href: string, max?: number) => RawTour[];
}

function raw(mod: {
  MONEY_PAGES: readonly RawPage[];
  SUPPORT_PAGES: readonly RawPage[];
  FEATURED_TOURS: readonly RawTour[];
  getFeaturedToursForPage?: (href: string, max?: number) => readonly RawTour[];
}, gallery: readonly RawImage[]): RawSite {
  const fn = mod.getFeaturedToursForPage;
  return {
    money: [...mod.MONEY_PAGES],
    support: [...mod.SUPPORT_PAGES],
    tours: [...mod.FEATURED_TOURS],
    gallery: [...gallery],
    toursFor: fn ? (href, max) => [...fn(href, max)] : undefined,
  };
}

const RAW: Record<string, RawSite> = {
  'underground-colosseum': raw(UC, UC.ARENA_FLOOR_GALLERY),
  'pompeii-day-trip': raw(PDT, PDT.POMPEII_GALLERY),
  'rome-vespa': raw(RV, RV.ROME_VESPA_GALLERY),
  'tuscany-day-trip': raw(TDT, TDT.TUSCANY_DAY_TRIP_GALLERY),
  'private-vatican': raw(PV, PV.VATICAN_GALLERY),
  'golf-cart-rome': raw(GCR, GCR.GOLF_CART_ROME_GALLERY),
  'cooking-in-rome': raw(CIR, CIR.COOKING_IN_ROME_GALLERY),
  'rome-pizza-class': raw(RPC, RPC.ROME_PIZZA_CLASS_GALLERY),
  'tiramisu-class': raw(TC, TC.TIRAMISU_CLASS_GALLERY),
  'naples-street-food': raw(NSF, NSF.NAPLES_STREET_FOOD_GALLERY),
  'amalfi-day-trip': raw(ADT, ADT.Amalfi_DAY_TRIP_GALLERY),
  'tivoli-day-trip': raw(TVDT, TVDT.Tivoli_DAY_TRIP_GALLERY),
};

/* ------------------------------------------------------------------ */
/* Per-site copy. Link targets: m0..m5 = MONEY_PAGES[i],               */
/* s0..s5 = SUPPORT_PAGES[i], or a literal path such as "/tours".      */
/* ------------------------------------------------------------------ */

interface Copy {
  siteName: string;
  city: string;
  metaTitle: string;
  metaDescription: string;
  /** index into gallery used as the hero photo */
  hero: number;
  heroEyebrow: string;
  heroTitle: [string, string, string];
  searchPlaceholder: string;
  namesLabel: string;
  names: [string, string][];
  sliderTitle: [string, string, string];
  categoryEyebrow: string;
  categoryTitle: [string, string, string];
  extraCategory: { name: string; description: string };
  howSubtitle: string;
  how: { title: string; description: string; icon: IconName }[];
  attractions: [string, string][];
}

const COPY: Record<string, Copy> = {
  'underground-colosseum': {
    siteName: 'Underground Colosseum',
    city: 'Rome',
    metaTitle: 'Colosseum Underground & Arena Floor Tours Compared',
    metaDescription: 'Compare Colosseum underground, arena floor, skip-the-line and private tours in Rome, with prices, group sizes and honest notes.',
    hero: 1,
    heroEyebrow: 'Colosseum, Rome',
    heroTitle: ['Rome’s Colosseum ', 'Underground', ' & Arena Floor Tours'],
    searchPlaceholder: 'Hypogeum, Arena Floor, Night Tour, Forum…',
    namesLabel: 'Inside the real Colosseum',
    names: [
      ['Hypogeum', 'm0'], ['Arena Floor', 'm0'], ['Third Tier', 'm4'], ['Gladiator Gate', 'm0'], ['Roman Forum', 's3'],
      ['Palatine Hill', 's3'], ['Arch of Constantine', 's2'], ['Ludus Magnus', 's0'], ['Colosseum at Night', 's1'], ['Skip-the-Line Entry', 'm1'],
    ],
    sliderTitle: ['Top Colosseum ', 'Tours', ' in Rome'],
    categoryEyebrow: 'Ways to see the Colosseum',
    categoryTitle: ['Top Colosseum ', 'Experiences', ' to Book'],
    extraCategory: { name: 'All Colosseum Tours', description: 'Every underground, arena floor and combo tour we compare, in one place.' },
    howSubtitle: 'We compare what each ticket really lets you enter before we recommend it.',
    how: [
      { title: 'Real Access', description: 'Only tours that clearly include the underground or arena floor.', icon: 'map' },
      { title: 'Honest Prices', description: 'Prices shown as the booking partner lists them.', icon: 'heart' },
      { title: 'Right Group Size', description: 'Private, small-group and self-paced options side by side.', icon: 'users' },
      { title: 'Best Time Slots', description: 'Early, sunset and night entries, so you can avoid the crowds.', icon: 'clock' },
    ],
    attractions: [
      ['Colosseum Underground', 'm0'], ['Arena Floor', 'm0'], ['Colosseum Third Tier', 'm4'], ['Roman Forum', 's3'], ['Palatine Hill', 's3'],
      ['Arch of Constantine', 's2'], ['Ludus Magnus', 's0'], ['Colosseo Metro Station', 's2'], ['Via Sacra', 's3'], ['Temple of Venus and Roma', 's3'],
      ['Circus Maximus', 's3'], ['Capitoline Hill', 's3'], ['Domus Aurea', 's0'], ['Colosseum at Sunset', 's1'], ['Colosseum at Night', 's1'],
      ['Skip-the-Line Entry', 'm1'], ['Private Colosseum Guide', 'm2'], ['Colosseum with Kids', 'm3'], ['Best Tour by Visitor Type', 'm4'], ['Opening Hours', 's1'],
    ],
  },
  'pompeii-day-trip': {
    siteName: 'Pompeii Day Trip',
    city: 'Pompeii',
    metaTitle: 'Pompeii Day Trips from Rome, Naples & Sorrento',
    metaDescription: 'Compare Pompeii day trips from Rome, Naples and Sorrento, plus Vesuvius and Herculaneum combos, with prices and time on site.',
    hero: 0,
    heroEyebrow: 'Pompeii, Italy',
    heroTitle: ['', 'Pompeii', ' Day Trips from Rome, Naples & Sorrento'],
    searchPlaceholder: 'From Rome, Vesuvius, Herculaneum, Private Guide…',
    namesLabel: 'See the real Pompeii',
    names: [
      ['Forum of Pompeii', 's2'], ['House of the Faun', 's2'], ['Villa of the Mysteries', 's2'], ['Amphitheatre', 's2'], ['Lupanar', 's2'],
      ['Stabian Baths', 's2'], ['Garden of the Fugitives', 's2'], ['Mount Vesuvius', 'm3'], ['Herculaneum', 'm4'], ['Bay of Naples', 'm1'],
    ],
    sliderTitle: ['Top Pompeii ', 'Day Trips', ''],
    categoryEyebrow: 'Ways to see Pompeii',
    categoryTitle: ['Top Ways to ', 'Visit', ' Pompeii'],
    extraCategory: { name: 'All Pompeii Tours', description: 'Every Pompeii day trip we compare, from every starting city.' },
    howSubtitle: 'We compare transit time and real time on site, not just the ticket price.',
    how: [
      { title: 'Time on Site', description: 'How many hours you actually spend inside the ruins.', icon: 'clock' },
      { title: 'Start City', description: 'Trips from Rome, Naples and Sorrento compared fairly.', icon: 'map' },
      { title: 'Licensed Guides', description: 'Guided options with archaeology-trained guides.', icon: 'users' },
      { title: 'Honest Prices', description: 'Prices shown as the booking partner lists them.', icon: 'heart' },
    ],
    attractions: [
      ['Forum of Pompeii', 's2'], ['House of the Faun', 's2'], ['Villa of the Mysteries', 's2'], ['Amphitheatre of Pompeii', 's2'], ['Lupanar', 's2'],
      ['Stabian Baths', 's2'], ['Garden of the Fugitives', 's2'], ['House of the Vettii', 's2'], ['Via dell’Abbondanza', 's2'], ['Large Theatre', 's2'],
      ['Mount Vesuvius', 'm3'], ['Herculaneum', 'm4'], ['Naples', 'm1'], ['Sorrento', 'm2'], ['Amalfi Coast', 'm2'],
      ['Pompeii from Rome', 'm0'], ['Private Pompeii Guide', 'm5'], ['Pompeii with Kids', 's3'], ['Summer Heat Tips', 's4'], ['Skip-the-Line Reality', 's5'],
    ],
  },
  'rome-vespa': {
    siteName: 'Rome Vespa',
    city: 'Rome',
    metaTitle: 'Rome Vespa Tours: Guided, Sidecar & Sunset Rides',
    metaDescription: 'Compare guided Vespa, sidecar, sunset and self-drive scooter tours of Rome, with routes, licence rules and prices.',
    hero: 2,
    heroEyebrow: 'Rome, Italy',
    heroTitle: ['Rome by ', 'Vespa', ': Guided, Sidecar & Sunset Rides'],
    searchPlaceholder: 'Sidecar, Sunset, Self-Drive, Private Vespa…',
    namesLabel: 'Ride the real Rome',
    names: [
      ['Trastevere', 's0'], ['Aventine Keyhole', 's0'], ['Gianicolo Hill', 'm3'], ['Colosseum', 's0'], ['Circus Maximus', 's0'],
      ['Appian Way', 's0'], ['Pyramid of Cestius', 's0'], ['Monti', 's0'], ['Villa Borghese', 's0'], ['Testaccio', 's0'],
    ],
    sliderTitle: ['Top Vespa ', 'Tours', ' in Rome'],
    categoryEyebrow: 'Ways to ride Rome',
    categoryTitle: ['Top Ways to ', 'Ride', ' Rome'],
    extraCategory: { name: 'All Vespa Tours', description: 'Every Vespa and sidecar tour we compare, in one place.' },
    howSubtitle: 'We check routes, licence rules and safety before we recommend a ride.',
    how: [
      { title: 'Safe Routes', description: 'Tours that plan routes around the busiest traffic.', icon: 'map' },
      { title: 'Clear Licence Rules', description: 'We explain who can drive and who rides as a passenger.', icon: 'compass' },
      { title: 'Small Convoys', description: 'Private and small-group rides side by side.', icon: 'users' },
      { title: 'Golden Hour', description: 'Sunset and night rides for the best light.', icon: 'clock' },
    ],
    attractions: [
      ['Trastevere', 's0'], ['Aventine Keyhole', 's0'], ['Gianicolo Hill', 'm3'], ['Colosseum', 's0'], ['Circus Maximus', 's0'],
      ['Appian Way', 's0'], ['Pyramid of Cestius', 's0'], ['Monti', 's0'], ['Villa Borghese', 's0'], ['Testaccio', 's0'],
      ['Piazza Venezia', 's0'], ['Orange Garden', 's0'], ['Mouth of Truth', 's0'], ['Baths of Caracalla', 's0'], ['Piazza del Popolo', 's0'],
      ['Sidecar Tour', 'm1'], ['Vespa at Sunset', 'm3'], ['Private Vespa Tour', 'm4'], ['Is It Safe in Rome Traffic?', 's1'], ['Licence Questions', 's3'],
    ],
  },
  'tuscany-day-trip': {
    siteName: 'Tuscany Day Trip',
    city: 'Tuscany',
    metaTitle: 'Tuscany Day Trips: Wine, Siena & San Gimignano',
    metaDescription: 'Compare Tuscany day trips: Chianti wine tastings, Siena and San Gimignano tours and private driver-guides, with prices.',
    hero: 0,
    heroEyebrow: 'Tuscany, Italy',
    heroTitle: ['', 'Tuscany', ' Day Trips: Wine, Hill Towns & Countryside'],
    searchPlaceholder: 'Chianti, Siena, San Gimignano, Wine Tasting…',
    namesLabel: 'Discover the real Tuscany',
    names: [
      ['Chianti', 'm1'], ['Siena', 'm2'], ['San Gimignano', 'm2'], ['Montepulciano', 's0'], ['Montalcino', 'm1'],
      ['Pienza', 's0'], ['Val d’Orcia', 's0'], ['Cortona', 's0'], ['Florence', 'm0'], ['Pisa', 'm3'],
    ],
    sliderTitle: ['Top Tuscany ', 'Day Trips', ''],
    categoryEyebrow: 'Ways to see Tuscany',
    categoryTitle: ['Top Tuscany ', 'Experiences', ''],
    extraCategory: { name: 'All Tuscany Tours', description: 'Every Tuscany day trip and wine tour we compare, in one place.' },
    howSubtitle: 'We compare routes, wineries and time in each town before we recommend a trip.',
    how: [
      { title: 'Real Wineries', description: 'Tastings at working wineries, not just shops.', icon: 'heart' },
      { title: 'Time in Each Town', description: 'How long you really get in Siena and San Gimignano.', icon: 'clock' },
      { title: 'Group Size', description: 'Private driver-guides and small groups compared.', icon: 'users' },
      { title: 'Smart Routes', description: 'Trips that fit the countryside into one day.', icon: 'map' },
    ],
    attractions: [
      ['Chianti', 'm1'], ['Siena', 'm2'], ['San Gimignano', 'm2'], ['Montepulciano', 's0'], ['Montalcino', 'm1'],
      ['Pienza', 's0'], ['Val d’Orcia', 's0'], ['Cortona', 's0'], ['Florence', 'm0'], ['Pisa', 'm3'],
      ['Piazza del Campo', 'm2'], ['Siena Cathedral', 'm2'], ['Greve in Chianti', 'm1'], ['Castellina in Chianti', 'm1'], ['Lucca', 'm3'],
      ['Wine Tour Logistics', 's1'], ['With or Without a Car', 's2'], ['Best Season for Tuscany', 's3'], ['What’s Included', 's4'], ['Florence-Base Day Trips', 'm3'],
    ],
  },
  'private-vatican': {
    siteName: 'Private Vatican',
    city: 'Vatican City',
    metaTitle: 'Private & Early-Entry Vatican Tours Compared',
    metaDescription: 'Compare early-entry, private and skip-the-line Vatican Museums and Sistine Chapel tours, with prices and crowd levels.',
    hero: 0,
    heroEyebrow: 'Vatican City, Rome',
    heroTitle: ['Private & Early-Entry ', 'Vatican', ' Tours'],
    searchPlaceholder: 'Sistine Chapel, Early Entry, St. Peter’s Dome…',
    namesLabel: 'Inside the real Vatican',
    names: [
      ['Sistine Chapel', 'm0'], ['St. Peter’s Basilica', 'm2'], ['Raphael Rooms', 's2'], ['Gallery of Maps', 's2'], ['Pinacoteca', 's2'],
      ['Pio-Clementino Museum', 's2'], ['Vatican Gardens', 'm4'], ['St. Peter’s Dome', 'm2'], ['Bramante Staircase', 's2'], ['St. Peter’s Square', 'm3'],
    ],
    sliderTitle: ['Top Vatican ', 'Tours', ' in Rome'],
    categoryEyebrow: 'Ways to see the Vatican',
    categoryTitle: ['Top Vatican ', 'Experiences', ''],
    extraCategory: { name: 'All Vatican Tours', description: 'Every Vatican Museums and Sistine Chapel tour we compare.' },
    howSubtitle: 'We compare crowd levels, route and real value before we recommend a tour.',
    how: [
      { title: 'Early Entry', description: 'Tours that get you in before the main crowds.', icon: 'clock' },
      { title: 'Expert Guides', description: 'Private and small-group guides compared.', icon: 'users' },
      { title: 'Clear Routes', description: 'What you will see, from the Museums to the Sistine Chapel.', icon: 'map' },
      { title: 'Honest Prices', description: 'Prices shown as the booking partner lists them.', icon: 'heart' },
    ],
    attractions: [
      ['Sistine Chapel', 'm0'], ['St. Peter’s Basilica', 'm2'], ['Raphael Rooms', 's2'], ['Gallery of Maps', 's2'], ['Pinacoteca', 's2'],
      ['Pio-Clementino Museum', 's2'], ['Vatican Gardens', 'm4'], ['St. Peter’s Dome', 'm2'], ['Bramante Staircase', 's2'], ['St. Peter’s Square', 'm3'],
      ['Gallery of Tapestries', 's2'], ['Gallery of Candelabra', 's2'], ['Pinecone Courtyard', 's2'], ['Egyptian Museum', 's2'], ['Castel Sant’Angelo', 's3'],
      ['How Early Access Works', 's0'], ['Dress Code & Security', 's1'], ['Quietest Times to Visit', 's3'], ['Sistine Chapel Etiquette', 's4'], ['Skip-the-Line Explained', 'm4'],
    ],
  },
  'golf-cart-rome': {
    siteName: 'Golf Cart Rome',
    city: 'Rome',
    metaTitle: 'Rome Golf Cart Tours: See More, Walk Less',
    metaDescription: 'Compare guided, private, night and accessible golf cart tours of Rome, with routes, group sizes and prices.',
    hero: 0,
    heroEyebrow: 'Rome, Italy',
    heroTitle: ['Rome ', 'Golf Cart', ' Tours: See More, Walk Less'],
    searchPlaceholder: 'Private Cart, Night Tour, Families, Accessible…',
    namesLabel: 'See Rome from a cart',
    names: [
      ['Trevi Fountain', 's1'], ['Pantheon', 'm4'], ['Piazza Navona', 's1'], ['Spanish Steps', 's1'], ['Colosseum', 's1'],
      ['Vittoriano', 's1'], ['Circus Maximus', 's1'], ['Aventine Keyhole', 's1'], ['Trastevere', 's1'], ['Roman Forum', 'm3'],
    ],
    sliderTitle: ['Top Golf Cart ', 'Tours', ' in Rome'],
    categoryEyebrow: 'Ways to ride Rome',
    categoryTitle: ['Top Golf Cart ', 'Experiences', ''],
    extraCategory: { name: 'All Golf Cart Tours', description: 'Every golf cart tour we compare, in one place.' },
    howSubtitle: 'We compare routes, comfort and accessibility before we recommend a tour.',
    how: [
      { title: 'Easy on the Feet', description: 'See the big sights without long walks in the heat.', icon: 'heart' },
      { title: 'Accessible Options', description: 'Seated tours with easy boarding for limited mobility.', icon: 'users' },
      { title: 'Clear Routes', description: 'We list which sights each route really covers.', icon: 'map' },
      { title: 'Day or Night', description: 'Daytime, sunset and illuminated night tours.', icon: 'clock' },
    ],
    attractions: [
      ['Trevi Fountain', 's1'], ['Pantheon', 'm4'], ['Piazza Navona', 's1'], ['Spanish Steps', 's1'], ['Colosseum', 's1'],
      ['Vittoriano', 's1'], ['Circus Maximus', 's1'], ['Aventine Keyhole', 's1'], ['Trastevere', 's1'], ['Roman Forum', 'm3'],
      ['Piazza del Popolo', 's1'], ['Capitoline Hill', 's1'], ['Mouth of Truth', 's1'], ['Campo de’ Fiori', 's1'], ['Gianicolo Hill', 's1'],
      ['Why a Cart at All', 's0'], ['Accessibility & Limited Mobility', 's2'], ['How Long It Takes', 's3'], ['Best For Whom', 's4'], ['Cart vs Walking Tour', 'm4'],
    ],
  },
  'cooking-in-rome': {
    siteName: 'Cooking in Rome',
    city: 'Rome',
    metaTitle: 'Cooking Classes in Rome with Local Chefs',
    metaDescription: 'Compare Rome cooking classes: pasta making, pizza and gelato, market-to-table and private classes, with prices.',
    hero: 1,
    heroEyebrow: 'Rome, Italy',
    heroTitle: ['', 'Cooking', ' Classes in Rome with Local Chefs'],
    searchPlaceholder: 'Pasta Making, Market Visit, Private Class…',
    namesLabel: 'Cook the real Rome',
    names: [
      ['Fettuccine', 'm1'], ['Ravioli', 'm1'], ['Cacio e Pepe', 'm1'], ['Carbonara', 'm1'], ['Amatriciana', 'm1'],
      ['Gnocchi', 'm1'], ['Tiramisu', 's0'], ['Pizza', 'm2'], ['Gelato', 'm2'], ['Campo de’ Fiori Market', 'm3'],
    ],
    sliderTitle: ['Top Cooking ', 'Classes', ' in Rome'],
    categoryEyebrow: 'Classes you can take in Rome',
    categoryTitle: ['Top Dishes to ', 'Cook', ' in Rome'],
    extraCategory: { name: 'All Cooking Classes', description: 'Every Rome cooking class we compare, in one place.' },
    howSubtitle: 'We compare what you really cook, eat and take home before we recommend a class.',
    how: [
      { title: 'Hands-On', description: 'Classes where you make the dish yourself.', icon: 'heart' },
      { title: 'Local Chefs', description: 'Classes run by cooks who work in Rome.', icon: 'users' },
      { title: 'Market Visits', description: 'Options that start with a real market stop.', icon: 'map' },
      { title: 'Clear Timing', description: 'Class length and what is included, listed up front.', icon: 'clock' },
    ],
    attractions: [
      ['Fettuccine', 'm1'], ['Ravioli', 'm1'], ['Cacio e Pepe', 'm1'], ['Carbonara', 'm1'], ['Amatriciana', 'm1'],
      ['Gnocchi', 'm1'], ['Tiramisu', 's0'], ['Pizza', 'm2'], ['Gelato', 'm2'], ['Campo de’ Fiori Market', 'm3'],
      ['Testaccio Market', 'm3'], ['Trionfale Market', 'm3'], ['Trastevere', 's4'], ['Monti', 's4'], ['Prati', 's4'],
      ['What a Class Includes', 's0'], ['Classes with a Market Visit', 's1'], ['Vegetarian Options', 's2'], ['Gift a Cooking Class', 's3'], ['Private Class', 'm4'],
    ],
  },
  'rome-pizza-class': {
    siteName: 'Rome Pizza Class',
    city: 'Rome',
    metaTitle: 'Pizza Making Classes in Rome Compared',
    metaDescription: 'Compare Rome pizza making classes: wood-fired, pizza and gelato, family and private classes, with prices.',
    hero: 0,
    heroEyebrow: 'Rome, Italy',
    heroTitle: ['', 'Pizza', ' Making Classes in Rome'],
    searchPlaceholder: 'Wood-Fired, Family Class, Pizza + Gelato…',
    namesLabel: 'Make real Roman pizza',
    names: [
      ['Pizza al Taglio', 'm0'], ['Pizza Tonda Romana', 'm0'], ['Pizza Bianca', 'm0'], ['Margherita', 's0'], ['Marinara', 's0'],
      ['Supplì', 's0'], ['Wood-Fired Oven', 'm0'], ['Dough & Fermentation', 's0'], ['Mozzarella', 's0'], ['Gelato', 'm1'],
    ],
    sliderTitle: ['Top Pizza ', 'Classes', ' in Rome'],
    categoryEyebrow: 'Classes you can take in Rome',
    categoryTitle: ['Top Pizza ', 'Classes', ' to Book'],
    extraCategory: { name: 'All Pizza Classes', description: 'Every Rome pizza class we compare, in one place.' },
    howSubtitle: 'We compare the oven, the dough and what you eat before we recommend a class.',
    how: [
      { title: 'Real Ovens', description: 'Classes that bake in a proper pizza oven.', icon: 'heart' },
      { title: 'Hands-On Dough', description: 'You stretch and top your own pizza.', icon: 'users' },
      { title: 'Family Friendly', description: 'Kid-sized portions and family classes compared.', icon: 'compass' },
      { title: 'Clear Timing', description: 'Class length and what is included, listed up front.', icon: 'clock' },
    ],
    attractions: [
      ['Pizza al Taglio', 'm0'], ['Pizza Tonda Romana', 'm0'], ['Pizza Bianca', 'm0'], ['Margherita', 's0'], ['Marinara', 's0'],
      ['Supplì', 's0'], ['Wood-Fired Oven', 'm0'], ['Dough & Fermentation', 's0'], ['Mozzarella', 's0'], ['Gelato', 'm1'],
      ['Trastevere', 'm0'], ['Campo de’ Fiori', 'm0'], ['Testaccio', 'm0'], ['Monti', 'm0'], ['Prati', 'm0'],
      ['What You Make and Eat', 's0'], ['Kids Pizza Classes', 's1'], ['Pizza vs Pasta Class', 's2'], ['Wine Pairing', 's3'], ['Private Pizza Class', 'm3'],
    ],
  },
  'tiramisu-class': {
    siteName: 'Tiramisu Class',
    city: 'Rome',
    metaTitle: 'Tiramisu Classes in Rome Compared',
    metaDescription: 'Compare Rome tiramisu and dessert classes: hands-on, tiramisu and gelato, private and gift classes, with prices.',
    hero: 0,
    heroEyebrow: 'Rome, Italy',
    heroTitle: ['', 'Tiramisu', ' Classes in Rome'],
    searchPlaceholder: 'Tiramisu, Gelato, Private Class, Gift…',
    namesLabel: 'Make real Italian dessert',
    names: [
      ['Mascarpone', 'm0'], ['Savoiardi', 'm0'], ['Espresso', 'm0'], ['Cocoa', 's0'], ['Marsala', 's0'],
      ['Zabaglione', 'm1'], ['Gelato', 'm2'], ['Maritozzo', 'm1'], ['Panna Cotta', 'm1'], ['Cannoli', 'm1'],
    ],
    sliderTitle: ['Top Tiramisu ', 'Classes', ' in Rome'],
    categoryEyebrow: 'Classes you can take in Rome',
    categoryTitle: ['Top Dessert ', 'Classes', ' to Book'],
    extraCategory: { name: 'All Tiramisu Classes', description: 'Every Rome tiramisu and dessert class we compare.' },
    howSubtitle: 'We compare what you make, taste and take home before we recommend a class.',
    how: [
      { title: 'Hands-On', description: 'You whip, layer and finish your own tiramisu.', icon: 'heart' },
      { title: 'Small Classes', description: 'Shared and private classes compared.', icon: 'users' },
      { title: 'Great Gifts', description: 'Classes that work as a gift or special occasion.', icon: 'compass' },
      { title: 'Clear Timing', description: 'Class length and what is included, listed up front.', icon: 'clock' },
    ],
    attractions: [
      ['Mascarpone', 'm0'], ['Savoiardi', 'm0'], ['Espresso', 'm0'], ['Cocoa', 's0'], ['Marsala', 's0'],
      ['Zabaglione', 'm1'], ['Gelato', 'm2'], ['Maritozzo', 'm1'], ['Panna Cotta', 'm1'], ['Cannoli', 'm1'],
      ['Trastevere', 'm0'], ['Campo de’ Fiori', 'm0'], ['Monti', 'm0'], ['Prati', 'm0'], ['Testaccio', 'm0'],
      ['What You Make', 's0'], ['Classes for Couples', 's1'], ['Gift Experience', 's2'], ['Pair With a Food Tour', 's3'], ['Private Dessert Class', 'm3'],
    ],
  },
  'naples-street-food': {
    siteName: 'Naples Street Food',
    city: 'Naples',
    metaTitle: 'Naples Street Food Tours: Pizza, Markets & More',
    metaDescription: 'Compare Naples street food tours: pizza tastings, markets and Spaccanapoli food walks, with prices and routes.',
    hero: 1,
    heroEyebrow: 'Naples, Italy',
    heroTitle: ['Naples ', 'Street Food', ' Tours'],
    searchPlaceholder: 'Pizza, Sfogliatella, Spaccanapoli, Market…',
    namesLabel: 'Taste the real Naples',
    names: [
      ['Pizza Margherita', 'm1'], ['Pizza Fritta', 's1'], ['Cuoppo', 's1'], ['Frittatina', 's1'], ['Sfogliatella', 'm0'],
      ['Babà', 'm0'], ['Taralli', 'm0'], ['Neapolitan Espresso', 's2'], ['Spaccanapoli', 'm3'], ['Quartieri Spagnoli', 's2'],
    ],
    sliderTitle: ['Top Street Food ', 'Tours', ' in Naples'],
    categoryEyebrow: 'Things you must taste in Naples',
    categoryTitle: ['Top Food ', 'Experiences', ' in Naples'],
    extraCategory: { name: 'All Naples Food Tours', description: 'Every Naples food tour we compare, in one place.' },
    howSubtitle: 'We compare the stops, the food and the route before we recommend a tour.',
    how: [
      { title: 'Real Pizzerie', description: 'Tours that stop where Neapolitans actually eat.', icon: 'heart' },
      { title: 'Local Guides', description: 'Walks led by people who know the old town.', icon: 'users' },
      { title: 'Historic Centre', description: 'Routes through Spaccanapoli and the old streets.', icon: 'map' },
      { title: 'Clear Timing', description: 'Tour length and tastings listed up front.', icon: 'clock' },
    ],
    attractions: [
      ['Spaccanapoli', 'm3'], ['Quartieri Spagnoli', 's2'], ['Via dei Tribunali', 'm1'], ['Pignasecca Market', 'm2'], ['Porta Nolana Market', 'm2'],
      ['Piazza del Gesù', 'm3'], ['Via Toledo', 's2'], ['Piazza Plebiscito', 's2'], ['Naples Waterfront', 's2'], ['Vomero', 's2'],
      ['Pizza Margherita', 'm1'], ['Pizza Fritta', 's1'], ['Sfogliatella', 'm0'], ['Babà', 'm0'], ['Cuoppo', 's1'],
      ['Real Neapolitan Pizza Guide', 's0'], ['Fried Food Specialities', 's1'], ['Where Locals Eat', 's2'], ['Naples Market Tour', 'm2'], ['Pizza-Focused Food Tour', 'm1'],
    ],
  },
  'amalfi-day-trip': {
    siteName: 'Amalfi Day Trip',
    city: 'Amalfi Coast',
    metaTitle: 'Amalfi Coast Day Trips from Rome, Naples & Sorrento',
    metaDescription: 'Compare Amalfi Coast day trips from Rome, Naples and Sorrento, plus boat trips and Positano, Amalfi and Ravello tours.',
    hero: 2,
    heroEyebrow: 'Amalfi Coast, Italy',
    heroTitle: ['', 'Amalfi Coast', ' Day Trips from Rome, Naples & Sorrento'],
    searchPlaceholder: 'Positano, Boat Trip, Ravello, From Rome…',
    namesLabel: 'See the real Amalfi Coast',
    names: [
      ['Positano', 'm2'], ['Amalfi', 'm2'], ['Ravello', 'm2'], ['Sorrento', 'm1'], ['Praiano', 's1'],
      ['Furore Fjord', 'm3'], ['Villa Rufolo', 'm2'], ['Villa Cimbrone', 'm2'], ['Path of the Gods', 's1'], ['Amalfi Cathedral', 'm2'],
    ],
    sliderTitle: ['Top Amalfi Coast ', 'Day Trips', ''],
    categoryEyebrow: 'Ways to see the Amalfi Coast',
    categoryTitle: ['Top Amalfi Coast ', 'Experiences', ''],
    extraCategory: { name: 'All Amalfi Tours', description: 'Every Amalfi Coast day trip we compare, in one place.' },
    howSubtitle: 'We compare road versus boat, time in each town and real value.',
    how: [
      { title: 'Road or Boat', description: 'We explain which way suits your day best.', icon: 'compass' },
      { title: 'Time in Each Town', description: 'How long you really get in Positano, Amalfi and Ravello.', icon: 'clock' },
      { title: 'Group Size', description: 'Private tours and shared groups compared.', icon: 'users' },
      { title: 'Smart Routes', description: 'Trips that beat the summer traffic.', icon: 'map' },
    ],
    attractions: [
      ['Positano', 'm2'], ['Amalfi', 'm2'], ['Ravello', 'm2'], ['Sorrento', 'm1'], ['Praiano', 's1'],
      ['Furore Fjord', 'm3'], ['Villa Rufolo', 'm2'], ['Villa Cimbrone', 'm2'], ['Path of the Gods', 's1'], ['Amalfi Cathedral', 'm2'],
      ['Atrani', 's1'], ['Minori', 's1'], ['Maiori', 's1'], ['Capri', 'm3'], ['Naples', 'm1'],
      ['Amalfi from Rome', 'm0'], ['Amalfi Boat Day Trip', 'm3'], ['Boat vs Road', 's0'], ['Best Towns', 's1'], ['Summer Timing', 's2'],
    ],
  },
  'tivoli-day-trip': {
    siteName: 'Tivoli Day Trip',
    city: 'Tivoli',
    metaTitle: 'Tivoli Day Trips: Villa d’Este & Hadrian’s Villa',
    metaDescription: 'Compare Tivoli day trips from Rome: Villa d’Este, Hadrian’s Villa, full-day, private and self-guided options, with prices.',
    hero: 0,
    heroEyebrow: 'Tivoli, Italy',
    heroTitle: ['', 'Tivoli', ' Day Trips: Villa d’Este & Hadrian’s Villa'],
    searchPlaceholder: 'Villa d’Este, Hadrian’s Villa, By Train…',
    namesLabel: 'See the real Tivoli',
    names: [
      ['Villa d’Este', 'm1'], ['Hadrian’s Villa', 'm0'], ['Fountain of Neptune', 'm1'], ['Hundred Fountains', 'm1'], ['Organ Fountain', 'm1'],
      ['Canopus', 'm0'], ['Maritime Theatre', 'm0'], ['Villa Gregoriana', 's1'], ['Temple of Vesta', 's1'], ['Tivoli Old Town', 's0'],
    ],
    sliderTitle: ['Top Tivoli ', 'Day Trips', ''],
    categoryEyebrow: 'Ways to see Tivoli',
    categoryTitle: ['Top Tivoli ', 'Experiences', ''],
    extraCategory: { name: 'All Tivoli Tours', description: 'Every Tivoli day trip we compare, in one place.' },
    howSubtitle: 'We compare which villas you see and how long you get in each.',
    how: [
      { title: 'Both Villas', description: 'We show which tours cover Villa d’Este and Hadrian’s Villa.', icon: 'map' },
      { title: 'Time in Each Villa', description: 'How long you really get in the gardens and ruins.', icon: 'clock' },
      { title: 'Guided or Not', description: 'Private, guided and self-guided options compared.', icon: 'users' },
      { title: 'Best Season', description: 'When the fountains and gardens look their best.', icon: 'camera' },
    ],
    attractions: [
      ['Villa d’Este', 'm1'], ['Hadrian’s Villa', 'm0'], ['Fountain of Neptune', 'm1'], ['Hundred Fountains', 'm1'], ['Organ Fountain', 'm1'],
      ['Canopus', 'm0'], ['Maritime Theatre', 'm0'], ['Villa Gregoriana', 's1'], ['Temple of Vesta', 's1'], ['Tivoli Old Town', 's0'],
      ['Fountain of the Owl', 'm1'], ['Rometta Fountain', 'm1'], ['Poecile', 'm0'], ['Great Baths', 'm0'], ['Tivoli Train Station', 's0'],
      ['Getting to Tivoli', 's0'], ['Which Villa to Prioritise', 's1'], ['Best Season', 's2'], ['Tivoli with Kids', 's3'], ['Private Expert Guide', 'm2'],
    ],
  },
};

/* ------------------------------------------------------------------ */
/* Builder                                                              */
/* ------------------------------------------------------------------ */

function cleanImage(src: string): string {
  return src.split('?')[0] ?? src;
}

function resolveTarget(site: RawSite, target: string): string {
  const m = target.match(/^([ms])(\d)$/);
  if (!m) return target;
  const list = m[1] === 'm' ? site.money : site.support;
  return list[Number(m[2])]?.href ?? list[0]?.href ?? '/tours';
}

function toTourDoc(t: RawTour, city: string): TourDoc {
  return {
    title: t.title,
    slug: t.slug,
    partner: t.partner ?? '',
    partnerProductId: '',
    affiliateUrl: '',
    priceBand: t.priceFrom ? `€${t.priceFrom}` : null,
    duration: t.meta || null,
    city,
    niche: [],
    imageUrl: t.image?.src ?? null,
    firstHandNotes: null,
    neighborhood: null,
    features: [],
    isTopPick: false,
    groupSize: null,
    language: null,
  };
}

function uniqueByHref<T extends LinkItem>(items: T[]): T[] {
  const seen = new Set<string>();
  return items.filter((i) => {
    const key = `${i.label}|${i.href}`;
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });
}

export function getHomeContent(slug: string): HomeContent | null {
  const site = RAW[slug];
  const copy = COPY[slug];
  if (!site || !copy) return null;

  const tours = site.tours.map((t) => toTourDoc(t, copy.city));
  const allSlugs = site.tours.map((t) => t.slug);

  // Tours for a money page: the site's own relevance ranking, else a rotation of its tours.
  const toursFor = (href: string, offset: number): string[] => {
    const ranked = site.toursFor?.(href, 3).map((t) => t.slug) ?? [];
    if (ranked.length > 0) return ranked;
    return [0, 1, 2].map((i) => allSlugs[(offset + i) % allSlugs.length]!).filter(Boolean);
  };

  // 5 category rows: the money pages, plus one "All tours" row if the site has fewer than 5.
  const usedImages = new Set<string>();
  const pickImage = (preferred: string | undefined): string => {
    const candidates = [preferred, ...site.gallery.map((g) => g.src), ...site.tours.map((t) => t.image?.src)];
    for (const c of candidates) {
      if (!c) continue;
      const clean = cleanImage(c);
      if (!usedImages.has(clean)) {
        usedImages.add(clean);
        return clean;
      }
    }
    return cleanImage(preferred ?? site.gallery[0]?.src ?? '');
  };

  const categories: HomeCategory[] = site.money.slice(0, 5).map((p, i) => ({
    name: p.title,
    slug: p.href.replace(/^\//, '').replace(/\//g, '-'),
    description: p.blurb ?? '',
    imageUrl: pickImage(p.image?.src),
    href: p.href,
    tourSlugs: toursFor(p.href, i * 3),
  }));
  while (categories.length < 5) {
    const i = categories.length;
    categories.push({
      name: copy.extraCategory.name,
      slug: `all-${i}`,
      description: copy.extraCategory.description,
      imageUrl: pickImage(site.gallery[i % Math.max(site.gallery.length, 1)]?.src),
      href: '/tours',
      tourSlugs: [0, 1, 2].map((k) => allSlugs[(i * 3 + k) % allSlugs.length]!).filter(Boolean),
    });
  }

  // Each tour card opens the money page it belongs to (first match), else /tours.
  const tourHrefs: Record<string, string> = {};
  for (const c of categories) {
    for (const s of c.tourSlugs) tourHrefs[s] ??= c.href;
  }
  for (const s of allSlugs) tourHrefs[s] ??= '/tours';

  const names: LinkItem[] = copy.names.map(([label, t]) => ({ label, href: resolveTarget(site, t) }));

  // 20 chips: money pages, support pages, then niche names, then standard pages.
  const chips = uniqueByHref<LinkItem>([
    ...site.money.map((p) => ({ label: p.title, href: p.href })),
    ...site.support.map((p) => ({ label: p.title, href: p.href })),
    ...names,
    { label: 'All Tours', href: '/tours' },
    { label: 'Guides & Blog', href: '/blog' },
    { label: 'FAQ', href: '/faq' },
    { label: 'Contact', href: '/contact' },
  ]).slice(0, 20);

  const attractions: LinkItem[] = copy.attractions.map(([label, t]) => ({ label, href: resolveTarget(site, t) }));

  const topTours = uniqueByHref<LinkItem>([
    ...site.tours.map((t) => ({ label: t.title, href: tourHrefs[t.slug] ?? '/tours' })),
    ...site.money.map((p) => ({ label: p.title, href: p.href })),
    ...site.support.map((p) => ({ label: p.title, href: p.href })),
    ...names,
    ...attractions,
  ]).slice(0, 19);
  topTours.push({ label: `All ${copy.siteName} Tours`, href: '/tours' });

  const heroSrc = site.gallery[copy.hero] ?? site.gallery[0];

  return {
    siteName: copy.siteName,
    city: copy.city,
    metaTitle: copy.metaTitle,
    metaDescription: copy.metaDescription,
    heroImage: { src: cleanImage(heroSrc?.src ?? ''), alt: heroSrc?.alt ?? copy.siteName },
    heroEyebrow: copy.heroEyebrow,
    heroTitle: copy.heroTitle,
    searchPlaceholder: copy.searchPlaceholder,
    chips,
    namesLabel: copy.namesLabel,
    names,
    sliderEyebrow: 'Our best selling tours at a glance',
    sliderTitle: copy.sliderTitle,
    tours,
    tourHrefs,
    categoryEyebrow: copy.categoryEyebrow,
    categoryTitle: copy.categoryTitle,
    categories,
    howEyebrow: 'Our Standards',
    howTitle: ['How We ', 'Choose', ''],
    howSubtitle: copy.howSubtitle,
    how: copy.how,
    placesTitle: 'Places You Can Plan Your Next Trip',
    attractions,
    topTours,
  };
}

/** Real images and pages of a network site, for the other page builders (About, etc.). */
export function getSiteAssets(slug: string): {
  gallery: { src: string; alt: string }[];
  money: { title: string; href: string; blurb: string; image: { src: string; alt: string } | null }[];
  support: { title: string; href: string }[];
} | null {
  const site = RAW[slug];
  if (!site) return null;
  return {
    gallery: site.gallery.map((g) => ({ src: cleanImage(g.src), alt: g.alt })),
    money: site.money.map((p) => ({
      title: p.title,
      href: p.href,
      blurb: p.blurb ?? '',
      image: p.image ? { src: cleanImage(p.image.src), alt: p.image.alt } : null,
    })),
    support: site.support.map((p) => ({ title: p.title, href: p.href })),
  };
}
