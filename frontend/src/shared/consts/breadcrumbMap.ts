export const BreadcrumbMap = {
  auth: 'Авторизация',
  login: 'Вход',
  register: 'Регистрация',
  ['forgot-password']: 'Восстановление пароля',
  ['reset-password']: 'Сброс пароля',
  profile: 'Профиль',
  wishlist: 'Избранное',
  configurator: 'Конфигуратор',
  catalog: 'Каталог',
  search: 'Поиск',
} as const

export type BreadcrumbMap = (typeof BreadcrumbMap)[keyof typeof BreadcrumbMap]
