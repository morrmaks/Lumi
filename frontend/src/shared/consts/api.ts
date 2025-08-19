export const ApiMap = {
  BASE_API: 'http://localhost:4000/api',
  STATIC: 'http://localhost:4000/static/',

  // Auth
  REGISTER: '/auth/register',
  LOGIN: '/auth/login',
  LOGOUT: '/auth/logout',
  REFRESH: '/auth/refresh',
  FORGOT_PASSWORD: '/auth/forgot-password',
  RESET_PASSWORD: '/auth/reset-password',

  // User
  GET_ME: '/user/me',
  UPDATE_USER: '/user/me',
  UPDATE_AVATAR: '/user/me/avatar',
  UPDATE_SETTINGS: '/user/me/settings',
  UPDATE_PASSWORD: '/user/me/password',
  DELETE_USER: '/user/me',

  // Categories
  GET_CATEGORIES: '/categories',

  // Products
  GET_PRODUCTS: '/products',

  // Banners
  GET_BANNERS: '/banners',

  // Basket
  GET_BASKET: '/basket',
  CLEAR_BASKET: '/basket',
  ADD_PRODUCT_TO_BASKET: '/basket/product',
  DELETE_PRODUCT_FROM_BASKET: '/basket/product/:productId',
  INCREASE_PRODUCT_QUANTITY: '/basket/product/:productId/increase',
  DECREASE_PRODUCT_QUANTITY: '/basket/product/:productId/decrease',
  ADD_PRODUCTS_TO_BASKET: '/basket/products',

  // Wishlist
  GET_WISHLIST: '/wishlist',
  CLEAR_WISHLIST: '/wishlist',
  ADD_PRODUCT_TO_WISHLIST: '/wishlist/product',
  DELETE_PRODUCT_FROM_WISHLIST: '/wishlist/product/:productId',
  ADD_PRODUCTS_TO_WISHLIST: '/wishlist/products',
  DELETE_PRODUCTS_FROM_WISHLIST: '/wishlist/products',

  // Configurator
  GET_CONFIGURE: '/configurator',
  CLEAR_CONFIGURE: '/configurator',
  ADD_COMPONENT: '/configurator/component',
  DELETE_COMPONENT: '/configurator/component/:componentId',
  ADD_COMPONENTS: '/configurator/components',

  // Orders
  GET_ORDERS: '/orders',
  GET_ORDER: '/orders/:id',
  CREATE_ORDER: '/orders',

  // Health
  HEALTH: '/health',
} as const

export type ApiMap = (typeof ApiMap)[keyof typeof ApiMap]
