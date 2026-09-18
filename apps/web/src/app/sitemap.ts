import type { MetadataRoute } from 'next';
import { getAllBlogPosts, listPageDocs, SITE_DOMAIN, type PageDoc } from '@/lib/firestore';

export const dynamic = 'force-dynamic';
import { CATEGORIES, NEIGHBORHOODS, NETWORK_SITES, TOURS } from '@/lib/tours';
import {
  ARENA_FLOOR_PAGE as UC_ARENA_FLOOR_PAGE,
  MONEY_PAGES as UC_MONEY_PAGES,
  SUPPORT_PAGES as UC_SUPPORT_PAGES,
  WORTH_IT_PAGE as UC_WORTH_IT_PAGE,
} from '@/lib/underground-colosseum';

// Only these PageDoc slugs have a live route — Firestore may still hold
// orphaned docs from pages that were removed from the site; keep those out
// of the sitemap. cookie-policy/affiliate-disclosure are included even
// though their PageDoc may not exist yet — the routes themselves are live
// and render sensible fallback content when Firestore has no doc.
const LIVE_PAGE_SLUGS = new Set([
  'home',
  'about',
  'contact',
  'privacy',
  'terms',
  'faq',
  'cookie-policy',
  'affiliate-disclosure',
]);

const STATIC_LEGAL_SLUGS = ['cookie-policy', 'affiliate-disclosure'];

type Tier = { priority: number; changeFrequency: MetadataRoute.Sitemap[number]['changeFrequency'] };

/**
 * Single source of truth for every priority/changeFrequency value used in
 * this sitemap — PageDoc-backed pages AND registry-driven tour/category/
 * neighbourhood/blog URLs all read from this one map, so there's no way for
 * the two schemes to drift apart the way they previously did (tour/hub/blog
 * entries used to hardcode their own numbers despite a comment claiming
 * otherwise).
 */
const PRIORITY_TIERS = {
  // The homepage is a singular page, not a PageDoc "type" tier — it always
  // ranks highest regardless of how its PageDoc happens to be classified.
  home: { priority: 1.0, changeFrequency: 'daily' },
  money: { priority: 1.0, changeFrequency: 'weekly' },
  tour: { priority: 0.9, changeFrequency: 'weekly' },
  toursHub: { priority: 0.8, changeFrequency: 'weekly' },
  category: { priority: 0.7, changeFrequency: 'weekly' },
  guide: { priority: 0.65, changeFrequency: 'monthly' },
  hubIndex: { priority: 0.6, changeFrequency: 'monthly' },
  about: { priority: 0.6, changeFrequency: 'monthly' },
  support: { priority: 0.6, changeFrequency: 'monthly' },
  blogIndex: { priority: 0.6, changeFrequency: 'weekly' },
  blogPost: { priority: 0.5, changeFrequency: 'monthly' },
  legal: { priority: 0.3, changeFrequency: 'yearly' },
} as const satisfies Record<string, Tier>;

