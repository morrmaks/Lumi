import { Suspense, useCallback } from 'react'
import { Route, RouteProps, Routes } from 'react-router-dom'
import { routeConfig } from '@/shared/config/routeConfig/routeConfig'

export const AppRouter = () => {
  const renderWithRouter = useCallback((route: RouteProps) => {
    const { path, index, element } = route

    return <Route key={path} index={index} path={path} element={element} />
  }, [])

  return (
    <Suspense fallback={<h1>Loading</h1>}>
      <Routes>{Object.values(routeConfig).map(renderWithRouter)}</Routes>
    </Suspense>
  )
}
