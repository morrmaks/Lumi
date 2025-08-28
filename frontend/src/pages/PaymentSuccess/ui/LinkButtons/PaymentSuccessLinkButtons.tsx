import cls from './PaymentSuccessLinkButtons.module.less'
import { Icon } from '@/shared/ui/Icon'
import {
  getRouteCatalog,
  getRouteWishlist,
  IconsMap,
  Placeholders,
} from '@/shared/consts'
import { Button, ButtonTheme } from '@/shared/ui/Button'
import { AppLink } from '@/shared/ui/AppLink'

export const PaymentSuccessLinkButtons = () => {
  return (
    <div className={cls.paymentSuccessLinkButtons}>
      <AppLink
        to={getRouteCatalog()}
        className={cls.paymentSuccessLinkButtons__link}
      >
        <Button
          theme={ButtonTheme.OUTLINE}
          className={cls.paymentSuccessLinkButtons__button}
        >
          <Icon
            Svg={IconsMap.SHOP}
            className={cls.paymentSuccessLinkButtons__button_icon}
          />
          {Placeholders.pages.paymentSuccess.linkButtons.onRouteCatalog}
        </Button>
      </AppLink>
      <AppLink
        to={getRouteWishlist()}
        className={cls.paymentSuccessLinkButtons__link}
      >
        <Button
          theme={ButtonTheme.OUTLINE}
          className={cls.paymentSuccessLinkButtons__button}
        >
          <Icon
            Svg={IconsMap.WISHLIST}
            className={cls.paymentSuccessLinkButtons__button_icon}
          />
          {Placeholders.pages.paymentSuccess.linkButtons.onRouteWishlist}
        </Button>
      </AppLink>
    </div>
  )
}
