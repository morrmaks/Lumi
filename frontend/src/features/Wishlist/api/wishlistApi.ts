import { rtkApi } from '@/shared/api'
import { ApiMap } from '@/shared/consts'
import { IWishlistProduct, wishlistProductsActions } from '@/features/Wishlist'

export const wishlistApi = rtkApi.injectEndpoints({
  endpoints: (build) => ({
    getWishlist: build.query<string[], void>({
      query() {
        return {
          url: `${ApiMap.GET_WISHLIST}`,
          method: 'GET',
        }
      },
      keepUnusedDataFor: 0,
      transformResponse: (response: string[]) => response,
    }),
    getWishlistProducts: build.query<IWishlistProduct[], string[]>({
      query(productIds: string[]) {
        return {
          url: `${ApiMap.GET_WISHLIST_PRODUCTS}?ids=${productIds.join(',')}`,
          method: 'GET',
        }
      },
      transformResponse: (response: IWishlistProduct[]) => response,
    }),
    addWishlistProduct: build.mutation<string, string>({
      query: (productId) => ({
        url: ApiMap.ADD_PRODUCT_TO_WISHLIST,
        method: 'POST',
        body: { productId },
      }),
      transformResponse: (response: string) => response,
    }),
    addWishlistProducts: build.mutation<string[], string[]>({
      query: (productIds) => ({
        url: ApiMap.ADD_PRODUCTS_TO_WISHLIST,
        method: 'POST',
        body: { productIds },
      }),
      transformResponse: (response: string[]) => response,
    }),
    deleteWishlistProduct: build.mutation<string, string>({
      query: (productId) => ({
        url: `${ApiMap.DELETE_PRODUCT_FROM_WISHLIST}/${productId}`,
        method: 'DELETE',
      }),
      transformResponse: (response: string) => response,
    }),
    deleteWishlistProducts: build.mutation<string[], string[]>({
      query: (productIds) => ({
        url: ApiMap.DELETE_PRODUCTS_FROM_WISHLIST,
        method: 'DELETE',
        body: { productIds },
      }),
      transformResponse: (response: string[]) => response,
    }),
    clearWishlist: build.mutation<void, void>({
      query: () => ({
        url: ApiMap.CLEAR_WISHLIST,
        method: 'DELETE',
      }),
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        await queryFulfilled
        dispatch(wishlistProductsActions.resetProducts())
      },
    }),
  }),
})

export const {
  useGetWishlistQuery,
  useGetWishlistProductsQuery,
  useAddWishlistProductMutation,
  useAddWishlistProductsMutation,
  useDeleteWishlistProductMutation,
  useDeleteWishlistProductsMutation,
  useClearWishlistMutation,
} = wishlistApi
