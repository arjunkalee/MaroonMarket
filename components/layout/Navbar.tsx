"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { TrendingUp, Plus } from "lucide-react";
import ThemeToggle from "@/components/ui/ThemeToggle";
import { APP_NAME } from "@/lib/constants";

export default function Navbar() {
  const pathname = usePathname();

  return (
    <nav className="bg-white border-b border-gray-200 sticky top-0 z-50 dark:bg-gray-950 dark:border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link href="/" className="flex items-center space-x-2">
            <TrendingUp className="h-6 w-6 text-maroon-600" />
            <span className="text-xl font-bold text-gray-900 dark:text-gray-50">
              {APP_NAME}
            </span>
          </Link>

          <div className="flex items-center space-x-6">
            <Link
              href="/"
              className={`text-sm font-medium transition-colors ${
                pathname === "/"
                  ? "text-maroon-600"
                  : "text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-gray-50"
              }`}
            >
              Markets
            </Link>
            <Link
              href="/create"
              className="flex items-center space-x-1 px-4 py-2 bg-maroon-600 text-white rounded-lg hover:bg-maroon-700 transition-colors text-sm font-medium"
            >
              <Plus className="h-4 w-4" />
              <span>Create Market</span>
            </Link>
            <ThemeToggle />
            <div className="flex items-center space-x-2">
              <div className="h-8 w-8 rounded-full bg-maroon-100 flex items-center justify-center dark:bg-maroon-900/40">
                <span className="text-maroon-600 font-semibold text-sm">A</span>
              </div>
              <span className="text-sm font-medium text-gray-700 dark:text-gray-200">
                $1,250
              </span>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
