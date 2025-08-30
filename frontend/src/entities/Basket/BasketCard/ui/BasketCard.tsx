import cls from './BasketCard.module.less'
import { Icon } from '@/shared/ui/Icon'
import { IconsMap } from '@/shared/consts/icons'
import { Button, ButtonTheme } from '@/shared/ui/Button'
import { getRouteCatalogItem } from '@/shared/consts/router'
import { AppLink } from '@/shared/ui/AppLink'
import { getBasketProducts, IBasketProduct } from '@/features/Basket'
import { useAppSelector } from '@/shared/lib/hooks'
import { AppImage } from '@/shared/ui/AppImage'
import { getIconTheme } from '@/shared/lib/utils'
import { getTotalPriceCard } from '@/entities/Basket'
import { memo, useMemo } from 'react'
import { useBasketCardActions } from '@/entities/Basket/BasketCard/hooks'

export interface BasketCardProps {
  card: IBasketProduct
}

export const BasketCard = memo(({ card }: BasketCardProps) => {
  const {
    id,
    image,
    name,
    rating,
    reviews,
    quantity,
    discountPrice,
    price,
    categorySlug,
  } = card
  const products = useAppSelector(getBasketProducts)

  const { removeCard, decrementCard, incrementCard, isLoading } =
    useBasketCardActions(id)

  const productQuantity =
    products.find((product) => product.productId === id)?.quantity || 1

  const getPriceCard = useMemo(
    () => getTotalPriceCard(productQuantity, price),
    [productQuantity, price]
  )

  const getDiscountPriceCard = useMemo(
    () => getTotalPriceCard(productQuantity, discountPrice),
    [productQuantity, discountPrice]
  )

  return (
    <div className={cls.basketCard}>
      <div className={cls.basketCard__content}>
        <AppLink to={getRouteCatalogItem(categorySlug, id)}>
          <div className={cls.basketCard__details}>
            <AppImage
              src={image}
              alt={name}
              className={cls.basketCard__image}
            />
            <div className={cls.basketCard__infoSection}>
              <h3 className={cls.basketCard__title}>{name}</h3>
              <div className={cls.basketCard__priceSection}>
                <span className={cls.basketCard__discountPrice}>
                  {getDiscountPriceCard} ₽
                </span>
                {discountPrice !== price && (
                  <span className={cls.basketCard__price}>
                    {getPriceCard} ₽
                  </span>
                )}
              </div>
              <div className={cls.basketCard__ratingContainer}>
                <Icon
                  Svg={IconsMap.RATING}
                  theme={getIconTheme('YELLOW')}
                  className={cls.basketCard__ratingIcon}
                />
                <span className={cls.basketCard__rating}>{rating}</span>
                <span className={cls.basketCard__reviews}>({reviews})</span>
              </div>
            </div>
          </div>
        </AppLink>
        <div className={cls.basketCard__actions}>
          <div className={cls.basketCard__counter}>
            <Button
              theme={ButtonTheme.OUTLINE}
              square={true}
              className={cls.basketCard__counterButton}
              disabled={productQuantity === 1 || isLoading}
              onClick={decrementCard}
            >
              <Icon Svg={IconsMap.MINUS} />
            </Button>
            <span className={cls.basketCard__counterValue}>
              {productQuantity}
            </span>
            <Button
              theme={ButtonTheme.OUTLINE}
              square={true}
              className={cls.basketCard__counterButton}
              onClick={incrementCard}
              disabled={isLoading}
            >
              <Icon
                Svg={IconsMap.PLUS}
                className={cls.basketCard__counterButton_icon}
              />
            </Button>
          </div>
          <Button
            theme={ButtonTheme.OUTLINE}
            square={true}
            onClick={removeCard}
            disabled={isLoading}
            className={cls.basketCard__deleteButton}
          >
            <Icon Svg={IconsMap.TRASH}></Icon>
          </Button>
        </div>
      </div>
    </div>
  )
})

BasketCard.displayName = 'BasketCard'
