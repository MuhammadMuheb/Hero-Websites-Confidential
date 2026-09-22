/**
 * Comprehensive image utility with fallbacks, error handling, and smart defaults
 * Ensures no broken image icons or missing images across the site
 */

export const IMAGE_FALLBACKS: Record<string, string> = {
  // Tour images
  'tour-default': 'https://images.unsplash.com/photo-1504674900967-86e697a72fb2?w=800',

  // Category fallbacks - Food tours
  'pizza': 'https://images.unsplash.com/photo-1571997478779-2adcbbe9ab2f?w=800',
  'pasta': 'https://images.unsplash.com/photo-1621996346565-e3dbc353d2e5?w=800',
  'gelato': 'https://images.unsplash.com/photo-1577003832033-a0d99e4e7ec6?w=800',
  'wine': 'https://images.unsplash.com/photo-1516594798947-e65505dbb29d?w=800',
  'beer-and-wine': 'https://images.unsplash.com/photo-1516594798947-e65505dbb29d?w=800',
  'street-food': 'https://images.unsplash.com/photo-1552539618-7eec9b4d1796?w=800',
  'street-food-classics': 'https://images.unsplash.com/photo-1552539618-7eec9b4d1796?w=800',

  // Neighborhood fallbacks
  'neighborhood': 'https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=800',
  'trastevere': 'https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=800',
  'testaccio': 'https://images.unsplash.com/photo-1552539618-7eec9b4d1796?w=800',
  'jewish-ghetto': 'https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=800',
  'campo-de-fiori': 'https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=800',
  'monti': 'https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=800',
  'prati': 'https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=800',
  'san-lorenzo': 'https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=800',
  'pigneto': 'https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=800',
  'trionfale': 'https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=800',
  'garbatella': 'https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=800',

  // Blog/content fallbacks
  'blog': 'https://images.unsplash.com/photo-1495521821757-a1efb6729352?w=800',
  'guide': 'https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=800',
  'food-guide': 'https://images.unsplash.com/photo-1495521821757-a1efb6729352?w=800',
  'neighborhood-guide': 'https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=800',
  'practical-tips': 'https://images.unsplash.com/photo-1495521821757-a1efb6729352?w=800',
  'itinerary': 'https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=800',
  'seasonal-events': 'https://images.unsplash.com/photo-1495521821757-a1efb6729352?w=800',

  // Generic fallback
  'default': 'https://images.unsplash.com/photo-1504674900967-86e697a72fb2?w=800',
};

/**
 * Get image URL with smart fallback logic
 * @param url - The image URL to use, if available
 * @param fallbackKey - The fallback category/key to use if URL is missing
 * @returns The URL to use for the image
 */
export function getImageUrl(
  url: string | null | undefined,
  fallbackKey: string = 'default'
): string {
  // If URL provided and valid, use it
  if (url && url.trim() && url.startsWith('http')) {
    return url;
  }

  // Fall back to category/type specific image
  return IMAGE_FALLBACKS[fallbackKey] || IMAGE_FALLBACKS.default;
}

/**
 * Get image URL with category-specific fallback
 * Useful when you have a category but no image URL
 */
export function getImageUrlWithCategory(
  url: string | null | undefined,
  category?: string | null,
  type: 'tour' | 'blog' | 'neighborhood' = 'tour'
): string {
  if (url && url.trim() && url.startsWith('http')) {
    return url;
  }

  // Try category-specific fallback first
  if (category && category in IMAGE_FALLBACKS) {
    return IMAGE_FALLBACKS[category];
  }

  // Fall back to type-specific
  const typeKey = `${type}-default`;
  return IMAGE_FALLBACKS[typeKey] || IMAGE_FALLBACKS.default;
}

/**
 * Check if a URL is valid and points to Unsplash
 */
export function isValidImageUrl(url: string | null | undefined): boolean {
  if (!url || !url.trim()) return false;
  try {
    const urlObj = new URL(url);
    return urlObj.hostname.includes('unsplash.com') ||
           urlObj.hostname.includes('images.unsplash.com');
  } catch {
    return false;
  }
}
