export interface Profile {
  id: string;
  email: string;
  username: string | null;
  display_name: string | null;
  avatar_url: string | null;
  balance: number;
  total_profit: number;
  created_at: string;
  updated_at: string;
}

export interface LeaderboardEntry {
  id: string;
  username: string | null;
  display_name: string | null;
  avatar_url: string | null;
  balance: number;
  total_profit: number;
  rank: number;
}

export type ProfileUpdate = Partial<
  Pick<Profile, "username" | "display_name" | "avatar_url">
>;
