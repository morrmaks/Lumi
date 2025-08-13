import { StateSchema } from '@/app/providers/StoreProvider'

export const getLoginState = (state: StateSchema) =>
  state?.loginForm ?? { email: '', password: '', isLoading: false }
