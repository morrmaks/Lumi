import { memo } from 'react'
import { ICategoryProduct, ViewFormat } from '@/pages/CategoryPage'
import { CategoryProductGrid, CategoryProductList } from '@/entities/Category'

export interface CategoryProductProps {
  product: ICategoryProduct
  view: ViewFormat
}

export const CategoryProduct = memo(
  ({ product, view }: CategoryProductProps) => {
    if (view === ViewFormat.GRID) {
      return <CategoryProductGrid product={product} />
    }

    return <CategoryProductList product={product} />
  }
)

CategoryProduct.displayName = 'CategoryProduct'
