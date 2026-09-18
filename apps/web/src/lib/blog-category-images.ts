/**
 * Fallback hero images for each blog category, when Firestore
 * blog-category-{slug} documents don't have heroImageUrl set.
 * All images sourced from Unsplash — Roman food, markets, and dining scenes.
 */

export const BLOG_CATEGORY_HERO_IMAGES: Record<string, { src: string; alt: string }> = {
  'food-guides': {
    src: 'https://images.unsplash.com/photo-1555939594-58d7cb561552',
    alt: 'Close-up of authentic Roman dishes on a wooden table — cacio e pepe and other pasta classics',
  },
  'neighborhood-guides': {
    src: 'https://images.unsplash.com/photo-1592840042225-a83e8fad67d2',
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
