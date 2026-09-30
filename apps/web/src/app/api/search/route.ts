import { getAllTours, getAllBlogPosts, listPageDocs } from '@/lib/firestore';
import { tourHref } from '@/lib/tours';
import { NextRequest, NextResponse } from 'next/server';

interface SearchResult {
  id: string;
  type: 'tour' | 'blog' | 'page';
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

async function searchTours(query: string): Promise<SearchResult[]> {
  try {
    const tours = await getAllTours();
    return tours
      .filter((tour) => (tour.propertySlug || 'street-food-rome') === 'street-food-rome')
      .map((tour) => {
        const score = calculateRelevance(query, tour.title, tour.niche?.join(', ') || '');
        return {
          id: tour.slug,
          type: 'tour' as const,
          title: tour.title,
          description: tour.firstHandNotes || tour.niche?.join(', ') || '',
          url: tourHref(tour.slug),
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
      .filter((post) => (post.propertySlug || 'street-food-rome') === 'street-food-rome')
      .map((post) => {
        const score = calculateRelevance(query, post.title, post.excerpt);
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
    const pageRoutes: Record<string, string> = {
      'about': '/about',
      'contact': '/contact',
      'privacy': '/privacy',
      'terms': '/terms',
      'affiliate-disclosure': '/affiliate-disclosure',
      'cookie-policy': '/cookie-policy',
      'faq': '/faq',
      'guides': '/guides',
    };

    return pages
      .filter((page) => (page.propertySlug || 'street-food-rome') === 'street-food-rome')
      .map((page) => {
        const score = calculateRelevance(query, page.title, page.metaDesc);
        return {
          id: page.slug,
          type: 'page' as const,
          title: page.title,
          description: page.metaDesc || '',
          url: pageRoutes[page.slug] || `/${page.slug}`,
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

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const query = searchParams.get('q')?.trim();

  if (!query || query.length < 2) {
    return NextResponse.json({ results: [], query: '', property: 'street-food-rome' });
  }

  try {
    const [tours, blogs, pages] = await Promise.all([
      searchTours(query),
      searchBlogPosts(query),
      searchPages(query),
    ]);

    const results = [...tours, ...blogs, ...pages]
      .sort((a, b) => b.relevanceScore - a.relevanceScore)
      .slice(0, 20);

    return NextResponse.json({
      results,
      query,
      total: results.length,
      property: 'street-food-rome',
      propertyName: 'Street Food Rome',
    });
  } catch (error) {
    console.error('Search error:', error);
    return NextResponse.json(
      { error: 'Search failed', results: [], query, property: 'street-food-rome' },
      { status: 500 }
    );
  }
}
