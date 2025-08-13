import { IProduct } from '@/features/Product'

export interface ProductPageSchema {
  product: IProduct
  isLoading: boolean
  error?: string
}
