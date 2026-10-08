import content from './content'

const statusLabel: Record<string, string> = { active: 'En progreso', completed: 'Completado', planned: 'Planeado', paused: 'Pausado' }
const statusColor: Record<string, string> = {
  active:    'var(--color-threshold-excellent)',
  completed: 'var(--color-threshold-perfect)',
  planned:   'var(--color-threshold-optimal)',
  paused:    'var(--color-text-muted)',
}
const statusBg: Record<string, string> = {
  active: '#DBEAFE', completed: '#D1FAE5', planned: '#FEF3C7', paused: '#F3F4F6',
}

type InitItem = { id: string; title: string; status: string; owner?: string | undefined; description?: string | undefined }
type Initiative = {
  id: string; title: string; description?: string | undefined; status: string;
  impact?: string | undefined; progress?: number | undefined;
  tags?: string[] | undefined; items?: InitItem[] | undefined
}

function InitCard({ item }: { item: Initiative }) {
  return (
    <div style={{ background: 'rgba(255,255,255,0.8)', border: '1px solid rgba(0,0,0,0.07)', borderRadius: 'var(--radius-lg)', padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '0.875rem' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '0.75rem' }}>
        <h3 style={{ fontFamily: 'var(--font-display)', fontSize: 'var(--text-lg)', fontWeight: 400, margin: 0, color: '#1A1916', lineHeight: 1.25 }}>{item.title}</h3>
        <span style={{ fontSize: '0.6rem', fontFamily: 'var(--font-mono)', letterSpacing: '0.06em', textTransform: 'uppercase', background: statusBg[item.status] ?? '#F3F4F6', color: statusColor[item.status] ?? '#6B6660', borderRadius: 'var(--radius-full)', padding: '0.2rem 0.6rem', whiteSpace: 'nowrap', flexShrink: 0 }}>
          {statusLabel[item.status] ?? item.status}
        </span>
      </div>

      {item.description && <p style={{ fontSize: 'var(--text-sm)', color: '#6B6660', margin: 0, lineHeight: 1.6 }}>{item.description}</p>}

      {item.progress !== undefined && (
        <div>
          <div style={{ height: 5, background: '#E8E4DD', borderRadius: 'var(--radius-full)', overflow: 'hidden', marginBottom: '0.25rem' }}>
            <div style={{ width: `${item.progress}%`, height: '100%', background: item.progress === 100 ? 'var(--color-threshold-perfect)' : 'var(--color-accent)', borderRadius: 'var(--radius-full)' }} />
          </div>
          <p style={{ fontSize: 'var(--text-xs)', color: '#B5B0A8', margin: 0, textAlign: 'right', fontFamily: 'var(--font-mono)' }}>{item.progress} %</p>
        </div>
      )}

      {item.items && item.items.length > 0 && (
        <ul style={{ margin: 0, padding: 0, listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.375rem' }}>
          {item.items.map((sub) => (
            <li key={sub.id} style={{ display: 'flex', gap: '0.5rem', alignItems: 'center', fontSize: 'var(--text-xs)', color: sub.status === 'completed' ? '#9E9690' : '#1A1916' }}>
              <span style={{ width: 6, height: 6, borderRadius: '50%', background: statusColor[sub.status] ?? '#D0CBC4', flexShrink: 0 }} />
              {sub.title}
            </li>
          ))}
        </ul>
      )}

      {item.tags && item.tags.length > 0 && (
        <div style={{ display: 'flex', gap: '0.375rem', flexWrap: 'wrap' }}>
          {item.tags.map((tag) => (
            <span key={tag} style={{ fontSize: 'var(--text-xs)', color: '#9E9690', background: '#F5F2EE', border: '1px solid #E8E4DD', borderRadius: 'var(--radius-sm)', padding: '0.15rem 0.5rem', fontFamily: 'var(--font-mono)' }}>{tag}</span>
          ))}
        </div>
      )}
    </div>
  )
}

export default function Iniciativas() {
  const slide = content.slides.find((s) => s.id === 'slide-iniciativas')
  const initB = slide?.blocks.find((b) => b.type === 'initiatives')

  return (
    <div style={{ fontFamily: 'var(--font-sans)', color: 'var(--color-text)', maxWidth: '1100px' }}>
      <p style={{ fontFamily: 'var(--font-mono)', fontSize: 'var(--text-xs)', letterSpacing: '0.1em', textTransform: 'uppercase', color: '#9E9690', margin: '0 0 0.5rem' }}>
        Q1 2026
      </p>
      <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 'var(--text-3xl)', fontWeight: 400, margin: '0 0 2rem', color: '#1A1916' }}>
        Presentación de iniciativas
      </h1>

      {initB?.type === 'initiatives' && (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '1.25rem' }}>
          {initB.items.map((item) => (
            <InitCard key={item.id} item={item as Initiative} />
          ))}
        </div>
      )}
    </div>
  )
}
