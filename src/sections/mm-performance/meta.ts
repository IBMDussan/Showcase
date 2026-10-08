import type { SectionMeta } from '@core/schemas/meta'

const meta: SectionMeta = {
  slug: 'mm-performance',
  title: 'MM Performance & Metrics',
  subtitle: 'Submissions y rating promedio Q1–Q2 2026',
  owner: '@IBMDussan',
  status: 'draft',
  order: 4,
  cover: {
    type: 'chart',
    size: 'sm',
    glyph: 'arc',
    headline: 'MM Performance',
    eyebrow: 'MM PERFORMANCE · Q1–Q2',
    metric: { value: '4,20', label: 'Avg rating' },
  },
  tags: ['MM', 'performance'],
}

export default meta
