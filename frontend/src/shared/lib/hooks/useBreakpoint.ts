import { useEffect, useState } from 'react'

interface Breakpoints {
  sm: boolean
  md: boolean
  lg: boolean
  xl: boolean
}

const queries = {
  sm: '(min-width: 640px)',
  md: '(min-width: 768px)',
  lg: '(min-width: 1024px)',
  xl: '(min-width: 1280px)',
}

export const useBreakpoint = () => {
  function getMatches() {
    return {
      sm: window.matchMedia(queries.sm).matches,
      md: window.matchMedia(queries.md).matches,
      lg: window.matchMedia(queries.lg).matches,
      xl: window.matchMedia(queries.xl).matches,
    }
  }

  const [breakpoints, setBreakpoints] = useState<Breakpoints>(() =>
    typeof window !== 'undefined'
      ? getMatches()
      : {
          sm: false,
          md: false,
          lg: false,
          xl: false,
        }
  )

  useEffect(() => {
    const mediaQueryLists = Object.values(queries).map((query) =>
      window.matchMedia(query)
    )

    function handler() {
      setBreakpoints(getMatches())
    }

    mediaQueryLists.forEach((mql) => {
      mql.addEventListener('change', handler)
    })

    return () => {
      mediaQueryLists.forEach((mql) => {
        mql.removeEventListener('change', handler)
      })
    }
  }, [])

  return breakpoints
}
