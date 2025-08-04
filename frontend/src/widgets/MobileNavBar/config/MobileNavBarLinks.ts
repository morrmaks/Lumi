import {
  getRouteBasket,
  getRouteCatalog,
  getRouteMain,
  getRouteProfile,
  getRouteWishlist,
} from '@/shared/consts/router'
import { IconsMap } from '@/shared/consts/icons'

interface IMobileNavBarItem {
  to: string
  icon: React.FC<React.SVGProps<SVGSVGElement>>
  label: string
}

export const mobileNavBarLinks: IMobileNavBarItem[] = [
  {
    to: getRouteMain(),
    icon: IconsMap.HOME,
    label: 'Главная',
  },
  {
    to: getRouteWishlist(),
    icon: IconsMap.WISHLIST,
    label: 'Избранное',
  },
  {
    to: getRouteCatalog(),
    icon: IconsMap.CATALOG,
    label: 'Каталог',
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
