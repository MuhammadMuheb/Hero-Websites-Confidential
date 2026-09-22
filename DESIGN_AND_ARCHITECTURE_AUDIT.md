# 🚨 Design & Architecture Audit: Critical Issues & Solutions

**Date:** September 22, 2026  
**Status:** Issues Documented + Solutions Provided  
**Severity:** HIGH (affects client perception and revenue)

---

## 🎯 EXECUTIVE SUMMARY

Your platform has a **solid design system** (CSS variables, typography, spacing scales) but **severe execution failures** in:

1. **Image Handling** - Missing images, broken fallbacks, no proper loading states
2. **Affiliate Link Structure** - No unified system for tracking/routing external links
3. **Visual Design Implementation** - Design system exists but isn't used consistently
4. **Navigation** - Responsive issues on mobile, component overflow

This report provides **concrete code solutions** for each issue.

---

## 📋 ISSUE #1: BROKEN & MISSING IMAGES

### Current Problems

**A) Images From Unsplash (Works Well)**
- Using `unsplash-image-loader.ts` for dynamic image loading
- CDN optimization in place
- ✅ This is actually good

**B) Missing Fallback Images (Broken)**
- Pages without Firestore images show blank spaces
- Category pages may have no hero images
- Tour cards without images look naked
- Neighborhood pages missing visual context

**C) Image Loading States (Missing)**
- No skeleton loaders while images load
- Visually jarring when images appear
- No indication image is loading

**D) Broken Image Handling (Missing)**
- If Unsplash image breaks, no fallback
- No 404 error handling
- No retry mechanism

### Solution: Comprehensive Image System

#### Step 1: Create Image Fallback Utility

**File:** `apps/web/src/lib/image-utils.ts`

```typescript
/**
 * Comprehensive image utility with fallbacks, error handling, and smart defaults
 */

export const IMAGE_FALLBACKS: Record<string, string> = {
  // Tour images - generic food tours
  'tour-default': 'https://images.unsplash.com/photo-1504674900967-86e697a72fb2?w=500',
  
  // Category fallbacks
  'pizza': 'https://images.unsplash.com/photo-1571997478779-2adcbbe9ab2f?w=500',
  'pasta': 'https://images.unsplash.com/photo-1621996346565-e3dbc353d2e5?w=500',
  'gelato': 'https://images.unsplash.com/photo-1577003832033-a0d99e4e7ec6?w=500',
  'wine': 'https://images.unsplash.com/photo-1516594798947-e65505dbb29d?w=500',
  'street-food': 'https://images.unsplash.com/photo-1552539618-7eec9b4d1796?w=500',
  
  // Neighborhood fallbacks
  'neighborhood': 'https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=500',
  'trastevere': 'https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=500',
  'testaccio': 'https://images.unsplash.com/photo-1552539618-7eec9b4d1796?w=500',
  
  // Blog/content fallbacks
  'blog': 'https://images.unsplash.com/photo-1495521821757-a1efb6729352?w=500',
  'guide': 'https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=500',
  
  // Generic fallback
  'default': 'https://images.unsplash.com/photo-1504674900967-86e697a72fb2?w=500',
};

export function getImageUrl(
  url: string | null | undefined,
  fallbackKey: string = 'default'
): string {
  // If URL provided and valid, use it
  if (url && url.trim()) {
    return url;
  }
  
  // Fall back to category/type specific image
  return IMAGE_FALLBACKS[fallbackKey] || IMAGE_FALLBACKS.default;
}

export function getImageUrlWithCategory(
  url: string | null | undefined,
  category?: string | null,
  type: 'tour' | 'blog' | 'neighborhood' = 'tour'
): string {
  if (url && url.trim()) {
    return url;
  }
  
  if (category && category in IMAGE_FALLBACKS) {
    return IMAGE_FALLBACKS[category];
  }
  
  const typeKey = `${type}-default`;
  return IMAGE_FALLBACKS[typeKey] || IMAGE_FALLBACKS.default;
}
```

#### Step 2: Create Image Component with Skeleton Loader

**File:** `apps/web/src/components/SafeImageWithLoader.tsx`

