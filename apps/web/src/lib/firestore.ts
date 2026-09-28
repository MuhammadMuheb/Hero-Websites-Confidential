/**
 * apps/web/src/lib/firestore.ts — Firebase Admin SDK singleton + typed reads
 * for streetfoodrome.com. Single-site now (no more multi-tenant hostname
 * resolution) — everything queries this one domain's data directly.
 *
 * Credentials come from three env vars (FIREBASE_PROJECT_ID/CLIENT_EMAIL/
 * PRIVATE_KEY), not the service-account JSON file directly: that file is
 * git-ignored and never present in a Vercel deployment bundle, so the same
 * three env vars work identically in local dev and in Vercel's dashboard.
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
  /** Rome neighbourhood this tour is set in (e.g. "trastevere"), for cross-linking with /neighborhoods/{slug}.
   *  Not yet populated on most existing Firestore docs — reads default this to null. */
  neighborhood: string | null;
  /** Real, sourced facts only (e.g. "Free cancellation", "Small group") — TourCard
   *  renders at most 2 as chips, and only when this array is non-empty. Not yet
   *  populated on any existing Firestore doc — reads default this to []. */
  features: string[];
  /** True only when the site's own editorial config genuinely marks this tour
   *  as a top pick — never inferred. Not yet populated — reads default this to false. */
  isTopPick: boolean;
  /** e.g. "Max 12". Not yet populated — reads default this to null. */
  groupSize: string | null;
  /** e.g. "EN, IT". Not yet populated — reads default this to null. */
  language: string | null;
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
  /** One of the 5 blog taxonomy slugs (food-guides, neighborhood-guides, practical-tips,
   *  itineraries, seasonal-events). Not yet populated on existing docs — defaults to null. */
  categorySlug: string | null;
  /** One of the LANDMARKS slugs in lib/tours.ts (e.g. "trevi-fountain"), for
   *  linking a landmark mention on the homepage to a real post about it.
   *  Not yet populated on existing docs — defaults to null. */
  landmarkSlug: string | null;
  /** `authors` collection doc id — for a byline via getAuthor(). Not yet
   *  populated on existing docs — defaults to null. */
  authorId: string | null;
}

function normalizeTour(data: FirebaseFirestore.DocumentData): TourDoc {
  return {
    neighborhood: null,
    features: Array.isArray(data.features) ? data.features : [],
    isTopPick: data.isTopPick === true,
    groupSize: null,
    language: null,
    ...data,
  } as unknown as TourDoc;
}

function normalizeBlogPost(data: FirebaseFirestore.DocumentData): BlogPostDoc {
  return { categorySlug: null, landmarkSlug: null, authorId: null, ...data } as BlogPostDoc;
}

/**
 * Every read below is wrapped in `unstable_cache` (blueprint §13.2.2 — never
 * fetch the full tours/pages/blog list more than once per request/build) and
 * tagged so `/api/revalidate` can invalidate just the affected collection.
 *
 * None of these wrappers catch Firestore errors: a failed read throws,
 * exactly like the underlying `getDb()...get()` calls already did. That's
 * deliberate (blueprint Phase 0 addition #3) — a route that swallowed the
 * error into `[]`/`null` could get that empty result cached as the page for
 * up to an hour under ISR. Letting it throw means a build-time failure fails
 * the build, and a revalidation-time failure is caught by Next's built-in
 * stale-while-error behavior, which keeps serving the last good cached page
 * instead of publishing an empty one.
 */
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
    return snap.exists ? (snap.data() as PageDoc) : null;
  },
  ['pages:by-slug'],
  { tags: ['pages'], revalidate: 3600 },
);

export const listPageDocs = unstable_cache(
  async (): Promise<PageDoc[]> => {
    const snap = await getDb().collection('sites').doc(SITE_DOMAIN).collection('pages').get();
    return snap.docs.map((doc) => doc.data() as PageDoc);
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
