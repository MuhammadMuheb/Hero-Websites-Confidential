'use client';

import { useState, useRef, useEffect } from 'react';
import Link from '@/components/NetworkLink';
import { useRouter } from 'next/navigation';

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

interface SearchBoxProps {
  placeholder?: string;
  className?: string;
  showCompact?: boolean;
}

export function SearchBox({ placeholder = 'Search tours, guides, neighborhoods...', className = '', showCompact = false }: SearchBoxProps) {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<SearchResult[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  // Debounced search
  useEffect(() => {
    const timer = setTimeout(async () => {
      if (query.length < 2) {
        setResults([]);
        return;
      }

      setIsLoading(true);
      try {
        const response = await fetch(`/api/search?q=${encodeURIComponent(query)}`);
        const data = await response.json();
        setResults(data.results || []);
        setIsOpen(true);
      } catch (error) {
        console.error('Search error:', error);
        setResults([]);
      } finally {
        setIsLoading(false);
      }
    }, 300);

    return () => clearTimeout(timer);
  }, [query]);

  // Close dropdown when clicking outside
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

  const groupedResults = {
    properties: results.filter((r) => r.type === 'property'),
    tours: results.filter((r) => r.type === 'tour'),
    blogs: results.filter((r) => r.type === 'blog'),
    pages: results.filter((r) => r.type === 'page'),
  };

  return (
    <div className={`relative ${className}`} ref={searchRef}>
      <form onSubmit={handleSubmit} className={showCompact ? 'relative' : 'flex items-center gap-2'}>
        <div className={`flex items-center gap-2 ${showCompact ? 'w-full px-3' : 'hidden min-w-0 max-w-[420px] flex-1 items-center gap-2 rounded-control border border-line bg-paper-tint/70 px-3 transition-colors focus-within:border-accent lg:flex'}`}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" className="shrink-0 text-faint" aria-hidden="true">
            <circle cx="11" cy="11" r="7" stroke="currentColor" strokeWidth="1.8" />
            <path d="m20 20-3.5-3.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
          </svg>
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={placeholder}
            className={`w-full min-w-0 bg-transparent text-ink placeholder:text-faint focus:outline-none ${showCompact ? 'h-10 text-base' : 'h-9 text-sm'}`}
            onFocus={() => query.length >= 2 && setIsOpen(true)}
          />
          {query && (
            <button
              type="button"
              onClick={() => {
                setQuery('');
                setResults([]);
              }}
              className="shrink-0 rounded-control p-1 text-faint hover:bg-paper-tint hover:text-ink"
              aria-label="Clear search"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                <path d="M18 6L6 18M6 6l12 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              </svg>
            </button>
          )}
        </div>
        <button
          type="submit"
          className={`shrink-0 whitespace-nowrap rounded-control font-bold transition-transform duration-200 ease-out hover:scale-[1.02] active:scale-[0.98] ${showCompact ? 'h-11 bg-accent-gradient px-5 text-base text-white shadow-glow' : 'h-8 border border-accent px-3 text-sm font-medium text-accent hover:bg-accent hover:text-white'}`}
        >
          Search Tours
        </button>
      </form>

      {/* Dropdown Results */}
      {isOpen && (query.length >= 2 || results.length > 0) && (
        <div className="absolute top-full left-0 right-0 z-50 mt-2 max-h-96 overflow-y-auto rounded-lg border border-line bg-white shadow-lg">
          {isLoading ? (
            <div className="px-4 py-8 text-center text-sm text-faint">Searching...</div>
          ) : results.length === 0 ? (
            <div className="px-4 py-8 text-center text-sm text-faint">
              No results found for "{query}"
            </div>
          ) : (
            <>
              {/* Properties Section */}
              {groupedResults.properties.length > 0 && (
                <div className="border-b border-line/50">
                  <div className="px-4 pt-3 pb-2 text-xs font-semibold uppercase tracking-wider text-faint">
                    Properties
                  </div>
                  {groupedResults.properties.map((result) => (
                    <button
                      key={result.id}
                      onClick={() => handleResultClick(result)}
                      className="block w-full px-4 py-3 text-left hover:bg-paper-tint transition-colors"
                    >
                      <div className="font-medium text-ink">{result.title}</div>
                      <div className="text-xs text-faint">{result.description}</div>
                    </button>
                  ))}
                </div>
              )}

              {/* Tours Section */}
              {groupedResults.tours.length > 0 && (
                <div className="border-b border-line/50">
                  <div className="px-4 pt-3 pb-2 text-xs font-semibold uppercase tracking-wider text-faint">
                    Tours
                  </div>
                  {groupedResults.tours.slice(0, 5).map((result) => (
                    <button
                      key={result.id}
                      onClick={() => handleResultClick(result)}
                      className="block w-full px-4 py-3 text-left hover:bg-paper-tint transition-colors"
                    >
                      <div className="font-medium text-ink">{result.title}</div>
                      {result.description && <div className="text-xs text-faint line-clamp-1">{result.description}</div>}
                    </button>
                  ))}
                </div>
              )}

              {/* Blog Posts Section */}
              {groupedResults.blogs.length > 0 && (
                <div className="border-b border-line/50">
                  <div className="px-4 pt-3 pb-2 text-xs font-semibold uppercase tracking-wider text-faint">
                    Blog Posts
                  </div>
                  {groupedResults.blogs.slice(0, 5).map((result) => (
                    <button
                      key={result.id}
                      onClick={() => handleResultClick(result)}
                      className="block w-full px-4 py-3 text-left hover:bg-paper-tint transition-colors"
                    >
                      <div className="font-medium text-ink">{result.title}</div>
                      {result.description && <div className="text-xs text-faint line-clamp-1">{result.description}</div>}
                    </button>
                  ))}
                </div>
              )}

              {/* Pages Section */}
              {groupedResults.pages.length > 0 && (
                <div>
                  <div className="px-4 pt-3 pb-2 text-xs font-semibold uppercase tracking-wider text-faint">
                    Pages
                  </div>
                  {groupedResults.pages.map((result) => (
                    <button
                      key={result.id}
                      onClick={() => handleResultClick(result)}
                      className="block w-full px-4 py-3 text-left hover:bg-paper-tint transition-colors"
                    >
                      <div className="font-medium text-ink">{result.title}</div>
                      {result.description && <div className="text-xs text-faint">{result.description}</div>}
                    </button>
                  ))}
                </div>
              )}

              {/* View All Results Link */}
              {results.length > 0 && (
                <div className="border-t border-line/50 px-4 py-3 text-center">
                  <button
                    onClick={() => {
                      router.push(`/search?q=${encodeURIComponent(query)}`);
                      setIsOpen(false);
                    }}
                    className="text-sm font-medium text-accent hover:text-accent-dark"
                  >
                    View all {results.length} results →
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      )}
    </div>
  );
}
