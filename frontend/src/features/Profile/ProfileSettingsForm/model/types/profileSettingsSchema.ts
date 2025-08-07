export interface ProfileSettingsSchema {
  currentPassword: string
  newPassword: string
  isLoading: boolean
  error?: string
}
