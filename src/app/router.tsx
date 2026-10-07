import { createHashRouter } from 'react-router'
import { lazy, Suspense } from 'react'
import { Hub } from './hub'
import { Shell } from './shell'

const DevKit = lazy(() => import('../dev/kit/index'))

export const router = createHashRouter([
  {
    path: '/',
    element: <Hub />,
  },
  {
    path: '/s/:slug',
    element: <Shell />,
  },
  {
    path: '/s/:slug/*',
    element: <Shell />,
  },
  {
    path: '/_kit',
    element: (
      <Suspense fallback={<div>Loading kit…</div>}>
        <DevKit />
      </Suspense>
    ),
  },
])
