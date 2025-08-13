import { StateSchema } from '@/app/providers/StoreProvider'

export const getResetPasswordState = (state: StateSchema) =>
  state?.resetPasswordForm ?? {
    codeFromEmail: '',
    newPassword: '',
    isLoading: false,
  }
