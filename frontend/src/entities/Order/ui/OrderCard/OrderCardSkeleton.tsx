import cls from '@/entities/Order/ui/OrderCard/OrderCard.module.less'
import { Skeleton } from '@/shared/ui/Skeleton'

export const OrderCardSkeleton = () => {
  return (
    <div className={cls.orderCard}>
      <Skeleton width={110} height={22} border={'12px'} />
      <div className={cls.orderCard__info}>
        <div className={cls.orderCard__meta}>
          <Skeleton width={270} height={20} border={'6px'} />
          <Skeleton width={210} height={20} border={'6px'} />
        </div>
        <Skeleton width={60} height={20} border={'6px'} />
      </div>
    </div>
  )
}
