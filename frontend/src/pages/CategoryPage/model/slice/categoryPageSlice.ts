import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import {
  CategoryPageSchema,
  ICategoryProduct,
  SortFieldOptions,
  ViewFormat,
} from '@/pages/CategoryPage'

const initialState: CategoryPageSchema = {
  name: '',
  id: '',
  page: 1,
  limit: 8,
  hasMore: true,
  view: ViewFormat.GRID,
  sort: SortFieldOptions.REVIEWS_ASC,
  products: [],
  isLoading: false,
}

export const categoryPageSlice = createSlice({
  name: 'categoryPage',
  initialState,
  reducers: {
    setIsLoading(state, action: PayloadAction<boolean>) {
      state.isLoading = action.payload
    },
    setName(state, action: PayloadAction<string>) {
      state.name = action.payload
    },
    setId(state, action: PayloadAction<string>) {
      state.id = action.payload
    },
    setPage(state, action: PayloadAction<number>) {
      state.page = action.payload
    },
    setHasMore(state, action: PayloadAction<boolean>) {
      state.hasMore = action.payload
    },
    setView(state, action: PayloadAction<ViewFormat>) {
      state.view = action.payload
      localStorage.setItem('Lumi_categoryPage_view', action.payload)
    },
    setSort(state, action: PayloadAction<SortFieldOptions>) {
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
      state.id = ''
      state.name = ''
    },
  },
})

export const { actions: categoryPageActions } = categoryPageSlice
export const { reducer: categoryPageReducer } = categoryPageSlice
