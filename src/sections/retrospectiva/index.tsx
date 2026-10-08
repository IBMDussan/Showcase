import content from './content'

const CATEGORIES = [
  { key: 'went-well', label: '¿Qué salió bien?',      border: 'var(--color-threshold-perfect)',   bg: '#F0FDF4', dot: 'var(--color-threshold-perfect)'  },
  { key: 'improve',   label: '¿Qué necesita cambio?', border: 'var(--color-threshold-optimal)',   bg: '#FFFBEB', dot: 'var(--color-threshold-optimal)'   },
  { key: 'action',    label: 'Nuevas ideas',           border: 'var(--color-accent)',              bg: '#EFF6FF', dot: 'var(--color-accent)'              },
] as const

export default function Retrospectiva() {
  const slide  = content.slides.find((s) => s.id === 'slide-retro')
  const retroB = slide?.blocks.find((b) => b.type === 'retro')

  return (
    <div style={{ fontFamily: 'var(--font-sans)', color: 'var(--color-text)', maxWidth: '1000px' }}>
      <p style={{ fontFamily: 'var(--font-mono)', fontSize: 'var(--text-xs)', letterSpacing: '0.1em', textTransform: 'uppercase', color: '#9E9690', margin: '0 0 0.5rem' }}>
        Q1 2026
      </p>
      <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 'var(--text-3xl)', fontWeight: 400, margin: '0 0 2rem', color: '#1A1916' }}>
        Retrospectiva
      </h1>

      {retroB?.type === 'retro' && (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '1.25rem' }}>
          {CATEGORIES.map((cat) => {
            const items = retroB.items.filter((i) => i.category === cat.key)
            return (
              <div key={cat.key} style={{
                background: cat.bg,
                border: '1px solid rgba(0,0,0,0.07)',
                borderTop: `3px solid ${cat.border}`,
                borderRadius: 'var(--radius-lg)',
                padding: '1.25rem 1.5rem',
              }}>
                <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.6rem', letterSpacing: '0.1em', textTransform: 'uppercase', color: cat.border, margin: '0 0 1rem', fontWeight: 600 }}>
                  {cat.label}
                </p>
                <ul style={{ margin: 0, padding: 0, listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                  {items.map((item) => (
                    <li key={item.id} style={{ display: 'flex', gap: '0.625rem', alignItems: 'flex-start' }}>
                      <span style={{ width: 7, height: 7, borderRadius: '50%', background: cat.dot, flexShrink: 0, marginTop: '0.35rem' }} />
                      <span style={{ fontSize: 'var(--text-sm)', color: '#1A1916', lineHeight: 1.55 }}>{item.text}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}
