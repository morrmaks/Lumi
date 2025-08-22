import { createContext } from 'react'

export const Theme = {
  LIGHT: 'theme_light',
  DARK: 'theme_dark',
} as const

export type Theme = (typeof Theme)[keyof typeof Theme]

interface ThemeContextProps {
  theme?: Theme
  setTheme?: (theme: Theme) => void
}

export const ThemeContext = createContext<ThemeContextProps>({})
