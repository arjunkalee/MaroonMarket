"use client";

import { useState, useMemo } from "react";
import MarketCard from "@/components/markets/MarketCard";
import MarketFilters from "@/components/markets/MarketFilters";
import SwipeDeck from "@/components/markets/SwipeDeck";
import ViewModeToggle, { type ViewMode } from "@/components/markets/ViewModeToggle";
import { mockMarkets } from "@/lib/mockData";
import { Market } from "@/types/market";
import { APP_DESCRIPTION } from "@/lib/constants";

export default function Home() {
  const [viewMode, setViewMode] = useState<ViewMode>("grid");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredMarkets = useMemo(() => {
    return mockMarkets.filter((market: Market) => {
      const matchesCategory =
        selectedCategory === "All" || market.category === selectedCategory;
      const matchesSearch =
        market.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        market.description.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [selectedCategory, searchQuery]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2 dark:text-gray-50">
            Texas A&M Prediction Markets
          </h1>
          <p className="text-gray-600 dark:text-gray-300">{APP_DESCRIPTION}</p>
        </div>
        <ViewModeToggle mode={viewMode} onModeChange={setViewMode} />
      </div>

      <div className="mb-6">
        <MarketFilters
          selectedCategory={selectedCategory}
          onCategoryChange={setSelectedCategory}
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
        />
      </div>

      {viewMode === "swipe" ? (
        <SwipeDeck markets={filteredMarkets} />
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredMarkets.map((market) => (
              <MarketCard key={market.id} market={market} />
            ))}
          </div>
          {filteredMarkets.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-500 text-lg dark:text-gray-300">
                No markets found
              </p>
              <p className="text-gray-400 text-sm mt-2 dark:text-gray-500">
                Try adjusting your filters or search query
              </p>
            </div>
          )}
        </>
      )}
    </div>
  );
}