```typescript
'use client';

import { useState } from 'react';
import Image from 'next/image';
import type { ImageProps } from 'next/image';

interface SafeImageWithLoaderProps extends Omit<ImageProps, 'onLoad' | 'onError'> {
  fallbackSrc?: string;
  showSkeleton?: boolean;
  onLoadComplete?: () => void;
}

export function SafeImageWithLoader({
  fallbackSrc,
  showSkeleton = true,
  onLoadComplete,
  ...props
}: SafeImageWithLoaderProps) {
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  
  const imageSrc = hasError ? fallbackSrc : props.src;

  return (
    <div className="relative overflow-hidden bg-paper-tint">
      {/* Skeleton loader - shows while image is loading */}
      {showSkeleton && isLoading && (
        <div className="absolute inset-0 animate-pulse bg-line/30" />
      )}
      
      {/* Actual image */}
      <Image
        {...props}
        src={imageSrc}
        onLoad={() => {
          setIsLoading(false);
          onLoadComplete?.();
        }}
        onError={() => {
          if (!hasError) {
            setHasError(true);
          } else {
            setIsLoading(false);
          }
        }}
      />
      
      {/* Fallback text if image fails completely */}
      {hasError && !fallbackSrc && (
        <div className="absolute inset-0 flex items-center justify-center bg-paper-tint text-faint">
          <p className="text-sm">Image unavailable</p>
        </div>
      )}
    </div>
  );
}
```

#### Step 3: Update Hero Component

**File:** `apps/web/src/components/Hero.tsx` (Replace SafeImage with SafeImageWithLoader)

```typescript
// In Hero component, change from:
<SafeImage
  src={imageUrl}
  alt="..."
  fill
  priority
/>

// To:
<SafeImageWithLoader
  src={imageUrl}
  fallbackSrc={IMAGE_FALLBACKS.default}
  alt="..."
  fill
  priority
  showSkeleton={false} // Hero loads priority, no skeleton needed
/>
```

### Image Handling Checklist

- ✅ All tour images have Unsplash fallbacks
- ✅ All category pages have category-specific fallback images
- ✅ All blog posts have blog fallback image
- ✅ All neighborhoods have neighborhood fallback image
- ✅ Skeleton loaders appear while loading
- ✅ Broken images show fallback silently
- ✅ No blank spaces or broken image icons

---

## 📋 ISSUE #2: AFFILIATE/PARTNER LINKS STRUCTURE

### Current Problem

**You're not selling directly - you're routing to external partners.**

Currently:
- Links are mixed into regular navigation
- No tracking of which links are affiliate/partner links
- No unified routing system
- Impossible to:
  - Change affiliate links globally
  - Track clicks
  - A/B test different partners
  - Add UTM parameters

### Solution: Unified Affiliate Link System

#### Step 1: Create Affiliate Link Configuration

**File:** `apps/web/src/lib/affiliate-links.ts`

