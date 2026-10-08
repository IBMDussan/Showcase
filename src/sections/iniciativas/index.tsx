/**
 * iniciativas/index.tsx
 *
 * Mejoras del equipo — Promexma RPA y Automatizaciones
 * NOTE: Core components (PeriodHero, InitiativeGrid, StatCard) are pending Fase 2.
 * Using inline rendering with design tokens until core components are available.
 */
import content from './content'

type ThresholdColor = Record<string, string>

const thresholdColor: ThresholdColor = {
  perfect: 'var(--color-threshold-perfect)',
  excellent: 'var(--color-threshold-excellent)',
  optimal: 'var(--color-threshold-optimal)',
  attention: 'var(--color-threshold-attention)',
}

const statusLabel: Record<string, string> = {
  completed: 'Completado',
  active: 'En curso',
  planned: 'Planeado',
  paused: 'En pausa',
  cancelled: 'Cancelado',
}

const impactLabel: Record<string, string> = {
  high: 'Impacto alto',
  medium: 'Impacto medio',
  low: 'Impacto bajo',
}

export default function Iniciativas() {
  const slides = content.slides

  // slide-cover
  const coverSlide = slides.find((s) => s.id === 'slide-cover')
  const heroBlock = coverSlide?.blocks.find((b) => b.type === 'hero')

  // slide-promexma-rpa
  const rpaSlide = slides.find((s) => s.id === 'slide-promexma-rpa')
  const rpaInitBlock = rpaSlide?.blocks.find((b) => b.type === 'initiatives')
  const rpaInsightBlock = rpaSlide?.blocks.find((b) => b.type === 'text')

  // slide-automatizaciones
  const autoSlide = slides.find((s) => s.id === 'slide-automatizaciones')
  const autoInitBlock = autoSlide?.blocks.find((b) => b.type === 'initiatives')

  // slide-impacto
  const impactoSlide = slides.find((s) => s.id === 'slide-impacto')
  const metricsBlock = impactoSlide?.blocks.find((b) => b.type === 'metrics')
  const calloutBlock = impactoSlide?.blocks.find((b) => b.type === 'text')

  return (
    <div
      style={{
        fontFamily: 'var(--font-sans)',
        color: 'var(--color-text)',
        display: 'flex',
        flexDirection: 'column',
        gap: '3rem',
        padding: '2rem',
        maxWidth: '1200px',
        margin: '0 auto',
      }}
    >
      {/* ── Portada ── */}
      {heroBlock?.type === 'hero' && (
        <header
          style={{
            borderBottom: '1px solid var(--color-border)',
            paddingBottom: '2rem',
          }}
        >
          <p
            style={{
              fontSize: 'var(--text-xs)',
              color: 'var(--color-text-muted)',
              textTransform: 'uppercase',
              letterSpacing: '0.08em',
              marginBottom: '0.5rem',
            }}
          >
            {heroBlock.area} · {heroBlock.period}
          </p>
          <h1
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'var(--text-4xl)',
              fontWeight: 400,
              margin: '0 0 0.5rem',
            }}
          >
            {heroBlock.title}
          </h1>
          {heroBlock.subtitle && (
            <p
              style={{
                fontSize: 'var(--text-base)',
                color: 'var(--color-text-muted)',
                maxWidth: '60ch',
                marginBottom: '2rem',
              }}
            >
              {heroBlock.subtitle}
            </p>
          )}
          {heroBlock.metrics && heroBlock.metrics.length > 0 && (
            <div style={{ display: 'flex', gap: '2rem', flexWrap: 'wrap' }}>
              {heroBlock.metrics.map((m) => (
                <div key={m.label}>
                  <p
                    style={{
                      fontSize: 'var(--text-3xl)',
                      fontFamily: 'var(--font-mono)',
                      color: m.threshold ? thresholdColor[m.threshold] : 'var(--color-accent)',
                      margin: 0,
                    }}
                  >
                    {m.value}
                  </p>
                  <p
                    style={{
                      fontSize: 'var(--text-xs)',
                      color: 'var(--color-text-muted)',
                      margin: 0,
                    }}
                  >
                    {m.label}
                  </p>
                </div>
              ))}
            </div>
          )}
        </header>
      )}

      {/* ── Promexma RPA ── */}
      <section aria-labelledby="heading-rpa">
        <h2
          id="heading-rpa"
          style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'var(--text-2xl)',
            fontWeight: 400,
            marginBottom: '0.25rem',
          }}
        >
          Promexma RPA
        </h2>
        {rpaInsightBlock?.type === 'text' && rpaInsightBlock.body && (
          <p
            style={{
              fontSize: 'var(--text-sm)',
              color: 'var(--color-text-muted)',
              marginBottom: '1.5rem',
              maxWidth: '70ch',
              borderLeft: '2px solid var(--color-accent)',
              paddingLeft: '1rem',
            }}
          >
            {rpaInsightBlock.body}
          </p>
        )}
        {rpaInitBlock?.type === 'initiatives' &&
          rpaInitBlock.items.map((init) => (
            <InitCard key={init.id} item={init} />
          ))}
      </section>

      {/* ── Automatizaciones ── */}
      <section aria-labelledby="heading-auto">
        <h2
          id="heading-auto"
          style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'var(--text-2xl)',
            fontWeight: 400,
            marginBottom: '1.5rem',
          }}
        >
          Automatizaciones
        </h2>
        {autoInitBlock?.type === 'initiatives' && (
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
              gap: '1rem',
            }}
          >
            {autoInitBlock.items.map((init) => (
              <InitCard key={init.id} item={init} />
            ))}
          </div>
        )}
      </section>

      {/* ── Impacto ── */}
      <section aria-labelledby="heading-impacto">
        <h2
          id="heading-impacto"
          style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'var(--text-2xl)',
            fontWeight: 400,
            marginBottom: '1.5rem',
          }}
        >
          Impacto de las mejoras
        </h2>
        {metricsBlock?.type === 'metrics' && (
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(2, 1fr)',
              gap: '1rem',
              marginBottom: '1.5rem',
            }}
          >
            {metricsBlock.items.map((item) => (
              <div
                key={item.label}
                style={{
                  background: 'var(--color-surface)',
                  border: '1px solid var(--color-border)',
                  borderRadius: 'var(--radius-lg)',
                  padding: '1.25rem 1.5rem',
                }}
              >
                <p
                  style={{
                    fontSize: 'var(--text-3xl)',
                    fontFamily: 'var(--font-mono)',
                    color: item.threshold
                      ? thresholdColor[item.threshold]
                      : 'var(--color-accent)',
                    margin: '0 0 0.25rem',
                  }}
                >
                  {item.value}
                  {item.unit && (
                    <span
                      style={{
                        fontSize: 'var(--text-base)',
                        marginLeft: '0.25rem',
                        color: 'var(--color-text-muted)',
                      }}
                    >
                      {item.unit}
                    </span>
                  )}
                </p>
                <p
                  style={{
                    fontSize: 'var(--text-sm)',
                    color: 'var(--color-text-muted)',
                    margin: 0,
                  }}
                >
                  {item.label}
                </p>
              </div>
            ))}
          </div>
        )}
        {calloutBlock?.type === 'text' && (
          <div
            style={{
              background: 'var(--color-surface)',
              border: '1px solid var(--color-border)',
              borderLeft: '3px solid var(--color-secondary)',
              borderRadius: 'var(--radius-md)',
              padding: '1.25rem 1.5rem',
            }}
          >
            {calloutBlock.heading && (
              <p
                style={{
                  fontSize: 'var(--text-sm)',
                  fontWeight: 600,
                  marginBottom: '0.5rem',
                  margin: '0 0 0.5rem',
                }}
              >
                {calloutBlock.heading}
              </p>
            )}
            {calloutBlock.body && (
              <p
                style={{
                  fontSize: 'var(--text-sm)',
                  color: 'var(--color-text-muted)',
                  margin: 0,
                }}
              >
                {calloutBlock.body}
              </p>
            )}
          </div>
        )}
      </section>
    </div>
  )
}

