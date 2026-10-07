#!/usr/bin/env node
/**
 * check-scope.mjs
 * Enforces that branches named `section/<slug>` only touch files
 * inside `src/sections/<slug>/`.
 *
 * Usage:
 *   npm run check:scope
 *   node scripts/check-scope.mjs
 *
 * Behavior:
 * - On `section/<slug>` branches: fail if diff against origin/main
 *   touches any file outside src/sections/<slug>/
 * - On all other branches: always passes (exit 0)
 */

import { execSync } from 'child_process'

function run(cmd) {
  try {
    return execSync(cmd, { encoding: 'utf8' }).trim()
  } catch {
    return ''
  }
}

// Get current branch name
const branch = run('git rev-parse --abbrev-ref HEAD')
console.log(`Branch: ${branch}`)

// Only enforce on section/* branches
const match = branch.match(/^section\/([a-z0-9-]+)$/)
if (!match) {
  console.log('Not a section branch — scope check skipped.')
  process.exit(0)
}

const slug = match[1]
const allowedPrefix = `src/sections/${slug}/`

console.log(`Checking scope for section: ${slug}`)
console.log(`Allowed prefix: ${allowedPrefix}`)

// Get list of changed files against origin/main
let changedFiles
try {
  const output = run('git diff --name-only origin/main...HEAD')
  changedFiles = output.split('\n').filter(Boolean)
} catch {
  console.error('Failed to get git diff. Is origin/main available?')
  process.exit(1)
}

if (changedFiles.length === 0) {
  console.log('No changed files — scope check passed.')
  process.exit(0)
}

// Check for violations
const violations = changedFiles.filter((f) => !f.startsWith(allowedPrefix))

if (violations.length > 0) {
  console.error(`\n✗ Scope violation: section/${slug} may only touch files in ${allowedPrefix}`)
  console.error('\nViolating files:')
  for (const f of violations) {
    console.error(`  - ${f}`)
  }
  console.error('\nMove shared changes to a separate branch/PR.')
  process.exit(1)
}

console.log(`✓ All ${changedFiles.length} changed file(s) are within ${allowedPrefix}`)
process.exit(0)