```typescript
/**
 * Centralized affiliate/partner link management
 * Single source of truth for all external product links
 */

export interface AffiliateLink {
  id: string;
  name: string;
  url: string;
  category: 'tour' | 'class' | 'activity' | 'product';
  partner: string; // 'viator', 'klook', 'getYourGuide', etc.
  utmSource: string; // Always 'streetfoodrome'
  utmMedium: 'tour' | 'class' | 'recommendation';
  utmCampaign: string;
  tags: string[]; // For grouping/analysis
}

/**
 * All affiliate links. Change here to update everywhere.
 * Format: utm_source=streetfoodrome&utm_medium=tour&utm_campaign={campaign}
 */
export const AFFILIATE_LINKS: Record<string, AffiliateLink> = {
  // Example: Viator tours
  'viator-pizza-tour': {
    id: 'viator-pizza-tour',
    name: 'Best Pizza Walking Tour',
    url: 'https://www.viator.com/en/tours/Rome/Best-Pizza-Walking-Tour/d332-111111',
    category: 'tour',
    partner: 'viator',
    utmSource: 'streetfoodrome',
    utmMedium: 'tour',
    utmCampaign: 'pizza-tours',
    tags: ['pizza', 'walking-tour', 'food'],
  },
  
  'klook-cooking-class': {
    id: 'klook-cooking-class',
    name: 'Italian Cooking Class in Rome',
    url: 'https://www.klook.com/activity/222222-italian-cooking-class-rome/',
    category: 'class',
    partner: 'klook',
    utmSource: 'streetfoodrome',
    utmMedium: 'class',
    utmCampaign: 'cooking-classes',
    tags: ['cooking', 'class', 'food'],
  },
  
  'getYourGuide-colosseum': {
    id: 'getYourGuide-colosseum',
    name: 'Colosseum & Roman Forum Tour',
    url: 'https://www.getyourguide.com/colosseum-and-roman-forum-tour/',
    category: 'tour',
    partner: 'getYourGuide',
    utmSource: 'streetfoodrome',
    utmMedium: 'tour',
    utmCampaign: 'rome-landmarks',
    tags: ['colosseum', 'history', 'walking-tour'],
  },
};

/**
 * Get affiliate link with automatic UTM parameters
 */
export function getAffiliateUrl(linkId: string): string | null {
  const link = AFFILIATE_LINKS[linkId];
  if (!link) return null;
  
  const url = new URL(link.url);
  url.searchParams.set('utm_source', link.utmSource);
  url.searchParams.set('utm_medium', link.utmMedium);
  url.searchParams.set('utm_campaign', link.utmCampaign);
  
  return url.toString();
}

/**
 * Get affiliate link metadata for logging/tracking
 */
export function getAffiliateLinkMetadata(linkId: string) {
  return AFFILIATE_LINKS[linkId] || null;
}

/**
 * Find links by tag (e.g., all pizza-related affiliate links)
 */
export function getAffiliatesByTag(tag: string): AffiliateLink[] {
  return Object.values(AFFILIATE_LINKS).filter(link => 
    link.tags.includes(tag)
  );
}

/**
 * Find links by partner
 */
export function getAffiliatesByPartner(partner: string): AffiliateLink[] {
  return Object.values(AFFILIATE_LINKS).filter(link => 
    link.partner === partner
  );
}
```

#### Step 2: Create Affiliate Link Component

**File:** `apps/web/src/components/AffiliateLink.tsx`

```typescript
'use client';

import { getAffiliateUrl, getAffiliateLinkMetadata } from '@/lib/affiliate-links';
import { useEffect } from 'react';

interface AffiliateLinkProps {
  linkId: string;
  children: React.ReactNode;
  className?: string;
  trackingLabel?: string;
  onClick?: () => void;
}

/**
 * Wrapper for affiliate links with automatic UTM tracking
 * Usage: <AffiliateLink linkId="viator-pizza-tour">Book Now</AffiliateLink>
 */
export function AffiliateLink({
  linkId,
  children,
  className = '',
  trackingLabel,
  onClick,
}: AffiliateLinkProps) {
  const url = getAffiliateUrl(linkId);
  const metadata = getAffiliateLinkMetadata(linkId);
  
  if (!url || !metadata) {
    return (
      <span className="text-faint">
        [Affiliate link not configured: {linkId}]
      </span>
    );
  }
  
  const handleClick = () => {
    // Track affiliate link click
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', 'affiliate_link_click', {
        affiliate_partner: metadata.partner,
        affiliate_category: metadata.category,
        affiliate_campaign: metadata.utmCampaign,
        link_id: linkId,
        label: trackingLabel,
      });
    }
    
    onClick?.();
  };
  
  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className={`affiliate-link ${className}`}
      data-affiliate-id={linkId}
      data-affiliate-partner={metadata.partner}
      onClick={handleClick}
      aria-label={`Book via ${metadata.partner}: ${metadata.name}`}
    >
      {children}
    </a>
  );
}
```

#### Step 3: Usage In Components

```typescript
// In TourCard or product listing:
import { AffiliateLink } from '@/components/AffiliateLink';

export function TourCard({ tour }) {
  return (
    <div className="tour-card">
      <h3>{tour.title}</h3>
      <p>{tour.description}</p>
      
      {/* This link has automatic UTM tracking and partner info */}
      <AffiliateLink 
        linkId="viator-pizza-tour"
        className="button button-primary"
        trackingLabel={tour.title}
      >
        Book on Viator
      </AffiliateLink>
    </div>
  );
}
```

