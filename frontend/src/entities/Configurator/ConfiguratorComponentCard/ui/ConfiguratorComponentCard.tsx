import cls from './ConfiguratorComponentCard.module.less'
import {
  ComponentNames,
  ConfiguratorComponent,
  configuratorComponentsConfig,
} from '@/features/Configurator'
import { Icon } from '@/shared/ui/Icon'
import { IconsMap } from '@/shared/consts/icons'
import { AppImage } from '@/shared/ui/AppImage'

interface ConfiguratorComponentCardProps {
  componentName: ComponentNames
  component: ConfiguratorComponent
}

export const ConfiguratorComponentCard = ({
  componentName,
  component,
}: ConfiguratorComponentCardProps) => {
  const { id, title, price, image } = component

  return (
    <div className={cls.configuratorComponentCard}>
      <AppImage
        src={image}
        alt={title}
        className={cls.configuratorComponentCard__image}
      />
      <div className={cls.configuratorComponentCard__meta}>
        <div>
          <h4 className={cls.configuratorComponentCard__title}>
            {configuratorComponentsConfig[componentName].label}
          </h4>
          <p className={cls.configuratorComponentCard__productName}>{title}</p>
        </div>
        <span className={cls.configuratorComponentCard__price}>{price} ₽</span>
      </div>
      <Icon
        Svg={IconsMap.CHANGE}
        className={cls.configuratorComponentCard__changeIcon}
      />
    </div>
  )
}
