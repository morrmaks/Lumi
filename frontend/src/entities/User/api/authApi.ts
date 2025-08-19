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
import { IOrder } from '@/features/Order'

interface UserDataObject {
  id: string
  email: string
  name: string
  avatarUrl?: string
  phone?: string
  settings?: Settings
  orders?: IOrder[]
}

export const authApi = rtkApi.injectEndpoints({
  endpoints: (build) => ({
    postLogin: build.mutation<UserDataObject, LoginFormValues>({
      query: (credentials) => ({
        url: ApiMap.LOGIN,
        method: 'POST',
        body: credentials,
      }),
      transformResponse: (response: {
        accessToken: string
        user: UserDataObject
      }) => {
        setAccessToken(response.accessToken)
        return response.user
      },
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        const { data } = await queryFulfilled
        if (data) {
          dispatch(authApi.util.upsertQueryData('getMe', undefined, data))
          dispatch(userActions.setUser(data))
        }
      },
    }),

    postRegister: build.mutation<UserDataObject, RegisterFormValues>({
      query: (credentials) => ({
        url: ApiMap.REGISTER,
        method: 'POST',
        body: credentials,
      }),
      transformResponse: (response: {
        accessToken: string
        user: UserDataObject
      }) => {
        setAccessToken(response.accessToken)
        return response.user
      },
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        const { data } = await queryFulfilled
        if (data) {
          dispatch(authApi.util.upsertQueryData('getMe', undefined, data))
          dispatch(userActions.setUser(data))
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
      transformResponse: (response: string) => response,
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        const { data } = await queryFulfilled
        if (data) {
          dispatch(forgotPasswordActions.setEmail(data))
        }
      },
    }),

    postResetPassword: build.mutation<
      UserDataObject,
      ResetPasswordFormValues & { email: string }
    >({
      query: (payload) => ({
        url: ApiMap.RESET_PASSWORD,
        method: 'POST',
        body: payload,
      }),
      transformResponse: (response: {
        accessToken: string
        user: UserDataObject
      }) => {
        setAccessToken(response.accessToken)
        return response.user
      },
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        const { data } = await queryFulfilled
        const cleanedUser: User = {
          id: data.id,
          name: data.name,
          email: data.email,
          avatarUrl: data.avatarUrl,
          phone: data.phone,
          orders: data.orders,
          settings: {
            orderNotifications: data.settings?.orderNotifications ?? false,
            marketingNotifications:
              data.settings?.marketingNotifications ?? false,
            newsNotifications: data.settings?.newsNotifications ?? false,
          },
        }

        dispatch(userActions.setUser(cleanedUser))
      },
    }),

    getMe: build.query<UserDataObject, void>({
      query: () => ({ url: ApiMap.GET_ME }),
      transformResponse: (response: UserDataObject) => response,
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        const { data } = await queryFulfilled
        if (data) {
          dispatch(userActions.setUser(data))
        }
      },
    }),

    patchMe: build.mutation<UserDataObject, ProfileCardFormValues>({
      query: (payload) => ({
        url: ApiMap.UPDATE_USER,
        method: 'PATCH',
        body: payload,
      }),
      transformResponse: (response: UserDataObject) => response,
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        const { data } = await queryFulfilled
        if (data) {
          dispatch(authApi.util.upsertQueryData('getMe', undefined, data))
          dispatch(userActions.setUser(data))
        }
      },
    }),

    patchAvatar: build.mutation<string, FormData>({
      query: (payload) => ({
        url: ApiMap.UPDATE_AVATAR,
        method: 'PATCH',
        body: payload,
      }),
      transformResponse: (response: string) => response,
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        const { data } = await queryFulfilled
        if (data) {
          dispatch(userActions.setUserAvatar(data))
        }
      },
    }),

    patchSettings: build.mutation<Settings, Settings>({
      query: (payload) => ({
        url: ApiMap.UPDATE_SETTINGS,
        method: 'PATCH',
        body: payload,
      }),
      transformResponse: (response: Settings) => response,
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        const { data } = await queryFulfilled
        if (data) {
          dispatch(userActions.setUserSettings(data))
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
      transformResponse: (response: { message: string }) => response,
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
  usePatchMeMutation,
  usePatchAvatarMutation,
  usePatchSettingsMutation,
  usePatchPasswordMutation,
  useDeleteUserMutation,
} = authApi
