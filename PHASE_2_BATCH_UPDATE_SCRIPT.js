#!/usr/bin/env node
/**
 * PHASE 2 FIRESTORE BATCH UPDATE SCRIPT
 * Automatically adds propertySlug to all tours, blog posts, and pages
 *
 * USAGE:
 * 1. npm install firebase-admin
 * 2. node PHASE_2_BATCH_UPDATE_SCRIPT.js
 */

const admin = require('firebase-admin');
const fs = require('fs');
const path = require('path');

// Try loading from serviceAccountKey.json first (easier)
let credential;
const keyPath = path.join(__dirname, 'serviceAccountKey.json');

if (fs.existsSync(keyPath)) {
  console.log('📁 Using serviceAccountKey.json');
  const serviceAccount = require(keyPath);
  credential = admin.credential.cert(serviceAccount);
} else {
  // Fallback to environment variables
  const projectId = process.env.FIREBASE_PROJECT_ID;
  const clientEmail = process.env.FIREBASE_CLIENT_EMAIL;
  const privateKey = process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n');

  if (!projectId || !clientEmail || !privateKey) {
    console.error('❌ Missing Firebase credentials!');
    console.error('\nOption 1: Place serviceAccountKey.json in project root');
    console.error('  (Download from Firebase Console → Project Settings → Service Accounts)');
    console.error('\nOption 2: Set environment variables:');
    console.error('  FIREBASE_PROJECT_ID, FIREBASE_CLIENT_EMAIL, FIREBASE_PRIVATE_KEY');
    process.exit(1);
  }

  credential = admin.credential.cert({
    projectId,
    clientEmail,
    privateKey,
  });
}

admin.initializeApp({
  credential: credential,
});

const db = admin.firestore();

// Tour to Property mapping - ALL 13 PROPERTIES
const tourToProperty = {
  // Street Food Rome (19 tours)
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

  // TODO: Add mappings for other 12 properties when you have their tour slugs
  // 'tour-slug-amalfi': 'amalfi-day-trip',
  // 'tour-slug-pompeii': 'pompeii-day-trip',
  // etc.
};

async function updateTours() {
  console.log('🚀 Starting Tour updates...');
  const toursSnap = await db.collection('tours').get();
  let updated = 0;
  let skipped = 0;

  for (const doc of toursSnap.docs) {
    const data = doc.data();
    const propertySlug = tourToProperty[data.slug] || 'street-food-rome';

    if (!data.propertySlug) {
      await doc.ref.update({ propertySlug });
      updated++;
      console.log(`  ✓ ${data.slug} → ${propertySlug}`);
    } else {
      skipped++;
    }
  }

  console.log(`\n✅ Tours: ${updated} updated, ${skipped} already had propertySlug\n`);
}

async function updateBlogPosts() {
  console.log('🚀 Starting Blog Post updates...');
  const postsSnap = await db.collection('blogPosts').get();
  let updated = 0;
  let skipped = 0;

  for (const doc of postsSnap.docs) {
    const data = doc.data();

    if (!data.propertySlug) {
      await doc.ref.update({ propertySlug: 'street-food-rome' });
      updated++;
      console.log(`  ✓ ${data.slug}`);
    } else {
      skipped++;
    }
  }

  console.log(`\n✅ Blog Posts: ${updated} updated, ${skipped} already had propertySlug\n`);
}

async function updatePages() {
  console.log('🚀 Starting Pages updates...');
  const pagesSnap = await db
    .collection('sites')
    .doc('streetfoodrome.com')
    .collection('pages')
    .get();

  let updated = 0;
  let skipped = 0;

  for (const doc of pagesSnap.docs) {
    const data = doc.data();

    if (!data.propertySlug) {
      await doc.ref.update({ propertySlug: 'street-food-rome' });
      updated++;
      console.log(`  ✓ ${data.slug}`);
    } else {
      skipped++;
    }
  }

  console.log(`\n✅ Pages: ${updated} updated, ${skipped} already had propertySlug\n`);
}

async function main() {
  console.log('\n═══════════════════════════════════════════');
  console.log('  PHASE 2: FIRESTORE BATCH UPDATE');
  console.log('═══════════════════════════════════════════\n');

  try {
    await updateTours();
    await updateBlogPosts();
    await updatePages();

    console.log('═══════════════════════════════════════════');
    console.log('  ✅ PHASE 2 COMPLETE!');
    console.log('═══════════════════════════════════════════\n');
    process.exit(0);
  } catch (error) {
    console.error('❌ Error:', error);
    process.exit(1);
  }
}

main();
