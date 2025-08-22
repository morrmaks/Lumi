import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

const apiKey = process.env.YA_SUGGEST_API_KEY

interface SuggestResponse {
  results: {
    title: { text: string }
  }[]
}

export const yaSuggeestApi = createApi({
  reducerPath: 'yaSuggestApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://suggest-maps.yandex.ru/v1/',
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
