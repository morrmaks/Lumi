import { StateSchema } from '@/app/providers/StoreProvider'

export const getUserData = (state: StateSchema) =>
  state.user.user || {
    id: '',
    name: '',
    email: '',
    avatarUrl: '',
    phone: '',
    settings: {
      orderNotifications: false,
      marketingNotifications: false,
      newsNotifications: false,
    },
    ordersCount: 0,
  }
