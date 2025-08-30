import cls from './CategoryProducts.module.less'
import { CategoryProduct, CategoryProductSkeleton } from '@/entities/Category'
import { classNames } from '@/shared/lib/utils'
import { useAppSelector } from '@/shared/lib/hooks'
import { getCategoryState, ViewFormat } from '@/pages/CategoryPage'
import { useSkeletonProductsCount } from '@/features/Category'

interface CategoryProductsProps {
  isLoading: boolean
  categoryIsLoading: boolean
}

export const CategoryProducts = ({
  isLoading,
  categoryIsLoading,
}: CategoryProductsProps) => {
  const { view, products } = useAppSelector(getCategoryState)

  const skeletonCount = useSkeletonProductsCount()

  if (!products.length && !isLoading && !categoryIsLoading) {
    return (
      <div className={cls.categoryProducts__empty}>
        <h3 className={cls.categoryProducts__empty_title}>
          Список товаров пуст
        </h3>
      </div>
    )
  }

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
      {(isLoading || categoryIsLoading) &&
        [...new Array(skeletonCount)].map((_, i) => (
          <li key={i}>
            <CategoryProductSkeleton view={view} />
          </li>
        ))}
    </ul>
  )
}
