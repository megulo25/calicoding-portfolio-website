/**
 * The next calendar quarter after `date` (build time for the static export),
 * e.g. November 2026 → "Q1 2027". Keeps the "accepting engagements" line from
 * going stale between deploys.
 */
export function nextAvailableQuarter(date: Date = new Date()): string {
  const quarter = Math.floor(date.getMonth() / 3) + 1
  return quarter === 4 ? `Q1 ${date.getFullYear() + 1}` : `Q${quarter + 1} ${date.getFullYear()}`
}
