import { z } from 'zod'

// ----------------------------------------------------------------
// Cover variants
// ----------------------------------------------------------------
export const CoverSizeSchema = z.enum(['sm', 'md', 'lg'])
export type CoverSize = z.infer<typeof CoverSizeSchema>

export const CoverTypeSchema = z.enum(['feature', 'stat', 'chart', 'list', 'type'])
export type CoverType = z.infer<typeof CoverTypeSchema>

export const GlyphSchema = z.enum([
  'ring',
  'circle',
  'square',
  'arc',
  'hexagon',
  'bars',
  'triangle',
  'diamond',
])
export type Glyph = z.infer<typeof GlyphSchema>

export const CoverSchema = z.object({
  type: CoverTypeSchema,
  size: CoverSizeSchema,
  glyph: GlyphSchema,
  /** Short headline shown on hub card */
  headline: z.string().min(1).max(120),
  /** Optional eyebrow label */
  eyebrow: z.string().max(60).optional(),
  /** Optional accent metric to show on the card */
  metric: z
    .object({
      value: z.string(),
      label: z.string(),
    })
    .optional(),
})
export type Cover = z.infer<typeof CoverSchema>

// ----------------------------------------------------------------
// Section meta
// ----------------------------------------------------------------
export const SectionStatusSchema = z.enum(['draft', 'ready', 'archived'])
export type SectionStatus = z.infer<typeof SectionStatusSchema>

export const SectionMetaSchema = z.object({
  slug: z
    .string()
    .regex(/^[a-z0-9-]+$/, 'Slug must be lowercase alphanumeric with hyphens'),
  title: z.string().min(1).max(80),
  subtitle: z.string().max(200).optional(),
  owner: z.string().default('TBD'),
  status: SectionStatusSchema.default('draft'),
  order: z.number().int().nonnegative(),
  cover: CoverSchema,
  tags: z.array(z.string()).default([]),
  updatedAt: z.string().datetime({ offset: true }).optional(),
})
export type SectionMeta = z.infer<typeof SectionMetaSchema>
