import cls from './BasketCard.module.less'
import { Icon } from '@/shared/ui/Icon'
import { IconsMap } from '@/shared/consts/icons'
import { Button, ButtonTheme } from '@/shared/ui/Button'
import { getRouteCatalog } from '@/shared/consts/router'
import { AppLink } from '@/shared/ui/AppLink'
import { getBasketProducts } from '@/features/Basket'
import { useAppSelector } from '@/shared/lib/hooks'
import { AppImage } from '@/shared/ui/AppImage'
import { getIconTheme } from '@/shared/lib/utils'
import { getTotalPriceCard } from '@/entities/Basket'
import { useCallback, useMemo } from 'react'

interface IBasketItem {
  id: string
  image: string
  title: string
  rating: string
  reviews: number
  quantity: number
  discountPrice: number
  price: number
}

interface BasketCardProps {
  card: IBasketItem
  onClickRemove: (id: string) => void
}

export const BasketCard = ({ card, onClickRemove }: BasketCardProps) => {
  const { id, image, title, rating, reviews, quantity, discountPrice, price } =
    card
  const products = useAppSelector(getBasketProducts)

  const productQuantity =
    products.find((product) => product.id === id)?.quantity || 1

  const getPriceCard = useMemo(() => {
    return getTotalPriceCard(productQuantity, price)
  }, [productQuantity, price])

  const getDiscountPriceCard = useMemo(() => {
    return getTotalPriceCard(productQuantity, discountPrice)
  }, [productQuantity, discountPrice])

  const handleRemoveCard = useCallback(() => {
    // dispatch(removeBasketProduct(id)) //это используется thunk запрос в котором диспатчится состояние избранного и изменяется значение в localStorage
    onClickRemove(id)
  }, [])

  const decrementCartItem = useCallback(() => {
    // dispatch(addBasketProduct(id))
  }, [])

  const incrementCartItem = useCallback(() => {
    // dispatch(decreaseBasketProductQuantity(id))
  }, [])

  return (
    <div className={cls.basketCard}>
      <div className={cls.basketCard__content}>
        <AppLink to={getRouteCatalog()}>
          <div className={cls.basketCard__details}>
            <AppImage
              src={image}
              alt={title}
              className={cls.basketCard__image}
            />
            <div className={cls.basketCard__infoSection}>
              <h3 className={cls.basketCard__title}>{title}</h3>
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
              disabled={productQuantity === 1}
              onClick={decrementCartItem}
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
              onClick={incrementCartItem}
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
            onClick={handleRemoveCard}
            className={cls.basketCard__deleteButton}
          >
            <Icon Svg={IconsMap.TRASH}></Icon>
          </Button>
        </div>
      </div>
    </div>
  )
}
