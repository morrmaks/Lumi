import { StateSchema } from '@/app/providers/StoreProvider'

export const getWishlistProductsState = (state: StateSchema) =>
  state?.wishlistProducts ?? { products: [] }
