/**
 * Shared data for the Naples Street Food hero property — content arrays, nav
 * item lists, and the hero image constant.
 */

export const HERO_IMAGE = {
  src: 'https://images.unsplash.com/photo-1555939594-58d7cb561021',
  alt: 'Freshly cooked Neapolitan pizza with bubbling char emerging from a wood-fired oven',
};

export interface NavItem {
  title: string;
  href: string;
  keyword: string;
}

export const MONEY_PAGES = [
  {
    title: "Naples Street-Food Tour",
    href: "/naples-street-food-tour",
    blurb: "The flagship guided food walk through Naples' historic center — pizza, fried snacks, and the market stalls that define the city's food identity.",
    keyword: "naples street food tour",
    cta: "Compare food tours",
    badge: "Most Popular" as string | null,
    image: { src: "https://images.unsplash.com/photo-1565062745839-37fff61d6b82", alt: "Vibrant Neapolitan street market stall bursting with fresh produce and colorful displays" },
  },
  {
    title: "Pizza-Focused Food Tour",
    href: "/pizza-focused-food-tour",
    blurb: "Naples invented pizza — this tour tastes it at the source, comparing the classic pizzerie against the newer wood-fired spots locals actually queue for.",
    keyword: "naples pizza tour",
    cta: "Compare pizza tours",
    badge: "Birthplace Tour" as string | null,
    image: { src: "https://images.unsplash.com/photo-1555939594-58d7cb561021", alt: "A perfectly charred Neapolitan pizza slice ready to eat with steam rising from the cheese" },
  },
  {
    title: "Naples Market Tour",
    href: "/naples-market-tour",
    blurb: "Naples' markets are louder, denser, and more theatrical than Rome's — this tour uses them as a tasting counter for the city's fried-food specialities.",
    keyword: "naples market tour",
    cta: "Explore market tours",
    badge: null,
    image: { src: "https://images.unsplash.com/photo-1584147204876-e67f9825e7f0", alt: "Crowded Naples market corridor with vendors selling fresh vegetables, cheese, and local specialties" },
  },
  {
    title: "Spaccanapoli Food Walk",
    href: "/spaccanapoli-food-walk",
    blurb: "The old-town route straight down Naples' famous Spaccanapoli street — food stops threaded through the historic center's narrowest, most atmospheric alleys.",
    keyword: "spaccanapoli food tour",
    cta: "Book Spaccanapoli walk",
    badge: null,
    image: { src: "https://images.unsplash.com/photo-1509715332983-b77d234b7c3e", alt: "Narrow Spaccanapoli street in Naples with laundry hanging above, shops lining both sides, golden afternoon light" },
  },
];

export interface FeaturedTour {
  partner: string;
  slug: string;
  title: string;
  meta: string;
  priceFrom: number;
  badge: string | null;
  href: string;
  image: { src: string; alt: string };
}

export const FEATURED_TOURS: FeaturedTour[] = [
  {
    partner: 'GetYourGuide',
    slug: 'naples-street-food-walking-tour',
    title: 'Naples Street Food Walking Tour',
    meta: 'Historic center routing',
    priceFrom: 35,
    badge: 'Most Popular',
    href: '/go/naples-street-food-walking-tour',
    image: { src: 'https://images.unsplash.com/photo-1545521521-d2c887e6b797', alt: 'Hand holding a freshly fried cuoppo of seafood and vegetables wrapped in paper' },
  },
  {
    partner: 'Viator',
    slug: 'neapolitan-pizza-food-tour',
    title: 'Neapolitan Pizza Tasting Tour',
    meta: 'Multiple pizzerie stops',
    priceFrom: 45,
    badge: 'Food Focus',
    href: '/go/neapolitan-pizza-food-tour',
    image: { src: 'https://images.unsplash.com/photo-1555939594-58d7cb561021', alt: 'Perfectly cooked Neapolitan pizza with bubbling mozzarella and San Marzano tomato sauce' },
  },
  {
    partner: 'Civitatis',
    slug: 'naples-food-market-tour',
    title: 'Naples Food Market Tour',
    meta: 'Market tastings included',
    priceFrom: 50,
    badge: null,
    href: '/go/naples-food-market-tour',
    image: { src: 'https://images.unsplash.com/photo-1565062745839-37fff61d6b82', alt: 'Naples market vendor slicing fresh mozzarella with a wire while customer watches' },
  },
];

