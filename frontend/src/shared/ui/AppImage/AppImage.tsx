import cls from './AppImage.module.less'
import { classNames } from '@/shared/lib/utils'
import {
  ImgHTMLAttributes,
  ReactElement,
  useLayoutEffect,
  useState,
} from 'react'
import { Skeleton } from '@/shared/ui/Skeleton'

interface ImageProps extends ImgHTMLAttributes<HTMLImageElement> {
  src: string
  alt: string
  className?: string
  fallback?: ReactElement
  errorFallback?: ReactElement
}

export const AppImage = ({
  className,
  src,
  alt,
  fallback,
  errorFallback,
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
  })

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
      {...otherProps}
    />
  )
}
