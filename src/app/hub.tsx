import { Suspense } from 'react'
import { Link } from 'react-router'
import { sections, registryErrors } from './registry'
import { SectionErrorBoundary } from './error-boundary'
import { hubConfig } from './hub.config'

// ----------------------------------------------------------------
// Hub — skeleton (Fase 1)
// Styles and full layout come in Fase 3
// ----------------------------------------------------------------

const isDev = import.meta.env.DEV

// Read URL params
function useShowDrafts(): boolean {
  return new URLSearchParams(window.location.hash.split('?')[1] ?? '').has('drafts')
}

export function Hub() {
  const showDrafts = useShowDrafts()

  const visible = sections.filter(
    (s) => showDrafts || s.meta.status !== 'draft',
  )

  return (
    <main style={{ fontFamily: 'var(--font-sans)', padding: '2rem', maxWidth: 960, margin: '0 auto' }}>
      {/* Masthead */}
      <header style={{ marginBottom: '2rem' }}>
        <p style={{ color: 'var(--color-text-muted)', fontSize: 'var(--text-sm)', margin: 0 }}>
          {hubConfig.area} · {hubConfig.period}
        </p>
        <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 'var(--text-3xl)', margin: '0.25rem 0' }}>
          {hubConfig.title}
        </h1>
        {hubConfig.subtitle && (
          <p style={{ color: 'var(--color-text-muted)', margin: 0 }}>{hubConfig.subtitle}</p>
        )}
      </header>

      {/* Dev: registry errors */}
      {isDev && registryErrors.length > 0 && (
        <div style={{ background: '#fef2f2', border: '1px solid #fca5a5', borderRadius: 8, padding: '1rem', marginBottom: '1.5rem' }}>
          <strong style={{ color: '#991b1b' }}>Registry errors ({registryErrors.length})</strong>
          <ul style={{ margin: '0.5rem 0 0', paddingLeft: '1.25rem', color: '#991b1b', fontSize: 13 }}>
            {registryErrors.map((e) => (
              <li key={e.slug}><code>{e.slug}</code>: {e.error}</li>
            ))}
          </ul>
        </div>
      )}

      {/* Section grid — skeleton cards */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
          gap: '1rem',
        }}
      >
        {visible.map((entry) => (
          <SectionErrorBoundary key={entry.meta.slug} slug={entry.meta.slug}>
            <Suspense fallback={<SectionCardSkeleton />}>
              <SectionCard entry={entry} />
            </Suspense>
          </SectionErrorBoundary>
        ))}
      </div>

      {/* Dev footer */}
      {isDev && (
        <footer style={{ marginTop: '3rem', color: 'var(--color-text-subtle)', fontSize: 'var(--text-xs)' }}>
          {sections.filter((s) => s.meta.status === 'draft').length} draft ·{' '}
          {sections.filter((s) => s.meta.status === 'ready').length} ready ·{' '}
          Build: {new Date().toISOString()}
          {' · '}
          <Link to="/_kit">Kit →</Link>
        </footer>
      )}
    </main>
  )
}

// ----------------------------------------------------------------
// Section card — minimal skeleton
// ----------------------------------------------------------------
function SectionCard({ entry }: { entry: (typeof sections)[number] }) {
  const { meta } = entry
  return (
    <Link
      to={`/s/${meta.slug}`}
      style={{
        display: 'block',
        background: 'var(--color-surface)',
        border: '1px solid var(--color-border)',
        borderRadius: 'var(--radius-lg)',
        padding: '1.25rem',
        textDecoration: 'none',
        color: 'inherit',
      }}
    >
      <p style={{ margin: '0 0 0.25rem', color: 'var(--color-text-muted)', fontSize: 'var(--text-xs)' }}>
        {meta.cover.eyebrow ?? meta.tags[0] ?? meta.status.toUpperCase()}
      </p>
      <h2 style={{ margin: '0 0 0.5rem', fontFamily: 'var(--font-display)', fontSize: 'var(--text-lg)' }}>
        {meta.title}
      </h2>
      {meta.subtitle && (
        <p style={{ margin: 0, color: 'var(--color-text-muted)', fontSize: 'var(--text-sm)' }}>
          {meta.subtitle}
        </p>
      )}
      {meta.cover.metric && (
        <p style={{ margin: '0.75rem 0 0', fontVariantNumeric: 'tabular-nums', fontSize: 'var(--text-2xl)', fontWeight: 700, fontFamily: 'var(--font-display)' }}>
          {meta.cover.metric.value}
          <span style={{ fontSize: 'var(--text-sm)', fontWeight: 400, marginLeft: '0.35rem', color: 'var(--color-text-muted)' }}>
            {meta.cover.metric.label}
          </span>
        </p>
      )}
    </Link>
  )
}

function SectionCardSkeleton() {
  return (
    <div
      style={{
        background: 'var(--color-surface)',
        border: '1px solid var(--color-border)',
        borderRadius: 'var(--radius-lg)',
        padding: '1.25rem',
        height: 120,
        opacity: 0.5,
      }}
    />
  )
}
