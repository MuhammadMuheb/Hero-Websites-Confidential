# Street Food Rome - Filter Redesign Blueprint
**Date:** 30 Sept 2026  
**Status:** Ready for Development

---

## 📋 PROJECT OVERVIEW

Rome Food Tours website ka Category aur Area filter section completely redesign karna hai. Current layout mein glitch hai aur UX theek nahi hai. Naya design carousel/slider style hoga - jaise navbar mein hota hai.

---

## 🐛 CURRENT PROBLEMS (Fix Karne Hain)

### Problem 1: Category Buttons Disappear (CRITICAL BUG)
- Jab user "Pizza" select kare aur phir "Monti" area par click kare
- Expected: Monti ke Pizza tours dikhne chahiye + Pizza button visible rahe
- Current: Pizza button UP se gayab ho jata hai ❌
- **Fix:** Category selection ko persist rakhna chahiye, buttons kum se kam visible rahen

### Problem 2: Category Selection Nahi Reh Rha
- User "All Tours" select kare → Monti area click kare → sab products aa rhe (Correct)
- User "Pasta" select kare → Monti area click kare → Monti ke Pasta aa rahe (Correct)
- BUT: Jab area change kare toh "Pasta" selection LOST ho jata hai
- **Fix:** Selected category ko memory mein rakhna - area change se persist rahe

### Problem 3: Layout Bilkul Bura Lag Rha
- Category aur Area dono buttons ek-ek row mein vertical stack ho rahe hain
- Bohot cluttered lag rha hai, space waste ho rha hai
- **Fix:** Horizontal scrollable carousel/slider style lagana

### Problem 4: Animations Bakwas Hain
- Jab page scroll hote ho to sudden animations aa rhe hain
- Page jump kar rha hai
- Unnecessary smooth animations without purpose
- **Fix:** Sirf lightweight, purpose-based animations - no page jumps

---

## ✅ REQUIREMENTS (Naya Design)

### 1. Filter Structure - TWO SECTIONS

```
┌────────────────────────────────────────────────────┐
│ CATEGORY SECTION (Horizontal Scrollable)           │
│ [All] [Pizza] [Pasta] [Beer & Wine] [Gelato]      │
│       [Street Food Classics] ...                    │
│                                                    │
│ AREA SECTION (Horizontal Scrollable)              │
│ [All] [Trastevere*] [Testaccio] [Jewish Ghetto]  │
│       [Campo de'Fiori] [Monti] [Prati] ...        │
│                                                    │
│ CITY SECTION (NEW - Horizontal Scrollable)        │
│ [All Cities] [Rome] [Vatican] [Trastevere City]   │
│       [Historical Center] ...                      │
└────────────────────────────────────────────────────┘
```

### 2. Filter Behavior

**Selection Logic:**
- Default: "All" selected in both Category aur Area
- User Category select kare → usske ek tag/button active ho jaye (highlight color)
- User Area select kare → usska bhi separate highlight ho
- City select kare → City bhi highlight ho

**State Management:**
- Jab category "Pizza" select ho aur user Area "Monti" par jaaye
  - **SHOW:** Monti ke Pizza tours hi aayenge
  - **SHOW:** Pizza button still visible aur highlighted rahe top mein
  - **SHOW:** Monti button still visible aur highlighted rahe middle mein
- Jab user dusra Area "Testaccio" par click kare
  - **SHOW:** Testaccio ke Pizza tours aa jayenge
  - **SHOW:** Pizza button STILL highlighted rahe (persist)
  - **SHOW:** Testaccio highlight ho

**Filter Combination:**
```
Category Selected + Area Selected = Filtered Results

Examples:
"All" + "Monti" = Monti ke sab products
"Pizza" + "All" = Sab areas ke Pizza
"Pizza" + "Monti" = Monti ke Pizza hi
"Pasta" + "Testaccio" = Testaccio ke Pasta hi
```

### 3. Styling & Layout

