/**
 * About page content for the 12 network sites.
 *
 * Every network About page renders the SAME master sections as Street Food
 * Rome's /about (AboutHero -> Our Travel Mantra -> Experiences Banner ->
 * Who Writes This -> How It Started -> How We Choose -> Places). Only text
 * and images change. Images and links come from the site's own data
 * (src/lib/<slug>.ts); the copy below is honest: no personal claims, no
 * numbers, and it states that the site earns affiliate commissions.
 */
import { getHomeContent, getSiteAssets, type LinkItem } from '@/lib/sites/home';

interface Img {
  src: string;
  alt: string;
}

export interface AboutContent {
  hero: { title: string; description: string; image: Img };
  mantra: { points: { title: string; body: string }[]; thirdTitle: string; thirdParagraphs: string[]; images: [Img, Img] };
  banner: { title: string; description: string; ctaLabel: string; ctaHref: string; image: Img };
  whoWrites: { name: string; bio: string; closingLine: string; image: Img };
  howItStarted: { subtitle: string; cards: { title: string; description: string; image: string; href: string }[] };
  howWeChoose: { subtitle: string; steps: { title: string; description: string; image: string; href: string }[] };
  places: { title: string; attractions: LinkItem[]; topTours: LinkItem[] };
  metaTitle: string;
  metaDescription: string;
}

interface AboutCopy {
  /** e.g. "Colosseum tour", "cooking class" */
  thing: string;
  things: string;
  heroTitle: string;
  heroDescription: string;
  mantra: [
    { title: string; body: string },
    { title: string; body: string },
    { title: string; paragraphs: [string, string] },
  ];
  bannerTitle: string;
  bannerDescription: string;
  bannerCta: string;
  question: string;
}

