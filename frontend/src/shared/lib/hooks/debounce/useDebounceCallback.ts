import { useEffect, useRef } from 'react'

export const useDebounceCallback = <T>(callback: (arg: T) => void, delay: number = 300) => {
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null)

  useEffect(() => {
    return () => {
      if (timer.current) clearTimeout(timer.current)
    }
  }, [])

  const run = (arg: T) => {
    if (timer.current) clearTimeout(timer.current)
    timer.current = setTimeout(() => {
      callback(arg)
    }, delay)
  }

  return run
}
