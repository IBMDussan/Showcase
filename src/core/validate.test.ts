/**
 * validate.test.ts
 * Validates all section meta.ts and content.ts files against Zod schemas.
 * Run via: npm run validate
 *
 * Rules checked:
 * - Each section folder (excluding _*) must have meta.ts and content.ts
 * - meta.ts default export must pass SectionMetaSchema
 * - content.ts default export must pass SectionContentSchema
 * - slug in meta must match folder name
 */

import { describe, it, expect } from 'vitest'
import { readdirSync, existsSync } from 'node:fs'
import { join, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'
import { SectionMetaSchema } from '@core/schemas/meta'
import { SectionContentSchema } from '@core/schemas/blocks'

const __dirname = dirname(fileURLToPath(import.meta.url))
const SECTIONS_DIR = join(__dirname, '../sections')

function getSectionSlugs(): string[] {
  if (!existsSync(SECTIONS_DIR)) return []
  return readdirSync(SECTIONS_DIR, { withFileTypes: true })
    .filter((d) => d.isDirectory() && !d.name.startsWith('_'))
    .map((d) => d.name)
}

describe('Section validation', () => {
  const slugs = getSectionSlugs()

  if (slugs.length === 0) {
    it('skips — no non-template sections found', () => {
      // Nothing to validate yet; will populate in Fase 4
      expect(true).toBe(true)
    })
    return
  }

  for (const slug of slugs) {
    describe(`section: ${slug}`, () => {
      it('has meta.ts with valid schema', async () => {
        const metaPath = join(SECTIONS_DIR, slug, 'meta.ts')
        expect(existsSync(metaPath), `meta.ts missing for ${slug}`).toBe(true)

        const mod = await import(/* @vite-ignore */ metaPath)
        const meta = (mod as { default: unknown }).default
        const result = SectionMetaSchema.safeParse(meta)

        if (!result.success) {
          throw new Error(
            `meta.ts for "${slug}" is invalid:\n${result.error.message}`,
          )
        }
        expect(result.data.slug).toBe(slug)
      })

      it('has content.ts with valid schema', async () => {
        const contentPath = join(SECTIONS_DIR, slug, 'content.ts')
        expect(existsSync(contentPath), `content.ts missing for ${slug}`).toBe(true)

        const mod = await import(/* @vite-ignore */ contentPath)
        const content = (mod as { default: unknown }).default
        const result = SectionContentSchema.safeParse(content)

        if (!result.success) {
          throw new Error(
            `content.ts for "${slug}" is invalid:\n${result.error.message}`,
          )
        }
        expect(result.data.slides.length).toBeGreaterThan(0)
      })

      it('has index.tsx', () => {
        const indexPath = join(SECTIONS_DIR, slug, 'index.tsx')
        expect(existsSync(indexPath), `index.tsx missing for ${slug}`).toBe(true)
      })
    })
  }
})
