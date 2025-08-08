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
            <Skeleton width={140} height={25} />
            <div className={cls.wishlistCard__ratingContainer}>
              <Skeleton width={16} height={16} />
              <Skeleton width={16} height={16} />
              <Skeleton width={30} height={16} />
            </div>
          </div>
        </div>
        <div className={cls.wishlistCard__actions}>
          <div className={cls.wishlistCard__priceSection}>
            <Skeleton width={70} height={25} />
            <Skeleton width={50} height={18} />
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
