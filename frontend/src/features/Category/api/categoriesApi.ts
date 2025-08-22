import { rtkApi } from '@/shared/api'
import {
  ICategory,
  ICategoryProduct,
  ICategoryWithBreadcrumb,
  SortFieldOptionKey,
  SortFieldOptions,
  ViewFormat,
} from '@/pages/CategoryPage'
import { getQueryParams } from '@/shared/lib/url'
import { ApiMap } from '@/shared/consts'

interface CategoryProductsPayload {
  id: string
  search: string
  sort: SortFieldOptionKey
  page: number
  limit: number
  view: ViewFormat
}

export interface CategoryProductsWithHasMore {
  products: ICategoryProduct[]
  hasMore: boolean
}

export const categoriesApi = rtkApi.injectEndpoints({
  endpoints: (build) => ({
    getCategoryProducts: build.query<
      CategoryProductsWithHasMore,
      CategoryProductsPayload
    >({
      query({ id, search, sort, page, limit, view }) {
        const { field, order } = SortFieldOptions[sort] || {}
        const params = {
          search,
          field,
          order,
          view,
          page: page.toString(),
          limit: limit.toString(),
        }

        return {
          url: `${ApiMap.GET_CATEGORIES}/${id}/products?${getQueryParams(params)}`,
          method: 'GET',
        }
      },
      transformResponse: (response: CategoryProductsWithHasMore) => response,
    }),
    getCategories: build.query<ICategory[], void>({
      query() {
        return {
          url: `${ApiMap.GET_CATEGORIES}`,
          method: 'GET',
        }
      },
      transformResponse: (response: ICategory[]) => response,
      async onQueryStarted(_, { queryFulfilled }) {
        try {
          const { data } = await queryFulfilled
        } catch (e) {
          console.log(e)
        }
      },
    }),
    getCategory: build.query<ICategoryWithBreadcrumb, string>({
      query(id) {
        return {
          url: `${ApiMap.GET_CATEGORIES}/${id}`,
          method: 'GET',
        }
      },
      transformResponse: (response: ICategoryWithBreadcrumb) => response,
    }),
  }),
})

export const {
  useGetCategoryProductsQuery,
  useGetCategoriesQuery,
  useGetCategoryQuery,
} = categoriesApi