function priorityForType(type: PageDoc['type']): Tier {
  switch (type) {
    case 'money':
      return PRIORITY_TIERS.money;
    case 'about':
      return PRIORITY_TIERS.about;
    case 'support':
      return PRIORITY_TIERS.support;
    case 'category':
      return PRIORITY_TIERS.category;
    case 'guide':
      return PRIORITY_TIERS.guide;
    case 'legal':
      return PRIORITY_TIERS.legal;
    default:
      return PRIORITY_TIERS.support;
  }
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [pages, posts] = await Promise.all([listPageDocs(), getAllBlogPosts()]);

  const pagesBySlug = new Map(pages.map((p) => [p.slug, p]));

  const pageEntries = Array.from(LIVE_PAGE_SLUGS).map((slug) => {
    const page = pagesBySlug.get(slug);
    const { priority, changeFrequency } =
      slug === 'home' ? PRIORITY_TIERS.home : priorityForType(page?.type ?? (STATIC_LEGAL_SLUGS.includes(slug) ? 'legal' : 'support'));
    return {
      url: `https://${SITE_DOMAIN}/${slug === 'home' ? '' : slug}`,
      lastModified: page?.updatedAt ?? new Date().toISOString(),
      changeFrequency,
      priority,
    };
  });

  const tourEntries = TOURS.map((tour) => ({
    url: `https://${SITE_DOMAIN}/tours/${tour.seoSlug}`,
    changeFrequency: PRIORITY_TIERS.tour.changeFrequency,
    priority: PRIORITY_TIERS.tour.priority,
  }));

  const toursHubEntry = {
    url: `https://${SITE_DOMAIN}/tours`,
    changeFrequency: PRIORITY_TIERS.toursHub.changeFrequency,
    priority: PRIORITY_TIERS.toursHub.priority,
  };

  const categoryEntries = CATEGORIES.map((c) => ({
    url: `https://${SITE_DOMAIN}/tours/category/${c.slug}`,
    changeFrequency: PRIORITY_TIERS.category.changeFrequency,
    priority: PRIORITY_TIERS.category.priority,
  }));

  const neighborhoodsHubEntry = {
    url: `https://${SITE_DOMAIN}/neighborhoods`,
    changeFrequency: PRIORITY_TIERS.hubIndex.changeFrequency,
    priority: PRIORITY_TIERS.hubIndex.priority,
  };

  const neighborhoodEntries = NEIGHBORHOODS.map((n) => ({
    url: `https://${SITE_DOMAIN}/neighborhoods/${n.slug}`,
    changeFrequency: PRIORITY_TIERS.guide.changeFrequency,
    priority: PRIORITY_TIERS.guide.priority,
  }));

  // Placeholder pages for sister network properties — low priority since
  // content is still being built out. Underground Colosseum is excluded
  // here (see ucEntries below): unlike its 12 not-yet-built siblings, it has
  // 13 real, indexable pages of its own that deserve their actual priority
  // tiers instead of the shared placeholder-root entry.
  const networkEntries = NETWORK_SITES.filter((site) => site.slug !== 'underground-colosseum').map((site) => ({
    url: `https://${SITE_DOMAIN}/${site.slug}`,
    changeFrequency: PRIORITY_TIERS.legal.changeFrequency,
    priority: PRIORITY_TIERS.legal.priority,
  }));

  // Underground Colosseum's own 13 real pages (home, 5 money, 6 support,
  // about, contact) — previously missing from the sitemap entirely even
  // though robots.ts allows crawling all of them (see the design blueprint's
  // "sitemap omission" finding).
  const ucBase = `https://${SITE_DOMAIN}/underground-colosseum`;
  const ucEntries = [
    { url: ucBase, changeFrequency: PRIORITY_TIERS.home.changeFrequency, priority: PRIORITY_TIERS.home.priority },
    ...UC_MONEY_PAGES.map((page) => ({
      url: `${ucBase}${page.href}`,
      changeFrequency: PRIORITY_TIERS.money.changeFrequency,
      priority: PRIORITY_TIERS.money.priority,
    })),
    ...UC_SUPPORT_PAGES.map((page) => ({
      url: `${ucBase}${page.href}`,
      changeFrequency: PRIORITY_TIERS.support.changeFrequency,
      priority: PRIORITY_TIERS.support.priority,
    })),
    {
      url: `${ucBase}${UC_ARENA_FLOOR_PAGE.href}`,
      changeFrequency: PRIORITY_TIERS.support.changeFrequency,
      priority: PRIORITY_TIERS.support.priority,
    },
    {
      url: `${ucBase}${UC_WORTH_IT_PAGE.href}`,
      changeFrequency: PRIORITY_TIERS.support.changeFrequency,
      priority: PRIORITY_TIERS.support.priority,
    },
    { url: `${ucBase}/about`, changeFrequency: PRIORITY_TIERS.about.changeFrequency, priority: PRIORITY_TIERS.about.priority },
    { url: `${ucBase}/contact`, changeFrequency: PRIORITY_TIERS.about.changeFrequency, priority: PRIORITY_TIERS.about.priority },
  ];

  const blogEntries = posts.map((post) => ({
    url: `https://${SITE_DOMAIN}/blog/${post.slug}`,
    lastModified: post.publishedAt,
    changeFrequency: PRIORITY_TIERS.blogPost.changeFrequency,
    priority: PRIORITY_TIERS.blogPost.priority,
  }));

  const BLOG_CATEGORY_SLUGS = ['food-guides', 'neighborhood-guides', 'practical-tips', 'itineraries', 'seasonal-events'];
  const blogCategoryEntries = BLOG_CATEGORY_SLUGS.map((slug) => ({
    url: `https://${SITE_DOMAIN}/blog/category/${slug}`,
    changeFrequency: PRIORITY_TIERS.category.changeFrequency,
    priority: PRIORITY_TIERS.category.priority,
  }));

  const blogIndexEntry = {
    url: `https://${SITE_DOMAIN}/blog`,
    changeFrequency: PRIORITY_TIERS.blogIndex.changeFrequency,
    priority: PRIORITY_TIERS.blogIndex.priority,
  };

  return [
    ...pageEntries,
    toursHubEntry,
    ...tourEntries,
    ...categoryEntries,
    neighborhoodsHubEntry,
    ...neighborhoodEntries,
    ...networkEntries,
    ...ucEntries,
    blogIndexEntry,
    ...blogCategoryEntries,
    ...blogEntries,
  ];
}
