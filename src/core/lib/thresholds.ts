// ----------------------------------------------------------------
// thresholds.ts — Performance threshold evaluation
// Umbrales: Perfecto 100% · Excelente ≥95% · Óptimo ≥90% · Requiere atención <90%
// ----------------------------------------------------------------

export type ThresholdLevel = 'perfect' | 'excellent' | 'optimal' | 'attention'

export interface ThresholdConfig {
  perfect: number    // must equal this value (100)
  excellent: number  // must be >= this value (95)
  optimal: number    // must be >= this value (90)
  // below optimal → 'attention'
}

export const DEFAULT_THRESHOLDS: ThresholdConfig = {
  perfect: 100,
  excellent: 95,
  optimal: 90,
}

/** Evaluate a percentage value (0–100) against thresholds */
export function evaluateThreshold(
  value: number,
  config: ThresholdConfig = DEFAULT_THRESHOLDS,
): ThresholdLevel {
  if (value >= config.perfect) return 'perfect'
  if (value >= config.excellent) return 'excellent'
  if (value >= config.optimal) return 'optimal'
  return 'attention'
}

/** CSS variable name for a threshold level */
export function thresholdColorVar(level: ThresholdLevel): string {
  return `var(--color-threshold-${level})`
}

/** Human-readable label for a threshold level */
export function thresholdLabel(level: ThresholdLevel): string {
  const labels: Record<ThresholdLevel, string> = {
    perfect: 'Perfecto',
    excellent: 'Excelente',
    optimal: 'Óptimo',
    attention: 'Requiere atención',
  }
  return labels[level]
}

/** Evaluate and return both level and color variable */
export function getThreshold(
  value: number,
  config?: ThresholdConfig,
): { level: ThresholdLevel; color: string; label: string } {
  const level = evaluateThreshold(value, config)
  return {
    level,
    color: thresholdColorVar(level),
    label: thresholdLabel(level),
  }
}
