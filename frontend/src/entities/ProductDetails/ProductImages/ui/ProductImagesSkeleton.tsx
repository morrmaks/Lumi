import cls from './ProductImages.module.less'
import { Skeleton } from '@/shared/ui/Skeleton'
import { useBreakpoint } from '@/shared/lib/hooks'
import { useMemo } from 'react'

export const ProductImagesSkeleton = () => {
  const { sm, md, lg } = useBreakpoint()

  const skeletonSizes = useMemo(() => {
    switch (true) {
      case lg:
        return {
          width: '80px',
          height: '100%',
        }
      case md:
        return {
          width: '100%',
          height: '60px',
        }
      case sm:
        return {
          width: '100%',
          height: '80px',
        }
      default:
        return {
          width: '100%',
          height: '60px',
        }
    }
  }, [sm, md, lg])

  return (
    <div className={cls.productImages}>
      <Skeleton
        width={skeletonSizes.width}
        height={skeletonSizes.height}
        className={cls.productImages__selector}
        border={'6px'}
      />
      <Skeleton
        className={cls.productImages__fullImage_container}
        border={'6px'}
      />
    </div>
  )
}
