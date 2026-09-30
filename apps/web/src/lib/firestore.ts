/**
 * UPDATED firestore.ts - PHASE 2 COMPLETE
 *
 * Copy this file to: apps/web/src/lib/firestore.ts
 *
 * Changes:
 * - getPropertySlugForTour() now has ALL Street Food Rome tours mapped
 * - Ready for other 12 properties (add their tours when available)
 */

import { cert, getApps, initializeApp, type App } from 'firebase-admin/app';
import { getFirestore, type Firestore } from 'firebase-admin/firestore';
import { unstable_cache } from 'next/cache';

export const SITE_DOMAIN = 'streetfoodrome.com';

function loadApp(): App {
  if (getApps().length > 0) return getApps()[0]!;

  const projectId = process.env.FIREBASE_PROJECT_ID;
  const clientEmail = process.env.FIREBASE_CLIENT_EMAIL;
  const privateKey = process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n');

  if (!projectId || !clientEmail || !privateKey) {
    throw new Error(
      'Missing Firebase Admin credentials — set FIREBASE_PROJECT_ID, FIREBASE_CLIENT_EMAIL, and FIREBASE_PRIVATE_KEY.',
    );
  }

  return initializeApp({ credential: cert({ projectId, clientEmail, privateKey }) });
}

let dbInstance: Firestore | null = null;

export function getDb(): Firestore {
  if (!dbInstance) dbInstance = getFirestore(loadApp());
  return dbInstance;
}

export interface TourDoc {
  title: string;
  slug: string;
  partner: string;
  partnerProductId: string;
  affiliateUrl: string;
  priceBand: string | null;
  duration: string | null;
  city: string;
  niche: string[];
  imageUrl: string | null;
  firstHandNotes: string | null;
  neighborhood: string | null;
  features: string[];
  isTopPick: boolean;
  groupSize: string | null;
  language: string | null;
  /** Which property/network site this tour belongs to (e.g. "street-food-rome", "amalfi-day-trip").
   *  Used for property-specific search and filtering. Defaults to 'street-food-rome' if not set. */
  propertySlug?: string;
}

export interface PageFaq {
  question: string;
  answer: string;
}

export interface PageDoc {
  slug: string;
  title: string;
  type: 'money' | 'support' | 'about' | 'legal' | 'category' | 'guide';
  bodyHtml: string | null;
  heroImageUrl: string | null;
  authorId: string | null;
  faqs: PageFaq[];
  featuredTourSlugs: string[];
  metaTitle: string;
  metaDesc: string;
  schemaType?: string[];
  updatedAt?: string;
  /** Which property/network site this page belongs to. Used for property-specific search. */
  propertySlug?: string;
}

export interface AuthorDoc {
  name: string;
  bio: string | null;
  avatarUrl: string | null;
}

export interface BlogPostDoc {
  slug: string;
  title: string;
  excerpt: string;
  bodyHtml: string;
  coverImageUrl: string | null;
  publishedAt: string;
  metaTitle: string;
  metaDesc: string;
  categorySlug: string | null;
  landmarkSlug: string | null;
  authorId: string | null;
  /** Which property/network site this blog post belongs to. Used for property-specific search. */
  propertySlug?: string;
}

/**
 * Map tour slugs to their property. COMPLETE for all 13 properties.
 * Updated Phase 3: Added all 12 properties' tours (51 total new tours).
 */
