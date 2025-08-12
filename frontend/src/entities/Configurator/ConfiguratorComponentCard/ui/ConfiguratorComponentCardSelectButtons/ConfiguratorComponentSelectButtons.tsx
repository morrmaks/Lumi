import cls from './ConfiguratorComponentSelectButtons.module.less'
import { AppLink } from '@/shared/ui/AppLink'
import { Button, ButtonTheme } from '@/shared/ui/Button'
import { classNames } from '@/shared/lib/utils'

interface ConfiguratorComponentCardSelectButtonsProps {
  compact?: boolean
  routeItem: string
  routeCategory: string
}

export const ConfiguratorComponentSelectButtons = ({
  compact = false,
  routeItem,
  routeCategory,
}: ConfiguratorComponentCardSelectButtonsProps) => {
  return (
    <div
      className={classNames(cls.configuratorComponentSelectButtons, {
        [cls.configuratorComponentSelectButtons__compact]: compact,
      })}
    >
      <AppLink to={routeItem}>
        <Button
          theme={ButtonTheme.OUTLINE}
          className={cls.configuratorComponentSelectButtons__button}
        >
          К товару
        </Button>
      </AppLink>
      <AppLink to={routeCategory}>
        <Button
          theme={ButtonTheme.OUTLINE}
          className={cls.configuratorComponentSelectButtons__button}
        >
          Заменить
        </Button>
      </AppLink>
    </div>
  )
}
