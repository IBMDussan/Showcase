#!/usr/bin/env node
/**
 * new-section.mjs
 * Creates a new section folder by copying _template.
 *
 * Usage:
 *   npm run new:section -- <slug>
 *   node scripts/new-section.mjs <slug>
 *
 * Rules:
 * - Slug must be lowercase alphanumeric + hyphens
 * - Folder must not already exist
 */

import { existsSync, mkdirSync, readdirSync, readFileSync, writeFileSync } from 'fs'
import { join, dirname } from 'path'
import { fileURLToPath } from 'url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const ROOT = join(__dirname, '..')

const slug = process.argv[2]

if (!slug) {
  console.error('Usage: npm run new:section -- <slug>')
  process.exit(1)
}

if (!/^[a-z0-9-]+$/.test(slug)) {
  console.error(`Invalid slug "${slug}". Use lowercase alphanumeric and hyphens only.`)
  process.exit(1)
}

const targetDir = join(ROOT, 'src', 'sections', slug)
const templateDir = join(ROOT, 'src', 'sections', '_template')

if (existsSync(targetDir)) {
  console.error(`Section "${slug}" already exists at ${targetDir}`)
  process.exit(1)
}

if (!existsSync(templateDir)) {
  console.error(`Template not found at ${templateDir}`)
  process.exit(1)
}

// Copy template files
mkdirSync(targetDir, { recursive: true })

const files = readdirSync(templateDir)
for (const file of files) {
  const src = join(templateDir, file)
  const dest = join(targetDir, file)
  let content = readFileSync(src, 'utf8')

  // Replace _template references in file contents
  content = content
    .replaceAll("slug: '_template'", `slug: '${slug}'`)
    .replaceAll("'_template'", `'${slug}'`)
    .replaceAll('_template', slug)
    .replaceAll('TemplateSection', toPascalCase(slug) + 'Section')
    .replaceAll('Template Section', toTitleCase(slug))
    .replaceAll('Template headline', toTitleCase(slug))
    .replaceAll('order: 999', 'order: 0 // TODO: set correct order')

  writeFileSync(dest, content, 'utf8')
}

console.log(`✓ Section "${slug}" created at src/sections/${slug}/`)
console.log('  Next steps:')
console.log(`  1. Edit src/sections/${slug}/meta.ts — set title, order, cover`)
console.log(`  2. Edit src/sections/${slug}/content.ts — add real data`)
console.log(`  3. Edit src/sections/${slug}/index.tsx — build slides`)

// ----------------------------------------------------------------
// Helpers
// ----------------------------------------------------------------
function toPascalCase(str) {
  return str
    .split('-')
    .map((part) => part[0].toUpperCase() + part.slice(1))
    .join('')
}

function toTitleCase(str) {
  return str
    .split('-')
    .map((part) => part[0].toUpperCase() + part.slice(1))
    .join(' ')
}
