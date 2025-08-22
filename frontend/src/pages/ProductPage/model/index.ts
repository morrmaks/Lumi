import {
  productPageActions,
  productPageReducer,
} from './slice/productPageSlice'
import type {
  ProductPageSchema,
  IProductWithBreadcrumb,
} from './types/ProductPageSchema'

export * from './selectors/productPageSelectors'
export {
  productPageActions,
  productPageReducer,
  ProductPageSchema,
  IProductWithBreadcrumb,
}
