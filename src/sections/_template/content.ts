/**
 * _template/content.ts
 *
 * Section data — replace mock values with real data.
 * This file must NOT import from other sections.
 * It may import from @core/schemas/ and @core/lib/ only.
 */
import { SectionContentSchema } from '@core/schemas/blocks'

const content = SectionContentSchema.parse({
  slides: [
    {
      id: 'slide-1',
      title: 'Slide 1',
      layout: 'default',
      blocks: [
        {
          type: 'text',
          heading: 'Hello from _template',
          body: 'Replace this block with your actual content. Use blocks from @core/schemas/blocks.ts.',
        },
      ],
    },
  ],
})

export default content
