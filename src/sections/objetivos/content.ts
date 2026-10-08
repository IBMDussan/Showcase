import { SectionContentSchema } from '@core/schemas/blocks'

const content = SectionContentSchema.parse({
  slides: [
    {
      id: 'slide-objetivos',
      title: 'Objetivos de la iteración',
      layout: 'default',
      blocks: [
        {
          type: 'text',
          heading: 'Objetivos de la iteración',
          body: 'A continuación, revisaremos los puntos clave que guiarán nuestra sesión, desde el aseguramiento operativo hasta las nuevas propuestas de eficiencia.',
        },
        {
          type: 'actions',
          title: 'Focos del Q1',
          items: [
            {
              id: 'obj-1',
              text: 'Modelo de respaldo: continuar trabajando en un esquema de BackUp sólido para garantizar la continuidad operativa del equipo',
              status: 'in-progress',
              priority: 'high',
            },
            {
              id: 'obj-2',
              text: 'Análisis de indicadores: evaluar los resultados de la práctica y el desempeño del Quarter mediante métricas clave',
              status: 'in-progress',
              priority: 'high',
            },
            {
              id: 'obj-3',
              text: 'Retrospectiva de equipo: implementar las acciones de mejora continua identificadas durante nuestros ciclos de trabajo',
              status: 'in-progress',
              priority: 'medium',
            },
            {
              id: 'obj-4',
              text: 'Iniciativas estratégicas: presentar nuevas propuestas y herramientas orientadas a la optimización y automatización',
              status: 'in-progress',
              priority: 'medium',
            },
          ],
        },
      ],
    },
  ],
})

export default content
