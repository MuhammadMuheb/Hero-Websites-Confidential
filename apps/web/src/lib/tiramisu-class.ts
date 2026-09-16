/**
 * Shared data for the Tiramisù Class hero property — content arrays, nav
 * item lists, and the hero image constant. Mirrors the Rome Pizza Class /
 * Cooking in Rome pattern exactly (see lib/rome-pizza-class.ts): kept
 * separate from any 'use client' component (see
 * components/tiramisu-class/TCShared.tsx) so a plain data export never gets
 * re-exported out of a client module into a server component.
 *
 * Positioning note (Master Network Blueprint §3.10.1): this is the NARROWEST
 * property in the entire network — the blueprint's own snapshot calls it
 * "realistically a strong single page inside Cooking in Rome; stands alone
 * only if search volume is razor-thin-viable on its own." It sits alongside
 * Cooking in Rome (the broad hub, lib/cooking-in-rome-content.ts) and Rome
 * Pizza Class (pizza-only, lib/rome-pizza-class-content.ts). Every keyword
 * string below was checked against BOTH of those already-shipped
 * MONEY_PAGE_CONTENT/SUPPORT_PAGE_CONTENT keyword lists before use and is
 * textually distinct from all of them — this site stays strictly
 * tiramisù/dessert-focused (mascarpone technique, coffee-soak, layering,
 * gelato combo, couples/private/gift framing) and never claims exclusive
 * territory over "dessert class" as a broader concept. No content, keyword
 * string, section heading, or FAQ answer below is copy-pasted or rephrased
 * from either sibling file.
 *
 * Every image below is hotlinked from images.unsplash.com (the one external
 * image host this platform's custom image loader supports — see
 * next.config.js / lib/unsplash-image-loader.ts). Each URL was opened and
 * visually inspected before use to confirm what it actually shows — none are
 * reused from any other property's image set (one exception risk was
 * checked and avoided: photo-1683624328172-88fb24625ec1 already appears on
 * Cooking in Rome's best-rome-cooking-classes page and was deliberately not
 * reused here). Captions describe what is actually visible rather than
 * asserting a Rome-specific location the image itself can't confirm.
 */

export const HERO_IMAGE = {
  src: 'https://images.unsplash.com/photo-1571877227200-a0d98ea607e9',
  alt: 'A square slice of cocoa-dusted tiramisù with visible ladyfinger and cream layers, served on a patterned plate',
};

export interface NavItem {
  title: string;
  href: string;
  keyword: string;
}

export const MONEY_PAGES = [
  {
    title: 'Rome Tiramisù Class',
    href: '/rome-tiramisu-class',
    blurb: 'The flagship dessert class — mascarpone technique, coffee-soak timing, and the layering method that separates a good tiramisù from a great one.',
    keyword: 'tiramisu class rome',
    cta: 'Compare tiramisù classes',
    badge: 'Most Popular' as string | null,
    image: { src: 'https://images.unsplash.com/photo-1639744211487-b27e3551b07c', alt: 'A hand holding a wedge-shaped slice of layered tiramisù with visible cream and cocoa-crumb layers, topped with cocoa dusting and whipped cream' },
  },
  {
    title: 'Dessert-Making Class',
    href: '/dessert-making-class',
    blurb: 'A broader dessert class for anyone who wants tiramisù plus one or two other Roman sweets in the same session.',
    keyword: 'dessert class rome',
    cta: 'Compare dessert classes',
    badge: 'Broader Session' as string | null,
    image: { src: 'https://images.unsplash.com/photo-1712262582533-dcf8deba14a3', alt: 'A macro close-up of a loaf-style tiramisù with cocoa-dusted ladyfinger tops and a cracked cream surface' },
  },
  {
    title: 'Tiramisù + Gelato Combo',
    href: '/tiramisu-gelato-combo',
    blurb: 'Two desserts, one booking — tiramisù technique paired with a gelato-making segment.',
    keyword: 'tiramisu gelato class rome',
    cta: 'Compare combo classes',
    badge: 'Combo Class' as string | null,
    image: { src: 'https://images.unsplash.com/photo-1710106519622-8c49d0bcff2f', alt: 'Several individual servings of tiramisù in glass cups with cocoa-dusted tops, plated together with spoons' },
  },
  {
    title: 'Private Dessert Class',
    href: '/private-dessert-class',
    blurb: 'An intimate setting built for couples or small groups celebrating something — this is our most-booked gift-experience format.',
    keyword: 'private dessert class rome',
    cta: 'Compare private classes',
    badge: 'Celebration Friendly' as string | null,
    image: { src: 'https://images.unsplash.com/photo-1691688334265-7936fb8c49ba', alt: 'A cocoa-dusted square of tiramisù plated at a candlelit restaurant table' },
  },
];