const COPY: Record<string, AboutCopy> = {
  'underground-colosseum': {
    thing: 'Colosseum tour',
    things: 'Colosseum tours',
    heroTitle: 'The Colosseum Underground, Explained Before You Book',
    heroDescription: 'Independent comparisons of underground, arena floor, skip-the-line and private Colosseum tours, so you know exactly what each ticket opens.',
    mantra: [
      { title: '1. Know Which Level You Are Buying', body: 'A standard ticket, the arena floor and the underground are three different visits. Check which levels are included before you pay.' },
      { title: '2. Pick Your Time Slot Wisely', body: 'Early, sunset and night entries feel very different. The right slot matters as much as the right tour.' },
      { title: '3. Let a Guide Tell the Story', paragraphs: ['The underground makes sense when someone explains how the lifts, trapdoors and tunnels worked.', 'That is why we compare guided options side by side with self-paced tickets, so you can choose what fits your day.'] },
    ],
    bannerTitle: 'What Could Your Colosseum Visit Look Like?',
    bannerDescription: 'The hypogeum, the arena floor, the upper tiers and the Forum next door.',
    bannerCta: 'See Our Top Colosseum Tours',
    question: 'Which Colosseum tour actually takes you underground?',
  },
  'pompeii-day-trip': {
    thing: 'Pompeii day trip',
    things: 'Pompeii day trips',
    heroTitle: 'Pompeii Day Trips, Compared by Real Time on Site',
    heroDescription: 'Independent comparisons of Pompeii trips from Rome, Naples and Sorrento, plus Vesuvius and Herculaneum combos.',
    mantra: [
      { title: '1. Count the Hours Inside the Ruins', body: 'A long transfer can leave you little time on site. We compare how much of the day you actually spend in Pompeii.' },
      { title: '2. Start From the Right City', body: 'Rome, Naples and Sorrento each change the day completely. Pick the trip that matches where you are staying.' },
      { title: '3. Go With a Guide Who Knows the Site', paragraphs: ['Pompeii is huge and has little signage. A good guide turns streets and houses into a story.', 'We compare guided tours with skip-the-line tickets and audio guides, so you can choose the depth you want.'] },
    ],
    bannerTitle: 'What Could Your Pompeii Day Look Like?',
    bannerDescription: 'The Forum, the villas, the amphitheatre and, if you like, the crater of Vesuvius.',
    bannerCta: 'See Our Top Pompeii Day Trips',
    question: 'Which Pompeii trip gives you the most time inside the ruins?',
  },
  'rome-vespa': {
    thing: 'Vespa tour',
    things: 'Vespa tours',
    heroTitle: 'Rome by Vespa, Compared Route by Route',
    heroDescription: 'Independent comparisons of guided Vespa, sidecar, sunset and self-drive scooter tours in Rome.',
    mantra: [
      { title: '1. Know If You Can Drive', body: 'Some tours let you ride yourself, others seat you as a passenger or in a sidecar. Licence rules decide which one fits you.' },
      { title: '2. Choose the Route, Not Just the Scooter', body: 'Hills, viewpoints and quiet side streets make the ride. We compare what each route really covers.' },
      { title: '3. Ride at the Right Time', paragraphs: ['Rome traffic changes through the day. Sunset and evening rides are often calmer and prettier.', 'We list the time of day for every tour, so you can pick the ride that suits you.'] },
    ],
    bannerTitle: 'What Could Your Rome Vespa Ride Look Like?',
    bannerDescription: 'Trastevere, the Aventine, Gianicolo Hill and the Appian Way on two wheels.',
    bannerCta: 'See Our Top Vespa Tours',
    question: 'Which Vespa tour in Rome is right for a first-time rider?',
  },
  'tuscany-day-trip': {
    thing: 'Tuscany day trip',
    things: 'Tuscany day trips',
    heroTitle: 'Tuscany Day Trips, Compared Town by Town',
    heroDescription: 'Independent comparisons of Chianti wine tastings, Siena and San Gimignano tours and private driver-guides.',
    mantra: [
      { title: '1. Check the Time in Each Town', body: 'Some trips visit many towns but give you little time in each. We compare how long you really get in Siena and San Gimignano.' },
      { title: '2. Choose Real Wineries', body: 'A tasting at a working winery is very different from a quick stop at a shop. We check where each tour stops.' },
      { title: '3. Decide on Car or Tour', paragraphs: ['Driving yourself gives freedom but no wine. A tour lets you taste and relax.', 'We compare both, so you can pick what fits your day in the countryside.'] },
    ],
    bannerTitle: 'What Could Your Tuscany Day Look Like?',
    bannerDescription: 'Vineyards, hill towns, cypress roads and long lunches in the countryside.',
    bannerCta: 'See Our Top Tuscany Day Trips',
    question: 'Which Tuscany day trip is worth a full day?',
  },
  'private-vatican': {
    thing: 'Vatican tour',
    things: 'Vatican tours',
    heroTitle: 'The Vatican, Compared Before You Book',
    heroDescription: 'Independent comparisons of early-entry, private and skip-the-line Vatican Museums and Sistine Chapel tours.',
    mantra: [
      { title: '1. Go Early If You Can', body: 'The Sistine Chapel feels completely different before the main crowds. Early-entry slots are often worth it.' },
      { title: '2. Know What Your Ticket Includes', body: 'Museums only, St. Peter’s, the Dome or the Gardens: each ticket covers something different. We explain what you get.' },
      { title: '3. Let a Guide Tell the Story', paragraphs: ['The Vatican Museums hold thousands of works. A guide helps you see the ones that matter.', 'We compare private and small-group guides with self-paced tickets, so you can pick the visit you want.'] },
    ],
    bannerTitle: 'What Could Your Vatican Visit Look Like?',
    bannerDescription: 'The Sistine Chapel, the Raphael Rooms, St. Peter’s Basilica and the Dome.',
    bannerCta: 'See Our Top Vatican Tours',
    question: 'Which Vatican tour gets you in before the crowds?',
  },
  'golf-cart-rome': {
    thing: 'golf cart tour',
    things: 'golf cart tours',
    heroTitle: 'Rome by Golf Cart, Compared Route by Route',
    heroDescription: 'Independent comparisons of guided, private, night and accessible golf cart tours of Rome.',
    mantra: [
      { title: '1. See More, Walk Less', body: 'A cart covers the big sights in one go, without long walks in the heat.' },
      { title: '2. Check the Route', body: 'Every tour covers different sights. We list what each route really includes.' },
      { title: '3. Choose Comfort and Access', paragraphs: ['Some tours offer seated, easy boarding for limited mobility.', 'We compare accessible, family and private options, so everyone in your group can enjoy the ride.'] },
    ],
    bannerTitle: 'What Could Your Rome Golf Cart Tour Look Like?',
    bannerDescription: 'Trevi Fountain, the Pantheon, Piazza Navona and the Colosseum in one easy ride.',
    bannerCta: 'See Our Top Golf Cart Tours',
    question: 'Which golf cart tour in Rome covers the most sights?',
  },
  'cooking-in-rome': {
    thing: 'cooking class',
    things: 'cooking classes',
    heroTitle: 'Cooking Classes in Rome, Compared Dish by Dish',
    heroDescription: 'Independent comparisons of pasta making, pizza and gelato, market-to-table and private cooking classes in Rome.',
    mantra: [
      { title: '1. Cook It Yourself', body: 'The best classes let you make the dish with your own hands, not just watch a demo.' },
      { title: '2. Start at the Market', body: 'A market stop shows you where Roman cooks buy their ingredients. We mark which classes include one.' },
      { title: '3. Eat What You Make', paragraphs: ['A good class ends at the table with the food you cooked.', 'We compare class length, menu and what is included, so you can pick the right class for your trip.'] },
    ],
    bannerTitle: 'What Could Your Rome Cooking Class Look Like?',
    bannerDescription: 'Fresh pasta, Roman classics, pizza, gelato and a long lunch together.',
    bannerCta: 'See Our Top Cooking Classes',
    question: 'Which cooking class in Rome is really hands-on?',
  },
  'rome-pizza-class': {
    thing: 'pizza class',
    things: 'pizza classes',
    heroTitle: 'Pizza Making Classes in Rome, Compared',
    heroDescription: 'Independent comparisons of wood-fired, pizza and gelato, family and private pizza classes in Rome.',
    mantra: [
      { title: '1. Stretch Your Own Dough', body: 'The fun is in making it yourself. We pick classes where you shape and top your own pizza.' },
      { title: '2. Check the Oven', body: 'A wood-fired oven changes everything. We mark which classes bake in one.' },
      { title: '3. Bring the Whole Family', paragraphs: ['Some classes are made for kids, with small portions of dough.', 'We compare family, couples and private classes, so everyone gets a good slice.'] },
    ],
    bannerTitle: 'What Could Your Rome Pizza Class Look Like?',
    bannerDescription: 'Dough, toppings, a hot oven and a pizza you made yourself.',
    bannerCta: 'See Our Top Pizza Classes',
    question: 'Which pizza class in Rome uses a real wood-fired oven?',
  },
  'tiramisu-class': {
    thing: 'tiramisu class',
    things: 'tiramisu classes',
    heroTitle: 'Tiramisu Classes in Rome, Compared',
    heroDescription: 'Independent comparisons of hands-on tiramisu, tiramisu and gelato, dessert and private classes in Rome.',
    mantra: [
      { title: '1. Make It From Scratch', body: 'Whipping the cream and soaking the savoiardi is the best part. We pick classes where you do it yourself.' },
      { title: '2. Check If You Can Taste It', body: 'Tiramisu needs time to set. Some classes let you taste a chilled one in class, others send yours home.' },
      { title: '3. Make It a Special Moment', paragraphs: ['A dessert class works well for couples, families and gifts.', 'We compare shared, private and gift-voucher classes, so you can pick the right one.'] },
    ],
    bannerTitle: 'What Could Your Rome Tiramisu Class Look Like?',
    bannerDescription: 'Mascarpone, espresso, cocoa and a dessert you made yourself.',
    bannerCta: 'See Our Top Tiramisu Classes',
    question: 'Which tiramisu class in Rome is the most hands-on?',
  },
  'naples-street-food': {
    thing: 'Naples food tour',
    things: 'Naples food tours',
    heroTitle: 'Naples Street Food, Compared Stop by Stop',
    heroDescription: 'Independent comparisons of Naples street food, pizza and market tours in the historic centre.',
    mantra: [
      { title: '1. Eat Where Neapolitans Eat', body: 'The best pizza and fried snacks are often in small places in the old town. We look for tours that stop there.' },
      { title: '2. Walk the Old Streets', body: 'Spaccanapoli and the Spanish Quarter are part of the experience. We compare the routes each tour takes.' },
      { title: '3. Come Hungry', paragraphs: ['Naples food tours are generous: pizza, fried food, pastries and coffee.', 'We list the tastings each tour includes, so you know what to expect.'] },
    ],
    bannerTitle: 'What Could Your Naples Food Day Taste Like?',
    bannerDescription: 'Pizza, pizza fritta, sfogliatella, babà and Neapolitan espresso.',
    bannerCta: 'See Our Top Naples Food Tours',
    question: 'Which Naples food tour has the best pizza stops?',
  },
  'amalfi-day-trip': {
    thing: 'Amalfi Coast day trip',
    things: 'Amalfi Coast day trips',
    heroTitle: 'Amalfi Coast Day Trips, Compared Town by Town',
    heroDescription: 'Independent comparisons of Amalfi Coast day trips from Rome, Naples and Sorrento, by road and by boat.',
    mantra: [
      { title: '1. Choose Road or Boat', body: 'The coast road is stunning but busy. A boat trip sees the towns from the sea. We compare both.' },
      { title: '2. Check the Time in Each Town', body: 'Positano, Amalfi and Ravello each deserve time. We compare how long each trip gives you.' },
      { title: '3. Start From the Right City', paragraphs: ['A trip from Rome is a long day. From Naples or Sorrento it is much shorter.', 'We compare trips by starting point, so you can plan the day that fits your stay.'] },
    ],
    bannerTitle: 'What Could Your Amalfi Coast Day Look Like?',
    bannerDescription: 'Positano, Amalfi, Ravello and the blue sea between them.',
    bannerCta: 'See Our Top Amalfi Coast Trips',
    question: 'Which Amalfi Coast day trip is worth the travel time?',
  },
  'tivoli-day-trip': {
    thing: 'Tivoli day trip',
    things: 'Tivoli day trips',
    heroTitle: 'Tivoli Day Trips, Compared Villa by Villa',
    heroDescription: 'Independent comparisons of Villa d’Este and Hadrian’s Villa tours from Rome: full-day, half-day, private and self-guided.',
    mantra: [
      { title: '1. Decide Which Villas You Want', body: 'Villa d’Este is all fountains and gardens. Hadrian’s Villa is ancient ruins. Some trips do both.' },
      { title: '2. Check the Time in Each Villa', body: 'Rushing either villa takes the magic away. We compare how long each trip gives you.' },
      { title: '3. Guided or On Your Own', paragraphs: ['Tivoli is easy to reach by train, but a guide brings the villas to life.', 'We compare guided, private and self-guided options, so you can pick your pace.'] },
    ],
    bannerTitle: 'What Could Your Tivoli Day Look Like?',
    bannerDescription: 'The fountains of Villa d’Este and the ancient ruins of Hadrian’s Villa.',
    bannerCta: 'See Our Top Tivoli Day Trips',
    question: 'Which Tivoli day trip covers both villas properly?',
  },
};

