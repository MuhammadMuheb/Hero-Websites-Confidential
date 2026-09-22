import type { Metadata } from 'next';
import Link from '@/components/NetworkLink';
import { Suspense } from 'react';

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

async function SearchResults({ query }: { query: string }) {
  if (!query || query.length < 2) {
    return (
      <div className="mx-auto max-w-3xl px-6 py-16 text-center sm:px-14">
        <h2 className="text-2xl font-bold text-ink">Enter a search term</h2>
        <p className="mt-2 text-ink-muted">Try searching for a tour, neighborhood, or topic.</p>
      </div>
    );
  }

  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'}/api/search?q=${encodeURIComponent(query)}`, {
      next: { revalidate: 60 },
    });

    if (!response.ok) {
      throw new Error('Failed to fetch search results');
    }

    const data = await response.json();
    const results: SearchResult[] = data.results || [];

    if (results.length === 0) {
      return (
        <div className="mx-auto max-w-3xl px-6 py-16 text-center sm:px-14">
          <h2 className="text-2xl font-bold text-ink">No results found</h2>
          <p className="mt-2 text-ink-muted">
            We couldn't find anything matching "{query}". Try different keywords or explore our tours by category.
          </p>
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
      <div className="mx-auto max-w-3xl px-6 py-12 sm:px-14">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-ink">
            Search results for "{query}"
          </h1>
          <p className="mt-2 text-sm text-ink-muted">
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
                  className="block rounded-lg border border-line p-4 transition-colors hover:border-accent hover:bg-paper-tint"
                >
                  <h3 className="font-semibold text-accent">{result.title}</h3>
                  <p className="mt-1 text-sm text-ink-muted">{result.description}</p>
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
                  className="block rounded-lg border border-line p-4 transition-colors hover:border-accent hover:bg-paper-tint"
                >
                  <div className="flex items-start justify-between">
                    <div className="min-w-0">
                      <h3 className="font-semibold text-ink">{result.title}</h3>
                      {result.description && (
                        <p className="mt-1 text-sm text-ink-muted line-clamp-2">{result.description}</p>
                      )}
                    </div>
                    <span className="ml-2 shrink-0 rounded-full bg-accent/10 px-3 py-1 text-xs font-medium text-accent">
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
                  className="block rounded-lg border border-line p-4 transition-colors hover:border-accent hover:bg-paper-tint"
                >
                  <div className="flex items-start justify-between">
                    <div className="min-w-0">
                      <h3 className="font-semibold text-ink">{result.title}</h3>
                      {result.description && (
                        <p className="mt-1 text-sm text-ink-muted line-clamp-2">{result.description}</p>
                      )}
                    </div>
                    <span className="ml-2 shrink-0 rounded-full bg-blue-100 px-3 py-1 text-xs font-medium text-blue-700">
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
                  className="block rounded-lg border border-line p-4 transition-colors hover:border-accent hover:bg-paper-tint"
                >
                  <h3 className="font-semibold text-ink">{result.title}</h3>
                  {result.description && (
                    <p className="mt-1 text-sm text-ink-muted">{result.description}</p>
                  )}
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    );
  } catch (error) {
    console.error('Search error:', error);
    return (
      <div className="mx-auto max-w-3xl px-6 py-16 text-center sm:px-14">
        <h2 className="text-2xl font-bold text-ink">Search error</h2>
        <p className="mt-2 text-ink-muted">
          Something went wrong while searching. Please try again.
        </p>
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
    <Suspense fallback={<div className="min-h-screen" />}>
      <SearchResults query={query} />
    </Suspense>
  );
}
