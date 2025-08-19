import { SortFieldOptionKey, ViewFormat } from '@/pages/CategoryPage'
import { IBreadcrumb } from '@/features/BreadcrumbNav'

export interface ICategory {
  id: string
  name: string
  description: string
  slug: string
  productCount: number
}

export interface ICategoryWithBreadcrumb {
  category: ICategory
  breadcrumb: IBreadcrumb[]
}

export interface ICategoryProduct {
  id: string
  image: string
  name: string
  rating: number
  reviews: number
  price: number
  discountPrice: number
}

export interface CategoryPageSchema {
  category: ICategory
  search: string
  page: number
  limit: number
  hasMore: boolean
  view: ViewFormat
  sort: SortFieldOptionKey
  products: ICategoryProduct[]
  inited: boolean
}
