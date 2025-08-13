import {
  wishlistProductsActions,
  wishlistProductsReducer,
} from './slice/wishlistProductsSlice'
import { type WishlistProductsSchema } from './types/wishlistProductsSchema'

export * from './selectors/wishlistProductsSelectors'
export {
  wishlistProductsActions,
  wishlistProductsReducer,
  WishlistProductsSchema,
}
