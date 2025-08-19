import cls from './CategoryProducts.module.less'
import { CategoryProductSkeleton } from '@/entities/Category'
import { classNames } from '@/shared/lib/utils'
import { useAppSelector } from '@/shared/lib/hooks'
import { getCategoryState, ViewFormat } from '@/pages/CategoryPage'
import { useSkeletonProductsCount } from '../../lib'

export const CategoryProductsSkeleton = () => {
  const { view } = useAppSelector(getCategoryState)

  const skeletonCount = useSkeletonProductsCount()

  return (
    <ul
      className={classNames(cls.categoryProducts, {
        [cls.categoryProducts__list]: view === ViewFormat.LIST,
      })}
    >
      {[...new Array(skeletonCount)].map((_, i) => (
        <li key={i}>
          <CategoryProductSkeleton view={view} />
        </li>
      ))}
    </ul>
  )
}