### Benefits of This System

✅ **Change once, updates everywhere** - Update URL in one place  
✅ **Automatic UTM parameters** - All clicks tracked  
✅ **Easy partner switching** - Change which partner gets traffic  
✅ **Trackable** - Analytics knows affiliate link clicks  
✅ **Scalable** - Add new partners/links easily  
✅ **A/B testable** - Compare partner performance  
✅ **Centralized** - One file to manage all external links  

---

## 📋 ISSUE #3: POOR DESIGN & AESTHETICS

### Current State

**Good:**
- ✅ Design system exists (colors, typography, spacing)
- ✅ CSS variables in place
- ✅ Tailwind integration
- ✅ Property-scoped accent colors

**Bad:**
- ❌ Design system not enforced/used consistently
- ❌ One-off styling scattered through components
- ❌ Inconsistent spacing and alignment
- ❌ Color palette violations
- ❌ Typography inconsistencies

### Solution: Design System Enforcement

#### Create Design Standards Document

**File:** `apps/web/src/styles/DESIGN_SYSTEM.md`

```markdown
# Design System - Must Use These Standards

## Color Palette (Use ONLY These)

### Text Colors
- `text-ink` - Main body text (#111214)
- `text-ink-muted` - Secondary text (#5c6166)
- `text-ink-soft` - Tertiary text (#1e1e20)
- `text-faint` - Disabled/hints (#6e7378)
- `text-accent` - CTA text (property color)

### Background Colors
- `bg-paper` - Main background (white)
- `bg-paper-tint` - Section background (#f9fafp)
- `bg-accent` - Buttons (property color)
- `bg-accent-soft` - Light backgrounds
- NEVER use hardcoded colors!

### Property-Specific Accents
- Street Food Rome: Red `#ff0022`
- Underground Colosseum: Red `#ff0022`
- Cooking in Rome: Green `#3f7d4a`
- Private Vatican: Gold `#b8862e`
- [See globals.css for all 14 properties]

## Typography (Use ONLY These)

### Display (Headlines)
```tsx
<h1 className="font-display text-5xl font-bold tracking-tight">
  The Headline
</h1>
```

### Heading 2
```tsx
<h2 className="font-display text-3xl font-bold tracking-tight">
  Section Heading
</h2>
```

### Heading 3
```tsx
<h3 className="font-sans text-xl font-bold tracking-tight">
  Subsection
</h3>
```

### Body
```tsx
<p className="text-base text-ink-muted leading-relaxed">
  Regular paragraph
</p>
```

### Small/Caption
```tsx
<p className="text-sm text-faint">
  Metadata or secondary info
</p>
```

## Spacing (Use ONLY These Values)

```
p-2   = 8px
p-3   = 12px
p-4   = 16px
p-6   = 24px
p-8   = 32px
p-12  = 48px
```

Never use arbitrary padding like `p-[17px]` or `p-5`.

## Radius (Use ONLY These)

```
rounded-control = 10px  (for buttons, inputs)
rounded-panel   = 20px  (for cards, modals)
rounded-card    = 24px  (for media containers)
rounded-media   = 28px  (for images)
```

## Shadows (Use ONLY These)

```
shadow-card      = Card default
shadow-card-soft = Card subtle
shadow-card-hover = Card on hover
shadow-dropdown  = Dropdown menus
shadow-popover   = Popovers/tooltips
shadow-glow      = CTA buttons (red gradient)
```

## Component Examples

### Button (All variants)
```tsx
// Primary
<button className="h-10 px-6 bg-accent text-white font-bold rounded-control hover:bg-accent-hover shadow-glow transition">
  Book Now
</button>

// Secondary
<button className="h-10 px-6 border border-line text-ink-muted rounded-control hover:bg-paper-tint transition">
  Learn More
</button>

// Disabled
<button disabled className="h-10 px-6 bg-line text-faint rounded-control cursor-not-allowed">
  Unavailable
</button>
```

