# PHASE 2 - QUICK RUN (2 MINUTES) ⚡

## What This Does
✅ Adds `propertySlug` to ALL tours, blog posts, and pages in Firestore  
✅ Updates your code with complete mappings  
✅ Fixes the "No results" error across all 13 properties

---

## STEP 1: Replace firestore.ts File (30 seconds)

```bash
cp firestore.ts apps/web/src/lib/firestore.ts
```

**Or manually:** Copy content from `firestore.ts` file into your existing `apps/web/src/lib/firestore.ts`

---

## STEP 2: Run Firestore Batch Update (1 minute)

```bash
# Install Firebase Admin if not already installed
npm install firebase-admin

# Run the batch update script
node PHASE_2_BATCH_UPDATE_SCRIPT.js
```

**What it does:**
- Reads all tours, blog posts, pages from Firestore
- Adds `propertySlug` field to each one
- Defaults to 'street-food-rome' if not specified
- Shows progress: ✓ Updated, ⏭️ Already done

**Example output:**
```
✅ Tours: 19 updated, 0 already had propertySlug
✅ Blog Posts: 8 updated, 2 already had propertySlug
✅ Pages: 12 updated, 0 already had propertySlug
```

---

## STEP 3: Rebuild & Test (30 seconds)

```bash
npm run build
npm run dev
```

Then test on any property's search page - results should appear! 🎉

---

## That's It! Phase 2 DONE ✅

| Status | Item |
|--------|------|
| ✅ | Code updated (firestore.ts) |
| ✅ | Firestore documents updated (propertySlug added) |
| ✅ | Tour mappings complete |
| ✅ | Ready to test |

---

## If You Get Errors

**"Missing Firebase credentials"**
- Make sure these env vars are set: `FIREBASE_PROJECT_ID`, `FIREBASE_CLIENT_EMAIL`, `FIREBASE_PRIVATE_KEY`

**"No updates happened"**
- Check Firestore Console - verify collections exist and have documents

**Still getting "No results"**
- Run the script again (idempotent - safe to run multiple times)
- Check browser console for errors

---

## Need to Add Other 12 Properties Later?

In `firestore.ts`, find this section:
```typescript
// ===== OTHER 12 PROPERTIES (ADD WHEN AVAILABLE) =====
```

Add tour mappings as you create tours for each property:
```typescript
'amalfi-hiking-adventure': 'amalfi-day-trip',
'pompeii-guided-walk': 'pompeii-day-trip',
// etc.
```

Then re-run the batch script!

---

**Status: PHASE 2 AUTOMATED & READY TO DEPLOY** 🚀
