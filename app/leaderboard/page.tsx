import { Trophy } from "lucide-react";
import LeaderboardList from "@/components/leaderboard/LeaderboardList";
import { getLeaderboard } from "@/lib/db/profiles";

export const dynamic = "force-dynamic";

export default async function LeaderboardPage() {
  let entries: Awaited<ReturnType<typeof getLeaderboard>> = [];
  let error: string | null = null;

  try {
    entries = await getLeaderboard();
  } catch (e) {
    error = e instanceof Error ? e.message : "Could not load leaderboard.";
  }

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8 flex items-start gap-4">
        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-maroon-100 dark:bg-maroon-900/50">
          <Trophy className="h-6 w-6 text-maroon-600 dark:text-maroon-400" />
        </div>
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-50">
            Leaderboard
          </h1>
          <p className="mt-1 text-gray-600 dark:text-gray-300">
            Top traders ranked by account balance — highest first.
          </p>
        </div>
      </div>

      {error ? (
        <div className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700 dark:border-red-900 dark:bg-red-950/50 dark:text-red-300">
          {error}
        </div>
      ) : (
        <LeaderboardList entries={entries} />
      )}
    </div>
  );
}
