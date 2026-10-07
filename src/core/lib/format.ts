// ----------------------------------------------------------------
// format.ts — Number and string formatting utilities
// ----------------------------------------------------------------

const NUMBER_LOCALE = 'es-CO'

/** Format a number as a percentage string (e.g. 0.955 → "95.5%") */
export function formatPercent(value: number, decimals = 1): string {
  return new Intl.NumberFormat(NUMBER_LOCALE, {
    style: 'percent',
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  }).format(value)
}

/** Format a plain percentage (0–100 range, e.g. 95.5 → "95.5%") */
export function formatPercentPlain(value: number, decimals = 1): string {
  return formatPercent(value / 100, decimals)
}

/** Format a number with thousands separators */
export function formatNumber(value: number, decimals = 0): string {
  return new Intl.NumberFormat(NUMBER_LOCALE, {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  }).format(value)
}

/** Format a currency value in COP */
export function formatCurrency(value: number, currency = 'COP'): string {
  return new Intl.NumberFormat(NUMBER_LOCALE, {
    style: 'currency',
    currency,
    maximumFractionDigits: 0,
  }).format(value)
}

/** Format a duration in hours (e.g. 1.5 → "1h 30min") */
export function formatHours(hours: number): string {
  const h = Math.floor(hours)
  const m = Math.round((hours - h) * 60)
  if (h === 0) return `${m}min`
  if (m === 0) return `${h}h`
  return `${h}h ${m}min`
}

/** Compact number format (e.g. 1500 → "1.5K") */
export function formatCompact(value: number): string {
  return new Intl.NumberFormat(NUMBER_LOCALE, {
    notation: 'compact',
    maximumFractionDigits: 1,
  }).format(value)
}

/** Clamp a number between min and max */
export function clamp(value: number, min: number, max: number): number {
  return Math.min(Math.max(value, min), max)
}

/** Format a delta value with sign (e.g. +3.5%, -2.1%) */
export function formatDelta(value: number, decimals = 1): string {
  const sign = value >= 0 ? '+' : ''
  return `${sign}${value.toFixed(decimals)}%`
}