**Carousel Style:**
- Jaise navbar mein tab navigation hota hai waise banao
- Left-Right scrollable (swipeable on mobile)
- Category ek line mein, Area ek line mein, City ek line mein
- Har button mein adequate padding (touch targets min 44x44px)
- Selected button: Green background (brand color #2D7C3F) + white text
- Unselected button: Light gray background + dark text

**Spacing:**
- Buttons ke beech consistent gap (8-12px)
- Sections ke beech vertical gap (16-20px)
- Side padding: 16px mobile, 24px desktop

**Typography:**
- Button text: 14px, medium weight
- Clear, readable sans-serif font

### 4. Animations (Minimal, Purpose-Based Only)

✅ **ALLOW:**
- Button click effect: 150ms fade/scale (user ko confirm mile action hua)
- Hover state on desktop: subtle color change
- Selection highlight: smooth color transition (200ms)

❌ **BLOCK (Absolutely NO):**
- Page jumps/shifts when changing filters
- Slide-in animations from sides
- Fade animations when page loads
- Carousel auto-scroll animations
- Random scale/zoom effects

**Rule:** Motion should feel snappy but NOT flashy. User shouldn't feel the animation, sirf confirm ho ki action register hua.

### 5. New Categories to Add

Currently visible categories:
- All Tours
- Pizza Tours
- Pasta Tours
- Beer & Wine Tours
- Gelato Tours
- Street Food Classics

**Add 2-3 More (Check website for existing tours without dedicated buttons):**
- Cooking Classes (agar website pe hai)
- Wine Tasting (agar hai)
- Street Art Tours (agar hai)
- Market Tours (agar hai)

*Developer: Check existing tour data in `apps/web/src/lib/` for tour types that exist but don't have filter buttons.*

### 6. New City Filter (REQUIRED)

Add ek naya "CITY SECTION" below Area section:

**Cities to Include:**
- All Cities (default)
- Rome
- Vatican City
- Trastevere (as city)
- Historical Center (as city)
- Modern Rome
- *Any other major city zones from your data*

**Functionality:**
- Same as Category aur Area filters
- Selection persist rahe
- Filter combination kaam kare

---

## 🔧 Technical Requirements

### 1. State Management
```
selectedCategory: "All" | "Pizza" | "Pasta" | etc
selectedArea: "All" | "Trastevere" | "Monti" | etc
selectedCity: "All" | "Rome" | "Vatican" | etc

Function: filterTours(category, area, city)
  -> Return: Tours matching ALL three filters
```

### 2. Data Structure Check
- Har tour ka category field hai?
- Har tour ka area field hai?
- City field add karna padega existing data mein?

### 3. Persistence
- URL query params mein rakhna (bookmarkable filters)
  - Example: `?category=pasta&area=monti&city=rome`
- Ya localStorage use karna agar user preference save karna hai

### 4. Responsive Behavior
- **Mobile (<480px):** Scrollable carousel, swipe support
- **Tablet (480-768px):** Scrollable carousel with clear scroll indicators
- **Desktop (>768px):** All buttons visible or scrollable with elegant scroll arrows

---

## 📊 Expected Behavior After Fix

### Scenario 1: User opens page
```
✅ Category: [All] selected (highlighted green)
✅ Area: [All] selected (highlighted green)
✅ City: [All Cities] selected (highlighted green)
✅ Cards: All tours visible
```

### Scenario 2: User clicks "Pizza"
```
✅ Category: [Pizza] highlighted green, other gray
✅ Area: [All] still highlighted (no change)
✅ City: [All Cities] still highlighted (no change)
✅ Cards: Only Pizza tours visible
```

### Scenario 3: User clicks "Monti" area
```
✅ Category: [Pizza] STILL highlighted (PERSIST - ye important hai!)
✅ Area: [Monti] highlighted green, others gray
✅ City: [All Cities] still highlighted
✅ Cards: Only Monti ke Pizza tours dikhne chahiye
✅ Button "Pizza" top mein visible rahe, Monti buttons visible rahe
```

### Scenario 4: User clicks different city "Vatican"
```
✅ Category: [Pizza] still highlighted
✅ Area: [Monti] still highlighted
✅ City: [Vatican] highlighted
✅ Cards: Pizza tours in Vatican ke Monti area (agar valid combo ho toh)
```

---

## 📁 Files to Modify (Estimated)

1. **apps/web/src/components/FilterSection.tsx** (or similar)
   - Restructure layout to carousel sections
   - Add City filter section
   - Add missing categories

2. **apps/web/src/hooks/useFilterTours.ts** (or similar)
   - Fix state persistence bug
   - Handle 3-way filter logic (category + area + city)

3. **apps/web/src/lib/tours-data.ts** (or similar)
   - Verify all tours have category, area fields
   - Add city data to tours
   - Ensure data structure is clean

4. **Styling Files** (CSS/Tailwind)
   - Carousel container styles
   - Button active/inactive states
   - Responsive breakpoints
   - Animation/transition rules

---

## ✨ Success Criteria

- ✅ Category selection persist rahe area switching ke baad
- ✅ Category buttons kabhi disappear nahi hon
- ✅ Area, Category, City tino filter alag-alag horizontal sections mein hon
- ✅ Filter combination properly work kare (All 3 filters together)
- ✅ New categories visible hon
- ✅ City filter functional ho
- ✅ Page smooth rahe, no jumps on filter change
- ✅ Animations sirf purposeful hon
- ✅ Mobile responsive ho
- ✅ Code commented ho

---

## 📝 Git Commit Requirements

1. **Main Branch:**
   - Proper commit message (what + why)
   - Detailed description of changes
   - Reference this document

2. **Staging Branch:**
   - Same changes pushed
   - Ready for testing

3. **Commit Format:**
   ```
   Fix: Category filter persistence and redesign layout to carousel style
   
   - Fixed bug where category buttons disappear on area switch
   - Category selection now persists when changing areas
   - Restructured filter layout to horizontal scrollable carousels
   - Added City filter section
   - Implemented 3-way filter logic (category + area + city)
   - Removed unnecessary animations, kept purpose-based transitions
   - Added 2-3 new category options
   - Mobile responsive design with swipe support
   
   Related issue: Filter Redesign Blueprint
   ```

---

## 🎯 Priority Level: HIGH

Yeh ek major UX improvement hai aur glitch fix bhi. Frontend pe kaaam hoga, backend pe minimal change (sirf city data add karna).

---

**Document Created:** 30 Sept 2026  
**For Development Team:** Street Food Rome Frontend Team  
**Status:** Ready to Code
