"use client";

import Link from "next/link";
import { Market } from "@/types/market";
import { Clock, TrendingUp, TrendingDown } from "lucide-react";
import { formatMarketDate, formatVolume } from "@/lib/utils";

interface MarketCardProps {
  market: Market;
}

export default function MarketCard({ market }: MarketCardProps) {
  return (
    <Link href={`/markets/${market.id}`}>
      <div className="bg-white rounded-lg border border-gray-200 p-6 hover:shadow-lg transition-shadow cursor-pointer dark:bg-gray-950 dark:border-gray-800">
        <div className="flex items-start justify-between mb-4">
          <div className="flex-1">
            <div className="flex items-center space-x-2 mb-2">
              <span className="px-2 py-1 text-xs font-medium bg-gray-100 text-gray-700 rounded dark:bg-gray-900 dark:text-gray-200">
                {market.category}
              </span>
              {market.status === "open" && (
                <span className="px-2 py-1 text-xs font-medium bg-green-100 text-green-700 rounded dark:bg-green-950 dark:text-green-200">
                  Open
                </span>
              )}
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2 dark:text-gray-50">
              {market.title}
            </h3>
            <p className="text-sm text-gray-600 line-clamp-2 dark:text-gray-300">
              {market.description}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 mb-4">
          <div className="bg-green-50 rounded-lg p-3 dark:bg-green-950">
            <div className="flex items-center justify-between mb-1">
              <span className="text-xs font-medium text-gray-600 dark:text-gray-300">
                YES
              </span>
              <TrendingUp className="h-3 w-3 text-green-600" />
            </div>
            <div className="text-2xl font-bold text-green-600">
              {market.yesPrice}¢
            </div>
          </div>
          <div className="bg-red-50 rounded-lg p-3 dark:bg-red-950">
            <div className="flex items-center justify-between mb-1">
              <span className="text-xs font-medium text-gray-600 dark:text-gray-300">
                NO
              </span>
              <TrendingDown className="h-3 w-3 text-red-600" />
            </div>
            <div className="text-2xl font-bold text-red-600">
              {market.noPrice}¢
            </div>
          </div>
        </div>

        <div className="flex items-center justify-between text-sm text-gray-500 pt-4 border-t border-gray-100 dark:text-gray-400 dark:border-gray-900">
          <div className="flex items-center space-x-1">
            <Clock className="h-4 w-4" />
            <span>Ends {formatMarketDate(market.endDate)}</span>
          </div>
          <div className="flex items-center space-x-4">
            <span>Vol: {formatVolume(market.volume)}</span>
            <span>Liq: {formatVolume(market.liquidity)}</span>
          </div>
        </div>
      </div>
    </Link>
  );
}
