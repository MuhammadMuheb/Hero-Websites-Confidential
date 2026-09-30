'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { useCallback } from 'react';
import type { CategoryDef, NeighborhoodDef, CityDef } from '@/lib/tours';

interface ToursFilterClientProps {
  categories: CategoryDef[];
  neighborhoods: NeighborhoodDef[];
  cities: CityDef[];
  initialCategory?: string;
  initialNeighborhood?: string;
  initialCity?: string;
}

export function ToursFilterClient({
  categories,
  neighborhoods,
  cities,
  initialCategory,
  initialNeighborhood,
  initialCity,
}: ToursFilterClientProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  // Handler to update filters while preserving other selected filters
  const updateFilter = useCallback(
    (filterType: 'category' | 'neighborhood' | 'city', value: string | null) => {
      const params = new URLSearchParams(searchParams);

      if (value === null || value === '') {
        // Clear this filter
        params.delete(filterType);
      } else {
        // Set this filter
        params.set(filterType, value);
      }

      // Build the new URL with updated params
      const newUrl = params.toString() ? `/tours?${params.toString()}` : '/tours';
      router.push(newUrl);
    },
    [router, searchParams]
  );

  // Button styling classes
  const getButtonClasses = (isActive: boolean) => {
    const baseClasses = 'shrink-0 inline-flex items-center justify-center px-3 py-2 text-sm font-medium transition-colors duration-150 whitespace-nowrap rounded';
    return isActive
      ? `${baseClasses} bg-[#2D7C3F] text-white`
      : `${baseClasses} bg-[#E8E8E8] text-[#333333] hover:bg-[#D9D9D9]`;
  };

  const FilterSection = ({
    title,
    items,
    filterType,
    isActive,
  }: {
    title: string;
    items: Array<{ slug: string; name: string }>;
    filterType: 'category' | 'neighborhood' | 'city';
    isActive: (slug: string) => boolean;
  }) => (
    <div className="mb-6 last:mb-0">
      <h3 className="text-xs font-bold uppercase tracking-wider text-ink/60 mb-3">{title}</h3>
      <div className="flex gap-2 overflow-x-auto pb-2 -mx-4 px-4 sm:mx-0 sm:px-0 sm:overflow-visible">
        {/* All button */}
        <button
          onClick={() => updateFilter(filterType, null)}
          className={getButtonClasses(!isActive(''))}
        >
          All {filterType === 'city' ? 'Cities' : filterType === 'category' ? '' : ''}
        </button>

        {/* Filter buttons */}
        {items.map((item) => (
          <button
            key={item.slug}
            onClick={() => updateFilter(filterType, item.slug)}
            className={getButtonClasses(isActive(item.slug))}
          >
            {item.name}
          </button>
        ))}
      </div>
    </div>
  );

  return (
    <div className="mb-12 space-y-6">
      {/* Category Filters */}
      <FilterSection
        title="Category"
        items={categories}
        filterType="category"
        isActive={(slug) => slug === initialCategory}
      />

      {/* Neighborhood Filters */}
      <FilterSection
        title="Area"
        items={neighborhoods}
        filterType="neighborhood"
        isActive={(slug) => slug === initialNeighborhood}
      />

      {/* City Filters */}
      <FilterSection
        title="City"
        items={cities}
        filterType="city"
        isActive={(slug) => slug === initialCity}
      />
    </div>
  );
}
