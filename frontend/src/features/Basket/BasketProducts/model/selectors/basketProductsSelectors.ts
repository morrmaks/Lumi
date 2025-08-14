import { StateSchema } from '@/app/providers/StoreProvider'

export const getBasketProducts = (state: StateSchema) =>
  state?.basketProducts?.products ?? []

export const getBasketIsLoading = (state: StateSchema) =>
  state?.basketProducts?.isLoading ?? false
