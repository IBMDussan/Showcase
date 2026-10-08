import type { SectionMeta } from '@core/schemas/meta'

const meta: SectionMeta = {
  slug: 'respaldo',
  title: 'Modelo de respaldo',
  subtitle: 'Cumplimiento por responsable y actividad',
  owner: '@IBMDussan',
  status: 'draft',
  order: 3,
  cover: {
    type: 'stat',
    size: 'md',
    glyph: 'square',
    headline: 'Modelo de respaldo',
    eyebrow: 'RESULTADOS OPERATIVOS · Q1',
    metric: { value: '51 %', label: 'Promedio general' },
  },
  tags: ['respaldo', 'cobertura'],
}

export default meta
