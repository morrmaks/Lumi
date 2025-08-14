import { ReactNode } from 'react'
import { getRouteAuth, getRouteMain } from '@/shared/consts/router'
import { Navigate } from 'react-router-dom'

interface ProtectedRouteProps {
  children: ReactNode
  anonimOnly?: boolean
  authOnly?: boolean
}

export const ProtectedRoute = ({
  children,
  anonimOnly = false,
  authOnly = false,
}: ProtectedRouteProps) => {
  // const isAuth = useAppSelector(getUserAuthData)
  const isAuth = false

  if (anonimOnly && isAuth) {
    return <Navigate to={getRouteMain()} />
  }
  if (authOnly && !isAuth) {
    return <Navigate to={getRouteAuth()} />
  }
  return children
}
