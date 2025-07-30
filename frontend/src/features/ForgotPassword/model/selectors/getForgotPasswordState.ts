import { StateSchema } from '@/app/providers/StoreProvider'

export const getForgotPasswordState = (state: StateSchema) =>
  state?.forgotPasswordForm ?? { email: '', isLoading: false }
