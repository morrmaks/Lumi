import {
  getRouteBasket,
  getRouteCatalog,
  getRouteConfigurator,
  getRouteProfile,
  getRouteWishlist,
} from '@/shared/consts/router'
import { IconsMap } from '@/shared/consts/icons'
import cls from '@/widgets/NavBar/ui/NavBar.module.less'

interface INavBarLink {
  to: string
  icon: React.FC<React.SVGProps<SVGSVGElement>>
  label?: string
  horizontal?: boolean
  extraClasses: string[]
}

export const NavBarLinksConfig: INavBarLink[] = [
  {
    to: getRouteConfigurator(),
    icon: IconsMap.CONFIGURATOR,
    label: 'Конфигуратор',
    horizontal: true,
    extraClasses: [cls.navbar__menuItem_configurator],
  },
  {
    to: getRouteCatalog(),
    icon: IconsMap.CATALOG,
    extraClasses: [],
  },
  {
    to: getRouteWishlist(),
    icon: IconsMap.WISHLIST,
    extraClasses: [],
  },
  {
    to: getRouteBasket(),
    icon: IconsMap.BASKET,
    extraClasses: [],
  },
  {
    to: getRouteProfile(),
    icon: IconsMap.PROFILE,
    extraClasses: [],
  },
]
