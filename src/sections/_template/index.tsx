/**
 * _template/index.tsx
 *
 * Section component — replace with your actual slides.
 * Must export a default component; the shell wraps it.
 *
 * Rules:
 * - Only touch files inside src/sections/<your-slug>/
 * - Import shared components from @core/components/ and @core/charts/
 * - Import helpers from @core/lib/
 * - Do NOT modify hub.tsx, shell.tsx, registry.ts or any shared file
 */
import content from './content'

export default function TemplateSection() {
  return (
    <div style={{ fontFamily: 'var(--font-sans)', padding: '2rem' }}>
      <h2 style={{ fontFamily: 'var(--font-display)' }}>_template</h2>
      <p style={{ color: 'var(--color-text-muted)' }}>
        This is the template section. Replace the content in{' '}
        <code>content.ts</code> and this component.
      </p>
      <pre
        style={{
          background: 'var(--color-surface)',
          border: '1px solid var(--color-border)',
          borderRadius: 'var(--radius-md)',
          padding: '1rem',
          fontSize: 'var(--text-xs)',
          overflow: 'auto',
        }}
      >
        {JSON.stringify(content, null, 2)}
      </pre>
    </div>
  )
}
