import { StateSchema } from '@/app/providers/StoreProvider'

export const getForgotPasswordEmail = (state: StateSchema) =>
  state?.forgotPassword.email ?? ''

export const getIsForgotPassword = (state: StateSchema) =>
  state?.forgotPassword.isForgotPassword ?? false
