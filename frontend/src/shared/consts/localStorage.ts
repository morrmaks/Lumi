export const LocalStorage = {
  ACCESS_TOKEN: 'accessToken',
  THEME: 'Lumi_theme',
  PRODUCTS_VIEW: 'Lumi_categoryPage_view',
} as const

export type LocalStorage = (typeof LocalStorage)[keyof typeof LocalStorage]
