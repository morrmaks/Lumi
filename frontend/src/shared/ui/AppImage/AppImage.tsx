import cls from './AppImage.module.less'
import { classNames } from '@/shared/lib/utils'
import {
  ImgHTMLAttributes,
  memo,
  ReactElement,
  useCallback,
  useLayoutEffect,
  useState,
} from 'react'
import { Skeleton } from '@/shared/ui/Skeleton'
import { MouseEvent } from 'react'

type HtmlImageProps = Omit<ImgHTMLAttributes<HTMLImageElement>, 'onClick'>

interface ImageProps extends HtmlImageProps {
  src: string
  alt: string
  className?: string
  fallback?: ReactElement
  errorFallback?: ReactElement
  index?: number
  onClick?: (val: string, index: number) => void
}

export const CustomImage = ({
  className,
  src,
  alt,
  fallback,
  errorFallback,
  index,
  onClick,
  ...otherProps
}: ImageProps) => {
  const [isLoading, setIsLoading] = useState(true)
  const [hasError, setHasError] = useState(false)

  useLayoutEffect(() => {
    const img = new Image()
    img.src = src ?? ''
    img.onload = () => {
      setIsLoading(false)
    }
    img.onerror = () => {
      setHasError(true)
    }
  }, [src])

  const handleClick = useCallback(
    (e: MouseEvent<HTMLImageElement>) => {
      onClick?.(src, index ?? 0)
    },
    [onClick, src]
  )

  if (isLoading) {
    return (
      fallback ?? (
        <Skeleton className={classNames(cls.image, {}, [className])} />
      )
    )
  }

  if (hasError && errorFallback) {
    return errorFallback
  }

  return (
    <img
      src={src}
      alt={alt}
      className={classNames(cls.image, {}, [className])}
      onClick={handleClick}
      {...otherProps}
    />
  )
}

export const AppImage = memo(CustomImage)
