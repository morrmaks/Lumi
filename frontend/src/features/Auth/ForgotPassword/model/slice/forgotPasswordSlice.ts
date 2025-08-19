import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { ForgotPasswordSchema } from '../types/forgotPasswordSchema'
import { authApi } from '@/entities/User/api'

const initialState: ForgotPasswordSchema = {
  email: '',
  isForgotPassword: false,
}

const forgotPasswordSlice = createSlice({
  name: 'forgotPassword',
  initialState,
  reducers: {
    setEmail(state, action: PayloadAction<string>) {
      state.email = action.payload
    },
    setIsForgotPassword(state, action: PayloadAction<boolean>) {
      state.isForgotPassword = action.payload
    },
  },
  extraReducers: (builder) => {
    builder.addMatcher(
      authApi.endpoints.postForgotPassword.matchFulfilled,
      (state) => {
        state.isForgotPassword = true
      }
    )
    builder.addMatcher(
      authApi.endpoints.postResetPassword.matchFulfilled,
      (state) => {
        state.isForgotPassword = false
        state.email = ''
      }
    )
  },
})

export const { actions: forgotPasswordActions } = forgotPasswordSlice
export const { reducer: forgotPasswordReducer } = forgotPasswordSlice
