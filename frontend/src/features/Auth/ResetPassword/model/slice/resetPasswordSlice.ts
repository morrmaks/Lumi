import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { ResetPasswordSchema } from '@/features/Auth/ResetPassword'

const initialState: ResetPasswordSchema = {
  codeFromEmail: '',
  newPassword: '',
  isLoading: false,
}

const resetPasswordSlice = createSlice({
  name: 'resetPassword',
  initialState,
  reducers: {
    setCodeFromEmail(state, action: PayloadAction<string>) {
      state.codeFromEmail = action.payload
    },
    setNewPassword(state, action: PayloadAction<string>) {
      state.newPassword = action.payload
    },
  },
})

export const { actions: resetPasswordActions } = resetPasswordSlice
export const { reducer: resetPasswordReducer } = resetPasswordSlice
