import {
  getRouteBasket,
  getRouteCatalog,
  getRouteConfigurator,
  getRouteProfile,
  getRouteWishlist,
} from '@/shared/consts/router'
import { IconsMap } from '@/shared/consts/icons'

interface ISlideMenuLink {
  to: string
  icon: React.FC<React.SVGProps<SVGSVGElement>>
  label: string
}

export const slideMenuLinks: ISlideMenuLink[] = [
  {
    to: getRouteCatalog(),
    icon: IconsMap.CATALOG,
    label: 'Каталог',
  },
  {
    to: getRouteConfigurator(),
    icon: IconsMap.CONFIGURATOR,
    label: 'Конфигуратор',
  },
  {
    to: getRouteWishlist(),
    icon: IconsMap.WISHLIST,
    label: 'Избранное',
  },
  {
    to: getRouteBasket(),
    icon: IconsMap.BASKET,
    label: 'Корзина',
  },
  {
    to: getRouteProfile(),
    icon: IconsMap.PROFILE,
    label: 'Профиль',
  },
]
