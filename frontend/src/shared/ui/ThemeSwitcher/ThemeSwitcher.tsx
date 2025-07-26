import { Button } from '@/shared/ui/Button'
import { Icon } from '@/shared/ui/Icon'
import SunIcon from '@/shared/assets/icons/sun.svg'
import MoonIcon from '@/shared/assets/icons/moon.svg'
import { Theme, useTheme } from '@/app/providers/ThemeProvider'

interface ThemeSwitcherProps {
  className?: string
}

export const ThemeSwitcher = ({ className }: ThemeSwitcherProps) => {
  const { theme, toggleTheme } = useTheme()

  return (
    <Button
      style={{ viewTransitionName: 'theme-icon' }}
      onClick={toggleTheme}
      className={className}
    >
      {theme === Theme.LIGHT ? (
        <Icon key="light" Svg={SunIcon} />
      ) : (
        <Icon key="dark" Svg={MoonIcon} />
      )}
    </Button>
  )
}
