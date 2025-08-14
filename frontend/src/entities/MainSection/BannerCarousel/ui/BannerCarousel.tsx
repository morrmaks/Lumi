import { useCallback, useEffect, useState } from 'react'
import {
  CatalogCategoriesMap,
  getRouteCatalogCategory,
  getRouteConfigurator,
  IconsMap,
} from '@/shared/consts'
import { Icon } from '@/shared/ui/Icon'
import { useAppDispatch, useAppSelector } from '@/shared/lib/hooks'
import {
  bannersActions,
  getBannersIsLoading,
  getMainBannersCarousel,
  IBannerCarousel,
} from '@/features/Banners'
import cls from './BannerCarousel.module.less'
import { classNames } from '@/shared/lib/utils'
import { AppImage } from '@/shared/ui/AppImage'
import { Button, ButtonTheme } from '@/shared/ui/Button'
import { AppLink } from '@/shared/ui/AppLink'
import { BannerCarouselSkeleton } from '@/entities/MainSection'

const bannersCarousel: IBannerCarousel[] = [
  {
    id: 1,
    title: 'Конфигурация ПК нового поколения',
    description: 'RTX 4080 + Intel i7 13700K',
    image:
      'https://images.unsplash.com/photo-1658673640381-82912c827a68?q=80&w=1740&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    route: getRouteConfigurator(),
  },
  {
    id: 2,
    title: 'Видеокарты топ-уровня',
    description: 'RTX 4080, RTX 4070 и AMD Radeon RX 7900 – для мощных сборок',
    image:
      'https://images.unsplash.com/photo-1616877562265-d4ffd9d6f47f?q=80&w=1738&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    route: getRouteCatalogCategory(CatalogCategoriesMap.GPU),
  },
  {
    id: 3,
    title: 'Процессоры нового поколения',
    description: 'Intel i7/i9 13-го поколения и AMD Ryzen 7000 для любых задач',
    image:
      'https://images.unsplash.com/photo-1687071523279-93ec8e5e53b7?q=80&w=1752&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    route: getRouteCatalogCategory(CatalogCategoriesMap.CPU),
  },
]

export const BannerCarousel = () => {
  const [currentBanner, setCurrentBanner] = useState<number>(0)
  const dispatch = useAppDispatch()
  const isLoading = useAppSelector(getBannersIsLoading)
  const banners = useAppSelector(getMainBannersCarousel)

  useEffect(() => {
    if (!banners.length) {
      dispatch(bannersActions.setIsLoading(true))
      setTimeout(() => {
        dispatch(bannersActions.setMainBannersCarousel(bannersCarousel))
        dispatch(bannersActions.setIsLoading(false))
      }, 1000) //имитация запроса
    }
  }, [])

  useEffect(() => {
    const switchBanner = setInterval(() => {
      setCurrentBanner((prev) => (prev + 1) % banners.length)
    }, 5000)

    return () => clearInterval(switchBanner)
  }, [banners.length])

  const nextBanner = useCallback(() => {
    setCurrentBanner((prev) => (prev + 1) % banners.length)
  }, [banners.length])

  const prevBanner = useCallback(() => {
    setCurrentBanner((prev) => (prev - 1 + banners.length) % banners.length)
  }, [banners.length])

  if (isLoading) {
    return <BannerCarouselSkeleton />
  }

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
        {banners.map((banner, index) => (
          <li
            key={banner.id}
            className={classNames(cls.bannerCarousel__bannerItem, {
              [cls.bannerCarousel__bannerItem_active]: currentBanner === index,
            })}
          >
            <AppLink to={banner.route}>
              <AppImage
                src={banner.image}
                alt={banner.title}
                className={cls.bannerCarousel__bannerItem_image}
              />
              <div className={cls.bannerCarousel__bannerItem_content}>
                <h3 className={cls.bannerCarousel__bannerItem_title}>
                  {banner.title}
                </h3>
                <p className={cls.bannerCarousel__bannerItem_description}>
                  {banner.description}
                </p>
              </div>
            </AppLink>
          </li>
        ))}
      </ul>
    </div>
  )
}
