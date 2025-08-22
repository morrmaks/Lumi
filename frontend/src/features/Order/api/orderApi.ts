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
import { OrderFormValues } from '@/features/Order'

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

export const orderApi = rtkApi.injectEndpoints({
  endpoints: (build) => ({
    getOrderProducts: build.query<
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
    getOrders: build.query<ICategory[], void>({
      query() {
        return {
          url: `${ApiMap.GET_CATEGORIES}`,
          method: 'GET',
        }
      },
      transformResponse: (response: ICategory[]) => response,
    }),
    getOrder: build.query<ICategoryWithBreadcrumb, string>({
      query(id) {
        return {
          url: `${ApiMap.GET_CATEGORIES}/${id}`,
          method: 'GET',
        }
      },
      transformResponse: (response: ICategoryWithBreadcrumb) => response,
    }),
    createOrder: build.mutation<ICategoryWithBreadcrumb, OrderFormValues>({
      query(id) {
        return {
          url: `${ApiMap.GET_CATEGORIES}/${id}`,
          method: 'POST',
        }
      },
      transformResponse: (response: ICategoryWithBreadcrumb) => response,
    }),
  }),
})

export const {
  useGetOrderProductsQuery,
  useGetOrdersQuery,
  useGetOrderQuery,
  useCreateOrderMutation,
} = orderApi
