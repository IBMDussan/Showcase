import content from './content'

function pctColor(v: number): string {
  if (v >= 100) return 'var(--color-threshold-perfect)'
  if (v >= 95)  return 'var(--color-threshold-excellent)'
  if (v >= 80)  return 'var(--color-threshold-optimal)'
  return 'var(--color-threshold-attention)'
}

export default function Desempeno() {
  const slide  = content.slides.find((s) => s.id === 'slide-desempeno')
  const tableB = slide?.blocks.find((b) => b.type === 'table')

  return (
    <div style={{ fontFamily: 'var(--font-sans)', color: 'var(--color-text)', maxWidth: '1100px' }}>
      <p style={{ fontFamily: 'var(--font-mono)', fontSize: 'var(--text-xs)', letterSpacing: '0.1em', textTransform: 'uppercase', color: '#9E9690', margin: '0 0 0.5rem' }}>
        DESEMPEÑO DE EQUIPO · Q1 2026
      </p>
      <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 'var(--text-3xl)', fontWeight: 400, margin: '0 0 2rem', color: '#1A1916' }}>
        Métricas de desempeño
      </h1>

      {tableB?.type === 'table' && (
        <div style={{ overflowX: 'auto', borderRadius: 'var(--radius-lg)', border: '1px solid rgba(0,0,0,0.07)' }}>
          <table style={{ borderCollapse: 'collapse', width: '100%', fontSize: 'var(--text-sm)' }}>
            <thead>
              <tr style={{ background: '#1A1916' }}>
                {tableB.columns.map((col) => (
                  <th key={col.key} style={{
                    padding: '0.875rem 1rem', textAlign: col.type === 'text' && col.key === 'name' ? 'left' : 'center',
                    color: 'rgba(255,255,255,0.9)', fontWeight: 500, fontSize: 'var(--text-xs)',
                    letterSpacing: '0.04em', whiteSpace: 'nowrap',
                  }}>
                    {col.label}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {tableB.rows.map((row, ri) => (
                <tr key={ri} style={{ background: ri % 2 === 0 ? 'rgba(255,255,255,0.8)' : 'rgba(250,250,248,0.6)', borderBottom: '1px solid rgba(0,0,0,0.05)' }}>
                  {tableB.columns.map((col) => {
                    const val = row[col.key]
                    if (col.type === 'text' && col.key === 'name') {
                      return <td key={col.key} style={{ padding: '0.75rem 1rem', color: '#1A1916', fontWeight: 500, whiteSpace: 'nowrap' }}>{String(val ?? '')}</td>
                    }
                    if (col.type === 'percent') {
                      const n = typeof val === 'number' ? val : parseFloat(String(val ?? '0'))
                      return (
                        <td key={col.key} style={{ padding: '0.75rem 1rem', textAlign: 'center', fontFamily: 'var(--font-mono)', fontSize: 'var(--text-xs)', color: pctColor(n), fontWeight: 600 }}>
                          {n.toFixed(2).replace('.', ',')} %
                        </td>
                      )
                    }
                    if (col.type === 'status') {
                      return (
                        <td key={col.key} style={{ padding: '0.75rem 1rem', textAlign: 'center' }}>
                          <span style={{ background: '#D1FAE5', color: '#065F46', borderRadius: 'var(--radius-full)', padding: '0.15rem 0.6rem', fontSize: '0.6rem', fontFamily: 'var(--font-mono)', letterSpacing: '0.06em', fontWeight: 600 }}>
                            {String(val ?? '')}
                          </span>
                        </td>
                      )
                    }
                    return <td key={col.key} style={{ padding: '0.75rem 1rem', textAlign: 'center', fontFamily: 'var(--font-mono)', fontSize: 'var(--text-xs)', color: '#6B6660' }}>{String(val ?? '')}</td>
                  })}
                </tr>
              ))}
            </tbody>
          </table>
          {tableB.caption && (
            <div style={{ padding: '0.75rem 1rem', fontSize: 'var(--text-xs)', color: '#B5B0A8', fontFamily: 'var(--font-mono)', borderTop: '1px solid rgba(0,0,0,0.05)', background: 'rgba(255,255,255,0.5)' }}>
              {tableB.caption}
            </div>
          )}
        </div>
      )}
    </div>
  )
}
