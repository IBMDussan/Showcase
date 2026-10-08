import content from './content'

const priorityColor: Record<string, string> = {
  high: 'var(--color-accent)',
  medium: 'var(--color-threshold-optimal)',
  low: 'var(--color-text-muted)',
}

export default function Objetivos() {
  const slide = content.slides.find((s) => s.id === 'slide-objetivos')
  const textBlock = slide?.blocks.find((b) => b.type === 'text')
  const actionsBlock = slide?.blocks.find((b) => b.type === 'actions')

  return (
    <div style={{ fontFamily: 'var(--font-sans)', color: 'var(--color-text)', maxWidth: '900px' }}>
      <p style={{ fontFamily: 'var(--font-mono)', fontSize: 'var(--text-xs)', letterSpacing: '0.1em', textTransform: 'uppercase', color: '#9E9690', margin: '0 0 0.75rem' }}>
        ITERACIÓN · METODOLOGÍA ÁGIL · Q1 2026
      </p>
      <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 'var(--text-3xl)', fontWeight: 400, margin: '0 0 1rem', letterSpacing: '-0.02em', color: '#1A1916' }}>
        Objetivos de la iteración
      </h1>
      {textBlock?.type === 'text' && textBlock.body && (
        <p style={{ fontSize: 'var(--text-base)', color: '#6B6660', maxWidth: '56ch', lineHeight: 1.65, margin: '0 0 2.5rem' }}>
          {textBlock.body}
        </p>
      )}
      {actionsBlock?.type === 'actions' && (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))', gap: '1rem' }}>
          {actionsBlock.items.map((item) => (
            <div key={item.id} style={{
              background: 'rgba(255,255,255,0.8)',
              border: '1px solid rgba(0,0,0,0.07)',
              borderLeft: `3px solid ${priorityColor[item.priority ?? 'medium'] ?? 'var(--color-accent)'}`,
              borderRadius: 'var(--radius-lg)',
              padding: '1.25rem 1.5rem',
              boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
            }}>
              <p style={{ fontSize: 'var(--text-sm)', color: '#1A1916', margin: '0 0 0.75rem', lineHeight: 1.55 }}>{item.text}</p>
              <span style={{
                fontFamily: 'var(--font-mono)', fontSize: '0.6rem', letterSpacing: '0.08em',
                textTransform: 'uppercase', color: priorityColor[item.priority ?? 'medium'],
                border: `1px solid ${priorityColor[item.priority ?? 'medium']}`,
                borderRadius: 'var(--radius-full)', padding: '0.15rem 0.5rem',
              }}>
                {item.priority === 'high' ? 'Alta prioridad' : 'Media prioridad'}
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
