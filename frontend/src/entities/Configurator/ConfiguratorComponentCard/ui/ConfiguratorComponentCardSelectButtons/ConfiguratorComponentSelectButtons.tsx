import cls from './ConfiguratorComponentSelectButtons.module.less'
import { AppLink } from '@/shared/ui/AppLink'
import { Button, ButtonTheme } from '@/shared/ui/Button'
import { classNames } from '@/shared/lib/utils'
import { Placeholders } from '@/shared/consts'

interface ConfiguratorComponentCardSelectButtonsProps {
  compact?: boolean
  routeItem: string
  routeCategory: string
  isOpen: boolean
}

export const ConfiguratorComponentSelectButtons = ({
  compact = false,
  routeItem,
  routeCategory,
  isOpen,
}: ConfiguratorComponentCardSelectButtonsProps) => {
  return (
    <div
      className={classNames(cls.configuratorComponentSelectButtons, {
        [cls.configuratorComponentSelectButtons__compact]: compact,
        [cls.configuratorComponentSelectButtons__open]: isOpen,
      })}
    >
      <AppLink to={routeItem}>
        <Button
          theme={ButtonTheme.STATIC}
          className={cls.configuratorComponentSelectButtons__button}
        >
          {
            Placeholders.entities.configurator.componentSelectButtons
              .onRouteProduct
          }
        </Button>
      </AppLink>
      <AppLink to={routeCategory}>
        <Button
          theme={ButtonTheme.STATIC}
          className={cls.configuratorComponentSelectButtons__button}
        >
          {
            Placeholders.entities.configurator.componentSelectButtons
              .onRouteCategory
          }
        </Button>
      </AppLink>
    </div>
  )
}
