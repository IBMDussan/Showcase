import content from './content'

export default function CargueHoras() {
  const slide    = content.slides.find((s) => s.id === 'slide-cargue-horas')
  const metricsB = slide?.blocks.find((b) => b.type === 'metrics')
  const chartB   = slide?.blocks.find((b) => b.type === 'chart')
  const insightB = slide?.blocks.find((b) => b.type === 'text')

  const thColor: Record<string, string> = {
    perfect: 'var(--color-threshold-perfect)',
    excellent: 'var(--color-threshold-excellent)',
    optimal: 'var(--color-threshold-optimal)',
    attention: 'var(--color-threshold-attention)',
  }

  return (
    <div style={{ fontFamily: 'var(--font-sans)', color: 'var(--color-text)', maxWidth: '800px', display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      <header>
        <p style={{ fontFamily: 'var(--font-mono)', fontSize: 'var(--text-xs)', letterSpacing: '0.1em', textTransform: 'uppercase', color: '#9E9690', margin: '0 0 0.5rem' }}>
          SAP VS TIME · Q1 2026
        </p>
        <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 'var(--text-3xl)', fontWeight: 400, margin: 0, color: '#1A1916' }}>
          Personas con diferencia en cargue de horas
        </h1>
      </header>

      {metricsB?.type === 'metrics' && (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: '1rem' }}>
          {metricsB.items.map((item) => (
            <div key={item.label} style={{ background: 'rgba(255,255,255,0.8)', border: '1px solid rgba(0,0,0,0.07)', borderRadius: 'var(--radius-lg)', padding: '1.25rem' }}>
              <p style={{ fontFamily: 'var(--font-mono)', fontSize: 'var(--text-3xl)', color: item.threshold ? thColor[item.threshold] : 'var(--color-accent)', margin: '0 0 0.25rem' }}>
                {item.value}
                {item.unit && <span style={{ fontSize: 'var(--text-sm)', color: '#9E9690', marginLeft: '0.35rem' }}>{item.unit}</span>}
              </p>
              <p style={{ fontSize: 'var(--text-xs)', color: '#9E9690', margin: 0 }}>{item.label}</p>
            </div>
          ))}
        </div>
      )}

      {chartB?.type === 'chart' && chartB.series && chartB.series[0] && (
        <div style={{ background: 'rgba(255,255,255,0.8)', border: '1px solid rgba(0,0,0,0.07)', borderRadius: 'var(--radius-lg)', padding: '1.5rem' }}>
          <p style={{ fontFamily: 'var(--font-display)', fontSize: 'var(--text-lg)', fontWeight: 400, margin: '0 0 1.25rem', color: '#1A1916' }}>{chartB.title}</p>
          <LineChart data={chartB.series[0].data.map((d) => ({ x: String(d.x), y: d.y }))} />
          {chartB.caption && <p style={{ fontSize: 'var(--text-xs)', color: '#B5B0A8', margin: '0.75rem 0 0', fontFamily: 'var(--font-mono)' }}>{chartB.caption}</p>}
        </div>
      )}

      {insightB?.type === 'text' && insightB.body && (
        <div style={{ background: '#F0FDF4', border: '1px solid #BBF7D0', borderLeft: '3px solid var(--color-threshold-perfect)', borderRadius: 'var(--radius-md)', padding: '1rem 1.5rem', display: 'flex', gap: '0.75rem', alignItems: 'flex-start' }}>
          <span style={{ fontSize: '1.1rem', marginTop: '1px' }}>✓</span>
          <div>
            <p style={{ fontWeight: 600, margin: '0 0 0.25rem', fontSize: 'var(--text-sm)', color: '#065F46' }}>Excelente progreso</p>
            <p style={{ fontSize: 'var(--text-sm)', color: '#047857', margin: 0, lineHeight: 1.6 }}>{insightB.body}</p>
          </div>
        </div>
      )}
    </div>
  )
}

type Point = { x: string; y: number }

function LineChart({ data }: { data: Point[] }) {
  const W = 440; const H = 140; const pad = 40
  const months = data.map((d) => d.x.slice(5))
  const maxY = Math.max(...data.map((d) => d.y), 3)
  const px = (i: number) => pad + (i / (data.length - 1)) * (W - pad * 2)
  const py = (v: number) => H - (v / maxY) * H * 0.8 - H * 0.1
  const pts = data.map((d, i) => `${px(i)},${py(d.y)}`).join(' ')

  return (
    <svg width={W} height={H + 28} viewBox={`0 0 ${W} ${H + 28}`} style={{ display: 'block', overflow: 'visible' }}>
      {[0, 1, 2, 3].map((v) => (
        <line key={v} x1={pad} y1={py(v)} x2={W - pad} y2={py(v)} stroke="#E8E4DD" strokeWidth={1} strokeDasharray="4 2" />
      ))}
      <polyline points={pts} fill="none" stroke="var(--color-accent)" strokeWidth={2.5} strokeLinejoin="round" />
      {data.map((d, i) => (
        <g key={i}>
          <circle cx={px(i)} cy={py(d.y)} r={d.y === 0 ? 7 : 5}
            fill={d.y === 0 ? 'var(--color-threshold-perfect)' : 'var(--color-accent)'}
            stroke="white" strokeWidth={2}
          />
          <text x={px(i)} y={py(d.y) - 12} textAnchor="middle" fontSize={11} fill="#1A1916" fontWeight={600}>{d.y}</text>
          <text x={px(i)} y={H + 16} textAnchor="middle" fontSize={10} fill="#9E9690">{months[i]}</text>
        </g>
      ))}
    </svg>
  )
}
