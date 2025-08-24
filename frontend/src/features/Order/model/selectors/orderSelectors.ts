import { StateSchema } from '@/app/providers/StoreProvider'

export const getIsFromOrderLink = (state: StateSchema) =>
  state?.order.isFromOrderLink ?? false

export const getOrderProducts = (state: StateSchema) =>
  state?.order.products ?? []
