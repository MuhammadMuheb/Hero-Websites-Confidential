#!/usr/bin/env node
/**
 * PHASE 3 - ADD ALL TOURS FOR 12 WEBSITES
 * Uploads tours for all 12 properties to Firebase with correct propertySlug
 */

const admin = require('firebase-admin');
const fs = require('fs');
const path = require('path');

let credential;
const keyPath = path.join(__dirname, 'serviceAccountKey.json');

if (fs.existsSync(keyPath)) {
  console.log('📁 Using serviceAccountKey.json');
  const serviceAccount = require(keyPath);
  credential = admin.credential.cert(serviceAccount);
} else {
  const projectId = process.env.FIREBASE_PROJECT_ID;
  const clientEmail = process.env.FIREBASE_CLIENT_EMAIL;
  const privateKey = process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n');

  if (!projectId || !clientEmail || !privateKey) {
    console.error('❌ Missing Firebase credentials!');
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

// All 12 websites with their tour data
const WEBSITES = {
  'amalfi-day-trip': {
    propertySlug: 'amalfi-day-trip',
    tours: [
      { partner: 'GetYourGuide', slug: 'gyg-amalfi-coast-boat', title: 'Amalfi Coast Boat Tour', meta: '4h · small group', price: 45, badge: 'Best Seller' },
      { partner: 'Viator', slug: 'viator-amalfi-positano-hike', title: 'Amalfi to Positano Hiking Tour', meta: '3h · moderate hike', price: 65, badge: 'Adventure' },
      { partner: 'Tiqets', slug: 'tiqets-amalfi-lemon-grove', title: 'Amalfi Lemon Grove Tour', meta: '2h · family-friendly', price: 35, badge: 'Food Tour' },
      { partner: 'GetYourGuide', slug: 'gyg-amalfi-full-day', title: 'Full Day Amalfi Coast Tour', meta: '8h · all-inclusive', price: 89, badge: 'Complete' },
    ]
  },
  'cooking-in-rome': {
    propertySlug: 'cooking-in-rome',
    tours: [
      { partner: 'GetYourGuide', slug: 'gyg-pasta-making-class', title: 'Pasta Making Class in Rome', meta: '2.5h · hands-on', price: 49, badge: 'Most Popular' },
      { partner: 'Viator', slug: 'viator-roman-cooking-course', title: 'Roman Cooking Class', meta: '3h · with lunch', price: 59, badge: 'Best Value' },
      { partner: 'GetYourGuide', slug: 'gyg-market-to-table', title: 'Market to Table Cooking', meta: '4h · local market', price: 69, badge: 'Premium' },
      { partner: 'Civitatis', slug: 'civitatis-pizza-making', title: 'Traditional Pizza Making', meta: '2h · oven-fired', price: 45, badge: 'Food' },
    ]
  },
  'golf-cart-rome': {
    propertySlug: 'golf-cart-rome',
    tours: [
      { partner: 'GetYourGuide', slug: 'gyg-golf-cart-city-tour', title: 'Golf Cart City Tour', meta: '2h · scenic route', price: 55, badge: 'Fun Activity' },
      { partner: 'Viator', slug: 'viator-golf-cart-rome', title: 'Electric Golf Cart Rome', meta: '2.5h · eco-friendly', price: 65, badge: 'Eco-Friendly' },
      { partner: 'GetYourGuide', slug: 'gyg-golf-cart-sunset', title: 'Sunset Golf Cart Tour', meta: '3h · golden hour', price: 75, badge: 'Romantic' },
    ]
  },
  'naples-street-food': {
    propertySlug: 'naples-street-food',
    tours: [
      { partner: 'GetYourGuide', slug: 'gyg-naples-street-food', title: 'Naples Street Food Tour', meta: '2.5h · food walk', price: 42, badge: 'Most Popular' },
      { partner: 'Viator', slug: 'viator-naples-pizza-tour', title: 'Naples Pizza Heritage Tour', meta: '3h · pizza focused', price: 55, badge: 'Food' },
      { partner: 'Tiqets', slug: 'tiqets-naples-market-food', title: 'Napolitan Market Food Tour', meta: '2h · local markets', price: 38, badge: 'Budget' },
      { partner: 'GetYourGuide', slug: 'gyg-naples-cooking-class', title: 'Naples Cooking Class', meta: '4h · hands-on', price: 68, badge: 'Cooking' },
    ]
  },
  'pompeii-day-trip': {
    propertySlug: 'pompeii-day-trip',
    tours: [
      { partner: 'GetYourGuide', slug: 'gyg-pompeii-guided-tour', title: 'Pompeii Guided Tour', meta: '3h · archeological', price: 45, badge: 'Most Popular' },
      { partner: 'Viator', slug: 'viator-pompeii-herculaneum', title: 'Pompeii & Herculaneum Tour', meta: '5h · comprehensive', price: 72, badge: 'Complete' },
      { partner: 'Civitatis', slug: 'civitatis-pompeii-small-group', title: 'Small Group Pompeii Tour', meta: '3.5h · intimate', price: 55, badge: 'Small Group' },
      { partner: 'GetYourGuide', slug: 'gyg-pompeii-vesuvius', title: 'Pompeii & Mount Vesuvius Tour', meta: '6h · volcano included', price: 89, badge: 'Premium' },
    ]
  },
  'private-vatican': {
    propertySlug: 'private-vatican',
    tours: [
      { partner: 'GetYourGuide', slug: 'gyg-early-entry-sistine-chapel', title: 'Early Entry Sistine Chapel & Vatican Museums', meta: '3h · small group', price: 89, badge: 'Best Seller' },
      { partner: 'Viator', slug: 'viator-private-vatican-guide', title: 'Private Vatican Museums & Sistine Chapel Tour', meta: '3h · private guide', price: 115, badge: 'Small Group' },
      { partner: 'Tiqets', slug: 'tiqets-skip-the-line-vatican', title: 'Skip-the-Line Vatican Museums Ticket', meta: 'Self-paced · audio guide', price: 62, badge: 'Best Value' },
      { partner: 'GetYourGuide', slug: 'gyg-vatican-dome-combo', title: 'Vatican Museums + St Peter\'s Dome Combo', meta: '4h · small group', price: 99, badge: null },
      { partner: 'Viator', slug: 'viator-family-vatican-kid-paced', title: 'Family Vatican Tour, Kid-Paced', meta: '2h · family group', price: 79, badge: 'Family Friendly' },
      { partner: 'GetYourGuide', slug: 'gyg-early-entry-dome-combo', title: 'Early Entry Vatican & Dome Combo', meta: '4h 30m · small group', price: 120, badge: 'Most Complete' },
      { partner: 'Tiqets', slug: 'tiqets-fast-track-vatican-gardens', title: 'Fast-Track Vatican Museums + Gardens Ticket', meta: 'Self-paced · audio guide', price: 68, badge: 'Extra Access' },
      { partner: 'Viator', slug: 'viator-early-morning-private-vatican', title: 'Early-Morning Private Vatican & Sistine Chapel', meta: '3h · private guide', price: 118, badge: 'Small Group' },
    ]
  },
  'rome-pizza-class': {
    propertySlug: 'rome-pizza-class',
    tours: [
      { partner: 'GetYourGuide', slug: 'gyg-pizza-making-class', title: 'Pizza Making Class Rome', meta: '3h · hands-on', price: 54, badge: 'Most Popular' },
      { partner: 'Viator', slug: 'viator-pizza-cooking-rome', title: 'Roman Pizza Cooking Experience', meta: '3.5h · with wine', price: 64, badge: 'Premium' },
      { partner: 'GetYourGuide', slug: 'gyg-pizza-tour-trastevere', title: 'Pizza Tour Trastevere', meta: '2.5h · food walk', price: 48, badge: 'Food Tour' },
      { partner: 'Civitatis', slug: 'civitatis-pizza-night-class', title: 'Evening Pizza Cooking Class', meta: '3h · dinner included', price: 75, badge: 'Evening' },
    ]
  },
  'rome-vespa': {
    propertySlug: 'rome-vespa',
    tours: [
      { partner: 'GetYourGuide', slug: 'gyg-vespa-city-tour', title: 'Rome Vespa City Tour', meta: '2h · scenic drive', price: 59, badge: 'Most Popular' },
      { partner: 'Viator', slug: 'viator-vespa-rome-classic', title: 'Classic Vespa Tour Rome', meta: '3h · vintage experience', price: 79, badge: 'Premium' },
      { partner: 'GetYourGuide', slug: 'gyg-vespa-food-wine', title: 'Vespa Food & Wine Tour', meta: '3.5h · culinary', price: 89, badge: 'Gourmet' },
      { partner: 'Civitatis', slug: 'civitatis-vespa-sunset', title: 'Sunset Vespa Ride', meta: '2.5h · golden hour', price: 69, badge: 'Romantic' },
    ]
  },
  'tiramisu-class': {
    propertySlug: 'tiramisu-class',
    tours: [
      { partner: 'GetYourGuide', slug: 'gyg-tiramisu-making-class', title: 'Tiramisu Making Class Rome', meta: '2h · hands-on', price: 45, badge: 'Most Popular' },
      { partner: 'Viator', slug: 'viator-italian-dessert-class', title: 'Italian Dessert Cooking Class', meta: '3h · multiple desserts', price: 54, badge: 'Cooking' },
      { partner: 'GetYourGuide', slug: 'gyg-tiramisu-gelato-combo', title: 'Tiramisu & Gelato Tour', meta: '3h · tastings included', price: 58, badge: 'Food Tour' },
    ]
  },
  'tivoli-day-trip': {
    propertySlug: 'tivoli-day-trip',
    tours: [
      { partner: 'GetYourGuide', slug: 'gyg-tivoli-day-trip', title: 'Tivoli Day Trip from Rome', meta: '5h · both villas', price: 59, badge: 'Most Popular' },
      { partner: 'Viator', slug: 'viator-tivoli-estates-tour', title: 'Tivoli Estates Guided Tour', meta: '5.5h · comprehensive', price: 72, badge: 'Premium' },
      { partner: 'Civitatis', slug: 'civitatis-tivoli-small-group', title: 'Small Group Tivoli Tour', meta: '5h · intimate', price: 65, badge: 'Small Group' },
      { partner: 'GetYourGuide', slug: 'gyg-tivoli-extended', title: 'Extended Tivoli Experience', meta: '6h · gardens included', price: 79, badge: 'Complete' },
    ]
  },
  'tuscany-day-trip': {
    propertySlug: 'tuscany-day-trip',
    tours: [
      { partner: 'GetYourGuide', slug: 'gyg-tuscany-day-trip', title: 'Tuscany Day Trip from Rome', meta: '8h · wine included', price: 89, badge: 'Most Popular' },
      { partner: 'Viator', slug: 'viator-tuscany-wine-tour', title: 'Tuscany Wine Country Tour', meta: '8.5h · vineyard visits', price: 109, badge: 'Premium' },
      { partner: 'Civitatis', slug: 'civitatis-tuscany-countryside', title: 'Tuscany Countryside Tour', meta: '7h · small group', price: 79, badge: 'Scenic' },
      { partner: 'GetYourGuide', slug: 'gyg-tuscany-cooking', title: 'Tuscany Cooking & Wine Day Trip', meta: '8h · hands-on', price: 119, badge: 'Gourmet' },
    ]
  },
  'underground-colosseum': {
    propertySlug: 'underground-colosseum',
    tours: [
      { partner: 'GetYourGuide', slug: 'gyg-colosseum-underground', title: 'Colosseum Underground Tour', meta: '2h · skip-the-line', price: 39, badge: 'Most Popular' },
      { partner: 'Viator', slug: 'viator-colosseum-forum-palatine', title: 'Colosseum, Forum & Palatine Tour', meta: '3.5h · comprehensive', price: 54, badge: 'Complete' },
      { partner: 'Tiqets', slug: 'tiqets-colosseum-arena', title: 'Colosseum Arena Floor Tour', meta: '1.5h · exclusive', price: 35, badge: 'Exclusive' },
      { partner: 'GetYourGuide', slug: 'gyg-colosseum-evening', title: 'Evening Colosseum Tour', meta: '2h · sunset views', price: 49, badge: 'Evening' },
      { partner: 'Civitatis', slug: 'civitatis-underground-secrets', title: 'Underground Secrets Tour', meta: '2h · small group', price: 44, badge: 'Small Group' },
    ]
  },
};

async function addTours() {
  console.log('\n═══════════════════════════════════════════');
  console.log('  PHASE 3: ADD ALL 12 WEBSITES TOURS');
  console.log('═══════════════════════════════════════════\n');

  let totalAdded = 0;
  let totalSkipped = 0;

  for (const [siteKey, siteData] of Object.entries(WEBSITES)) {
    console.log(`🚀 Processing ${siteData.propertySlug}...`);

    for (const tour of siteData.tours) {
      const docId = tour.slug;
      const tourDoc = {
        slug: tour.slug,
        title: tour.title,
        partner: tour.partner,
        meta: tour.meta,
        priceFrom: tour.price,
        badge: tour.badge || null,
        propertySlug: siteData.propertySlug,
        createdAt: admin.firestore.FieldValue.serverTimestamp(),
      };

      const docRef = db.collection('tours').doc(docId);
      const docSnap = await docRef.get();

      if (!docSnap.exists) {
        await docRef.set(tourDoc);
        totalAdded++;
        console.log(`  ✓ ${tour.slug} → ${siteData.propertySlug}`);
      } else {
        totalSkipped++;
      }
    }
    console.log();
  }

  console.log('═══════════════════════════════════════════');
  console.log(`✅ PHASE 3 COMPLETE!`);
  console.log(`Total added: ${totalAdded}`);
  console.log(`Total skipped (already exist): ${totalSkipped}`);
  console.log('═══════════════════════════════════════════\n');
  process.exit(0);
}

addTours().catch((error) => {
  console.error('❌ Error:', error);
  process.exit(1);
});
