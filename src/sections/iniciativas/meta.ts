import type { SectionMeta } from '@core/schemas/meta'

const meta: SectionMeta = {
  slug: 'iniciativas',
  title: 'Iniciativas',
  subtitle: 'Asistentes virtuales, automatizaciones y habilidades blandas',
  owner: '@IBMDussan',
  status: 'draft',
  order: 8,
  cover: {
    type: 'feature',
    size: 'lg',
    glyph: 'diamond',
    headline: 'Iniciativas estratégicas',
    eyebrow: 'INICIATIVAS · Q1 2026',
    metric: { value: '3', label: 'iniciativas activas' },
  },
  tags: ['iniciativas', 'automatización', 'IA'],
}

export default meta
