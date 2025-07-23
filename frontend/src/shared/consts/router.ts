export const AppRoutes = {
  MAIN: 'main',
  LOGIN: 'login',
  REGISTER: 'register',
  WISHLIST: 'wishlist',
  CONFIGURATOR: 'configurator',
  NOT_FOUND: 'not-found',
} as const

export type AppRoutes = (typeof AppRoutes)[keyof typeof AppRoutes]

export const getRouteMain = () => '/'
export const getRouteLogin = () => '/login'
export const getRouteRegister = () => '/register'
export const getRouteConfigurator = () => '/configurator'
export const getRouteWishlist = () => '/wishlist'
