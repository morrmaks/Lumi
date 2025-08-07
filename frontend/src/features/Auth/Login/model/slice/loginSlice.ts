import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { LoginSchema } from '@/features/Auth/Login'

const initialState: LoginSchema = {
  email: '',
  password: '',
  isLoading: false,
}

const loginSlice = createSlice({
  name: 'login',
  initialState,
  reducers: {
    setEmail(state, action: PayloadAction<string>) {
      state.email = action.payload
    },
    setPassword(state, action: PayloadAction<string>) {
      state.password = action.payload
    },
  },
})

export const { actions: loginActions } = loginSlice
export const { reducer: loginReducer } = loginSlice
