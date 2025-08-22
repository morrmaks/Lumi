export const LocalStorage = {
  ACCESS_TOKEN: 'accessToken',
  THEME: 'Lumi_theme',
  PRODUCTS_VIEW: 'Lumi_categoryPage_view',
  BASKET: 'Lumi_basket',
  WISHLIST: 'Lumi_wishlist',
  CONFIGURATOR: 'Lumi_configurator',
} as const

export type LocalStorage = (typeof LocalStorage)[keyof typeof LocalStorage]
