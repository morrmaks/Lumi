import cls from './ConfiguratorComponentCard.module.less'
import { Skeleton } from '@/shared/ui/Skeleton'

export const ConfiguratorComponentCardSkeleton = () => {
  return (
    <div className={cls.configuratorComponentCard}>
      <Skeleton className={cls.configuratorComponentCard__image} />
      <div className={cls.configuratorComponentCard__meta}>
        <div>
          <Skeleton width={160} height={20} />
          <Skeleton width={140} height={18} />
        </div>
        <Skeleton width={60} height={20} />
      </div>
      <Skeleton
        width={16}
        height={16}
        border={'6px'}
        className={cls.configuratorComponentCard__changeIcon}
      />
    </div>
  )
}
