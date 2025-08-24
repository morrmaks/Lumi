import { createApi } from '@reduxjs/toolkit/query/react'
import { baseQueryWithRefresh } from '@/shared/api/query'

export const rtkApi = createApi({
  reducerPath: 'rtkApi',
  baseQuery: baseQueryWithRefresh,
  tagTypes: ['Orders'],
  endpoints: () => ({}),
})
