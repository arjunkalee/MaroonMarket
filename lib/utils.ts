/**
 * Shared formatting and utility functions
 */

export function formatMarketDate(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

export function formatVolume(volume: number): string {
  if (volume >= 1000) {
    return `$${(volume / 1000).toFixed(1)}k`;
  }
  return `$${volume}`;
}
