import cls from './ConfiguratorComponentCard.module.less'
import {
  ComponentTypes,
  ConfiguratorComponent,
  ConfiguratorComponentsConfig,
} from '@/features/Configurator'
import { Icon } from '@/shared/ui/Icon'
import { IconsMap } from '@/shared/consts/icons'
import { AppImage } from '@/shared/ui/AppImage'
import { ConfiguratorComponentSelectButtons } from '@/entities/Configurator'
import { useEffect, useRef, useState, useCallback } from 'react'

interface ConfiguratorComponentCardProps {
  componentName: ComponentTypes
  component: ConfiguratorComponent
  compact?: boolean
  routeItem: string
  routeCategory: string
}

export const ConfiguratorComponentCard = ({
  componentName,
  component,
  compact = false,
  routeItem,
  routeCategory,
}: ConfiguratorComponentCardProps) => {
  const [selectOpen, setSelectOpen] = useState<string>('')
  const ref = useRef<HTMLDivElement>(null)
  const { id, title, price, image } = component

  const handleSelect = useCallback(() => {
    setSelectOpen(id)
  }, [])

  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setSelectOpen('')
      }
    }

    document.addEventListener('mousedown', onClick)

    return () => {
      document.removeEventListener('mousedown', onClick)
    }
  }, [])

  if (compact) {
    return (
      <div
        className={cls.configuratorComponentCard__container}
        onClick={handleSelect}
        ref={ref}
      >
        <div className={cls.configuratorComponentCard__compact}>
          <AppImage
            src={image}
            alt={title}
            className={cls.configuratorComponentCard__compact_image}
          />
          <span className={cls.configuratorComponentCard__compact_price}>
            {price} ₽
          </span>
        </div>
        {selectOpen === id && (
          <ConfiguratorComponentSelectButtons
            compact={true}
            routeItem={routeItem}
            routeCategory={routeCategory}
          />
        )}
      </div>
    )
  }

  return (
    <div
      className={cls.configuratorComponentCard__container}
      onClick={handleSelect}
      ref={ref}
    >
      <div className={cls.configuratorComponentCard}>
        <AppImage
          src={image}
          alt={title}
          className={cls.configuratorComponentCard__image}
        />
        <div className={cls.configuratorComponentCard__meta}>
          <div>
            <h4 className={cls.configuratorComponentCard__title}>
              {ConfiguratorComponentsConfig[componentName].label}
            </h4>
            <p className={cls.configuratorComponentCard__productName}>
              {title}
            </p>
          </div>
          <span className={cls.configuratorComponentCard__price}>
            {price} ₽
          </span>
        </div>
        <Icon
          Svg={IconsMap.CHANGE}
          className={cls.configuratorComponentCard__changeIcon}
        />
      </div>
      {selectOpen === id && (
        <ConfiguratorComponentSelectButtons
          routeItem={routeItem}
          routeCategory={routeCategory}
        />
      )}
    </div>
  )
}
