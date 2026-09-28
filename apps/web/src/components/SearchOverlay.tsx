'use client';

import { useState, useEffect, useCallback } from 'react';
import { Search, X } from 'lucide-react';
import Link from 'next/link';

interface SearchResult {
  id: string;
  site: string;
  siteSlug: string;
  page: string;
  section?: string;
  title: string;
  excerpt: string;
  url: string;
  relevance: number;
}

export function SearchOverlay() {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<SearchResult[]>([]);
  const [selectedIndex, setSelectedIndex] = useState(0);

  // ⌘K or Ctrl+K to open
  useEffect(() => {
    const handleGlobalKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setIsOpen(!isOpen);
      }
      if (e.key === 'Escape') {
        setIsOpen(false);
      }
    };

    window.addEventListener('keydown', handleGlobalKeyDown);
    return () => window.removeEventListener('keydown', handleGlobalKeyDown);
  }, [isOpen]);

  // Arrow key navigation in search input
  const handleInputKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedIndex((i) => Math.min(i + 1, results.length - 1));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedIndex((i) => Math.max(i - 1, 0));
    } else if (e.key === 'Enter' && results[selectedIndex]) {
      window.location.href = results[selectedIndex].url;
    }
  };

  const performSearch = useCallback((q: string) => {
    if (q.length < 2) {
      setResults([]);
      return;
    }

    // Placeholder: In real implementation, this would search the MiniSearch index
    // For now, showing structure
    setResults([]);
    setSelectedIndex(0);
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      performSearch(query);
    }, 300);

    return () => clearTimeout(timer);
  }, [query, performSearch]);

  if (!isOpen) {
    return (
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 lg:bottom-auto lg:top-6 lg:right-6 bg-white border border-line rounded-control p-2 hover:shadow-md transition-shadow z-30 flex items-center gap-2 text-sm text-ink/60"
      >
        <Search size={16} />
        <span className="hidden sm:inline">⌘K</span>
      </button>
    );
  }

  return (
    <div className="fixed inset-0 bg-black/40 z-40 flex items-start justify-center pt-32">
      <div className="bg-white rounded-card w-full max-w-2xl mx-4 shadow-xl">
        {/* Search Input */}
        <div className="flex items-center gap-3 px-6 py-4 border-b border-line">
          <Search size={20} className="text-ink/40" />
          <input
            autoFocus
            type="text"
            placeholder="Search tours, guides, neighborhoods..."
            value={query}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setQuery(e.target.value)}
            onKeyDown={handleInputKeyDown}
            className="flex-1 outline-none text-lg bg-transparent text-ink placeholder-ink/40"
          />
          <button onClick={() => setIsOpen(false)} className="text-ink/40 hover:text-ink">
            <X size={20} />
          </button>
        </div>

        {/* Results */}
        <div className="max-h-96 overflow-y-auto">
          {query.length < 2 ? (
            <div className="p-8 text-center text-ink/60">
              <p>Type at least 2 characters to search</p>
            </div>
          ) : results.length === 0 ? (
            <div className="p-8 text-center text-ink/60">
              <p>No results for &quot;{query}&quot;</p>
            </div>
          ) : (
            <div>
              {results.map((result, index) => (
                <Link
                  key={result.id}
                  href={result.url}
                  className={`block px-6 py-4 border-b border-line transition-colors ${
                    index === selectedIndex ? 'bg-brand/5' : 'hover:bg-cream'
                  }`}
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1 min-w-0">
                      <div className="text-xs font-semibold text-ink/40 uppercase tracking-wider mb-1">
                        {result.site} {result.page && `› ${result.page}`} {result.section && `› ${result.section}`}
                      </div>
                      <h3 className="font-semibold text-ink">{result.title}</h3>
                      {result.excerpt && <p className="text-sm text-ink/60 mt-1 line-clamp-2">{result.excerpt}</p>}
                    </div>
                    <span className="text-xs text-ink/40 shrink-0">{Math.round(result.relevance * 100)}%</span>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
