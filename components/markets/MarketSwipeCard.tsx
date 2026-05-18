"use client";

import { useRef, useCallback } from "react";
import { Market } from "@/types/market";
import { Clock, TrendingUp, TrendingDown, X, Heart } from "lucide-react";
import { formatMarketDate, formatVolume } from "@/lib/utils";
import { useSwipe } from "@/hooks/useSwipe";

interface MarketSwipeCardProps {
  market: Market;
  onSwipeLeft: () => void;
  onSwipeRight: () => void;
}

export default function MarketSwipeCard({
  market,
  onSwipeLeft,
  onSwipeRight,
}: MarketSwipeCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);

  const { dragX, handleStart, handleMove, handleEnd } = useSwipe({
    onSwipeLeft,
    onSwipeRight,
  });

  const onPointerDown = useCallback(
    (e: React.PointerEvent) => {
      const width = cardRef.current?.offsetWidth ?? 400;
      handleStart(e.clientX, width);
      (e.target as HTMLElement).setPointerCapture?.(e.pointerId);
    },
    [handleStart]
  );

  const onPointerMove = useCallback(
    (e: React.PointerEvent) => {
      if (e.buttons === 0) return;
      handleMove(e.clientX);
    },
    [handleMove]
  );

  const onPointerUp = useCallback(() => {
    handleEnd();
  }, [handleEnd]);

  return (
    <div
      ref={cardRef}
      className="relative w-full max-w-md mx-auto touch-none select-none"
      style={{ touchAction: "none" }}
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={onPointerUp}
      onPointerLeave={onPointerUp}
    >
      {/* Left overlay (nope) */}
      <div
        className={`absolute inset-0 rounded-2xl border-4 border-red-500 bg-red-500/20 flex items-center justify-center z-10 pointer-events-none transition-opacity ${
          dragX < -20 ? "opacity-100" : "opacity-0"
        }`}
        style={{ transform: `translateX(${Math.min(0, dragX + 20)}px)` }}
      >
        <div className="rotate-[-20deg] flex flex-col items-center text-red-600 dark:text-red-400">
          <X className="h-16 w-16" strokeWidth={3} />
          <span className="text-xl font-bold mt-2">Nope</span>
        </div>
      </div>

      {/* Right overlay (like) */}
      <div
        className={`absolute inset-0 rounded-2xl border-4 border-green-500 bg-green-500/20 flex items-center justify-center z-10 pointer-events-none transition-opacity ${
          dragX > 20 ? "opacity-100" : "opacity-0"
        }`}
        style={{ transform: `translateX(${Math.max(0, dragX - 20)}px)` }}
      >
        <div className="rotate-[20deg] flex flex-col items-center text-green-600 dark:text-green-400">
          <Heart className="h-16 w-16" strokeWidth={3} fill="currentColor" />
          <span className="text-xl font-bold mt-2">Like</span>
        </div>
      </div>

      {/* Card content */}
      <div
        className="bg-white dark:bg-gray-900 rounded-2xl border-2 border-gray-200 dark:border-gray-700 shadow-xl p-6 transition-transform duration-75"
        style={{
          transform: `translateX(${dragX}px) rotate(${dragX * 0.03}deg)`,
        }}
      >
        <div className="flex items-center space-x-2 mb-4">
          <span className="px-3 py-1 text-xs font-medium bg-gray-100 text-gray-700 rounded-full dark:bg-gray-800 dark:text-gray-200">
            {market.category}
          </span>
          {market.status === "open" && (
            <span className="px-3 py-1 text-xs font-medium bg-green-100 text-green-700 rounded-full dark:bg-green-950 dark:text-green-200">
              Open
            </span>
          )}
        </div>
        <h2 className="text-xl font-bold text-gray-900 dark:text-gray-50 mb-3">
          {market.title}
        </h2>
        <p className="text-sm text-gray-600 dark:text-gray-300 mb-6 line-clamp-3">
          {market.description}
        </p>
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div className="bg-green-50 dark:bg-green-950 rounded-xl p-4">
            <div className="flex items-center justify-between mb-1">
              <span className="text-xs font-medium text-gray-600 dark:text-gray-300">
                YES
              </span>
              <TrendingUp className="h-4 w-4 text-green-600" />
            </div>
            <div className="text-2xl font-bold text-green-600">
              {market.yesPrice}¢
            </div>
          </div>
          <div className="bg-red-50 dark:bg-red-950 rounded-xl p-4">
            <div className="flex items-center justify-between mb-1">
              <span className="text-xs font-medium text-gray-600 dark:text-gray-300">
                NO
              </span>
              <TrendingDown className="h-4 w-4 text-red-600" />
            </div>
            <div className="text-2xl font-bold text-red-600">
              {market.noPrice}¢
            </div>
          </div>
        </div>
        <div className="flex items-center justify-between text-sm text-gray-500 dark:text-gray-400 pt-4 border-t border-gray-100 dark:border-gray-800">
          <div className="flex items-center space-x-1">
            <Clock className="h-4 w-4" />
            <span>Ends {formatMarketDate(market.endDate)}</span>
          </div>
          <span>Vol: {formatVolume(market.volume)}</span>
        </div>
        <p className="text-xs text-gray-400 dark:text-gray-500 mt-4 text-center">
          Swipe right to open · Swipe left to skip
        </p>
      </div>
    </div>
  );
}
