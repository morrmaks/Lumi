import { StateSchema } from '@/app/providers/StoreProvider'

export const getProfileCardState = (state: StateSchema) =>
  state?.profileCardForm ?? {
    username: '',
    email: '',
    phone: '',
    isLoading: false,
  }
