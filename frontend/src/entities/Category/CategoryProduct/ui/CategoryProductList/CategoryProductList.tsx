import { AppLink } from '@/shared/ui/AppLink'
import { getRouteCatalogItem, IconsMap, Placeholders } from '@/shared/consts'
import cls from './CategoryProductList.module.less'
import { Button, ButtonTheme } from '@/shared/ui/Button'
import { Icon } from '@/shared/ui/Icon'
import { classNames, fullImageUrl, getIconTheme } from '@/shared/lib/utils'
import { AppImage } from '@/shared/ui/AppImage'
import { getCategory, ICategoryProduct } from '@/pages/CategoryPage'
import { useAppSelector } from '@/shared/lib/hooks'
import { memo } from 'react'
import { useCategoryProductActions } from '@/entities/Category'

interface CategoryProductListProps {
  product: ICategoryProduct
}

export const CategoryProductList = memo(
  ({ product }: CategoryProductListProps) => {
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
        className={cls.categoryProductList}
      >
        <AppImage
          src={fullImageUrl(image)}
          alt={name}
          className={cls.categoryProductList__image}
        />
        <div className={cls.categoryProductList__details}>
          <div className={cls.categoryProductList__infoSection}>
            <h3 className={cls.categoryProductList__title}>{name}</h3>
            <div className={cls.categoryProductList__ratingContainer}>
              <Icon
                Svg={IconsMap.RATING}
                theme={getIconTheme('YELLOW')}
                className={cls.categoryProductList__ratingIcon}
              />
              <span className={cls.categoryProductList__rating}>{rating}</span>
              <span className={cls.categoryProductList__reviews}>
                ({reviews})
              </span>
            </div>
          </div>
          <div className={cls.categoryProductList__actions}>
            <div className={cls.categoryProductList__priceSection}>
              <span className={cls.categoryProductList__discountPrice}>
                {discountPrice} ₽
              </span>
              {discountPrice !== price && (
                <span className={cls.categoryProductList__price}>
                  {price} ₽
                </span>
              )}
            </div>
            <div className={cls.categoryProductList__buttons}>
              <Button
                theme={ButtonTheme.STATIC}
                square={true}
                onClick={toggleWishlist}
                disabled={isLoadingWishlist}
                className={classNames(cls.categoryProductList__wishlistButton, {
                  [cls.categoryProductList__wishlistButton_active]:
                    isInWishlist,
                })}
              >
                <Icon
                  Svg={IconsMap.WISHLIST}
                  className={classNames(cls.categoryProductList__wishlistIcon, {
                    [cls.categoryProductList__wishlistIcon_active]:
                      isInWishlist,
                  })}
                />
              </Button>
              <div className={cls.categoryProductList__buttonContainer}>
                <Button
                  theme={ButtonTheme.SECONDARY}
                  onClick={addToBasket}
                  className={classNames(
                    cls.categoryProductList__button,
                    {
                      [cls.categoryProductList__button_basketActive]:
                        isInBasket,
                    },
                    []
                  )}
                  disabled={isLoadingBasket}
                >
                  <Icon
                    Svg={isInBasket ? IconsMap.PLUS : IconsMap.BASKET}
                    className={classNames(
                      cls.categoryProductList__buttonIcon,
                      {
                        [cls.categoryProductList__buttonIcon_basketActive]:
                          isInBasket,
                      },
                      []
                    )}
                  />
                  {isInBasket
                    ? Placeholders.entities.category.categoryProduct
                        .onAddMoreToBasket
                    : Placeholders.entities.category.categoryProduct
                        .onAddToBasket}
                </Button>
                {componentType && (
                  <Button
                    theme={ButtonTheme.OUTLINE}
                    onClick={toggleConfigurator}
                    className={classNames(
                      cls.categoryProductList__button,
                      {
                        [cls.categoryProductList__button_configuratorActive]:
                          isInConfigurator,
                      },
                      []
                    )}
                    disabled={isLoadingConfigurator}
                  >
                    <Icon
                      Svg={
                        isInConfigurator
                          ? IconsMap.TRASH
                          : IconsMap.CONFIGURATOR
                      }
                      className={classNames(
                        cls.categoryProductList__buttonIcon,
                        {
                          [cls.categoryProductList__buttonIcon_configuratorActive]:
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
          </div>
        </div>
      </AppLink>
    )
  }
)

CategoryProductList.displayName = 'CategoryProductList'
