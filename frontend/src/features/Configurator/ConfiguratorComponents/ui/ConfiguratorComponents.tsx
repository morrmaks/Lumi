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
  configuratorComponentsConfig,
  getConfiguratorComponentsState,
} from '@/features/Configurator'
import { useEffect, useState } from 'react'
import { Icon } from '@/shared/ui/Icon'
import { IconsMap } from '@/shared/consts/icons'
import { AppLink } from '@/shared/ui/AppLink'
import {
  getRouteCatalogCategory,
  getRouteCatalogItem,
} from '@/shared/consts/router'

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

export const ConfiguratorComponents = () => {
  const dispatch = useAppDispatch()
  const { components, componentIds /* isLoading */ } = useAppSelector(
    getConfiguratorComponentsState
  )
  const [isLoading, setIsLoading] = useState(true)

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
      <ul className={cls.configuratorComponents}>
        {[...new Array(8)].map((_, i) => (
          <li key={i}>
            <ConfiguratorComponentCardSkeleton />
          </li>
        ))}
      </ul>
    )
  }

  return (
    <ul className={cls.configuratorComponents}>
      {Object.entries(components).map(([key, value]) => {
        const componentConfig =
          configuratorComponentsConfig[key as ComponentNames]
        const route = value
          ? getRouteCatalogItem(componentConfig.category, value.id)
          : getRouteCatalogCategory(componentConfig.category)

        if (!value) {
          return (
            <AppLink
              key={key}
              to={route}
              className={cls.configuratorComponents__emptyComponent}
            >
              <Icon
                Svg={componentConfig.icon}
                className={cls.configuratorComponents__emptyComponent_typeIcon}
              />
              <div>
                <h4
                  className={cls.configuratorComponents__emptyComponent_title}
                >
                  {componentConfig.label}
                </h4>
                <p
                  className={
                    cls.configuratorComponents__emptyComponent_description
                  }
                >
                  Не выбран
                </p>
              </div>
              <Icon
                Svg={IconsMap.PLUS}
                className={
                  cls.configuratorComponents__emptyComponent_actionIcon
                }
              />
            </AppLink>
          )
        }

        return (
          <AppLink
            to={route}
            key={key}
            className={cls.configuratorComponents__component}
          >
            <ConfiguratorComponentCard
              componentName={key as ComponentNames}
              component={value}
            />
          </AppLink>
        )
      })}
    </ul>
  )
}
