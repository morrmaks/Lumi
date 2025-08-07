import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { ProfileCardSchema } from '@/features/Profile/ProfileCardForm'

const initialState: ProfileCardSchema = {
  username: '',
  email: '',
  phone: '',
  isLoading: false,
}

const profileCardSlice = createSlice({
  name: 'profileCard',
  initialState,
  reducers: {
    setEmail(state, action: PayloadAction<string>) {
      state.email = action.payload
    },
    setUsername(state, action: PayloadAction<string>) {
      state.username = action.payload
    },
    setPhone(state, action: PayloadAction<string>) {
      state.phone = action.payload
    },
    setForm(
      state,
      action: PayloadAction<{ username: string; email: string; phone: string }>
    ) {
      state.username = action.payload.username
      state.email = action.payload.email
      state.phone = action.payload.phone
    },
  },
})

export const { actions: profileCardActions } = profileCardSlice
export const { reducer: profileCardReducer } = profileCardSlice
