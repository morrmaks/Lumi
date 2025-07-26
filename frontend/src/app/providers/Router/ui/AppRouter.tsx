import { Suspense, useCallback } from 'react'
import { Route, Routes } from 'react-router-dom'
import {
  type RouteConfig,
  routeConfig,
} from '@/shared/config/routeConfig/routeConfig'

export const AppRouter = () => {
  const renderRoutes = useCallback((routeConfig: RouteConfig) => {
    return Object.values(routeConfig).map(
      ({ path, index, element, subRoutes }) => {
        if (index) {
          return <Route key={path || 'index'} element={element} index />
        }

        return (
          <Route key={path} path={path} element={element}>
            {subRoutes ? renderRoutes(subRoutes) : null}
          </Route>
        )
      }
    )
  }, [])

  return (
    <Suspense fallback={<h1>Loading</h1>}>
      <Routes>{renderRoutes(routeConfig)}</Routes>
    </Suspense>
  )
}
