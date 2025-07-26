import cls from './NavBar.module.less'
import {
  getRouteCatalog,
  getRouteConfigurator,
  getRouteProfile,
  getRouteWishlist,
  getRouteAuth,
} from '@/shared/consts/router'
import { Logo } from '@/shared/ui/Logo'
import { Search } from '@/features/Search'
import { ThemeSwitcher } from '@/shared/ui/ThemeSwitcher'
import { BurgerButton } from '@/shared/ui/BurgerButton'
import { useBreakpoint } from '@/shared/lib/hooks/useBreakpoint'
import { MenuItem } from '@/shared/ui/MenuItem'
import ProfileSvg from '@/shared/assets/icons/profile.svg'
import LoginSvg from '@/shared/assets/icons/login.svg'
import HeartSvg from '@/shared/assets/icons/heart.svg'
import ConfiguratorSvg from '@/shared/assets/icons/configurator.svg'
import CatalogSvg from '@/shared/assets/icons/catalog.svg'
import { classNames } from '@/shared/lib/classNames'

export const NavBar = () => {
  const { md } = useBreakpoint()
  const isAuth = false

  return (
    <div className={cls.navbar}>
      {!md ? <BurgerButton /> : null}
      <Logo />
      <div className={cls.search}>
        <Search />
      </div>

      {md ? (
        <>
          <nav className={cls.menu}>
            <MenuItem
              to={getRouteConfigurator()}
              Svg={ConfiguratorSvg}
              className={classNames('', {}, [
                cls.menu__item,
                cls.menu__item_configurator,
              ])}
              horizontal
            >
              Конфигуратор
            </MenuItem>
            <MenuItem
              to={getRouteCatalog()}
              Svg={CatalogSvg}
              className={cls.menu__item}
            ></MenuItem>
            <MenuItem
              to={getRouteWishlist()}
              Svg={HeartSvg}
              className={cls.menu__item}
            ></MenuItem>

            {isAuth ? (
              <MenuItem
                to={getRouteProfile()}
                Svg={ProfileSvg}
                className={cls.menu__item}
              ></MenuItem>
            ) : (
              <MenuItem
                to={getRouteAuth()}
                Svg={LoginSvg}
                className={cls.menu__item}
              ></MenuItem>
            )}
            <ThemeSwitcher className={cls.menu__item} />
          </nav>
        </>
      ) : null}
    </div>
  )
}
