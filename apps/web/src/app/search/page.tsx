import type { Metadata } from 'next';
import Link from '@/components/NetworkLink';
import { Hero } from '@/components/Hero';
import { Suspense } from 'react';
import { getAllTours, getAllBlogPosts, listPageDocs } from '@/lib/firestore';
import { NETWORK_SITES } from '@/lib/tours';

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

export const metadata: Metadata = {
  title: 'Search Results',
  robots: 'noindex, nofollow',
};

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

async function SearchResults({ query }: { query: string }) {
  if (!query || query.length < 2) {
    return (
      <div className="bg-cream py-20">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-display text-4xl font-bold text-ink mb-4">Enter a search term</h2>
          <p className="text-ink/70">Try searching for a tour, neighborhood, or topic.</p>
        </div>
      </div>
    );
  }

  try {
    const [tours, blogs, pages] = await Promise.all([
      getAllTours().catch(() => []),
      getAllBlogPosts().catch(() => []),
      listPageDocs().catch(() => []),
    ]);

    const tourResults: SearchResult[] = tours
      .map((tour) => {
        const score = calculateRelevance(query, tour.title, tour.niche?.join(', ') || '');
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
      .filter((result) => result.relevanceScore > 0);

    const blogResults: SearchResult[] = blogs
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
      .filter((result) => result.relevanceScore > 0);

    const pageResults: SearchResult[] = pages
      .map((page) => {
        const score = calculateRelevance(query, page.title, page.metaDesc);
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
      .filter((result) => result.relevanceScore > 0);

    const propertyResults: SearchResult[] = NETWORK_SITES
      .map((property) => {
        const score = calculateRelevance(query, property.name, property.name);
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
      .filter((result) => result.relevanceScore > 0);

    const results = [...tourResults, ...blogResults, ...pageResults, ...propertyResults]
      .sort((a, b) => b.relevanceScore - a.relevanceScore)
      .slice(0, 20);

    if (results.length === 0) {
      return (
        <div className="bg-cream py-20">
          <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="font-display text-4xl font-bold text-ink mb-4">No results found</h2>
            <p className="text-ink/70">
              We couldn&apos;t find anything matching &quot;{query}&quot;. Try different keywords or explore our tours by category.
            </p>
          </div>
        </div>
      );
    }

    const groupedResults = {
      properties: results.filter((r) => r.type === 'property'),
      tours: results.filter((r) => r.type === 'tour'),
      blogs: results.filter((r) => r.type === 'blog'),
      pages: results.filter((r) => r.type === 'page'),
    };

    return (
      <div className="bg-cream py-20">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <div className="mb-12">
            <h1 className="font-display text-4xl font-bold text-ink mb-4">
              Search results for &quot;{query}&quot;
            </h1>
            <p className="text-ink/70">
              Found {results.length} result{results.length !== 1 ? 's' : ''}
            </p>
          </div>

          {/* Properties */}
        {groupedResults.properties.length > 0 && (
          <div className="mb-12">
            <h2 className="mb-4 text-lg font-semibold text-ink">Network Properties</h2>
            <div className="space-y-4">
              {groupedResults.properties.map((result) => (
                <Link
                  key={result.id}
                  href={result.url}
                  className="block rounded-card border border-line p-4 bg-white transition-colors hover:border-brand hover:shadow-md"
                >
                  <h3 className="font-semibold text-brand">{result.title}</h3>
                  <p className="mt-1 text-sm text-ink/70">{result.description}</p>
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* Tours */}
        {groupedResults.tours.length > 0 && (
          <div className="mb-12">
            <h2 className="mb-4 text-lg font-semibold text-ink">Tours</h2>
            <div className="space-y-4">
              {groupedResults.tours.map((result) => (
                <Link
                  key={result.id}
                  href={result.url}
                  className="block rounded-card border border-line p-4 bg-white transition-colors hover:border-brand hover:shadow-md"
                >
                  <div className="flex items-start justify-between">
                    <div className="min-w-0">
                      <h3 className="font-semibold text-ink">{result.title}</h3>
                      {result.description && (
                        <p className="mt-1 text-sm text-ink/70 line-clamp-2">{result.description}</p>
                      )}
                    </div>
                    <span className="ml-2 shrink-0 rounded-full bg-brand/10 px-3 py-1 text-xs font-medium text-brand">
                      Tour
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* Blog Posts */}
        {groupedResults.blogs.length > 0 && (
          <div className="mb-12">
            <h2 className="mb-4 text-lg font-semibold text-ink">Blog Posts</h2>
            <div className="space-y-4">
              {groupedResults.blogs.map((result) => (
                <Link
                  key={result.id}
                  href={result.url}
                  className="block rounded-card border border-line p-4 bg-white transition-colors hover:border-brand hover:shadow-md"
                >
                  <div className="flex items-start justify-between">
                    <div className="min-w-0">
                      <h3 className="font-semibold text-ink">{result.title}</h3>
                      {result.description && (
                        <p className="mt-1 text-sm text-ink/70 line-clamp-2">{result.description}</p>
                      )}
                    </div>
                    <span className="ml-2 shrink-0 rounded-full bg-gold/20 px-3 py-1 text-xs font-medium text-gold">
                      Blog
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* Pages */}
        {groupedResults.pages.length > 0 && (
          <div className="mb-12">
            <h2 className="mb-4 text-lg font-semibold text-ink">Pages</h2>
            <div className="space-y-4">
              {groupedResults.pages.map((result) => (
                <Link
                  key={result.id}
                  href={result.url}
                  className="block rounded-card border border-line p-4 bg-white transition-colors hover:border-brand hover:shadow-md"
                >
                  <h3 className="font-semibold text-ink">{result.title}</h3>
                  {result.description && (
                    <p className="mt-1 text-sm text-ink/70">{result.description}</p>
                  )}
                </Link>
              ))}
            </div>
          </div>
        )}
        </div>
      </div>
    );
  } catch (error) {
    console.error('Search error:', error);
    return (
      <div className="bg-cream py-20">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-display text-4xl font-bold text-ink mb-4">Search error</h2>
          <p className="text-ink/70">
            Something went wrong while searching. Please try again.
          </p>
        </div>
      </div>
    );
  }
}

export default async function SearchPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string }>;
}) {
  const params = await searchParams;
  const query = typeof params.q === 'string' ? params.q : '';

  return (
    <>
      <Hero imageUrl="https://images.unsplash.com/photo-1516594915649-c945b9c922c8?w=1600&q=80" title="Search Tours" subtitle="Find what you&apos;re looking for" accentWord="" />
      <Suspense fallback={<div className="bg-cream min-h-screen" />}>
        <SearchResults query={query} />
      </Suspense>
    </>
  );
}
