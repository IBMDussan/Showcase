import type { SectionMeta } from '@core/schemas/meta'

const meta: SectionMeta = {
  slug: 'iniciativas',
  title: 'Iniciativas',
  subtitle: 'Mejoras individuales del equipo — Promexma RPA y Automatizaciones',
  owner: '@IBMDussan',
  status: 'draft',
  order: 8,
  cover: {
    type: 'feature',
    size: 'lg',
    glyph: 'diamond',
    headline: 'Mejoras del equipo',
    eyebrow: 'INICIATIVAS · Q3',
    metric: { value: '4', label: 'flujos automatizados' },
  },
  tags: ['automatización', 'RPA', 'macros'],
}

export default meta
