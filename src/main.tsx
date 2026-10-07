/* Fontsource variable fonts */
import '@fontsource-variable/inter'
import '@fontsource-variable/source-serif-4'
import '@fontsource/ibm-plex-mono/400.css'
import '@fontsource/ibm-plex-mono/600.css'

/* Design tokens + Tailwind base */
import './core/theme/tokens.css'

import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { RouterProvider } from 'react-router'
import { router } from './app/router'

// Theme initialization — run before first render to prevent flash
const stored = localStorage.getItem('theme')
const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
const theme = stored ?? (prefersDark ? 'dark' : 'light')
document.documentElement.dataset['theme'] = theme

const root = document.getElementById('root')
if (!root) throw new Error('Root element not found')

createRoot(root).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
