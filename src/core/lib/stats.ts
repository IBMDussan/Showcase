// ----------------------------------------------------------------
// stats.ts — Statistical helper functions
// ----------------------------------------------------------------

/** Calculate the arithmetic mean of an array of numbers */
export function mean(values: number[]): number {
  if (values.length === 0) return 0
  return values.reduce((sum, v) => sum + v, 0) / values.length
}

/** Calculate the median of an array of numbers */
export function median(values: number[]): number {
  if (values.length === 0) return 0
  const sorted = [...values].sort((a, b) => a - b)
  const mid = Math.floor(sorted.length / 2)
  return sorted.length % 2 !== 0
    ? (sorted[mid] ?? 0)
    : ((sorted[mid - 1] ?? 0) + (sorted[mid] ?? 0)) / 2
}

/** Calculate the standard deviation */
export function stddev(values: number[]): number {
  if (values.length === 0) return 0
  const avg = mean(values)
  const squaredDiffs = values.map((v) => Math.pow(v - avg, 2))
  return Math.sqrt(mean(squaredDiffs))
}

/** Calculate min, max, mean, median of an array */
export function summarize(values: number[]): {
  min: number
  max: number
  mean: number
  median: number
  count: number
} {
  if (values.length === 0) {
    return { min: 0, max: 0, mean: 0, median: 0, count: 0 }
  }
  return {
    min: Math.min(...values),
    max: Math.max(...values),
    mean: mean(values),
    median: median(values),
    count: values.length,
  }
}

/** Calculate percentage change between two values */
export function percentChange(from: number, to: number): number {
  if (from === 0) return to === 0 ? 0 : 100
  return ((to - from) / Math.abs(from)) * 100
}

/** Normalize values to 0–1 range */
export function normalize(values: number[]): number[] {
  if (values.length === 0) return []
  const min = Math.min(...values)
  const max = Math.max(...values)
  const range = max - min
  if (range === 0) return values.map(() => 1)
  return values.map((v) => (v - min) / range)
}

/** Calculate weighted average */
export function weightedMean(values: number[], weights: number[]): number {
  if (values.length !== weights.length || values.length === 0) return 0
  const totalWeight = weights.reduce((sum, w) => sum + w, 0)
  if (totalWeight === 0) return 0
  const weightedSum = values.reduce((sum, v, i) => sum + v * (weights[i] ?? 0), 0)
  return weightedSum / totalWeight
}

/** Round to a given number of decimal places */
export function round(value: number, decimals = 2): number {
  const factor = Math.pow(10, decimals)
  return Math.round(value * factor) / factor
}
