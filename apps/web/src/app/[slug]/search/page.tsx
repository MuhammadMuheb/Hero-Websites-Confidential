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

async function SearchResults({ query, propertySlug }: { query: string; propertySlug?: string }) {
  const currentPropertySlug = propertySlug || 'street-food-rome';

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

    const propertyName = NETWORK_SITES.find((s) => s.slug === currentPropertySlug)?.name || currentPropertySlug;

    const tourResults: SearchResult[] = tours
      .filter((tour) => (tour.propertySlug || 'street-food-rome') === currentPropertySlug)
      .map((tour) => {
        const score = calculateRelevance(query, tour.title, tour.niche?.join(', ') || '');
        return {
          id: tour.slug,
          type: 'tour' as const,
          title: tour.title,
          description: tour.firstHandNotes || tour.niche?.join(', ') || '',
          url: currentPropertySlug === 'street-food-rome' ? `/tours/${tour.slug}` : `/${currentPropertySlug}/tours/${tour.slug}`,
          property: propertyName,
          propertySlug: currentPropertySlug,
          relevanceScore: score,
        };
      })
      .filter((result) => result.relevanceScore > 0);

    const blogResults: SearchResult[] = blogs
      .filter((post) => (post.propertySlug || 'street-food-rome') === currentPropertySlug)
      .map((post) => {
        const score = calculateRelevance(query, post.title, post.excerpt);
        return {
          id: post.slug,
          type: 'blog' as const,
          title: post.title,
          description: post.excerpt || '',
          url: currentPropertySlug === 'street-food-rome' ? `/blog/${post.slug}` : `/${currentPropertySlug}/blog/${post.slug}`,
          property: propertyName,
          propertySlug: currentPropertySlug,
          relevanceScore: score,
        };
      })
      .filter((result) => result.relevanceScore > 0);

    const pageResults: SearchResult[] = pages
      .filter((page) => (page.propertySlug || 'street-food-rome') === currentPropertySlug)
      .filter((page) => {
        // Exclude category pages - they don't have actual routes
        if (page.type === 'category') return false;
        // Only include pages that are searchable
        return true;
      })
      .map((page) => {
        const score = calculateRelevance(query, page.title, page.metaDesc);
        const urlSegment = page.slug === 'home' ? '' : `/${page.slug}`;
        const url = currentPropertySlug === 'street-food-rome' ? urlSegment : `/${currentPropertySlug}${urlSegment}`;
        return {
          id: page.slug,
          type: 'page' as const,
          title: page.title,
          description: page.metaDesc || '',
          url: url,
          property: propertyName,
          propertySlug: currentPropertySlug,
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
      .filter((result) => {
        if (result.type === 'property') return true;
        return result.propertySlug === currentPropertySlug;
      })
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
  params,
  searchParams,
}: {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ q?: string; property?: string }>;
}) {
  const routeParams = await params;
  const queryParams = await searchParams;
  const query = typeof queryParams.q === 'string' ? queryParams.q : '';
  const propertySlug = routeParams.slug || 'street-food-rome';

  return (
    <>
      <Hero imageUrl="https://images.unsplash.com/photo-1516594915649-c945b9c922c8?w=1600&q=80" title="Search Tours" subtitle="Find what you&apos;re looking for" accentWord="" />
      <Suspense fallback={<div className="bg-cream min-h-screen" />}>
        <SearchResults query={query} propertySlug={propertySlug} />
      </Suspense>
    </>
  );
}
