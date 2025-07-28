import { Button } from '@/shared/ui/Button'
import { Icon } from '@/shared/ui/Icon'
import { Theme, useTheme } from '@/app/providers/ThemeProvider'
import { ReactNode } from 'react'
import { classNames } from '@/shared/lib/classNames'
import cls from './ThemeSwitcher.module.less'
import { IconsMap } from '@/shared/consts/icons'

interface ThemeSwitcherProps {
  className?: string
  children?: ReactNode
}

export const ThemeSwitcher = ({ className, children }: ThemeSwitcherProps) => {
  const { theme, toggleTheme } = useTheme()

  return (
    <Button
      style={{ viewTransitionName: 'theme-icon' }}
      onClick={toggleTheme}
      className={classNames(cls.themeSwitcher, {}, [className])}
    >
      {theme === Theme.LIGHT ? (
        <Icon key={Theme.LIGHT} Svg={IconsMap.THEME_LIGHT} />
      ) : (
        <Icon key={Theme.DARK} Svg={IconsMap.THEME_DARK} />
      )}
      {children}
    </Button>
  )
}
