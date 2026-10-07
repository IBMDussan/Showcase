import { Component, type ErrorInfo, type ReactNode } from 'react'

interface Props {
  children: ReactNode
  fallback?: ReactNode
  /** In dev mode, shows error details. In prod, hides the section. */
  slug?: string
}

interface State {
  hasError: boolean
  error: Error | null
}

export class SectionErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props)
    this.state = { hasError: false, error: null }
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error }
  }

  override componentDidCatch(error: Error, info: ErrorInfo) {
    console.error(`[SectionErrorBoundary] slug="${this.props.slug}"`, error, info)
  }

  override render() {
    if (!this.state.hasError) return this.props.children

    if (this.props.fallback) return this.props.fallback

    const isDev = import.meta.env.DEV

    if (!isDev) {
      // In production: silently hide the broken section
      return null
    }

    // In dev: show error card
    return (
      <div
        role="alert"
        style={{
          border: '2px solid #ef4444',
          borderRadius: 8,
          padding: '1rem',
          background: '#fef2f2',
          color: '#991b1b',
          fontFamily: 'monospace',
          fontSize: 13,
        }}
      >
        <strong>Section error [{this.props.slug ?? 'unknown'}]</strong>
        <pre style={{ whiteSpace: 'pre-wrap', marginTop: 8 }}>
          {this.state.error?.message}
        </pre>
      </div>
    )
  }
}
