import {
  wishlistProductsActions,
  wishlistProductsReducer,
} from './slice/wishlistProductsSlice'
import type {
  WishlistProductsSchema,
  IWishlistProduct,
} from './types/wishlistProductsSchema'

export * from './selectors/wishlistProductsSelectors'
export {
  wishlistProductsActions,
  wishlistProductsReducer,
  WishlistProductsSchema,
  IWishlistProduct,
}
