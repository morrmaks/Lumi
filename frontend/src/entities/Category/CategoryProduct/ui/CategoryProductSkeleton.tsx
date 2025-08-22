import clsGrid from './CategoryProductGrid/CategoryProductGrid.module.less'
import clsList from './CategoryProductList/CategoryProductList.module.less'
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
      <div className={clsGrid.categoryProductGrid}>
        <Skeleton className={clsGrid.categoryProductGrid__image} />
        <div className={clsGrid.categoryProductGrid__details}>
          <div className={clsGrid.categoryProductGrid__infoSection}>
            <Skeleton width={150} height={20} border={'4px'} />
            <Skeleton width={70} height={20} border={'4px'} />
          </div>
          <div className={clsGrid.categoryProductGrid__actions}>
            <Skeleton width={120} height={20} border={'4px'} />
            <Skeleton
              height={40}
              border={'6px'}
              className={clsGrid.categoryProductGrid__button}
            />
            <Skeleton
              height={40}
              border={'6px'}
              className={clsGrid.categoryProductGrid__button}
            />
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className={clsList.categoryProductList}>
      <Skeleton className={clsList.categoryProductList__image} />
      <div className={clsList.categoryProductList__details}>
        <div className={clsList.categoryProductList__infoSection}>
          <Skeleton width={140} height={25} border={'4px'} />
          <Skeleton width={70} height={20} border={'4px'} />
        </div>
        <div className={clsList.categoryProductList__actions}>
          <Skeleton width={120} height={20} border={'4px'} />
          <Skeleton width={70} height={20} border={'4px'} />
          <div className={clsList.categoryProductList__buttons}>
            <Skeleton width={40} height={40} border={'6px'} />
            <div className={clsList.categoryProductList__buttonContainer}>
              <Skeleton
                width={130}
                height={40}
                border={'6px'}
                className={clsList.categoryProductList__button}
              />
              <Skeleton
                width={130}
                height={40}
                border={'6px'}
                className={clsList.categoryProductList__button}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
