export type MarketStatus = "open" | "closed" | "resolved";

export type MarketOutcome = "yes" | "no";

export interface Market {
  id: string;
  title: string;
  description: string;
  category: string;
  status: MarketStatus;
  yesPrice: number; // Price per share (0-100)
  noPrice: number; // Price per share (0-100)
  volume: number; // Total volume traded
  liquidity: number; // Available liquidity
  endDate: string; // ISO date string
  resolutionDate?: string; // ISO date string
  resolvedOutcome?: MarketOutcome;
  createdAt: string;
  createdBy: string;
}

export interface MarketPosition {
  marketId: string;
  outcome: MarketOutcome;
  shares: number;
  averagePrice: number;
}
