import cls from './ConfiguratorComponentCard.module.less'
import { Skeleton } from '@/shared/ui/Skeleton'

interface ConfiguratorComponentCardSkeletonProps {
  compact?: boolean
}

export const ConfiguratorComponentCardSkeleton = ({
  compact = false,
}: ConfiguratorComponentCardSkeletonProps) => {
  if (compact) {
    return (
      <div className={cls.configuratorComponentCard__compact}>
        <Skeleton className={cls.configuratorComponentCard__compact_image} />
        <Skeleton width={94} height={20} border={'4px'} />
      </div>
    )
  }

  return (
    <div className={cls.configuratorComponentCard}>
      <Skeleton className={cls.configuratorComponentCard__image} />
      <div className={cls.configuratorComponentCard__meta}>
        <div>
          <Skeleton width={160} height={20} border={'4px'} />
          <Skeleton width={140} height={18} border={'4px'} />
        </div>
        <Skeleton width={60} height={20} border={'4px'} />
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
