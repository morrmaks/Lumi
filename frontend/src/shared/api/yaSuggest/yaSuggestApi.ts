import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { ApiMap } from '@/shared/consts'

interface SuggestResponse {
  results: {
    title: { text: string }
  }[]
}

export const yaSuggestApi = createApi({
  reducerPath: 'yaSuggestApi',
  baseQuery: fetchBaseQuery({
    baseUrl: ApiMap.YA_SUGGEST,
  }),
  endpoints: (builder) => ({
    getSuggestions: builder.query<string[], string>({
      query: (search: string) =>
        `suggest?apikey=${process.env.YA_SUGGEST_API_KEY}&text=${search}&lang=ru_RU`,
      transformResponse: (response: SuggestResponse) =>
        response.results.map((item) => item.title.text),
    }),
  }),
})

export const { useGetSuggestionsQuery } = yaSuggestApi
