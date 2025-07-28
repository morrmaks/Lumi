import {
  LOCAL_STORAGE_THEME_KEY,
  Theme,
  ThemeContext,
} from '../lib/ThemeContext'
import { ReactNode, useLayoutEffect, useMemo, useState } from 'react'

interface ThemeProviderProps {
  children: ReactNode
  initialTheme?: Theme
}

const defaultTheme =
  (localStorage.getItem(LOCAL_STORAGE_THEME_KEY) as Theme) || Theme.DARK

export const ThemeProvider = ({
  children,
  initialTheme,
}: ThemeProviderProps) => {
  const [theme, setTheme] = useState<Theme>(initialTheme || defaultTheme)

  useLayoutEffect(() => {
    const root = document.documentElement
    root.classList.remove(Theme.LIGHT, Theme.DARK)
    root.classList.add(theme)
  }, [theme])

  const defaultProps = useMemo(
    () => ({
      theme: theme,
      setTheme: setTheme,
    }),
    [theme]
  )

  return (
    <ThemeContext.Provider value={defaultProps}>
      {children}
    </ThemeContext.Provider>
  )
}
