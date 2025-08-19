import { StateSchema } from '@/app/providers/StoreProvider'

export const getConfiguratorComponentsList = (state: StateSchema) =>
  state?.configuratorComponents.components ?? []

export const getConfiguratorComponentsIsLoading = (state: StateSchema) =>
  state?.configuratorComponents.isLoading ?? false
