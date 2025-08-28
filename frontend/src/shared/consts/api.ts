export const ApiMap = {
  YA_SUGGEST: 'https://suggest-maps.yandex.ru/v1/',
  BASE_API: process.env.BASE_API,

  // Auth
  REGISTER: '/auth/register',
  LOGIN: '/auth/login',
  LOGOUT: '/auth/logout',
  REFRESH: '/auth/refresh',
  FORGOT_PASSWORD: '/auth/forgot-password',
  RESET_PASSWORD: '/auth/reset-password',

  // User
  GET_ME: '/user/me',
  GET_ORDERS_COUNT: '/user/me/orders-count',
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
  ADD_PRODUCTS_TO_BASKET: '/basket/products',
  GET_BASKET_PRODUCTS: '/basket/products',
  DELETE_PRODUCT_FROM_BASKET: '/basket/product',
  INCREASE_PRODUCT_QUANTITY: '/basket/product',
  DECREASE_PRODUCT_QUANTITY: '/basket/product',

  // Wishlist
  GET_WISHLIST: '/wishlist',
  GET_WISHLIST_PRODUCTS: '/wishlist/products',
  CLEAR_WISHLIST: '/wishlist',
  ADD_PRODUCT_TO_WISHLIST: '/wishlist/product',
  DELETE_PRODUCT_FROM_WISHLIST: '/wishlist/product',
  ADD_PRODUCTS_TO_WISHLIST: '/wishlist/products',
  DELETE_PRODUCTS_FROM_WISHLIST: '/wishlist/products',

  // Configurator
  SET_CONFIGURE: '/configurator',
  GET_CONFIGURE: '/configurator',
  CLEAR_CONFIGURE: '/configurator',
  ADD_COMPONENT: '/configurator/component',
  DELETE_COMPONENT: '/configurator/component',
  ADD_COMPONENTS: '/configurator/components',
  GET_CONFIGURE_COMPONENTS: '/configurator/components',

  // Orders
  GET_ORDERS: '/orders',
  GET_ORDER: '/orders',
  GET_ORDER_PRODUCTS: '/orders',
  CREATE_ORDER: '/orders',
  PAY_ORDER: '/orders',

  // Health
  HEALTH: '/health',
} as const

export type ApiMap = (typeof ApiMap)[keyof typeof ApiMap]
