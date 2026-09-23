/**
 * Fallback hero images for each blog category, when Firestore
 * blog-category-{slug} documents don't have heroImageUrl set.
 * All images sourced from Unsplash — Roman food, markets, and dining scenes.
 */

export const BLOG_CATEGORY_HERO_IMAGES: Record<string, { src: string; alt: string }> = {
  'food-guides': {
    src: 'https://images.unsplash.com/photo-1708628934823-a37e3fe0bb4e',
    alt: 'Close-up of authentic Roman dishes on a wooden table — cacio e pepe and other pasta classics',
  },
  'neighborhood-guides': {
    src: 'https://images.unsplash.com/photo-1640307112649-01bfc4c77a77',
    alt: 'A charming Roman street in Trastevere with ivy-covered buildings and restaurant seating',
  },
  'practical-tips': {
    src: 'https://images.unsplash.com/photo-1488646953014-85cb44e25828',
    alt: 'Interior of a Roman bar counter with espresso machine and local patrons',
  },
  'itineraries': {
    src: 'https://images.unsplash.com/photo-1552539618-7eec9b4d1796',
    alt: 'A finished pizza with fresh toppings ready to be served in a Roman kitchen',
  },
  'seasonal-events': {
    src: 'https://images.unsplash.com/photo-1488646953014-85cb44e25828',
    alt: 'Roman market stall with seasonal produce and flowers in spring',
  },
};
