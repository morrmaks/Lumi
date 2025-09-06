import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { UserSchema, User, Settings } from '../types/user'
import { authApi } from '../../api'

const initialState: UserSchema = {}

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser(state, action: PayloadAction<User>) {
      state.user = action.payload
    },
    setOrdersCount(state, action: PayloadAction<number>) {
      if (state.user) {
        state.user.ordersCount = action.payload
      }
    },
    setUserSettings: (state, action: PayloadAction<Settings>) => {
      if (state.user) {
        state.user.settings = action.payload
      }
    },
    setUserAvatar: (state, action: PayloadAction<string>) => {
      if (state.user) {
        state.user.avatarUrl = action.payload
      }
    },
    clearUser(state) {
      state.user = undefined
    },
  },
  extraReducers: (builder) => {
    builder.addMatcher(authApi.endpoints.deleteUser.matchFulfilled, (state) => {
      state.user = undefined
    })
    builder.addMatcher(authApi.endpoints.postLogout.matchFulfilled, (state) => {
      state.user = undefined
    })
  },
})

export const { actions: userActions } = userSlice
export const { reducer: userReducer } = userSlice
