# PHASE 2 - RUN THIS NOW! ⚡

**2 Minutes Max. Everything Automated.**

---

## STEP 1: Set Environment Variables

Tum ke repo folder mein, ये command chalo:

```bash
export FIREBASE_PROJECT_ID="street-food-rome"
export FIREBASE_CLIENT_EMAIL="your-email@project.iam.gserviceaccount.com"
export FIREBASE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\n...\n-----END PRIVATE KEY-----"
```

**Kahan se get karein?**
- Firebase Console → Project Settings → Service Accounts
- "Generate new private key" pe click karo
- JSON file download hoga - usme se values copy karo

---

## STEP 2: Install Firebase Admin

```bash
npm install firebase-admin
```

---

## STEP 3: Run the Script

```bash
node update-firestore-bulk.js
```

**Output:**
```
═══════════════════════════════════════════
  PHASE 2: FIRESTORE BULK UPDATE
═══════════════════════════════════════════

🚀 Updating TOURS collection...
  ✓ trastevere-food-wine-walk → street-food-rome
  ✓ jewish-ghetto-food-tour → street-food-rome
  ... (19 tours total)

✅ Tours: 19 updated, 0 already had propertySlug

🚀 Updating BLOG POSTS collection...
  ✓ best-pizza-rome
  ✓ ... (all blog posts)

✅ Blog Posts: X updated, Y already had propertySlug

🚀 Updating PAGES collection...
  ✓ money
  ✓ support
  ... (all pages)

✅ Pages: X updated, Y already had propertySlug

═══════════════════════════════════════════
  ✅ PHASE 2 COMPLETE!
  All documents updated successfully!
═══════════════════════════════════════════
```

---

## STEP 4: Test

```bash
npm run build
npm run dev
```

Phir jao **any property** pe → **search** karo → **Results dikh jayenge!** ✅

---

## Kya Hoga?

✅ **19 tours** - propertySlug add
✅ **All blog posts** - propertySlug add  
✅ **All pages** - propertySlug add
✅ **Search** - काम करेगा **सब 13 properties** पर!

---

**Done! 🎉**

اب تمام **13 websites** پر search کام کرے گی!
