#!/usr/bin/env node
/**
 * Seeds Firestore for the single-site app (Blueprint 2, section 8).
 *
 *   1. properties/{slug} for the 13 network sites, so the admin can manage them.
 *   2. A DRAFT of siteContent/street-food-rome built from apps/web/src/config/sites/street-food-rome.ts,
 *      so editors start from the current home content instead of an empty form.
 *
 * Safe by default:
 *   - Dry run unless --apply is passed. A dry run only READS Firestore.
 *   - Idempotent: an existing property or an existing draft is left alone (--force overwrites).
 *   - The home content is written as a draft only. The live site keeps using its static config until an
 *     editor publishes the page in the admin. `published` is never touched.
 *   - Never reads or writes the `tours` collection.
 *   - Street Food Rome is seeded as coming_soon; pass --sfr-live only when its domain serves the site.
 *     A "live" project with a publicUrl appears in Our Network on every page.
 *
 * Usage (from the repo root, Node 22.18+ so the .ts config can be imported):
 *   node scripts/seed-street-food-rome.mjs                  # dry run
 *   node scripts/seed-street-food-rome.mjs --apply          # write what is missing
 *   node scripts/seed-street-food-rome.mjs --apply --force  # also overwrite existing records
 *   node scripts/seed-street-food-rome.mjs --apply --sfr-live
 *
 * Credentials come from the environment (never from files in the repo):
 *   FIREBASE_PROJECT_ID, FIREBASE_CLIENT_EMAIL, FIREBASE_PRIVATE_KEY
 * e.g.  node --env-file=infra/env/.env scripts/seed-street-food-rome.mjs
 */
import { createRequire } from 'node:module';
import { pathToFileURL } from 'node:url';
import path from 'node:path';

const args = new Set(process.argv.slice(2));
const APPLY = args.has('--apply');
const FORCE = args.has('--force');
const SFR_LIVE = args.has('--sfr-live');
const unknown = [...args].filter((a) => !['--apply', '--force', '--sfr-live'].includes(a));
if (unknown.length) {
  console.error(`Unknown option(s): ${unknown.join(' ')}`);
  process.exit(1);
}

const ROOT = path.resolve(import.meta.dirname, '..');
// firebase-admin is a dependency of apps/web (pnpm does not hoist it to the root).
const require = createRequire(path.join(ROOT, 'apps/web/package.json'));
const { cert, initializeApp } = require('firebase-admin/app');
const { FieldValue, getFirestore } = require('firebase-admin/firestore');

const need = (n) => {
  const v = process.env[n];
  if (!v) {
    console.error(`Missing ${n}.`);
    process.exit(1);
  }
  return v;
};

// ---- data ---------------------------------------------------------------------------------------

const SFR_SLUG = 'street-food-rome';
const SFR_DOMAIN = 'streetfoodrome.com';

const SITES = [
  ['underground-colosseum', 'Underground Colosseum'],
  ['pompeii-day-trip', 'Pompeii Day Trip'],
  ['rome-vespa', 'Rome Vespa'],
  [SFR_SLUG, 'Street Food Rome'],
  ['tuscany-day-trip', 'Tuscany Day Trip'],
  ['private-vatican', 'Private Vatican'],
  ['golf-cart-rome', 'Golf Cart Rome'],
  ['cooking-in-rome', 'Cooking in Rome'],
  ['rome-pizza-class', 'Rome Pizza Class'],
  ['tiramisu-class', 'Tiramisu Class'],
  ['naples-street-food', 'Naples Street Food'],
  ['amalfi-day-trip', 'Amalfi Day Trip'],
  ['tivoli-day-trip', 'Tivoli Day Trip'],
];

const DEFAULT_THEME = { primary: '#1F7A4D', dark: '#14352A', accent: '#C8962B', fontHeading: 'Inter', fontBody: 'Inter' };

function propertyDoc(slug, name) {
  const isSfr = slug === SFR_SLUG;
  return {
    name,
    slug,
    domain: isSfr ? SFR_DOMAIN : '',
    publicUrl: isSfr ? `https://${SFR_DOMAIN}` : '',
    status: isSfr && SFR_LIVE ? 'live' : 'coming_soon',
    contactEmail: isSfr ? `hello@${SFR_DOMAIN}` : `hello@${slug.replace(/-/g, '')}.com`,
    logoUrl: '',
    theme: DEFAULT_THEME,
    defaultLocale: 'en',
    createdBy: 'seed-script',
  };
}

