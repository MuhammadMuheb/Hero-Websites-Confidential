'use client';

import { useState, useRef, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from '@/components/NetworkLink';

interface SearchResult {
  id: string;
  type: 'tour' | 'blog' | 'page' | 'property';
  title: string;
  description: string;
  url: string;
  location: string;
  relevanceScore: number;
}

interface GlobalSearchBoxProps {
  placeholder?: string;
  className?: string;
  compact?: boolean;
}

export function GlobalSearchBox({
  placeholder = 'Search across all websites...',
  className = '',
  compact = false
}: GlobalSearchBoxProps) {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<SearchResult[]>());
  const [isLoading, setIsLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [groupedResults, setGroupedResults] = useState<Record<string, SearchResult[]>>({});
  const searchRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  useEffect(() => {
    const timer = setTimeout(async () => {
      if (query.length < 2) {
        setResults([]);
        setGroupedResults({});
        return;
      }

      setIsLoading(true);
      try {
        const response = await fetch(`/api/global-search?q=${encodeURIComponent(query)}`);
        const data = await response.json();
        setResults(data.results || []);
        setGroupedResults(data.groupedResults || {});
        setIsOpen(true);
      } catch (error) {
        console.error('Search error:', error);
        setResults([]);
        setGroupedResults({});
      } finally {
        setIsLoading(false);
      }
    }, 300);

    return () => clearTimeout(timer);
  }, [query]);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim().length >= 2) {
      router.push(`/search?q=${encodeURIComponent(query)}`);
      setIsOpen(false);
    }
  };

  const handleResultClick = (result: SearchResult) => {
    router.push(result.url);
    setIsOpen(false);
    setQuery('');
  };

  return (
    <div className={`relative ${className}`} ref={searchRef}>
      <form onSubmit={handleSubmit} className="relative">
        <div className={`flex items-center gap-2 rounded-lg border border-gray-300 bg-white px-4 transition-all duration-200 focus-within:border-blue-500 focus-within:shadow-md ${
          compact ? 'h-9' : 'h-11'
        }`}>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" className="text-gray-400" aria-hidden="true">
            <circle cx="11" cy="11" r="7" stroke="currentColor" strokeWidth="2" />
            <path d="m20 20-3.5-3.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          </svg>
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onFocus={() => query.length >= 2 && setIsOpen(true)}
            placeholder={placeholder}
            className={`flex-1 min-w-0 bg-transparent text-gray-900 placeholder-gray-500 focus:outline-none ${
              compact ? 'text-sm' : 'text-base'
            }`}
            autoComplete="off"
          />
          {query && (
            <button
              type="button"
              onClick={() => {
                setQuery('');
                setResults([]);
                setGroupedResults({});
              }}
              className="p-1 text-gray-400 hover:text-gray-600 transition-colors"
              aria-label="Clear search"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                <path d="M18 6L6 18M6 6l12 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              </svg>
            </button>
          )}
        </div>

        {/* Search Results Dropdown */}
        {isOpen && (query.length >= 2 || results.length > 0) && (
          <div className="absolute top-full left-0 right-0 z-50 mt-2 max-h-96 overflow-y-auto rounded-lg border border-gray-200 bg-white shadow-xl">
            {isLoading ? (
              <div className="px-4 py-8 text-center">
                <div className="inline-block">
                  <div className="h-6 w-6 animate-spin rounded-full border-2 border-gray-300 border-t-blue-500"></div>
                </div>
                <p className="mt-2 text-sm text-gray-600">Searching...</p>
              </div>
            ) : results.length === 0 && query.length >= 2 ? (
              <div className="px-4 py-8 text-center">
                <p className="text-sm text-gray-600">
                  No results found for <span className="font-medium">"{query}"</span>
                </p>
                <p className="mt-1 text-xs text-gray-500">Try different keywords or browse by category</p>
              </div>
            ) : (
              <div className="divide-y divide-gray-100">
                {Object.entries(groupedResults).map(([location, locationResults]) => (
                  <div key={location}>
                    <div className="bg-gray-50 px-4 py-2">
                      <p className="text-xs font-semibold uppercase tracking-wider text-gray-600">{location}</p>
                    </div>
                    <div className="space-y-0">
                      {locationResults.slice(0, 5).map((result) => (
                        <button
                          key={`${result.location}-${result.id}`}
                          onClick={() => handleResultClick(result)}
                          className="w-full px-4 py-3 text-left hover:bg-blue-50 transition-colors flex items-start justify-between gap-3"
                        >
                          <div className="min-w-0 flex-1">
                            <p className="font-medium text-gray-900 truncate">{result.title}</p>
                            {result.description && (
                              <p className="text-sm text-gray-600 truncate">{result.description}</p>
                            )}
                          </div>
                          <span className="shrink-0 rounded-full bg-gray-100 px-2.5 py-1 text-xs font-medium text-gray-700">
                            {result.type}
                          </span>
                        </button>
                      ))}
                    </div>
                  </div>
                ))}

                {/* View All Results Link */}
                {results.length > 0 && (
                  <div className="border-t border-gray-100 bg-gray-50 px-4 py-3">
                    <button
                      onClick={() => {
                        router.push(`/search?q=${encodeURIComponent(query)}`);
                        setIsOpen(false);
                      }}
                      className="text-sm font-medium text-blue-600 hover:text-blue-700 transition-colors"
                    >
                      View all {results.length} results →
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>
        )}
      </form>
    </div>
  );
}
