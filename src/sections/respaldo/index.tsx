import content from './content'

function cellColor(v: number): string {
  if (v === 0)   return '#F0EDE8'
  if (v < 50)    return '#FEF3C7'
  if (v < 80)    return '#FDE68A'
  if (v < 100)   return '#BFDBFE'
  return '#D1FAE5'
}
function cellText(v: number): string {
  if (v === 0)   return '#B5B0A8'
  if (v < 80)    return '#92400E'
  if (v < 100)   return '#1E40AF'
  return '#065F46'
}

export default function Respaldo() {
  const slide      = content.slides.find((s) => s.id === 'slide-respaldo')
  const metricB    = slide?.blocks.find((b) => b.type === 'metrics')
  const heatmapB   = slide?.blocks.find((b) => b.type === 'heatmap')
  const calloutB   = slide?.blocks.find((b) => b.type === 'text')

  return (
    <div style={{ fontFamily: 'var(--font-sans)', color: 'var(--color-text)', maxWidth: '1000px', display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      <header>
        <p style={{ fontFamily: 'var(--font-mono)', fontSize: 'var(--text-xs)', letterSpacing: '0.1em', textTransform: 'uppercase', color: '#9E9690', margin: '0 0 0.5rem' }}>
          RESULTADOS OPERATIVOS · Q1
        </p>
        <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 'var(--text-3xl)', fontWeight: 400, margin: 0, color: '#1A1916' }}>
          Modelo de respaldo
        </h1>
      </header>

      {metricB?.type === 'metrics' && metricB.items[0] && (
        <div style={{ display: 'inline-flex', alignItems: 'baseline', gap: '0.5rem', background: 'rgba(255,255,255,0.8)', border: '1px solid rgba(0,0,0,0.07)', borderRadius: 'var(--radius-lg)', padding: '1rem 1.5rem', width: 'fit-content' }}>
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: 'var(--text-3xl)', color: 'var(--color-threshold-attention)' }}>{metricB.items[0].value} {metricB.items[0].unit}</span>
          <span style={{ fontSize: 'var(--text-sm)', color: '#9E9690' }}>{metricB.items[0].label}</span>
        </div>
      )}

      {heatmapB?.type === 'heatmap' && (
        <div style={{ background: 'rgba(255,255,255,0.8)', border: '1px solid rgba(0,0,0,0.07)', borderRadius: 'var(--radius-lg)', padding: '1.5rem', overflowX: 'auto' }}>
          <p style={{ fontFamily: 'var(--font-mono)', fontSize: 'var(--text-xs)', letterSpacing: '0.08em', textTransform: 'uppercase', color: '#9E9690', margin: '0 0 1rem' }}>
            {heatmapB.title}
          </p>
          <table style={{ borderCollapse: 'collapse', width: '100%', fontSize: 'var(--text-xs)' }}>
            <thead>
              <tr>
                <th style={{ padding: '0.5rem 0.75rem', textAlign: 'left', color: '#9E9690', fontWeight: 400, minWidth: '160px' }}>Responsable</th>
                {heatmapB.cols.map((col) => (
                  <th key={col} style={{ padding: '0.5rem 0.5rem', textAlign: 'center', color: '#9E9690', fontWeight: 400, minWidth: '90px' }}>{col}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {heatmapB.rows.map((row) => (
                <tr key={row}>
                  <td style={{ padding: '0.4rem 0.75rem', color: '#1A1916', fontSize: 'var(--text-xs)' }}>{row}</td>
                  {heatmapB.cols.map((col) => {
                    const cell = heatmapB.cells.find((c) => c.row === row && c.col === col)
                    const val = cell?.value ?? 0
                    return (
                      <td key={col} style={{ padding: '0.25rem 0.5rem', textAlign: 'center' }}>
                        <div style={{ background: cellColor(val), color: cellText(val), borderRadius: 'var(--radius-sm)', padding: '0.3rem 0.4rem', fontFamily: 'var(--font-mono)', fontWeight: 600 }}>
                          {val} %
                        </div>
                      </td>
                    )
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {calloutB?.type === 'text' && (
        <div style={{ background: 'rgba(255,255,255,0.8)', border: '1px solid rgba(0,0,0,0.07)', borderLeft: '3px solid var(--color-secondary)', borderRadius: 'var(--radius-md)', padding: '1rem 1.5rem' }}>
          {calloutB.heading && <p style={{ fontWeight: 600, margin: '0 0 0.4rem', fontSize: 'var(--text-sm)', color: '#1A1916' }}>{calloutB.heading}</p>}
          {calloutB.body && <p style={{ fontSize: 'var(--text-sm)', color: '#6B6660', margin: 0, lineHeight: 1.6 }}>{calloutB.body}</p>}
        </div>
      )}
    </div>
  )
}
