import { z } from 'zod'

// ----------------------------------------------------------------
// Reusable primitive blocks
// ----------------------------------------------------------------

/** A single KPI metric */
export const MetricSchema = z.object({
  label: z.string(),
  value: z.union([z.string(), z.number()]),
  delta: z
    .object({
      value: z.number(),
      label: z.string().optional(),
      direction: z.enum(['up', 'down', 'neutral']).optional(),
    })
    .optional(),
  threshold: z
    .enum(['perfect', 'excellent', 'optimal', 'attention'])
    .optional(),
  unit: z.string().optional(),
  note: z.string().optional(),
})
export type Metric = z.infer<typeof MetricSchema>

/** A progress item (label + current/goal) */
export const ProgressItemSchema = z.object({
  label: z.string(),
  current: z.number().min(0).max(100),
  goal: z.number().min(0).max(100).default(100),
  threshold: z
    .enum(['perfect', 'excellent', 'optimal', 'attention'])
    .optional(),
})
export type ProgressItem = z.infer<typeof ProgressItemSchema>

/** A person reference (anonymizable) */
export const PersonSchema = z.object({
  name: z.string(),
  role: z.string().optional(),
  avatar: z.string().url().optional(),
})
export type Person = z.infer<typeof PersonSchema>

/** A named time period */
export const PeriodSchema = z.object({
  label: z.string(),
  start: z.string().optional(),
  end: z.string().optional(),
})
export type Period = z.infer<typeof PeriodSchema>

/** A generic data point for charts */
export const DataPointSchema = z.object({
  x: z.union([z.string(), z.number()]),
  y: z.number(),
  label: z.string().optional(),
  color: z.string().optional(),
})
export type DataPoint = z.infer<typeof DataPointSchema>

/** A series of data points */
export const DataSeriesSchema = z.object({
  name: z.string(),
  data: z.array(DataPointSchema),
  color: z.string().optional(),
})
export type DataSeries = z.infer<typeof DataSeriesSchema>

/** Heatmap cell value */
export const HeatmapCellSchema = z.object({
  row: z.string(),
  col: z.string(),
  value: z.number(),
  label: z.string().optional(),
})
export type HeatmapCell = z.infer<typeof HeatmapCellSchema>

/** A table row — flexible key/value */
export const TableRowSchema = z.record(z.string(), z.union([z.string(), z.number(), z.boolean()]))
export type TableRow = z.infer<typeof TableRowSchema>

/** A retro item */
export const RetroItemSchema = z.object({
  id: z.string(),
  category: z.enum(['went-well', 'improve', 'action']),
  text: z.string(),
  author: z.string().optional(),
  votes: z.number().int().nonnegative().default(0),
})
export type RetroItem = z.infer<typeof RetroItemSchema>

/** An action/task item */
export const ActionItemSchema = z.object({
  id: z.string(),
  text: z.string(),
  owner: z.string().optional(),
  dueDate: z.string().optional(),
  status: z.enum(['pending', 'in-progress', 'done', 'blocked']).default('pending'),
  priority: z.enum(['high', 'medium', 'low']).default('medium'),
})
export type ActionItem = z.infer<typeof ActionItemSchema>

/** An initiative */
export const InitiativeSchema = z.object({
  id: z.string(),
  title: z.string(),
  description: z.string().optional(),
  status: z.enum(['planned', 'active', 'completed', 'paused', 'cancelled']),
  owner: z.string().optional(),
  impact: z.enum(['high', 'medium', 'low']).optional(),
  progress: z.number().min(0).max(100).optional(),
  tags: z.array(z.string()).default([]),
  items: z
    .array(
      z.object({
        id: z.string(),
        title: z.string(),
        status: z.enum(['planned', 'active', 'completed', 'paused', 'cancelled']),
        description: z.string().optional(),
        owner: z.string().optional(),
      }),
    )
    .default([]),
})
export type Initiative = z.infer<typeof InitiativeSchema>
