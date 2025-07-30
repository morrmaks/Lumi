import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { RegisterSchema } from '@/features/Register'

const initialState: RegisterSchema = {
  email: '',
  password: '',
  isLoading: false,
}

const registerSlice = createSlice({
  name: 'register',
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

export const { actions: registerActions } = registerSlice
export const { reducer: registerReducer } = registerSlice
