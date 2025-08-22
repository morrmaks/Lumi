import clsCompact from './ConfiguratorComponentCardCompact/ConfiguratorComponentCardCompact.module.less'
import clsFull from './ConfiguratorComponentCardFull/ConfiguratorComponentCardFull.module.less'
import { Skeleton } from '@/shared/ui/Skeleton'
import cls from '@/entities/Configurator/ConfiguratorComponentCard/ui/ConfiguratorComponentCardFull/ConfiguratorComponentCardFull.module.less'
import { useBreakpoint } from '@/shared/lib/hooks'

interface ConfiguratorComponentCardSkeletonProps {
  compact?: boolean
}

export const ConfiguratorComponentCardSkeleton = ({
  compact = false,
}: ConfiguratorComponentCardSkeletonProps) => {
  const { sm } = useBreakpoint()

  if (compact) {
    return (
      <div className={clsCompact.configuratorComponentCardCompact}>
        <Skeleton
          className={clsCompact.configuratorComponentCardCompact__image}
        />
        <Skeleton width={94} height={20} border={'4px'} />
      </div>
    )
  }

  return (
    <div className={clsFull.configuratorComponentCardFull}>
      <div className={cls.configuratorComponentCardFull__itemLink}>
        <Skeleton className={clsFull.configuratorComponentCardFull__image} />
        <div className={clsFull.configuratorComponentCardFull__meta}>
          <div>
            <Skeleton width={160} height={20} border={'4px'} />
            <Skeleton width={140} height={18} border={'4px'} />
          </div>
          {!sm && <Skeleton width={60} height={20} border={'4px'} />}
        </div>
      </div>
      <div className={cls.configuratorComponentCardFull__actions}>
        <div className={cls.configuratorComponentCardFull__buttons}>
          <Skeleton
            width={16}
            height={16}
            border={'6px'}
            className={clsFull.configuratorComponentCardFull__changeIcon}
          />
          <Skeleton
            width={16}
            height={16}
            border={'6px'}
            className={clsFull.configuratorComponentCardFull__changeIcon}
          />
        </div>
      </div>
    </div>
  )
}
