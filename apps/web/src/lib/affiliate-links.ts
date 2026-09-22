/**
 * Centralized affiliate/partner link management system
 * Single source of truth for all external product links
 *
 * Benefits:
 * - Change URLs once, updates everywhere
 * - Automatic UTM parameter tracking
 * - Easy to switch partners or A/B test
 * - Centralized analytics
 * - Scalable for growth
 */

export interface AffiliateLink {
  id: string;
  name: string;
  url: string;
  category: 'tour' | 'class' | 'activity' | 'product';
  partner: string;
  utmSource: string;
  utmMedium: 'tour' | 'class' | 'activity' | 'recommendation';
  utmCampaign: string;
  tags: string[];
  description?: string;
}

/**
 * All affiliate links - SINGLE SOURCE OF TRUTH
 * Update here to change everywhere
 * Add new links here as you establish new partnerships
 */
export const AFFILIATE_LINKS: Record<string, AffiliateLink> = {
  // Viator partnerships
  'viator-pizza-tour': {
    id: 'viator-pizza-tour',
    name: 'Best Pizza Walking Tour via Viator',
    url: 'https://www.viator.com/en/tours/Rome/Best-Pizza-Walking-Tour/d332-111111',
    category: 'tour',
    partner: 'viator',
    utmSource: 'streetfoodrome',
    utmMedium: 'tour',
    utmCampaign: 'pizza-tours',
    tags: ['pizza', 'walking-tour', 'food'],
    description: 'Professional pizza tour via Viator',
  },

  'viator-cooking-class': {
    id: 'viator-cooking-class',
    name: 'Italian Cooking Class via Viator',
    url: 'https://www.viator.com/en/tours/Rome/Italian-Cooking-Class/d332-222222',
    category: 'class',
    partner: 'viator',
    utmSource: 'streetfoodrome',
    utmMedium: 'class',
    utmCampaign: 'cooking-classes',
    tags: ['cooking', 'class', 'food', 'pasta'],
    description: 'Hands-on cooking class via Viator',
  },

  // Klook partnerships
  'klook-cooking-class': {
    id: 'klook-cooking-class',
    name: 'Italian Cooking Class via Klook',
    url: 'https://www.klook.com/activity/222222-italian-cooking-class-rome/',
    category: 'class',
    partner: 'klook',
    utmSource: 'streetfoodrome',
    utmMedium: 'class',
    utmCampaign: 'cooking-classes',
    tags: ['cooking', 'class', 'food'],
    description: 'Cooking class bookable through Klook',
  },

  // GetYourGuide partnerships
  'getyourguide-colosseum': {
    id: 'getyourguide-colosseum',
    name: 'Colosseum & Roman Forum via GetYourGuide',
    url: 'https://www.getyourguide.com/colosseum-and-roman-forum-tour/',
    category: 'tour',
    partner: 'getYourGuide',
    utmSource: 'streetfoodrome',
    utmMedium: 'tour',
    utmCampaign: 'rome-landmarks',
    tags: ['colosseum', 'history', 'walking-tour'],
    description: 'History tour via GetYourGuide',
  },

  'getyourguide-vatican': {
    id: 'getyourguide-vatican',
    name: 'Vatican Tour via GetYourGuide',
    url: 'https://www.getyourguide.com/vatican-museums-and-sistine-chapel/',
    category: 'tour',
    partner: 'getYourGuide',
    utmSource: 'streetfoodrome',
    utmMedium: 'tour',
    utmCampaign: 'rome-landmarks',
    tags: ['vatican', 'art', 'history'],
    description: 'Vatican tour via GetYourGuide',
  },

  // Airbnb Experiences
  'airbnb-pasta-class': {
    id: 'airbnb-pasta-class',
    name: 'Make Pasta Like a Roman via Airbnb',
    url: 'https://www.airbnb.com/experiences/rome-italy-pasta-class',
    category: 'class',
    partner: 'airbnb',
    utmSource: 'streetfoodrome',
    utmMedium: 'class',
    utmCampaign: 'cooking-classes',
    tags: ['pasta', 'cooking', 'class'],
    description: 'Pasta making class via Airbnb Experiences',
  },

  // Restaurant.com
  'restaurant-booking': {
    id: 'restaurant-booking',
    name: 'Rome Restaurant Booking',
    url: 'https://www.restaurant.com/rome-italy',
    category: 'activity',
    partner: 'restaurant.com',
    utmSource: 'streetfoodrome',
    utmMedium: 'recommendation',
    utmCampaign: 'restaurant-bookings',
    tags: ['restaurants', 'dining', 'food'],
    description: 'Restaurant reservations via Restaurant.com',
  },
};

/**
 * Get affiliate URL with automatic UTM parameters
 * All links automatically get utm_source, utm_medium, utm_campaign
 * @param linkId - The affiliate link ID
 * @returns Full URL with UTM parameters, or null if not found
 */
export function getAffiliateUrl(linkId: string): string | null {
  const link = AFFILIATE_LINKS[linkId];
  if (!link) return null;

  try {
    const url = new URL(link.url);
    url.searchParams.set('utm_source', link.utmSource);
    url.searchParams.set('utm_medium', link.utmMedium);
    url.searchParams.set('utm_campaign', link.utmCampaign);

    return url.toString();
  } catch {
    return link.url; // Return original if URL parsing fails
  }
}

/**
 * Get affiliate link metadata for logging/tracking/display
 * @param linkId - The affiliate link ID
 * @returns Link metadata, or null if not found
 */
export function getAffiliateLinkMetadata(linkId: string): AffiliateLink | null {
  return AFFILIATE_LINKS[linkId] || null;
}

/**
 * Find all affiliate links matching a tag
 * Useful for filtering links by category
 * @param tag - The tag to search for
 * @returns Array of matching affiliate links
 */
export function getAffiliatesByTag(tag: string): AffiliateLink[] {
  return Object.values(AFFILIATE_LINKS).filter((link) =>
    link.tags.includes(tag.toLowerCase())
  );
}

/**
 * Find all affiliate links from a specific partner
 * Useful for switching partners or comparing performance
 * @param partner - The partner name
 * @returns Array of links from that partner
 */
export function getAffiliatesByPartner(partner: string): AffiliateLink[] {
  return Object.values(AFFILIATE_LINKS).filter((link) =>
    link.partner.toLowerCase() === partner.toLowerCase()
  );
}

/**
 * Get all affiliate links for a category
 * @param category - The category ('tour', 'class', 'activity')
 * @returns Array of links in that category
 */
export function getAffiliatesByCategory(
  category: AffiliateLink['category']
): AffiliateLink[] {
  return Object.values(AFFILIATE_LINKS).filter((link) =>
    link.category === category
  );
}

/**
 * List all available affiliate links
 * Useful for admin dashboards or testing
 */
export function getAllAffiliateLinks(): AffiliateLink[] {
  return Object.values(AFFILIATE_LINKS);
}

/**
 * Check if a link ID exists
 * @param linkId - The affiliate link ID
 * @returns true if link exists
 */
export function affiliateLinkExists(linkId: string): boolean {
  return linkId in AFFILIATE_LINKS;
}
