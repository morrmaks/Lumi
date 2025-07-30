import cls from './NavBar.module.less'
import {
  getRouteCatalog,
  getRouteConfigurator,
  getRouteProfile,
  getRouteWishlist,
  getRouteSearch,
} from '@/shared/consts/router'
import { Logo } from '@/shared/ui/Logo'
import { SearchInput } from '@/features/Search'
import { ThemeSwitcher } from '@/shared/ui/ThemeSwitcher'
import { BurgerButton } from '@/shared/ui/BurgerButton'
import { useBreakpoint } from '@/shared/lib/hooks/useBreakpoint'
import { MenuItem } from '@/shared/ui/MenuItem'
import { classNames } from '@/shared/lib/classNames'
import { IconsMap } from '@/shared/consts/icons'
import { ButtonTheme } from '@/shared/ui/Button'

export const NavBar = () => {
  const { md } = useBreakpoint()

  return (
    <header className={cls.navbar}>
      {!md ? <BurgerButton /> : null}
      <Logo />
      <div className={cls.search}>
        {md ? (
          <SearchInput />
        ) : (
          <MenuItem
            to={getRouteSearch()}
            Svg={IconsMap.SEARCH}
            className={cls.search__icon}
          ></MenuItem>
        )}
      </div>

      {md ? (
        <nav className={cls.menu}>
          <MenuItem
            to={getRouteConfigurator()}
            Svg={IconsMap.CONFIGURATOR}
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
            Svg={IconsMap.CATALOG}
            className={cls.menu__item}
          ></MenuItem>
          <MenuItem
            to={getRouteWishlist()}
            Svg={IconsMap.WISHLIST}
            className={cls.menu__item}
          ></MenuItem>
          <MenuItem
            to={getRouteProfile()}
            Svg={IconsMap.PROFILE}
            className={cls.menu__item}
          ></MenuItem>
          <ThemeSwitcher
            className={cls.menu__item}
            themeButton={ButtonTheme.SECONDARY}
          />
        </nav>
      ) : null}
    </header>
  )
}
