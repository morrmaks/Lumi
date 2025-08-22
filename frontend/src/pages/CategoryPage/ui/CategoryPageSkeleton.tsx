import cls from './CategoryPage.module.less'
import { Skeleton } from '@/shared/ui/Skeleton'
import { CategoryFiltersSkeleton } from '@/features/Category'
import { CategoryProductsSkeleton } from '@/features/Category/ui/CategoryProducts/CategoryProductsSkeleton'

export const CategoryPageSkeleton = () => {
  return (
    <div className={cls.categoryPage}>
      {/* Header */}
      <div className={cls.categoryPage__header_skeleton}>
        <div>
          <Skeleton
            className={cls.categoryPage__title}
            width={250}
            height={38}
            border="4px"
          />
          <Skeleton
            className={cls.categoryPage__description}
            width={300}
            height={20}
            border="4px"
          />
          <Skeleton
            className={cls.categoryPage__productQuantity}
            width={170}
            height={18}
            border="4px"
          />
        </div>
      </div>

      <div className={cls.categoryPage__productsSecton}>
        <div className={cls.categoryPage__configuratorCarousel}>
          <Skeleton width="100%" height="110px" border="8px" />
        </div>
        <CategoryFiltersSkeleton />
        <CategoryProductsSkeleton />
      </div>
    </div>
  )
}
