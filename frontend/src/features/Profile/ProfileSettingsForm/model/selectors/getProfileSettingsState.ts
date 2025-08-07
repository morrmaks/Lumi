import { StateSchema } from '@/app/providers/StoreProvider'

export const getProfileSettingsState = (state: StateSchema) =>
  state?.profileSettingsForm ?? {
    currentPassword: '',
    newPassword: '',
    isLoading: false,
  }
