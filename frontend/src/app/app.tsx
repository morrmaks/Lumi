import { AppRouter } from '@/app/providers/Router'
import { Suspense } from 'react'
import { useLocation } from 'react-router-dom'

export const App = () => {
  const location = useLocation()

  return (
    <div>
      <Suspense key={location.pathname} fallback={<h1>Loading</h1>}>
        {true && <AppRouter />}
      </Suspense>
    </div>
  )
}