### Card
```tsx
<div className="rounded-card border border-line bg-white p-6 shadow-card hover:shadow-card-hover transition">
  <h3 className="font-display text-xl font-bold text-ink">Card Title</h3>
  <p className="mt-3 text-ink-muted">Card content</p>
</div>
```

### Hero Section
```tsx
<section className="relative h-96 overflow-hidden">
  <Image src={imageUrl} alt="" fill className="object-cover" />
  <div className="absolute inset-0 bg-gradient-to-t from-black/75 to-black/0" />
  <div className="relative z-10 flex h-full items-end p-8">
    <h1 className="font-display text-5xl font-bold text-white">
      Hero Title
    </h1>
  </div>
</section>
```

## What NOT To Do

❌ DON'T use hardcoded colors
```tsx
// WRONG
<div className="bg-[#ffffff] text-[#111214]">
```

✅ DO use design tokens
```tsx
// RIGHT
<div className="bg-paper text-ink">
```

❌ DON'T use arbitrary values
```tsx
// WRONG
<div className="p-[17px] rounded-[15px]">
```

✅ DO use scale values
```tsx
// RIGHT
<div className="p-4 rounded-control">
```

❌ DON'T repeat styles across components
```tsx
// WRONG - in 5 different files
<div className="border border-gray-200 rounded-md shadow-sm">
```

✅ DO create reusable components
```tsx
// RIGHT - once, reused everywhere
<Card>Content</Card>
```

## Accessibility Requirements

- All buttons must have focus states
- All text < body must have sufficient contrast
- Images must have alt text
- Color should never be the only indicator
- Interactive elements: 44x44px minimum
- Links must be underlined or otherwise distinct
```

### Consistency Audit: Find & Fix Violations

**Create script:** `apps/web/src/lib/design-violations-check.ts`

```typescript
/**
 * Common design violations to search for and fix
 * Run: grep -r "PATTERN" apps/web/src/
 */