/** Admin "home" data shape (apps/admin HOME_COUNTS: 20 chips, 10 names, 5 categories x 3 tours, 4 choose, 3 places). */
function homeDraftFrom(cfg) {
  const fit = (list, n, blank) => Array.from({ length: n }, (_, i) => list?.[i] ?? blank());
  const data = {
    hero: {
      eyebrow: cfg.heroEyebrow ?? '',
      title: cfg.heroTitle ?? '',
      goldWord: cfg.heroGoldWord ?? '',
      subtitle: cfg.heroSubtitle ?? '',
      image: { src: cfg.heroImage?.src ?? '', alt: cfg.heroImage?.alt ?? '' },
      searchPlaceholder: cfg.searchPlaceholder ?? '',
    },
    chips: fit(cfg.chips, 20, () => ''),
    namesStripLabel: cfg.namesStripLabel ?? '',
    namesStrip: fit(cfg.namesStrip, 10, () => ({ name: '', href: '' })),
    sliderEyebrow: cfg.sliderEyebrow ?? '',
    sliderTitle: cfg.sliderTitle ?? '',
    categoryEyebrow: cfg.categoryEyebrow ?? '',
    categoryTitle: cfg.categoryTitle ?? '',
    categories: fit(cfg.categories, 5, () => ({ name: '', slug: '', description: '', imageUrl: '', tourSlugs: ['', '', ''] })).map((c) => ({
      name: c.name,
      slug: c.slug,
      description: c.description,
      imageUrl: c.imageUrl,
      tourSlugs: fit(c.tourSlugs, 3, () => ''),
    })),
    howWeChooseTitle: cfg.howWeChooseTitle ?? '',
    howWeChoose: fit(cfg.howWeChoose, 4, () => ({ title: '', description: '', icon: '' })).map((h) => ({ title: h.title, description: h.description, icon: h.icon ?? '' })),
    placesTitle: cfg.placesTitle ?? '',
    // The admin form expects 3 tab definitions; the site's static config holds a flat list of 20 places.
    // The two models differ, so the places are NOT converted here. See the note printed by this script.
    placesTabs: fit([], 3, () => ({ name: '', href: '', description: '' })),
    seo: {
      metaTitle: cfg.metaTitle ?? '',
      metaDescription: cfg.metaDescription ?? '',
      keywords: Array.isArray(cfg.keywords) ? cfg.keywords.join(', ') : '',
      ogImage: cfg.ogImage ?? '',
    },
    contactEmail: cfg.contactEmail ?? '',
  };
  return {
    meta: { title: 'Home', metaTitle: data.seo.metaTitle, metaDesc: data.seo.metaDescription },
    layout: ['hero', 'names', 'slider', 'categories', 'choose', 'places', 'seo'].map((id) => ({ id, visible: true })),
    data,
  };
}

// ---- run ----------------------------------------------------------------------------------------

if (!process.features.typescript) {
  console.error(`This script imports a .ts file and needs Node 22.18+ (found ${process.version}).`);
  process.exit(1);
}
const { streetFoodRomeConfig } = await import(pathToFileURL(path.join(ROOT, 'apps/web/src/config/sites/street-food-rome.ts')).href);

const projectId = need('FIREBASE_PROJECT_ID');
initializeApp({
  credential: cert({ projectId, clientEmail: need('FIREBASE_CLIENT_EMAIL'), privateKey: need('FIREBASE_PRIVATE_KEY').replace(/\\n/g, '\n') }),
});
const db = getFirestore();

console.log(`Firebase project: ${projectId}`);
console.log(APPLY ? `MODE: APPLY${FORCE ? ' (force)' : ''}` : 'MODE: dry run (nothing is written; pass --apply to write)');
console.log(`Street Food Rome status: ${SFR_LIVE ? 'live' : 'coming_soon'}\n`);

let created = 0;
let skipped = 0;
let overwritten = 0;

console.log('properties:');
for (const [slug, name] of SITES) {
  const ref = db.collection('properties').doc(slug);
  const snap = await ref.get();
  const doc = propertyDoc(slug, name);
  if (snap.exists && !FORCE) {
    console.log(`  = ${slug.padEnd(24)} exists (status ${snap.data().status}), left alone`);
    skipped++;
    continue;
  }
  console.log(`  ${snap.exists ? '!' : '+'} ${slug.padEnd(24)} ${snap.exists ? 'WOULD OVERWRITE' : 'would create'} as ${doc.status}${doc.publicUrl ? ` -> ${doc.publicUrl}` : ''}`);
  if (snap.exists) overwritten++;
  else created++;
  if (APPLY) {
    if (snap.exists) await ref.set({ ...doc, updatedAt: new Date() }, { merge: true });
    else await ref.create({ ...doc, createdAt: new Date(), updatedAt: new Date() });
  }
}

console.log('\nsiteContent:');
const contentRef = db.collection('siteContent').doc(SFR_SLUG);
const contentSnap = await contentRef.get();
const existing = contentSnap.data();
const hasDraft = Boolean(existing?.draft);
const hasPublished = Boolean(existing?.published);
console.log(`  siteContent/${SFR_SLUG}: ${contentSnap.exists ? `exists (draft: ${hasDraft}, published: ${hasPublished}, status: ${existing?.status ?? '-'})` : 'does not exist'}`);
if (hasDraft && !FORCE) {
  console.log('  = draft already present, left alone');
  skipped++;
} else {
  console.log(`  ${hasDraft ? '!' : '+'} ${hasDraft ? 'WOULD OVERWRITE the draft' : 'would write a draft'} (published fields are never touched)`);
  if (hasDraft) overwritten++;
  else created++;
  if (APPLY) {
    await contentRef.set(
      {
        slug: 'home',
        propertySlug: SFR_SLUG,
        draft: homeDraftFrom(streetFoodRomeConfig),
        status: existing?.status ?? 'draft',
        dirty: true,
        inReview: false,
        version: existing?.version ?? 0,
        updatedBy: 'seed-script',
        updatedAt: new Date(),
      },
      { merge: true },
    );
  }
}

if (APPLY) {
  await db.collection('auditLogs').doc().create({
    ts: new Date(),
    actorUid: 'seed-script',
    actorEmail: 'seed-script',
    actorRole: 'system',
    propertySlug: SFR_SLUG,
    entityType: 'seed',
    entityId: SFR_SLUG,
    action: 'create',
    summary: `Seed: ${created} created, ${overwritten} overwritten, ${skipped} left alone`,
    before: null,
    after: null,
    requestId: 'seed-script',
  });
}

console.log(`\n${APPLY ? 'Done' : 'Dry run finished'}: ${created} ${APPLY ? 'created' : 'to create'}, ${overwritten} ${APPLY ? 'overwritten' : 'to overwrite'}, ${skipped} left alone.`);
console.log('Note: "Places tabs" are left blank in the draft. The admin expects 3 tab definitions, the site config holds 20 places.');
if (!APPLY) console.log('Re-run with --apply to write.');
