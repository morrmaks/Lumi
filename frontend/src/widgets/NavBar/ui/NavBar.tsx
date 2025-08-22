import cls from './NavBar.module.less'
import { Logo } from '@/shared/ui/Logo'
import { ThemeSwitcher } from '@/shared/ui/ThemeSwitcher'
import { BurgerButton } from '@/shared/ui/BurgerButton'
import { useBreakpoint } from '@/shared/lib/hooks'
import { MenuItem } from '@/shared/ui/MenuItem'
import { classNames } from '@/shared/lib/utils'
import { ButtonTheme } from '@/shared/ui/Button'
import { NavBarLinksConfig } from '@/widgets/NavBar/config/NavBarLinks'

export const NavBar = () => {
  const { md } = useBreakpoint()

  return (
    <header className={cls.navbar__wrapper}>
      <div className={cls.navbar}>
        {!md ? <BurgerButton /> : null}
        <Logo />

        {md ? (
          <nav className={cls.navbar__menu}>
            {NavBarLinksConfig.map(
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
      </div>
    </header>
  )
}
