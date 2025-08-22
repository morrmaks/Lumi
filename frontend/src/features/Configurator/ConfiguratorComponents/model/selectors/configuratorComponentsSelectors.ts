import { StateSchema } from '@/app/providers/StoreProvider'

export const getConfiguratorComponentsList = (state: StateSchema) =>
  state?.configuratorComponents.components ?? []

export const getConfiguratorPrice = (state: StateSchema) =>
  state?.configuratorComponents.price ?? []
