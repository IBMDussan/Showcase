import { Suspense, useEffect } from 'react'
import { Link } from 'react-router'
import { motion } from 'motion/react'
import { sections, registryErrors } from './registry'
import { SectionErrorBoundary } from './error-boundary'
import { hubConfig } from './hub.config'
import type { SectionMeta } from '@core/schemas/meta'

// ----------------------------------------------------------------
// Hub — Anthropic-style presentation landing
// ----------------------------------------------------------------

const isDev = import.meta.env.DEV

function useShowDrafts(): boolean {
  return new URLSearchParams(window.location.hash.split('?')[1] ?? '').has('drafts')
}

export function Hub() {
  const showDrafts = useShowDrafts()

  // Always show drafts during development; in prod only show ready
  const visible = sections.filter(
    (s) => isDev || showDrafts || s.meta.status !== 'draft',
  )

  // Force light theme on hub — the warm cream palette lives in light mode
  useEffect(() => {
    const prev = document.documentElement.dataset['theme']
    document.documentElement.dataset['theme'] = 'light'
    return () => {
      if (prev) document.documentElement.dataset['theme'] = prev
      else delete document.documentElement.dataset['theme']
    }
  }, [])

  return (
    <div style={{ position: 'relative', minHeight: '100dvh', overflow: 'hidden', background: '#FAFAF8' }}>
      {/* Animated orb background */}
      <OrbBackground />

      <main
        style={{
          position: 'relative',
          zIndex: 1,
          maxWidth: '1080px',
          margin: '0 auto',
          padding: 'clamp(3rem, 8vh, 6rem) clamp(1.5rem, 5vw, 4rem)',
        }}
      >
        {/* ── Hero ── */}
        <motion.header
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.4, 0, 0.2, 1] }}
          style={{ marginBottom: 'clamp(3rem, 7vh, 5rem)' }}
        >
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.15, duration: 0.5 }}
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: 'var(--text-xs)',
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
              color: '#9E9690',
              marginBottom: '1rem',
            }}
          >
            {hubConfig.area} · {hubConfig.period}
          </motion.p>

          <h1
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(2.5rem, 5vw, 4rem)',
              fontWeight: 400,
              lineHeight: 1.1,
              letterSpacing: '-0.025em',
              color: '#1A1916',
              margin: '0 0 1.25rem',
              maxWidth: '18ch',
            }}
          >
            {hubConfig.title}
          </h1>

          <p
            style={{
              fontSize: 'var(--text-base)',
              color: '#6B6660',
              maxWidth: '48ch',
              lineHeight: 1.65,
              margin: 0,
            }}
          >
            Resultados, avances e iniciativas del equipo — BackOffice CashApps Q3.
            Cada sección recoge una dimensión del trabajo del periodo.
          </p>
        </motion.header>

        {/* ── Dev registry errors ── */}
        {isDev && registryErrors.length > 0 && (
          <div
            style={{
              background: '#FEF2F2',
              border: '1px solid #FECACA',
              borderRadius: '8px',
              padding: '1rem',
              marginBottom: '2rem',
              fontSize: 'var(--text-sm)',
            }}
          >
            <strong style={{ color: '#991B1B' }}>
              {registryErrors.length} error{registryErrors.length > 1 ? 'es' : ''} en el registro
            </strong>
            <ul style={{ margin: '0.5rem 0 0', paddingLeft: '1.25rem', color: '#B91C1C' }}>
              {registryErrors.map((e) => (
                <li key={e.slug}>
                  <code>{e.slug}</code>: {e.error}
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* ── Section grid ── */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
            gap: '1.25rem',
          }}
        >
          {visible.map((entry, i) => (
            <SectionErrorBoundary key={entry.meta.slug} slug={entry.meta.slug}>
              <Suspense fallback={<SectionCardSkeleton />}>
                <SectionCard entry={entry} index={i} />
              </Suspense>
            </SectionErrorBoundary>
          ))}
          {visible.length === 0 && (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              style={{ color: '#9E9690', fontSize: 'var(--text-sm)', gridColumn: '1/-1' }}
            >
              No hay secciones disponibles aún.{' '}
              {!showDrafts && (
                <Link to="/?drafts" style={{ color: '#6B6660', textDecoration: 'underline' }}>
                  Ver borradores
                </Link>
              )}
            </motion.p>
          )}
        </div>

        {/* ── Dev footer ── */}
        {isDev && (
          <motion.footer
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            style={{
              marginTop: '4rem',
              paddingTop: '1.5rem',
              borderTop: '1px solid #E8E4DD',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              color: '#B5B0A8',
              fontSize: 'var(--text-xs)',
              fontFamily: 'var(--font-mono)',
            }}
          >
            <span>
              {sections.filter((s) => s.meta.status === 'draft').length} borrador ·{' '}
              {sections.filter((s) => s.meta.status === 'ready').length} listo ·{' '}
              {new Date().toISOString().slice(0, 10)}
            </span>
            <Link to="/_kit" style={{ color: '#B5B0A8', textDecoration: 'none' }}>
              Kit →
            </Link>
          </motion.footer>
        )}
      </main>
    </div>
  )
}

// ----------------------------------------------------------------
// Orb background — warm pastel blobs
// ----------------------------------------------------------------
const ORBS = [
  { color: '#E8E4FF', size: 520, top: '-12%', left: '-8%',  duration: 18, delay: 0 },
  { color: '#DBEAFE', size: 440, top: '10%',  left: '60%',  duration: 22, delay: 3 },
  { color: '#D1FAE5', size: 360, top: '55%',  left: '75%',  duration: 16, delay: 1.5 },
  { color: '#FEF3C7', size: 480, top: '70%',  left: '-5%',  duration: 20, delay: 2 },
  { color: '#FCE7F3', size: 300, top: '35%',  left: '38%',  duration: 24, delay: 5 },
  { color: '#E0E7FF', size: 260, top: '-5%',  left: '40%',  duration: 19, delay: 7 },
]

function OrbBackground() {
  return (
    <div
      aria-hidden
      style={{ position: 'absolute', inset: 0, overflow: 'hidden', pointerEvents: 'none' }}
    >
      {ORBS.map((orb, i) => (
        <motion.div
          key={i}
          animate={{
            y: [0, -30, 15, -20, 0],
            x: [0, 20, -15, 10, 0],
          }}
          transition={{
            duration: orb.duration,
            delay: orb.delay,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
          style={{
            position: 'absolute',
            top: orb.top,
            left: orb.left,
            width: orb.size,
            height: orb.size,
            borderRadius: '50%',
            background: orb.color,
            filter: `blur(${Math.round(orb.size * 0.22)}px)`,
            opacity: 0.65,
          }}
        />
      ))}
    </div>
  )
}

// ----------------------------------------------------------------
// Section card
// ----------------------------------------------------------------
function SectionCard({
  entry,
  index,
}: {
  entry: (typeof sections)[number]
  index: number
}) {
  const { meta } = entry
  const isDraft = meta.status === 'draft'

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.5,
        delay: 0.3 + index * 0.08,
        ease: [0.4, 0, 0.2, 1],
      }}
      whileHover={{ y: -4, transition: { duration: 0.2 } }}
    >
      <Link
        to={`/s/${meta.slug}`}
        style={{ display: 'block', textDecoration: 'none', color: 'inherit' }}
      >
        <div
          style={{
            position: 'relative',
            background: 'rgba(255,255,255,0.72)',
            backdropFilter: 'blur(12px)',
            WebkitBackdropFilter: 'blur(12px)',
            border: '1px solid rgba(0,0,0,0.07)',
            borderRadius: '16px',
            padding: '1.5rem',
            overflow: 'hidden',
            boxShadow: '0 2px 12px rgba(0,0,0,0.06)',
            minHeight: '160px',
            transition: 'box-shadow 0.2s ease',
          }}
        >
          {/* Glyph decoration */}
          <GlyphDecoration glyph={meta.cover.glyph} />

          {/* Draft badge */}
          {isDraft && (
            <span
              style={{
                position: 'absolute',
                top: '1rem',
                right: '1rem',
                fontFamily: 'var(--font-mono)',
                fontSize: '0.6rem',
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
                color: '#B5B0A8',
                background: '#F5F2EE',
                border: '1px solid #E8E4DD',
                borderRadius: '4px',
                padding: '0.15rem 0.45rem',
              }}
            >
              borrador
            </span>
          )}

          {/* Content */}
          <div style={{ position: 'relative', zIndex: 1 }}>
            <p
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '0.625rem',
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
                color: '#B5B0A8',
                margin: '0 0 0.5rem',
              }}
            >
              {meta.cover.eyebrow ?? meta.tags[0] ?? ''}
            </p>

            <h2
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: 'var(--text-lg)',
                fontWeight: 400,
                color: '#1A1916',
                margin: '0 0 0.5rem',
                lineHeight: 1.25,
              }}
            >
              {meta.title}
            </h2>

            {meta.subtitle && (
              <p
                style={{
                  fontSize: 'var(--text-sm)',
                  color: '#6B6660',
                  margin: '0 0 0.75rem',
                  lineHeight: 1.5,
                }}
              >
                {meta.subtitle}
              </p>
            )}

            {meta.cover.metric && (
              <div style={{ marginTop: '0.875rem' }}>
                <span
                  style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: 'var(--text-2xl)',
                    color: '#1A1916',
                    letterSpacing: '-0.02em',
                  }}
                >
                  {meta.cover.metric.value}
                </span>
                <span
                  style={{
                    fontFamily: 'var(--font-sans)',
                    fontSize: 'var(--text-xs)',
                    color: '#9E9690',
                    marginLeft: '0.4rem',
                  }}
                >
                  {meta.cover.metric.label}
                </span>
              </div>
            )}
          </div>
        </div>
      </Link>
    </motion.div>
  )
}

