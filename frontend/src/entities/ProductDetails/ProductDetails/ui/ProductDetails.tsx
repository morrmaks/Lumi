import cls from './ProductDetails.module.less'
import { Icon } from '@/shared/ui/Icon'
import { IconsMap } from '@/shared/consts'
import { getIconTheme } from '@/shared/lib/utils'
import { IProduct } from '@/pages/ProductPage'
import { getProductDetailsDiscountAmount } from '@/entities/ProductDetails'
import { Button, ButtonTheme } from '@/shared/ui/Button'
import { MouseEvent, useCallback } from 'react'

interface ProductDetailsProps {
  product: IProduct
}

export const ProductDetails = ({ product }: ProductDetailsProps) => {
  const {
    id,
    images,
    title,
    description,
    specs,
    rating,
    reviews,
    discountPrice,
    price,
    componentName,
  } = product

  const discountAmount = getProductDetailsDiscountAmount(price, discountPrice)

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

  return (
    <div className={cls.productDetails}>
      <div className={cls.productDetails__header}>
        <h2 className={cls.productDetails__title}>{title}</h2>
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
            Экономия: {discountAmount} ₽
          </span>
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
            В корзину
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
              В избранное
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
              В конфигуратор
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
