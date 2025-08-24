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
import { IOrder, IOrderProductFull, OrderFormValues } from '@/features/Order'
import { IOrderProduct } from '@/features/Order/model/types/OrderSchema'
import { userActions } from '@/entities/User'

export const orderApi = rtkApi.injectEndpoints({
  endpoints: (build) => ({
    getOrders: build.query<IOrder[], void>({
      query() {
        return {
          url: `${ApiMap.GET_ORDERS}`,
          method: 'GET',
        }
      },
      providesTags: ['Orders'],
      transformResponse: (response: IOrder[]) => response,
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled
        } catch (e) {
          console.log(e)
        }
      },
    }),
    getOrder: build.query<IOrder, string>({
      query(orderId) {
        return {
          url: `${ApiMap.GET_ORDER}/${orderId}`,
          method: 'GET',
        }
      },
      transformResponse: (response: IOrder) => response,
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled
        } catch (e) {
          console.log(e)
        }
      },
    }),
    getOrderValidate: build.query<
      { success: boolean }, string>({
      query(orderId) {
        return {
          url: `${ApiMap.GET_ORDER}/${orderId}/payment/validate`,
          method: 'GET',
        }
      },
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled
        } catch (e) {
          console.log(e)
        }
      },
    }),
    createOrder: build.mutation<
      { orderId: string; paymentUrl: string },
      OrderFormValues & { products: IOrderProduct[] }
    >({
      query(data) {
        return {
          url: `${ApiMap.CREATE_ORDER}`,
          method: 'POST',
          body: data,
        }
      },
      invalidatesTags: ['Orders'],
      transformResponse: (response: { orderId: string; paymentUrl: string }) => response,
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled
        } catch (e) {
          console.log(e)
        }
      },
    }),
    getOrderProducts: build.query<IOrderProductFull[], string>({
      query(orderId) {
        return {
          url: `${ApiMap.GET_ORDER_PRODUCTS}/${orderId}/products`,
          method: 'GET',
        }
      },
      transformResponse: (response: IOrderProductFull[]) => response,
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled
        } catch (e) {
          console.log(e)
        }
      },
    }),
    payOrder: build.mutation<string, string>({
      query(orderId) {
        return {
          url: `${ApiMap.PAY_ORDER}/${orderId}/pay`,
          method: 'POST',
        }
      },
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled
        } catch (e) {
          console.log(e)
        }
      },
    }),
  }),
})

export const {
  useGetOrderProductsQuery,
  useGetOrdersQuery,
  useGetOrderQuery,
  useGetOrderValidateQuery,
  useCreateOrderMutation,
  usePayOrderMutation
} = orderApi
