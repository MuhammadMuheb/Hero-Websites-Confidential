/**
 * Firestore reads for the legacy (Street Food Rome) pages. The generic multi-site template reads through
 * lib/tenants.ts and lib/tenant-data.ts instead.
 *
 * Which site a tour belongs to is the stored `propertySlug` on its document; there is no per-site table in code.
 */

import { cert, getApps, initializeApp, type App } from 'firebase-admin/app';
import { getFirestore, type Firestore } from 'firebase-admin/firestore';
import { unstable_cache } from 'next/cache';

/**
 * Which site this deployment serves. Both come from the environment so the same
 * code can serve another site later; the defaults keep Street Food Rome unchanged.
 * `||` (not `??`) so an empty value in a hosting dashboard also falls back.
 */
export const SITE_DOMAIN = process.env.SITE_DOMAIN || 'streetfoodrome.com';
export const PROPERTY_SLUG = process.env.PROPERTY_SLUG || 'street-food-rome';

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

function normalizeTour(data: FirebaseFirestore.DocumentData): TourDoc {
  return {
    neighborhood: null,
    features: Array.isArray(data.features) ? data.features : [],
    isTopPick: data.isTopPick === true,
    groupSize: null,
    language: null,
    propertySlug: PROPERTY_SLUG,
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
