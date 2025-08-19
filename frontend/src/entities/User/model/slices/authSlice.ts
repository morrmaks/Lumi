import { AuthSchema } from '@/entities/User'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { authApi } from '@/entities/User/api'

const initialState: AuthSchema = {
  inited: false,
  isAuth: false,
}

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setIsAuth(state, action: PayloadAction<boolean>) {
      state.isAuth = action.payload
    },
    setInited: (state) => {
      state.inited = true
    },
  },
  extraReducers: (builder) => {
    builder.addMatcher(
      authApi.endpoints.postResetPassword.matchFulfilled,
      (state) => {
        state.isAuth = true
      }
    )
    builder.addMatcher(authApi.endpoints.getMe.matchFulfilled, (state) => {
      state.isAuth = true
      state.inited = true
    })
    builder.addMatcher(authApi.endpoints.getMe.matchRejected, (state) => {
      state.inited = true
    })
    builder.addMatcher(
      authApi.endpoints.postRegister.matchFulfilled,
      (state) => {
        state.isAuth = true
      }
    )
    builder.addMatcher(authApi.endpoints.postLogin.matchFulfilled, (state) => {
      state.isAuth = true
    })
    builder.addMatcher(authApi.endpoints.postLogout.matchFulfilled, (state) => {
      state.isAuth = false
    })
    builder.addMatcher(authApi.endpoints.deleteUser.matchFulfilled, (state) => {
      state.isAuth = false
    })
  },
})

export const { actions: authActions } = authSlice
export const { reducer: authReducer } = authSlice