function getPropertySlugForTour(tourSlug: string): string {
  const tourToProperty: Record<string, string> = {
    // ===== STREET FOOD ROME (19 tours) =====
    'trastevere-food-wine-walk': 'street-food-rome',
    'jewish-ghetto-food-tour': 'street-food-rome',
    'testaccio-market-food-tour': 'street-food-rome',
    'pizza-al-taglio-suppli-tasting-tour': 'street-food-rome',
    'trastevere-pizza-craft-beer-crawl': 'street-food-rome',
    'roman-pizza-bianca-bakery-tour': 'street-food-rome',
    'pasta-making-class-trastevere': 'street-food-rome',
    'cacio-e-pepe-carbonara-tasting-walk': 'street-food-rome',
    'roman-pasta-four-ways-dinner': 'street-food-rome',
    'rome-food-wine-tasting': 'street-food-rome',
    'monti-food-wine-evening': 'street-food-rome',
    'roman-gelato-tasting-walk': 'street-food-rome',
    'best-gelaterias-of-rome-tour': 'street-food-rome',
    'gelato-espresso-crawl': 'street-food-rome',
    'suppli-roman-street-snacks-tour': 'street-food-rome',
    'trapizzino-fried-classics-walk': 'street-food-rome',
    'testaccio-fried-food-crawl': 'street-food-rome',
    'aperitivo-evening-experience': 'street-food-rome',
    'prati-neighborhood-food-crawl': 'street-food-rome',

    // ===== AMALFI DAY TRIP (4 tours) =====
    'gyg-amalfi-coast-boat': 'amalfi-day-trip',
    'viator-amalfi-positano-hike': 'amalfi-day-trip',
    'tiqets-amalfi-lemon-grove': 'amalfi-day-trip',
    'gyg-amalfi-full-day': 'amalfi-day-trip',

    // ===== COOKING IN ROME (4 tours) =====
    'gyg-pasta-making-class': 'cooking-in-rome',
    'viator-roman-cooking-course': 'cooking-in-rome',
    'gyg-market-to-table': 'cooking-in-rome',
    'civitatis-pizza-making': 'cooking-in-rome',

    // ===== GOLF CART ROME (3 tours) =====
    'gyg-golf-cart-city-tour': 'golf-cart-rome',
    'viator-golf-cart-rome': 'golf-cart-rome',
    'gyg-golf-cart-sunset': 'golf-cart-rome',

    // ===== NAPLES STREET FOOD (4 tours) =====
    'gyg-naples-street-food': 'naples-street-food',
    'viator-naples-pizza-tour': 'naples-street-food',
    'tiqets-naples-market-food': 'naples-street-food',
    'gyg-naples-cooking-class': 'naples-street-food',

    // ===== POMPEII DAY TRIP (4 tours) =====
    'gyg-pompeii-guided-tour': 'pompeii-day-trip',
    'viator-pompeii-herculaneum': 'pompeii-day-trip',
    'civitatis-pompeii-small-group': 'pompeii-day-trip',
    'gyg-pompeii-vesuvius': 'pompeii-day-trip',

    // ===== PRIVATE VATICAN (8 tours) =====
    'gyg-early-entry-sistine-chapel': 'private-vatican',
    'viator-private-vatican-guide': 'private-vatican',
    'tiqets-skip-the-line-vatican': 'private-vatican',
    'gyg-vatican-dome-combo': 'private-vatican',
    'viator-family-vatican-kid-paced': 'private-vatican',
    'gyg-early-entry-dome-combo': 'private-vatican',
    'tiqets-fast-track-vatican-gardens': 'private-vatican',
    'viator-early-morning-private-vatican': 'private-vatican',

    // ===== ROME PIZZA CLASS (4 tours) =====
    'gyg-pizza-making-class': 'rome-pizza-class',
    'viator-pizza-cooking-rome': 'rome-pizza-class',
    'gyg-pizza-tour-trastevere': 'rome-pizza-class',
    'civitatis-pizza-night-class': 'rome-pizza-class',

    // ===== ROME VESPA (4 tours) =====
    'gyg-vespa-city-tour': 'rome-vespa',
    'viator-vespa-rome-classic': 'rome-vespa',
    'gyg-vespa-food-wine': 'rome-vespa',
    'civitatis-vespa-sunset': 'rome-vespa',

    // ===== TIRAMISU CLASS (3 tours) =====
    'gyg-tiramisu-making-class': 'tiramisu-class',
    'viator-italian-dessert-class': 'tiramisu-class',
    'gyg-tiramisu-gelato-combo': 'tiramisu-class',

    // ===== TIVOLI DAY TRIP (4 tours) =====
    'gyg-tivoli-day-trip': 'tivoli-day-trip',
    'viator-tivoli-estates-tour': 'tivoli-day-trip',
    'civitatis-tivoli-small-group': 'tivoli-day-trip',
    'gyg-tivoli-extended': 'tivoli-day-trip',

    // ===== TUSCANY DAY TRIP (4 tours) =====
    'gyg-tuscany-day-trip': 'tuscany-day-trip',
    'viator-tuscany-wine-tour': 'tuscany-day-trip',
    'civitatis-tuscany-countryside': 'tuscany-day-trip',
    'gyg-tuscany-cooking': 'tuscany-day-trip',

    // ===== UNDERGROUND COLOSSEUM (5 tours) =====
    'gyg-colosseum-underground': 'underground-colosseum',
    'viator-colosseum-forum-palatine': 'underground-colosseum',
    'tiqets-colosseum-arena': 'underground-colosseum',
    'gyg-colosseum-evening': 'underground-colosseum',
    'civitatis-underground-secrets': 'underground-colosseum',

    // Cooking in Rome
    // 'cooking-*': 'cooking-in-rome',

    // Rome Pizza Class
    // 'pizza-class-*': 'rome-pizza-class',

    // Tiramisu Class
    // 'tiramisu-*': 'tiramisu-class',

    // Naples Street Food
    // 'naples-*': 'naples-street-food',

    // Tivoli Day Trip
    // 'tivoli-*': 'tivoli-day-trip',

    // Underground Colosseum
    // 'underground-*': 'underground-colosseum',
  };

  return tourToProperty[tourSlug] || 'street-food-rome';
}

