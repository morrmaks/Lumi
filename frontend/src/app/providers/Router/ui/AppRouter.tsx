import { Suspense, useCallback } from 'react'
import { Route, Routes, useLocation } from 'react-router-dom'
import { type RouteConfig, routeConfig } from '../config/routeConfig'
import { ProtectedRoute } from './ProtectedRoute'
import { Loader } from '@/shared/ui/Loader'

export const AppRouter = () => {
  const location = useLocation()

  const renderRoutes = useCallback((routeConfig: RouteConfig) => {
    return Object.values(routeConfig).map(
      ({ path, index, element, subRoutes, anonymOnly, authOnly }) => {
        if (index) {
          return (
            <Route
              index
              key={path || 'index'}
              element={
                <ProtectedRoute anonimOnly={anonymOnly} authOnly={authOnly}>
                  {element}
                </ProtectedRoute>
              }
            />
          )
        }

        return (
          <Route
            key={path}
            path={path}
            element={
              <ProtectedRoute anonimOnly={anonymOnly} authOnly={authOnly}>
                {element}
              </ProtectedRoute>
            }
          >
            {subRoutes ? renderRoutes(subRoutes) : null}
          </Route>
        )
      }
    )
  }, [])

  return (
    <Suspense fallback={<Loader />}>
      <Routes>{renderRoutes(routeConfig)}</Routes>
    </Suspense>
  )
}
