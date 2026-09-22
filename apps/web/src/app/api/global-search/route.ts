import { getAllTours, getAllBlogPosts, listPageDocs } from '@/lib/firestore';
import { NETWORK_SITES } from '@/lib/tours';
import { NextRequest, NextResponse } from 'next/server';

interface GlobalSearchResult {
  id: string;
  type: 'tour' | 'blog' | 'page' | 'property';
  title: string;
  description: string;
  url: string;
  location: string; // Which property/site it's on
  locationSlug: string;
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

  if (normalizedTitle === normalizedQuery) score += 100;
  else if (normalizedTitle.startsWith(normalizedQuery)) score += 80;
  else if (normalizedTitle.includes(normalizedQuery)) score += 60;
  else if (normalizedDesc.includes(normalizedQuery)) score += 40;

  const queryWords = normalizedQuery.split(/\s+/);
  const titleWords = normalizedTitle.split(/\s+/);
  const matchedWords = queryWords.filter((w) => titleWords.some((tw) => tw.includes(w)));
  score += matchedWords.length * 15;

  return score;
}

async function searchAllTours(query: string): Promise<GlobalSearchResult[]> {
  try {
    const tours = await getAllTours();
    return tours
      .map((tour) => {
        const score = calculateRelevance(query, tour.title, tour.niche?.join(', ') || '');
        return {
          id: tour.slug,
          type: 'tour' as const,
          title: tour.title,
          description: tour.firstHandNotes || tour.niche?.join(', ') || '',
          url: `/tours/${tour.slug}`,
          location: 'Street Food Rome',
          locationSlug: 'street-food-rome',
          relevanceScore: score,
        };
      })
      .filter((result) => result.relevanceScore > 0)
      .sort((a, b) => b.relevanceScore - a.relevanceScore)
      .slice(0, 10);
  } catch (error) {
    console.error('Error searching tours:', error);
    return [];
  }
}

async function searchAllBlogPosts(query: string): Promise<GlobalSearchResult[]> {
  try {
    const posts = await getAllBlogPosts();
    return posts
      .map((post) => {
        const score = calculateRelevance(query, post.title, post.excerpt);
        return {
          id: post.slug,
          type: 'blog' as const,
          title: post.title,
          description: post.excerpt || '',
          url: `/blog/${post.slug}`,
          location: 'Street Food Rome',
          locationSlug: 'street-food-rome',
          relevanceScore: score,
        };
      })
      .filter((result) => result.relevanceScore > 0)
      .sort((a, b) => b.relevanceScore - a.relevanceScore)
      .slice(0, 10);
  } catch (error) {
    console.error('Error searching blog posts:', error);
    return [];
  }
}

async function searchAllPages(query: string): Promise<GlobalSearchResult[]> {
  try {
    const pages = await listPageDocs();
    return pages
      .map((page) => {
        const score = calculateRelevance(query, page.title, page.metaDesc);
        const urlSegment = page.slug === 'home' ? '' : `/${page.slug}`;
        return {
          id: page.slug,
          type: 'page' as const,
          title: page.title,
          description: page.metaDesc || '',
          url: urlSegment,
          location: 'Street Food Rome',
          locationSlug: 'street-food-rome',
          relevanceScore: score,
        };
      })
      .filter((result) => result.relevanceScore > 0)
      .sort((a, b) => b.relevanceScore - a.relevanceScore)
      .slice(0, 10);
  } catch (error) {
    console.error('Error searching pages:', error);
    return [];
  }
}

function searchAllProperties(query: string): GlobalSearchResult[] {
  const normalizedQuery = normalizeQuery(query);

  return NETWORK_SITES.map((property) => {
    const score = calculateRelevance(normalizedQuery, property.name, property.name);
    return {
      id: property.slug,
      type: 'property' as const,
      title: property.name,
      description: `Explore ${property.name}`,
      url: `/${property.slug}`,
      location: 'Network',
      locationSlug: property.slug,
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
    return NextResponse.json({ results: [], query: '', totalResults: 0 });
  }

  try {
    const [tours, blogs, pages, properties] = await Promise.all([
      searchAllTours(query),
      searchAllBlogPosts(query),
      searchAllPages(query),
      Promise.resolve(searchAllProperties(query)),
    ]);

    const allResults = [...tours, ...blogs, ...pages, ...properties]
      .sort((a, b) => b.relevanceScore - a.relevanceScore)
      .slice(0, 30);

    const groupedByLocation = allResults.reduce(
      (acc, result) => {
        if (!acc[result.location]) {
          acc[result.location] = [];
        }
        acc[result.location].push(result);
        return acc;
      },
      {} as Record<string, GlobalSearchResult[]>
    );

    return NextResponse.json({
      results: allResults,
      groupedResults: groupedByLocation,
      query,
      totalResults: allResults.length,
    });
  } catch (error) {
    console.error('Global search error:', error);
    return NextResponse.json(
      { error: 'Search failed', results: [], groupedResults: {}, query, totalResults: 0 },
      { status: 500 }
    );
  }
}
