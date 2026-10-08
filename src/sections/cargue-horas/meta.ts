import type { SectionMeta } from '@core/schemas/meta'

const meta: SectionMeta = {
  slug: 'cargue-horas',
  title: 'Cargue de horas: SAP vs TIME',
  subtitle: 'Personas con diferencia en cargue — tendencia a 0',
  owner: '@IBMDussan',
  status: 'draft',
  order: 5,
  cover: {
    type: 'stat',
    size: 'sm',
    glyph: 'hexagon',
    headline: 'Cargue de horas',
    eyebrow: 'SAP VS TIME · Q1',
    metric: { value: '0', label: 'Diferencias en abril' },
  },
  tags: ['SAP', 'TIME', 'horas'],
}

export default meta
