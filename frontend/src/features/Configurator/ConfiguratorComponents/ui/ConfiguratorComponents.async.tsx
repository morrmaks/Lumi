import { lazy } from 'react'
export const ConfiguratorComponentsAsync = lazy(
  () => import('./ConfiguratorComponents')
)
