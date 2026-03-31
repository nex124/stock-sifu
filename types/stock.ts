export interface Stock {
  name: string;
  fullName?: string;
  symbol: string;
  currentPrice: number;
  percentageChange: number;
  aiExplanation?: string;
}

export interface MarketSummary {
  gainers: Stock[];
  losers: Stock[];
  lastUpdated: string;
}

export type TimeRange = 'daily';
