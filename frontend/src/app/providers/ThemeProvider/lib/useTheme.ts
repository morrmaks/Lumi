import { LOCAL_STORAGE_THEME_KEY, Theme, ThemeContext } from './ThemeContext'
import { useContext } from 'react'

export const useTheme = () => {
  const { theme, setTheme } = useContext(ThemeContext)

  function toggleTheme(e: React.MouseEvent<HTMLButtonElement>) {
    const root = document.documentElement
    const xPos = `${(e.clientX / window.innerWidth) * 100}%`
    const yPos = `${(e.clientY / window.innerWidth) * 100}%`
    root.style.setProperty('--theme-button-cord', `${xPos} ${yPos}`)

    function apply() {
      const nextTheme = theme === Theme.LIGHT ? Theme.DARK : Theme.LIGHT

      setTheme?.(nextTheme)
      localStorage.setItem(LOCAL_STORAGE_THEME_KEY, nextTheme)
    }

    if ('startViewTransition' in document) {
      document.startViewTransition(apply)
    } else {
      apply()
    }
  }

  return {
    theme: theme || Theme.LIGHT,
    toggleTheme,
  }
}
