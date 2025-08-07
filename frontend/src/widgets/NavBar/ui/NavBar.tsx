import cls from './NavBar.module.less'
import { getRouteSearch } from '@/shared/consts/router'
import { Logo } from '@/shared/ui/Logo'
import { SearchInput } from '@/features/Search'
import { ThemeSwitcher } from '@/shared/ui/ThemeSwitcher'
import { BurgerButton } from '@/shared/ui/BurgerButton'
import { useBreakpoint } from '@/shared/lib/hooks/useBreakpoint'
import { MenuItem } from '@/shared/ui/MenuItem'
import { classNames } from '@/shared/lib/utils'
import { IconsMap } from '@/shared/consts/icons'
import { ButtonTheme } from '@/shared/ui/Button'
import { navBarLinksConfig } from '@/widgets/NavBar/config/NavBarLinks'

export const NavBar = () => {
  const { md } = useBreakpoint()

  return (
    <header className={cls.navbar}>
      {!md ? <BurgerButton /> : null}
      <Logo />
      <div className={cls.navbar__search}>
        {md ? (
          <SearchInput />
        ) : (
          <MenuItem
            to={getRouteSearch()}
            Svg={IconsMap.SEARCH}
            className={cls.navbar__searchIcon}
          ></MenuItem>
        )}
      </div>

      {md ? (
        <nav className={cls.navbar__menu}>
          {navBarLinksConfig.map(
            ({ to, icon, label, extraClasses, horizontal }) => (
              <MenuItem
                key={to}
                to={to}
                Svg={icon}
                className={classNames(cls.navbar__menuItem, {}, [
                  ...extraClasses,
                ])}
                horizontal={horizontal}
              >
                {label}
              </MenuItem>
            )
          )}
          <ThemeSwitcher
            className={cls.navbar__menuItem}
            themeButton={ButtonTheme.OUTLINE}
          />
        </nav>
      ) : null}
    </header>
  )
}
