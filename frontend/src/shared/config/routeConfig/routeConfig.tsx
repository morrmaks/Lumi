import {
  AppRoutes,
  getRouteAuth,
  getRouteCatalog,
  getRouteConfigurator,
  getRouteAuthForgotPassword,
  getRouteAuthLogin,
  getRouteMain,
  getRouteProfile,
  getRouteAuthRegister,
  getRouteWishlist,
} from '@/shared/consts/router'
import { Navigate, RouteProps } from 'react-router-dom'

import { MainPage } from '@/pages/Main'
import { RegisterPage } from '@/pages/Register'
import { LoginPage } from '@/pages/Login'
import { NotFoundPage } from '@/pages/NotFound'
import { WishListPage } from '@/pages/WishList'
import { ConfiguratorPage } from '@/pages/Configurator'
import { CatalogPage } from '@/pages/Catalog'
import { ProfilePage } from '@/pages/Profile'
import { AuthPage } from '@/pages/Auth'
import { ForgotPasswordPage } from '@/pages/Forgot-password'

export type RouteConfigProps = {
  subRoutes?: RouteConfig
} & RouteProps

export type RouteConfig = OptionalRecord<AppRoutes, RouteConfigProps>

export const routeConfig: RouteConfig = {
  [AppRoutes.MAIN]: {
    path: getRouteMain(),
    element: <MainPage />,
  },
  [AppRoutes.AUTH]: {
    path: getRouteAuth(),
    element: <AuthPage />,
    subRoutes: {
      [AppRoutes.LOGIN]: {
        path: getRouteAuthLogin(),
        element: <LoginPage />,
      },
      [AppRoutes.REGISTER]: {
        path: getRouteAuthRegister(),
        element: <RegisterPage />,
      },
      [AppRoutes.FORGOT_PASSWORD]: {
        path: getRouteAuthForgotPassword(),
        element: <ForgotPasswordPage />,
      },
      auth: {
        index: true,
        element: <Navigate to={getRouteAuthLogin()} />,
      },
    },
  },
  [AppRoutes.PROFILE]: {
    path: getRouteProfile(),
    element: <ProfilePage />,
  },
  [AppRoutes.CONFIGURATOR]: {
    path: getRouteConfigurator(),
    element: <ConfiguratorPage />,
  },
  [AppRoutes.CATALOG]: {
    path: getRouteCatalog(),
    element: <CatalogPage />,
  },
  [AppRoutes.WISHLIST]: {
    path: getRouteWishlist(),
    element: <WishListPage />,
  },
  [AppRoutes.NOT_FOUND]: {
    path: '*',
    element: <NotFoundPage />,
  },
}
