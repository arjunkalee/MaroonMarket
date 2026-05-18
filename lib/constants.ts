/**
 * App-wide constants for TAMU Prediction Markets
 */

export const APP_NAME = "TAMU Markets";
export const APP_DESCRIPTION = "Predict and trade on Texas A&M campus events";

export const MARKET_CATEGORIES = [
  "All",
  "Sports",
  "Campus",
  "Academics",
  "Events",
] as const;

export type MarketCategory = (typeof MARKET_CATEGORIES)[number];

export const CREATE_MARKET_CATEGORIES = [
  "Sports",
  "Campus",
  "Academics",
  "Events",
] as const;
