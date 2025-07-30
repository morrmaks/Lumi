export interface ResetPasswordSchema {
  codeFromEmail: string
  newPassword: string
  isLoading: boolean
  error?: string
}
