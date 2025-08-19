import {
  BaseQueryFn,
  FetchArgs,
  QueryReturnValue,
} from '@reduxjs/toolkit/query'
import { fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { ApiError } from '@/shared/types'
import { ApiMap, LocalStorage } from '@/shared/consts'
import { Mutex } from 'async-mutex'

export interface RefreshResponse {
  accessToken: string
}

const mutex = new Mutex()
const baseQuery = fetchBaseQuery({
  baseUrl: ApiMap.BASE_API,
  credentials: 'include',
  prepareHeaders: (headers) => {
    const accessToken = localStorage.getItem(LocalStorage.ACCESS_TOKEN)
    if (accessToken) {
      headers.set('Authorization', `Bearer ${accessToken}`)
    }
  },
}) as BaseQueryFn<string | FetchArgs, unknown, ApiError, object>

export const baseQueryWithRefresh: BaseQueryFn<
  string | FetchArgs,
  unknown,
  ApiError,
  object
> = async (args, api, extraOptions) => {
  let result = await baseQuery(args, api, extraOptions)

  if (result.error && result.error.status === 401) {
    if (!mutex.isLocked()) {
      const release = await mutex.acquire()
      try {
        const res = (await baseQuery(
          {
            url: ApiMap.REFRESH,
            method: 'POST',
          },
          api,
          extraOptions
        )) as QueryReturnValue<RefreshResponse, ApiError, unknown>

        if (res.data) {
          const { accessToken } = res.data
          localStorage.setItem(LocalStorage.ACCESS_TOKEN, accessToken)
          result = await baseQuery(args, api, extraOptions)
        } else {
          localStorage.removeItem(LocalStorage.ACCESS_TOKEN)
        }
      } finally {
        release()
      }
    } else {
      await mutex.waitForUnlock()
      result = await baseQuery(args, api, extraOptions)
    }
  }

  return result
}
