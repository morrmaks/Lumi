import { rtkApi } from '@/shared/api'
import { ApiMap } from '@/shared/consts'
import { removeAccessToken, setAccessToken } from '@/shared/lib/utils'
import { cleanedUser, Settings, userActions } from '@/entities/User'
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
import { IOrder } from '@/features/Order'
import { wishlistApi } from '@/features/Wishlist'
import { basketApi } from '@/features/Basket'

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
        try {
          const { data } = await queryFulfilled
          if (data) {
            dispatch(authApi.util.upsertQueryData('getMe', undefined, data))
            dispatch(userActions.setUser(data))

            // dispatch(wishlistApi.endpoints.getWishlist.initiate(undefined, { subscribe: true }))
            dispatch(basketApi.endpoints.getBasket.initiate())
            // dispatch(configuratorApi.endpoints.getConfigurator.initiate())
          }
        } catch (e) {
          console.log(e)
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
        console.log(data)
        cleanedUser(data)

        dispatch(userActions.setUser(data))

        dispatch(wishlistApi.endpoints.getWishlist.initiate())
        // dispatch(basketApi.endpoints.getBasket.initiate())
        // dispatch(configuratorApi.endpoints.getConfigurator.initiate())
      },
    }),

    getMe: build.query<UserDataObject, void>({
      query: () => ({ url: ApiMap.GET_ME }),
      transformResponse: (response: UserDataObject) => response,
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled
          if (data) {
            dispatch(userActions.setUser(data))
          }
        } catch (e) {
          console.log(e)
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
