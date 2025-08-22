import { rtkApi } from '@/shared/api'
import { ApiMap } from '@/shared/consts'
import {
  IBasketProduct,
  basketProductsActions,
  IBasketItem,
} from '@/features/Basket'

export const basketApi = rtkApi.injectEndpoints({
  endpoints: (build) => ({
    getBasket: build.query<IBasketItem[], void>({
      query: () => ({
        url: ApiMap.GET_BASKET,
        method: 'GET',
      }),
      keepUnusedDataFor: 0,
      transformResponse: (response: IBasketItem[]) => response,
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled
        } catch (e) {
          console.log(e)
        }
      },
    }),
    getBasketProducts: build.query<IBasketProduct[], string[]>({
      query: (productIds: string[]) => ({
        url: `${ApiMap.GET_BASKET_PRODUCTS}?ids=${productIds.join(',')}`,
        method: 'GET',
      }),
      transformResponse: (response: IBasketProduct[]) => response,
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled
        } catch (e) {
          console.log(e)
        }
      },
    }),
    addBasketProduct: build.mutation<string, string>({
      query: (productId) => ({
        url: ApiMap.ADD_PRODUCT_TO_BASKET,
        method: 'POST',
        body: { productId },
      }),
      transformResponse: (response: string) => response,
    }),
    addBasketProducts: build.mutation<IBasketItem[], IBasketItem[]>({
      query: (productItems) => ({
        url: ApiMap.ADD_PRODUCTS_TO_BASKET,
        method: 'POST',
        body: { productItems },
      }),
      transformResponse: (response: IBasketItem[]) => response,
    }),
    deleteBasketProduct: build.mutation<string, string>({
      query: (productId) => ({
        url: `${ApiMap.DELETE_PRODUCT_FROM_BASKET}/${productId}`,
        method: 'DELETE',
      }),
      transformResponse: (response: string) => response,
    }),
    increaseBasketProductQuantity: build.mutation<string, string>({
      query: (productId) => ({
        url: `${ApiMap.INCREASE_PRODUCT_QUANTITY}/${productId}/increase`,
        method: 'PATCH',
      }),
      transformResponse: (response: string) => response,
    }),
    decreaseBasketProductQuantity: build.mutation<string, string>({
      query: (productId) => ({
        url: `${ApiMap.DECREASE_PRODUCT_QUANTITY}/${productId}/decrease`,
        method: 'PATCH',
      }),
      transformResponse: (response: string) => response,
    }),
    clearBasket: build.mutation<void, void>({
      query: () => ({
        url: ApiMap.CLEAR_BASKET,
        method: 'DELETE',
      }),
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        await queryFulfilled
        dispatch(basketProductsActions.resetProducts())
      },
    }),
  }),
})

export const {
  useGetBasketQuery,
  useGetBasketProductsQuery,
  useAddBasketProductMutation,
  useAddBasketProductsMutation,
  useDeleteBasketProductMutation,
  useDecreaseBasketProductQuantityMutation,
  useIncreaseBasketProductQuantityMutation,
  useClearBasketMutation,
} = basketApi
