import { RefObject, useEffect } from 'react'

interface UseInfiniteScrollOptions {
  callback?: () => void
  wrapperRef: RefObject<HTMLElement | null>
  triggerRef: RefObject<HTMLElement | null>
  enabled: boolean
}

export const useInfiniteScroll = ({
  callback,
  wrapperRef,
  triggerRef,
  enabled = true,
}: UseInfiniteScrollOptions) => {
  useEffect(() => {
    let observer: IntersectionObserver | null = null

    if (!enabled || !callback || !triggerRef.current) return

    const options = {
      root: wrapperRef.current ?? null,
      rootMargin: '300px',
      threshold: 0.5,
    }

    observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        callback()
      }
    }, options)

    observer.observe(triggerRef.current)

    return () => {
      if (observer && triggerRef?.current) {
        observer.unobserve(triggerRef?.current)
      }
    }
  }, [enabled, callback, wrapperRef, triggerRef])
}
