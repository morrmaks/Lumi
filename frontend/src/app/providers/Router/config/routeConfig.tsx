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
  getRouteSearch,
  getRouteAuthResetPassword,
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
import { ForgotPasswordPage } from '@/pages/ForgotPassword'
import { ResetPasswordPage } from '@/pages/ResetPassword'
import { SearchPage } from '@/pages/Search'

export type RouteConfigProps = {
  subRoutes?: RouteConfig
  authOnly?: boolean
  anonymOnly?: boolean
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
    anonymOnly: true,
    subRoutes: {
      [AppRoutes.LOGIN]: {
        path: getRouteAuthLogin(),
        element: <LoginPage />,
        anonymOnly: true,
      },
      [AppRoutes.REGISTER]: {
        path: getRouteAuthRegister(),
        element: <RegisterPage />,
        anonymOnly: true,
      },
      [AppRoutes.FORGOT_PASSWORD]: {
        path: getRouteAuthForgotPassword(),
        element: <ForgotPasswordPage />,
        anonymOnly: true,
      },
      [AppRoutes.RESET_PASSWORD]: {
        path: getRouteAuthResetPassword(),
        element: <ResetPasswordPage />,
        anonymOnly: true,
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
    authOnly: true,
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
  [AppRoutes.SEARCH]: {
    path: getRouteSearch(),
    element: <SearchPage />,
  },
  [AppRoutes.NOT_FOUND]: {
    path: '*',
    element: <NotFoundPage />,
  },
}
