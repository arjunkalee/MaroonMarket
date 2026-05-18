"use client";

import { Trophy, Medal } from "lucide-react";
import { useAuth } from "@/components/auth/AuthProvider";
import { displayUsername, formatBalance } from "@/lib/utils";
import type { LeaderboardEntry } from "@/types/profile";

interface LeaderboardListProps {
  entries: LeaderboardEntry[];
}

function RankBadge({ rank }: { rank: number }) {
  if (rank === 1) {
    return (
      <span className="flex h-9 w-9 items-center justify-center rounded-full bg-amber-100 text-amber-700 dark:bg-amber-950 dark:text-amber-300">
        <Trophy className="h-4 w-4" />
      </span>
    );
  }
  if (rank === 2) {
    return (
      <span className="flex h-9 w-9 items-center justify-center rounded-full bg-gray-200 text-gray-700 dark:bg-gray-800 dark:text-gray-300">
        <Medal className="h-4 w-4" />
      </span>
    );
  }
  if (rank === 3) {
    return (
      <span className="flex h-9 w-9 items-center justify-center rounded-full bg-orange-100 text-orange-800 dark:bg-orange-950 dark:text-orange-300">
        <Medal className="h-4 w-4" />
      </span>
    );
  }
  return (
    <span className="flex h-9 w-9 items-center justify-center rounded-full bg-gray-100 text-sm font-semibold text-gray-600 dark:bg-gray-900 dark:text-gray-400">
      {rank}
    </span>
  );
}

export default function LeaderboardList({ entries }: LeaderboardListProps) {
  const { profile } = useAuth();
  const currentUserId = profile?.id;

  if (entries.length === 0) {
    return (
      <div className="rounded-lg border border-gray-200 bg-white p-12 text-center dark:border-gray-700 dark:bg-gray-900">
        <p className="text-gray-600 dark:text-gray-400">
          No traders yet. Be the first to sign up and claim the top spot.
        </p>
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-lg border border-gray-200 bg-white dark:border-gray-700 dark:bg-gray-900">
      <div className="hidden sm:grid grid-cols-[auto_1fr_auto] gap-4 border-b border-gray-200 bg-gray-50 px-6 py-3 text-xs font-semibold uppercase tracking-wide text-gray-500 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400">
        <span>Rank</span>
        <span>Trader</span>
        <span className="text-right">Balance</span>
      </div>
      <ul className="divide-y divide-gray-200 dark:divide-gray-700">
        {entries.map((entry) => {
          const name = displayUsername(entry);
          const isCurrentUser = entry.id === currentUserId;

          return (
            <li
              key={entry.id}
              className={`grid grid-cols-[auto_1fr_auto] items-center gap-4 px-4 py-4 sm:px-6 bg-white dark:bg-gray-900 ${
                isCurrentUser
                  ? "bg-maroon-50 dark:!bg-maroon-950/50"
                  : "hover:bg-gray-50 dark:hover:bg-gray-800"
              }`}
            >
              <RankBadge rank={entry.rank} />
              <div className="flex min-w-0 items-center gap-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-maroon-100 text-sm font-semibold text-maroon-700 dark:bg-maroon-900/50 dark:text-maroon-300">
                  {name.charAt(0).toUpperCase()}
                </div>
                <div className="min-w-0">
                  <p className="truncate font-medium text-gray-900 dark:text-gray-50">
                    {name}
                    {isCurrentUser && (
                      <span className="ml-2 text-xs font-normal text-maroon-600 dark:text-maroon-400">
                        (you)
                      </span>
                    )}
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400 sm:hidden">
                    Rank #{entry.rank}
                  </p>
                </div>
              </div>
              <p className="text-right text-lg font-bold text-gray-900 dark:text-gray-50">
                {formatBalance(entry.balance)}
              </p>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
