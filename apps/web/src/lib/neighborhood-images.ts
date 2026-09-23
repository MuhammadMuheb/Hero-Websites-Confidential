/**
 * Fallback hero images for each Rome neighbourhood, when Firestore
 * neighbourhood-{slug} documents don't have heroImageUrl set.
 * All images sourced from Unsplash — actual Roman streets and markets.
 */

export const NEIGHBORHOOD_HERO_IMAGES: Record<string, { src: string; alt: string }> = {
  trastevere: {
    src: 'https://images.unsplash.com/photo-1640307112649-01bfc4c77a77',
    alt: 'Narrow cobbled streets of Trastevere with ivy-covered buildings and restaurant tables on the lane',
  },
  testaccio: {
    src: 'https://images.unsplash.com/photo-1708628934823-a37e3fe0bb4e',
    alt: 'A Roman market stall with fresh produce and meats — the heart of Testaccio market',
  },
  'jewish-ghetto': {
    src: 'https://images.unsplash.com/photo-1708628934823-a37e3fe0bb4e',
    alt: 'Historic buildings along Via del Portico d\'Ottavia in Rome\'s Jewish Ghetto',
  },
  'campo-de-fiori': {
    src: 'https://images.unsplash.com/photo-1488646953014-85cb44e25828',
    alt: 'Early morning view of Campo de\' Fiori with produce and flower market stalls',
  },
  monti: {
    src: 'https://images.unsplash.com/photo-1552539618-7eec9b4d1796',
    alt: 'A charming Monti street with independent shops, wine bars, and small restaurants',
  },
  prati: {
    src: 'https://images.unsplash.com/photo-1708628934823-a37e3fe0bb4e',
    alt: 'Wide boulevards and historic buildings of Prati neighbourhood, across from the Vatican',
  },
  'san-lorenzo': {
    src: 'https://images.unsplash.com/photo-1640307112649-01bfc4c77a77',
    alt: 'Via del Pigneto street scene with street art, independent restaurants and local bars',
  },
  pigneto: {
    src: 'https://images.unsplash.com/photo-1662398885856-cf2ab6e981b2',
    alt: 'The pedestrian strip of Via del Pigneto with its creative street art and independent venues',
  },
  trionfale: {
    src: 'https://images.unsplash.com/photo-1708628934823-a37e3fe0bb4e',
    alt: 'Inside Mercato Trionfale covered market with produce stalls and local shoppers',
  },
  garbatella: {
    src: 'https://images.unsplash.com/photo-1640307112649-01bfc4c77a77',
    alt: 'Charming courtyard layout and low-rise buildings of Garbatella\'s garden-city design',
  },
};
