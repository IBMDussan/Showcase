import { SectionContentSchema } from '@core/schemas/blocks'

const content = SectionContentSchema.parse({
  slides: [
    {
      id: 'slide-respaldo',
      title: 'Cumplimiento por responsable',
      layout: 'default',
      blocks: [
        {
          type: 'metrics',
          columns: 1,
          items: [
            { label: 'Promedio general de respaldo', value: 51, unit: '%', threshold: 'attention' },
          ],
        },
        {
          type: 'heatmap',
          title: 'Cobertura de respaldo por actividad',
          rows: ['Alejandro Gavilanes', 'Mónica Díaz', 'Daniel Dussan', 'Paola Vija', 'Vanessa Aldana', 'María Alejandra Ruiz'],
          cols: ['Rastreos', 'Proc. Promexma', 'Conciliaciones', 'Cadenas Prod.', 'Ingresos BO', 'Traspasos'],
          cells: [
            { row: 'Alejandro Gavilanes',    col: 'Rastreos',       value: 100 },
            { row: 'Alejandro Gavilanes',    col: 'Proc. Promexma', value: 20  },
            { row: 'Alejandro Gavilanes',    col: 'Conciliaciones', value: 0   },
            { row: 'Alejandro Gavilanes',    col: 'Cadenas Prod.',  value: 0   },
            { row: 'Alejandro Gavilanes',    col: 'Ingresos BO',    value: 0   },
            { row: 'Alejandro Gavilanes',    col: 'Traspasos',      value: 50  },
            { row: 'Mónica Díaz',            col: 'Rastreos',       value: 100 },
            { row: 'Mónica Díaz',            col: 'Proc. Promexma', value: 0   },
            { row: 'Mónica Díaz',            col: 'Conciliaciones', value: 0   },
            { row: 'Mónica Díaz',            col: 'Cadenas Prod.',  value: 0   },
            { row: 'Mónica Díaz',            col: 'Ingresos BO',    value: 0   },
            { row: 'Mónica Díaz',            col: 'Traspasos',      value: 0   },
            { row: 'Daniel Dussan',          col: 'Rastreos',       value: 50  },
            { row: 'Daniel Dussan',          col: 'Proc. Promexma', value: 100 },
            { row: 'Daniel Dussan',          col: 'Conciliaciones', value: 0   },
            { row: 'Daniel Dussan',          col: 'Cadenas Prod.',  value: 0   },
            { row: 'Daniel Dussan',          col: 'Ingresos BO',    value: 0   },
            { row: 'Daniel Dussan',          col: 'Traspasos',      value: 0   },
            { row: 'Paola Vija',             col: 'Rastreos',       value: 100 },
            { row: 'Paola Vija',             col: 'Proc. Promexma', value: 100 },
            { row: 'Paola Vija',             col: 'Conciliaciones', value: 100 },
            { row: 'Paola Vija',             col: 'Cadenas Prod.',  value: 80  },
            { row: 'Paola Vija',             col: 'Ingresos BO',    value: 80  },
            { row: 'Paola Vija',             col: 'Traspasos',      value: 80  },
            { row: 'Vanessa Aldana',         col: 'Rastreos',       value: 50  },
            { row: 'Vanessa Aldana',         col: 'Proc. Promexma', value: 100 },
            { row: 'Vanessa Aldana',         col: 'Conciliaciones', value: 0   },
            { row: 'Vanessa Aldana',         col: 'Cadenas Prod.',  value: 100 },
            { row: 'Vanessa Aldana',         col: 'Ingresos BO',    value: 100 },
            { row: 'Vanessa Aldana',         col: 'Traspasos',      value: 0   },
            { row: 'María Alejandra Ruiz',   col: 'Rastreos',       value: 100 },
            { row: 'María Alejandra Ruiz',   col: 'Proc. Promexma', value: 100 },
            { row: 'María Alejandra Ruiz',   col: 'Conciliaciones', value: 80  },
            { row: 'María Alejandra Ruiz',   col: 'Cadenas Prod.',  value: 30  },
            { row: 'María Alejandra Ruiz',   col: 'Ingresos BO',    value: 100 },
            { row: 'María Alejandra Ruiz',   col: 'Traspasos',      value: 100 },
          ],
        },
        {
          type: 'text',
          variant: 'callout',
          heading: 'Foco de mejora',
          body: 'Promedio general de respaldo en 51 %. La meta para Q2 es alcanzar el 80 % en todas las actividades para todos los integrantes.',
        },
      ],
    },
  ],
})

export default content
