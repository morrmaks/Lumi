import { StateSchema } from '@/app/providers/StoreProvider'

export const getBreadcrumbNavState = (state: StateSchema) =>
  state?.breadcrumbNav ?? {}
