import { rtkApi } from '@/shared/api'
import { ApiMap } from '@/shared/consts'
import { IBannerCarousel } from '@/features/Banners'

export const productApi = rtkApi.injectEndpoints({
  endpoints: (build) => ({
    getBanners: build.query<IBannerCarousel[], void>({
      query() {
        return {
          url: `${ApiMap.GET_BANNERS}`,
          method: 'GET',
        }
      },
      transformResponse: (response: IBannerCarousel[]) => response,
      async onQueryStarted(_, { queryFulfilled }) {
        try {
          const { data } = await queryFulfilled
        } catch (e) {
          console.log(e)
        }
      },
    }),
  }),
})

export const { useGetBannersQuery } = productApi
