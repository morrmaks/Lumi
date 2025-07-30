import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { ForgotPasswordSchema } from '../types/forgotPasswordSchema'

const initialState: ForgotPasswordSchema = {
  email: '',
  isLoading: false,
}

const forgotPasswordSlice = createSlice({
  name: 'forgotPassword',
  initialState,
  reducers: {
    setEmail(state, action: PayloadAction<string>) {
      state.email = action.payload
    },
  },
})

export const { actions: forgotPasswordActions } = forgotPasswordSlice
export const { reducer: forgotPasswordReducer } = forgotPasswordSlice
