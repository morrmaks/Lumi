import cls from './MobileNavBar.module.less'
import {
  getRouteCatalog,
  getRouteConfigurator,
  getRouteMain,
  getRouteProfile,
  getRouteWishlist,
} from '@/shared/consts/router'
import { MenuItem } from '@/shared/ui/MenuItem'
import { IconsMap } from '@/shared/consts/icons'

export const MobileNavBar = () => {
  return (
    <nav className={cls.mobileNavBar}>
      <MenuItem
        to={getRouteMain()}
        Svg={IconsMap.HOME}
        className={cls.mobileNavBar_item}
      >
        Главная
      </MenuItem>
      <MenuItem
        to={getRouteConfigurator()}
        Svg={IconsMap.CONFIGURATOR}
        className={cls.mobileNavBar_item}
      >
        Конфиг ПК
      </MenuItem>
      <MenuItem
        to={getRouteCatalog()}
        Svg={IconsMap.CATALOG}
        className={cls.mobileNavBar_item}
      >
        Каталог
      </MenuItem>
      <MenuItem
        to={getRouteWishlist()}
        Svg={IconsMap.WISHLIST}
        className={cls.mobileNavBar_item}
      >
        Избранное
      </MenuItem>
      <MenuItem
        to={getRouteProfile()}
        Svg={IconsMap.PROFILE}
        className={cls.mobileNavBar_item}
      >
        Профиль
      </MenuItem>
    </nav>
  )
}
