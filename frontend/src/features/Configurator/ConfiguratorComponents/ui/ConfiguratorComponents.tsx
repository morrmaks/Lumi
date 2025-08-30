import cls from './ConfiguratorComponents.module.less'
import {
  ConfiguratorComponentCard,
  ConfiguratorComponentCardSkeleton,
} from '@/entities/Configurator'
import { useAppDispatch, useAppSelector } from '@/shared/lib/hooks'
import {
  ComponentTypes,
  configuratorComponentsActions,
  ConfiguratorComponentsConfig,
  getConfiguratorComponentsList,
} from '@/features/Configurator'
import { memo, useEffect } from 'react'
import { AppLink } from '@/shared/ui/AppLink'
import {
  getRouteCatalogCategory,
  getRouteCatalogItem,
} from '@/shared/consts/router'
import { ConfiguratorEmptyComponentCard } from '@/entities/Configurator/ConfiguratorEmptyComponentCard'
import { classNames, getConfiguratorComponentIds } from '@/shared/lib/utils'
import { useGetConfigureComponentsQuery } from '@/features/Configurator/api'
import { createConfiguratorComponentsMap } from '@/features/Configurator'
import { getTotalConfigPrice } from '@/pages/Configurator'
import { FullEmptyConfiguratorComponents } from '@/features/Configurator'

export interface ConfiguratorComponentsProps {
  carousel?: boolean
  className?: string
}

const ConfiguratorComponents = memo(
  ({ carousel = false, className }: ConfiguratorComponentsProps) => {
    const dispatch = useAppDispatch()
    const components = useAppSelector(getConfiguratorComponentsList)
    const componentIds = getConfiguratorComponentIds(components)

    const { data: componentsData, isLoading } = useGetConfigureComponentsQuery(
      componentIds,
      { skip: componentIds.length === 0 }
    )
    const configuratorComponentsMap =
      createConfiguratorComponentsMap(componentsData)

    useEffect(() => {
      dispatch(
        configuratorComponentsActions.setPrice(
          getTotalConfigPrice(componentsData)
        )
      )
    }, [componentsData, dispatch])

    if (isLoading) {
      return (
        <ul
          className={classNames(
            cls.configuratorComponents,
            { [cls.configuratorComponents__carousel]: carousel },
            [className]
          )}
        >
          {[...new Array(8)].map((_, i) => (
            <li key={i} className={cls.configuratorComponents__component}>
              <ConfiguratorComponentCardSkeleton compact={carousel} />
            </li>
          ))}
        </ul>
      )
    }

    if (componentIds.length === 0) {
      return (
        <FullEmptyConfiguratorComponents
          carousel={carousel}
          className={className}
        />
      )
    }

    return (
      <ul
        className={classNames(
          cls.configuratorComponents,
          { [cls.configuratorComponents__carousel]: carousel },
          [className]
        )}
      >
        {Object.entries(configuratorComponentsMap).map(([key, value]) => {
          const componentConfig =
            ConfiguratorComponentsConfig[key as ComponentTypes]

          const routeCategory = getRouteCatalogCategory(
            componentConfig.category
          )

          if (!value) {
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
          }

          const routeItem = getRouteCatalogItem(
            componentConfig.category,
            value.id
          )

          return (
            <li key={key} className={cls.configuratorComponents__component}>
              <ConfiguratorComponentCard
                componentName={key as ComponentTypes}
                component={value}
                compact={carousel}
                routeItem={routeItem}
                routeCategory={routeCategory}
              />
            </li>
          )
        })}
      </ul>
    )
  }
)

ConfiguratorComponents.displayName = 'ConfiguratorComponents'

export default ConfiguratorComponents
