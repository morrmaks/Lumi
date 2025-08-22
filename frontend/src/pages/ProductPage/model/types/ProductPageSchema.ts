import { IProduct } from '@/features/Product'
import { IBreadcrumb } from '@/features/BreadcrumbNav'

export interface ProductPageSchema {
  product: IProduct
}

export interface IProductWithBreadcrumb {
  product: IProduct
  breadcrumb: IBreadcrumb[]
}
