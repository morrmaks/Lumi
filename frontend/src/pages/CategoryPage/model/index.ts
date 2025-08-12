import {
  getCategoryIsLoading,
  getCategoryHasMore,
  getCategoryLimit,
  getCategoryPage,
  getCategoryName,
  getCategoryId,
  getCategorySort,
  getCategoryView,
  getCategoryProducts,
} from './selectors/categoryPageSelectors'
import type {
  ICategoryProduct,
  CategoryPageSchema,
} from './types/categoryPageSchema'
import {
  categoryPageReducer,
  categoryPageSlice,
} from './slice/categoryPageSlice'

export {
  getCategoryIsLoading,
  getCategoryHasMore,
  getCategoryLimit,
  getCategoryPage,
  getCategoryName,
  getCategoryId,
  getCategorySort,
  getCategoryView,
  getCategoryProducts,
  ICategoryProduct,
  CategoryPageSchema,
  categoryPageReducer,
  categoryPageSlice,
}
