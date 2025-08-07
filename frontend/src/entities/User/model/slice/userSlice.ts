import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { UserSchema, User, Settings } from '../types/user'

const initialState: UserSchema = {
  isForgotPassword: false,
  inited: false,
}

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setAuthData(state, action: PayloadAction<User>) {
      state.authData = action.payload
    },
    setInited: (state) => {
      state.inited = true
    },
    setIsForgotPassword: (state) => {
      state.isForgotPassword = true
    },
    setSettings: (state, action: PayloadAction<Settings>) => {
      state.settings = action.payload
    },
    setSetting: (
      state,
      action: PayloadAction<{ name: keyof Settings; value: boolean }>
    ) => {
      const { name, value } = action.payload

      if (state.settings) {
        state.settings[name] = value
      }
    },
    clearUser(state) {
      state.authData = undefined
    },
  },
})

export const { actions: userActions } = userSlice
export const { reducer: userReducer } = userSlice
