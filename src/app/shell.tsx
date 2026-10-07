import { Suspense } from 'react'
import { useParams, Link, useNavigate } from 'react-router'
import { getSectionBySlug, sections } from './registry'
import { SectionErrorBoundary } from './error-boundary'

// ----------------------------------------------------------------
// Shell — skeleton (Fase 1)
// Full presentation layout comes in Fase 3
// ----------------------------------------------------------------

export function Shell() {
  const { slug } = useParams<{ slug: string }>()
  const navigate = useNavigate()

  if (!slug) {
    return <div>Invalid URL</div>
  }

  const entry = getSectionBySlug(slug)

  if (!entry) {
    return (
      <main style={{ fontFamily: 'var(--font-sans)', padding: '2rem', textAlign: 'center' }}>
        <p style={{ color: 'var(--color-text-muted)' }}>Section not found: <code>{slug}</code></p>
        <Link to="/">← Back to hub</Link>
      </main>
    )
  }

  const { Component, meta } = entry
  const currentIndex = sections.findIndex((s) => s.meta.slug === slug)
  const prev = sections[currentIndex - 1]
  const next = sections[currentIndex + 1]

  return (
    <div
      style={{
        minHeight: '100dvh',
        display: 'flex',
        flexDirection: 'column',
        fontFamily: 'var(--font-sans)',
      }}
    >
      {/* Header bar */}
      <header
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '1rem',
          padding: '0.75rem var(--spacing-slide-x)',
          borderBottom: '1px solid var(--color-border)',
          background: 'var(--color-bg)',
          position: 'sticky',
          top: 0,
          zIndex: 'var(--z-raised)',
        }}
      >
        <Link
          to="/"
          aria-label="Back to hub"
          style={{ color: 'var(--color-text-muted)', textDecoration: 'none', fontSize: 'var(--text-sm)' }}
        >
          ← Hub
        </Link>
        <div style={{ flex: 1 }} />
        <p style={{ margin: 0, fontSize: 'var(--text-sm)', color: 'var(--color-text-muted)' }}>
          {meta.cover.eyebrow ?? meta.tags[0] ?? ''}
        </p>
        <h1 style={{ margin: 0, fontSize: 'var(--text-base)', fontFamily: 'var(--font-display)' }}>
          {meta.title}
        </h1>
      </header>

      {/* Section content area */}
      <main style={{ flex: 1, padding: 'var(--spacing-slide-y) var(--spacing-slide-x)' }}>
        <SectionErrorBoundary slug={slug}>
          <Suspense
            fallback={
              <div style={{ color: 'var(--color-text-muted)' }}>Loading {meta.title}…</div>
            }
          >
            <Component />
          </Suspense>
        </SectionErrorBoundary>
      </main>

      {/* Footer navigation */}
      <footer
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '1rem',
          padding: '0.75rem var(--spacing-slide-x)',
          borderTop: '1px solid var(--color-border)',
          background: 'var(--color-bg)',
        }}
      >
        {prev ? (
          <button
            onClick={() => void navigate(`/s/${prev.meta.slug}`)}
            style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--color-accent)', fontSize: 'var(--text-sm)' }}
          >
            ← {prev.meta.title}
          </button>
        ) : (
          <div />
        )}
        <div style={{ flex: 1, textAlign: 'center' }}>
          <Link to="/" style={{ color: 'var(--color-text-muted)', fontSize: 'var(--text-xs)' }}>
            Índice
          </Link>
        </div>
        {next ? (
          <button
            onClick={() => void navigate(`/s/${next.meta.slug}`)}
            style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--color-accent)', fontSize: 'var(--text-sm)' }}
          >
            {next.meta.title} →
          </button>
        ) : (
          <div />
        )}
      </footer>
    </div>
  )
}
