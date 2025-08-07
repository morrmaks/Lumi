import { StateSchema } from '@/app/providers/StoreProvider'

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
