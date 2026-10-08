import { SectionContentSchema } from '@core/schemas/blocks'

const content = SectionContentSchema.parse({
  slides: [
    {
      id: 'slide-iniciativas',
      title: 'Presentación de iniciativas',
      layout: 'default',
      blocks: [
        {
          type: 'initiatives',
          title: 'Iniciativas estratégicas Q1 2026',
          items: [
            {
              id: 'init-1',
              title: 'Asistentes Virtuales IBM Consulting Assistant',
              description: 'Procedimiento backoffice asistido por IA para las 6 actividades principales del área. Fine-tuning en progreso.',
              status: 'active',
              impact: 'high',
              progress: 65,
              tags: ['IA', 'IBM Consulting Assistant'],
              items: [
                { id: 'i1-1', title: 'DTP Rastreo de pagos',          status: 'active',    owner: 'Equipo' },
                { id: 'i1-2', title: 'DTP Cheques devueltos Promexma', status: 'active',    owner: 'Equipo' },
                { id: 'i1-3', title: 'DTP Cadenas Productivas',        status: 'active',    owner: 'Equipo' },
                { id: 'i1-4', title: 'DTP Conciliaciones',             status: 'active',    owner: 'Equipo' },
                { id: 'i1-5', title: 'DTP Ingresos Promexma',          status: 'active',    owner: 'Equipo' },
                { id: 'i1-6', title: 'DTP Traspasos Intercompañías',   status: 'active',    owner: 'Equipo' },
              ],
            },
            {
              id: 'init-2',
              title: 'Automatizaciones',
              description: 'Implementación de macros para reportes del área. 5 macros activas cubriendo las actividades críticas.',
              status: 'completed',
              impact: 'high',
              progress: 100,
              tags: ['VBA', 'SAP Scripting', 'macros'],
              items: [
                { id: 'i2-1', title: 'RPA: Promexma — automatización general',    status: 'completed', owner: 'Daniel Dussan'       },
                { id: 'i2-2', title: 'Macro: Cheques devueltos',                  status: 'completed', owner: 'Automatizaciones'    },
                { id: 'i2-3', title: 'Macro: Ingresos',                           status: 'completed', owner: 'Automatizaciones'    },
                { id: 'i2-4', title: 'Macro: Depuraciones de saldos menores',     status: 'completed', owner: 'Automatizaciones'    },
                { id: 'i2-5', title: 'Macro: Cancelación de ingresos',            status: 'completed', owner: 'Automatizaciones'    },
              ],
            },
            {
              id: 'init-3',
              title: 'Habilidades Blandas y Capacitación',
              description: 'Fortalecimiento del equipo como unidad operativa mediante competencias clave, IA y liderazgo.',
              status: 'active',
              impact: 'medium',
              progress: 50,
              tags: ['capacitación', 'liderazgo', 'IA'],
              items: [
                { id: 'i3-1', title: 'Competencias Interpersonales',        status: 'active',    owner: 'Equipo' },
                { id: 'i3-2', title: 'Programa de Capacitaciones',          status: 'active',    owner: 'Equipo' },
                { id: 'i3-3', title: 'Repositorio de Videocapacitación',    status: 'active',    owner: 'Equipo' },
                { id: 'i3-4', title: 'Formación: Champion Agile',           status: 'completed', owner: 'Equipo' },
                { id: 'i3-5', title: 'Webinar: Fundamentos IA',             status: 'completed', owner: 'Equipo' },
              ],
            },
          ],
        },
      ],
    },
  ],
})

export default content
