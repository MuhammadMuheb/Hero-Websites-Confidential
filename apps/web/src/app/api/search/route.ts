import { getAllTours, getAllBlogPosts, listPageDocs, type TourDoc, type BlogPostDoc, type PageDoc } from '@/lib/firestore';
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

function calculateRelevance(query: string, title: string, description: string, exact: boolean): number {
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
  try {
    const tours = await getAllTours();
    return tours
      .map((tour) => {
        const score = calculateRelevance(query, tour.title, tour.niche?.join(', ') || '', false);
        return {
          id: tour.slug,
          type: 'tour' as const,
          title: tour.title,
          description: tour.firstHandNotes || tour.niche?.join(', ') || '',
          url: `/tours/${tour.slug}`,
          property: 'Street Food Rome',
          propertySlug: 'street-food-rome',
          relevanceScore: score,
        };
      })
      .filter((result) => result.relevanceScore > 0)
      .sort((a, b) => b.relevanceScore - a.relevanceScore);
  } catch (error) {
    console.error('Error searching tours:', error);
    return [];
  }
}

async function searchBlogPosts(query: string): Promise<SearchResult[]> {
  try {
    const posts = await getAllBlogPosts();
    return posts
      .map((post) => {
        const score = calculateRelevance(query, post.title, post.excerpt, false);
        return {
          id: post.slug,
          type: 'blog' as const,
          title: post.title,
          description: post.excerpt || '',
          url: `/blog/${post.slug}`,
          property: 'Street Food Rome',
          propertySlug: 'street-food-rome',
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
        const score = calculateRelevance(query, page.title, page.metaDesc, false);
        const urlSegment = page.slug === 'home' ? '' : `/${page.slug}`;
        return {
          id: page.slug,
          type: 'page' as const,
          title: page.title,
          description: page.metaDesc || '',
          url: urlSegment,
          property: 'Street Food Rome',
          propertySlug: 'street-food-rome',
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
    const score = calculateRelevance(normalizedQuery, property.name, property.name, false);
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

  if (!query || query.length < 2) {
    return NextResponse.json({ results: [], query: '' });
  }

  try {
    // Search across all content types in parallel
    const [tours, blogs, pages, properties] = await Promise.all([
      searchTours(query),
      searchBlogPosts(query),
      searchPages(query),
      Promise.resolve(searchProperties(query)),
    ]);

    // Combine and sort by relevance, limiting to top 20 results
    const allResults = [...tours, ...blogs, ...pages, ...properties]
      .sort((a, b) => b.relevanceScore - a.relevanceScore)
      .slice(0, 20);

    return NextResponse.json({
      results: allResults,
      query,
      total: allResults.length,
    });
  } catch (error) {
    console.error('Search error:', error);
    return NextResponse.json(
      { error: 'Search failed', results: [], query },
      { status: 500 }
    );
  }
}
