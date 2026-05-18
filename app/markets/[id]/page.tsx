"use client";

import { useState } from "react";
import { use } from "react";
import { mockMarkets } from "@/lib/mockData";
import { Market } from "@/types/market";
import { Clock, TrendingUp, TrendingDown, DollarSign } from "lucide-react";

interface PageProps {
  params: Promise<{ id: string }>;
}

export default function MarketDetailPage({ params }: PageProps) {
  const { id } = use(params);
  const market = mockMarkets.find((m) => m.id === id);

  const [shares, setShares] = useState(10);
  const [selectedOutcome, setSelectedOutcome] = useState<"yes" | "no">("yes");
  const [orderType, setOrderType] = useState<"market" | "limit">("market");

  if (!market) {
    return (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-50 mb-2">
            Market not found
          </h1>
          <p className="text-gray-600 dark:text-gray-300">The market you're looking for doesn't exist.</p>
        </div>
      </div>
    );
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric",
      hour: "numeric",
      minute: "2-digit",
    });
  };

  const totalCost = shares * (selectedOutcome === "yes" ? market.yesPrice : market.noPrice) / 100;

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-6">
        <div className="flex items-center space-x-2 mb-4">
          <span className="px-3 py-1 text-sm font-medium bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-200 rounded">
            {market.category}
          </span>
          {market.status === "open" && (
            <span className="px-3 py-1 text-sm font-medium bg-green-100 dark:bg-green-950 text-green-700 dark:text-green-200 rounded">
              Open
            </span>
          )}
        </div>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-50 mb-4">{market.title}</h1>
        <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">{market.description}</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Market Info */}
        <div className="lg:col-span-2 space-y-6">
          {/* Price Display */}
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-green-50 dark:bg-green-950 border-2 border-green-200 dark:border-green-800 rounded-lg p-6">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-gray-600 dark:text-gray-300">YES</span>
                <TrendingUp className="h-5 w-5 text-green-600" />
              </div>
              <div className="text-4xl font-bold text-green-600 mb-2">
                {market.yesPrice}¢
              </div>
              <div className="text-sm text-gray-500 dark:text-gray-400">
                ${((100 - market.yesPrice) / 100).toFixed(2)} payout if YES
              </div>
            </div>
            <div className="bg-red-50 dark:bg-red-950 border-2 border-red-200 dark:border-red-800 rounded-lg p-6">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-gray-600 dark:text-gray-300">NO</span>
                <TrendingDown className="h-5 w-5 text-red-600" />
              </div>
              <div className="text-4xl font-bold text-red-600 mb-2">
                {market.noPrice}¢
              </div>
              <div className="text-sm text-gray-500">
                ${((100 - market.noPrice) / 100).toFixed(2)} payout if NO
              </div>
            </div>
          </div>

          {/* Market Stats */}
          <div className="bg-white border border-gray-200 rounded-lg p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Market Stats</h2>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <div className="text-sm text-gray-600 mb-1">Volume</div>
                <div className="text-xl font-semibold text-gray-900">
                  ${market.volume.toLocaleString()}
                </div>
              </div>
              <div>
                <div className="text-sm text-gray-600 dark:text-gray-400 mb-1">Liquidity</div>
                <div className="text-xl font-semibold text-gray-900 dark:text-gray-100">
                  ${market.liquidity.toLocaleString()}
                </div>
              </div>
              <div>
                <div className="text-sm text-gray-600 dark:text-gray-400 mb-1">End Date</div>
                <div className="text-lg font-medium text-gray-900 dark:text-gray-100 flex items-center space-x-1">
                  <Clock className="h-4 w-4" />
                  <span>{formatDate(market.endDate)}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Trading Panel */}
        <div className="bg-white border border-gray-200 rounded-lg p-6 sticky top-20">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Place Order</h2>

          {/* Outcome Selection */}
          <div className="grid grid-cols-2 gap-2 mb-4">
            <button
              onClick={() => setSelectedOutcome("yes")}
              className={`px-4 py-3 rounded-lg font-medium transition-colors ${
                selectedOutcome === "yes"
                  ? "bg-green-600 text-white"
                  : "bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-700"
              }`}
            >
              YES
            </button>
            <button
              onClick={() => setSelectedOutcome("no")}
              className={`px-4 py-3 rounded-lg font-medium transition-colors ${
                selectedOutcome === "no"
                  ? "bg-red-600 text-white"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              NO
            </button>
          </div>

          {/* Order Type */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Order Type
            </label>
            <div className="grid grid-cols-2 gap-2">
              <button
                onClick={() => setOrderType("market")}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  orderType === "market"
                    ? "bg-maroon-600 text-white"
                    : "bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-700"
                }`}
              >
                Market
              </button>
              <button
                onClick={() => setOrderType("limit")}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  orderType === "limit"
                    ? "bg-maroon-600 text-white"
                    : "bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-700"
                }`}
              >
                Limit
              </button>
            </div>
          </div>

          {/* Shares Input */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Shares
            </label>
            <input
              type="number"
              min="1"
              value={shares}
              onChange={(e) => setShares(parseInt(e.target.value) || 1)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-maroon-500 focus:border-transparent"
            />
          </div>

          {/* Cost Display */}
          <div className="bg-gray-50 rounded-lg p-4 mb-4">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm text-gray-600">Cost</span>
              <span className="text-lg font-semibold text-gray-900">
                ${totalCost.toFixed(2)}
              </span>
            </div>
            <div className="flex justify-between items-center text-sm">
              <span className="text-gray-600">Price per share</span>
              <span className="text-gray-900">
                {(selectedOutcome === "yes" ? market.yesPrice : market.noPrice)}¢
              </span>
            </div>
          </div>

          {/* Buy Button */}
          <button className="w-full bg-maroon-600 text-white py-3 rounded-lg font-semibold hover:bg-maroon-700 transition-colors flex items-center justify-center space-x-2">
            <DollarSign className="h-5 w-5" />
            <span>Buy {selectedOutcome.toUpperCase()}</span>
          </button>

          <div className="mt-4 text-xs text-gray-500 dark:text-gray-400 text-center">
            You have $1,250 available
          </div>
        </div>
      </div>
    </div>
  );
}
