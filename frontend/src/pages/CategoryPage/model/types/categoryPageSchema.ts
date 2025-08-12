import { SortFieldOptions, ViewFormat } from '@/pages/CategoryPage'

export interface ICategoryProduct {
  id: string
  image: string
  title: string
  rating: string
  reviews: string
  discountPrice: number
  price: number
}

export interface CategoryPageSchema {
  name: string
  id: string
  isLoading: boolean
  page: number
  limit: number
  hasMore: boolean
  view: ViewFormat
  sort: SortFieldOptions
  products: ICategoryProduct[]
}
