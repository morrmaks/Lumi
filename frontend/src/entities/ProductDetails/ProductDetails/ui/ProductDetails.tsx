import cls from './ProductDetails.module.less'
import { Icon } from '@/shared/ui/Icon'
import { IconsMap, Placeholders } from '@/shared/consts'
import { classNames, getIconTheme } from '@/shared/lib/utils'
import {
  getProductDetailsDiscountAmount,
  ProductDetailsSkeleton,
  ProductSpecs,
  useProductActions,
} from '@/entities/ProductDetails'
import { Button, ButtonTheme } from '@/shared/ui/Button'
import { useMemo } from 'react'
import { useAppSelector } from '@/shared/lib/hooks'
import { getProductCard } from '@/pages/ProductPage'

export interface ProductDetailsProps {
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

  const {
    handleAddToBasket,
    handleToggleWishlist,
    handleToggleConfigurator,
    isInWishlist,
    isInBasket,
    isInConfigurator,
    isLoadingWishlist,
    isLoadingBasket,
    isLoadingConfigurator,
  } = useProductActions(id, componentType)

  const discountAmount = useMemo(
    () => getProductDetailsDiscountAmount(price, discountPrice),
    [price, discountPrice]
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
            theme={isInBasket ? ButtonTheme.OUTLINE : ButtonTheme.PRIMARY}
            onClick={handleAddToBasket}
            className={classNames(
              cls.productDetails__button,
              { [cls.productDetails__button_basketActive]: isInBasket },
              []
            )}
            disabled={isLoadingBasket}
          >
            <Icon
              Svg={isInBasket ? IconsMap.PLUS : IconsMap.BASKET}
              className={classNames(
                cls.productDetails__buttonIcon,
                { [cls.productDetails__buttonIcon_basketActive]: isInBasket },
                []
              )}
            />
            {isInBasket
              ? Placeholders.entities.productDetails.onAddMoreToBasket
              : Placeholders.entities.productDetails.onAddToBasket}
          </Button>
          <div className={cls.productDetails__buttons_secondary}>
            <Button
              theme={ButtonTheme.OUTLINE}
              onClick={handleToggleWishlist}
              className={classNames(
                cls.productDetails__button,
                { [cls.productDetails__button_wishlistActive]: isInWishlist },
                []
              )}
              disabled={isLoadingWishlist}
            >
              <Icon
                Svg={isInWishlist ? IconsMap.TRASH : IconsMap.WISHLIST}
                className={classNames(
                  cls.productDetails__buttonIcon,
                  {
                    [cls.productDetails__buttonIcon_wishlistActive]:
                      isInWishlist,
                  },
                  []
                )}
              />
              {isInWishlist
                ? Placeholders.entities.productDetails.onRemoveFromWishlist
                : Placeholders.entities.productDetails.onAddToWishlist}
            </Button>
            {componentType && (
              <Button
                theme={ButtonTheme.OUTLINE}
                onClick={handleToggleConfigurator}
                className={classNames(
                  cls.productDetails__button,
                  {
                    [cls.productDetails__button_configuratorActive]:
                      isInConfigurator,
                  },
                  []
                )}
                disabled={isLoadingConfigurator}
              >
                <Icon
                  Svg={
                    isInConfigurator ? IconsMap.TRASH : IconsMap.CONFIGURATOR
                  }
                  className={classNames(
                    cls.productDetails__buttonIcon,
                    {
                      [cls.productDetails__buttonIcon_configuratorActive]:
                        isInConfigurator,
                    },
                    []
                  )}
                />
                {isInConfigurator
                  ? Placeholders.entities.productDetails
                      .onRemoveFromConfigurator
                  : Placeholders.entities.productDetails.onAddToConfigurator}
              </Button>
            )}
          </div>
        </div>
        {componentType && (
          <ProductSpecs specs={specs || {}} componentType={componentType} />
        )}

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
