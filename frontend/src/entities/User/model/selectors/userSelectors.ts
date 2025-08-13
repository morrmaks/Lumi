import { StateSchema } from '@/app/providers/StoreProvider'

export const getUserSettings = (state: StateSchema) =>
  state.user.settings ?? {
    orderNotifications: true,
    marketingNotifications: false,
    newsNotifications: false,
  }

export const getUserIsForgotPassword = (state: StateSchema) =>
  state.user.isForgotPassword

export const getUserInited = (state: StateSchema) => state.user.inited

export const getUserAuthData = (state: StateSchema) =>
  state.user.authData ?? {
    id: '',
    username: '',
    email: '',
    avatar: '',
    phone: '',
    orders: [],
    isActivated: false,
  }
