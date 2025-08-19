import cls from './ProfileEmptyOrders.module.less'
import { Icon } from '@/shared/ui/Icon'
import {
  getRouteBasket,
  getRouteCatalog,
  IconsMap,
  Placeholders,
} from '@/shared/consts'
import { Button, ButtonTheme } from '@/shared/ui/Button'
import { AppLink } from '@/shared/ui/AppLink'

export const ProfileEmptyOrders = () => {
  return (
    <div className={cls.profileEmpryOrders}>
      <Icon Svg={IconsMap.ORDERS} className={cls.profileEmpryOrders__icon} />
      <h3 className={cls.profileEmpryOrders__title}>
        {Placeholders.entities.profile.orders.emptyOrders.mainText}
      </h3>
      <p className={cls.profileEmpryOrders__description}>
        {Placeholders.entities.profile.orders.emptyOrders.describeText}
      </p>
      <div className={cls.profileEmpryOrders__buttons}>
        <AppLink to={getRouteCatalog()}>
          <Button theme={ButtonTheme.SECONDARY}>
            {Placeholders.entities.profile.orders.emptyOrders.onRouteCatalog}
          </Button>
        </AppLink>
        <AppLink to={getRouteBasket()}>
          <Button theme={ButtonTheme.OUTLINE}>
            {Placeholders.entities.profile.orders.emptyOrders.onRouteCatalog}
          </Button>
        </AppLink>
      </div>
    </div>
  )
}
