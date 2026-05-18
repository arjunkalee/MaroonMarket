"use client";

import { useCallback, useState } from "react";
import { useRouter } from "next/navigation";
import { Market } from "@/types/market";
import MarketSwipeCard from "./MarketSwipeCard";

interface SwipeDeckProps {
  markets: Market[];
}

export default function SwipeDeck({ markets }: SwipeDeckProps) {
  const router = useRouter();
  const [index, setIndex] = useState(0);
  const current = markets[index];

  const goNext = useCallback(() => {
    setIndex((i) => Math.min(i + 1, markets.length - 1));
  }, [markets.length]);

  const openMarket = useCallback(
    (id: string) => {
      router.push(`/markets/${id}`);
    },
    [router]
  );

  const handleSwipeLeft = useCallback(() => {
    goNext();
  }, [goNext]);

  const handleSwipeRight = useCallback(() => {
    if (current) openMarket(current.id);
  }, [current, openMarket]);

  if (markets.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-16 text-center">
        <p className="text-lg text-gray-500 dark:text-gray-400">
          No markets to swipe
        </p>
        <p className="text-sm text-gray-400 dark:text-gray-500 mt-2">
          Try changing filters or search
        </p>
      </div>
    );
  }

  if (index >= markets.length) {
    return (
      <div className="flex flex-col items-center justify-center py-16 text-center">
        <p className="text-lg font-medium text-gray-700 dark:text-gray-300">
          You&apos;ve seen all markets
        </p>
        <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
          Market {index} of {markets.length}
        </p>
        <button
          type="button"
          onClick={() => setIndex(0)}
          className="mt-4 px-6 py-2 bg-maroon-600 text-white rounded-lg font-medium hover:bg-maroon-700 transition-colors"
        >
          Start over
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-[420px] flex flex-col justify-center">
      <div className="mb-4 text-center text-sm text-gray-500 dark:text-gray-400">
        Card {index + 1} of {markets.length}
      </div>
      <MarketSwipeCard
        key={current.id}
        market={current}
        onSwipeLeft={handleSwipeLeft}
        onSwipeRight={handleSwipeRight}
      />
      <div className="flex justify-center gap-6 mt-6">
        <button
          type="button"
          onClick={handleSwipeLeft}
          aria-label="Skip"
          className="h-14 w-14 rounded-full border-2 border-gray-300 dark:border-gray-600 flex items-center justify-center text-gray-500 dark:text-gray-400 hover:border-red-400 hover:text-red-500 dark:hover:text-red-400 transition-colors"
        >
          <span className="text-xl font-bold">✕</span>
        </button>
        <button
          type="button"
          onClick={handleSwipeRight}
          aria-label="Open market"
          className="h-14 w-14 rounded-full border-2 border-green-400 bg-green-50 dark:bg-green-950 dark:border-green-600 flex items-center justify-center text-green-600 dark:text-green-400 hover:bg-green-100 dark:hover:bg-green-900/50 transition-colors"
        >
          <span className="text-2xl">♥</span>
        </button>
      </div>
    </div>
  );
}
