import { getAllTours, getAllBlogPosts, listPageDocs } from '@/lib/firestore';
import { NETWORK_SITES } from '@/lib/tours';
import { NextRequest, NextResponse } from 'next/server';

interface SearchResult {
  id: string;
  type: 'tour' | 'blog' | 'page' | 'property';
  title: string;
  description: string;
  url: string;
  property: string;
  propertySlug: string;
  relevanceScore: number;
}

function normalizeQuery(query: string): string {
  return query.toLowerCase().trim();
}

function calculateRelevance(query: string, title: string, description: string): number {
  const normalizedQuery = normalizeQuery(query);
  const normalizedTitle = normalizeQuery(title);
  const normalizedDesc = normalizeQuery(description);

  let score = 0;

  // Exact match in title = highest priority
  if (normalizedTitle === normalizedQuery) score += 100;
  // Title starts with query
  else if (normalizedTitle.startsWith(normalizedQuery)) score += 80;
  // Title contains query
  else if (normalizedTitle.includes(normalizedQuery)) score += 60;
  // Description contains query
  else if (normalizedDesc.includes(normalizedQuery)) score += 40;

  // Boost for single-word matches
  const queryWords = normalizedQuery.split(/\s+/);
  const titleWords = normalizedTitle.split(/\s+/);
  const matchedWords = queryWords.filter((w) => titleWords.some((tw) => tw.includes(w)));
  score += matchedWords.length * 15;

  return score;
}

async function searchTours(query: string): Promise<SearchResult[]> {
  // Tours don't have detail pages in the site structure - only listing pages exist.
  // Return empty array to avoid 404 errors from broken URLs.
  // TODO: Either create individual tour detail pages or link to tours listing page.
  return [];
}

async function searchBlogPosts(query: string): Promise<SearchResult[]> {
  try {
    const posts = await getAllBlogPosts();
    return posts
      .map((post) => {
        const score = calculateRelevance(query, post.title, post.excerpt);
        const propertySlug = post.propertySlug || 'street-food-rome';
        const property = NETWORK_SITES.find((s) => s.slug === propertySlug);
        return {
          id: post.slug,
          type: 'blog' as const,
          title: post.title,
          description: post.excerpt || '',
          url: `/${propertySlug}/blog/${post.slug}`,
          property: property?.name || 'Street Food Rome',
          propertySlug: propertySlug,
          relevanceScore: score,
        };
      })
      .filter((result) => result.relevanceScore > 0)
      .sort((a, b) => b.relevanceScore - a.relevanceScore);
  } catch (error) {
    console.error('Error searching blog posts:', error);
    return [];
  }
}

async function searchPages(query: string): Promise<SearchResult[]> {
  try {
    const pages = await listPageDocs();
    return pages
      .map((page) => {
        const score = calculateRelevance(query, page.title, page.metaDesc);
        const propertySlug = page.propertySlug || 'street-food-rome';
        const property = NETWORK_SITES.find((s) => s.slug === propertySlug);
        const urlSegment = page.slug === 'home' ? '' : `/${page.slug}`;
        const url = propertySlug === 'street-food-rome' ? urlSegment : `/${propertySlug}${urlSegment}`;
        return {
          id: page.slug,
          type: 'page' as const,
          title: page.title,
          description: page.metaDesc || '',
          url: url,
          property: property?.name || 'Street Food Rome',
          propertySlug: propertySlug,
          relevanceScore: score,
        };
      })
      .filter((result) => result.relevanceScore > 0)
      .sort((a, b) => b.relevanceScore - a.relevanceScore);
  } catch (error) {
    console.error('Error searching pages:', error);
    return [];
  }
}

function searchProperties(query: string): SearchResult[] {
  const normalizedQuery = normalizeQuery(query);

  return NETWORK_SITES.map((property) => {
    const score = calculateRelevance(normalizedQuery, property.name, property.name);
    return {
      id: property.slug,
      type: 'property' as const,
      title: property.name,
      description: `Explore ${property.name}`,
      url: `/${property.slug}`,
      property: property.name,
      propertySlug: property.slug,
      relevanceScore: score,
    };
  })
    .filter((result) => result.relevanceScore > 0)
    .sort((a, b) => b.relevanceScore - a.relevanceScore);
}

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const query = searchParams.get('q')?.trim();
  const propertySlug = searchParams.get('property')?.trim();

  if (!query || query.length < 2) {
    return NextResponse.json({ results: [], query: '', property: propertySlug || null });
  }

  try {
    // Search across all content types in parallel
    const [tours, blogs, pages, properties] = await Promise.all([
      searchTours(query),
      searchBlogPosts(query),
      searchPages(query),
      Promise.resolve(searchProperties(query)),
    ]);

    // Filter by property - always filter non-property results by propertySlug
    let allResults = [...tours, ...blogs, ...pages, ...properties];
    if (propertySlug) {
      allResults = allResults.filter((r) => {
        if (r.type === 'property') return true;
        return r.propertySlug === propertySlug;
      });
    }

    // Sort by relevance, limit to top 20
    const results = allResults
      .sort((a, b) => b.relevanceScore - a.relevanceScore)
      .slice(0, 20);

    // Get property name for display
    const propertyName = propertySlug
      ? NETWORK_SITES.find((s) => s.slug === propertySlug)?.name || 'Search Results'
      : 'Street Food Rome';

    return NextResponse.json({
      results,
      query,
      total: results.length,
      property: propertySlug || 'street-food-rome',
      propertyName,
    });
  } catch (error) {
    console.error('Search error:', error);
    return NextResponse.json(
      { error: 'Search failed', results: [], query, property: propertySlug || null },
      { status: 500 }
    );
  }
}