// ----------------------------------------------------------------
// Glyph SVG decoration
// ----------------------------------------------------------------
const GLYPH_COLOR = 'rgba(0,0,0,0.06)'

function GlyphDecoration({ glyph }: { glyph: SectionMeta['cover']['glyph'] }) {
  return (
    <motion.div
      animate={{ rotate: 360 }}
      transition={{ duration: 40, repeat: Infinity, ease: 'linear' }}
      style={{
        position: 'absolute',
        bottom: '-20px',
        right: '-20px',
        width: '120px',
        height: '120px',
        opacity: 1,
        pointerEvents: 'none',
      }}
    >
      <GlyphSvg glyph={glyph} size={120} color={GLYPH_COLOR} />
    </motion.div>
  )
}

function GlyphSvg({
  glyph,
  size,
  color,
}: {
  glyph: SectionMeta['cover']['glyph']
  size: number
  color: string
}) {
  const cx = size / 2
  const cy = size / 2
  const r = size * 0.42

  switch (glyph) {
    case 'ring':
      return (
        <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} fill="none">
          <circle cx={cx} cy={cy} r={r} stroke={color} strokeWidth={size * 0.06} />
          <circle cx={cx} cy={cy} r={r * 0.6} stroke={color} strokeWidth={size * 0.03} />
        </svg>
      )
    case 'circle':
      return (
        <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} fill="none">
          <circle cx={cx} cy={cy} r={r} fill={color} />
        </svg>
      )
    case 'square':
      return (
        <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} fill="none">
          <rect x={cx - r} y={cy - r} width={r * 2} height={r * 2} rx={size * 0.04} fill={color} />
        </svg>
      )
    case 'arc':
      return (
        <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} fill="none">
          <path
            d={`M ${cx - r} ${cy} A ${r} ${r} 0 0 1 ${cx + r} ${cy}`}
            stroke={color}
            strokeWidth={size * 0.06}
            strokeLinecap="round"
          />
          <path
            d={`M ${cx - r * 0.7} ${cy} A ${r * 0.7} ${r * 0.7} 0 0 1 ${cx + r * 0.7} ${cy}`}
            stroke={color}
            strokeWidth={size * 0.04}
            strokeLinecap="round"
          />
        </svg>
      )
    case 'hexagon': {
      const pts = Array.from({ length: 6 }, (_, i) => {
        const a = (Math.PI / 3) * i - Math.PI / 6
        return `${cx + r * Math.cos(a)},${cy + r * Math.sin(a)}`
      }).join(' ')
      return (
        <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} fill="none">
          <polygon points={pts} stroke={color} strokeWidth={size * 0.05} />
        </svg>
      )
    }
    case 'bars':
      return (
        <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} fill="none">
          {[0.3, 0.5, 0.75, 1].map((h, i) => (
            <rect
              key={i}
              x={cx - r + i * (r * 0.56)}
              y={cy + r - r * 2 * h}
              width={r * 0.42}
              height={r * 2 * h}
              rx={size * 0.02}
              fill={color}
            />
          ))}
        </svg>
      )
    case 'triangle': {
      const tp = `${cx},${cy - r} ${cx - r * 0.87},${cy + r * 0.5} ${cx + r * 0.87},${cy + r * 0.5}`
      return (
        <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} fill="none">
          <polygon points={tp} stroke={color} strokeWidth={size * 0.05} />
        </svg>
      )
    }
    case 'diamond': {
      const dp = `${cx},${cy - r} ${cx + r * 0.7},${cy} ${cx},${cy + r} ${cx - r * 0.7},${cy}`
      return (
        <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} fill="none">
          <polygon points={dp} stroke={color} strokeWidth={size * 0.05} />
        </svg>
      )
    }
    default:
      return (
        <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} fill="none">
          <circle cx={cx} cy={cy} r={r} stroke={color} strokeWidth={size * 0.04} />
        </svg>
      )
  }
}

// ----------------------------------------------------------------
// Skeleton
// ----------------------------------------------------------------
function SectionCardSkeleton() {
  return (
    <div
      style={{
        background: 'rgba(255,255,255,0.5)',
        border: '1px solid rgba(0,0,0,0.06)',
        borderRadius: '16px',
        padding: '1.5rem',
        minHeight: '160px',
        opacity: 0.5,
      }}
    />
  )
}