export function getAboutContent(slug: string): AboutContent | null {
  const copy = COPY[slug];
  const home = getHomeContent(slug);
  const assets = getSiteAssets(slug);
  if (!copy || !home || !assets) return null;

  // Site's own images: gallery first, then money-page images.
  const pool: Img[] = [
    ...assets.gallery,
    ...assets.money.map((m) => m.image).filter((i): i is Img => Boolean(i)),
    ...home.tours
      .filter((t) => Boolean(t.imageUrl))
      .map((t) => ({ src: (t.imageUrl ?? '').split('?')[0] ?? '', alt: t.title })),
  ];
  const seen = new Set<string>();
  const images = pool.filter((i) => (seen.has(i.src) ? false : (seen.add(i.src), true)));
  const img = (i: number): Img => images[i % Math.max(images.length, 1)] ?? { src: home.heroImage.src, alt: home.heroImage.alt };

  const moneyHref = (i: number) => assets.money[i % Math.max(assets.money.length, 1)]?.href ?? '/tours';
  const supportHref = (i: number) => assets.support[i % Math.max(assets.support.length, 1)]?.href ?? '/blog';
  const site = home.siteName;

  return {
    metaTitle: `About ${site}: How We Compare ${capitalize(copy.things)}`,
    metaDescription: `${site} is an independent guide to ${copy.things}. How we compare tours, where prices come from and how the site is funded.`,
    hero: { title: copy.heroTitle, description: copy.heroDescription, image: img(0) },
    mantra: {
      points: [copy.mantra[0], copy.mantra[1]],
      thirdTitle: copy.mantra[2].title,
      thirdParagraphs: [...copy.mantra[2].paragraphs],
      images: [img(1), img(2)],
    },
    banner: {
      title: copy.bannerTitle,
      description: copy.bannerDescription,
      ctaLabel: copy.bannerCta,
      ctaHref: '/tours',
      image: img(3),
    },
    whoWrites: {
      name: site,
      bio: `${site} is an independent guide to ${copy.things}. We compare what each option really includes, how long it takes and what it costs, so you can book with confidence.`,
      closingLine:
        'Prices are shown as our booking partners list them. When you book through our links we may earn a commission, at no extra cost to you, and it never decides what we recommend.',
      image: img(4),
    },
    howItStarted: {
      subtitle: `The story behind ${site}, and why we compare ${copy.things} the way we do.`,
      cards: [
        { title: 'It Started With One Question', description: copy.question, image: img(5).src, href: supportHref(0) },
        { title: 'We Compared Every Option', description: `Group size, time, route and price for every ${copy.thing} we could find.`, image: img(6).src, href: moneyHref(0) },
        { title: `${site} Was Born`, description: `One place to compare ${copy.things} side by side, in plain words.`, image: img(7).src, href: '/tours' },
        { title: 'We Keep It Up to Date', description: 'Tours, routes and prices change, so our comparisons are reviewed and updated.', image: img(8).src, href: '/blog' },
      ],
    },
    howWeChoose: {
      subtitle: `Four principles guide every ${copy.thing} we recommend on ${site}.`,
      steps: home.how.map((h, i) => ({
        title: h.title,
        description: h.description,
        image: home.categories[i]?.imageUrl ?? img(i).src,
        href: home.categories[i]?.href ?? '/tours',
      })),
    },
    places: { title: home.placesTitle, attractions: home.attractions, topTours: home.topTours },
  };
}

function capitalize(s: string): string {
  return s.charAt(0).toUpperCase() + s.slice(1);
}
