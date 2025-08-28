import {
  getRouteBasket,
  getRouteCatalog,
  getRouteConfigurator,
  getRouteMain,
  getRouteProfile,
} from '@/shared/consts/router'
import { IconsMap } from '@/shared/consts/icons'

interface IMobileNavBarItem {
  to: string
  icon: React.FC<React.SVGProps<SVGSVGElement>>
  label: string
}

export const MobileNavBarLinksConfig: IMobileNavBarItem[] = [
  {
    to: getRouteMain(),
    icon: IconsMap.HOME,
    label: 'главная',
  },
  {
    to: getRouteConfigurator(),
    icon: IconsMap.CONFIGURATOR,
    label: 'конфиг',
  },
  {
    to: getRouteCatalog(),
    icon: IconsMap.CATALOG,
    label: 'каталог',
  },
  {
    to: getRouteBasket(),
    icon: IconsMap.BASKET,
    label: 'корзина',
  },
  {
    to: getRouteProfile(),
    icon: IconsMap.PROFILE,
    label: 'профиль',
  },
]
