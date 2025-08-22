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
  CATALOG_CATEGORY: 'catalog-category',
  CATALOG_ITEM: 'catalog-item',
  BASKET: 'basket',
  SEARCH: 'search',
  NOT_FOUND: 'not-found',
  ORDER: 'order',
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
export const getRouteCatalogCategory = (category: string) =>
  `/catalog/${category}`
export const getRouteCatalogItem = (category: string, id: string) =>
  `/catalog/${category}/${id}`
export const getRouteWishlist = () => '/wishlist'
export const getRouteBasket = () => '/basket'
export const getRouteSearch = () => '/search'
export const getRouteOrder = () => '/order'

export const getFullRouteLogin = () => '/auth/login'
export const getFullRouteRegister = () => '/auth/register'
export const getFullRouteForgotPassword = () => '/auth/forgot-password'
export const getFullRouteResetPassword = () => '/auth/reset-password'
