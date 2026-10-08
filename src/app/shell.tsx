import { Suspense, useEffect, useState } from 'react'
import { useParams, Link, useNavigate } from 'react-router'
import { motion, AnimatePresence } from 'motion/react'
import { getSectionBySlug, sections } from './registry'
import { SectionErrorBoundary } from './error-boundary'

// ----------------------------------------------------------------
// Shell — Anthropic-style presentation view
// ----------------------------------------------------------------

export function Shell() {
  const { slug } = useParams<{ slug: string }>()
  const navigate = useNavigate()
  const [leaving, setLeaving] = useState(false)

  // Restore theme on unmount
  useEffect(() => {
    return () => {
      const stored = localStorage.getItem('theme')
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
      document.documentElement.dataset['theme'] = stored ?? (prefersDark ? 'dark' : 'light')
    }
  }, [])

  if (!slug) return <div>URL inválida</div>

  const entry = getSectionBySlug(slug)

  if (!entry) {
    return (
      <main
        style={{
          fontFamily: 'var(--font-sans)',
          padding: '4rem 2rem',
          textAlign: 'center',
          background: '#FAFAF8',
          minHeight: '100dvh',
        }}
      >
        <p style={{ color: '#9E9690', marginBottom: '1rem' }}>
          Sección no encontrada: <code>{slug}</code>
        </p>
        <Link to="/" style={{ color: '#6B6660', fontSize: 'var(--text-sm)' }}>
          ← Volver al hub
        </Link>
      </main>
    )
  }

  const { Component, meta } = entry
  const currentIndex = sections.findIndex((s) => s.meta.slug === slug)
  const prev = sections[currentIndex - 1]
  const next = sections[currentIndex + 1]

  // Animated navigate: fade out → navigate
  async function animatedNavigate(to: string) {
    setLeaving(true)
    await new Promise((r) => setTimeout(r, 220))
    setLeaving(false)
    void navigate(to)
  }

  return (
    <div
      style={{
        minHeight: '100dvh',
        display: 'flex',
        flexDirection: 'column',
        background: '#FAFAF8',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Subtle orb — smaller set for section pages */}
      <ShellBackground />

      {/* ── Header ── */}
      <motion.header
        initial={{ opacity: 0, y: -8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '1rem',
          padding: '0.875rem clamp(1.5rem, 5vw, 4rem)',
          background: 'rgba(250,250,248,0.85)',
          backdropFilter: 'blur(16px)',
          WebkitBackdropFilter: 'blur(16px)',
          borderBottom: '1px solid rgba(0,0,0,0.06)',
          position: 'sticky',
          top: 0,
          zIndex: 100,
        }}
      >
        <Link
          to="/"
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize: 'var(--text-xs)',
            letterSpacing: '0.06em',
            color: '#B5B0A8',
            textDecoration: 'none',
            display: 'flex',
            alignItems: 'center',
            gap: '0.375rem',
            transition: 'color 0.15s',
          }}
          onMouseEnter={(e) => (e.currentTarget.style.color = '#6B6660')}
          onMouseLeave={(e) => (e.currentTarget.style.color = '#B5B0A8')}
        >
          ← Hub
        </Link>

        <div style={{ flex: 1 }} />

        <div style={{ textAlign: 'right' }}>
          <p
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '0.6rem',
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
              color: '#B5B0A8',
              margin: '0 0 0.15rem',
            }}
          >
            {meta.cover.eyebrow ?? meta.tags[0] ?? ''}
          </p>
          <p
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'var(--text-base)',
              color: '#1A1916',
              margin: 0,
              lineHeight: 1.2,
            }}
          >
            {meta.title}
          </p>
        </div>
      </motion.header>

      {/* ── Content ── */}
      <main style={{ flex: 1, position: 'relative', zIndex: 1 }}>
        <AnimatePresence mode="wait">
          <motion.div
            key={slug}
            initial={{ opacity: 0, y: 18 }}
            animate={leaving ? { opacity: 0, y: -14 } : { opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -14 }}
            transition={{ duration: 0.28, ease: [0.4, 0, 0.2, 1] }}
            style={{ padding: 'clamp(2rem, 4vh, 3.5rem) clamp(1.5rem, 5vw, 4rem)' }}
          >
            <SectionErrorBoundary slug={slug}>
              <Suspense
                fallback={
                  <div
                    style={{
                      color: '#B5B0A8',
                      fontFamily: 'var(--font-mono)',
                      fontSize: 'var(--text-xs)',
                    }}
                  >
                    Cargando {meta.title}…
                  </div>
                }
              >
                <Component />
              </Suspense>
            </SectionErrorBoundary>
          </motion.div>
        </AnimatePresence>
      </main>

      {/* ── Navigation footer ── */}
      <motion.footer
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.35, duration: 0.4 }}
        style={{
          display: 'grid',
          gridTemplateColumns: '1fr auto 1fr',
          alignItems: 'center',
          padding: '1.25rem clamp(1.5rem, 5vw, 4rem)',
          borderTop: '1px solid rgba(0,0,0,0.06)',
          background: 'rgba(250,250,248,0.85)',
          backdropFilter: 'blur(16px)',
          WebkitBackdropFilter: 'blur(16px)',
          position: 'sticky',
          bottom: 0,
          zIndex: 100,
        }}
      >
        {/* Prev */}
        {prev ? (
          <NavButton
            label={prev.meta.title}
            direction="prev"
            onClick={() => void animatedNavigate(`/s/${prev.meta.slug}`)}
          />
        ) : (
          <div />
        )}

        {/* Progress dots */}
        <ProgressDots current={currentIndex} total={sections.length} />

        {/* Next */}
        {next ? (
          <div style={{ textAlign: 'right' }}>
            <NavButton
              label={next.meta.title}
              direction="next"
              onClick={() => void animatedNavigate(`/s/${next.meta.slug}`)}
            />
          </div>
        ) : (
          <div />
        )}
      </motion.footer>
    </div>
  )
}

