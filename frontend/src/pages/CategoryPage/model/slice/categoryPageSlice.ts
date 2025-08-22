import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import {
  CategoryPageSchema,
  ICategory,
  ICategoryProduct,
  SortFieldOptionKey,
  ViewFormat,
} from '@/pages/CategoryPage'
import { LocalStorage } from '@/shared/consts'

const initialState: CategoryPageSchema = {
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
  inited: false,
}

export const categoryPageSlice = createSlice({
  name: 'categoryPage',
  initialState,
  reducers: {
    setCategory(state, action: PayloadAction<ICategory>) {
      state.category = action.payload
    },
    setPage(state, action: PayloadAction<number>) {
      state.page = action.payload
    },
    setSearch(state, action: PayloadAction<string>) {
      state.search = action.payload
    },
    setHasMore(state, action: PayloadAction<boolean>) {
      state.hasMore = action.payload
    },
    setView(state, action: PayloadAction<ViewFormat>) {
      state.view = action.payload
      localStorage.setItem(LocalStorage.PRODUCTS_VIEW, action.payload)
    },
    setLimit(state, action: PayloadAction<number>) {
      state.limit = action.payload
    },
    setSort(state, action: PayloadAction<SortFieldOptionKey>) {
      state.sort = action.payload
    },
    setProducts(state, action: PayloadAction<ICategoryProduct[]>) {
      state.products = action.payload
    },
    addProducts(state, action: PayloadAction<ICategoryProduct[]>) {
      state.products.push(...action.payload)
    },
    resetCategoryPage(state) {
      state.page = 1
      state.products = []
      state.hasMore = true
      state.search = ''
      state.category = initialState.category
    },
    initFilters(
      state,
      action: PayloadAction<
        Pick<CategoryPageSchema, 'search' | 'sort' | 'view'>
      >
    ) {
      if (!state.inited) {
        state.search = action.payload.search
        state.view = action.payload.view
        state.sort = action.payload.sort
        state.view = action.payload.view
        state.limit = action.payload.view === ViewFormat.GRID ? 8 : 4

        localStorage.setItem(LocalStorage.PRODUCTS_VIEW, action.payload.view)
      }
      state.inited = true
    },
  },
})

export const { actions: categoryPageActions } = categoryPageSlice
export const { reducer: categoryPageReducer } = categoryPageSlice
