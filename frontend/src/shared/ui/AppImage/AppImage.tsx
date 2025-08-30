import cls from './AppImage.module.less'
import { classNames } from '@/shared/lib/utils'
import {
  ImgHTMLAttributes,
  memo,
  ReactElement,
  useCallback,
  useEffect,
  useState,
} from 'react'
import { Skeleton } from '@/shared/ui/Skeleton'
import { MouseEvent } from 'react'
import { Icon } from '../Icon'
import { IconsMap } from '@/shared/consts'

type HtmlImageProps = Omit<ImgHTMLAttributes<HTMLImageElement>, 'onClick'>

export interface ImageProps extends HtmlImageProps {
  src: string
  alt: string
  className?: string
  fallback?: ReactElement
  errorFallback?: ReactElement
  index?: number
  onClick?: (val: string, index: number) => void
}

export const AppImage = memo(
  ({
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

    useEffect(() => {
      if (!src) return

      let isMounted = true
      const img = new Image()

      const timeout = setTimeout(() => {
        if (!isMounted) return
        setTimeoutReached(true)
        setIsLoading(false)
      }, 30000)

      img.src = src
      img.onload = () => {
        if (!isMounted) return
        clearTimeout(timeout)
        setIsLoading(false)
      }
      img.onerror = () => {
        if (!isMounted) return
        clearTimeout(timeout)
        setHasError(true)
        setIsLoading(false)
        setTimeoutReached(true)
      }

      return () => {
        isMounted = false
        clearTimeout(timeout)
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

    if (hasError || timeoutReached) {
      console.log('ошибка')
      return (
        errorFallback ?? (
          <div
            className={classNames(cls.image__errorFallback, {}, [className])}
          >
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
)

AppImage.displayName = 'AppImage'