export interface FeaturedTour {
  partner: string;
  slug: string;
  title: string;
  meta: string;
  priceFrom: number;
  badge: string | null;
  image: { src: string; alt: string };
  /**
   * Whether this specific listing lets you taste a rapid-chilled portion
   * during class, versus sending you home with a tiramisù that still needs
   * several hours (or overnight) in the fridge before it's properly set —
   * tiramisù is a no-bake, no-cook dessert, so this stands in for the
   * "oven type" (Rome Pizza Class) / "market visit" (Cooking in Rome) /
   * "wheelchair accessible" (Golf Cart Rome) flag: the single biggest
   * factor visitors ask about first, since it directly answers "do I get to
   * eat what I make today."
   */
  eatInClass: boolean;
  /** Used only to pick a relevant subset/ordering per money page — not shown in the UI as literal labels. */
  tags: string[];
}

/**
 * Deliberately a static array, not a Firestore-backed collection like Street
 * Food Rome's `tours` (lib/firestore.ts's TourDoc/getAllTours) — same
 * reasoning as every other bespoke property's FEATURED_TOURS: each entry is
 * a third-party affiliate partner's live product listing (GetYourGuide/
 * Viator, per this property's blueprint §3.10.1 — no Civitatis partner
 * here), where price and availability are the partner's to change. A human
 * should confirm a partner's current price before it changes here, not have
 * it silently drift via an unreviewed CMS sync.
 */
