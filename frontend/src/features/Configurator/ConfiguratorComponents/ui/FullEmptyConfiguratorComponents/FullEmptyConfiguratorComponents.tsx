import { classNames } from '@/shared/lib/utils'
import cls from '@/features/Configurator/ConfiguratorComponents/ui/ConfiguratorComponents.module.less'
import {
  ComponentTypes,
  ConfiguratorComponentsConfig,
  EmptyConfigureComponentsMap,
} from '@/features/Configurator'
import { getRouteCatalogCategory } from '@/shared/consts'
import { AppLink } from '@/shared/ui/AppLink'
import { ConfiguratorEmptyComponentCard } from '@/entities/Configurator/ConfiguratorEmptyComponentCard'

interface FullEmptyConfiguratorComponentsProps {
  carousel?: boolean
  className?: string
}

export const FullEmptyConfiguratorComponents = ({
  carousel = false,
  className,
}: FullEmptyConfiguratorComponentsProps) => {
  return (
    <ul
      className={classNames(
        cls.configuratorComponents,
        { [cls.configuratorComponents__carousel]: carousel },
        [className]
      )}
    >
      {Object.entries(EmptyConfigureComponentsMap).map(([key, value]) => {
        const componentConfig =
          ConfiguratorComponentsConfig[key as ComponentTypes]

        const routeCategory = getRouteCatalogCategory(componentConfig.category)
        return (
          <AppLink
            key={key}
            to={routeCategory}
            className={cls.configuratorComponents__emptyComponent}
          >
            <ConfiguratorEmptyComponentCard
              componentConfig={componentConfig}
              compact={carousel}
            />
          </AppLink>
        )
      })}
    </ul>
  )
}
