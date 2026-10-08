import content from './content'

const thresholdColor: Record<string, string> = {
  perfect:   'var(--color-threshold-perfect)',
  excellent: 'var(--color-threshold-excellent)',
  optimal:   'var(--color-threshold-optimal)',
  attention: 'var(--color-threshold-attention)',
}

export default function Indicadores() {
  const kpisSlide   = content.slides.find((s) => s.id === 'slide-kpis')
  const volSlide    = content.slides.find((s) => s.id === 'slide-volumen')
  const metricsBlock  = kpisSlide?.blocks.find((b) => b.type === 'metrics')
  const progressBlock = kpisSlide?.blocks.find((b) => b.type === 'progress')
  const chartBlock    = volSlide?.blocks.find((b) => b.type === 'chart')
  const insightBlock  = volSlide?.blocks.find((b) => b.type === 'text')

  return (
    <div style={{ fontFamily: 'var(--font-sans)', color: 'var(--color-text)', maxWidth: '960px', display: 'flex', flexDirection: 'column', gap: '2.5rem' }}>
      <header>
        <p style={{ fontFamily: 'var(--font-mono)', fontSize: 'var(--text-xs)', letterSpacing: '0.1em', textTransform: 'uppercase', color: '#9E9690', margin: '0 0 0.5rem' }}>
          RESULTADOS OPERATIVOS · Q1
        </p>
        <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 'var(--text-3xl)', fontWeight: 400, margin: 0, letterSpacing: '-0.02em', color: '#1A1916' }}>
          Evidencias e indicadores
        </h1>
      </header>

      {/* KPI cards */}
      {metricsBlock?.type === 'metrics' && (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))', gap: '1rem' }}>
          {metricsBlock.items.map((item) => (
            <div key={item.label} style={{ background: 'rgba(255,255,255,0.8)', border: '1px solid rgba(0,0,0,0.07)', borderRadius: 'var(--radius-lg)', padding: '1.25rem' }}>
              <p style={{ fontFamily: 'var(--font-mono)', fontSize: 'var(--text-2xl)', color: item.threshold ? thresholdColor[item.threshold] : 'var(--color-accent)', margin: '0 0 0.25rem', letterSpacing: '-0.02em' }}>
                {item.value}{item.unit && <span style={{ fontSize: 'var(--text-sm)', marginLeft: '2px' }}>{item.unit}</span>}
              </p>
              <p style={{ fontSize: 'var(--text-xs)', color: '#9E9690', margin: 0 }}>{item.label}</p>
            </div>
          ))}
        </div>
      )}

      {/* Progress bars */}
      {progressBlock?.type === 'progress' && (
        <div style={{ background: 'rgba(255,255,255,0.8)', border: '1px solid rgba(0,0,0,0.07)', borderRadius: 'var(--radius-lg)', padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <p style={{ fontFamily: 'var(--font-mono)', fontSize: 'var(--text-xs)', letterSpacing: '0.08em', textTransform: 'uppercase', color: '#9E9690', margin: 0 }}>
            Cobertura por actividad
          </p>
          {progressBlock.items.map((item) => (
            <div key={item.label}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.3rem' }}>
                <span style={{ fontSize: 'var(--text-sm)', color: '#1A1916' }}>{item.label}</span>
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: 'var(--text-sm)', color: item.threshold ? thresholdColor[item.threshold] : 'var(--color-text)' }}>{item.current} %</span>
              </div>
              <div style={{ height: '6px', background: '#E8E4DD', borderRadius: 'var(--radius-full)', overflow: 'hidden' }}>
                <div style={{ width: `${item.current}%`, height: '100%', background: item.threshold ? thresholdColor[item.threshold] : 'var(--color-accent)', borderRadius: 'var(--radius-full)', transition: 'width 0.6s ease' }} />
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Volume chart */}
      {chartBlock?.type === 'chart' && (
        <div style={{ background: 'rgba(255,255,255,0.8)', border: '1px solid rgba(0,0,0,0.07)', borderRadius: 'var(--radius-lg)', padding: '1.5rem' }}>
          <p style={{ fontFamily: 'var(--font-display)', fontSize: 'var(--text-lg)', fontWeight: 400, margin: '0 0 1rem', color: '#1A1916' }}>{chartBlock.title}</p>
          <BarChart series={(chartBlock.series ?? []).map((s) => ({ name: s.name, data: s.data.map((d) => ({ x: String(d.x), y: d.y })) }))} />
          {chartBlock.caption && <p style={{ fontSize: 'var(--text-xs)', color: '#B5B0A8', margin: '0.75rem 0 0', fontFamily: 'var(--font-mono)' }}>{chartBlock.caption}</p>}
        </div>
      )}

      {/* Insight */}
      {insightBlock?.type === 'text' && insightBlock.body && (
        <div style={{ borderLeft: '3px solid var(--color-accent)', paddingLeft: '1rem' }}>
          <p style={{ fontSize: 'var(--text-sm)', color: '#6B6660', margin: 0, lineHeight: 1.6 }}>{insightBlock.body}</p>
        </div>
      )}
    </div>
  )
}

type SeriesPoint = { x: string; y: number }
type Series = { name: string; data: SeriesPoint[] }

function BarChart({ series }: { series: Series[] }) {
  if (!series.length) return null
  const months = series[0]?.data.map((d) => d.x.slice(5)) ?? []
  const colors = ['var(--color-accent)', 'var(--color-secondary)', 'var(--color-threshold-perfect)']
  const allVals = series.flatMap((s) => s.data.map((d) => d.y))
  const maxVal = Math.max(...allVals, 1)
  const barW = 16
  const gap = 6
  const groupW = series.length * barW + (series.length - 1) * gap
  const chartW = months.length * (groupW + 24)
  const chartH = 160

  return (
    <div style={{ overflowX: 'auto' }}>
      <div style={{ display: 'flex', gap: '1rem', marginBottom: '0.75rem', flexWrap: 'wrap' }}>
        {series.map((s, i) => (
          <span key={s.name} style={{ display: 'flex', alignItems: 'center', gap: '0.375rem', fontSize: 'var(--text-xs)', color: '#6B6660' }}>
            <span style={{ width: 10, height: 10, borderRadius: 2, background: colors[i] ?? '#888', display: 'inline-block' }} />
            {s.name}
          </span>
        ))}
      </div>
      <svg width={chartW + 20} height={chartH + 32} viewBox={`0 0 ${chartW + 20} ${chartH + 32}`}>
        {months.map((m, mi) => {
          const gx = 10 + mi * (groupW + 24)
          return (
            <g key={m}>
              {series.map((s, si) => {
                const val = s.data[mi]?.y ?? 0
                const bh = (val / maxVal) * chartH
                const bx = gx + si * (barW + gap)
                return (
                  <g key={si}>
                    <rect x={bx} y={chartH - bh} width={barW} height={bh} rx={3} fill={colors[si] ?? '#888'} opacity={0.85} />
                    <text x={bx + barW / 2} y={chartH - bh - 4} textAnchor="middle" fontSize={9} fill="#6B6660">{val.toLocaleString('es-CO')}</text>
                  </g>
                )
              })}
              <text x={gx + groupW / 2} y={chartH + 16} textAnchor="middle" fontSize={10} fill="#9E9690">{m}</text>
            </g>
          )
        })}
      </svg>
    </div>
  )
}
