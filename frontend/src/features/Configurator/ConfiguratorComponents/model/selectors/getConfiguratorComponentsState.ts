import { StateSchema } from '@/app/providers/StoreProvider'

export const getConfiguratorComponentsState = (state: StateSchema) =>
  state?.configuratorComponents ?? {
    componentIds: [],
    components: [],
    isLoading: false,
  }
