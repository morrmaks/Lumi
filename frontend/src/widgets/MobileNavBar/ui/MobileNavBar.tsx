import cls from './MobileNavBar.module.less'
import {
  getRouteAuth,
  getRouteCatalog,
  getRouteConfigurator,
  getRouteMain,
  getRouteProfile,
  getRouteWishlist,
} from '@/shared/consts/router'
import { MenuItem } from '@/shared/ui/MenuItem'
import HomeSvg from '@/shared/assets/icons/home.svg'
import ConfiguratorSvg from '@/shared/assets/icons/configurator.svg'
import HeartSvg from '@/shared/assets/icons/heart.svg'
import CatalogSvg from '@/shared/assets/icons/catalog.svg'
import ProfileSvg from '@/shared/assets/icons/profile.svg'
import LoginSvg from '@/shared/assets/icons/login.svg'

export const MobileNavBar = () => {
  const isAuth = false

  return (
    <nav className={cls.mobileNavBar}>
      <MenuItem to={getRouteMain()} Svg={HomeSvg}>
        Главная
      </MenuItem>
      <MenuItem to={getRouteConfigurator()} Svg={ConfiguratorSvg}>
        Конфиг ПК
      </MenuItem>
      <MenuItem to={getRouteCatalog()} Svg={CatalogSvg}>
        Каталог
      </MenuItem>
      <MenuItem to={getRouteWishlist()} Svg={HeartSvg}>
        Избранное
      </MenuItem>
      {isAuth ? (
        <MenuItem to={getRouteProfile()} Svg={ProfileSvg}>
          Профиль
        </MenuItem>
      ) : (
        <MenuItem to={getRouteAuth()} Svg={LoginSvg}>
          Вход
        </MenuItem>
      )}
    </nav>
  )
}
