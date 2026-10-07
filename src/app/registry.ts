import { lazy, type ComponentType } from 'react'
import type { SectionMeta } from '@core/schemas/meta'
import { SectionMetaSchema } from '@core/schemas/meta'

// ----------------------------------------------------------------
// Types
// ----------------------------------------------------------------

export interface SectionEntry {
  meta: SectionMeta
  Component: ComponentType
}

export interface RegistryError {
  slug: string
  error: string
}

// ----------------------------------------------------------------
// Eager load all meta.ts files (excluding _* folders)
// ----------------------------------------------------------------
const rawMetas = import.meta.glob<{ default: unknown }>(
  '../sections/*/meta.ts',
  { eager: true, import: 'default' },
)

// Lazy loaders for section components
const lazyLoaders = import.meta.glob<{ default: ComponentType }>(
  '../sections/*/index.tsx',
)

// ----------------------------------------------------------------
// Build registry
// ----------------------------------------------------------------

function slugFromPath(path: string): string {
  // '../sections/objetivos/meta.ts' → 'objetivos'
  const parts = path.split('/')
  return parts[parts.length - 2] ?? ''
}

function isTemplate(slug: string): boolean {
  return slug.startsWith('_')
}

const _sections: SectionEntry[] = []
const _errors: RegistryError[] = []

for (const [path, rawMeta] of Object.entries(rawMetas)) {
  const slug = slugFromPath(path)

  if (isTemplate(slug)) continue

  const loaderPath = path.replace('meta.ts', 'index.tsx')
  const loader = lazyLoaders[loaderPath]

  if (!loader) {
    _errors.push({ slug, error: `No index.tsx found for section "${slug}"` })
    continue
  }

  const parsed = SectionMetaSchema.safeParse(rawMeta)
  if (!parsed.success) {
    _errors.push({
      slug,
      error: `Invalid meta for "${slug}": ${parsed.error.message}`,
    })
    continue
  }

  _sections.push({
    meta: parsed.data,
    Component: lazy(loader),
  })
}

// Sort by order field
_sections.sort((a, b) => a.meta.order - b.meta.order)

// ----------------------------------------------------------------
// Public API
// ----------------------------------------------------------------

/** All valid, sorted section entries */
export const sections: ReadonlyArray<SectionEntry> = _sections

/** Validation errors found during registry build */
export const registryErrors: ReadonlyArray<RegistryError> = _errors

/** Find a section entry by slug */
export function getSectionBySlug(slug: string): SectionEntry | undefined {
  return _sections.find((s) => s.meta.slug === slug)
}

/** Sections visible in production (non-draft, unless ?drafts param) */
export function getVisibleSections(showDrafts = false): ReadonlyArray<SectionEntry> {
  return _sections.filter(
    (s) => showDrafts || s.meta.status !== 'draft',
  )
}
