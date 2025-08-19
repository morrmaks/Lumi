import { ReactNode } from 'react'
import { getRouteAuth, getRouteMain } from '@/shared/consts/router'
import { Navigate } from 'react-router-dom'
import { useAppSelector } from '@/shared/lib/hooks'
import { getUserIsAuth } from '@/entities/User'

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
  const isAuth = useAppSelector(getUserIsAuth)

  if (anonimOnly && isAuth) {
    return <Navigate to={getRouteMain()} />
  }
  if (authOnly && !isAuth) {
    return <Navigate to={getRouteAuth()} />
  }
  return children
}
