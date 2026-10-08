import content from './content'

export default function MmPerformance() {
  const slide     = content.slides.find((s) => s.id === 'slide-mm-kpis')
  const metricsB  = slide?.blocks.find((b) => b.type === 'metrics')
  const chartB    = slide?.blocks.find((b) => b.type === 'chart')
  const insightB  = slide?.blocks.find((b) => b.type === 'text')

  const thColor: Record<string, string> = {
    perfect: 'var(--color-threshold-perfect)',
    excellent: 'var(--color-threshold-excellent)',
    optimal: 'var(--color-threshold-optimal)',
    attention: 'var(--color-threshold-attention)',
  }

  return (
    <div style={{ fontFamily: 'var(--font-sans)', color: 'var(--color-text)', maxWidth: '960px', display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      <header>
        <p style={{ fontFamily: 'var(--font-mono)', fontSize: 'var(--text-xs)', letterSpacing: '0.1em', textTransform: 'uppercase', color: '#9E9690', margin: '0 0 0.5rem' }}>
          MM PERFORMANCE · Q1–Q2 2026
        </p>
        <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 'var(--text-3xl)', fontWeight: 400, margin: 0, color: '#1A1916' }}>
          MM Performance &amp; Metrics
        </h1>
      </header>

      {metricsB?.type === 'metrics' && (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(160px, 1fr))', gap: '1rem' }}>
          {metricsB.items.map((item) => (
            <div key={item.label} style={{ background: 'rgba(255,255,255,0.8)', border: '1px solid rgba(0,0,0,0.07)', borderRadius: 'var(--radius-lg)', padding: '1.25rem' }}>
              <p style={{ fontFamily: 'var(--font-mono)', fontSize: 'var(--text-2xl)', color: item.threshold ? thColor[item.threshold] : 'var(--color-accent)', margin: '0 0 0.25rem' }}>
                {item.value}
              </p>
              <p style={{ fontSize: 'var(--text-xs)', color: '#9E9690', margin: 0 }}>{item.label}</p>
            </div>
          ))}
        </div>
      )}

      {chartB?.type === 'chart' && chartB.series && chartB.series.length >= 2 && (
        <div style={{ background: 'rgba(255,255,255,0.8)', border: '1px solid rgba(0,0,0,0.07)', borderRadius: 'var(--radius-lg)', padding: '1.5rem' }}>
          <p style={{ fontFamily: 'var(--font-display)', fontSize: 'var(--text-lg)', fontWeight: 400, margin: '0 0 1rem', color: '#1A1916' }}>{chartB.title}</p>
          <ComboChart submissions={(chartB.series[0]?.data ?? []).map((d) => ({ x: String(d.x), y: d.y }))} rating={(chartB.series[1]?.data ?? []).map((d) => ({ x: String(d.x), y: d.y }))} />
          {chartB.caption && <p style={{ fontSize: 'var(--text-xs)', color: '#B5B0A8', margin: '0.75rem 0 0', fontFamily: 'var(--font-mono)' }}>{chartB.caption}</p>}
        </div>
      )}

      {insightB?.type === 'text' && insightB.body && (
        <div style={{ borderLeft: '3px solid var(--color-accent)', paddingLeft: '1rem' }}>
          <p style={{ fontSize: 'var(--text-sm)', color: '#6B6660', margin: 0, lineHeight: 1.6 }}>{insightB.body}</p>
        </div>
      )}
    </div>
  )
}

type Point = { x: string; y: number }

function ComboChart({ submissions, rating }: { submissions: Point[]; rating: Point[] }) {
  const months = submissions.map((d) => d.x.slice(5))
  const maxSub = Math.max(...submissions.map((d) => d.y), 1)
  const W = 480; const H = 160; const pad = 40; const barW = 48
  const bx = (i: number) => pad + i * ((W - pad * 2) / (submissions.length - 1 || 1)) - barW / 2

  // Rating scale: 3.5 to 4.5
  const rMin = 3.5; const rMax = 4.6
  const ry = (v: number) => H - ((v - rMin) / (rMax - rMin)) * H * 0.8 - H * 0.1

  return (
    <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', marginBottom: '0.5rem' }}>
      {[{ label: 'Submissions', color: 'var(--color-accent)' }, { label: 'Avg Rating', color: '#1A1916' }].map((l) => (
        <span key={l.label} style={{ display: 'flex', alignItems: 'center', gap: '0.375rem', fontSize: 'var(--text-xs)', color: '#6B6660' }}>
          <span style={{ width: 10, height: 10, borderRadius: 2, background: l.color, display: 'inline-block' }} /> {l.label}
        </span>
      ))}
      <svg width={W} height={H + 28} viewBox={`0 0 ${W} ${H + 28}`} style={{ display: 'block', overflow: 'visible' }}>
        {submissions.map((d, i) => {
          const bh = (d.y / maxSub) * H * 0.85
          return (
            <g key={i}>
              <rect x={bx(i)} y={H - bh} width={barW} height={bh} rx={4} fill="var(--color-accent)" opacity={0.75} />
              <text x={bx(i) + barW / 2} y={H - bh - 5} textAnchor="middle" fontSize={10} fill="#6B6660">{d.y}</text>
              <text x={bx(i) + barW / 2} y={H + 16} textAnchor="middle" fontSize={10} fill="#9E9690">{months[i]}</text>
            </g>
          )
        })}
        <polyline
          points={rating.map((d, i) => `${bx(i) + barW / 2},${ry(d.y)}`).join(' ')}
          fill="none" stroke="#1A1916" strokeWidth={2} strokeLinejoin="round"
        />
        {rating.map((d, i) => (
          <g key={i}>
            <circle cx={bx(i) + barW / 2} cy={ry(d.y)} r={5} fill="white" stroke="#1A1916" strokeWidth={2} />
            <text x={bx(i) + barW / 2} y={ry(d.y) - 9} textAnchor="middle" fontSize={10} fill="#1A1916" fontWeight={600}>{d.y.toFixed(2)}</text>
          </g>
        ))}
      </svg>
    </div>
  )
}
