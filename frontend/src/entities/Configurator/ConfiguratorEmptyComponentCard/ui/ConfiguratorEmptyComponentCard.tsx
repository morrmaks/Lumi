import cls from './ConfiguratorEmptyComponentCard.module.less'
import { ConfiguratorComponentConfig } from '@/features/Configurator'
import { Icon } from '@/shared/ui/Icon'
import { IconsMap } from '@/shared/consts/icons'

interface ConfiguratorComponentCardProps {
  componentConfig: ConfiguratorComponentConfig
  compact?: boolean
}

export const ConfiguratorEmptyComponentCard = ({
  componentConfig,
  compact = false,
}: ConfiguratorComponentCardProps) => {
  if (compact) {
    return (
      <div className={cls.configuratorEmptyComponentCard__compact}>
        <Icon
          Svg={componentConfig.icon}
          className={cls.configuratorEmptyComponentCard__compact_typeIcon}
        />
        <h4 className={cls.configuratorEmptyComponentCard__compact_title}>
          {componentConfig.label}
        </h4>
      </div>
    )
  }

  return (
    <div className={cls.configuratorEmptyComponentCard}>
      <Icon
        Svg={componentConfig.icon}
        className={cls.configuratorEmptyComponentCard__typeIcon}
      />
      <div>
        <h4 className={cls.configuratorEmptyComponentCard__title}>
          {componentConfig.label}
        </h4>
        <p className={cls.configuratorEmptyComponentCard__description}>
          Не выбран
        </p>
      </div>
      <Icon
        Svg={IconsMap.PLUS}
        className={cls.configuratorEmptyComponentCard__actionIcon}
      />
    </div>
  )
}
