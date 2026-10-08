import { SectionContentSchema } from '@core/schemas/blocks'

const content = SectionContentSchema.parse({
  slides: [
    {
      id: 'slide-mm-kpis',
      title: 'MM Performance & Metrics',
      layout: 'default',
      blocks: [
        {
          type: 'metrics',
          columns: 4,
          items: [
            { label: 'Avg Rating',            value: '4,20', threshold: 'excellent' },
            { label: '# of Submissions',      value: '269',  threshold: 'excellent' },
            { label: 'MM Part % (5×5)',        value: '58,5 %', threshold: 'optimal' },
            { label: 'MM Part % (2×5)',        value: '146,2 %', threshold: 'perfect' },
          ],
        },
        {
          type: 'chart',
          chartType: 'combo',
          title: 'MM Submissions y Avg Rating',
          caption: 'Fuente: MM Portal · ENE–ABR 2026',
          series: [
            {
              name: 'Submissions',
              data: [
                { x: '2026-01', y: 60 },
                { x: '2026-02', y: 76 },
                { x: '2026-03', y: 72 },
                { x: '2026-04', y: 61 },
              ],
            },
            {
              name: 'Avg Rating',
              data: [
                { x: '2026-01', y: 4.07 },
                { x: '2026-02', y: 4.12 },
                { x: '2026-03', y: 4.33 },
                { x: '2026-04', y: 4.26 },
              ],
            },
          ],
        },
        {
          type: 'text',
          variant: 'insight',
          body: 'Rating en tendencia positiva: pico de 4,33 en marzo. Volumen estable en torno a 67 submissions por mes en promedio.',
        },
      ],
    },
  ],
})

export default content
