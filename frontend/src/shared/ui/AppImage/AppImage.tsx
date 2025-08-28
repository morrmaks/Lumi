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
import { Icon } from '../Icon'
import { IconsMap } from '@/shared/consts'

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
  const [timeoutReached, setTimeoutReached] = useState(false)

  useLayoutEffect(() => {
    const img = new Image()
    console.log('таймер пошел')
    const timeout = setTimeout(() => {
      console.log('таймер прошел')
      setTimeoutReached(true)
      setIsLoading(false)
    }, 10000)

    img.src = src ?? ''
    img.onload = () => {
      setIsLoading(false)
      clearTimeout(timeout)
    }
    img.onerror = () => {
      setHasError(true)
      clearTimeout(timeout)
      setIsLoading(false)
      setTimeoutReached(true)
    }

    return () => clearTimeout(timeout)
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

  if (hasError || timeoutReached) {
    console.log('ошибка')
    return (
      errorFallback ?? (
        <div className={classNames(cls.image__errorFallback, {}, [className])}>
          <Icon
            Svg={IconsMap.PHOTO}
            className={cls.image__errorFallback_icon}
          />
        </div>
      )
    )
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