// ── Local sub-component (inline, no imports from core) ──

type InitItem = {
  id: string
  title: string
  status: string
  owner?: string | undefined
  description?: string | undefined
}

type Initiative = {
  id: string
  title: string
  description?: string | undefined
  status: string
  impact?: string | undefined
  progress?: number | undefined
  tags?: string[] | undefined
  items?: InitItem[] | undefined
}

function InitCard({ item }: { item: Initiative }) {
  const statusColor: Record<string, string> = {
    completed: 'var(--color-threshold-perfect)',
    active: 'var(--color-threshold-excellent)',
    planned: 'var(--color-threshold-optimal)',
    paused: 'var(--color-text-muted)',
    cancelled: 'var(--color-threshold-attention)',
  }

  return (
    <div
      style={{
        background: 'var(--color-surface)',
        border: '1px solid var(--color-border)',
        borderRadius: 'var(--radius-lg)',
        padding: '1.25rem 1.5rem',
        display: 'flex',
        flexDirection: 'column',
        gap: '0.75rem',
      }}
    >
      {/* Header */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'flex-start',
          gap: '1rem',
        }}
      >
        <h3
          style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'var(--text-lg)',
            fontWeight: 400,
            margin: 0,
          }}
        >
          {item.title}
        </h3>
        <span
          style={{
            fontSize: 'var(--text-xs)',
            color: statusColor[item.status] ?? 'var(--color-text-muted)',
            whiteSpace: 'nowrap',
            border: `1px solid ${statusColor[item.status] ?? 'var(--color-border)'}`,
            borderRadius: 'var(--radius-full)',
            padding: '0.125rem 0.625rem',
          }}
        >
          {statusLabel[item.status] ?? item.status}
        </span>
      </div>

      {/* Description */}
      {item.description && (
        <p
          style={{
            fontSize: 'var(--text-sm)',
            color: 'var(--color-text-muted)',
            margin: 0,
            lineHeight: 1.6,
          }}
        >
          {item.description}
        </p>
      )}

      {/* Progress bar */}
      {item.progress !== undefined && (
        <div>
          <div
            style={{
              height: '4px',
              background: 'var(--color-border)',
              borderRadius: 'var(--radius-full)',
              overflow: 'hidden',
            }}
          >
            <div
              style={{
                width: `${item.progress}%`,
                height: '100%',
                background:
                  item.progress === 100
                    ? 'var(--color-threshold-perfect)'
                    : 'var(--color-accent)',
                borderRadius: 'var(--radius-full)',
              }}
            />
          </div>
          <p
            style={{
              fontSize: 'var(--text-xs)',
              color: 'var(--color-text-muted)',
              margin: '0.25rem 0 0',
              textAlign: 'right',
            }}
          >
            {item.progress} %{item.impact ? ` · ${impactLabel[item.impact] ?? item.impact}` : ''}
          </p>
        </div>
      )}

      {/* Sub-items */}
      {item.items && item.items.length > 0 && (
        <ul
          style={{
            margin: 0,
            padding: 0,
            listStyle: 'none',
            display: 'flex',
            flexDirection: 'column',
            gap: '0.375rem',
          }}
        >
          {item.items.map((sub) => (
            <li
              key={sub.id}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                fontSize: 'var(--text-xs)',
                color:
                  sub.status === 'completed'
                    ? 'var(--color-text-muted)'
                    : 'var(--color-text)',
              }}
            >
              <span
                style={{
                  width: '6px',
                  height: '6px',
                  borderRadius: 'var(--radius-full)',
                  flexShrink: 0,
                  background:
                    statusColor[sub.status] ?? 'var(--color-border)',
                }}
              />
              {sub.title}
            </li>
          ))}
        </ul>
      )}

      {/* Tags */}
      {item.tags && item.tags.length > 0 && (
        <div style={{ display: 'flex', gap: '0.375rem', flexWrap: 'wrap' }}>
          {item.tags.map((tag) => (
            <span
              key={tag}
              style={{
                fontSize: 'var(--text-xs)',
                color: 'var(--color-text-muted)',
                background: 'var(--color-bg)',
                border: '1px solid var(--color-border)',
                borderRadius: 'var(--radius-sm)',
                padding: '0.125rem 0.5rem',
              }}
            >
              {tag}
            </span>
          ))}
        </div>
      )}
    </div>
  )
}