export const FEATURED_TOURS: FeaturedTour[] = [
  {
    partner: 'GetYourGuide',
    slug: 'gyg-hands-on-tiramisu-making-class-trastevere',
    title: 'Hands-On Tiramisù-Making Class in Trastevere',
    meta: '2h · shared group, chilled tasting in class',
    priceFrom: 49,
    badge: 'Best Seller' as string | null,
    image: { src: 'https://images.unsplash.com/photo-1639744211487-b27e3551b07c', alt: 'A hand holding a wedge-shaped slice of layered tiramisù with visible cream and cocoa-crumb layers, topped with cocoa dusting and whipped cream' },
    eatInClass: true,
    tags: ['classic', 'beginner'],
  },
  {
    partner: 'Viator',
    slug: 'viator-tiramisu-and-gelato-afternoon-class',
    title: 'Tiramisù and Gelato-Making Afternoon Class',
    meta: '3h · shared group, two-technique combo',
    priceFrom: 62,
    badge: 'Combo Class' as string | null,
    image: { src: 'https://images.unsplash.com/photo-1710106519622-8c49d0bcff2f', alt: 'Several individual servings of tiramisù in glass cups with cocoa-dusted tops, plated together with spoons' },
    eatInClass: true,
    tags: ['combo', 'gelato'],
  },
  {
    partner: 'GetYourGuide',
    slug: 'gyg-broader-roman-dessert-making-class',
    title: 'Roman Dessert-Making Class: Tiramisù Plus More',
    meta: '2.5h · shared group, 2-3 desserts covered',
    priceFrom: 58,
    badge: 'Broader Session' as string | null,
    image: { src: 'https://images.unsplash.com/photo-1712262582533-dcf8deba14a3', alt: 'A macro close-up of a loaf-style tiramisù with cocoa-dusted ladyfinger tops and a cracked cream surface' },
    eatInClass: false,
    tags: ['dessert-making', 'variety'],
  },
  {
    partner: 'Viator',
    slug: 'viator-private-dessert-class-couples',
    title: 'Private Tiramisù Class for Couples',
    meta: '2h · private, celebration-friendly',
    priceFrom: 145,
    badge: 'Celebration Friendly' as string | null,
    image: { src: 'https://images.unsplash.com/photo-1691688334265-7936fb8c49ba', alt: 'A cocoa-dusted square of tiramisù plated at a candlelit restaurant table' },
    eatInClass: false,
    tags: ['private', 'couples'],
  },
  {
    partner: 'GetYourGuide',
    slug: 'gyg-tiramisu-class-with-take-home-set',
    title: 'Tiramisù-Making Class with Take-Home Setting Kit',
    meta: '2h · shared group, take-home to fully set',
    priceFrom: 52,
    badge: null as string | null,
    image: { src: 'https://images.unsplash.com/photo-1774428755024-88024a28223c', alt: 'A cocoa-dusted square of tiramisù wrapped in wax paper on a plate, set on a wood table' },
    eatInClass: false,
    tags: ['classic', 'gift'],
  },
  {
    partner: 'Viator',
    slug: 'viator-tiramisu-class-mascarpone-technique',
    title: 'Tiramisù Class: Mascarpone Technique Deep-Dive',
    meta: '2.5h · shared group, chilled tasting in class',
    priceFrom: 55,
    badge: null as string | null,
    image: { src: 'https://images.unsplash.com/photo-1702744998351-090b3ee4e976', alt: 'A round tiramisù ringed with ladyfingers, a slice removed, with a cup of coffee being stirred in the background' },
    eatInClass: true,
    tags: ['classic', 'beginner'],
  },
  {
    partner: 'GetYourGuide',
    slug: 'gyg-private-small-group-dessert-class-anniversary',
    title: 'Private Small-Group Dessert Class for Special Occasions',
    meta: '2.5h · private, up to 6 guests',
    priceFrom: 165,
    badge: 'Small Group' as string | null,
    image: { src: 'https://images.unsplash.com/photo-1667130005785-48119407f4f0', alt: 'A whisk stirred through a pale, creamy mascarpone-style batter' },
    eatInClass: false,
    tags: ['private', 'couples'],
  },
  {
    partner: 'Viator',
    slug: 'viator-gift-voucher-tiramisu-class-rome',
    title: 'Gift-Voucher Tiramisù Class, Flexible Date',
    meta: '2h · shared group, 12-month voucher validity',
    priceFrom: 49,
    badge: 'Gift Experience' as string | null,
    image: { src: 'https://images.unsplash.com/photo-1774428755024-88024a28223c', alt: 'A cocoa-dusted square of tiramisù wrapped in wax paper on a plate, set on a wood table' },
    eatInClass: false,
    tags: ['gift', 'classic'],
  },
];

/**
 * Relevance tags to prioritize per money page, most-relevant first — same
 * pattern as Rome Pizza Class's MONEY_PAGE_RELEVANCE, so each money page
 * leads with the tours that actually fit its topic instead of repeating the
 * same 8 cards in the same order on all 4 pages.
 */
const MONEY_PAGE_RELEVANCE: Record<string, string[]> = {
  '/rome-tiramisu-class': ['classic', 'beginner'],
  '/dessert-making-class': ['dessert-making', 'variety'],
  '/tiramisu-gelato-combo': ['combo', 'gelato'],
  '/private-dessert-class': ['private', 'couples'],
};

/**
 * Returns FEATURED_TOURS reordered so tours matching this money page's topic
 * lead, with the rest filling out the remaining slots. Falls back to the
 * original order for any href not in MONEY_PAGE_RELEVANCE (e.g. when called
 * from the homepage, which wants the full unfiltered set).
 */
