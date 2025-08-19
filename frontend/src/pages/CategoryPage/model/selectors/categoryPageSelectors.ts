import { StateSchema } from '@/app/providers/StoreProvider'
import { ViewFormat } from '@/pages/CategoryPage'

export const getCategoryState = (state: StateSchema) =>
  state.categoryPage ?? {
    category: {
      id: '',
      name: '',
      description: '',
      slug: '',
      productCount: 0,
    },
    page: 1,
    limit: 8,
    hasMore: true,
    search: '',
    view: ViewFormat.GRID,
    sort: 'CREATED_DESC',
    products: [],
  }

export const getCategory = (state: StateSchema) =>
  state.categoryPage?.category ?? {
    id: '',
    name: '',
    description: '',
    slug: '',
  }

export const getCategoryPage = (state: StateSchema) =>
  state.categoryPage?.page ?? 1

export const getCategorySearch = (state: StateSchema) =>
  state.categoryPage?.search ?? ''

export const getCategoryHasMore = (state: StateSchema) =>
  state.categoryPage?.hasMore ?? true

export const getCategoryView = (state: StateSchema) =>
  state.categoryPage?.view ?? ViewFormat.GRID

export const getCategorySort = (state: StateSchema) =>
  state.categoryPage?.sort ?? 'CREATED_DESC'

export const getCategoryLimit = (state: StateSchema) =>
  state.categoryPage?.limit ?? 8

export const getCategoryProducts = (state: StateSchema) =>
  state.categoryPage?.products ?? []
