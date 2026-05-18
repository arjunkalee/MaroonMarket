export type MarketStatus = 'open' | 'closed' | 'resolved';
export type MarketOutcome = 'yes' | 'no';

export interface Market {
  id: string;
  title: string;
  description: string;
  category: string;
  status: MarketStatus;
  yesPrice: number; // 0-100 cents
  noPrice: number; // 0-100 cents
  volume: number;
  liquidity: number;
  endDate: string; // ISO string
  createdAt: string;
  createdBy: string;
  resolutionDate?: string;
  resolvedOutcome?: MarketOutcome;
}