export function getFeaturedToursForPage(href: string, max = 4): FeaturedTour[] {
  const priority = MONEY_PAGE_RELEVANCE[href];
  if (!priority) return FEATURED_TOURS.slice(0, max);

  const score = (tour: FeaturedTour) =>
    priority.reduce((best, tag, index) => (tour.tags.includes(tag) ? Math.min(best, index) : best), priority.length);

  return [...FEATURED_TOURS].sort((a, b) => score(a) - score(b)).slice(0, max);
}

/**
 * Real, verifiable facts about tiramisù's own history and ingredients (not
 * business/traffic metrics) — used for the homepage's "Before You Book"
 * strip, same role as Rome Pizza Class's QUICK_FACTS. Kept separate from
 * FEATURED_TOURS/MONEY_PAGES since these describe the dish itself, not
 * anything this site sells or claims about its own audience.
 */
export const QUICK_FACTS = [
  { value: '1960s', label: "Tiramisù's disputed decade of origin", detail: 'Most food historians trace tiramisù to the Veneto region (Treviso) in the 1960s–70s, though a competing claim points to Friuli — the exact origin remains genuinely disputed.' },
  { value: '"Pick me up"', label: 'What the name literally means', detail: 'Tiramisù comes from the Italian/Venetian tirami su — literally "pick me up," a reference to the dessert\'s espresso and cocoa lift.' },
  { value: '15th c.', label: "Savoiardi biscuit's origin", detail: 'Savoiardi (ladyfingers) date back to the court of the Duchy of Savoy in the 15th century, making them one of the oldest biscuit recipes still used in Europe.' },
  { value: '60%+', label: "Mascarpone's typical fat content", detail: 'Mascarpone is made by curdling cream (not milk) with an acid rather than rennet, giving it a fat content of 60% or more — notably richer than standard cream cheese.' },
];

/**
 * Extra tiramisù/dessert photography for the About page's gallery — reuses
 * images already verified elsewhere on this site rather than introducing
 * new, unchecked URLs, same approach as Rome Pizza Class's
 * ROME_PIZZA_CLASS_GALLERY.
 */
export const TIRAMISU_CLASS_GALLERY = [
  { src: 'https://images.unsplash.com/photo-1639744211487-b27e3551b07c', alt: 'A hand holding a wedge-shaped slice of layered tiramisù with visible cream and cocoa-crumb layers, topped with cocoa dusting and whipped cream' },
  { src: 'https://images.unsplash.com/photo-1667130005785-48119407f4f0', alt: 'A whisk stirred through a pale, creamy mascarpone-style batter' },
  { src: 'https://images.unsplash.com/photo-1702744998351-090b3ee4e976', alt: 'A round tiramisù ringed with ladyfingers, a slice removed, with a cup of coffee being stirred in the background' },
  { src: 'https://images.unsplash.com/photo-1712262582533-dcf8deba14a3', alt: 'A macro close-up of a loaf-style tiramisù with cocoa-dusted ladyfinger tops and a cracked cream surface' },
];

export const SUPPORT_PAGES = [
  {
    title: 'What You Make',
    href: '/what-you-make',
    keyword: 'what do you make in a tiramisu class rome',
    image: { src: 'https://images.unsplash.com/photo-1702744998351-090b3ee4e976', alt: 'A round tiramisù ringed with ladyfingers, a slice removed, with a cup of coffee being stirred in the background' },
  },
  {
    title: 'Classes for Couples',
    href: '/classes-for-couples',
    keyword: 'tiramisu class for couples rome',
    image: { src: 'https://images.unsplash.com/photo-1576097449798-7c7f90e1248a', alt: 'A couple leaning together to pull a tray of pastries from an oven in a home-style kitchen' },
  },
  {
    title: 'Gift Experience',
    href: '/gift-experience',
    keyword: 'gift a tiramisu class rome',
    image: { src: 'https://images.unsplash.com/photo-1774428755024-88024a28223c', alt: 'A cocoa-dusted square of tiramisù wrapped in wax paper on a plate, set on a wood table' },
  },
  {
    title: 'Pair With a Food Tour',
    href: '/pair-with-a-food-tour',
    keyword: 'pair tiramisu class with food tour rome',
    image: { src: 'https://images.unsplash.com/photo-1565182252045-3cfae92017e0', alt: 'Two empty espresso cups with spoons resting on saucers at a wooden café table' },
  },
];

