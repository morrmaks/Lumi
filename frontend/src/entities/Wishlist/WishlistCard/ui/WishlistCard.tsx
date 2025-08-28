import { Checkbox } from '@/shared/ui/Checkbox'
import cls from './WishlistCard.module.less'
import { Icon } from '@/shared/ui/Icon'
import { IconsMap } from '@/shared/consts/icons'
import { Button, ButtonTheme } from '@/shared/ui/Button'
import { getRouteCatalogItem } from '@/shared/consts/router'
import { AppLink } from '@/shared/ui/AppLink'
import { AppImage } from '@/shared/ui/AppImage'
import { useBreakpoint } from '@/shared/lib/hooks'
import { getIconTheme } from '@/shared/lib/utils'
import { Placeholders } from '@/shared/consts'
import { IWishlistProduct } from '@/features/Wishlist'
import { memo, useCallback } from 'react'
import { useWishlistCardActions } from '@/entities/Wishlist'

interface WishlistCardProps {
  card: IWishlistProduct
  onSelectCard: (id: string, newStateChecked: boolean) => void
  onClickRemove: (id: string) => void
  checked: boolean
  isLoadingDeleteWishlistProduct: boolean
}

export const WishlistCard = memo(
  ({
    card,
    onSelectCard,
    onClickRemove,
    checked,
    isLoadingDeleteWishlistProduct,
  }: WishlistCardProps) => {
    const {
      id,
      image,
      name,
      rating,
      reviews,
      discountPrice,
      price,
      categorySlug,
    } = card
    const { sm } = useBreakpoint()

    const { addToBasket, isLoadingAddToBasket } = useWishlistCardActions(id)

    const handleSelectCard = useCallback(
      (newStateChecked: boolean) => onSelectCard(id, newStateChecked),
      [onSelectCard, id]
    )

    const handleRemoveCard = useCallback(
      () => onClickRemove(id),
      [onClickRemove, id]
    )

    return (
      <div className={cls.wishlistCard}>
        <Checkbox onChange={handleSelectCard} checked={checked} />
        <div className={cls.wishlistCard__content}>
          <AppLink to={getRouteCatalogItem(categorySlug, id)}>
            <div className={cls.wishlistCard__details}>
              <AppImage
                src={image}
                alt={name}
                className={cls.wishlistCard__image}
              />
              <div className={cls.wishlistCard__infoSection}>
                <h3 className={cls.wishlistCard__title}>{name}</h3>
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
                onClick={addToBasket}
                className={cls.wishlistCard__button}
                disabled={isLoadingAddToBasket}
              >
                <Icon
                  Svg={IconsMap.BASKET}
                  className={cls.wishlistCard__buttonIcon}
                ></Icon>
                {Placeholders.entities.wishlist.card.onAddToBasket}
              </Button>
              <Button
                theme={ButtonTheme.OUTLINE}
                onClick={handleRemoveCard}
                className={cls.wishlistCard__button}
                disabled={isLoadingDeleteWishlistProduct}
              >
                <Icon
                  Svg={IconsMap.TRASH}
                  className={cls.wishlistCard__buttonIcon}
                ></Icon>
                {sm ? Placeholders.entities.wishlist.card.onDelete : ''}
              </Button>
            </div>
          </div>
        </div>
      </div>
    )
  }
)

WishlistCard.displayName = 'WishlistCard'
