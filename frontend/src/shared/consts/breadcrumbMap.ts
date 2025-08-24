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
  basket: 'Корзина',
  search: 'Поиск',
  order: 'Оформление заказа',
  ['payment-success']: 'Успешный заказ',
} as const

export type BreadcrumbMap = (typeof BreadcrumbMap)[keyof typeof BreadcrumbMap]
