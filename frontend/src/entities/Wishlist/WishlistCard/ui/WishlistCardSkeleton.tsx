import cls from '@/entities/Wishlist/WishlistCard/ui/WishlistCard.module.less'
import { Checkbox } from '@/shared/ui/Checkbox'
import { Skeleton } from '@/shared/ui/Skeleton'
import { useBreakpoint } from '@/shared/lib/hooks'

export const WishlistCardSkeleton = () => {
  const { sm } = useBreakpoint()
  return (
    <div className={cls.wishlistCard}>
      <Checkbox onChange={() => {}} />
      <div className={cls.wishlistCard__content}>
        <div className={cls.wishlistCard__details}>
          <Skeleton className={cls.wishlistCard__image} />
          <div className={cls.wishlistCard__infoSection}>
            <Skeleton width={110} height={25} border={'4px'} />
            <Skeleton width={60} height={16} border={'4px'} />
          </div>
        </div>
        <div className={cls.wishlistCard__actions}>
          <div className={cls.wishlistCard__priceSection}>
            <Skeleton
              width={sm ? 70 : 120}
              height={sm ? 50 : 20}
              border={'4px'}
            />
          </div>
          <div className={cls.wishlistCard__buttons}>
            <Skeleton width={140} height={40} border={'6px'} />
            <Skeleton width={sm ? 140 : 40} height={40} border={'6px'} />
          </div>
        </div>
      </div>
    </div>
  )
}
