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
  // Search disabled - returning no results
  return (
    <div className="bg-cream py-20">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="font-display text-4xl font-bold text-ink mb-4">Search Unavailable</h2>
        <p className="text-ink/70">Search is temporarily unavailable. Please browse our tours or contact us directly.</p>
      </div>
    </div>
  );
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
