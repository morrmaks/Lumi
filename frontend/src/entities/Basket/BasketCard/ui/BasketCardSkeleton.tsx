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
              width={120}
              height={20}
              border={'4px'}
              className={cls.basketCard__title}
            />
            <div className={cls.basketCard__priceSection}>
              <Skeleton width={70} height={25} />
              <Skeleton width={50} height={18} />
            </div>
            <div className={cls.basketCard__ratingContainer}>
              <Skeleton width={16} height={16} />
              <Skeleton width={16} height={16} />
              <Skeleton width={30} height={16} />
            </div>
          </div>
        </div>
        <div className={cls.basketCard__actions}>
          <div className={cls.basketCard__counter}>
            <Skeleton width={36} height={36} border={'6px'} />
            <Skeleton width={16} height={20} />
            <Skeleton width={36} height={36} border={'6px'} />
          </div>
          <Skeleton width={40} height={40} border={'6px'} />
        </div>
      </div>
    </div>
  )
}
