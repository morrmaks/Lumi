import { Suspense, useCallback } from 'react'
import { Route, Routes } from 'react-router-dom'
import { type RouteConfig, routeConfig } from '../config/routeConfig'
import { ProtectedRoute } from './ProtectedRoute'

export const AppRouter = () => {
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
    <Suspense fallback={<h1>Loading</h1>}>
      <Routes>{renderRoutes(routeConfig)}</Routes>
    </Suspense>
  )
}
