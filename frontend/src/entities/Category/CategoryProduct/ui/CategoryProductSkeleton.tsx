import cls from '@/entities/Category/CategoryProduct/ui/CategoryProduct.module.less'
import { ViewFormat } from '@/pages/CategoryPage'
import { Skeleton } from '@/shared/ui/Skeleton'

export interface CategoryProductSkeletonProps {
  view: ViewFormat
}

export const CategoryProductSkeleton = ({
  view,
}: CategoryProductSkeletonProps) => {
  if (view === ViewFormat.GRID) {
    return (
      <div className={cls.categoryProduct}>
        <Skeleton className={cls.categoryProduct__image} />
        <div className={cls.categoryProduct__details}>
          <div className={cls.categoryProduct__infoSection}>
            <Skeleton width={150} height={20} border={'4px'} />
            <Skeleton width={70} height={20} border={'4px'} />
          </div>
          <div className={cls.categoryProduct__actions}>
            <Skeleton width={120} height={20} border={'4px'} />
            <div className={cls.categoryProduct__buttons}>
              <Skeleton
                height={40}
                border={'6px'}
                className={cls.categoryProduct__button}
              />
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className={cls.categoryProduct__viewList}>
      <Skeleton className={cls.categoryProduct__viewList_image} />
      <div className={cls.categoryProduct__viewList_details}>
        <div className={cls.categoryProduct__viewList_infoSection}>
          <Skeleton width={140} height={25} border={'4px'} />
          <Skeleton width={70} height={20} border={'4px'} />
        </div>
        <div className={cls.categoryProduct__viewList_actions}>
          <Skeleton width={120} height={20} border={'4px'} />
          <div className={cls.categoryProduct__viewList_buttons}>
            <Skeleton width={40} height={40} border={'6px'} />
            <Skeleton
              width={130}
              height={40}
              border={'6px'}
              className={cls.categoryProduct__viewList_button}
            />
          </div>
        </div>
      </div>
    </div>
  )
}
