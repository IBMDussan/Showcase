import { SectionContentSchema } from '@core/schemas/blocks'

const content = SectionContentSchema.parse({
  slides: [
    {
      id: 'slide-kpis',
      title: 'Evidencias e indicadores',
      layout: 'default',
      blocks: [
        {
          type: 'metrics',
          columns: 4,
          items: [
            { label: 'Promedio general', value: 98, unit: '%', threshold: 'excellent' },
            { label: 'Indicadores en 100 %', value: '2/5', threshold: 'optimal' },
            { label: 'Indicadores ≥ 99 %', value: '3/5', threshold: 'excellent' },
            { label: 'Menor cumplimiento (Rastreos)', value: 93, unit: '%', threshold: 'optimal' },
          ],
        },
        {
          type: 'progress',
          title: 'Cobertura por actividad',
          items: [
            { label: 'Traspasos',          current: 100, goal: 100, threshold: 'perfect' },
            { label: 'Depuraciones',       current: 100, goal: 100, threshold: 'perfect' },
            { label: 'Cheques devueltos',  current: 99,  goal: 100, threshold: 'excellent' },
            { label: 'Cadenas productivas',current: 98,  goal: 100, threshold: 'excellent' },
            { label: 'Rastreos',           current: 93,  goal: 100, threshold: 'optimal' },
          ],
        },
      ],
    },
    {
      id: 'slide-volumen',
      title: 'Resultados operativos por actividad y mes',
      layout: 'default',
      blocks: [
        {
          type: 'chart',
          chartType: 'bar',
          title: 'Volumen por actividad y mes',
          caption: 'Fuente: sistema interno · ENE–ABR 2026',
          series: [
            {
              name: 'Rastreos',
              data: [
                { x: '2026-01', y: 3448 },
                { x: '2026-02', y: 3655 },
                { x: '2026-03', y: 3731 },
                { x: '2026-04', y: 4098 },
              ],
            },
            {
              name: 'Procesos Promexma',
              data: [
                { x: '2026-01', y: 1403 },
                { x: '2026-02', y: 1402 },
                { x: '2026-03', y: 1642 },
                { x: '2026-04', y: 1463 },
              ],
            },
            {
              name: 'Conciliaciones Bancarias',
              data: [
                { x: '2026-01', y: 1123 },
                { x: '2026-02', y: 1089 },
                { x: '2026-03', y: 1524 },
                { x: '2026-04', y: 1179 },
              ],
            },
          ],
        },
        {
          type: 'text',
          variant: 'insight',
          body: '4 098 rastreos en abril, el mes de mayor volumen del periodo. Conciliaciones alcanzaron su pico en marzo con 1 524 operaciones.',
        },
      ],
    },
  ],
})

export default content
