import { rtkApi } from '@/shared/api'

import { ApiMap } from '@/shared/consts'
import { IOrder, IOrderProductFull, OrderFormValues, PaymentMethods } from '@/features/Order'
import { IOrderProduct } from '@/features/Order/model/types/OrderSchema'
import { OrderStatus, PaymentStatus } from '@/entities/Order'

interface CreateOrderResponse {
  orderId: string
  orderNumber: string
  paymentUrl: string
}

interface OrderValidateResponse {
  orderNumber: string
  status: OrderStatus
  paymentStatus?: PaymentStatus
  paymentUrl?: string
  paymentMethod?: PaymentMethods
}

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
    getOrderValidate: build.query<OrderValidateResponse, string>({
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
      CreateOrderResponse,
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
      transformResponse: (response: CreateOrderResponse) =>
        response,
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
  usePayOrderMutation,
} = orderApi
