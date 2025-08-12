export const ProfilePageTabs = {
  PROFILE: 'Профиль',
  ORDERS: 'Заказы',
  WISHLIST: 'Избранное',
  SETTINGS: 'Настройки',
} as const

export type ProfilePageTabs =
  (typeof ProfilePageTabs)[keyof typeof ProfilePageTabs]
