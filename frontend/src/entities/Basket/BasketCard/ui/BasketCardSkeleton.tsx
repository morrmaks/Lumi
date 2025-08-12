import { Skeleton } from '@/shared/ui/Skeleton'
import cls from './BasketCard.module.less'

export const BasketCardSkeleton = () => {
  return (
    <div className={cls.basketCard}>
      <div className={cls.basketCard__content}>
        <div className={cls.basketCard__details}>
          <Skeleton className={cls.basketCard__image} />

          <div className={cls.basketCard__infoSection}>
            <Skeleton
              width={160}
              height={20}
              border={'4px'}
              className={cls.basketCard__title}
            />
            <Skeleton width={120} height={20} border={'4px'} />
            <Skeleton width={60} height={16} border={'4px'} />
          </div>
        </div>
        <div className={cls.basketCard__actions}>
          <Skeleton width={130} height={36} border={'6px'} />
          <Skeleton width={40} height={40} border={'6px'} />
        </div>
      </div>
    </div>
  )
}
