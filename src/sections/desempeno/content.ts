import { SectionContentSchema } from '@core/schemas/blocks'

const content = SectionContentSchema.parse({
  slides: [
    {
      id: 'slide-desempeno',
      title: 'Métricas de desempeño',
      layout: 'default',
      blocks: [
        {
          type: 'table',
          title: 'Métricas de desempeño Q1',
          columns: [
            { key: 'name',          label: 'Consultor',           type: 'text'    },
            { key: 'goal',          label: 'Current Year Goal',   type: 'percent' },
            { key: 'cv',            label: 'CV Up-to-date',       type: 'percent' },
            { key: 'jrs',           label: 'JRS & Skills',        type: 'status'  },
            { key: 'timely',        label: 'Timely Claim',        type: 'percent' },
            { key: 'hours',         label: 'Hours Accuracy',      type: 'percent' },
            { key: 'learning',      label: 'Your Learning',       type: 'text'    },
          ],
          rows: [
            { name: 'María Alejandra Ruiz',     goal: 97.4,  cv: 100,  jrs: 'Met', timely: 100,  hours: 100,  learning: '7.5'  },
            { name: 'Lina Paola Vija',          goal: 97.2,  cv: 100,  jrs: 'Met', timely: 100,  hours: 100,  learning: '13'   },
            { name: 'Juan Alejandro Gavilanes', goal: 97.2,  cv: 100,  jrs: 'Met', timely: 100,  hours: 89,   learning: '28'   },
            { name: 'Daniel Santiago Dussan',   goal: 97.6,  cv: 88,   jrs: 'Met', timely: 100,  hours: 58,   learning: '51'   },
            { name: 'Vanessa Aldana',           goal: 97.6,  cv: 100,  jrs: 'Met', timely: 100,  hours: 100,  learning: '49'   },
            { name: 'Mónica Marcela Díaz',      goal: 97.4,  cv: 44,   jrs: 'Met', timely: 100,  hours: 41,   learning: '10'   },
          ],
          caption: 'Fuente: sistema de desempeño IBM · Q1 2026',
        },
      ],
    },
  ],
})

export default content
