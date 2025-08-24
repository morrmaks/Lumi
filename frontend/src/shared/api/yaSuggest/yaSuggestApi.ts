import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { ApiMap } from '@/shared/consts'
import { getEnv } from '@/shared/lib/utils'

const apiKey = getEnv('YA_SUGGEST_API_KEY')
interface SuggestResponse {
  results: {
    title: { text: string }
  }[]
}

export const yaSuggeestApi = createApi({
  reducerPath: 'yaSuggestApi',
  baseQuery: fetchBaseQuery({
    baseUrl: ApiMap.YA_SUGGEST,
  }),
  endpoints: (builder) => ({
    getSuggestions: builder.query<string[], string>({
      query: (search: string) =>
        `suggest?apikey=${apiKey}&text=${search}&lang=ru_RU`,
      transformResponse: (response: SuggestResponse) =>
        response.results.map((item) => item.title.text),
    }),
  }),
})

export const { useGetSuggestionsQuery } = yaSuggeestApi