export const NAV_ITEMS: NavItem[] = [
  { title: 'Street Food Tours', href: '/naples-street-food-tour', keyword: 'naples street food tour' },
  { title: 'Pizza Focus', href: '/pizza-focused-food-tour', keyword: 'naples pizza tour' },
  { title: 'Market Tours', href: '/naples-market-tour', keyword: 'naples market tour' },
  { title: 'Spaccanapoli', href: '/spaccanapoli-food-walk', keyword: 'spaccanapoli food tour' },
  { title: 'Real Neapolitan Pizza', href: '/real-neapolitan-pizza-guide', keyword: 'real neapolitan pizza' },
  { title: 'Fried Food Guide', href: '/fried-food-specialities', keyword: 'naples fried food' },
  { title: 'Where Locals Eat', href: '/where-locals-eat', keyword: 'where locals eat naples' },
];

export const SUPPORT_PAGES = [
  {
    title: 'Real Neapolitan Pizza Guide',
    href: '/real-neapolitan-pizza-guide',
    keyword: 'real neapolitan pizza',
    image: { src: 'https://images.unsplash.com/photo-1555939594-58d7cb561021', alt: 'Perfectly charred Neapolitan pizza straight from a wood-fired oven' },
  },
  {
    title: 'Fried Food Specialities',
    href: '/fried-food-specialities',
    keyword: 'naples fried food',
    image: { src: 'https://images.unsplash.com/photo-1608039755401-742245ab62f4', alt: 'Golden fried cuoppo cone filled with fresh fried seafood and vegetables' },
  },
  {
    title: 'Where Locals Eat',
    href: '/where-locals-eat',
    keyword: 'where locals eat naples',
    image: { src: 'https://images.unsplash.com/photo-1565062745839-37fff61d6b82', alt: 'Bustling neighborhood trattoria filled with locals eating at communal tables' },
  },
];

export const QUICK_FACTS = [
  { label: 'Pizza Origin', stat: '1738', detail: 'Year Neapolitan pizza was documented as a street food' },
  { label: 'Tour Duration', stat: '3–4h', detail: 'Typical street food walk with multiple tasting stops' },
  { label: 'Price Band', stat: '€35–70', detail: 'Range for street food and market tours' },
  { label: 'Best Tasting Time', stat: '5–6 PM', detail: 'Evening window before dinner service clears stalls' },
];

export const QUICK_LINKS = [
  { label: 'See All Tours', href: '#tours' },
  { label: 'Pizza at the Source', href: '/real-neapolitan-pizza-guide' },
  { label: 'Fried Food Guide', href: '/fried-food-specialities' },
  { label: 'Where Locals Eat', href: '/where-locals-eat' },
];

export const FAQS = [
  {
    question: "Is Naples street food different from Rome street food?",
    answer:
      "Significantly — Naples is fried-food and pizza-forward (cuoppo, frittatine, true Neapolitan pizza), while Rome leans toward suppli, pizza al taglio, and market-stall Roman-Jewish specialities; this site is Naples-specific, not a repurposed Rome guide.",
  },
  {
    question: "Is Naples safe for a food tour?",
    answer:
      "Yes, in the well-trafficked historic center and market areas covered by these tours; standard city awareness applies, same as any major Italian city center.",
  },
  {
    question: "What's the difference between this and a Rome food tour?",
    answer:
      "Pure geography — same tour format and quality bar, but this site covers Naples specifically; see our sibling Street Food Rome for the Rome equivalent.",
  },
  {
    question: "Do I need to book in advance?",
    answer:
      "Popular pizza-focused tours and famous pizzeria visits do sell out on weekends — booking 1–2 weeks ahead in peak season is safest.",
  },
  {
    question: "Can I combine a food tour with the underground tunnels in Naples?",
    answer:
      "Yes — the food-underground-combo page covers pairing a food walk with Naples' underground (Napoli Sotterranea) tunnel system in one day.",
  },
];
