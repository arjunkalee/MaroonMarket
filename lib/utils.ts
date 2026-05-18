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

export function formatBalance(amount: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(amount);
}

export function displayUsername(entry: {
  username: string | null;
  display_name: string | null;
  email?: string;
}): string {
  if (entry.username) return entry.username;
  if (entry.display_name) return entry.display_name;
  if (entry.email) return entry.email.split("@")[0];
  return "Anonymous";
}
