import { Button, ButtonTheme } from '@/shared/ui/Button'
import { Icon } from '@/shared/ui/Icon'
import { Theme, useTheme } from '@/app/providers/ThemeProvider'
import { ReactNode, MouseEvent } from 'react'
import { classNames } from '@/shared/lib/utils'
import cls from './ThemeSwitcher.module.less'
import { IconsMap } from '@/shared/consts/icons'

export interface ThemeSwitcherProps {
  className?: string
  children?: ReactNode
  themeButton?: ButtonTheme
  onClick?: () => void
}

export const ThemeSwitcher = ({
  className,
  children,
  themeButton = ButtonTheme.PRIMARY,
  onClick,
}: ThemeSwitcherProps) => {
  const { theme, toggleTheme } = useTheme()

  const handleClick = (e: MouseEvent<HTMLButtonElement>) => {
    toggleTheme(e)
    onClick?.()
  }

  return (
    <Button
      data-testid="theme-switcher"
      style={{ viewTransitionName: 'theme-icon' }}
      onClick={handleClick}
      theme={themeButton}
      square={true}
      className={classNames(cls.themeSwitcher, {}, [className])}
    >
      {theme === Theme.LIGHT ? (
        <Icon
          key={Theme.LIGHT}
          Svg={IconsMap.THEME_LIGHT}
          data-testid="light-icon"
        />
      ) : (
        <Icon
          key={Theme.DARK}
          Svg={IconsMap.THEME_DARK}
          data-testid="dark-icon"
        />
      )}
      {children}
    </Button>
  )
}
