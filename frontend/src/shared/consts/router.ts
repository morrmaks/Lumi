export const AppRoutes = {
  MAIN: 'main',
  AUTH: 'auth',
  LOGIN: 'login',
  REGISTER: 'register',
  FORGOT_PASSWORD: 'forgot-password',
  RESET_PASSWORD: 'reset-password',
  PROFILE: 'profile',
  WISHLIST: 'wishlist',
  CONFIGURATOR: 'configurator',
  CATALOG: 'catalog',
  SEARCH: 'search',
  NOT_FOUND: 'not-found',
} as const

export type AppRoutes = (typeof AppRoutes)[keyof typeof AppRoutes]

export const getRouteMain = () => '/'
export const getRouteAuth = () => '/auth'
export const getRouteAuthLogin = () => 'login'
export const getRouteAuthRegister = () => 'register'
export const getRouteAuthForgotPassword = () => 'forgot-password'
export const getRouteAuthResetPassword = () => 'reset-password'
export const getRouteProfile = () => '/profile'
export const getRouteConfigurator = () => '/configurator'
export const getRouteCatalog = () => '/catalog'
export const getRouteWishlist = () => '/wishlist'
export const getRouteSearch = () => '/search'

export const getFullRouteLogin = () => '/auth/login'
export const getFullRouteRegister = () => '/auth/register'
export const getFullRouteForgotPassword = () => '/auth/forgot-password'
export const getFullRouteResetPassword = () => '/auth/reset-password'
