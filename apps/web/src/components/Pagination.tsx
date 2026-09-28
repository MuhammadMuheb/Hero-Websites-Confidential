import Link from 'next/link';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  basePath: string;
}

export function Pagination({ currentPage, totalPages, basePath }: PaginationProps) {
  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);
  const showPages = pages.slice(Math.max(0, currentPage - 2), Math.min(totalPages, currentPage + 1));

  return (
    <div className="flex items-center justify-center gap-2">
      {currentPage > 1 && (
        <Link
          href={`${basePath}?page=${currentPage - 1}`}
          className="p-2 border border-line rounded-control hover:border-brand transition-colors"
        >
          <ChevronLeft size={20} />
        </Link>
      )}

      {showPages.map((page) => (
        <Link
          key={page}
          href={`${basePath}?page=${page}`}
          className={`w-10 h-10 flex items-center justify-center rounded-control transition-colors ${
            page === currentPage
              ? 'bg-brand text-cream'
              : 'border border-line hover:border-brand'
          }`}
        >
          {page}
        </Link>
      ))}

      {currentPage < totalPages && (
        <Link
          href={`${basePath}?page=${currentPage + 1}`}
          className="p-2 border border-line rounded-control hover:border-brand transition-colors"
        >
          <ChevronRight size={20} />
        </Link>
      )}
    </div>
  );
}
