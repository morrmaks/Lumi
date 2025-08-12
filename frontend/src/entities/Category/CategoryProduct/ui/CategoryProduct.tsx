import cls from './CategoryProduct.module.less'
import { AppLink } from '@/shared/ui/AppLink'
import { getRouteCatalogItem } from '@/shared/consts/router'
import { AppImage } from '@/shared/ui/AppImage'
import { Icon } from '@/shared/ui/Icon'
import { IconsMap } from '@/shared/consts/icons'
import { getIconTheme } from '@/shared/lib/utils'
import { Button, ButtonTheme } from '@/shared/ui/Button'
import { memo, MouseEvent, useCallback } from 'react'
import {
  getCategoryId,
  ICategoryProduct,
  ViewFormat,
} from '@/pages/CategoryPage'
import { useAppSelector } from '@/shared/lib/hooks'

interface CategoryProductProps {
  product: ICategoryProduct
  view: ViewFormat
}

export const Product = ({ product, view }: CategoryProductProps) => {
  const { id, image, title, rating, reviews, discountPrice, price } = product
  const categoryId = useAppSelector(getCategoryId)

  const handleAddToBasket = useCallback((e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    e.stopPropagation()
    // dispatch(addBasketProduct(id))
    //используется thunk запрос в котором диспатчится состояние корзины и изменяется значение в localStorage
  }, [])

  const handleAddToWishlist = useCallback(
    (e: MouseEvent<HTMLButtonElement>) => {
      e.preventDefault()
      e.stopPropagation()
      // dispatch(addBasketProduct(id))
      //используется thunk запрос в котором диспатчится состояние избранного и изменяется значение в localStorage
    },
    []
  )

  if (view === ViewFormat.GRID) {
    return (
      <AppLink
        to={getRouteCatalogItem(categoryId, id)}
        className={cls.categoryProduct}
      >
        <Button
          theme={ButtonTheme.STATIC}
          onClick={handleAddToWishlist}
          className={cls.categoryProduct__button_wishlist}
        >
          <Icon
            Svg={IconsMap.WISHLIST}
            className={cls.categoryProduct__buttonIcon_wishlist}
          />
        </Button>
        <AppImage
          src={image}
          alt={title}
          className={cls.categoryProduct__image}
        />
        <div className={cls.categoryProduct__details}>
          <div className={cls.categoryProduct__infoSection}>
            <h3 className={cls.categoryProduct__title}>{title}</h3>
            <div className={cls.categoryProduct__ratingContainer}>
              <Icon
                Svg={IconsMap.RATING}
                theme={getIconTheme('YELLOW')}
                className={cls.categoryProduct__ratingIcon}
              />
              <span className={cls.categoryProduct__rating}>{rating}</span>
              <span className={cls.categoryProduct__reviews}>({reviews})</span>
            </div>
          </div>
          <div className={cls.categoryProduct__actions}>
            <div className={cls.categoryProduct__priceSection}>
              <span className={cls.categoryProduct__discountPrice}>
                {discountPrice} ₽
              </span>
              {discountPrice !== price && (
                <span className={cls.categoryProduct__price}>{price} ₽</span>
              )}
            </div>
            <Button
              theme={ButtonTheme.SECONDARY}
              onClick={handleAddToBasket}
              className={cls.categoryProduct__button}
            >
              <Icon
                Svg={IconsMap.BASKET}
                className={cls.categoryProduct__buttonIcon}
              />
              В корзину
            </Button>
          </div>
        </div>
      </AppLink>
    )
  }

  return (
    <AppLink
      to={getRouteCatalogItem(categoryId, id)}
      className={cls.categoryProduct__viewList}
    >
      <AppImage
        src={image}
        alt={title}
        className={cls.categoryProduct__viewList_image}
      />
      <div className={cls.categoryProduct__viewList_details}>
        <div className={cls.categoryProduct__viewList_infoSection}>
          <h3 className={cls.categoryProduct__title}>{title}</h3>
          <div className={cls.categoryProduct__ratingContainer}>
            <Icon
              Svg={IconsMap.RATING}
              theme={getIconTheme('YELLOW')}
              className={cls.categoryProduct__ratingIcon}
            />
            <span className={cls.categoryProduct__rating}>{rating}</span>
            <span className={cls.categoryProduct__reviews}>({reviews})</span>
          </div>
        </div>
        <div className={cls.categoryProduct__viewList_actions}>
          <div className={cls.categoryProduct__viewList_priceSection}>
            <span className={cls.categoryProduct__viewList_discountPrice}>
              {discountPrice} ₽
            </span>
            {discountPrice !== price && (
              <span className={cls.categoryProduct__viewList_price}>
                {price} ₽
              </span>
            )}
          </div>
          <div className={cls.categoryProduct__viewList_buttons}>
            <Button
              theme={ButtonTheme.OUTLINE}
              square={true}
              onClick={handleAddToWishlist}
            >
              <Icon Svg={IconsMap.WISHLIST} />
            </Button>
            <Button
              theme={ButtonTheme.SECONDARY}
              onClick={handleAddToBasket}
              className={cls.categoryProduct__viewList_button}
            >
              <Icon
                Svg={IconsMap.BASKET}
                className={cls.categoryProduct__buttonIcon}
              ></Icon>
              В корзину
            </Button>
          </div>
        </div>
      </div>
    </AppLink>
  )
}

export const CategoryProduct = memo(Product)
