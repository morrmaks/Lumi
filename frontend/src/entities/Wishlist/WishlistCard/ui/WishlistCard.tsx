import { Checkbox } from '@/shared/ui/Checkbox'
import cls from './WishlistCard.module.less'
import { Icon } from '@/shared/ui/Icon'
import { IconsMap } from '@/shared/consts/icons'
import { Button, ButtonTheme } from '@/shared/ui/Button'
import { getRouteCatalog } from '@/shared/consts/router'
import { AppLink } from '@/shared/ui/AppLink'
import { AppImage } from '@/shared/ui/AppImage'
import { useBreakpoint } from '@/shared/lib/hooks'
import { getIconTheme } from '@/shared/lib/utils'

interface IWishlistItem {
  id: string
  image: string
  title: string
  rating: string
  reviews: number
  discountPrice: number
  price: number
}

interface WishlistCardProps {
  card: IWishlistItem
  onSelectCard: (id: string, newStateChecked: boolean) => void
  onClickRemove: (id: string) => void
  checked: boolean
}

export const WishlistCard = ({
  card,
  onSelectCard,
  onClickRemove,
  checked,
}: WishlistCardProps) => {
  const { id, image, title, rating, reviews, discountPrice, price } = card

  const { sm } = useBreakpoint()

  function handleSelectCard(newStateChecked: boolean) {
    onSelectCard(id, newStateChecked)
  }

  function handleAddToBasket() {
    // dispatch(addBasketProduct(id))
    //используется thunk запрос в котором диспатчится состояние корзины и изменяется значение в localStorage
  }

  function handleRemoveCard() {
    // dispatch(removeWishlistProducts(id))
    //используется thunk запрос в котором диспатчится состояние избранного и изменяется значение в localStorage
    onClickRemove(id)
  }

  return (
    <div className={cls.wishlistCard}>
      <Checkbox onChange={handleSelectCard} checked={checked} />
      <div className={cls.wishlistCard__content}>
        <AppLink to={getRouteCatalog()}>
          <div className={cls.wishlistCard__details}>
            <AppImage
              src={image}
              alt={title}
              className={cls.wishlistCard__image}
            />
            <div className={cls.wishlistCard__infoSection}>
              <h3 className={cls.wishlistCard__title}>{title}</h3>
              <div className={cls.wishlistCard__ratingContainer}>
                <Icon
                  Svg={IconsMap.RATING}
                  theme={getIconTheme('YELLOW')}
                  className={cls.wishlistCard__ratingIcon}
                />
                <span className={cls.wishlistCard__rating}>{rating}</span>
                <span className={cls.wishlistCard__reviews}>({reviews})</span>
              </div>
            </div>
          </div>
        </AppLink>
        <div className={cls.wishlistCard__actions}>
          <div className={cls.wishlistCard__priceSection}>
            <span className={cls.wishlistCard__discountPrice}>
              {discountPrice} ₽
            </span>
            {discountPrice !== price && (
              <span className={cls.wishlistCard__price}>{price} ₽</span>
            )}
          </div>
          <div className={cls.wishlistCard__buttons}>
            <Button
              theme={ButtonTheme.SECONDARY}
              onClick={handleAddToBasket}
              className={cls.wishlistCard__button}
            >
              <Icon
                Svg={IconsMap.BASKET}
                className={cls.wishlistCard__buttonIcon}
              ></Icon>
              В корзину
            </Button>
            <Button
              theme={ButtonTheme.OUTLINE}
              onClick={handleRemoveCard}
              className={cls.wishlistCard__button}
            >
              <Icon
                Svg={IconsMap.TRASH}
                className={cls.wishlistCard__buttonIcon}
              ></Icon>
              {sm ? 'Удалить' : ''}
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
