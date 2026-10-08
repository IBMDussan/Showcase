import { SectionContentSchema } from '@core/schemas/blocks'

const content = SectionContentSchema.parse({
  slides: [
    {
      id: 'slide-cargue-horas',
      title: 'Cargue de horas: SAP vs TIME',
      layout: 'default',
      blocks: [
        {
          type: 'metrics',
          columns: 2,
          items: [
            { label: 'Total personas con diferencia (ENE–ABR)', value: 4, unit: 'personas', threshold: 'optimal' },
            { label: 'Diferencias en abril', value: 0, unit: 'personas', threshold: 'perfect' },
          ],
        },
        {
          type: 'chart',
          chartType: 'line',
          title: 'Personas con diferencia por mes',
          caption: 'SAP vs TIME · ENE–ABR 2026',
          series: [
            {
              name: 'Personas con diferencia',
              data: [
                { x: '2026-01', y: 2 },
                { x: '2026-02', y: 1 },
                { x: '2026-03', y: 1 },
                { x: '2026-04', y: 0 },
              ],
            },
          ],
        },
        {
          type: 'text',
          variant: 'insight',
          body: 'Reducción del 100 % en abril frente a enero, logrando eliminar las diferencias en el cargue de horas. Tendencia general: disminución.',
        },
      ],
    },
  ],
})

export default content
