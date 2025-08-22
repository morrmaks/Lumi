import { AppLink } from '@/shared/ui/AppLink'
import { getRouteCatalogItem, IconsMap, Placeholders } from '@/shared/consts'
import cls from './CategoryProductGrid.module.less'
import { Button, ButtonTheme } from '@/shared/ui/Button'
import { Icon } from '@/shared/ui/Icon'
import { classNames, fullImageUrl, getIconTheme } from '@/shared/lib/utils'
import { AppImage } from '@/shared/ui/AppImage'
import { getCategory, ICategoryProduct } from '@/pages/CategoryPage'
import { useAppSelector } from '@/shared/lib/hooks'
import { memo } from 'react'
import { useCategoryProductActions } from '@/entities/Category'

interface CategoryProductGridProps {
  product: ICategoryProduct
}

export const CategoryProductGrid = memo(
  ({ product }: CategoryProductGridProps) => {
    const {
      id,
      image,
      name,
      rating,
      reviews,
      discountPrice,
      price,
      componentType,
    } = product
    const { slug } = useAppSelector(getCategory)

    const {
      addToBasket,
      toggleWishlist,
      toggleConfigurator,
      isInBasket,
      isInWishlist,
      isInConfigurator,
      isLoadingBasket,
      isLoadingWishlist,
      isLoadingConfigurator,
    } = useCategoryProductActions(id, componentType)

    return (
      <AppLink
        to={getRouteCatalogItem(slug, id)}
        className={cls.categoryProductGrid}
      >
        <Button
          theme={ButtonTheme.STATIC}
          onClick={toggleWishlist}
          className={cls.categoryProductGrid__button_wishlist}
          disabled={isLoadingWishlist}
        >
          <Icon
            Svg={IconsMap.WISHLIST}
            className={classNames(cls.categoryProductGrid__wishlistIcon, {
              [cls.categoryProductGrid__wishlistIcon_active]: isInWishlist,
            })}
          />
        </Button>
        <AppImage
          src={fullImageUrl(image)}
          alt={name}
          className={cls.categoryProductGrid__image}
        />
        <div className={cls.categoryProductGrid__details}>
          <div className={cls.categoryProductGrid__infoSection}>
            <h3 className={cls.categoryProductGrid__title}>{name}</h3>
            <div className={cls.categoryProductGrid__ratingContainer}>
              <Icon
                Svg={IconsMap.RATING}
                theme={getIconTheme('YELLOW')}
                className={cls.categoryProductGrid__ratingIcon}
              />
              <span className={cls.categoryProductGrid__rating}>{rating}</span>
              <span className={cls.categoryProductGrid__reviews}>
                ({reviews})
              </span>
            </div>
          </div>
          <div className={cls.categoryProductGrid__actions}>
            <div className={cls.categoryProductGrid__priceSection}>
              <span className={cls.categoryProductGrid__discountPrice}>
                {discountPrice} ₽
              </span>
              {discountPrice !== price && (
                <span className={cls.categoryProductGrid__price}>
                  {price} ₽
                </span>
              )}
            </div>
            <Button
              theme={ButtonTheme.SECONDARY}
              onClick={addToBasket}
              className={classNames(
                cls.categoryProductGrid__button,
                { [cls.categoryProductGrid__button_basketActive]: isInBasket },
                []
              )}
              disabled={isLoadingBasket}
            >
              <Icon
                Svg={isInBasket ? IconsMap.PLUS : IconsMap.BASKET}
                className={classNames(
                  cls.categoryProductGrid__buttonIcon,
                  {
                    [cls.categoryProductGrid__buttonIcon_basketActive]:
                      isInBasket,
                  },
                  []
                )}
              />
              {isInBasket
                ? Placeholders.entities.category.categoryProduct
                    .onAddMoreToBasket
                : Placeholders.entities.category.categoryProduct.onAddToBasket}
            </Button>
            {componentType && (
              <Button
                theme={ButtonTheme.OUTLINE}
                onClick={toggleConfigurator}
                className={classNames(
                  cls.categoryProductGrid__button,
                  {
                    [cls.categoryProductGrid__button_configuratorActive]:
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
                    cls.categoryProductGrid__buttonIcon,
                    {
                      [cls.categoryProductGrid__buttonIcon_configuratorActive]:
                        isInConfigurator,
                    },
                    []
                  )}
                />
                {isInConfigurator
                  ? Placeholders.entities.category.categoryProduct
                      .onRemoveFromConfigurator
                  : Placeholders.entities.category.categoryProduct
                      .onAddToConfigurator}
              </Button>
            )}
          </div>
        </div>
      </AppLink>
    )
  }
)

CategoryProductGrid.displayName = 'CategoryProductGrid'
