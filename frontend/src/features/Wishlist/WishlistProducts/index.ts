import { fullSelectDiscountPrice } from './lib/fullSelectDiscountPrice'
import { getWishlistProductsState } from './model/selectors/getWishlistProductsState'
import {
  wishlistProductsActions,
  wishlistProductsReducer,
} from './model/slice/wishlistProductsSlice'
import { type WishlistProductsSchema } from './model/types/wishlistProductsSchema'
import { WishlistProducts } from './ui/WishlistProducts'
export {
  fullSelectDiscountPrice,
  getWishlistProductsState,
  wishlistProductsActions,
  wishlistProductsReducer,
  WishlistProductsSchema,
  WishlistProducts,
}
