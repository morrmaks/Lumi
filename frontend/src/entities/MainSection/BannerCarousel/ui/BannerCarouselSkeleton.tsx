import cls from './BannerCarousel.module.less'
import { Skeleton } from '@/shared/ui/Skeleton'

export const BannerCarouselSkeleton = () => {
  return <Skeleton className={cls.bannerCarousel} />
}
