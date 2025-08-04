import { StateSchema } from '@/app/providers/StoreProvider'

export const getBasketProductsState = (state: StateSchema) =>
  state?.basketProducts ?? { products: [], isLoading: false }
