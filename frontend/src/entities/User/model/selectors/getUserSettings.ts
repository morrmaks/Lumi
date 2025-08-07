import { StateSchema } from '@/app/providers/StoreProvider'

export const getUserSettings = (state: StateSchema) =>
  state.user.settings ?? {
    orderNotifications: true,
    marketingNotifications: false,
    newsNotifications: false,
  }
