import cls from './ConfiguratorComponentCardCompact.module.less'
import { ComponentTypes, IConfiguratorComponent } from '@/features/Configurator'
import { AppImage } from '@/shared/ui/AppImage'
import { ConfiguratorComponentSelectButtons } from '@/entities/Configurator'
import { useState, useCallback, MouseEvent } from 'react'

interface ConfiguratorComponentCardCompactProps {
  componentName: ComponentTypes
  component: IConfiguratorComponent
  compact?: boolean
  routeItem: string
  routeCategory: string
}

export const ConfiguratorComponentCardCompact = ({
  component,
  routeItem,
  routeCategory,
}: ConfiguratorComponentCardCompactProps) => {
  const [selectOpen, setSelectOpen] = useState<string>('')
  const { id, name, discountPrice, image } = component

  const handleHover = useCallback((e: MouseEvent<HTMLDivElement>) => {
    if (e.type === 'mouseenter') {
      setSelectOpen(id)
    } else if (e.type === 'mouseleave') {
      setSelectOpen('')
    }
  }, [])

  return (
    <div
      className={cls.configuratorComponentCardCompact__container}
      onMouseEnter={handleHover}
      onMouseLeave={handleHover}
    >
      <div className={cls.configuratorComponentCardCompact}>
        <AppImage
          src={image}
          alt={name}
          className={cls.configuratorComponentCardCompact__image}
        />
        <span className={cls.configuratorComponentCardCompact__price}>
          {discountPrice} ₽
        </span>
      </div>
      <ConfiguratorComponentSelectButtons
        isOpen={selectOpen === id}
        compact={true}
        routeItem={routeItem}
        routeCategory={routeCategory}
      />
    </div>
  )
}
