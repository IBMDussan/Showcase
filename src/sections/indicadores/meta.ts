import type { SectionMeta } from '@core/schemas/meta'

const meta: SectionMeta = {
  slug: 'indicadores',
  title: 'Evidencias e indicadores',
  subtitle: 'Resultados operativos Q1 — cobertura por actividad',
  owner: '@IBMDussan',
  status: 'draft',
  order: 2,
  cover: {
    type: 'stat',
    size: 'md',
    glyph: 'circle',
    headline: 'Evidencias e indicadores',
    eyebrow: 'RESULTADOS OPERATIVOS · Q1',
    metric: { value: '98 %', label: 'Promedio general' },
  },
  tags: ['indicadores', 'cobertura'],
}

export default meta
