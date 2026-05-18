"use client";

import { LayoutGrid, Sparkles } from "lucide-react";

export type ViewMode = "grid" | "swipe";

interface ViewModeToggleProps {
  mode: ViewMode;
  onModeChange: (mode: ViewMode) => void;
}

export default function ViewModeToggle({ mode, onModeChange }: ViewModeToggleProps) {
  return (
    <div className="inline-flex rounded-lg border border-gray-200 dark:border-gray-700 p-1 bg-gray-50 dark:bg-gray-900/50">
      <button
        type="button"
        onClick={() => onModeChange("grid")}
        className={`flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium transition-colors ${
          mode === "grid"
            ? "bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 shadow-sm"
            : "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200"
        }`}
        aria-pressed={mode === "grid"}
        aria-label="Grid view"
      >
        <LayoutGrid className="h-4 w-4" />
        Grid
      </button>
      <button
        type="button"
        onClick={() => onModeChange("swipe")}
        className={`flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium transition-colors ${
          mode === "swipe"
            ? "bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 shadow-sm"
            : "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200"
        }`}
        aria-pressed={mode === "swipe"}
        aria-label="Swipe / Discover view"
      >
        <Sparkles className="h-4 w-4" />
        Discover
      </button>
    </div>
  );
}
