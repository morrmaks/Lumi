import cls from './ConfiguratorComponents.module.less'
import { ConfiguratorComponentCardSkeleton } from '@/entities/Configurator'
import { classNames } from '@/shared/lib/utils'

interface ConfiguratorComponentsSkeletonProps {
  carousel?: boolean
}

export const ConfiguratorComponentsSkeleton = ({
  carousel = false,
}: ConfiguratorComponentsSkeletonProps) => {
  return (
    <ul
      className={classNames(
        cls.configuratorComponents,
        { [cls.configuratorComponents__carousel]: carousel },
        []
      )}
    >
      {[...new Array(8)].map((_, i) => (
        <li key={i}>
          <ConfiguratorComponentCardSkeleton compact={carousel} />
        </li>
      ))}
    </ul>
  )
}
