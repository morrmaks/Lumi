import cls from './ProductOrderCard.module.less'
import { Skeleton } from '@/shared/ui/Skeleton'

export const ProductOrderCardSkeleton = () => {
  return (
    <div className={cls.productOrderCard}>
      <div className={cls.productOrderCard__meta}>
        <Skeleton className={cls.productOrderCard__image} />
        <div>
          <Skeleton width={200} height={20} />
          <Skeleton width={100} height={16} />
        </div>
      </div>
      <div className={cls.productOrderCard__priceContainer}>
        <Skeleton width={60} height={20} />
        <Skeleton width={100} height={18} />
      </div>
    </div>
  )
}
