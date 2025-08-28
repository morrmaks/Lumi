import { useCallback, useEffect, useState } from 'react'
import { IconsMap } from '@/shared/consts'
import { Icon } from '@/shared/ui/Icon'
import cls from './BannerCarousel.module.less'
import { classNames } from '@/shared/lib/utils'
import { AppImage } from '@/shared/ui/AppImage'
import { Button, ButtonTheme } from '@/shared/ui/Button'
import { AppLink } from '@/shared/ui/AppLink'
import { BannerCarouselSkeleton } from '@/entities/MainSection'
import { useGetBannersQuery } from '@/features/Banners/api/bannersApi'

export const BannerCarousel = () => {
  const [currentBanner, setCurrentBanner] = useState<number>(0)
  const { data: banners, isLoading, isFetching } = useGetBannersQuery()
  const bannersArray = Array.isArray(banners) ? banners : []
  const bannersLength = bannersArray.length

  useEffect(() => {
    const switchBanner = setInterval(() => {
      setCurrentBanner((prev) => (prev + 1) % bannersLength)
    }, 5000)
    return () => clearInterval(switchBanner)
  }, [bannersLength])

  const nextBanner = useCallback(() => {
    setCurrentBanner((prev) => (prev + 1) % bannersLength)
  }, [bannersLength])

  const prevBanner = useCallback(() => {
    setCurrentBanner((prev) => (prev - 1 + bannersLength) % bannersLength)
  }, [bannersLength])

  if (isLoading || isFetching) {
    return <BannerCarouselSkeleton />
  }

  if (!banners) return null

  return (
    <div className={cls.bannerCarousel}>
      <Button
        theme={ButtonTheme.STATIC}
        square={true}
        onClick={prevBanner}
        className={classNames(cls.bannerCarousel__button, {}, [
          cls.bannerCarousel__button_left,
        ])}
      >
        <Icon
          Svg={IconsMap.CHEVRON_LEFT}
          className={cls.bannerCarousel__chevronIcon}
        />
        <div
          className={classNames(cls.bannerCarousel__gradient, {}, [
            cls.bannerCarousel__gradient_left,
          ])}
        />
      </Button>
      <Button
        theme={ButtonTheme.STATIC}
        square={true}
        onClick={nextBanner}
        className={classNames(cls.bannerCarousel__button, {}, [
          cls.bannerCarousel__button_right,
        ])}
      >
        <Icon
          Svg={IconsMap.CHEVRON_RIGHT}
          className={cls.bannerCarousel__chevronIcon}
        />
        <div
          className={classNames(cls.bannerCarousel__gradient, {}, [
            cls.bannerCarousel__gradient_right,
          ])}
        />
      </Button>
      <ul className={cls.bannerCarousel__banners}>
        {banners.map(({ id, title, description, image, route }, index) => (
          <li
            key={id}
            className={classNames(cls.bannerCarousel__bannerItem, {
              [cls.bannerCarousel__bannerItem_active]: currentBanner === index,
            })}
          >
            <AppLink to={route}>
              <AppImage
                src={image}
                alt={title}
                className={cls.bannerCarousel__bannerItem_image}
              />
              <div className={cls.bannerCarousel__bannerItem_content}>
                <h3 className={cls.bannerCarousel__bannerItem_title}>
                  {title}
                </h3>
                <p className={cls.bannerCarousel__bannerItem_description}>
                  {description}
                </p>
              </div>
            </AppLink>
          </li>
        ))}
      </ul>
    </div>
  )
}
