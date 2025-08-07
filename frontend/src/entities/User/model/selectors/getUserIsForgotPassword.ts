import { StateSchema } from '@/app/providers/StoreProvider'

export const getUserIsForgotPassword = (state: StateSchema) =>
  state.user.isForgotPassword
