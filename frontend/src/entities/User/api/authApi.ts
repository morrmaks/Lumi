import { rtkApi } from '@/shared/api'
import { ApiMap } from '@/shared/consts'
import { removeAccessToken, setAccessToken } from '@/shared/lib/utils'
import { Settings, userActions } from '@/entities/User'
import { forgotPasswordActions, ResetPasswordFormValues } from '@/features/Auth'
import {
  ForgotPasswordFormValues,
  LoginFormValues,
  RegisterFormValues,
} from '@/features/Auth'
import {
  ProfileCardFormValues,
  ProfileSettingsFormValues,
} from '@/features/Profile'
import { User } from '../model/types/user'

export const authApi = rtkApi.injectEndpoints({
  endpoints: (build) => ({
    postLogin: build.mutation<User, LoginFormValues>({
      query: (credentials) => ({
        url: ApiMap.LOGIN,
        method: 'POST',
        body: credentials,
      }),
      transformResponse: (response: {
        accessToken: string
        user: User
      }) => {
        setAccessToken(response.accessToken)
        return response.user
      },
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled
          if (data) {
            dispatch(authApi.util.upsertQueryData('getMe', undefined, data))
            dispatch(userActions.setUser(data))
          }
        } catch (e) {
          console.log(e)
        }
      },
    }),

    postRegister: build.mutation<User, RegisterFormValues>({
      query: (credentials) => ({
        url: ApiMap.REGISTER,
        method: 'POST',
        body: credentials,
      }),
      transformResponse: (response: {
        accessToken: string
        user: User
      }) => {
        setAccessToken(response.accessToken)
        return response.user
      },
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled
          if (data) {
            dispatch(authApi.util.upsertQueryData('getMe', undefined, data))
            dispatch(userActions.setUser(data))
          }
        } catch (e) {
          console.log(e)
        }
      },
    }),

    postLogout: build.mutation<{ message: string }, void>({
      query: () => ({ url: ApiMap.LOGOUT, method: 'POST' }),
      transformResponse: (response: { message: string }) => {
        removeAccessToken()
        return response
      },
    }),

    postForgotPassword: build.mutation<string, ForgotPasswordFormValues>({
      query: (payload) => ({
        url: ApiMap.FORGOT_PASSWORD,
        method: 'POST',
        body: payload,
      }),
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled
          if (data) dispatch(forgotPasswordActions.setEmail(data))
        } catch (e) {
          console.log(e)
        }
      },
    }),

    postResetPassword: build.mutation<
      User,
      ResetPasswordFormValues & { email: string }
    >({
      query: (payload) => ({
        url: ApiMap.RESET_PASSWORD,
        method: 'POST',
        body: payload,
      }),
      transformResponse: (response: {
        accessToken: string
        user: User
      }) => {
        setAccessToken(response.accessToken)
        return response.user
      },
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled
          if (data) {
            dispatch(userActions.setUser(data))
            dispatch(authApi.util.upsertQueryData('getMe', undefined, data))
          }
        } catch (e) {
          console.log(e)
        }
      },
    }),

    getMe: build.query<User, void>({
      query: () => ({ url: ApiMap.GET_ME }),
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled
          if (data) dispatch(userActions.setUser(data))
        } catch (e) {
          console.log(e)
        }
      },
    }),

    getOrdersCount: build.query<number, void>({
      query: () => ({ url: ApiMap.GET_ORDERS_COUNT }),
      keepUnusedDataFor: 0,
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled
          if (data) dispatch(userActions.setOrdersCount(data))
        } catch (e) {
          console.log(e)
        }
      },
    }),

    patchMe: build.mutation<User, ProfileCardFormValues>({
      query: (payload) => ({
        url: ApiMap.UPDATE_USER,
        method: 'PATCH',
        body: payload,
      }),
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled
          if (data) {
            dispatch(authApi.util.upsertQueryData('getMe', undefined, data))
            dispatch(userActions.setUser(data))
          }
        } catch (e) {
          console.log(e)
        }
      },
    }),

    patchAvatar: build.mutation<string, FormData>({
      query: (payload) => ({
        url: ApiMap.UPDATE_AVATAR,
        method: 'PATCH',
        body: payload,
      }),
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled
          if (data) dispatch(userActions.setUserAvatar(data))
        } catch (e) {
          console.log(e)
        }
      },
    }),

    patchSettings: build.mutation<Settings, Settings>({
      query: (payload) => ({
        url: ApiMap.UPDATE_SETTINGS,
        method: 'PATCH',
        body: payload,
      }),
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled
          if (data) dispatch(userActions.setUserSettings(data))
        } catch (e) {
          console.log(e)
        }
      },
    }),

    patchPassword: build.mutation<
      { message: string },
      ProfileSettingsFormValues
    >({
      query: (payload) => ({
        url: ApiMap.UPDATE_PASSWORD,
        method: 'PATCH',
        body: payload,
      }),
    }),

    deleteUser: build.mutation<{ message: string }, void>({
      query: () => ({ url: ApiMap.DELETE_USER, method: 'DELETE' }),
      transformResponse: (response: { message: string }) => {
        removeAccessToken()
        return response
      },
    }),
  }),
})

export const {
  usePostLoginMutation,
  usePostRegisterMutation,
  usePostLogoutMutation,
  usePostForgotPasswordMutation,
  usePostResetPasswordMutation,
  useGetMeQuery,
  useGetOrdersCountQuery,
  usePatchMeMutation,
  usePatchAvatarMutation,
  usePatchSettingsMutation,
  usePatchPasswordMutation,
  useDeleteUserMutation,
} = authApi
