import {
  AppRoutes,
  getRouteConfigurator,
  getRouteLogin,
  getRouteMain,
  getRouteRegister,
  getRouteWishlist,
} from '@/shared/consts/router'
import { RouteProps } from 'react-router-dom'

import { MainPage } from '@/pages/Main';
import { RegisterPage } from '@/pages/Register';
import { LoginPage } from '@/pages/Login';
import { NotFoundPage } from '@/pages/NotFound';
import { WishListPage } from '@/pages/WishList'
import { ConfiguratorPage } from '@/pages/Configurator'

export const routeConfig: Record<AppRoutes, RouteProps> = {
  [AppRoutes.MAIN]: {
    path: getRouteMain(),
    index: true,
    element: <MainPage/>
  },
  [AppRoutes.LOGIN]: {
    path: getRouteLogin(),
    element: <LoginPage/>
  },
  [AppRoutes.REGISTER]: {
    path: getRouteRegister(),
    element: <RegisterPage/>
  },
  [AppRoutes.CONFIGURATOR]: {
    path: getRouteConfigurator(),
    element: <ConfiguratorPage/>
  },
  [AppRoutes.WISHLIST]: {
    path: getRouteWishlist(),
    element: <WishListPage/>
  },
  [AppRoutes.NOT_FOUND]: {
    path: '*',
    element: <NotFoundPage/>
  }
}