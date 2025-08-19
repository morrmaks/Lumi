import cls from './ProductDetails.module.less'
import { Icon } from '@/shared/ui/Icon'
import { IconsMap, Placeholders } from '@/shared/consts'
import { getIconTheme } from '@/shared/lib/utils'
import {
  getProductDetailsDiscountAmount,
  ProductDetailsSkeleton,
  ProductSpecs,
} from '@/entities/ProductDetails'
import { Button, ButtonTheme } from '@/shared/ui/Button'
import { MouseEvent, useCallback, useMemo } from 'react'
import { useAppSelector } from '@/shared/lib/hooks'
import { getProductCard } from '@/pages/ProductPage'

interface ProductDetailsProps {
  isLoading: boolean
}

export const ProductDetails = ({ isLoading }: ProductDetailsProps) => {
  const {
    id,
    name,
    description,
    specs,
    rating,
    reviews,
    discountPrice,
    price,
    componentType,
    quantity,
  } = useAppSelector(getProductCard)

  const discountAmount = useMemo(
    () => getProductDetailsDiscountAmount(price, discountPrice),
    [price, discountPrice]
  )

  const handleAddToBasket = useCallback((e: MouseEvent<HTMLButtonElement>) => {
    // dispatch(addBasketProduct(id))
    //используется thunk запрос в котором диспатчится состояние корзины и изменяется значение в localStorage
  }, [])

  const handleAddToWishlist = useCallback(
    (e: MouseEvent<HTMLButtonElement>) => {
      // dispatch(addBasketProduct(componentName, id))
      //используется thunk запрос в котором диспатчится состояние избранного и изменяется значение в localStorage
    },
    []
  )

  const handleAddToConfigurator = useCallback(
    (e: MouseEvent<HTMLButtonElement>) => {
      // dispatch(addConfiguratorComponent(id))
      //используется thunk запрос в котором диспатчится состояние избранного и изменяется значение в localStorage
    },
    []
  )

  if (isLoading) {
    return <ProductDetailsSkeleton />
  }

  return (
    <div className={cls.productDetails}>
      <div className={cls.productDetails__header}>
        <h2 className={cls.productDetails__title}>{name}</h2>

        <div className={cls.productDetails__ratingContainer}>
          <Icon
            Svg={IconsMap.RATING}
            theme={getIconTheme('YELLOW')}
            className={cls.productDetails__ratingIcon}
          />
          <span className={cls.productDetails__rating}>{rating}</span>
          <span className={cls.productDetails__reviews}>
            ({reviews} отзывов)
          </span>
        </div>

        <div className={cls.productDetails__priceSection}>
          {price !== discountPrice && (
            <span className={cls.productDetails__price}>{price} ₽</span>
          )}
          <span className={cls.productDetails__discountPrice}>
            {discountPrice} ₽
          </span>
          <span className={cls.productDetails__discountAmount}>
            {`${Placeholders.entities.productDetails.priceDifference} ${discountAmount} ₽`}
          </span>
        </div>

        <div className={cls.productDetails__stockSection}>
          <p>{`${Placeholders.entities.productDetails.inStockQuantity} ${quantity} шт.`}</p>
        </div>

        <div className={cls.productDetails__buttons}>
          <Button
            onClick={handleAddToBasket}
            className={cls.productDetails__button}
          >
            <Icon
              Svg={IconsMap.BASKET}
              className={cls.productDetails__buttonIcon}
            />
            {Placeholders.entities.productDetails.onAddToBasket}
          </Button>
          <div className={cls.productDetails__buttons_secondary}>
            <Button
              theme={ButtonTheme.OUTLINE}
              onClick={handleAddToWishlist}
              className={cls.productDetails__button}
            >
              <Icon
                Svg={IconsMap.WISHLIST}
                className={cls.productDetails__buttonIcon}
              />
              {Placeholders.entities.productDetails.onAddToWishlist}
            </Button>
            <Button
              theme={ButtonTheme.OUTLINE}
              onClick={handleAddToConfigurator}
              className={cls.productDetails__button}
            >
              <Icon
                Svg={IconsMap.CONFIGURATOR}
                className={cls.productDetails__buttonIcon}
              />
              {Placeholders.entities.productDetails.onAddToConfigurator}
            </Button>
          </div>
        </div>

        <ProductSpecs specs={specs || {}} componentType={componentType} />

        <div className={cls.productDetails__description}>
          <h3 className={cls.productDetails__description_title}>
            {Placeholders.entities.productDetails.description.mainText}
          </h3>
          <p className={cls.productDetails__description_text}>{description}</p>
        </div>
      </div>
    </div>
  )
}
