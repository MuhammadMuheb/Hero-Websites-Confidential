/**
 * Fallback hero images for each food category, when Firestore
 * category-{slug} documents don't have heroImageUrl set.
 * All images sourced from Unsplash — actual Roman food & cuisine.
 */

export const CATEGORY_HERO_IMAGES: Record<string, { src: string; alt: string }> = {
  pizza: {
    src: 'https://images.unsplash.com/photo-1571997478779-2adcbbe9ab2f',
    alt: 'A pair of hands stretching fresh pizza dough into a round on a floured surface',
  },
  pasta: {
    src: 'https://images.unsplash.com/photo-1642354571956-d77dfd9596bb',
    alt: 'A plate of freshly cooked cacio e pepe with pecorino and black pepper',
  },
  'beer-and-wine': {
    src: 'https://images.unsplash.com/photo-1516594798947-e65505dbb29d',
    alt: 'Glasses of wine and beer on a table at a Roman enoteca or bar',
  },
  gelato: {
    src: 'https://images.unsplash.com/photo-1555992643-0c053cbd87e1',
    alt: 'Display of fresh gelato in metal tins showing vibrant, natural colors',
  },
  'street-food-classics': {
    src: 'https://images.unsplash.com/photo-1552539618-7eec9b4d1796',
    alt: 'A close-up of supplì and other Roman street food at a market counter',
  },
};
