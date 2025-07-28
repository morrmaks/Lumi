import { useEffect } from 'react'

export const useViewportHeightCssVar = () => {
  useEffect(() => {
    const setAppViewportHeight = () => {
      const vh = window.innerHeight * 0.01
      document.documentElement.style.setProperty('--app-vh', `${vh}px`)
    }

    setAppViewportHeight()
    window.addEventListener('resize', setAppViewportHeight)

    return () => {
      window.removeEventListener('resize', setAppViewportHeight)
    }
  }, [])
}
