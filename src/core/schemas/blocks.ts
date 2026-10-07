import { z } from 'zod'
import { MetricSchema, ProgressItemSchema, DataSeriesSchema, HeatmapCellSchema, TableRowSchema, RetroItemSchema, ActionItemSchema, InitiativeSchema } from './content'

// ----------------------------------------------------------------
// Slide block types — each slide contains one or more blocks
// ----------------------------------------------------------------

export const HeroBlockSchema = z.object({
  type: z.literal('hero'),
  period: z.string(),
  area: z.string(),
  title: z.string(),
  subtitle: z.string().optional(),
  metrics: z.array(MetricSchema).max(6).optional(),
})
export type HeroBlock = z.infer<typeof HeroBlockSchema>

export const MetricsBlockSchema = z.object({
  type: z.literal('metrics'),
  items: z.array(MetricSchema).min(1).max(12),
  columns: z.number().int().min(1).max(4).optional(),
})
export type MetricsBlock = z.infer<typeof MetricsBlockSchema>

export const ProgressBlockSchema = z.object({
  type: z.literal('progress'),
  title: z.string().optional(),
  items: z.array(ProgressItemSchema).min(1),
})
export type ProgressBlock = z.infer<typeof ProgressBlockSchema>

export const ChartBlockSchema = z.object({
  type: z.literal('chart'),
  chartType: z.enum(['bar', 'line', 'combo', 'sparkline', 'bullet']),
  title: z.string().optional(),
  series: z.array(DataSeriesSchema),
  caption: z.string().optional(),
})
export type ChartBlock = z.infer<typeof ChartBlockSchema>

export const HeatmapBlockSchema = z.object({
  type: z.literal('heatmap'),
  title: z.string().optional(),
  rows: z.array(z.string()),
  cols: z.array(z.string()),
  cells: z.array(HeatmapCellSchema),
  caption: z.string().optional(),
})
export type HeatmapBlock = z.infer<typeof HeatmapBlockSchema>

export const TableBlockSchema = z.object({
  type: z.literal('table'),
  title: z.string().optional(),
  columns: z.array(
    z.object({
      key: z.string(),
      label: z.string(),
      type: z.enum(['text', 'number', 'percent', 'status', 'bar']).default('text'),
      width: z.string().optional(),
    }),
  ),
  rows: z.array(TableRowSchema),
  caption: z.string().optional(),
})
export type TableBlock = z.infer<typeof TableBlockSchema>

export const RetroBlockSchema = z.object({
  type: z.literal('retro'),
  title: z.string().optional(),
  items: z.array(RetroItemSchema),
})
export type RetroBlock = z.infer<typeof RetroBlockSchema>

export const ActionsBlockSchema = z.object({
  type: z.literal('actions'),
  title: z.string().optional(),
  items: z.array(ActionItemSchema),
})
export type ActionsBlock = z.infer<typeof ActionsBlockSchema>

export const InitiativesBlockSchema = z.object({
  type: z.literal('initiatives'),
  title: z.string().optional(),
  items: z.array(InitiativeSchema),
})
export type InitiativesBlock = z.infer<typeof InitiativesBlockSchema>

export const TextBlockSchema = z.object({
  type: z.literal('text'),
  heading: z.string().optional(),
  body: z.string(),
  variant: z.enum(['default', 'insight', 'callout', 'warning']).optional().default('default'),
})
export type TextBlock = z.infer<typeof TextBlockSchema>

export const ImageBlockSchema = z.object({
  type: z.literal('image'),
  src: z.string().optional(),
  alt: z.string(),
  brief: z.string().optional(),
  caption: z.string().optional(),
  aspect: z.enum(['16/9', '4/3', '1/1', 'free']).default('16/9'),
})
export type ImageBlock = z.infer<typeof ImageBlockSchema>

// ----------------------------------------------------------------
// Union of all block types
// ----------------------------------------------------------------
export const AnyBlockSchema = z.discriminatedUnion('type', [
  HeroBlockSchema,
  MetricsBlockSchema,
  ProgressBlockSchema,
  ChartBlockSchema,
  HeatmapBlockSchema,
  TableBlockSchema,
  RetroBlockSchema,
  ActionsBlockSchema,
  InitiativesBlockSchema,
  TextBlockSchema,
  ImageBlockSchema,
])
export type AnyBlock = z.infer<typeof AnyBlockSchema>

// ----------------------------------------------------------------
// Slide schema
// ----------------------------------------------------------------
export const SlideSchema = z.object({
  id: z.string(),
  title: z.string().optional(),
  layout: z.enum(['default', 'split', 'full', 'grid', 'focus']).default('default'),
  blocks: z.array(AnyBlockSchema).min(1),
})
export type Slide = z.infer<typeof SlideSchema>

// ----------------------------------------------------------------
// Section content schema
// ----------------------------------------------------------------
export const SectionContentSchema = z.object({
  slides: z.array(SlideSchema).min(1),
})
export type SectionContent = z.infer<typeof SectionContentSchema>
