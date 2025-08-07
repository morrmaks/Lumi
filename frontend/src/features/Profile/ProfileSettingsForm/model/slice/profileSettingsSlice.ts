import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { ProfileSettingsSchema } from '../types/profileSettingsSchema'

const initialState: ProfileSettingsSchema = {
  currentPassword: '',
  newPassword: '',
  isLoading: false,
}

const profileSettingsSlice = createSlice({
  name: 'profileSettings',
  initialState,
  reducers: {
    setCurrentPassword(state, action: PayloadAction<string>) {
      state.currentPassword = action.payload
    },
    setNewPassword(state, action: PayloadAction<string>) {
      state.newPassword = action.payload
    },
  },
})

export const { actions: profileSettingsActions } = profileSettingsSlice
export const { reducer: profileSettingsReducer } = profileSettingsSlice