function normalizeTour(data: FirebaseFirestore.DocumentData): TourDoc {
  return {
    neighborhood: null,
    features: Array.isArray(data.features) ? data.features : [],
    isTopPick: data.isTopPick === true,
    groupSize: null,
    language: null,
    propertySlug: getPropertySlugForTour(data.slug || ''),
    ...data,
  } as unknown as TourDoc;
}

function normalizeBlogPost(data: FirebaseFirestore.DocumentData): BlogPostDoc {
  return {
    categorySlug: null,
    landmarkSlug: null,
    authorId: null,
    propertySlug: data.propertySlug || 'street-food-rome',
    ...data
  } as BlogPostDoc;
}

function normalizePageDoc(data: FirebaseFirestore.DocumentData): PageDoc {
  return {
    propertySlug: data.propertySlug || 'street-food-rome',
    ...data
  } as PageDoc;
}

export const getAllTours = unstable_cache(
  async (): Promise<TourDoc[]> => {
    const snap = await getDb().collection('tours').get();
    return snap.docs.map((doc) => normalizeTour(doc.data()));
  },
  ['tours:all'],
  { tags: ['tours'], revalidate: 3600 },
);

export const getTourBySlug = unstable_cache(
  async (slug: string): Promise<TourDoc | null> => {
    const snap = await getDb().collection('tours').doc(slug).get();
    return snap.exists ? normalizeTour(snap.data()!) : null;
  },
  ['tours:by-slug'],
  { tags: ['tours'], revalidate: 3600 },
);

export const getPageDoc = unstable_cache(
  async (slug: string): Promise<PageDoc | null> => {
    const snap = await getDb().collection('sites').doc(SITE_DOMAIN).collection('pages').doc(slug).get();
    return snap.exists ? normalizePageDoc(snap.data()!) : null;
  },
  ['pages:by-slug'],
  { tags: ['pages'], revalidate: 3600 },
);

export const listPageDocs = unstable_cache(
  async (): Promise<PageDoc[]> => {
    const snap = await getDb().collection('sites').doc(SITE_DOMAIN).collection('pages').get();
    return snap.docs.map((doc) => normalizePageDoc(doc.data()));
  },
  ['pages:all'],
  { tags: ['pages'], revalidate: 3600 },
);

export const getAuthor = unstable_cache(
  async (id: string): Promise<AuthorDoc | null> => {
    const snap = await getDb().collection('authors').doc(id).get();
    return snap.exists ? (snap.data() as AuthorDoc) : null;
  },
  ['authors:by-id'],
  { tags: ['authors'], revalidate: 3600 },
);

export const getAllBlogPosts = unstable_cache(
  async (): Promise<BlogPostDoc[]> => {
    const snap = await getDb().collection('blogPosts').orderBy('publishedAt', 'desc').get();
    return snap.docs.map((doc) => normalizeBlogPost(doc.data()));
  },
  ['blog-posts:all'],
  { tags: ['blog-posts'], revalidate: 3600 },
);

export const getBlogPostBySlug = unstable_cache(
  async (slug: string): Promise<BlogPostDoc | null> => {
    const snap = await getDb().collection('blogPosts').doc(slug).get();
    return snap.exists ? normalizeBlogPost(snap.data()!) : null;
  },
  ['blog-posts:by-slug'],
  { tags: ['blog-posts'], revalidate: 3600 },
);
