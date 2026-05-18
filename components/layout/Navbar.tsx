"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LogOut, Plus, TrendingUp } from "lucide-react";
import ThemeToggle from "@/components/ui/ThemeToggle";
import { useAuth } from "@/components/auth/AuthProvider";
import { APP_NAME } from "@/lib/constants";

function formatBalance(amount: number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(amount);
}

export default function Navbar() {
  const pathname = usePathname();
  const { profile, signOut } = useAuth();

  const displayLabel =
    profile?.username ?? profile?.display_name ?? profile?.email ?? "?";
  const initial = displayLabel.charAt(0).toUpperCase();
  const balance = profile?.balance ?? 1250;

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

          <div className="flex items-center space-x-4 sm:space-x-6">
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
              <span className="hidden sm:inline">Create Market</span>
            </Link>
            <ThemeToggle />
            <div className="flex items-center space-x-2 border-l border-gray-200 pl-4 dark:border-gray-800">
              <div className="h-8 w-8 rounded-full bg-maroon-100 flex items-center justify-center dark:bg-maroon-900/40">
                <span className="text-maroon-600 font-semibold text-sm">
                  {initial}
                </span>
              </div>
              <div className="hidden sm:block">
                <p className="text-sm font-medium text-gray-900 dark:text-gray-50 leading-tight">
                  {displayLabel}
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  {formatBalance(balance)}
                </p>
              </div>
              <button
                type="button"
                onClick={() => signOut()}
                className="p-2 text-gray-500 hover:text-maroon-600 dark:text-gray-400 dark:hover:text-maroon-400"
                title="Sign out"
              >
                <LogOut className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