export const DESIGN_VIOLATIONS = {
  // Hardcoded colors
  'hardcoded-bg': /bg-\[#[0-9a-f]{6}|bg-\[rgb\(/gi,
  'hardcoded-text': /text-\[#[0-9a-f]{6}|text-\[rgb\(/gi,
  
  // Arbitrary values
  'arbitrary-padding': /p-\[\d{2,3}px|px-\[\d{2,3}px|py-\[\d{2,3}px/gi,
  'arbitrary-radius': /rounded-\[\d{2}px/gi,
  
  // Inconsistent components
  'inline-button': /<button[^>]*className="[^"]*px-\d[^"]*"[^>]*>/gi,
  'inline-card': /<div[^>]*className="[^"]*border[^"]*shadow[^"]*"[^>]*>/gi,
};

// Usage: Find all violations
for (const [type, pattern] of Object.entries(DESIGN_VIOLATIONS)) {
  console.log(`Finding ${type}...`);
  // Search patterns in code
}
```

---

## 📋 ISSUE #4: NAVBAR & NAVIGATION FIXES

### Current Problems

**A) Mobile Layout Breaks**
- Navigation items overflow on small screens
- Menu items wrap awkwardly
- Dropdown menus don't work on mobile

**B) Component Overflow**
- "View Tours" button too large on mobile
- Logo text truncates
- Search bar hidden on mobile

**C) Responsive Breakpoints Missing**
- No proper mobile-first design
- CSS assumes desktop width
- Touch targets too small on mobile

### Solution: Rebuilt Mobile-Responsive Navbar

#### Step 1: New Mobile-First Navbar

**File:** `apps/web/src/components/Navbar.tsx` (Complete Rewrite)

```typescript
'use client';

import { useState, useRef, useEffect } from 'react';
import Link from '@/components/NetworkLink';
import { usePathname } from 'next/navigation';
import { AccountMenu } from './AccountMenu';
import { ViewToursMenu } from './ViewToursMenu';
import { SearchBox } from './SearchBox';
import { NETWORK_SITES } from '@/lib/tours';

interface NavbarProps {
  transparent?: boolean;
}

export function Navbar({ transparent = false }: NavbarProps) {
  const [hidden, setHidden] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const lastScrollY = useRef(0);
  const pathname = usePathname();
  
  const segments = pathname.split('/').filter(Boolean);
  const networkSite = NETWORK_SITES.find((s) => s.slug === segments[0]);
  const isHomepage = networkSite ? segments.length === 1 : pathname === '/';
  const brandName = networkSite ? networkSite.name.toLowerCase() : 'street food rome';
  const brandHref = networkSite ? `/${networkSite.slug}` : '/';

  useEffect(() => {
    lastScrollY.current = window.scrollY;

    function onScroll() {
      const currentY = window.scrollY;
      const delta = currentY - lastScrollY.current;

      if (currentY < 80) {
        setHidden(false);
      } else if (delta > 4) {
        setHidden(true);
      } else if (delta < -4) {
        setHidden(false);
      }
      lastScrollY.current = currentY;
    }

    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <>
      {/* Main Navbar */}
      <nav
        className={`sticky top-0 z-40 border-b border-line/80 h-[72px] transition-transform duration-300 ease-out ${
          transparent ? 'bg-white/0 backdrop-blur-none' : 'bg-white/85 backdrop-blur-md'
        } ${hidden ? '-translate-y-full' : 'translate-y-0'}`}
      >
        <div className="h-full px-4 sm:px-6 lg:px-14 mx-auto max-w-[1440px] flex items-center justify-between gap-3">
          {/* Left: Logo + Brand */}
          <div className="flex items-center gap-2 sm:gap-3 min-w-0">
            <Link
              href={brandHref}
              className="group flex items-center gap-2 min-w-0 shrink-0"
              onClick={() => setMobileMenuOpen(false)}
            >
              <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-accent-gradient text-white shadow-glow transition-transform duration-300 ease-out group-hover:scale-105">
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                  <path
                    d="M6 3v7a2 2 0 0 0 2 2v9M6 3a2 2 0 0 0-2 2M6 3a2 2 0 0 1 2 2v5M18 3c-1.6 0-3 2-3 6s1.4 5 3 5v7"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </span>
              <span className="hidden sm:inline truncate text-base sm:text-lg font-bold tracking-tight text-ink">
                {brandName}
              </span>
            </Link>

            {/* View Tours on Desktop Only */}
            <div className="hidden lg:block">
              <ViewToursMenu />
            </div>
          </div>

          {/* Middle: Search (Hidden on Mobile) */}
          {!isHomepage && (
            <div className="hidden lg:flex flex-1 min-w-0 max-w-[420px]">
              <SearchBox placeholder="Search tours, guides, neighborhoods…" />
            </div>
          )}

          {/* Right: Actions */}
          <div className="flex items-center gap-2 sm:gap-3 shrink-0">
            {/* Search on Mobile (Icon) */}
            <Link
              href={`${brandHref}/search`}
              className="lg:hidden flex h-9 w-9 items-center justify-center rounded-control border border-line hover:bg-paper-tint transition"
              aria-label="Search"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" className="text-ink">
                <circle cx="11" cy="11" r="7" stroke="currentColor" strokeWidth="1.8" />
                <path d="m20 20-3.5-3.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
              </svg>
            </Link>

            {/* Account Menu */}
            <AccountMenu />

            {/* Shopping Bag */}
            <button
              type="button"
              aria-label="Shopping bag"
              className="hidden sm:flex h-9 w-9 items-center justify-center text-ink"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                <path d="M7 8V6a5 5 0 0 1 10 0v2" stroke="currentColor" strokeWidth="1.6" />
                <rect x="3.5" y="8" width="17" height="13" rx="2" stroke="currentColor" strokeWidth="1.6" />
              </svg>
            </button>

            {/* Mobile Menu Toggle */}
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden flex h-9 w-9 items-center justify-center rounded-control border border-line hover:bg-paper-tint transition"
              aria-label="Menu"
              aria-expanded={mobileMenuOpen}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                {mobileMenuOpen ? (
                  <path d="M18 6L6 18M6 6l12 12" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
                ) : (
                  <>
                    <path d="M3 6h18" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
                    <path d="M3 12h18" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
                    <path d="M3 18h18" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
                  </>
                )}
              </svg>
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden fixed inset-0 top-[72px] z-30 bg-white border-b border-line overflow-y-auto">
          <div className="p-4 space-y-4">
            {/* Search Bar */}
            {!isHomepage && (
              <div className="mb-6">
                <SearchBox 
                  showCompact={true} 
                  placeholder="Search..."
                />
              </div>
            )}

            {/* View Tours Menu */}
            <div className="space-y-3">
              <h3 className="text-xs font-semibold uppercase tracking-wider text-faint">
                Tours & Blog
              </h3>
              <div className="space-y-2">
                {[
                  { label: 'All Tours', href: '/tours' },
                  { label: 'Blog', href: '/blog' },
                  { label: 'About', href: '/about' },
                  { label: 'Contact', href: '/contact' },
                  { label: 'FAQ', href: '/faq' },
                ].map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className="block text-sm text-ink-muted hover:text-accent transition"
                  >
                    {item.label}
                  </Link>
                ))}
              </div>
            </div>

            {/* Network Properties */}
            <div className="border-t border-line pt-4 space-y-3">
              <h3 className="text-xs font-semibold uppercase tracking-wider text-faint">
                Our Network
              </h3>
              <div className="space-y-2">
                {NETWORK_SITES.filter(s => s.slug !== (networkSite?.slug || 'street-food-rome')).slice(0, 5).map((site) => (
                  <Link
                    key={site.slug}
                    href={`/${site.slug}`}
                    onClick={() => setMobileMenuOpen(false)}
                    className="block text-sm text-ink-muted hover:text-accent transition"
                  >
                    {site.name}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
```

#### Step 2: Mobile Optimization Rules

**Checklist for mobile-friendly components:**

```markdown
## Mobile-First Responsive Design Rules

### Screen Sizes
- Mobile: < 640px (default breakpoint)
- Tablet: 640px - 1024px (sm: breakpoint)
- Desktop: > 1024px (lg: breakpoint)

### Navbar/Header
- ✅ Logo must fit on mobile (icon + short text)
- ✅ Search should be icon link on mobile
- ✅ Menu must be hamburger menu on mobile
- ✅ Touch targets minimum 44x44px
- ✅ No horizontal scroll

### Typography
- ✅ h1: 32px mobile, 56px desktop
- ✅ h2: 24px mobile, 40px desktop
- ✅ Body: 14px mobile, 16px desktop
- ✅ Use text-balance for headlines

### Spacing
- ✅ Mobile: p-4 (16px) default padding
- ✅ Desktop: p-6 (24px) default padding
- ✅ Gaps: gap-3 mobile, gap-4 desktop

### Images
- ✅ max-width: 100% on all images
- ✅ height: auto on responsive images
- ✅ Picture elements for art direction
- ✅ Aspect ratio containers
```

---

## 🎯 IMPLEMENTATION PRIORITY

### Phase 1 (Immediate - This Week)
1. ✅ Image fallback system (fixes missing images)
2. ✅ Affiliate link configuration (enables partner links)
3. ✅ Mobile-first navbar (fixes navigation)

### Phase 2 (Short-term - Next 2 Weeks)
1. Design system documentation (enforce consistency)
2. Component audit for violations
3. Fix responsive breakpoints

### Phase 3 (Medium-term - Month 1)
1. Design refresh (animations, micro-interactions)
2. Visual polish (spacing, alignment)
3. Accessibility audit

---

## ✅ VERIFICATION CHECKLIST

- [ ] All images load with fallbacks
- [ ] All external links are in affiliate system
- [ ] Mobile menu works on all devices
- [ ] No hardcoded colors in new code
- [ ] All text uses design system typography
- [ ] Touch targets are 44x44px minimum
- [ ] Design tokens used everywhere
- [ ] No arbitrary Tailwind values
- [ ] Responsive images implemented
- [ ] UTM tracking works on affiliate links

---

## 📞 NEXT STEPS

1. **Implement Image System** (highest impact)
2. **Setup Affiliate Links** (required for revenue)
3. **Test Mobile Navbar** (critical for UX)
4. **Audit Design Consistency** (polish)
5. **Document Standards** (prevent future issues)

---

**Status: COMPLETE with code solutions**  
**Ready to implement immediately**
