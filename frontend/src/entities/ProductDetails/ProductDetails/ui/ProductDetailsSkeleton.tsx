import cls from '@/entities/ProductDetails/ProductDetails/ui/ProductDetails.module.less'
import { Skeleton } from '@/shared/ui/Skeleton'

export const ProductDetailsSkeleton = () => {
  return (
    <div className={cls.productDetails}>
      <div className={cls.productDetails__header}>
        <Skeleton width={200} height={30} border={'4px'} />
        <div className={cls.productDetails__ratingContainer}>
          <Skeleton width={120} height={20} border={'4px'} />
        </div>
        <div className={cls.productDetails__priceSection}>
          <Skeleton width={120} height={90} border={'6px'} />
        </div>
        <Skeleton height={50} className={cls.productDetails__stockSection} />
        <Skeleton
          height={90}
          border={'6px'}
          className={cls.productDetails__buttons}
        />
        <Skeleton
          height={140}
          border={'6px'}
          className={cls.productDetails__specs}
        />
        <Skeleton
          height={140}
          border={'6px'}
          className={cls.productDetails__description}
        />
      </div>
    </div>
  )
}
