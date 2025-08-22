import { StateSchema } from '@/app/providers/StoreProvider'

export const getWishlistProducts = (state: StateSchema) =>
  state?.wishlistProducts.products ?? []
