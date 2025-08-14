import { StateSchema } from '@/app/providers/StoreProvider'

export const getMainBannersCarousel = (state: StateSchema) =>
  state.banners?.mainBannersCarousel ?? []

export const getBannersIsLoading = (state: StateSchema) =>
  state.banners?.isLoading ?? false
