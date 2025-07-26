import { Outlet } from 'react-router-dom'
import { AppLink } from '@/shared/ui/AppLink'
import {
  getRouteAuthForgotPassword,
  getRouteAuthLogin,
  getRouteAuthRegister,
} from '@/shared/consts/router'
import { Suspense } from 'react'

const AuthPage = () => {
  return (
    <div>
      <h1>Авторизация</h1>
      <AppLink to={getRouteAuthLogin()}>Вход</AppLink>
      <AppLink to={getRouteAuthRegister()}>Регистрация</AppLink>
      <AppLink to={getRouteAuthForgotPassword()}>Забыли пароль?</AppLink>
      <Suspense fallback={null}>
        <Outlet />
      </Suspense>
    </div>
  )
}

export default AuthPage
