import type {
  ICategoryProduct,
  CategoryPageSchema,
} from './types/categoryPageSchema'
import {
  categoryPageReducer,
  categoryPageSlice,
} from './slice/categoryPageSlice'

export * from './selectors/categoryPageSelectors'
export {
  ICategoryProduct,
  CategoryPageSchema,
  categoryPageReducer,
  categoryPageSlice,
}
