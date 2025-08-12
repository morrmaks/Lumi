import cls from './ConfiguratorComponents.module.less'
import {
  ConfiguratorComponentCard,
  ConfiguratorComponentCardSkeleton,
} from '@/entities/Configurator'
import { useAppDispatch, useAppSelector } from '@/shared/lib/hooks'
import {
  ComponentNames,
  ConfiguratorComponentMap,
  configuratorComponentsActions,
  ConfiguratorComponentsConfig,
  getConfiguratorComponentsState,
} from '@/features/Configurator'
import { useEffect, useState } from 'react'
import { AppLink } from '@/shared/ui/AppLink'
import {
  getRouteCatalogCategory,
  getRouteCatalogItem,
} from '@/shared/consts/router'
import { ConfiguratorEmptyComponentCard } from '@/entities/Configurator/ConfiguratorEmptyComponentCard'
import { classNames } from '@/shared/lib/utils'

const ComponentsMock: Partial<ConfiguratorComponentMap> = {
  ['graphics-card']: {
    id: '21312',
    image:
      'https://images.unsplash.com/photo-1624701928517-44c8ac49d93c?q=80&w=1740&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    title: 'Видеокарта',
    price: 40231,
  },
  ['memory']: {
    id: '21312',
    image:
      'https://images.unsplash.com/photo-1541029071515-84cc54f84dc5?q=80&w=1740&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    title: 'Оперативная память',
    price: 6231,
  },
}

interface ConfiguratorComponentsProps {
  carousel?: boolean
  className?: string
}

export const ConfiguratorComponents = ({
  carousel = false,
  className,
}: ConfiguratorComponentsProps) => {
  const [isLoading, setIsLoading] = useState(true)
  const dispatch = useAppDispatch()
  const { components, componentIds /* isLoading */ } = useAppSelector(
    getConfiguratorComponentsState
  )

  useEffect(() => {
    // dispatch(getConfiguratorComponents(componentIds))
    dispatch(configuratorComponentsActions.setComponents(ComponentsMock))

    const timeout = setTimeout(() => {
      //имитация загрузки пока нет реальных запросов
      dispatch(configuratorComponentsActions.setComponents(ComponentsMock))
      setIsLoading(false)
    }, 1500)
  }, [])

  if (isLoading) {
    return (
      <ul
        className={classNames(cls.configuratorComponents, {
          [cls.configuratorComponents__carousel]: carousel,
        })}
      >
        {[...new Array(8)].map((_, i) => (
          <li key={i}>
            <ConfiguratorComponentCardSkeleton compact={carousel} />
          </li>
        ))}
      </ul>
    )
  }

  return (
    <ul
      className={classNames(cls.configuratorComponents, {
        [cls.configuratorComponents__carousel]: carousel,
      })}
    >
      {Object.entries(components).map(([key, value]) => {
        const componentConfig =
          ConfiguratorComponentsConfig[key as ComponentNames]

        const routeCategory = getRouteCatalogCategory(componentConfig.category)

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
              componentName={key as ComponentNames}
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
