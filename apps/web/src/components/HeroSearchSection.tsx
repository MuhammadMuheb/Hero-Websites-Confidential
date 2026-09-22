'use client';

import { GlobalSearchBox } from './GlobalSearchBox';

interface HeroSearchSectionProps {
  className?: string;
}

export function HeroSearchSection({ className = '' }: HeroSearchSectionProps) {
  return (
    <div className={`bg-white py-8 px-4 sm:px-6 lg:px-8 ${className}`}>
      <div className="mx-auto max-w-4xl">
        <div className="relative">
          <GlobalSearchBox
            placeholder="Search tours, experiences, and more..."
            compact={false}
            className="w-full"
          />
        </div>
      </div>
    </div>
  );
}
