"use client";

import * as React from "react";
import { useTheme } from "next-themes";
import { Moon, Sun } from "lucide-react";

export default function ThemeToggle() {
  const { theme, setTheme, systemTheme } = useTheme();
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => setMounted(true), []);

  if (!mounted) {
    return (
      <button
        type="button"
        aria-label="Toggle theme"
        className="h-9 w-9 rounded-lg border border-gray-200 bg-white hover:bg-gray-50 dark:border-gray-800 dark:bg-gray-950 dark:hover:bg-gray-900"
      />
    );
  }

  const resolvedTheme = theme === "system" ? systemTheme : theme;
  const isDark = resolvedTheme === "dark";

  return (
    <button
      type="button"
      aria-label="Toggle theme"
      onClick={() => setTheme(isDark ? "light" : "dark")}
      className="h-9 w-9 rounded-lg border border-gray-200 bg-white hover:bg-gray-50 transition-colors flex items-center justify-center dark:border-gray-800 dark:bg-gray-950 dark:hover:bg-gray-900"
      title={isDark ? "Switch to light" : "Switch to dark"}
    >
      {isDark ? (
        <Sun className="h-4 w-4 text-gray-700 dark:text-gray-200" />
      ) : (
        <Moon className="h-4 w-4 text-gray-700 dark:text-gray-200" />
      )}
    </button>
  );
}
