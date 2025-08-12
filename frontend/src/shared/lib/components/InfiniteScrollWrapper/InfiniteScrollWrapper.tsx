import { ReactNode, useRef } from 'react'
import { useInfiniteScroll } from '@/shared/lib/hooks'

interface InfiniteScrollWrapperProps {
  onScrollEnd?: () => void
  withWrapperScroll?: boolean
  children: ReactNode
}

export const InfiniteScrollWrapper = ({
  onScrollEnd,
  children,
  withWrapperScroll = true,
}: InfiniteScrollWrapperProps) => {
  const wrapperRef = useRef<HTMLDivElement>(null)
  const triggerRef = useRef<HTMLDivElement>(null)

  useInfiniteScroll({
    wrapperRef,
    triggerRef,
    callback: onScrollEnd,
  })

  if (withWrapperScroll) {
    return (
      <div ref={wrapperRef}>
        {children}
        <div ref={triggerRef} />
      </div>
    )
  }

  return (
    <div>
      {children}
      <div ref={triggerRef} />
    </div>
  )
}
