/**
 * _template/meta.ts
 *
 * This file is the scaffold for new sections.
 * Copy this folder with `npm run new:section -- <slug>` and fill in the values.
 *
 * NOTE: The registry ignores all sections whose slug starts with `_`.
 */
import type { SectionMeta } from '@core/schemas/meta'

const meta: SectionMeta = {
  slug: '_template',
  title: 'Template Section',
  subtitle: 'Short description of the section (optional)',
  owner: 'TBD',
  status: 'draft',
  order: 999,
  cover: {
    type: 'type',
    size: 'sm',
    glyph: 'circle',
    headline: 'Template headline',
    eyebrow: 'Template',
  },
  tags: ['template'],
}

export default meta