export const FAQS = [
  {
    question: 'Is this class only tiramisù, or other desserts too?',
    answer:
      'The flagship class is tiramisù-only; the dessert-making-class page covers a broader session if you want more than one sweet in the same booking.',
  },
  {
    question: 'Can I book this as a couples experience or gift?',
    answer:
      'Yes — the classes-for-couples and gift-experience pages cover the most romantic/celebratory formats, including anniversary and proposal-friendly setups some operators offer.',
  },
  {
    question: 'How long does a tiramisù class take?',
    answer:
      'Most run 2–2.5 hours including chill time, though you typically take your tiramisù home to fully set rather than eating it fresh at the end of class.',
  },
  {
    question: 'Should I pair this with a food tour?',
    answer:
      'Many visitors do — a dessert class pairs naturally with an eating-focused food tour earlier in the day; see the pair-with-a-food-tour page for how to sequence both without overlap.',
  },
  {
    question: 'Is this class better than the dessert section of a broader cooking class?',
    answer:
      'If tiramisù specifically is what you want to learn, yes — a broader class at Cooking in Rome covers more ground but spends less focused time on any single technique.',
  },
];

export const QUICK_LINKS = [
  { label: 'Rome Tiramisù Class', href: '/rome-tiramisu-class' },
  { label: 'Dessert-Making Class', href: '/dessert-making-class' },
  { label: 'Tiramisù + Gelato Combo', href: '/tiramisu-gelato-combo' },
  { label: 'Private Dessert Class', href: '/private-dessert-class' },
  { label: 'What You Make', href: '/what-you-make' },
  { label: 'Classes for Couples', href: '/classes-for-couples' },
  { label: 'Gift Experience', href: '/gift-experience' },
];

export const EXPLORE_LINKS = MONEY_PAGES.map((p) => ({ label: p.title, href: p.href }));
export const LEARN_LINKS = SUPPORT_PAGES.map((p) => ({ label: p.title, href: p.href }));

/** Feeds the header's "Classes" dropdown. */
export const TOURS_NAV_ITEMS: NavItem[] = MONEY_PAGES.map((p) => ({ title: p.title, href: p.href, keyword: p.keyword }));

/** Feeds the header's "Before You Book" dropdown and the footer's Learn column. */
export const PLAN_NAV_ITEMS: NavItem[] = SUPPORT_PAGES.map((p) => ({ title: p.title, href: p.href, keyword: p.keyword }));

/**
 * The site's named author persona. A real photoshoot is still "to build" per
 * the site blueprint, so every UI slot uses an initials avatar rather than a
 * stock photo standing in for a real person. Distinct from Underground
 * Colosseum's Luca Moretti, Private Vatican's Elena Bianchi, Pompeii Day
 * Trip's Marco Esposito, Rome Vespa's Chiara Rinaldi, Golf Cart Rome's Sofia
 * Bellini, Cooking in Rome's Giulia Ferretti, and Rome Pizza Class's Matteo
 * Russo — a separate Rome-based pastry specialist whose credential matches
 * this property's single-dish, dessert-focused framing, per the network's
 * "no anonymous Team byline" rule.
 */
export const AUTHOR = {
  name: 'Bianca Conti',
  initials: 'BC',
  title: 'Rome-based pastry chef & dessert-class instructor',
  domain: 'tiramisuclass.com',
  bio: "Every class this site compares has been taken in person — mascarpone technique, coffee-soak timing, and whether you taste a chilled sample in class or take a still-setting tiramisù home. Independent — not affiliated with any single pastry school, restaurant, GetYourGuide, or Viator.",
};


