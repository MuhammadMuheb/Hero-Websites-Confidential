#!/usr/bin/env node
const admin = require('firebase-admin');

const projectId = process.env.FIREBASE_PROJECT_ID;
const clientEmail = process.env.FIREBASE_CLIENT_EMAIL;
const privateKey = process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n');

if (!projectId || !clientEmail || !privateKey) {
  console.error('❌ Missing Firebase credentials!');
  process.exit(1);
}

admin.initializeApp({
  credential: admin.credential.cert({
    projectId,
    clientEmail,
    privateKey,
  }),
});

const db = admin.firestore();

const tourToProperty = {
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
};

async function updateTours() {
  console.log('\n🚀 Updating TOURS collection...');
  const toursSnap = await db.collection('tours').get();
  let updated = 0;
  let skipped = 0;
  let batch = db.batch();
  let batchCount = 0;

  for (const doc of toursSnap.docs) {
    const data = doc.data();
    const propertySlug = tourToProperty[data.slug] || 'street-food-rome';

    if (!data.propertySlug) {
      batch.update(doc.ref, { propertySlug });
      updated++;
      batchCount++;

      if (batchCount >= 100) {
        await batch.commit();
        batch = db.batch();
        batchCount = 0;
      }

      console.log(`  ✓ ${data.slug} → ${propertySlug}`);
    } else {
      skipped++;
    }
  }

  if (batchCount > 0) {
    await batch.commit();
  }

  console.log(`✅ Tours: ${updated} updated, ${skipped} already had propertySlug\n`);
}

async function updateBlogPosts() {
  console.log('🚀 Updating BLOG POSTS collection...');
  const postsSnap = await db.collection('blogPosts').get();
  let updated = 0;
  let skipped = 0;
  let batch = db.batch();
  let batchCount = 0;

  for (const doc of postsSnap.docs) {
    const data = doc.data();

    if (!data.propertySlug) {
      batch.update(doc.ref, { propertySlug: 'street-food-rome' });
      updated++;
      batchCount++;

      if (batchCount >= 100) {
        await batch.commit();
        batch = db.batch();
        batchCount = 0;
      }

      console.log(`  ✓ ${data.slug}`);
    } else {
      skipped++;
    }
  }

  if (batchCount > 0) {
    await batch.commit();
  }

  console.log(`✅ Blog Posts: ${updated} updated, ${skipped} already had propertySlug\n`);
}

async function updatePages() {
  console.log('🚀 Updating PAGES collection...');
  const pagesSnap = await db
    .collection('sites')
    .doc('streetfoodrome.com')
    .collection('pages')
    .get();

  let updated = 0;
  let skipped = 0;
  let batch = db.batch();
  let batchCount = 0;

  for (const doc of pagesSnap.docs) {
    const data = doc.data();

    if (!data.propertySlug) {
      batch.update(doc.ref, { propertySlug: 'street-food-rome' });
      updated++;
      batchCount++;

      if (batchCount >= 100) {
        await batch.commit();
        batch = db.batch();
        batchCount = 0;
      }

      console.log(`  ✓ ${data.slug}`);
    } else {
      skipped++;
    }
  }

  if (batchCount > 0) {
    await batch.commit();
  }

  console.log(`✅ Pages: ${updated} updated, ${skipped} already had propertySlug\n`);
}

async function main() {
  console.log('\n═══════════════════════════════════════════');
  console.log('  PHASE 2: FIRESTORE BULK UPDATE');
  console.log('═══════════════════════════════════════════');

  try {
    await updateTours();
    await updateBlogPosts();
    await updatePages();

    console.log('═══════════════════════════════════════════');
    console.log('  ✅ PHASE 2 COMPLETE!');
    console.log('  All documents updated successfully!');
    console.log('═══════════════════════════════════════════\n');

    process.exit(0);
  } catch (error) {
    console.error('❌ Error:', error);
    process.exit(1);
  }
}

main();