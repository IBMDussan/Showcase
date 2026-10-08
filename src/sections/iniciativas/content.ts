/**
 * iniciativas/content.ts
 *
 * Mejoras del equipo BackOffice CashApps — Q3
 * Divididas por integrante: Promexma RPA y Automatizaciones
 */
import { SectionContentSchema } from '@core/schemas/blocks'

const content = SectionContentSchema.parse({
  slides: [
    {
      id: 'slide-cover',
      title: 'Mejoras del equipo',
      layout: 'focus',
      blocks: [
        {
          type: 'hero',
          period: 'Q3 2025',
          area: 'BackOffice CashApps',
          title: 'Mejoras del equipo',
          subtitle: 'Iniciativas individuales de automatización y eficiencia operativa implementadas en el periodo',
          metrics: [
            { label: 'Iniciativas implementadas', value: '4', threshold: 'perfect' },
            { label: 'Reducción de error humano', value: '99 %', threshold: 'perfect' },
          ],
        },
      ],
    },
    {
      id: 'slide-promexma-rpa',
      title: 'Promexma RPA',
      layout: 'split',
      blocks: [
        {
          type: 'initiatives',
          title: 'Promexma RPA',
          items: [
            {
              id: 'rpa-1',
              title: 'Bot de ingresos del área',
              description:
                'Implementación de bot RPA para automatizar los ingresos del área, con arquitectura escalable que prevé la futura implementación en los demás procesos del BackOffice.',
              status: 'active',
              impact: 'high',
              progress: 100,
              tags: ['RPA', 'automatización', 'ingresos'],
              items: [
                {
                  id: 'rpa-1-1',
                  title: 'Depuraciones automatizadas',
                  status: 'completed',
                  owner: 'Promexma',
                },
                {
                  id: 'rpa-1-2',
                  title: 'Cancelaciones automatizadas',
                  status: 'completed',
                  owner: 'Promexma',
                },
                {
                  id: 'rpa-1-3',
                  title: 'Reprocesos automatizados',
                  status: 'completed',
                  owner: 'Promexma',
                },
                {
                  id: 'rpa-1-4',
                  title: 'Expansión a otros procesos',
                  status: 'planned',
                  owner: 'Promexma',
                },
              ],
            },
          ],
        },
        {
          type: 'text',
          variant: 'insight',
          body: 'Bot implementado en producción cubre el 100 % del flujo de ingresos; arquitectura modular lista para escalar a los demás procesos del área',
        },
      ],
    },
    {
      id: 'slide-automatizaciones',
      title: 'Automatizaciones',
      layout: 'default',
      blocks: [
        {
          type: 'initiatives',
          title: 'Automatizaciones',
          items: [
            {
              id: 'macro-1',
              title: 'Macro depuraciones',
              description:
                'Implementación de macro para depuraciones masivas, eliminando la intervención manual en cada registro y reduciendo el error humano en un 99 %.',
              status: 'completed',
              impact: 'high',
              progress: 100,
              tags: ['macro', 'depuraciones', 'eficiencia'],
              items: [
                {
                  id: 'macro-1-1',
                  title: 'Depuración masiva en lote',
                  status: 'completed',
                  owner: 'Automatizaciones',
                },
                {
                  id: 'macro-1-2',
                  title: 'Validación automática de registros',
                  status: 'completed',
                  owner: 'Automatizaciones',
                },
              ],
            },
            {
              id: 'macro-2',
              title: 'Macro conciliaciones',
              description:
                'Automatización de la revisión de conciliaciones pendientes: carga de extractos, cruce de movimientos, identificación de diferencias y generación de reporte consolidado. Reduce el tiempo de cierre y garantiza trazabilidad de cada conciliación.',
              status: 'active',
              impact: 'high',
              progress: 80,
              tags: ['macro', 'conciliaciones', 'cierre'],
              items: [
                {
                  id: 'macro-2-1',
                  title: 'Carga y cruce de extractos',
                  status: 'completed',
                  owner: 'Automatizaciones',
                },
                {
                  id: 'macro-2-2',
                  title: 'Identificación de diferencias',
                  status: 'completed',
                  owner: 'Automatizaciones',
                },
                {
                  id: 'macro-2-3',
                  title: 'Reporte consolidado de pendientes',
                  status: 'active',
                  owner: 'Automatizaciones',
                },
              ],
            },
            {
              id: 'macro-3',
              title: 'Macro cheques devueltos',
              description:
                'Automatización del flujo completo de cheques devueltos: validación del cheque, cancelación en sistema, diligenciamiento automático de la bitácora y bloqueo del cliente en la plataforma.',
              status: 'completed',
              impact: 'high',
              progress: 100,
              tags: ['macro', 'cheques', 'bloqueo'],
              items: [
                {
                  id: 'macro-3-1',
                  title: 'Validación del cheque devuelto',
                  status: 'completed',
                  owner: 'Automatizaciones',
                },
                {
                  id: 'macro-3-2',
                  title: 'Cancelación en sistema',
                  status: 'completed',
                  owner: 'Automatizaciones',
                },
                {
                  id: 'macro-3-3',
                  title: 'Diligenciamiento de bitácora',
                  status: 'completed',
                  owner: 'Automatizaciones',
                },
                {
                  id: 'macro-3-4',
                  title: 'Bloqueo del cliente',
                  status: 'completed',
                  owner: 'Automatizaciones',
                },
              ],
            },
          ],
        },
      ],
    },
    {
      id: 'slide-impacto',
      title: 'Impacto de las mejoras',
      layout: 'grid',
      blocks: [
        {
          type: 'metrics',
          columns: 2,
          items: [
            {
              label: 'Reducción de error humano (depuraciones)',
              value: 99,
              unit: '%',
              threshold: 'perfect',
            },
            {
              label: 'Procesos con bot activo',
              value: 1,
              unit: 'proceso',
              threshold: 'excellent',
            },
            {
              label: 'Flujos automatizados en total',
              value: 4,
              unit: 'flujos',
              threshold: 'excellent',
            },
            {
              label: 'Cobertura del flujo de cheques devueltos',
              value: 100,
              unit: '%',
              threshold: 'perfect',
            },
          ],
        },
        {
          type: 'text',
          variant: 'callout',
          heading: 'Próximos pasos',
          body: 'Expansión del bot RPA a los demás procesos del área a partir de Q4, aprovechando la arquitectura modular implementada en los ingresos',
        },
      ],
    },
  ],
})

export default content
