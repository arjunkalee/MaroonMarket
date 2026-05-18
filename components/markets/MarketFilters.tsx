"use client";

import { MARKET_CATEGORIES } from "@/lib/constants";

interface MarketFiltersProps {
  selectedCategory: string;
  onCategoryChange: (category: string) => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
}

export default function MarketFilters({
  selectedCategory,
  onCategoryChange,
  searchQuery,
  onSearchChange,
}: MarketFiltersProps) {
  return (
    <div className="space-y-4">
      <div className="relative">
        <input
          type="text"
          placeholder="Search markets..."
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          className="w-full px-4 py-2 pl-10 border border-gray-300 rounded-lg bg-white text-gray-900 placeholder:text-gray-400 focus:ring-2 focus:ring-maroon-500 focus:border-transparent dark:bg-gray-950 dark:text-gray-50 dark:border-gray-800 dark:placeholder:text-gray-500"
        />
        <svg
          className="absolute left-3 top-2.5 h-5 w-5 text-gray-400"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
          />
        </svg>
      </div>

      <div className="flex flex-wrap gap-2">
        {MARKET_CATEGORIES.map((category) => (
          <button
            key={category}
            onClick={() => onCategoryChange(category)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              selectedCategory === category
                ? "bg-maroon-600 text-white"
                : "bg-white text-gray-700 border border-gray-300 hover:bg-gray-50 dark:bg-gray-950 dark:text-gray-200 dark:border-gray-800 dark:hover:bg-gray-900"
            }`}
          >
            {category}
          </button>
        ))}
      </div>
    </div>
  );
}
