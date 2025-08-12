import { StateSchema } from '@/app/providers/StoreProvider'
import { SortFieldOptions, ViewFormat } from '@/pages/CategoryPage'

export const getCategoryIsLoading = (state: StateSchema) =>
  state.categoryPage?.isLoading || false

export const getCategoryName = (state: StateSchema) =>
  state.categoryPage?.name || ''

export const getCategoryId = (state: StateSchema) =>
  state.categoryPage?.id || ''

export const getCategoryPage = (state: StateSchema) =>
  state.categoryPage?.page || 1

export const getCategoryHasMore = (state: StateSchema) =>
  state.categoryPage?.hasMore || true

export const getCategoryView = (state: StateSchema) =>
  state.categoryPage?.view || ViewFormat.GRID

export const getCategorySort = (state: StateSchema) =>
  state.categoryPage?.sort || SortFieldOptions.REVIEWS_ASC

export const getCategoryLimit = (state: StateSchema) =>
  state.categoryPage?.limit || 8

export const getCategoryProducts = (state: StateSchema) =>
  state.categoryPage?.products || []