// ----------------------------------------------------------------
// NavButton
// ----------------------------------------------------------------
function NavButton({
  label,
  direction,
  onClick,
}: {
  label: string
  direction: 'prev' | 'next'
  onClick: () => void
}) {
  const isPrev = direction === 'prev'
  return (
    <motion.button
      onClick={onClick}
      whileHover={{ x: isPrev ? -3 : 3 }}
      transition={{ duration: 0.15 }}
      style={{
        background: 'none',
        border: 'none',
        cursor: 'pointer',
        display: 'flex',
        alignItems: 'center',
        gap: '0.375rem',
        color: '#9E9690',
        fontSize: 'var(--text-sm)',
        fontFamily: 'var(--font-sans)',
        padding: '0.25rem 0',
        textAlign: isPrev ? 'left' : 'right',
      }}
    >
      {isPrev && <span style={{ fontSize: '0.75em', opacity: 0.7 }}>←</span>}
      <span
        style={{
          maxWidth: '18ch',
          overflow: 'hidden',
          textOverflow: 'ellipsis',
          whiteSpace: 'nowrap',
          color: '#6B6660',
        }}
      >
        {label}
      </span>
      {!isPrev && <span style={{ fontSize: '0.75em', opacity: 0.7 }}>→</span>}
    </motion.button>
  )
}

// ----------------------------------------------------------------
// Progress dots
// ----------------------------------------------------------------
function ProgressDots({ current, total }: { current: number; total: number }) {
  if (total <= 1) return null
  return (
    <div style={{ display: 'flex', gap: '6px', alignItems: 'center' }}>
      {Array.from({ length: total }).map((_, i) => (
        <div
          key={i}
          style={{
            width: i === current ? '18px' : '6px',
            height: '6px',
            borderRadius: '3px',
            background: i === current ? '#1A1916' : '#D8D4CE',
            transition: 'width 0.25s ease, background 0.25s ease',
          }}
        />
      ))}
    </div>
  )
}

// ----------------------------------------------------------------
// Subtle background orbs for section pages
// ----------------------------------------------------------------
const SHELL_ORBS = [
  { color: '#E8E4FF', size: 400, top: '-10%', right: '-8%', duration: 20, delay: 0 },
  { color: '#DBEAFE', size: 300, bottom: '-8%', left: '-5%', duration: 25, delay: 3 },
]

function ShellBackground() {
  return (
    <div
      aria-hidden
      style={{ position: 'absolute', inset: 0, overflow: 'hidden', pointerEvents: 'none', zIndex: 0 }}
    >
      {SHELL_ORBS.map((orb, i) => (
        <motion.div
          key={i}
          animate={{ y: [0, -20, 10, 0], x: [0, 10, -10, 0] }}
          transition={{ duration: orb.duration, delay: orb.delay, repeat: Infinity, ease: 'easeInOut' }}
          style={{
            position: 'absolute',
            ...(orb as Record<string, unknown>),
            borderRadius: '50%',
            background: orb.color,
            filter: `blur(${Math.round(orb.size * 0.25)}px)`,
            opacity: 0.45,
          }}
        />
      ))}
    </div>
  )
}
