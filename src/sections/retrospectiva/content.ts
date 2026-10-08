import { SectionContentSchema } from '@core/schemas/blocks'

const content = SectionContentSchema.parse({
  slides: [
    {
      id: 'slide-retro',
      title: 'Retrospectiva Q1 2026',
      layout: 'default',
      blocks: [
        {
          type: 'retro',
          title: 'Retrospectiva Q1 2026',
          items: [
            { id: 'w1', category: 'went-well', text: 'Metodología VSM aplicada para identificar oportunidades de mejora',             votes: 4 },
            { id: 'w2', category: 'went-well', text: 'Asistentes virtuales para 6 actividades principales del área',                  votes: 3 },
            { id: 'w3', category: 'went-well', text: 'Equipo resiliente frente a diversas situaciones',                               votes: 3 },
            { id: 'w4', category: 'went-well', text: 'Reducción de sábados trabajados mediante mejor distribución de horarios',       votes: 2 },
            { id: 'i1', category: 'improve',   text: 'Respaldo completo al 50 % para todo el equipo' },
            { id: 'i2', category: 'improve',   text: 'Conversar nuestras debilidades (operacionales / no operacionales) para tener un mejor ritmo de trabajo' },
            { id: 'i3', category: 'improve',   text: 'Autonomía para seguir aprendiendo nuevas actividades' },
            { id: 'i4', category: 'improve',   text: 'Continuidad de prácticas ágiles' },
            { id: 'a1', category: 'action',    text: 'Implementación de macros para reportes del área' },
            { id: 'a2', category: 'action',    text: 'Ajustes precisos a los asistentes virtuales' },
            { id: 'a3', category: 'action',    text: 'Capacitación interna: liderazgo, ICA, IA' },
            { id: 'a4', category: 'action',    text: 'One To One TL y analista' },
          ],
        },
      ],
    },
  ],
})

export default content
