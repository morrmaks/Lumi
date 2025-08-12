import cls from './CategoryProducts.module.less'
import { CategoryProduct, CategoryProductSkeleton } from '@/entities/Category'
import { classNames } from '@/shared/lib/utils'
import { useAppSelector, useBreakpoint } from '@/shared/lib/hooks'
import {
  getCategoryIsLoading,
  getCategoryView,
  ICategoryProduct,
  ViewFormat,
} from '@/pages/CategoryPage'
import { useMemo } from 'react'

interface CategoryProductsProps {
  products: ICategoryProduct[]
}

export const CategoryProducts = ({ products }: CategoryProductsProps) => {
  const { sm, md } = useBreakpoint()
  const isLoading = useAppSelector(getCategoryIsLoading)
  const view = useAppSelector(getCategoryView)

  const skeletonCount = useMemo(() => {
    switch (true) {
      case md:
        return 4
      case sm:
        return 3
      default:
        return 2
    }
  }, [sm, md])

  return (
    <ul
      className={classNames(cls.categoryProducts, {
        [cls.categoryProducts__list]: view === ViewFormat.LIST,
      })}
    >
      {products.map((product) => (
        <li key={product.id}>
          <CategoryProduct product={product} view={view} />
        </li>
      ))}
      {isLoading &&
        [...new Array(skeletonCount)].map((_, i) => (
          <li key={i}>
            <CategoryProductSkeleton view={view} />
          </li>
        ))}
    </ul>
  )
}
